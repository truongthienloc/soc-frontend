// println Import necessary functions from the 'convert' module
import { BinToHex } from './convert'
import { dec } from './convert'

export default class Slave {
    name: string
    active: boolean
    AccessAck: number
    AccessAckData: number
    ir: string
    source: string | undefined

    constructor(name: string, active: boolean) {
        this.name = name
        this.active = active
        this.AccessAck = 0
        this.AccessAckData = 0
        this.ir = ''
        this.source = undefined
    }

    send(
        message: string,
        data: string,
    ): string {
        if (!this.active) return ''
        // const MasterName = `CPU [${dec('0' + this.source)}]`
        if (message === 'AccessAck') {
            this.AccessAck += 1
            return '000' + '00' + '01' + this.source + '000' + '0' + '0000000000000000' + '0' + '0'
        }
        if (message === 'AccessAckData') {
            this.AccessAckData += 1
            return '001' + '00' + '10' + this.source + '111' + '0' + data + '0' + '0'
        }
        return ''
    }

    receive(
        ChannelA: string
    ): [string, string] {
        if (!this.active) {
            return ['', '']
        }
        this.source = ChannelA.slice(8,10)
        // if (ChannelA === '000') {
        //     // println AccessAckData
        //     // println(`Cycle ${cycle}: The data is written: ${BinToHex(ChannelA.data)}`);
        // }
        // //console.log('BinToHex(ChannelA.address)', ChannelA.address)
        return [ChannelA.slice(-32), ChannelA.slice(9,41)]
    }
}
