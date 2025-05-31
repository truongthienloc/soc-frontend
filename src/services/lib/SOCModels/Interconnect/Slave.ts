import ChannelA from "./ChannelA"
import ChannelD from "./ChannelD"

export default class slave_interface {
    name    : string
    active  : boolean
    ChannelD: ChannelD
    ChannelA: ChannelA

    constructor(name: string, active: boolean) {
        this.name       = name
        this.active     = active
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
        this.ChannelA   = new ChannelA (  '000'                 // opcode 
                                        , '000'                 // param
                                        , '10'                  // size
                                        , '00'                  // source
                                        , '0'.padStart(17, '0') // address
                                        , '0000'                // mask
                                        , '0'.padStart(32, '0') // data
                                        , '0'                   // corrupt
                                        , '0'
                                        , '0'
                                    ) 
        
        
    }

    send(message: string, source: string, data: string) {
        if (!this.active) return null

        let opcode = message === "AccessAck" ? '000' : message === "AccessAckData" ? '001' : ''

        this.ChannelD = new ChannelD (opcode
                                    , '000'
                                    , '10'
                                    , source
                                    , '0'
                                    , '0000'
                                    , data
                                    , '0'
                                    , '1'
                                    , '0')
    }

    receive(channelA: ChannelA){
        if (!this.active) return null
        this.ChannelA = channelA
    }
}
