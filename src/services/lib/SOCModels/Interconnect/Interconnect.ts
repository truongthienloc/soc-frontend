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

export default class TL_UH {
    active              : boolean
    port_in                 : (FIFO_ChannelD | FIFO_ChannelA)[]
    Timing              : FIFO_timing[]
    port_out                : (FIFO_ChannelD | FIFO_ChannelA)[]
    Pactived            : boolean[]
    state               : number
    logger             ?: Logger
    active_println      : boolean 
    ready               : boolean

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

        this.port_in = [
                    new FIFO_ChannelA() // Processor
                    , new FIFO_ChannelA() // DMA
                    , new FIFO_ChannelD() // Memory
                    , new FIFO_ChannelD()  // Sub-Interconnect
        ]

        this.port_out = [
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
        this.ready          = true
        this.Pactived       = [true, true, true, true]

    }
    public reset() {

        this.state  = 0

        this.port_in = [
                    new FIFO_ChannelA() // Processor
                    , new FIFO_ChannelA() // DMA
                    , new FIFO_ChannelD() // Memory
                    , new FIFO_ChannelD()  // Sub-Interconnect
        ]

        this.port_out = [
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
        this.ready          = true
        this.Pactived       = [true, true, true, true]
    }

    Controller (
        dataFromProcessor           : ChannelA
        ,dataFromDMA                : ChannelA
        ,dataFromMemory             : ChannelD
        ,dataFromSub                : ChannelD
        ,dataFromProcessor_valid    : boolean
        ,dataFromDMA_valid          : boolean
        ,dataFromMemory_valid       : boolean
        ,dataFromSub_valid          : boolean

        , Processor_ready           : boolean
        , DMA_ready                 : boolean
        , Memory_ready              : boolean
        , Bridge_ready              : boolean

        ,cycle                      : Cycle
    ) {

        if (this.state == this.RECEIVE_STATE)   {
            this.ready = true
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
            if (! ((this.port_in[0].isEmpty()) && (this.port_in[1].isEmpty()) && (this.port_in[2].isEmpty()) && (this.port_in[3].isEmpty()))) {
                this.state +=1
                this.ready = false
            }
            return
        }

        if (this.state == this.SEND_STATE)      {
            this.Abiter(
                cycle
                , Processor_ready   
                , DMA_ready         
                , Memory_ready      
                , Bridge_ready   
            )
            this.state = this.RECEIVE_STATE
            this.ready = true
            return
        }

    }

    RecData(
        dataFromProcessor           : ChannelA
        ,dataFromDMA                : ChannelA
        ,dataFromMemory             : ChannelD
        ,dataFromSub                : ChannelD
        ,dataFromProcessor_valid    : boolean
        ,dataFromDMA_valid          : boolean
        ,dataFromMemory_valid       : boolean
        ,dataFromSub_valid          : boolean
        ,cycle                      : Cycle
    ) {
        this.RecFromProcessor(dataFromProcessor, cycle)
        this.RecFromDMA(dataFromDMA, cycle, dataFromDMA_valid)
        this.RecFromMem(dataFromMemory, cycle, dataFromMemory_valid)
        this.RecFromSub(dataFromSub, cycle, dataFromSub_valid)

    }

    RecFromProcessor(data: ChannelA, cycle: Cycle): void {

        if (this.Pactived[0] && data.valid == '1') {
            this.println (
                this.active_println
                ,'Cycle '
                + cycle.toString() 
                +': TL-UH is receiving data from PROCESSOR.'
            )
            if (this.port_in[0] instanceof FIFO_ChannelA) {
                this.port_in[0].enqueue({...data})
                this.Timing[0].enqueue(cycle.cycle)
            } else {
                this.println (
                    this.active_println
                    ,'Cycle '
                    + cycle.toString() 
                    +': The DATA from PROCESSOR is invalid!'
                )
            }

        }
    }

    RecFromDMA(data: ChannelA, cycle: Cycle, valid: boolean): void {
        if (this.active && this.Pactived[1]) {

            if (this.port_in[1] instanceof FIFO_ChannelA) {
                // console.log('data', data)
                if (data.valid == '1') {
                    this.println (
                        this.active_println
                        ,'Cycle '
                        + cycle.toString() 
                        +': TL-UH is receiving data from DMA.'
                    )
                    this.port_in[1].enqueue({...data})
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
        }
    }

    RecFromMem(data: ChannelD, cycle: Cycle, valid: boolean): void {
        if (this.Pactived[2] && valid) {

            if (this.port_in[2] instanceof FIFO_ChannelD) {
                this.println (
                    this.active_println
                    ,'Cycle '
                    + cycle.toString() 
                    +': TL-UH is receiving data from MEMORY.'
                )

                    if (data.valid == '1') {
                        this.port_in[2].enqueue({...data})
                        this.Timing[2].enqueue(cycle.cycle)
                        // cycle.incr()
                    }
            } else {
                this.println (
                    this.active_println
                    ,'Cycle '
                    + cycle.toString() 
                    +': The DATA from MEMORY is invalid!'
                )
            }
        }
    }

    RecFromSub(data: ChannelD, cycle: Cycle, valid: boolean): void {
        if (this.active && this.Pactived[3] && valid && data.valid == '1') {
            this.println (
                this.active_println
                ,'Cycle '
                + cycle.toString() 
                +': TL-UH is receiving data from TL-UL.'
            )
            if (this.port_in[3] instanceof FIFO_ChannelD) {
                this.port_in[3].enqueue({...data})
                this.Timing[3].enqueue(cycle.cycle)
            } else {
                this.println (
                    this.active_println
                    ,'Cycle '
                    + cycle.toString() 
                    +': The DATA from TL-UL is invalid!'
                )
            }
        }
    }

    Abiter(
        cycle: Cycle
        , Processor_ready   : boolean
        , DMA_ready         : boolean
        , Memory_ready      : boolean
        , Bridge_ready      : boolean
    )  {

        const Processor_Timing       = this.Timing[0].peek()
        const DMA_Timing             = this.Timing[1].peek()
        const Memory_Timing          = this.Timing[2].peek()
        const SInterconnect_Timing   = this.Timing[3].peek()
        const dataFromProcessor      = {...this.port_in[0].peek()}
        const dataFromDMA            = {...this.port_in[1].peek()}
        const dataFromMem            = {...this.port_in[2].peek()}
        const dataFromSInterconnect  = {...this.port_in[3].peek()}

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
                    this.Route (0
                        , cycle
                        , Processor_ready   
                        , DMA_ready         
                        , Memory_ready      
                        , Bridge_ready      
                    )
                    // this.Timing[0].dequeue()
                }
                else if (Pro2Sub && DMA2Sub && minIndices.includes(1)) {
                    this.Route (0
                        , cycle
                        , Processor_ready   
                        , DMA_ready         
                        , Memory_ready      
                        , Bridge_ready   
                    )
                    // this.Timing[0].dequeue()
                }
                else {
                    this.Route (0
                        , cycle
                        , Processor_ready   
                        , DMA_ready         
                        , Memory_ready      
                        , Bridge_ready   
                    )
                    // this.Timing[0].dequeue()

                    if (minIndices.includes(1)) {
                        this.Route (1
                            , cycle
                            , Processor_ready   
                            , DMA_ready         
                            , Memory_ready      
                            , Bridge_ready   
                        )
                        minIndices [minIndices.indexOf(1)] = -1
                        // this.Timing[1].dequeue()
                    }
                }
            }

            if ( minIndices[i] == 1) {
                if (Pro2Memory && DMA2Mem && minIndices.includes(0)) {
                    this.Route (0
                        , cycle
                        , Processor_ready   
                        , DMA_ready         
                        , Memory_ready      
                        , Bridge_ready   
                    )
                    // this.Timing[1].dequeue()
                }
                else if (Pro2Sub && DMA2Sub) {
                    this.Route (0
                        , cycle
                        , Processor_ready   
                        , DMA_ready         
                        , Memory_ready      
                        , Bridge_ready   
                    )
                    // this.Timing[1].dequeue()
                }
                else {
                    this.Route (1
                        , cycle
                        , Processor_ready   
                        , DMA_ready         
                        , Memory_ready      
                        , Bridge_ready   
                    )
                    // this.Timing[1].dequeue()

                    if (minIndices.includes(1)) {
                        this.Route (0
                            , cycle
                            , Processor_ready   
                            , DMA_ready         
                            , Memory_ready      
                            , Bridge_ready   
                        )
                        minIndices [minIndices.indexOf(0)] = -1
                        // this.Timing[0].dequeue()
                    }
                }
            }

            if ( minIndices[i] == 2) {
                if (Mem2Pro && Sub2Pro && minIndices.includes(3)) {
                    this.Route (3
                        , cycle
                        , Processor_ready   
                        , DMA_ready         
                        , Memory_ready      
                        , Bridge_ready   
                    )
                    // this.Timing[3].dequeue()
                }
                else if (Mem2DMA && Sub2DMA && minIndices.includes(3)) {
                    this.Route (3
                        , cycle
                        , Processor_ready   
                        , DMA_ready         
                        , Memory_ready      
                        , Bridge_ready   
                    )
                    // this.Timing[3].dequeue()
                }
                else {
                    this.Route (2
                        , cycle
                        , Processor_ready   
                        , DMA_ready         
                        , Memory_ready      
                        , Bridge_ready   
                    )
                    // this.Timing[2].dequeue()

                    if (minIndices.includes(3)) {
                        this.Route (3
                            , cycle
                            , Processor_ready   
                            , DMA_ready         
                            , Memory_ready      
                            , Bridge_ready   
                        )
                        minIndices [minIndices.indexOf(3)] = -1
                        // this.Timing[3].dequeue()
                    }
                }
            }

            if ( minIndices[i] == 3) {
                if (Mem2Pro && Sub2Pro && minIndices.includes(2)) {
                    this.Route (3
                        , cycle
                        , Processor_ready   
                        , DMA_ready         
                        , Memory_ready      
                        , Bridge_ready   
                    )
                    // this.Timing[3].dequeue()
                }
                else if (Mem2DMA && Sub2DMA && minIndices.includes(2)) {
                    this.Route (3
                        , cycle
                        , Processor_ready   
                        , DMA_ready         
                        , Memory_ready      
                        , Bridge_ready   
                    )
                    // this.Timing[3].dequeue()
                }
                else {
                    this.Route (3
                        , cycle
                        , Processor_ready   
                        , DMA_ready         
                        , Memory_ready      
                        , Bridge_ready   
                    )
                    this.Timing[3].dequeue()

                    if (minIndices.includes(3)) {
                        this.Route (2
                            , cycle
                            , Processor_ready   
                            , DMA_ready         
                            , Memory_ready      
                            , Bridge_ready   
                        )
                        minIndices [minIndices.indexOf(2)] = -1
                        // this.Timing[2].dequeue()
                    }
                }
            }
        }
        this.state = 0
    }

