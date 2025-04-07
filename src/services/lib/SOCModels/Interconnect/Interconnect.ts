import ChannelA             from "./ChannelA"
import ChannelD             from "./ChannelD"
import { FIFO_ChannelA }    from "./FIFO_ChannelA"
import { FIFO_ChannelD }    from "./FIFO_ChannelD"
import { FIFO_timing }      from "./FIFO_timing"
import {Logger }            from '../Compile/soc.d'
import Cycle from "../Compile/cycle"
import { constrainedMemory } from "process"
import { Concert_One } from "next/font/google"
import { Buffer_01 } from "../../datapath/Block/Buffer"

export default class InterConnect {
    active              : boolean
    Pin                 : (FIFO_ChannelD | FIFO_ChannelA)[]
    Timing              : FIFO_timing[]
    Pout                : (FIFO_ChannelD | FIFO_ChannelA)[]
    Pactived            : boolean[]
    state               : number
    logger             ?: Logger
    active_println      : boolean 

    RECEIVE_STATE       = 0
    SEND_STATE          = 1

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

        this.Timing = [
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
        ,dataFromDMA                : ChannelA[]
        ,dataFromMemory             : ChannelD[]
        ,dataFromSub                : ChannelD
        ,dataFromProcessor_valid    : boolean
        ,dataFromDMA_valid          : boolean
        ,dataFromMemory_valid       : boolean
        ,dataFromSub_valid          : boolean
        ,cycle                      : Cycle
    ) {

        if (this.state == this.RECEIVE_STATE)   {
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
            if (! ((this.Pin[0].isEmpty()) && (this.Pin[1].isEmpty()) && (this.Pin[2].isEmpty()) && (this.Pin[3].isEmpty()))) {
                this.state +=1
            }
            return
        }

        if (this.state == this.SEND_STATE)      {

            this.Abiter(cycle)
            
            // this.state = 0
            return
        }

    }

