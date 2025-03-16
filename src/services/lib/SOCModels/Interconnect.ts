import ChannelA             from "./ChannelA"
import ChannelD             from "./ChannelD"
import { FIFO_ChannelA }    from "./FIFO_ChannelA"
import { FIFO_ChannelD }    from "./FIFO_ChannelD"
import { FIFO_timing }      from "./FIFO_timing"

export default class InterConnect {
    active      : boolean
    Pin         : (FIFO_ChannelD | FIFO_ChannelA)[]
    Timming     : FIFO_timing[]
    Pout        : (FIFO_ChannelD | FIFO_ChannelA)[]
    Pactived    : boolean[]
    state       : number

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

        this.Pactived = [true, true, true, true]

    }

    Run (
        dataFromProcessor           : ChannelA
        ,dataFromDMA                : ChannelA
        ,dataFromMemory             : ChannelD
        ,dataFromSub                : ChannelD
        ,dataFromProcessor_valid    : boolean
        ,dataFromDMA_valid          : boolean
        ,dataFromMemory_valid       : boolean
        ,dataFromSub_valid          : boolean
        ,cycle                      : number
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
            this.Route (this.Abiter())
            this.state = 0
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
        ,cycle                      : number
    ) {
        this.RecFromProcessor(dataFromProcessor, cycle, dataFromProcessor_valid)
        this.RecFromDMA(dataFromDMA, cycle, dataFromDMA_valid)
        this.RecFromMem(dataFromMemory, cycle, dataFromMemory_valid)
        this.RecFromSub(dataFromSub, cycle, dataFromSub_valid)
    }

    RecFromProcessor(data: ChannelA, cycle: number, valid: boolean): void {
        if (this.active && this.Pactived[0] && valid && data.valid == '1') {
            
            if (this.Pin[0] instanceof FIFO_ChannelA) {
                this.Pin[0].enqueue({...data})
                this.Timming[0].enqueue(cycle)
            } else {
                console.error("Error: Pin[0] is not FIFO_ChannelA")
            }
        }
    }

    RecFromDMA(data: ChannelA, cycle: number, valid: boolean): void {
        if (this.active && this.Pactived[1] && valid && data.valid == '1') {
            if (this.Pin[1] instanceof FIFO_ChannelA) {
                this.Pin[1].enqueue({...data})
                this.Timming[1].enqueue(cycle)
            } else {
                console.error("Error: Pin[1] is not FIFO_ChannelA")
            }
        }
    }

    RecFromMem(data: ChannelD, cycle: number, valid: boolean): void {
        if (this.active && this.Pactived[2] && valid && data.valid == '1') {
            if (this.Pin[2] instanceof FIFO_ChannelD) {
                this.Pin[2].enqueue({...data})
                this.Timming[2].enqueue(cycle)
            } else {
                console.error("Error: Pin[2] is not FIFO_ChannelD")
            }
        }
    }

    RecFromSub(data: ChannelD, cycle: number, valid: boolean): void {
        if (this.active && this.Pactived[3] && valid && data.valid == '1') {
            if (this.Pin[3] instanceof FIFO_ChannelD) {
                this.Pin[3].enqueue({...data})
                this.Timming[3].enqueue(cycle)
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

    Route (Abiter: number) {
        console.log('route')
        if (Abiter == 0) {
            console.log('pin0',this.Pin[0])
            const dataFromProcessor = {...this.Pin[0].dequeue()}
            console.log('pin0',this.Pin[0])   

            // if (this.Pin[0].dequeue() instanceof ChannelA) {
                // if (this.Pout[2] instanceof FIFO_ChannelA) this.Pout[2].enqueue(dataFromProcessor)
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

                    if (this.Pout[2] instanceof FIFO_ChannelA) this.Pout[2].enqueue(dataFromProcessor)
                }
                if (
                    (parseInt('0'+dataFromProcessor.address, 2) > 0x000304C) 
                    && (parseInt('0'+dataFromProcessor.address, 2) <= 0x000305C)
                ) {
                    if (this.Pout[3] instanceof FIFO_ChannelA) this.Pout[3].enqueue(dataFromProcessor)
                }
            }
        //}
        if (Abiter == 1) {
            const dataFromDMA = this.Pin[1].dequeue()
            if (dataFromDMA instanceof ChannelA) {
                if (dataFromDMA.opcode == '100') {
                    if (this.Pout[2] instanceof FIFO_ChannelA) this.Pout[2].enqueue(dataFromDMA)
                } else {
                    if (this.Pout[3] instanceof FIFO_ChannelA) this.Pout[3].enqueue(dataFromDMA)
                }
            }
        }
        if (Abiter == 2) {
            const dataFromMem = {...this.Pin[2].dequeue()}
            // if (dataFromMem instanceof ChannelD) {
                if (dataFromMem.source == '00') {
                    if (this.Pout[0] instanceof FIFO_ChannelD) this.Pout[0].enqueue(dataFromMem)
                        //console.log('this.Pout[0].peek()', this.Pout[0].peek())
                } else {
                    if (this.Pout[1] instanceof FIFO_ChannelD) this.Pout[1].enqueue(dataFromMem)
                }
            // } 
        }
        if (Abiter == 3) {
            const dataFromSInterconnect = this.Pin[2].dequeue()
            if (dataFromSInterconnect instanceof ChannelD) {
                if (dataFromSInterconnect.source == '00') {
                    if (this.Pout[0] instanceof FIFO_ChannelD) this.Pout[0].enqueue(dataFromSInterconnect)
                } else {
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