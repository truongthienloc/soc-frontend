import RiscVProcessor from './RiscV_processor'
import InterConnect from './Interconnect'
import MMU from './MMU'
import { dec, stringToAsciiAndBinary } from './convert'
import Memory from './Memory'
import { Keyboard, Logger, Monitor } from './soc.d'

export default class Soc {
    name: string
    Processor: RiscVProcessor
    Bus: InterConnect
    MMU: MMU
    Memory: Memory
    Interconnect: InterConnect
    cycle: number

    disabled: boolean = false

    logger?: Logger
    keyboard?: Keyboard
    monitor?: Monitor

    public setLogger(logger: Logger) {
        this.logger = logger
    }

    public setKeyboard(keyboard: Keyboard) {
        this.keyboard = keyboard
    }

    public setMonitor(monitor: Monitor) {
        this.monitor = monitor
    }

    public println(...args: string[]) {
        if (!this.logger) {
            return
        }
        this.logger.println(...args)
    }

    constructor(name: string) {
        this.Processor = new RiscVProcessor('RiscV CPU', '00', true)
        this.Bus = new InterConnect(4, 4)
        this.Interconnect = new InterConnect(4, 4)
        this.MMU = new MMU()
        this.Memory = new Memory()
        this.cycle = 0
        this.name = name
    }