    RecData(
        dataFromProcessor           : ChannelA
        ,dataFromDMA                : ChannelA[]
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
                this.Timing[0].enqueue(cycle.cycle)
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

    RecFromDMA(data: ChannelA[], cycle: Cycle, valid: boolean): void {
        if (this.active && this.Pactived[1] && valid) {
            this.println (
                this.active_println
                ,'Cycle '
                + cycle.toString() 
                +': The INTERCONNECT is receiving data from DMA.'
            )
            if (this.Pin[1] instanceof FIFO_ChannelA) {
                // console.log('data', data)
                for (let item of data) {
                    if (item.valid == '1') {
                        this.Pin[1].enqueue({...item})
                        this.Timing[1].enqueue(cycle.cycle)
                    }
                }
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

            if (this.Pin[2] instanceof FIFO_ChannelD) {
                for (let item of data) {
                    if (item.valid == '1') {
                        this.Pin[2].enqueue({...item})
                        this.Timing[2].enqueue(cycle.cycle)
                        this.println (
                            this.active_println
                            ,'Cycle '
                            + cycle.toString() 
                            +': The INTERCONNECT is receiving data from MEMORY.'
                        )
                        // cycle.incr()
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
                this.Timing[3].enqueue(cycle.cycle)
            } else {
                console.error("Error: Pin[3] is not FIFO_ChannelD")
            }
        }
    }

    Abiter(cycle: Cycle)  {

        const Processor_Timing       = this.Timing[0].peek()
        const DMA_Timing             = this.Timing[1].peek()
        const Memory_Timing          = this.Timing[2].peek()
        const SInterconnect_Timing   = this.Timing[3].peek()
        const dataFromProcessor      = {...this.Pin[0].peek()}
        const dataFromDMA            = {...this.Pin[1].peek()}
        const dataFromMem            = {...this.Pin[2].peek()}
        const dataFromSInterconnect  = {...this.Pin[3].peek()}

        const Pro2Memory             = 
        (
            (
                (parseInt('0'+dataFromProcessor.address, 2)    > 0x000305C + 1) 
            &&  (parseInt('0'+dataFromProcessor.address, 2)    < 0X1BFFF    + 1)
            ) || 
            (
                (parseInt('0'+dataFromProcessor.address, 2)    >= 0)
            &&  (parseInt('0'+dataFromProcessor.address, 2)    < 0x000304C  )
            )
            
        )

        const Pro2Sub               = 
        (
            (parseInt('0'+dataFromProcessor.address, 2) >= 0x000304C) 
            && (parseInt('0'+dataFromProcessor.address, 2) <= 0x000305C)
        )

        const DMA2Mem               = dataFromDMA.opcode == '100'
        const DMA2Sub               = !DMA2Mem

        const Mem2Pro               = dataFromMem.source == '00'
        const Mem2DMA               = !Mem2Pro

        const Sub2Pro               = dataFromSInterconnect.source == '00'
        const Sub2DMA               = !Sub2Pro


        const firstTiming =  Math.min(...[
            Processor_Timing           // Processor
            ,DMA_Timing                // DMA
            ,Memory_Timing             // Memory
            ,SInterconnect_Timing      // Sub-Interconnect
        ]) 

        let minIndices = [];

        for (let i = 0; i < this.Timing.length; i++) {
            if (this.Timing[i].peek() === firstTiming) {
            minIndices.push(i); // Lưu chỉ số
            }
        }


        for (let i = 0; i < minIndices.length; i++) {
            if ( minIndices[i] == 0) {
                if (Pro2Memory && DMA2Mem && minIndices.includes(1)) {
                    this.Route (0, cycle)
                    this.Timing[0].dequeue()
                }
                else if (Pro2Sub && DMA2Sub && minIndices.includes(1)) {
                    this.Route (0, cycle)
                    this.Timing[0].dequeue()
                }
                else {
                    this.Route (0, cycle)
                    this.Timing[0].dequeue()

                    if (minIndices.includes(1)) {
                        this.Route (1, cycle)
                        minIndices [minIndices.indexOf(1)] = -1
                        this.Timing[1].dequeue()
                    }
                }
            }

            if ( minIndices[i] == 1) {
                if (Pro2Memory && DMA2Mem && minIndices.includes(0)) {
                    this.Route (0, cycle)
                    this.Timing[1].dequeue()
                }
                else if (Pro2Sub && DMA2Sub) {
                    this.Route (0, cycle)
                    this.Timing[1].dequeue()
                }
                else {
                    this.Route (1, cycle)
                    this.Timing[1].dequeue()

                    if (minIndices.includes(1)) {
                        this.Route (0, cycle)
                        minIndices [minIndices.indexOf(0)] = -1
                        this.Timing[0].dequeue()
                    }
                }
            }

            if ( minIndices[i] == 2) {
                if (Mem2Pro && Sub2Pro && minIndices.includes(3)) {
                    this.Route (3, cycle)
                    this.Timing[3].dequeue()
                }
                else if (Mem2DMA && Sub2DMA && minIndices.includes(3)) {
                    this.Route (3, cycle)
                    this.Timing[3].dequeue()
                }
                else {
                    this.Route (2, cycle)
                    this.Timing[2].dequeue()

                    if (minIndices.includes(3)) {
                        this.Route (3, cycle)
                        minIndices [minIndices.indexOf(3)] = -1
                        this.Timing[3].dequeue()
                    }
                }
            }

            if ( minIndices[i] == 3) {
                if (Mem2Pro && Sub2Pro && minIndices.includes(2)) {
                    this.Route (3, cycle)
                    this.Timing[3].dequeue()
                }
                else if (Mem2DMA && Sub2DMA && minIndices.includes(2)) {
                    this.Route (3, cycle)
                    this.Timing[3].dequeue()
                }
                else {
                    this.Route (3, cycle)
                    this.Timing[3].dequeue()

                    if (minIndices.includes(3)) {
                        this.Route (2, cycle)
                        minIndices [minIndices.indexOf(2)] = -1
                        this.Timing[2].dequeue()
                    }
                }
            }
        }
        this.state = 0
    }

    Route (Abiter: number, cycle: Cycle) {
        if (Abiter == 0 && !this.Pin[0].isEmpty()) {
            const dataFromProcessor = {...this.Pin[0].dequeue()}
            if (
                (
                    (parseInt('0'+dataFromProcessor.address, 2)    > 0x000305C + 1) 
                &&  (parseInt('0'+dataFromProcessor.address, 2)    < 0X1BFFF    + 1)
                ) || 
                (
                    (parseInt('0'+dataFromProcessor.address, 2)    >= 0)
                &&  (parseInt('0'+dataFromProcessor.address, 2)    <= 0x000305C  )
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
            // if (
            //     (parseInt('0'+dataFromProcessor.address, 2) >= 0x000304C) 
            //     && (parseInt('0'+dataFromProcessor.address, 2) <= 0x000305C)
            // ) {
            //     if (dataFromProcessor.opcode == '000') {
            //         this.println (
            //             this.active_println
            //             ,'Cycle '
            //             + cycle.toString() 
            //             +': The INTERCONNECT is sending data from PROCESSOR to SUB-INTERCONNECT.'
            //         )
            //         if (this.Pout[3] instanceof FIFO_ChannelA) this.Pout[3].enqueue(dataFromProcessor)
            //     }
            // }
        }

        if (Abiter == 1 && !this.Pin[1].isEmpty()) {
            const dataFromDMA       = {...this.Pin[1].peek()}
            // console.log ('this.Pin[1]',this.Pin[1])
            if (dataFromDMA.opcode == '100') {
                this.println (
                    this.active_println
                    ,'Cycle '
                    + cycle.toString() 
                    +': The INTERCONNECT is sending data from DMA to MEMORY.'
                )
                if (this.Pout[2] instanceof FIFO_ChannelA) this.Pout[2].enqueue({...this.Pin[1].dequeue()})
            } else {

                while (!this.Pin[1].isEmpty()) {
                    this.println (
                        this.active_println
                        ,'Cycle '
                        + cycle.toString() 
                        +': The INTERCONNECT is sending data from DMA to SUB-INTERCONNCET.'
                    )
                    if (this.Pout[3] instanceof FIFO_ChannelA) this.Pout[3].enqueue({...this.Pin[1].dequeue()})
                    this.Timing[1].dequeue()
                }
                
            }
        }

        if (Abiter == 2 && !this.Pin[2].isEmpty()) {
            const dataFromMem = {...this.Pin[2].peek()}
            
            // if (dataFromMem instanceof ChannelD) {
                if (dataFromMem.source == '00') {
                    if (this.Pout[0] instanceof FIFO_ChannelD) this.Pout[0].enqueue({...this.Pin[2].dequeue()})
                    this.println (
                        this.active_println
                        ,'Cycle '
                        + cycle.toString() 
                        +': The INTERCONNECT is sending data from MEMORY to PROCESSOR.'
                    )
                        //console.log('this.Pout[0].peek()', this.Pout[0].peek())
                } else {
                    // while (!this.Pin[2].isEmpty()) {
                        this.println (
                            this.active_println
                            ,'Cycle '
                            + cycle.toString() 
                            +': The INTERCONNECT is sending data from MEMORY to DMA.'
                        )
                        if (this.Pout[1] instanceof FIFO_ChannelD) {
                            this.Pout[1].enqueue({...this.Pin[2].dequeue()})
                        }
                }
        }

        if (Abiter == 3 && !this.Pin[3].isEmpty()) {
            const dataFromSInterconnect = {...this.Pin[3].dequeue()}
            if (dataFromSInterconnect.source == '00') {
                this.println (
                    this.active_println
                    ,'Cycle '
                    + cycle.toString() 
                    +': The INTERCONNECT is sending data from SUB-INTERCONNECT to PROCESSOR.'
                )
                if (this.Pout[0] instanceof FIFO_ChannelD) this.Pout[0].enqueue(dataFromSInterconnect)
                // console.log('this.Pout[0]', this.Pout[0])
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