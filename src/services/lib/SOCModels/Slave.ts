// println Import necessary functions from the 'convert' module
import { BinToHex } from './convert'
import { dec } from './convert'
import ChannalA from "./ChannelA"
import ChannalD from "./ChannelD"
import { changeEnd } from 'codemirror'

export default class Slave {
    name            : string
    active          : boolean
    ChannelD        : ChannalD

    constructor(name: string, active: boolean) {
        this.name           = name
        this.active         = active
        this.ChannelD       = new ChannalD ('000', '00' , '10'    , '00'   ,
                                            '0'  , '0'  , '0'.padStart(32, '0') , 
                                            '0'  , )
    }

    send(
        message : string ,
        source  : string ,
        data    : string ,
    ) {
        if (!this.active) return ''
        if (message === 'AccessAck') {
            this.ChannelD.opcode   = '000'    
            this.ChannelD.param    = '00'    
            this.ChannelD.size     = '10'     
            this.ChannelD.source   = source   
            this.ChannelD.sink     = '0'  
            this.ChannelD.denied   = '0'      
            this.ChannelD.data     = '0'.padStart(32, '0')     
            this.ChannelD.corrupt  = '0'   
        }
        if (message === 'AccessAckData') {
            this.ChannelD.opcode   = '001'    
            this.ChannelD.param    = '00'    
            this.ChannelD.size     = '10'     
            this.ChannelD.source   = source   
            this.ChannelD.sink     = '0'  
            this.ChannelD.denied   = '0'      
            this.ChannelD.data     = data     
            this.ChannelD.corrupt  = '0'  
        }
    }

    receive(
        ChannelA: ChannalA
    ): [string, string] {
        if (!this.active) {
            return ['', ''] //[di2s, ai2s]
        }
        return [ChannelA.data, ChannelA.address]
    }
}
