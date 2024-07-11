// TypeScript

import { dec } from './convert'

interface Port {
    active: boolean
    data: any[]
}

function createPort(active: boolean): Port {
    return { active, data: [] }
}

class ChannelA {
    opcode: string
    param: string
    size: string
    source: string
    address: string
    mask: string
    corrupt: string
    data: string
    channelA: string
    name?: string
    cycle?: number
    valid?: string
    ready?: string

    constructor(name: string, cycle: number, channelA: string) {
        if (channelA === '') {
            this.opcode = ''
            this.param = ''
            this.size = ''
            this.source = ''
            this.address = ''
            this.mask = ''
            this.corrupt = ''
            this.data = ''
            this.channelA = ''
        } else {
            this.name = name
            this.cycle = cycle
            this.valid = '1'
            this.ready = ''
            this.opcode = channelA.slice(0, 3)
            this.param = channelA.slice(3, 6)
            this.size = channelA.slice(6, 8)
            this.source = channelA.slice(8, 10)
            this.address = channelA.slice(10, 42)
            this.mask = channelA.slice(42, 44)
            this.corrupt = channelA[44]
            this.data = channelA.slice(45)
            this.channelA = channelA
            //(`Cycle ${this.cycle}: ${this.name}: Data are on Channel A`);
        }
    }

    Ready(Port_des: string): void {
        if (this.channelA !== '') {
            //(`Cycle ${this.cycle! + 1}: ${Port_des}: The receiver accepted the offered progress`);
            this.ready = '1'
        }
    }
}

class ChannelD {
    opcode: string
    param: string
    size: string
    source: string
    sink: string
    deni: string
    corrupt: string
    payload: string
    channelD: string
    ready: string
    name?: string
    cycle?: number
    valid?: string

    constructor(name: string, cycle: number, channelD: string) {
        this.ready = '1'
        if (channelD !== '') {
            this.name = name
            this.cycle = cycle
            this.opcode = channelD.slice(0, 3)
            this.param = channelD.slice(3, 5)
            this.size = channelD.slice(5, 7)
            this.source = channelD.slice(7, 9)
            this.sink = channelD.slice(9, 11)
            this.deni = channelD[12]
            this.corrupt = channelD.slice(-2)
            this.payload = channelD.slice(13, -2)
            this.channelD = channelD
            this.valid = ''
            //(`Cycle ${this.cycle}: ${this.name}: Data are on Channel D`);
        } else {
            this.opcode = ''
            this.param = ''
            this.size = ''
            this.source = ''
            this.sink = ''
            this.deni = ''
            this.corrupt = ''
            this.payload = ''
            this.channelD = ''
            this.valid = ''
        }
    }

    Ready(Port_des: string): void {
        if (this.channelD !== '') {
            //(`Cycle ${this.cycle! + 1}: ${Port_des}: The receiver accepted the offered progress`);
            this.valid = '1'
        }
    }
}

export default class InterConnect {
    active: boolean
    memory_address: number
    monitor_address: number
    keyboard_address: number
    Pin: Port[]
    Pout: Port[]
    numPin: number
    numPout: number
    ChannelA_queue: ChannelA[]
    ChannelD_queue: ChannelD[]
    ChannelA: string
    ChannelD: string

    constructor(numPin: number, numPout: number, active: boolean, 
        memory_address: number, monitor_address: number, keyboard_address: number) {
        
        this.memory_address     = memory_address
        this.monitor_address    = monitor_address
        this.keyboard_address   = keyboard_address
        this.numPin = numPin
        this.numPout = numPout
        this.Pin = []
        this.Pout = []
        for (let index = 0; index < numPin; index++) {
            this.Pin.push(createPort(true))
        }
        for (let index = 0; index < numPout; index++) {
            this.Pout.push(createPort(true))
        }
        this.ChannelA_queue = []
        this.ChannelD_queue = []
        this.ChannelA = ''
        this.ChannelD = ''
        this.active   = active
    }

    Port_in_CA(data: string, index: number, cycle: number): void {
        if (this.active== true) {
            this.Pin[index].data.push(data)
            this.Pin[index].active = true
            const port_name = `Port_in[${index}]`
            this.ChannelA_queue.push(new ChannelA(port_name, cycle, data))
        }
    }

    Port_in_CD(data: string, index: number, cycle: number): void {
        if (this.active== true) {
            this.Pin[index].data.push(data)
            this.Pin[index].active = true
            const port_name = `Port_in[${index}]`
            this.ChannelD_queue.push(new ChannelD(port_name, cycle, data))
        }
    }

    Port_out(index: number): any {
        if (this.active== true) {
            if (this.Pout[index].data.length === 0) {
                return -1
            }
            const data = this.Pout[index].data[0]
            this.Pout[index].data.shift()
            return data
        }
        
    }

    TransmitChannelA(): void {
        if (this.active== true) {
            for (const ChA of this.ChannelA_queue) {
                console.log('cha adrr', dec(ChA.address))
                if (dec('0' + ChA.address) < this.memory_address && 0 <= dec('0' + ChA.address)) {
                    this.Pout[1].data.push(ChA)
                }
                if (dec('0' + ChA.address) < this.monitor_address && this.memory_address+1 <= dec('0' + ChA.address)) {
                    this.Pout[2].data.push(ChA)
                }
                if (dec('0' + ChA.address) < this.keyboard_address && this.monitor_address+1 <= dec('0' + ChA.address)) {
                    this.Pout[3].data.push(ChA)
                }
            }
            this.ChannelA_queue = []
        } 
}

    TransmitChannelD(): void {
        let count0 = 0
        if (this.active== true) {
            for (const ChD of this.ChannelD_queue) {
                if (ChD.source === '00') {
                    //console.log('payload cd', ChD.payload)
                    this.Pout[0].data.push(ChD)
                    if (count0 === 0) ChD.Ready('Port_out[0]')
                    this.Pout[0].active = true
                    count0 += 1
                }
            }
            this.ChannelD_queue = []
        }
    }
}
