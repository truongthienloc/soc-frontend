import Slave    from './Slave'
import ChannalD from "./ChannelD"

export class Keyboard {
    active  : boolean
    data    : string
    slave   : Slave
  
    constructor() {
      this.active = false
      this.data   = ""
      this.slave  = new Slave ('Keyboard', false)
    }

    public setData(data: string): void {
      this.data     = data.padStart (32, '0');
    }

    public getData(): ChannalD {
        this.slave.send ('AccessAckData', '01', this.data)
        return this.slave.ChannelD
    }
  }