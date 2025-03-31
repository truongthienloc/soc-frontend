import ChannelA             from "./ChannelA"
import ChannelD             from "./ChannelD"
import Master               from "./Master"
import Slave                from "./Slave"
import { FIFO_ChannelA }    from "./FIFO_ChannelA"
import { FIFO_ChannelD }    from "./FIFO_ChannelD"
import Cycle                from "../Compile/cycle"
import {Logger }            from '../Compile/soc.d'
import { read } from "fs"

export default class Bridge {
    Bridge_master               : Master
    Bridge_slave                : Slave
    fifo_from_Interconnect      : FIFO_ChannelA
    fifo_from_subInterconnect   : FIFO_ChannelD
    state                       : number
    active_println              : boolean
    logger                     ?: Logger

    constructor () {
        this.Bridge_master              = new Master('Bridge_master', true, '00') //tmp_src
        this.Bridge_slave               = new Slave ('Bridge_slave', true)
        this.fifo_from_Interconnect     = new FIFO_ChannelA ()
        this.fifo_from_subInterconnect  = new FIFO_ChannelD ()
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

    public Run (
        dataFrInterconnect          : any//FIFO_ChannelA
        ,dataFrsubInterconnect      : any//ChannelD
        ,ready0                     : boolean  // interconncet ready
        ,ready1                     : boolean // sub-interconnect ready
        ,cycle                      : Cycle
    ) {

        if (this.state == 0)    {
            if (!dataFrInterconnect.isEmpty()) {
                while (!dataFrInterconnect.isEmpty()) {
                    if (dataFrInterconnect.peek().valid == '1') {
                        this.fifo_from_Interconnect.enqueue (dataFrInterconnect.dequeue())
                    }
                }
                this.println (
                    this.active_println
                    ,'Cycle '
                    + cycle.toString() 
                    +': The BRIDGE is receiving data from INTERCONNECT.'
                )  
                cycle.incr() 
            this.state += 1
           } else {
            console.log('1')
           }
           return
        }

        if (this.state == 1)    {

            if (!this.fifo_from_Interconnect.isEmpty() && ready1) {
                this.Bridge_slave.receive(this.fifo_from_Interconnect.dequeue())
                this.Bridge_master.ChannelA = this.Bridge_slave.ChannelA
                this.Bridge_master.ChannelA.valid = '1'
                this.println (
                    this.active_println
                    ,'Cycle '
                    + cycle.toString() 
                    +': The BRIDGE is sending data to SUB-INTERCONNECT.'
                )  
                cycle.incr() 
                this.state += 1
            } 
            return
        }

        if (this.state == 2)   {
            this.Bridge_master.ChannelA.valid   = '0'
            if (dataFrsubInterconnect.valid     == '1'&& ready0) {
                this.Bridge_master.receive(dataFrsubInterconnect)
                this.println (
                    this.active_println
                    ,'Cycle '
                    + cycle.toString() 
                    +': The BRIDGE is receiving data from SUB-INTERCONNECT.'
                )  
                cycle.incr() 

                this.Bridge_slave.ChannelD          = this.Bridge_master.ChannelD
                this.Bridge_slave.ChannelD.valid    = '1'
                this.println (
                    this.active_println
                    ,'Cycle '
                    + cycle.toString() 
                    +': The BRIDGE is sending data to INTERCONNECT.'
                )
                cycle.incr()

                this.state += 1
            }
            return
        }

        if (this.state == 3)    {
            this.Bridge_slave.ChannelD.valid = '0'
            this.state = 0
            return 
        }

        // if (this.state == 4) {
        //     if (!this.fifo_from_Interconnect.isEmpty()) {
        //         if (ready1) {
        //             this.Bridge_slave.receive(this.fifo_from_Interconnect.dequeue())
        //             this.Bridge_master.ChannelA = this.Bridge_slave.ChannelA
        //             this.Bridge_master.ChannelA.valid = '1'
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