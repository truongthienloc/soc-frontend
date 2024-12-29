// TypeScript

import { BinToHex } from './convert'
import { DecToHex } from './convert'

export default class Master {
    name: string
    active: boolean
    source: string
    count_get: number
    count_put: number
    life: number
    result: number
    ir: string

    constructor(name: string, active: boolean, source: string) {
        this.name = name
        this.active = active
        this.source = source
        this.count_get = 0
        this.count_put = 0
        this.life = 4
        this.result = 0
        this.ir = ''
    }

    process(): void {
        this.life -= 1
    }

    send(
        message: string,
        address: string,
        port: string,
        cycle: number,
        data: string,
    ): string {
        if (!this.active) {
            return ''
        }

        const SlaveName = 'Data Memory'
        if (message === 'GET') {
            this.count_get += 1
            this.ir = `10000001${this.source}${address.padStart(32, '0')}110000000000000000`
            return `10000001${this.source}${address.padStart(32, '0')}11000000000000000000000000000000000000000000000000`
        }

        if (message === 'PUT') {
            this.count_put += 1
            //this.ir = `00000010${this.source}${address.padStart(32, '0')}110${data}`
            return `00000010${this.source}${address.padStart(32, '0')}110${data}`
        }

        return ''
    }

    receive(
        SlaveName: string,
        cycle: number,
        port: string,
        channelD: { opcode: string; payload: string },
    ): string | undefined {
        if (!this.active) {
            return ' '
        }

        // println(`Cycle ${cycle}: Master ${this.name} is receiving data from ${port}`);
        // println(`Cycle ${cycle}: Master ${this.name} has received data from Slave ${SlaveName}`);

        if (channelD.opcode === '000') {
            return ' '
        }

        if (channelD.opcode === '001') {
            // println(`Cycle ${cycle}: The data is gotten: ${BinToHex(channelD.payload)}`);
            return channelD.payload
        }
    }
}
