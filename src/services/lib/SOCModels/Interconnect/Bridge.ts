import ChannelA             from "./ChannelA"
import ChannelD             from "./ChannelD"
import Master               from "./Master"
import Slave                from "./Slave"
import { FIFO_ChannelA }    from "./FIFO_ChannelA"
import { FIFO_ChannelD }    from "./FIFO_ChannelD"

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
    ) {
        if (this.state == 0) {
            this.fifo_from_Interconnect = dataFrInterconnect
            this.fifo_from_subInterconnect.enqueue(dataFrsubInterconnect)
            this.state += 1
        }

        if (this.state == 1) {
            // console.log('this.Bridge_slave.ChannelD1: ', this.fifo_from_Interconnect.dequeue())
            if (!this.fifo_from_Interconnect.isEmpty()) {
                this.Bridge_slave.receive(this.fifo_from_Interconnect.dequeue())
                this.Bridge_master.ChannelA = this.Bridge_slave.ChannelA
            }
            if (!this.fifo_from_subInterconnect.isEmpty()) {
                this.Bridge_master.receive(this.fifo_from_subInterconnect.dequeue())
                this.Bridge_slave.ChannelD = this.Bridge_master.ChannelD
            }
            

            this.state = 0
        }
    }
}