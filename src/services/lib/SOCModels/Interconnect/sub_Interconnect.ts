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
                    new FIFO_ChannelA() // Bridge
                    , new FIFO_ChannelD() // DMA
                    , new FIFO_ChannelD() // Led
        ]

        this.Pout = [
                    new FIFO_ChannelD()
                    ,new FIFO_ChannelA()
                    ,new FIFO_ChannelA()
        ]

        this.Timming = [
                    new FIFO_timing()
                    ,new FIFO_timing()
                    ,new FIFO_timing()
        ]

        this.Pactived = [true, true, true, true]

    }

    Run (
        dataFromBridge           : ChannelA
        ,dataFromDMA             : ChannelD
        ,dataFromLed             : ChannelD
        ,dataFromBridge_valid    : boolean
        ,dataFromDMA_valid       : boolean
        ,dataFromLed_valid       : boolean
        ,cycle                   : number
    ) {
        if (this.state == 0) {
            this.RecData (
                dataFromBridge           
                ,dataFromDMA                
                ,dataFromLed                             
                ,dataFromBridge_valid    
                ,dataFromDMA_valid          
                ,dataFromLed_valid              
                ,cycle                      
            )
            this.state +=1
        }
        if (this.state == 1) {
            this.Route (this.Abiter())
            this.state = 0
        }
    }

    RecData(
        dataFromBridge           : ChannelA
        ,dataFromDMA             : ChannelD
        ,dataFromLed             : ChannelD
        ,dataFromBridge_valid    : boolean
        ,dataFromDMA_valid       : boolean
        ,dataFromLed_valid       : boolean
        ,cycle                   : number
    ) {
        this.RecFromBridge(dataFromBridge, cycle, dataFromBridge_valid)
        this.RecFromDMA(dataFromDMA, cycle, dataFromDMA_valid)
        this.RecFromLed(dataFromLed, cycle, dataFromLed_valid)

    }

    RecFromBridge(data: ChannelA, cycle: number, valid: boolean): void {
        if (this.active && this.Pactived[0] && valid) {
            if (this.Pin[0] instanceof FIFO_ChannelA) {
                this.Pin[0].enqueue(data)
                this.Timming[0].enqueue(cycle)
            } else {
                console.error("Error: Pin[0] is not FIFO_ChannelA")
            }
        }
    }

    RecFromDMA(data: ChannelD, cycle: number, valid: boolean): void {
        if (this.active && this.Pactived[1] && valid) {
            if (this.Pin[1] instanceof FIFO_ChannelD) {
                this.Pin[1].enqueue(data)
                this.Timming[1].enqueue(cycle)
            } else {
                console.error("Error: Pin[1] is not FIFO_ChannelA")
            }
        }
    }

    RecFromLed(data: ChannelD, cycle: number, valid: boolean): void {
        if (this.active && this.Pactived[2] && valid) {
            if (this.Pin[2] instanceof FIFO_ChannelD) {
                this.Pin[2].enqueue(data)
                this.Timming[2].enqueue(cycle)
            } else {
                console.error("Error: Pin[2] is not FIFO_ChannelD")
            }
        }
    }

    Abiter()  {

        const Bridge_timming       = this.Timming[0].peek()
        const DMA_timming             = this.Timming[1].peek()
        const Led_timming          = this.Timming[2].peek()

        const firstTimming =  Math.min(...[
            Bridge_timming           // Bridge
            ,DMA_timming             // DMA
            ,Led_timming             // Led
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
        if (Abiter == 0) {
            const dataFromBridge = this.Pin[0].dequeue()
            if (dataFromBridge instanceof ChannelA) {
                // if (this.Pout[2] instanceof FIFO_ChannelA) this.Pout[2].enqueue(dataFromBridge)
                if (
                    (parseInt('0'+dataFromBridge.address, 16)    >= 0X1C000) 
                &&  (parseInt('0'+dataFromBridge.address, 16)    <= 0X1FFFF)
                ) {
                    if (this.Pout[2] instanceof FIFO_ChannelA) this.Pout[2].enqueue(dataFromBridge)
                }
                if (
                    (parseInt('0'+dataFromBridge.address, 16) > 0x0003004C) 
                    && (parseInt('0'+dataFromBridge.address, 16) <= 0x0003005C)
                ) {
                    if (this.Pout[1] instanceof FIFO_ChannelA) this.Pout[1].enqueue(dataFromBridge)
                }
            }
        }
        if (Abiter == 1) {
            const dataFromDMA = this.Pin[1].dequeue()
            if (dataFromDMA instanceof ChannelD) {
                if (this.Pout[0] instanceof FIFO_ChannelD) this.Pout[0].enqueue(dataFromDMA)
            }
        }
        if (Abiter == 2) {
            const dataFromLED = this.Pin[2].dequeue()
            if (dataFromLED instanceof ChannelD) {
                    if (this.Pout[0] instanceof FIFO_ChannelD) this.Pout[0].enqueue(dataFromLED)
                }
        } 

    }
}
//            +----------+             +-------+
//            |  brigde  |             |  DMA  |
//            +-----+----+             +---+---+
//             |    ^                    |    ^
//             v    |                    v    |
//            +---+---+                +---+---+
//            |   0   |                |   1   |
//            +---+---+                +---+---+
//             |    ^                    |    ^
//             v    |                    v    |
//             +--------------------------------+
//             |             SubInter           |
//             +--------------------------------+
//             |    ^                   
//             v    |                   
//            +---+---+               
//            |   2   |               
//            +---+---+                
//             |    ^                    
//             v    |                                  
//          +-------+-------+                 
//          |  Led matrix   |            
//          +---------------+            