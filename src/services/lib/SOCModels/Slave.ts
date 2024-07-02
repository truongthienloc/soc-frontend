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
        cycle: number,
        port: string,
        message: string,
        data: string,
        println: (...args: string[]) => void,
    ): string {
        if (!this.active) {
            return ''
        }

        const MasterName = `CPU [${dec('0' + this.source)}]`
        // println(`Cycle ${cycle}: Slave ${this.name} is sending message ${message} to Master`, MasterName);
        // println(`Cycle ${cycle}: Slave ${this.name} is putting data on Port ${port}`);

        if (message === 'AccessAck') {
            this.AccessAck += 1
            this.ir = (
                '000' +
                '00' +
                '01' +
                this.source +
                '000' +
                '0' +
                '0000000000000000' +
                '0' +
                '0'
            ).padEnd(36, '0')
            // println(`Cycle ${cycle}: Instruction Register of ${this.name}: `, BinToHex(this.ir));
            return '000' + '00' + '01' + this.source + '000' + '0' + '0000000000000000' + '0' + '0'
        }

        if (message === 'AccessAckData') {
            this.AccessAckData += 1

            // println(`Cycle ${cycle}: Slave ${this.name} is sending data: ${BinToHex(data)}`);
            this.ir = ('001' + '00' + '10' + this.source + '111' + '0' + data + '0' + '0').padEnd(
                36,
                '0',
            )
            return '001' + '00' + '10' + this.source + '111' + '0' + data + '0' + '0'
        }

        return ''
    }

    receive(
        cycle: number,
        port: string,
        ChannelA: { source: string; opcode: string; data: string; address: string },
        println: (...args: string[]) => void,
    ): [string, string] {
        if (!this.active) {
            return ['', '']
        }

        this.source = ChannelA.source
        const MasterName = 'RISC-V processor'
        // println(`Cycle ${cycle}: Slave ${this.name} is receiving data from ${port}`);
        // println(`Cycle ${cycle}: Slave ${this.name} has received data from Master`, MasterName);

        if (ChannelA.opcode === '000') {
            // println AccessAckData
            // println(`Cycle ${cycle}: The data is written: ${BinToHex(ChannelA.data)}`);
        }
        return [ChannelA.data, BinToHex(ChannelA.address)]
    }
}
