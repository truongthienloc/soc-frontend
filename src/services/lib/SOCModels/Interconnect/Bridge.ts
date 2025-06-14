import master_interface     from "./Master"
import slave_interface      from "./Slave"
import { FIFO_ChannelA }    from "./FIFO_ChannelA"
import { FIFO_ChannelD }    from "./FIFO_ChannelD"
import Cycle                from "../Compile/cycle"
import {Logger }            from '../Compile/soc.d'
import { read } from "fs"

export default class Bridge {
    master_interface            : master_interface
    slave_interface                : slave_interface
    fifo_from_Interconnect      : FIFO_ChannelA
    fifo_from_subInterconnect   : FIFO_ChannelD
    fifo_to_subInterconnect     : FIFO_ChannelA
    state                       : number
    active_println              : boolean
    logger                     ?: Logger
    
    STATE_RECEIVE               = 0
    STATE_SEND                  = 1

    constructor () {
        this.master_interface           = new master_interface('master_interface', true, '00') //tmp_src
        this.slave_interface            = new slave_interface ('slave_interface', true)
        this.fifo_from_Interconnect     = new FIFO_ChannelA ()
        this.fifo_from_subInterconnect  = new FIFO_ChannelD ()
        this.fifo_to_subInterconnect    = new FIFO_ChannelA ()
        this.state                      = 0
        this.active_println             = true
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

    public Controller (
        dataFrInterconnect          : any//FIFO_ChannelA
        ,dataFrsubInterconnect      : any//ChannelD
        ,ready0                     : boolean  // interconncet ready
        ,ready1                     : boolean // sub-interconnect ready
        ,cycle                      : Cycle
    ) {
        // console.log ('this.dataFrsubInterconnect', dataFrsubInterconnect)
        if (this.state == this.STATE_RECEIVE)    {
            this.master_interface.ChannelA.valid = '0'
            this.master_interface.ChannelD.valid = '0'
            this.master_interface.ChannelA.ready = '1'
            this.master_interface.ChannelD.ready = '1'
            if (!dataFrInterconnect.isEmpty()) {

                if (dataFrInterconnect.peek().valid == '1') {
                    this.fifo_from_Interconnect.enqueue ({...dataFrInterconnect.dequeue()})
                }

                this.println (
                    this.active_println
                    ,'Cycle '
                    + cycle.toString() 
                    +': The BRIDGE is receiving data from INTERCONNECT.'
                )
                this.state = this.STATE_SEND 
           } 
           if (!dataFrsubInterconnect.isEmpty()) {
                dataFrsubInterconnect.peek()
                if (dataFrsubInterconnect.peek().valid     == '1') {
                    this.master_interface.receive(dataFrsubInterconnect.dequeue())
                    this.println (
                        this.active_println
                        ,'Cycle '
                        + cycle.toString() 
                        +': The BRIDGE is receiving data from SUB-INTERCONNECT.'
                    )
                    this.fifo_from_subInterconnect.enqueue ({...this.master_interface.ChannelD})
                }
                this.state = this.STATE_SEND 
           }
           if ((dataFrsubInterconnect.isEmpty())
                && (dataFrInterconnect.isEmpty())
                && (!this.fifo_from_Interconnect.isEmpty())
            ){
                this.state = this.STATE_SEND 
            }
           return
        }

        if (this.state == this.STATE_SEND) {
            this.master_interface.ChannelA.ready = '0'
            this.master_interface.ChannelD.ready = '0'
            // console.log (this.fifo_from_subInterconnect.isEmpty())
            if (!this.fifo_from_Interconnect.isEmpty() && ready1) {
                this.fifo_to_subInterconnect.enqueue (this.fifo_from_Interconnect.dequeue())
                this.master_interface.ChannelA = this.slave_interface.ChannelA

                this.println (
                    this.active_println
                    ,'Cycle '
                    + cycle.toString() 
                    +': The BRIDGE is sending data to SUB-INTERCONNECT.'
                )  
                this.state = this.STATE_RECEIVE
            } 

            if (ready0 && !this.fifo_from_subInterconnect.isEmpty()) {
                
                this.master_interface.receive (this.fifo_from_subInterconnect.dequeue())
                this.slave_interface.ChannelD          = this.master_interface.ChannelD
                this.println (
                    this.active_println
                    ,'Cycle '
                    + cycle.toString() 
                    +': The BRIDGE is sending data to INTERCONNECT.'
                )
                this.state = this.STATE_RECEIVE
    
                // if (!ready0 && this.master_interface.ChannelD.valid == '1') this.state = this.STATE_SEND
            }


            

            return 
        }

        // if (this.state == 1)    {

        //     if (!this.fifo_from_Interconnect.isEmpty() && ready1) {
        //         this.slave_interface.receive(this.fifo_from_Interconnect.dequeue())
        //         this.master_interface.ChannelA = this.slave_interface.ChannelA
        //         this.master_interface.ChannelA.valid = '1'
        //         this.println (
        //             this.active_println
        //             ,'Cycle '
        //             + cycle.toString() 
        //             +': The BRIDGE is sending data to SUB-INTERCONNECT.'
        //         )  
        //         cycle.incr() 
        //         this.state += 1
        //     } 
        //     return
        // }

        // if (this.state == 2)   {
        //     this.master_interface.ChannelA.valid   = '0'
        //     if (dataFrsubInterconnect.valid     == '1'&& ready0) {
        //         this.master_interface.receive(dataFrsubInterconnect)
        //         this.println (
        //             this.active_println
        //             ,'Cycle '
        //             + cycle.toString() 
        //             +': The BRIDGE is receiving data from SUB-INTERCONNECT.'
        //         )  
        //         cycle.incr() 

        //         this.slave_interface.ChannelD          = this.master_interface.ChannelD
        //         this.slave_interface.ChannelD.valid    = '1'
        //         this.println (
        //             this.active_println
        //             ,'Cycle '
        //             + cycle.toString() 
        //             +': The BRIDGE is sending data to INTERCONNECT.'
        //         )
        //         cycle.incr()

        //         this.state += 1
        //     }
        //     return
        // }

        // if (this.state == 3)    {
        //     this.slave_interface.ChannelD.valid = '0'
        //     this.state = 0
        //     return 
        // }

        // if (this.state == 4) {
        //     if (!this.fifo_from_Interconnect.isEmpty()) {
        //         if (ready1) {
        //             this.slave_interface.receive(this.fifo_from_Interconnect.dequeue())
        //             this.master_interface.ChannelA = this.slave_interface.ChannelA
        //             this.master_interface.ChannelA.valid = '1'
        //             this.println (
        //                 this.active_println
        //                 ,'Cycle '
        //                 + cycle.toString() 
        //                 +': The BRIDGE is sending data to SUB-INTERCONNECT.'
        //             )  
        //             cycle.incr() 
        //         }
        //         else this.state = 4
        //     } else {
        //         this.state = 0
        //     }
        // }
        
    }
}

//  0 -> Nhan tu Interconnect -> 1
//  1 -> Chuyen den Sub-Interconnect -> 2
//  2 -> Nhan tu Sub-Interconnec -> 3
//  3 -> Chuyen Interconnect -> 0