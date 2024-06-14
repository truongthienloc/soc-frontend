import RiscVProcessor from './RiscV_processor'
import InterConnect from './Interconnect'
import MMU from './MMU'
import { dec } from './convert'
import Memory from './Memory'

export default class Soc {
    name: string
    Processor: RiscVProcessor
    Bus: InterConnect
    MMU: MMU
    Memory: Memory
    Interconnect: InterConnect
    cycle: number

    constructor(name: string) {
        this.Processor = new RiscVProcessor('RiscV CPU', '00', true)
        this.Bus = new InterConnect(4, 4)
        this.Interconnect= new  InterConnect(4, 4)
        this.MMU = new MMU()
        this.Memory= new Memory()
        this.cycle = 0
        this.name = name
    }

    public Run() {
        this.Processor.setImen(
            '.text\n addi x25, x0, 1\n lui x23, 9\n sw x25, 401(x0)\n lw x1, 16(x0)',
        )
        //this.Processor.setImen('.text\n addi x2, x2, 1')
        while (this.Processor.pc < Object.values(this.Processor.Instruction_memory).length * 4) {
            this.cycle += 1
            const element = this.Processor.Instruction_memory[this.Processor.pc.toString(2)]

            this.Processor.println('CPU is running')
            let [message, data, address, rd, size] = this.Processor.run(element, this.Processor.pc)

            if (message == 'PUT') { //STORE
                if (dec('0' + address) < 399 && 0 <= dec('0' + address)) {
                    address= this.MMU.Dmem(address)
                    const dm2i = this.Processor.master.send(message, address, '0', this.cycle, data)
                    this.Bus.Port_in_CA(dm2i, 0, this.cycle)
                    this.Bus.TransmitChannelA()
                    this.cycle += 1
                    const doutChA = this.Bus.Port_out(1)
                    const [di2s, ai2s] = this.Memory.slaveMemory.receive(
                        this.cycle,
                        'Port_out[1]',
                        doutChA,
                    )
                    
                    this.Memory.Memory[ai2s] = di2s
                    
                    this.cycle += 1
                    const doutChD = this.Memory.slaveMemory.send(
                        this.cycle,
                        'Port_in[1]',
                        'AccessAck',
                        '',
                    )
                    this.Bus.Port_in_CD(doutChD, 1, this.cycle)
                    this.Bus.TransmitChannelD()
                    this.Bus.Port_out(0)
                    this.cycle += 1
                }
                if (dec('0' + address) < 499 && 400 <= dec('0' + address)) {
                    address= this.MMU.OutMem(address)
                    console.log('aasdhsahd',address)
                    const dm2i = this.Processor.master.send(message, address, '0', this.cycle, data)
                    this.Bus.Port_in_CA(dm2i, 0, this.cycle)
                    this.Bus.TransmitChannelA()
                    this.cycle += 1
                    const doutChA = this.Bus.Port_out(3)
                    const [di2s, ai2s] = this.Memory.slaveMemory.receive(
                        this.cycle,
                        'Port_out[3]',
                        doutChA,
                    )
                    
                    this.Memory.Memory[this.MMU.InMem(ai2s)] = di2s

                    this.cycle += 1
                    const doutChD = this.Memory.slaveMemory.send(
                        this.cycle,
                        'Port_in[3]',
                        'AccessAck',
                        '',
                    )
                    this.Bus.Port_in_CD(doutChD, 2, this.cycle)
                    this.Bus.TransmitChannelD()
                    this.Bus.Port_out(0)
                    this.cycle += 1
                }
            }

            if (message == 'GET') {
                
                if (dec('0' + address) < 399 && 0 <= dec('0' + address)) {
                    address= this.MMU.Dmem(address)
                    const dm2i = this.Processor.master.send(message, address, '0', this.cycle, data)
                    this.Bus.Port_in_CA(dm2i, 0, this.cycle)
                    this.Bus.TransmitChannelA()
                    this.cycle += 1
                    const doutChA = this.Bus.Port_out(1)
                    const [, ai2s] = this.Memory.slaveMemory.receive(
                        this.cycle,
                        'Port_out[1]',
                        doutChA,
                    )
                    //const di2s= this.Memory.DataMemory[ai2s]
                    const di2s = this.Memory.Memory[ai2s]
                    this.cycle += 1
                    const doutChD = this.Memory.slaveMemory.send(
                        this.cycle,
                        'Port_in[1]',
                        'AccessAckData',
                        di2s,
                    )
                    console.log('channelD', doutChD)
                    this.Bus.Port_in_CD(doutChD, 1, this.cycle)
                    this.Bus.TransmitChannelD()
                    const temp = this.Bus.Port_out(0).payload
                    if (temp === 'undefined'|| temp === undefined) this.Processor.register[rd] = '0'.padStart(32, '0')
                    if (temp !== 'undefined' && temp !== undefined) this.Processor.register[rd] = temp
                    this.cycle += 1
                }
                if (dec('0' + address) < 499 && 400 <= dec('0' + address)) {
                    address= this.MMU.InMem(address)
                    const dm2i = this.Processor.master.send(message, address, '0', this.cycle, data)
                    this.Bus.Port_in_CA(dm2i, 0, this.cycle)
                    this.Bus.TransmitChannelA()
                    this.cycle += 1
                    const doutChA = this.Bus.Port_out(2)
                    const [, ai2s] = this.Memory.slaveMemory.receive(
                        this.cycle,
                        'Port_out[2]',
                        doutChA,
                    )
                    //const di2s= this.Memory.DataMemory[ai2s]
                    
                    const di2s = this.Memory.Memory[ai2s]
                    this.cycle += 1
                    const doutChD = this.Memory.slaveMemory.send(
                        this.cycle,
                        'Port_in[2]',
                        'AccessAckData',
                        di2s,
                    )
                    console.log('channelD', doutChD)
                    this.Bus.Port_in_CD(doutChD, 2, this.cycle)
                    this.Bus.TransmitChannelD()
                    //console.log('wrietData',this.Bus.Port_out(0).payload)
                    const temp = this.Bus.Port_out(0).payload
                    
                    if (temp === 'undefined'|| temp === undefined) this.Processor.register[rd] = '0'.padStart(32, '0')
                    if (temp !== 'undefined' && temp !== undefined) this.Processor.register[rd] = temp
                    this.cycle += 1

                }

            }
            console.log('Data memory', this.Memory.Memory)

        }
    }
}
