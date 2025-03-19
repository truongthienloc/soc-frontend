import ChannelA             from "./ChannelA"
import ChannelD             from "./ChannelD"
import { FIFO_ChannelA }    from "./FIFO_ChannelA"
import { FIFO_ChannelD }    from "./FIFO_ChannelD"
import { FIFO_timing }      from "./FIFO_timing"
import {Logger }            from '../Compile/soc.d'
import Cycle from "../Compile/cycle"

export default class InterConnect {
    active      : boolean
    Pin         : (FIFO_ChannelD | FIFO_ChannelA)[]
    Timming     : FIFO_timing[]
    Pout        : (FIFO_ChannelD | FIFO_ChannelA)[]
    Pactived    : boolean[]
    state       : number
    logger      ?: Logger
    active_println : boolean 

    public setLogger(logger: Logger) {
        this.logger = logger
    }

    public println(active: boolean, ...args: string[]) {
        
        if (active) {
            console.log(...args)
        }

        if (!this.logger) {
            return
        }

        if (active) {
            this.logger.println(...args)
        }
    }

    constructor(active: boolean) {
        this.active = active
        this.state  = 0

        this.Pin = [
                    new FIFO_ChannelA() // Processor
                    , new FIFO_ChannelA() // DMA
                    , new FIFO_ChannelD() // Memory
                    , new FIFO_ChannelD()  // Sub-Interconnect
        ]

        this.Pout = [
                    new FIFO_ChannelD()
                    ,new FIFO_ChannelD()
                    ,new FIFO_ChannelA()
                    ,new FIFO_ChannelA()
        ]

        this.Timming = [
                    new FIFO_timing()
                    ,new FIFO_timing()
                    ,new FIFO_timing()
                    ,new FIFO_timing()
        ]
        this.active_println = true
        this.Pactived = [true, true, true, true]

    }

    Run (
        dataFromProcessor           : ChannelA
        ,dataFromDMA                : ChannelA
        ,dataFromMemory             : ChannelD[]
        ,dataFromSub                : ChannelD
        ,dataFromProcessor_valid    : boolean
        ,dataFromDMA_valid          : boolean
        ,dataFromMemory_valid       : boolean
        ,dataFromSub_valid          : boolean
        ,cycle                      : Cycle
    ) {
        if (this.state == 0) {
            this.RecData (
                dataFromProcessor           
                ,dataFromDMA                
                ,dataFromMemory             
                ,dataFromSub                
                ,dataFromProcessor_valid    
                ,dataFromDMA_valid          
                ,dataFromMemory_valid       
                ,dataFromSub_valid          
                ,cycle                      
            )

            if (! ((this.Pin[0].isEmpty()) && (this.Pin[1].isEmpty()) && (this.Pin[2].isEmpty()) && (this.Pin[3].isEmpty()))) this.state +=1
            return
        }
        if (this.state == 1) {

            this.Route (this.Abiter(), cycle)
            this.state = 0
            return
        }
    }

    RecData(
        dataFromProcessor           : ChannelA
        ,dataFromDMA                : ChannelA
        ,dataFromMemory             : ChannelD[]
        ,dataFromSub                : ChannelD
        ,dataFromProcessor_valid    : boolean
        ,dataFromDMA_valid          : boolean
        ,dataFromMemory_valid       : boolean
        ,dataFromSub_valid          : boolean
        ,cycle                      : Cycle
    ) {
        this.RecFromProcessor(dataFromProcessor, cycle, dataFromProcessor_valid)
        this.RecFromDMA(dataFromDMA, cycle, dataFromDMA_valid)
        this.RecFromMem(dataFromMemory, cycle, dataFromMemory_valid)
        this.RecFromSub(dataFromSub, cycle, dataFromSub_valid)

        cycle.incr()
    }

    RecFromProcessor(data: ChannelA, cycle: Cycle, valid: boolean): void {
        if (this.active && this.Pactived[0] && valid && data.valid == '1') {

            this.println (
                this.active_println
                ,'Cycle '
                + cycle.toString() 
                +': The INTERCONNECT is receiving data from PROCESSOR.'
            )
            if (this.Pin[0] instanceof FIFO_ChannelA) {
                this.Pin[0].enqueue({...data})
                this.Timming[0].enqueue(cycle.cycle)
            } else {
                this.println (
                    this.active_println
                    ,'Cycle '
                    + cycle.toString() 
                    +': The DATA from PROCESSOR is invalid!'
                )
                console.error("Error: Pin[0] is not FIFO_ChannelA")
            }

        }
    }

