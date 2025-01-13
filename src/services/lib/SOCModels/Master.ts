// TypeScript
import { channel } from "diagnostics_channel"
import ChannalA from "./ChannelA"
import ChannalD from "./ChannelD"
import { BinToHex } from './convert'
import { DecToHex } from './convert'

export default class Master {
    name        : string
    active      : boolean
    source      : string
    ChannelA    : ChannalA

    constructor(name: string, active: boolean, source: string) {
        this.name       = name
        this.active     = active
        this.source     = source
        this.ChannelA   = new ChannalA ('000', '000' , '10'   , this.source   ,
                                        '0'.padStart(32, '0') , '0000' , 
                                        '0'.padStart(32, '0') , '0'    )
    }

    send(
        message : string,
        address : string,
        data    : string,
    ): string {
        if (!this.active) {
            return ''
        }

        if (message === 'GET') {
            this.ChannelA.opcode   = '100'   
            this.ChannelA.param    = '000'   
            this.ChannelA.size     = '10'    
            this.ChannelA.source   = this.source  
            this.ChannelA.address  = address.padStart(32, '0') 
            this.ChannelA.mask     = '1111'     
            this.ChannelA.data     = '0'.padStart(32, '0')    
            this.ChannelA.corrupt  = '0' 
        }

        if (message === 'PUT') {
            this.ChannelA.opcode   = '000'   
            this.ChannelA.param    = '000'   
            this.ChannelA.size     = '10'    
            this.ChannelA.source   = this.source  
            this.ChannelA.address  = address.padStart(32, '0') 
            this.ChannelA.mask     = '1111'     
            this.ChannelA.data     = data.padStart(32, '0')    
            this.ChannelA.corrupt  = '0' 
        }

        return ''
    }

    receive(
        message     : string   ,
        channelD    : ChannalD ,
    ): string | undefined {
        if (!this.active) {
            return ''
        }

        if (message === 'AccessAck') {
            return ''
        }

        if (channelD.opcode === 'AccessAckData') {
            return channelD.data
        }
    }
}
