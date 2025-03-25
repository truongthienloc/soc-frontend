import ChannelA             from "./ChannelA"
import ChannelD             from "./ChannelD"
import { FIFO_ChannelA }    from "./FIFO_ChannelA"
import { FIFO_ChannelD }    from "./FIFO_ChannelD"
import { FIFO_timing }      from "./FIFO_timing"
import Cycle                from "../Compile/cycle"
import {Logger }            from '../Compile/soc.d'

export default class InterConnect {
    active      : boolean
    Pin         : (FIFO_ChannelD | FIFO_ChannelA)[]
    Timming     : FIFO_timing[]
    Pout        : (FIFO_ChannelD | FIFO_ChannelA)[]
    Pactived    : boolean[]
    state       : number
    logger     ?: Logger
    active_println              : boolean

    constructor(active: boolean) {
        this.active         = active
        this.state          = 0
        this.active_println = true

        this.Pin           = [
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

    Run (
        dataFromBridge           : ChannelA
        ,dataFromDMA             : ChannelD
        ,dataFromLed             : ChannelD
        ,dataFromBridge_valid    : boolean
        ,dataFromDMA_valid       : boolean
        ,dataFromLed_valid       : boolean
        ,cycle                   : Cycle
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
            if (! ((this.Pin[0].isEmpty()) && (this.Pin[1].isEmpty()) && (this.Pin[2].isEmpty()))) {
                // console.log('this.state, this.Pin, this.Pout, this.Timming',this.state, this.Pin, this.Pout, this.Timming)
                this.state +=1
                cycle.incr()
            }
            return
        }
        if (this.state == 1) {
            this.Route (this.Abiter(), cycle)
            this.state = 0
            return
        }
    }

    RecData(
        dataFromBridge           : ChannelA
        ,dataFromDMA             : ChannelD
        ,dataFromLed             : ChannelD
        ,dataFromBridge_valid    : boolean
        ,dataFromDMA_valid       : boolean
        ,dataFromLed_valid       : boolean
        ,cycle                   : Cycle
    ) {
        this.RecFromBridge(dataFromBridge, cycle, dataFromBridge_valid)
        this.RecFromDMA(dataFromDMA, cycle, dataFromDMA_valid)
        this.RecFromLed(dataFromLed, cycle, dataFromLed_valid)

    }

    RecFromBridge(data: ChannelA, cycle : Cycle, valid: boolean): void {
        // console.log (data)
        if (this.active && this.Pactived[0] && valid) {

            this.println (
                this.active_println
                ,'Cycle '
                + cycle.toString() 
                +': The SUB-INTERCONNECT is receiving data from BRIDGE.'
            )

            if (this.Pin[0] instanceof FIFO_ChannelA) {
                this.Pin[0].enqueue({...data})
                this.Timming[0].enqueue(cycle.cycle)
            } else {
                console.error("Error: Pin[0] is not FIFO_ChannelA")
            }
        }
    }

    RecFromDMA(data: ChannelD, cycle : Cycle, valid: boolean): void {
        if (this.active && this.Pactived[1] && valid) {

            this.println (
                this.active_println
                ,'Cycle '
                + cycle.toString() 
                +': The SUB-INTERCONNECT is receiving data from DMA.'
            )

            if (this.Pin[1] instanceof FIFO_ChannelD) {
                this.Pin[1].enqueue({...data})
                this.Timming[1].enqueue(cycle.cycle)
            } else {
                console.error("Error: Pin[1] is not FIFO_ChannelA")
            }
        }
    }

    RecFromLed(data: ChannelD, cycle : Cycle, valid: boolean): void {
        if (this.active && this.Pactived[2] && valid) {

            this.println (
                this.active_println
                ,'Cycle '
                + cycle.toString() 
                +': The SUB-INTERCONNECT is receiving data from LED-MATRIX.'
            )

            if (this.Pin[2] instanceof FIFO_ChannelD) {
                this.Pin[2].enqueue({...data})
                this.Timming[2].enqueue(cycle.cycle)
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

    Route (Abiter: number
        , cycle: Cycle) {
        // console.log('abiute',Abiter)
        if (Abiter == 0) {
            const dataFromBridge = {...this.Pin[0].dequeue()}
        //     console.log ('dataFromBridge', dataFromBridge)
        //     console.log ((
        //         (parseInt('0'+dataFromBridge.address, 2) >= 0x000304C  ) 
        //     &&  (parseInt('0'+dataFromBridge.address, 2) <= 0x000305C )
        // ))
            // if (dataFromBridge instanceof ChannelA) {
                // if (this.Pout[2] instanceof FIFO_ChannelA) this.Pout[2].enqueue(dataFromBridge)
                if (
                    (parseInt('0'+dataFromBridge.address, 16)    >= 0X1C000     ) 
                &&  (parseInt('0'+dataFromBridge.address, 16)    <= 0X1FFFF     )
                ) {

                    this.println (
                        this.active_println
                        ,'Cycle '
                        + cycle.toString() 
                        +': The SUB-INTERCONNECT is sending data from BRIDGE to LED-MATRIX.'
                    )

                    if (this.Pout[2] instanceof FIFO_ChannelA) this.Pout[2].enqueue(dataFromBridge)
                }
                if (
                    (parseInt('0'+dataFromBridge.address, 2) >= 0x000304C  ) 
                &&  (parseInt('0'+dataFromBridge.address, 2) <= 0x000305C )
                ) {

                    this.println (
                        this.active_println
                        ,'Cycle '
                        + cycle.toString() 
                        +': The SUB-INTERCONNECT is sending data from BRIDGE to DMA.'
                    )

                    if (this.Pout[1] instanceof FIFO_ChannelA) this.Pout[1].enqueue(dataFromBridge)
                }
            //}
        }
        if (Abiter == 1) {
            const dataFromDMA = {...this.Pin[1].dequeue()}
            // if (dataFromDMA instanceof ChannelD) {

                this.println (
                    this.active_println
                    ,'Cycle '
                    + cycle.toString() 
                    +': The SUB-INTERCONNECT is sending data from DMA to BRIDGE.'
                )

                if (this.Pout[0] instanceof FIFO_ChannelD) this.Pout[0].enqueue(dataFromDMA)
                // console.log ('dataFromDMA sub', dataFromDMA, this.Pout[0] instanceof FIFO_ChannelD, this.Pout[0])
            
        }
        if (Abiter == 2) {
            const dataFromLED = {...this.Pin[2].dequeue()}
            // if (dataFromLED instanceof ChannelD) {

            this.println (
                this.active_println
                ,'Cycle '
                + cycle.toString() 
                +': The SUB-INTERCONNECT is sending data from LED-MATRIX to BRIDGE.'
            )
                    
            if (this.Pout[0] instanceof FIFO_ChannelD) this.Pout[0].enqueue(dataFromLED)
                //}
        } 

        cycle.incr()

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