    RecFromDMA(data: ChannelA, cycle: Cycle, valid: boolean): void {
        if (this.active && this.Pactived[1] && valid && data.valid == '1') {
            this.println (
                this.active_println
                ,'Cycle '
                + cycle.toString() 
                +': The INTERCONNECT is receiving data from DMA.'
            )
            if (this.Pin[1] instanceof FIFO_ChannelA) {
                this.Pin[1].enqueue({...data})
                this.Timming[1].enqueue(cycle.cycle)
            } else {
                this.println (
                    this.active_println
                    ,'Cycle '
                    + cycle.toString() 
                    +': The DATA from DMA is invalid!'
                )
                console.error("Error: Pin[1] is not FIFO_ChannelA")
            }
        }
    }

    RecFromMem(data: ChannelD[], cycle: Cycle, valid: boolean): void {
        if (this.active && this.Pactived[2] && valid) {
            this.println (
                this.active_println
                ,'Cycle '
                + cycle.toString() 
                +': The INTERCONNECT is receiving data from MEMORY.'
            )
            if (this.Pin[2] instanceof FIFO_ChannelD) {
                for (let item of data) {
                    if (item.valid == '1') {
                        this.Pin[2].enqueue({...item})
                        this.Timming[2].enqueue(cycle.cycle)
                    }
                }
            } else {
                this.println (
                    this.active_println
                    ,'Cycle '
                    + cycle.toString() 
                    +': The DATA from MEMORY is invalid!'
                )
                console.error("Error: Pin[2] is not FIFO_ChannelD")
            }
        }
    }

    RecFromSub(data: ChannelD, cycle: Cycle, valid: boolean): void {
        if (this.active && this.Pactived[3] && valid && data.valid == '1') {
            this.println (
                this.active_println
                ,'Cycle '
                + cycle.toString() 
                +': The INTERCONNECT is receiving data from SUB-INTERCONNECT.'
            )
            if (this.Pin[3] instanceof FIFO_ChannelD) {
                this.Pin[3].enqueue({...data})
                this.Timming[3].enqueue(cycle.cycle)
            } else {
                console.error("Error: Pin[3] is not FIFO_ChannelD")
            }
        }
    }

    Abiter()  {

        const Processor_timming       = this.Timming[0].peek()
        const DMA_timming             = this.Timming[1].peek()
        const Memory_timming          = this.Timming[2].peek()
        const SInterconnect_timming   = this.Timming[3].peek()

        const firstTimming =  Math.min(...[
            Processor_timming           // Processor
            ,DMA_timming                // DMA
            ,Memory_timming             // Memory
            ,SInterconnect_timming      // Sub-Interconnect
        ]) 

        for (let i = 0; i < this.Timming.length; i++) {
            if (this.Timming[i].peek() === firstTimming) {
                this.Timming[i].dequeue();
                return i;
            }
        }
        return -1
    }

