// TypeScript
import { measureMemory } from "vm"
import ChannelA from "./ChannelA"
import ChannelD from "./ChannelD"

export default class Master {
    name        : string
    active      : boolean
    source      : string
    ChannelA    : ChannelA
    ChannelD    : ChannelD

    constructor(name: string, active: boolean, source: string) {
        this.name       = name
        this.active     = active
        this.source     = source
        this.ChannelA   = new ChannelA (  '000'                 // opcode 
                                        , '000'                 // param
                                        , '10'                  // size
                                        , this.source           // source
                                        , '0'.padStart(32, '0') // address
                                        , '0000'                // mask
                                        , '0'.padStart(32, '0') // data
                                        , '0'                   // corrupt
                                        , '0'
                                        , '0'
                                    )  
        this.ChannelD   = new ChannelD (  '000'                 // opcode
                                        , '00'                  // param
                                        , '10'                  // size
                                        , '00'                  // source
                                        , '0'                   // sink
                                        , '0'                   // denied
                                        , '0'.padStart(32, '0') // data
                                        , '0'                   // corrupt
                                        , '0'
                                        , '0'
                                    )
    }

    send(
        message : string,
        address : string,
        data    : string,
    ) {
        if (!this.active) {
            return ''
        }
        if (message === 'GET') {
            this.ChannelA.opcode   = '100'   
            this.ChannelA.param    = '000'   
            this.ChannelA.size     = '00'    
            this.ChannelA.source   = this.source  
            this.ChannelA.address  = address.padStart(17, '0') 
            this.ChannelA.mask     = '1111'     
            this.ChannelA.data     = '0'.padStart(32, '0')    
            this.ChannelA.corrupt  = '0' 
        }

        if (message === 'PUT') {
            this.ChannelA.opcode   = '000'   
            this.ChannelA.param    = '000'   
            this.ChannelA.size     = '00'    
            this.ChannelA.source   = this.source  
            this.ChannelA.address  = address.padStart(17, '0') 
            this.ChannelA.mask     = '1111'   
            this.ChannelA.data     = data.padStart(32, '0')   
            this.ChannelA.corrupt  = '0' 
        }

        if (message === 'AND') {
            this.ChannelA.opcode   = '011'
            this.ChannelA.param    = '010'
            this.ChannelA.size     = '00'
            this.ChannelA.source   = this.source  
            this.ChannelA.address  = address.padStart(17, '0') 
            this.ChannelA.mask     = '1111'   
            this.ChannelA.data     = data.padStart(32, '0')   
            this.ChannelA.corrupt  = '0' 
        }

        if (message === 'XOR') {
            this.ChannelA.opcode   = '011'
            this.ChannelA.param    = '000'
            this.ChannelA.size     = '00'
            this.ChannelA.source   = this.source  
            this.ChannelA.address  = address.padStart(17, '0') 
            this.ChannelA.mask     = '1111'   
            this.ChannelA.data     = data.padStart(32, '0')   
            this.ChannelA.corrupt  = '0' 
        }

        if (message === 'OR') {
            this.ChannelA.opcode   = '011'
            this.ChannelA.param    = '001'
            this.ChannelA.size     = '00'
            this.ChannelA.source   = this.source  
            this.ChannelA.address  = address.padStart(17, '0') 
            this.ChannelA.mask     = '1111'   
            this.ChannelA.data     = data.padStart(32, '0')   
            this.ChannelA.corrupt  = '0' 
        }
        if (message === 'MIN') {
            this.ChannelA.opcode   = '010'
            this.ChannelA.param    = '000'
            this.ChannelA.size     = '00'
            this.ChannelA.source   = this.source  
            this.ChannelA.address  = address.padStart(17, '0') 
            this.ChannelA.mask     = '1111'   
            this.ChannelA.data     = data.padStart(32, '0')   
            this.ChannelA.corrupt  = '0'    
        }
        if (message === 'MAX') {
            this.ChannelA.opcode   = '010'
            this.ChannelA.param    = '001' 
            this.ChannelA.size     = '00'
            this.ChannelA.source   = this.source  
            this.ChannelA.address  = address.padStart(17, '0') 
            this.ChannelA.mask     = '1111'   
            this.ChannelA.data     = data.padStart(32, '0')   
            this.ChannelA.corrupt  = '0' 
        }
        if (message === 'MINU') {
            this.ChannelA.opcode   = '010'
            this.ChannelA.param    = '010'
            this.ChannelA.size     = '00'
            this.ChannelA.source   = this.source  
            this.ChannelA.address  = address.padStart(17, '0') 
            this.ChannelA.mask     = '1111'   
            this.ChannelA.data     = data.padStart(32, '0')   
            this.ChannelA.corrupt  = '0' 
        }
        if (message === 'MAXU') {
            this.ChannelA.opcode   = '010' 
            this.ChannelA.param    = '011'
            this.ChannelA.size     = '00'
            this.ChannelA.source   = this.source  
            this.ChannelA.address  = address.padStart(17, '0') 
            this.ChannelA.mask     = '1111'   
            this.ChannelA.data     = data.padStart(32, '0')   
            this.ChannelA.corrupt  = '0' 
        }

        if (message === 'ADD') {
            this.ChannelA.opcode   = '010' 
            this.ChannelA.param    = '100'
            this.ChannelA.size     = '00'
            this.ChannelA.source   = this.source  
            this.ChannelA.address  = address.padStart(17, '0') 
            this.ChannelA.mask     = '1111'   
            this.ChannelA.data     = data.padStart(32, '0')   
            this.ChannelA.corrupt  = '0' 
        }
        if (message === 'SWAP') {
            this.ChannelA.opcode   = '011'
            this.ChannelA.param    = '011'
            this.ChannelA.size     = '00'
            this.ChannelA.source   = this.source  
            this.ChannelA.address  = address.padStart(17, '0') 
            this.ChannelA.mask     = '1111'   
            this.ChannelA.data     = data.padStart(32, '0')   
            this.ChannelA.corrupt  = '0' 
        }
    }

    receive(
        channelD    : ChannelD ,
    )  {
        if (!this.active) {
            return 
        }
        this.ChannelD = channelD
    }
}
