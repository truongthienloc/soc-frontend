export default class ChannalD   {
    opcode  : string
    param   : string
    size    : string
    source  : string
    sink    : string
    denied  : string 
    data    : string
    corrupt : string
    channelD: string

    constructor(    
                opcode  : string ,
                param   : string ,
                size    : string ,
                source  : string ,
                sink    : string ,
                denied  : string ,
                data    : string ,
                corrupt : string ,

    ) {
        this.opcode   = opcode   
        this.param    = param   
        this.size     = size    
        this.source   = source  
        this.sink     = sink 
        this.denied   = denied     
        this.data     = data    
        this.corrupt  = corrupt   
        this.channelD = ( opcode   + param + size    + source + sink  + 
                          denied   + data  + corrupt )
    }

    

}