    Route (Abiter: number, cycle: Cycle) {
        if (Abiter == 0) {
            const dataFromProcessor = {...this.Pin[0].dequeue()}
            const dataFromDMA       = {...this.Pin[1].dequeue()}
            // if (this.Pin[0].dequeue() instanceof ChannelA) {
                // if (this.Pout[2] instanceof FIFO_ChannelA) this.Pout[2].enqueue(dataFromProcessor)
                if (parseInt('0'+dataFromDMA.address, 2) >= 0x0003064
                    && parseInt('0'+dataFromDMA.address, 2) <= 0x0003964
                    ) {
                        if (this.Pout[3] instanceof FIFO_ChannelA) this.Pout[3].enqueue(dataFromDMA)
                        this.Timming[3].dequeue();
                    }
                
                console.log ('jj',(
                    (
                        (parseInt('0'+dataFromProcessor.address, 2)    > 0x000305C + 1) 
                    &&  (parseInt('0'+dataFromProcessor.address, 2)    < 0X1BFFF    + 1)
                    ) || 
                    (
                        (parseInt('0'+dataFromProcessor.address, 2)    >= 0)
                    &&  (parseInt('0'+dataFromProcessor.address, 2)    <= 0x000304C  )
                    )
                    
                ))
                if (
                    (
                        (parseInt('0'+dataFromProcessor.address, 2)    > 0x000305C + 1) 
                    &&  (parseInt('0'+dataFromProcessor.address, 2)    < 0X1BFFF    + 1)
                    ) || 
                    (
                        (parseInt('0'+dataFromProcessor.address, 2)    >= 0)
                    &&  (parseInt('0'+dataFromProcessor.address, 2)    <= 0x000304C  )
                    )
                    
                ) {
                    this.println (
                        this.active_println
                        ,'Cycle '
                        + cycle.toString() 
                        +': The INTERCONNECT is sending data from PROCESSOR to MEMORY.'
                    )
                    if (this.Pout[2] instanceof FIFO_ChannelA) this.Pout[2].enqueue(dataFromProcessor)
                }
                if (
                    (parseInt('0'+dataFromProcessor.address, 2) >= 0x000304C) 
                    && (parseInt('0'+dataFromProcessor.address, 2) <= 0x000305C)
                ) {
                    if (dataFromProcessor.opcode == '000') {
                        this.println (
                            this.active_println
                            ,'Cycle '
                            + cycle.toString() 
                            +': The INTERCONNECT is sending data from PROCESSOR to SUB-INTERCONNECT.'
                        )
                        if (this.Pout[3] instanceof FIFO_ChannelA) this.Pout[3].enqueue(dataFromProcessor)
                    }
                }
                cycle.incr()
            }
        //}
        if (Abiter == 1) {
            const dataFromProcessor = {...this.Pin[0].dequeue()}
            const dataFromDMA       = {...this.Pin[1].dequeue()}
            if (parseInt('0'+dataFromProcessor.address, 2) >= 0x0003064
            && parseInt('0'+dataFromProcessor.address, 2) <= 0x0003964
            ) {
                if (this.Pout[3] instanceof FIFO_ChannelA) this.Pout[3].enqueue(dataFromProcessor)
            }

            if (dataFromDMA instanceof ChannelA) {
                if (dataFromDMA.opcode == '100') {
                    this.println (
                        this.active_println
                        ,'Cycle '
                        + cycle.toString() 
                        +': The INTERCONNECT is sending data from DMA to MEMORY.'
                    )
                    if (this.Pout[2] instanceof FIFO_ChannelA) this.Pout[2].enqueue(dataFromDMA)
                } else {
                    this.println (
                        this.active_println
                        ,'Cycle '
                        + cycle.toString() 
                        +': The INTERCONNECT is sending data from DMA to SUB-INTERCONNCET.'
                    )
                    if (this.Pout[3] instanceof FIFO_ChannelA) this.Pout[3].enqueue(dataFromDMA)
                }
            }
        }
        if (Abiter == 2) {
            const dataFromMem = {...this.Pin[2].dequeue()}
            // if (dataFromMem instanceof ChannelD) {
                if (dataFromMem.source == '00') {
                    if (this.Pout[0] instanceof FIFO_ChannelD) this.Pout[0].enqueue(dataFromMem)
                    this.println (
                        this.active_println
                        ,'Cycle '
                        + cycle.toString() 
                        +': The INTERCONNECT is sending data from MEMORY to PROCESSOR.'
                    )
                        //console.log('this.Pout[0].peek()', this.Pout[0].peek())
                } else {
                    this.println (
                        this.active_println
                        ,'Cycle '
                        + cycle.toString() 
                        +': The INTERCONNECT is sending data from MEMORY to DMA.'
                    )
                    if (this.Pout[1] instanceof FIFO_ChannelD) this.Pout[1].enqueue(dataFromMem)
                }
            // } 
        }
        if (Abiter == 3) {
            const dataFromSInterconnect = this.Pin[2].dequeue()
            if (dataFromSInterconnect instanceof ChannelD) {
                if (dataFromSInterconnect.source == '00') {
                    this.println (
                        this.active_println
                        ,'Cycle '
                        + cycle.toString() 
                        +': The INTERCONNECT is sending data from SUB-INTERCONNECT to PROCESSOR.'
                    )
                    if (this.Pout[0] instanceof FIFO_ChannelD) this.Pout[0].enqueue(dataFromSInterconnect)
                } else {
                    this.println (
                        this.active_println
                        ,'Cycle '
                        + cycle.toString() 
                        +': The INTERCONNECT is sending data from SUB-INTERCONNECT to DMA.'
                    )
                    if (this.Pout[1] instanceof FIFO_ChannelD) this.Pout[1].enqueue(dataFromSInterconnect)
                }
            }
        }
    }
}
//            +-------+                +-------+
//            |  CPU  |                |  DMA  |
//            +---+---+                +---+---+
//             |    ^                    |    ^
//             v    |                    v    |
//            +---+---+                +---+---+
//            |   0   |                |   1   |
//            +---+---+                +---+---+
//             |    ^                    |    ^
//             v    |                    v    |
//             +--------------------------------+
//             |         INTERCONNECT           |
//             +--------------------------------+
//             |    ^                    |    ^
//             v    |                    v    |
//            +---+---+                +---+---+
//            |   2   |                |   3   |
//            +---+---+                +---+---+
//             |    ^                    |    ^
//             v    |                    v    |                 
//          +-----+-----+            +-----+-----+      
//          |  MEMORY   |            |  SubInter |
//          +-----------+            +-----------+