    Route (
        Abiter: number
        , cycle: Cycle
        , Processor_ready   : boolean
        , DMA_ready         : boolean
        , Memory_ready      : boolean
        , Bridge_ready      : boolean
    ) {

        if (Abiter == 0 
            && !this.port_in[0].isEmpty()
        ) {
            const dataFromProcessor = {...this.port_in[0].peek()}
            
            if (
                (
                    (parseInt('0'+dataFromProcessor.address, 2)    >= 0         )
                &&  (parseInt('0'+dataFromProcessor.address, 2)    <= 0X1FFFF   )
                && Memory_ready
                )
            ) {
                
                this.println (
                    this.active_println
                    ,'Cycle '
                    + cycle.toString() 
                    +': TL-UH is sending data from PROCESSOR to MEMORY.'
                )
                if (this.port_out[2] instanceof FIFO_ChannelA) this.port_out[2].enqueue({...this.port_in[0].dequeue()})
                this.Timing[0].dequeue()
            }
            if (
                (
                    (parseInt('0'+dataFromProcessor.address, 2) == 0x0020000) 
                ||  (parseInt('0'+dataFromProcessor.address, 2) == 0x0020004)
                ||  (parseInt('0'+dataFromProcessor.address, 2) == 0x0020008)
                ||  (parseInt('0'+dataFromProcessor.address, 2) == 0x002000C)
                ||  (parseInt('0'+dataFromProcessor.address, 2) == 0x0020010)
                ||  (parseInt('0'+dataFromProcessor.address, 2) >= 0x0020014 
                    && parseInt('0'+dataFromProcessor.address, 2) <= 0x0020014 + 288 * 4 )
                ) 
                && Bridge_ready
        ) {
                // if (dataFromProcessor.opcode == '000') {
                    this.println (
                        this.active_println
                        ,'Cycle '
                        + cycle.toString() 
                        +': TL-UH is sending data from PROCESSOR to TL-UH.'
                    )

                    if (this.port_out[3] instanceof FIFO_ChannelA) this.port_out[3].enqueue({...this.port_in[0].dequeue()})
                    this.Timing[0].dequeue()
                
            }
        }

        if (Abiter == 1 
            && !this.port_in[1].isEmpty()
        ) {
            const dataFromDMA       = {...this.port_in[1].peek()}
            if (parseInt('0'+dataFromDMA.address, 2) < 0x20014) { //2 001A parseInt('0'+dataFromDMA.address, 2)
                if (Memory_ready) {
                    this.println (
                        this.active_println
                        ,'Cycle '
                        + cycle.toString() 
                        +': TL-UH is sending data from DMA to MEMORY.'
                    )
                    if (this.port_out[2] instanceof FIFO_ChannelA) this.port_out[2].enqueue({...this.port_in[1].dequeue()})
                    this.Timing[1].dequeue()
                }
            } else {
                if (Bridge_ready) {
                    this.println (
                        this.active_println
                        ,'Cycle '
                        + cycle.toString() 
                        +': TL-UH is sending data from DMA to SUB-INTERCONNCET.'
                    )
                    while (!this.port_in[1].isEmpty()) {
                        if (this.port_out[3] instanceof FIFO_ChannelA) this.port_out[3].enqueue({...this.port_in[1].dequeue()})
                        this.Timing[1].dequeue()
                    }
                }
            }
        }

        if (Abiter == 2 
            && !this.port_in[2].isEmpty()
        ) {
            const dataFromMem = {...this.port_in[2].peek()}
                if (dataFromMem.source == '00') {
                    if (Processor_ready) {
                        if (this.port_out[0] instanceof FIFO_ChannelD) this.port_out[0].enqueue({...this.port_in[2].dequeue()})
                            this.println (
                                this.active_println
                                ,'Cycle '
                                + cycle.toString() 
                                +': TL-UH is sending data from MEMORY to PROCESSOR.'
                            )
                            this.Timing[2].dequeue()
                    }
                } else {
                    if (DMA_ready) {
                        this.println (
                            this.active_println
                            ,'Cycle '
                            + cycle.toString() 
                            +': TL-UH is sending data from MEMORY to DMA.'
                        )
                        if (this.port_out[1] instanceof FIFO_ChannelD) {
                            this.port_out[1].enqueue({...this.port_in[2].dequeue()})

                        }
                        this.Timing[2].dequeue()
                    }
                }
        }

        if (Abiter == 3 
            && !this.port_in[3].isEmpty()
        ) {
            const dataFromSInterconnect = {...this.port_in[3].dequeue()}
            if (dataFromSInterconnect.source == '00' && Processor_ready) {
                this.println (
                    this.active_println
                    ,'Cycle '
                    + cycle.toString() 
                    +': TL-UH is sending data from TL-UL to PROCESSOR.'
                )
                if (this.port_out[0] instanceof FIFO_ChannelD) this.port_out[0].enqueue(dataFromSInterconnect)
                this.Timing[3].dequeue()
            } else {
                if (DMA_ready) {
                    this.println (
                        this.active_println
                        ,'Cycle '
                        + cycle.toString() 
                        +': TL-UH is sending data from TL-UL to DMA.'
                    )
                    if (this.port_out[1] instanceof FIFO_ChannelD) this.port_out[1].enqueue(dataFromSInterconnect)
                        this.Timing[3].dequeue()
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