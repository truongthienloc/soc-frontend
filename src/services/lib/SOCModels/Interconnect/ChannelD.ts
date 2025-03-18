export default class ChannelD {
    opcode  : string
    param   : string
    size    : string
    source  : string
    sink    : string
    denied  : string
    data    : string
    corrupt : string
    valid   : string
    ready   : string

    constructor(
        opcode   : string
        ,param   : string
        ,size    : string
        ,source  : string
        ,sink    : string
        ,denied  : string
        ,data    : string
        ,corrupt : string
        ,valid   : string
        ,ready   : string 
    ) {
        this.opcode   = opcode
        this.param    = param
        this.size     = size
        this.source   = source
        this.sink     = sink
        this.denied   = denied
        this.data     = data
        this.corrupt  = corrupt
        this.valid    = valid
        this.ready    = ready
    }
}
