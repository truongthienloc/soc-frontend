export default class ChannelA   {
    opcode  : string
    param   : string
    size    : string
    source  : string
    address : string
    mask    : string 
    data    : string
    corrupt : string
    channelA: string

    constructor(    
                opcode  : string ,
                param   : string ,
                size    : string ,
                source  : string ,
                address : string ,
                mask    : string ,
                data    : string ,
                corrupt : string ,
    ) {
        this.opcode   = opcode   
        this.param    = param   
        this.size     = size    
        this.source   = source  
        this.address  = address 
        this.mask     = mask     
        this.data     = data    
        this.corrupt  = corrupt  
        this.channelA = ( opcode + param + size    + source + address + 
                          mask   + data  + corrupt )
    }

    

}
