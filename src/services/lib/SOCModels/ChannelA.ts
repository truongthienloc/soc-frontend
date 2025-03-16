export default class ChannelA {
    opcode  : string
    param   : string
    size    : string
    source  : string
    address : string
    mask    : string
    data    : string
    corrupt : string
    valid   : string
    ready   : string

    constructor(
        opcode   : string
        ,param   : string
        ,size    : string
        ,source  : string
        ,address : string
        ,mask    : string
        ,data    : string
        ,corrupt : string
        ,valid   : string
        ,ready   : string 
    ) {
        this.opcode   = opcode
        this.param    = param
        this.size     = size
        this.source   = source
        this.address  = address
        this.mask     = mask
        this.data     = data
        this.corrupt  = corrupt
        this.valid    = valid
        this.ready    = ready
    }
}
