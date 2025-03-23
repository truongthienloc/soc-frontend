import ChannelA             from "./ChannelA"
import ChannelD             from "./ChannelD"
import Master               from "./Master"
import Slave                from "./Slave"
import { FIFO_ChannelA }    from "./FIFO_ChannelA"
import { FIFO_ChannelD }    from "./FIFO_ChannelD"
import { read } from "fs"

export default class Bridge {
    Bridge_master               : Master
    Bridge_slave                : Slave
    fifo_from_Interconnect      : FIFO_ChannelA
    fifo_from_subInterconnect   : FIFO_ChannelD
    state                       : number

    constructor (active: boolean) {
        this.Bridge_master =  new Master('Bridge_master', true, '00') //tmp_src
        this.Bridge_slave  =  new Slave ('Bridge_slave', true)
        this.fifo_from_Interconnect = new FIFO_ChannelA ()
        this.fifo_from_subInterconnect = new FIFO_ChannelD ()
        this.state                      = 0
    }

    public Run (
        dataFrInterconnect: any//FIFO_ChannelA
        ,dataFrsubInterconnect: any//ChannelD
        ,ready                  : boolean
    ) {

        this.fifo_from_Interconnect = dataFrInterconnect
        this.fifo_from_subInterconnect.enqueue({...dataFrsubInterconnect})
        if (this.state == 0) {
            this.Bridge_master.ChannelA.valid = '0'

            if (!dataFrInterconnect.isEmpty () || dataFrsubInterconnect.valid=='1') {
                if (!dataFrInterconnect.isEmpty ()) {
                    if (dataFrInterconnect.peek().valid == '1' ) this.fifo_from_Interconnect = dataFrInterconnect
                }               
                    this.state += 1
                    console.log ('dataFrInterconnect dataFrsubInterconnect', dataFrInterconnect, dataFrsubInterconnect)
                    this.fifo_from_subInterconnect.enqueue({...dataFrsubInterconnect})
            }
            return
        }

        if (this.state == 1) {
            // console.log('this.Bridge_slave.ChannelD1: ', this.fifo_from_Interconnect.dequeue())
            if (!this.fifo_from_Interconnect.isEmpty() && ready) {
                this.Bridge_slave.receive(this.fifo_from_Interconnect.dequeue())
                this.Bridge_master.ChannelA = this.Bridge_slave.ChannelA
                this.Bridge_master.ChannelA.valid = '1'
                console.log(' this.Bridge_master.ChannelA',  this.Bridge_master.ChannelA)
            }
            if (!this.fifo_from_subInterconnect.isEmpty() && ready) {
                this.Bridge_master.receive(this.fifo_from_subInterconnect.dequeue())
                this.Bridge_slave.ChannelD = this.Bridge_master.ChannelD
                this.Bridge_master.ChannelD.valid = '1'
            }
            this.state = 0
            return 
        }
    }
}

//  0 -> Nhan tu Interconnect -> 1
//  1 -> Chuyen den Sub-Interconnect -> 2
//  2 -> Nhan tu Sub-Interconnec -> 3
//  3 -> Chuyen Interconnect -> 0