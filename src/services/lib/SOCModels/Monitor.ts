import Slave from './Slave'
import ChannalA from "./ChannelA"


export class Monitor {
    active  : boolean
    data    : string
    slave   : Slave
  
    constructor() {
      this.active = false
      this.data   = ""
      this.slave  = new Slave ('Monitor', false)
    }

    public setData(ChannalA: ChannalA): void {
      let [, data]  = this.slave.receive (ChannalA)
      this.data     = data.padStart (32, '0');
    }

    public getData(): string {
      return this.data;
    }
  }