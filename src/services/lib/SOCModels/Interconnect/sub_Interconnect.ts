import ChannelA             from "./ChannelA"
import ChannelD             from "./ChannelD"
import { FIFO_ChannelA }    from "./FIFO_ChannelA"
import { FIFO_ChannelD }    from "./FIFO_ChannelD"
import { FIFO_timing }      from "./FIFO_timing"
import Cycle                from "../Compile/cycle"
import {Logger }            from '../Compile/soc.d'

export default class TL_UL {
    active      : boolean
    port_in         : (FIFO_ChannelD | FIFO_ChannelA)[]
    Timming     : FIFO_timing[]
    port_out        : (FIFO_ChannelD | FIFO_ChannelA)[]
    Pactived    : boolean[]
    state       : number
    ready       : boolean
    logger     ?: Logger
    active_println              : boolean

    constructor(active: boolean) {
        this.active         = active
        this.state          = 0
        this.active_println = true
        this.ready          = false

        this.port_in           = [
                            new FIFO_ChannelA() // Bridge
                            , new FIFO_ChannelD() // DMA
                            , new FIFO_ChannelD() // Led
                            ]

        this.port_out = [
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

    reset (){
        this.state          = 0
        this.active_println = true
        this.ready          = false

        this.port_in           = [
                            new FIFO_ChannelA() // Bridge
                            , new FIFO_ChannelD() // DMA
                            , new FIFO_ChannelD() // Led
                            ]

        this.port_out = [
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

    Controller (
        dataFromBridge           : FIFO_ChannelA
        ,dataFromDMA             : ChannelD
        ,dataFromLed             : ChannelD
        ,dataFromBridge_valid    : boolean
        ,Led_ready               : boolean
        ,Bridge_ready            : boolean
        ,dataFromDMA_valid       : boolean
        ,dataFromLed_valid       : boolean
        ,cycle                   : Cycle
    ) {


        if (this.state == 0) {
            this.ready = true

            this.RecData (
                dataFromBridge           
                ,dataFromDMA                
                ,dataFromLed                             
                ,dataFromBridge_valid    
                ,dataFromDMA_valid          
                ,dataFromLed_valid              
                ,cycle                      
            )

            if (! ((this.port_in[0].isEmpty()) && (this.port_in[1].isEmpty()) && (this.port_in[2].isEmpty()))) {
                this.state +=1
                this.ready = false
            }
            
            return
        }
        if (this.state == 1) {
            this.ready = false
            this.Route (this.Abiter(), cycle, Bridge_ready, Led_ready)
            this.state = 0
            this.ready = true
            return
        }
    }

    RecData(
        dataFromBridge           : FIFO_ChannelA
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

    RecFromBridge(data: FIFO_ChannelA, cycle : Cycle, valid: boolean): void {
        if (this.active && this.Pactived[0] && !data.isEmpty()) {
            if (data.peek().valid == '1') {
                this.println (
                    this.active_println
                    ,'Cycle '
                    + cycle.toString() 
                    +': The SUB-INTERCONNECT is receiving data from BRIDGE.'
                )
    
                if (this.port_in[0] instanceof FIFO_ChannelA) {
                    this.port_in[0].enqueue(data.dequeue())
                    this.Timming[0].enqueue(cycle.cycle)
                } else {
                    console.error("Error: port_in[0] is not FIFO_ChannelA")
                }
            }
            
        }
    }

    RecFromDMA(data: ChannelD, cycle : Cycle, valid: boolean): void {
        if (this.active && this.Pactived[1]) {
            if (data.valid == '1') {
                this.println (
                    this.active_println
                    ,'Cycle '
                    + cycle.toString() 
                    +': The SUB-INTERCONNECT is receiving data from DMA.'
                )

                if (this.port_in[1] instanceof FIFO_ChannelD) {
                    this.port_in[1].enqueue ({...data})
                    this.Timming[1].enqueue(cycle.cycle)
                } else {
                    console.error("Error: port_in[1] is not FIFO_ChannelA")
                }
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

            if (this.port_in[2] instanceof FIFO_ChannelD) {
                this.port_in[2].enqueue({...data})
                this.Timming[2].enqueue(cycle.cycle)
            } else {
                console.error("Error: port_in[2] is not FIFO_ChannelD")
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
                return i;
            }
        }

        return -1
    }

    Route (Abiter: number
        , cycle: Cycle
        , Bridge_ready: boolean
        , Led_ready   : boolean
    ) {

        if (Abiter == 0 ) {
            const dataFromBridge = {...this.port_in[0].peek()}
                // console.log ('dataFromBridge', dataFromBridge)
                if (
                    (
                    (
                        (parseInt('0'+dataFromBridge.address, 2)    >= 0x0020014) 
                    &&  (parseInt('0'+dataFromBridge.address, 2)    <= 0x0020014 +  288 * 4) 
                    )
                    ||  (parseInt('0'+dataFromBridge.address, 2)    == 0x0020010    )
                    )
                &&  !this.port_in[0].isEmpty () && Led_ready

                ) {
                   
                    this.println (
                        this.active_println
                        ,'Cycle '
                        + cycle.toString() 
                        +': The SUB-INTERCONNECT is sending data from BRIDGE to LED-MATRIX.'
                    )
                    // console.log (Led_ready)
                    if (this.port_out[2] instanceof FIFO_ChannelA) this.port_out[2].enqueue({...this.port_in[0].dequeue()})
                    this.Timming[0].dequeue()
                }
                if (
                    (parseInt('0'+dataFromBridge.address, 2) == 0x0020000) 
                ||  (parseInt('0'+dataFromBridge.address, 2) == 0x0020004)
                ||  (parseInt('0'+dataFromBridge.address, 2) == 0x0020008)
                ||  (parseInt('0'+dataFromBridge.address, 2) == 0x002000C)
                &&  !this.port_in[0].isEmpty()
                ) {

                    this.println (
                        this.active_println
                        ,'Cycle '
                        + cycle.toString() 
                        +': The SUB-INTERCONNECT is sending data from BRIDGE to DMA.'
                    )

                    if (this.port_out[1] instanceof FIFO_ChannelA) this.port_out[1].enqueue({...this.port_in[0].dequeue()})
                    this.Timming[0].dequeue()
                }
            //}
        }
        if (Abiter == 1) {
            const dataFromDMA = {...this.port_in[1].peek()}
            // if (dataFromDMA instanceof ChannelD) {
            if (!this.port_in[1].isEmpty() && Bridge_ready
            
            ) {
                this.println (
                    this.active_println
                    ,'Cycle '
                    + cycle.toString() 
                    +': The SUB-INTERCONNECT is sending data from DMA to BRIDGE.'
                )
                
                if (this.port_out[0] instanceof FIFO_ChannelD) this.port_out[0].enqueue({...this.port_in[1].dequeue()})
                this.Timming[1].dequeue()
            }
        }

        if (Abiter == 2) {
            const dataFromLED = {...this.port_in[2].peek()}
            if (!this.port_in[2].isEmpty()) {
                this.println (
                    this.active_println
                    ,'Cycle '
                    + cycle.toString() 
                    +': The SUB-INTERCONNECT is sending data from LED-MATRIX to BRIDGE.'
                )
                        
                if (this.port_out[0] instanceof FIFO_ChannelD) this.port_out[0].enqueue({...this.port_in[2].dequeue()})
                this.Timming[2].dequeue()
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