    private delay() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (this.disabled) {
                    resolve(this.delay())
                } else {
                    resolve(null)
                }
            }, 100)
        })
    }

    public async Run(code: string) {
        this.cycle = 0
        this.Processor.reset()
        this.Processor.setImem(
           // ".text\n lui x23, 9\n lui x25, 9\n sw x25 0(x0)\n"
            code
        )

        while (this.Processor.pc < Object.values(this.Processor.Instruction_memory).length * 4) {
            this.cycle += 1
            const element = this.Processor.Instruction_memory[this.Processor.pc.toString(2)]

            let [message, data, address, rd, size] = this.Processor.run(
                element,
                this.Processor.pc, 
            )
            if (dec('0' + address)%4!=0) {
                this.println("Invaild Address!!!")
                return
            }
            if (message == 'PUT') {
                //STORE
                if (dec('0' + address) < 399 && 0 <= dec('0' + address)) {
                    
                    this.println('Cycle ', this.cycle.toString(), ': MMU is running')
                    this.println(
                        'Cycle ',
                        this.cycle.toString(),
                        ': Virtual address: ',
                        address,
                        ' Physical address: ',
                        this.MMU.Dmem(address),
                    )

                    address = this.MMU.Dmem(address)
                    const dm2i = this.Processor.master.send(
                        message,
                        address,
                        '0',
                        this.cycle,
                        data,
                        this.println.bind(this),
                    )
                    this.println('Cycle ', this.cycle.toString(), ': CPU is sending')
                    this.println('Cycle ', this.cycle.toString(), ': INTERCONNECT is receiving')
                    this.Bus.Port_in_CA(dm2i, 0, this.cycle)
                    this.Bus.TransmitChannelA()
                    this.cycle += 1
                    this.println('Cycle ', this.cycle.toString(), ': INTERCONNECT is sending')
                    const doutChA = this.Bus.Port_out(1)
                    this.println('Cycle ', this.cycle.toString(), ': MEMORY is receiving')
                    const [di2s, ai2s] = this.Memory.slaveMemory.receive(
                        this.cycle,
                        'Port_out[1]',
                        doutChA,
                        this.println.bind(this),
                    )
                    this.Memory.Memory[ai2s] = di2s

                    this.cycle += 1
                    this.println('Cycle ', this.cycle.toString(), ': MEMORY is sending')
                    const doutChD = this.Memory.slaveMemory.send(
                        this.cycle,
                        'Port_in[1]',
                        'AccessAck',
                        '',
                        this.println.bind(this),
                    )
                    this.println('Cycle ', this.cycle.toString(), ': INTERCONNECT is receiving')
                    this.Bus.Port_in_CD(doutChD, 1, this.cycle)
                    this.Bus.TransmitChannelD()
                    this.Bus.Port_out(0)
                    this.cycle += 1
                    this.println('Cycle ', this.cycle.toString(), ': CPU is receiving')
                }
                if (dec('0' + address) < 499 && 400 <= dec('0' + address)) {
                    this.println('Cycle ', this.cycle.toString(), ': MMU is running')
                    this.println(
                        'Cycle ',
                        this.cycle.toString(),
                        ': Virtual address: ',
                        address,
                        ' Physical address: ',
                        this.MMU.Dmem(address),
                    )
                    address = this.MMU.OutMem(address)
                    const dm2i = this.Processor.master.send(
                        message,
                        address,
                        '0',
                        this.cycle,
                        data,
                        this.println.bind(this),
                    )
                    this.println('Cycle ', this.cycle.toString(), ': CPU is sending')
                    this.println('Cycle ', this.cycle.toString(), ': INTERCONNECT is receiving')
                    this.Bus.Port_in_CA(dm2i, 0, this.cycle)
                    this.Bus.TransmitChannelA()
                    this.cycle += 1
                    this.println('Cycle ', this.cycle.toString(), ': INTERCONNECT is sending')
                    const doutChA = this.Bus.Port_out(3)
                    this.println('Cycle ', this.cycle.toString(), ': MEMORY is receiving')
                    const [di2s, ai2s] = this.Memory.slaveMemory.receive(
                        this.cycle,
                        'Port_out[3]',
                        doutChA,
                        this.println.bind(this),
                    )

                    this.Memory.Memory[this.MMU.InMem(ai2s)] = di2s
                    this.monitor?.println(di2s)

                    this.cycle += 1
                    this.println('Cycle ', this.cycle.toString(), ': MEMORY is sending')
                    const doutChD = this.Memory.slaveMemory.send(
                        this.cycle,
                        'Port_in[3]',
                        'AccessAck',
                        '',
                        this.println.bind(this),
                    )
                    this.Bus.Port_in_CD(doutChD, 2, this.cycle)
                    this.Bus.TransmitChannelD()
                    this.Bus.Port_out(0)
                    this.cycle += 1
                    this.println('Cycle ', this.cycle.toString(), ': CPU is receiving')
                }
            }

            if (message == 'GET') {
                if (dec('0' + address) < 399 && 0 <= dec('0' + address)) {
                    address = this.MMU.Dmem(address)
                    this.println('Cycle ', this.cycle.toString(), ': MMU is running')
                    this.println(
                        'Cycle ',
                        this.cycle.toString(),
                        ': Virtual address: ',
                        address,
                        ' Physical address: ',
                        this.MMU.Dmem(address),
                    )
                    const dm2i = this.Processor.master.send(
                        message,
                        address,
                        '0',
                        this.cycle,
                        data,
                        this.println.bind(this),
                    )
                    this.println('Cycle ', this.cycle.toString(), ': CPU is sending')
                    this.println('Cycle ', this.cycle.toString(), ': INTERCONNECT is receiving')
                    this.Bus.Port_in_CA(dm2i, 0, this.cycle)
                    this.Bus.TransmitChannelA()
                    this.cycle += 1
                    this.println('Cycle ', this.cycle.toString(), ': INTERCONNECT is sending')
                    const doutChA = this.Bus.Port_out(1)
                    const [, ai2s] = this.Memory.slaveMemory.receive(
                        this.cycle,
                        'Port_out[1]',
                        doutChA,
                        this.println.bind(this),
                    )
                    this.println('Cycle ', this.cycle.toString(), ': MEMORY is receiving')
                    const di2s = this.Memory.Memory[ai2s] ?? ''.padStart(32, '0')
                    this.cycle += 1
                    this.println('Cycle ', this.cycle.toString(), ': MEMORY is sending')
                    const doutChD = this.Memory.slaveMemory.send(
                        this.cycle,
                        'Port_in[1]',
                        'AccessAckData',
                        di2s,
                        this.println.bind(this),
                    )
                    this.println('Cycle ', this.cycle.toString(), ': INTERCONNECT is receiving')
                    this.Bus.Port_in_CD(doutChD, 1, this.cycle)
                    this.Bus.TransmitChannelD()
                    const temp = this.Bus.Port_out(0).payload
                    if (temp === 'undefined' || temp === undefined)
                        this.Processor.register[rd] = '0'.padStart(32, '0')
                    if (temp !== 'undefined' && temp !== undefined)
                        this.Processor.register[rd] = temp
                    this.cycle += 1
                    this.println('Cycle ', this.cycle.toString(), ': CPU is receiving')
                }
                if (dec('0' + address) < 499 && 400 <= dec('0' + address)) {
                    address = this.MMU.InMem(address)
                    this.println('Cycle ', this.cycle.toString(), ': MMU is running')
                    this.println(
                        'Cycle ',
                        this.cycle.toString(),
                        ': Virtual address: ',
                        address,
                        ' Physical address: ',
                        this.MMU.Dmem(address),
                    )
                    const dm2i = this.Processor.master.send(
                        message,
                        address,
                        '0',
                        this.cycle,
                        data,
                        this.println.bind(this),
                    )
                    this.println('Cycle ', this.cycle.toString(), ': CPU is sending')
                    this.println('Cycle ', this.cycle.toString(), ': INTERCONNECT is receiving')
                    this.Bus.Port_in_CA(dm2i, 0, this.cycle)
                    this.Bus.TransmitChannelA()
                    this.cycle += 1
                    this.println('Cycle ', this.cycle.toString(), ': INTERCONNECT is sending')
                    const doutChA = this.Bus.Port_out(2)
                    const [, ai2s] = this.Memory.slaveMemory.receive(
                        this.cycle,
                        'Port_out[2]',
                        doutChA,
                        this.println.bind(this),
                    )
                    this.println('Cycle ', this.cycle.toString(), ': MEMORY is receiving')
                    this.disabled = true
                    this.println('Cycle ', this.cycle.toString(), ': KEYBOARD is waiting')
                    this.keyboard?.getEvent().once('line-down', (text: string) => {
                        const di2s = text
                        this.cycle += 1
                        this.println('Cycle ', this.cycle.toString(), ': MEMORY is sending')
                        const doutChD = this.Memory.slaveMemory.send(
                            this.cycle,
                            'Port_in[2]',
                            'AccessAckData',
                            di2s,
                            this.println.bind(this),
                        )
                        this.println('Cycle ', this.cycle.toString(), ': INTERCONNECT is receiving')
                        console.log('channelD', doutChD)
                        this.Bus.Port_in_CD(doutChD, 2, this.cycle)
                        this.Bus.TransmitChannelD()
                        const temp = this.Bus.Port_out(0).payload
                        this.println('Cycle ', this.cycle.toString(), ': INTERCONNECT is sending')
                        if (temp === 'undefined' || temp === undefined)
                            this.Processor.register[rd] = '0'.padStart(32, '0')
                        if (temp !== 'undefined' && temp !== undefined)
                            this.Processor.register[rd] =
                                stringToAsciiAndBinary(temp).binary.join('')
                        this.cycle += 1
                        this.println('Cycle ', this.cycle.toString(), ': CPU is receiving')
                        console.log('temp', temp)
                        this.disabled = false
                    })

                    await this.delay()
                }
            }
            console.log('Data memory', this.Memory.Memory)
            console.log('Data memory', this.Processor.register)
        }
    }
}
