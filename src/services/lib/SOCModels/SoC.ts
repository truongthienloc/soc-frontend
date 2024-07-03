import RiscVProcessor from './RiscV_processor'
import InterConnect from './Interconnect'
import MMU from './MMU'
import { dec, stringToAsciiAndBinary, BinToHex } from './convert'
import Memory from './Memory'
import { Keyboard, Logger, Monitor } from './soc.d'
import { NCKHBoard } from '../soc/boards'

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
    view?: NCKHBoard

    public setLogger(logger: Logger) {
        this.logger = logger
    }

    public setKeyboard(keyboard: Keyboard) {
        this.keyboard = keyboard
    }

    public setMonitor(monitor: Monitor) {
        this.monitor = monitor
    }

    public setView(view: NCKHBoard) {
        this.view = view
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

    public assemble (code: string) {
        this.Processor.reset() 
        this.cycle = 0
        this.Processor.Assembler.syntax_error = false
        this.Processor.Assembler.assemblerFromIns(code)
        this.Processor.setImem()
        this.println('Cycle ', this.cycle.toString(), ': System is setting up')
        console.log('Cycle ', this.cycle.toString(),  ': System is setting up')
        if (this.Processor.Assembler.syntax_error) {
            this.println('SYNTAX ERROR!!!')
            console.log('SYNTAX ERROR!!!')
        } else {
            this.println('SYSTEM IS READY TO RUN')
            console.log('SYSTEM IS READY TO RUN')
        }
        return !this.Processor.Assembler.syntax_error
    }

    public RunAll() {
            let c = 0;
            if (this.Processor.Assembler.syntax_error) return
            while (this.Processor.pc < (Object.values(this.Processor.Instruction_memory).length - 1) * 4) {
                this.Step();
                c = c + 1;
                if (c > 10) {
                    break;
                }
            }
    }

    public async Step() {
        this.println('Cycle ', this.cycle.toString(), ': CPU is processing')
        console.log('Cycle ', this.cycle.toString(),  ': CPU is processing')
        this.cycle += 1
        if (this.Processor.Assembler.syntax_error) return
        const element = this.Processor.Instruction_memory[this.Processor.pc.toString(2)]
        this.view?.cpu.setIsRunning(true)
        let [message, data, address, rd] = this.Processor.run(
            element,
            this.Processor.pc, 
        )

        if (dec('0' + address)%4!=0) {
            console.log("Invaild Address!!!")
            this.println("Invaild Address!!!")
            return
        }

        if (message == 'PUT') {
            //STORE
            this.view?.mmu.setIsRunning(true)
            if (dec('0' + address) < 399 && 0 <= dec('0' + address)) {
                
                this.MMU.setActive()
                
                this.println('Cycle ', this.cycle.toString(), ': MMU is running')
                console.log('Cycle ', this.cycle.toString(), ': MMU is running')

                this.println(
                    'Cycle ',
                    this.cycle.toString(),
                    ': Virtual address: ',
                    BinToHex (address),
                    ' Physical address: ',
                    BinToHex(this.MMU.Dmem(address)),
                )

                console.log(
                    'Cycle ',
                    this.cycle.toString(),
                    ': Virtual address: ',
                    BinToHex(address),
                    ' Physical address: ',
                    BinToHex(this.MMU.Dmem(address)),
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

                this.println('Cycle ', this.cycle.toString(), ': CPU is sending PUT messeage to MEMORY')
                
                this.println('Cycle ', this.cycle.toString(), ': INTERCONNECT is receiving messeage from CPU')
                console.log('Cycle ', this.cycle.toString(),  ': CPU is sending PUT messeage to MEMORY')
                console.log('Cycle ', this.cycle.toString(),  ': INTERCONNECT is receiving messeage from CPU')
                
                this.Bus.Port_in_CA(dm2i, 0, this.cycle)
                this.Bus.TransmitChannelA()
                this.cycle += 1
                
                this.println('Cycle ', this.cycle.toString(), ': INTERCONNECT is sending message to MEMORY')
                console.log('Cycle ', this.cycle.toString(),  ': INTERCONNECT is sending message to MEMORY')

                const doutChA = this.Bus.Port_out(1)
                this.view?.memory.setIsRunning(true)
                this.println('Cycle ', this.cycle.toString(), ': MEMORY is receiving PUT message from INTERCONNECT')
                console.log('Cycle ', this.cycle.toString(),  ': MEMORY is receiving PUT message from INTERCONNECT')

                const [di2s, ai2s] = this.Memory.slaveMemory.receive(
                    this.cycle,
                    'Port_out[1]',
                    doutChA,
                    this.println.bind(this),
                )
                this.Memory.Memory[ai2s] = di2s

                this.cycle += 1
                this.println('Cycle ', this.cycle.toString(), ': MEMORY is sending ACCESS_ACK messeage to CPU')
                console.log('Cycle ', this.cycle.toString(),  ': MEMORY is sending ACCESS_ACK messeage to CPU')
                
                const doutChD = this.Memory.slaveMemory.send(
                    this.cycle,
                    'Port_in[1]',
                    'AccessAck',
                    '',
                    this.println.bind(this),
                )

                this.println('Cycle ', this.cycle.toString(), ': INTERCONNECT is receiving messeage from MEMORY')
                console.log('Cycle ', this.cycle.toString(),  ': INTERCONNECT is receiving messeage from MEMORY')
                
                this.Bus.Port_in_CD(doutChD, 1, this.cycle)
                this.Bus.TransmitChannelD()
                this.Bus.Port_out(0)
                this.cycle += 1
                
                this.println('Cycle ', this.cycle.toString(), ': CPU is receiving ACCESS_ACK messeage from INTERCONNECT')
                console.log('Cycle ', this.cycle.toString(),  ': CPU is receiving ACCESS_ACK messeage from INTERCONNECT')
            
            }

            if (dec('0' + address) < 499 && 400 <= dec('0' + address)) {
                this.println('Cycle ', this.cycle.toString(), ': MMU is running')
                console.log('Cycle ', this.cycle.toString(),  ': MMU is running')
                this.println(
                    'Cycle ',
                    this.cycle.toString(),
                    ': Virtual address: ',
                    BinToHex(address),
                    ' Physical address: ',
                    BinToHex(this.MMU.Dmem(address)),
                )
                console.log(
                    'Cycle ',
                    this.cycle.toString(),
                    ': Virtual address: ',
                    BinToHex(address),
                    ' Physical address: ',
                    BinToHex(this.MMU.Dmem(address)),
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

                this.println('Cycle ', this.cycle.toString(), ': CPU is sending PUT messeage to MONITOR')
                this.println('Cycle ', this.cycle.toString(), ': INTERCONNECT is receiving messeage from CPU')
                console.log('Cycle ', this.cycle.toString(),  ': CPU is sending PUT messeage to MONITOR')
                console.log('Cycle ', this.cycle.toString(),  ': INTERCONNECT is receiving messeage from CPU')                   
                
                
                this.Bus.Port_in_CA(dm2i, 0, this.cycle)
                this.Bus.TransmitChannelA()
                this.cycle += 1
                
                this.println('Cycle ', this.cycle.toString(), ': INTERCONNECT is sending messeage to MONITOR')
                console.log('Cycle ', this.cycle.toString(),  ': INTERCONNECT is sending messeage to MONITOR')
                
                const doutChA = this.Bus.Port_out(3)
                
                this.println('Cycle ', this.cycle.toString(), ': MONITOR is receiving messeage from INTERCONNECT')
                console.log('Cycle ', this.cycle.toString(),  ': MONITOR is receiving messeage from INTERCONNECT')
                
                const [di2s, ai2s] = this.Memory.slaveMemory.receive(
                    this.cycle,
                    'Port_out[3]',
                    doutChA,
                    this.println.bind(this),
                )

                this.Memory.Memory[this.MMU.InMem(ai2s)] = di2s
                this.view?.monitor.setIsRunning(true)
                this.monitor?.println(di2s)

                this.cycle += 1

                this.println('Cycle ', this.cycle.toString(), ': MONITOR is sending ACCESS_ACK messeage to CPU')
                console.log('Cycle ', this.cycle.toString(),  ': MONITOR is sending ACCESS_ACK messeage to CPU')

                const doutChD = this.Memory.slaveMemory.send(
                    this.cycle,
                    'Port_in[3]',
                    'AccessAck',
                    '',
                    this.println.bind(this),
                )

                this.println('Cycle ', this.cycle.toString(), ': INTERCONNECT is receiving messeage from MONITOR')
                console.log('Cycle ', this.cycle.toString(),  ': INTERCONNECT is receiving messeage from MONITOR')
                
                this.Bus.Port_in_CD(doutChD, 2, this.cycle)
                this.Bus.TransmitChannelD()
                this.Bus.Port_out(0)
                this.cycle += 1

                this.println('Cycle ', this.cycle.toString(), ': CPU is receiving messeage from INTERCONNECT')
                console.log('Cycle ', this.cycle.toString(),  ': CPU is receiving messeage from INTERCONNECT')

            }
        }

        if (message == 'GET') {
            this.view?.mmu.setIsRunning(true)
            if (dec('0' + address) < 399 && 0 <= dec('0' + address)) {
                address = this.MMU.Dmem(address)
                
                this.println('Cycle ', this.cycle.toString(), ': MMU is running')
                this.println(
                    'Cycle ',
                    this.cycle.toString(),
                    ': Virtual address: ',
                    BinToHex (address),
                    ' Physical address: ',
                    BinToHex(this.MMU.Dmem(address)),
                )
                console.log('Cycle ', this.cycle.toString(), ': MMU is running')
                console.log(
                    'Cycle ',
                    this.cycle.toString(),
                    ': Virtual address: ',
                    BinToHex (address),
                    ' Physical address: ',
                    BinToHex (this.MMU.Dmem(address)),
                )

                const dm2i = this.Processor.master.send(
                    message,
                    address,
                    '0',
                    this.cycle,
                    data,
                    this.println.bind(this),
                )

                this.println('Cycle ', this.cycle.toString(), ': CPU is sending GET messeage to MEMORY')
                this.println('Cycle ', this.cycle.toString(), ': INTERCONNECT is receiving messeage from CPU')
                console.log('Cycle ', this.cycle.toString(), ': CPU is sending GET messeage to MEMORY')
                console.log('Cycle ', this.cycle.toString(), ': INTERCONNECT is receiving messeage from CPU')
                
                this.Bus.Port_in_CA(dm2i, 0, this.cycle)
                this.Bus.TransmitChannelA()
                this.cycle += 1

                this.println('Cycle ', this.cycle.toString(), ': INTERCONNECT is sending messeage to MEMORY')
                console.log('Cycle ', this.cycle.toString(),  ': INTERCONNECT is sending messeage to MEMORY')
                
                const doutChA = this.Bus.Port_out(1)
                const [, ai2s] = this.Memory.slaveMemory.receive(
                    this.cycle,
                    'Port_out[1]',
                    doutChA,
                    this.println.bind(this),
                )
                this.view?.memory.setIsRunning(true)
                this.println('Cycle ', this.cycle.toString(), ': MEMORY is receiving messeage from INTERCONNECT')
                console.log('Cycle ', this.cycle.toString(),  ': MEMORY is receiving messeage from INTERCONNECT')
                
                const di2s = this.Memory.Memory[ai2s] ?? ''.padStart(32, '0')
                this.cycle += 1

                this.println('Cycle ', this.cycle.toString(), ': MEMORY is sending DATA to INTERCONNECT')
                console.log('Cycle ', this.cycle.toString(),  ': MEMORY is sending DATA to INTERCONNECT')
                
                const doutChD = this.Memory.slaveMemory.send(
                    this.cycle,
                    'Port_in[1]',
                    'AccessAckData',
                    di2s,
                    this.println.bind(this),
                )
                
                this.println('Cycle ', this.cycle.toString(), ': INTERCONNECT is receiving DATA from MEMORY')
                console.log('Cycle ', this.cycle.toString(), ': INTERCONNECT is receiving DATA from MEMORY')
                
                this.Bus.Port_in_CD(doutChD, 1, this.cycle)
                this.Bus.TransmitChannelD()
                const temp = this.Bus.Port_out(0).payload
                if (temp === 'undefined' || temp === undefined)
                    this.Processor.register[rd] = '0'.padStart(32, '0')
                if (temp !== 'undefined' && temp !== undefined)
                    this.Processor.register[rd] = temp
                this.cycle += 1
                
                this.println('Cycle ', this.cycle.toString(), ': CPU received DATA')
                console.log('Cycle ', this.cycle.toString(), ': CPU received DATA')
            }
            if (dec('0' + address) < 499 && 400 <= dec('0' + address)) {
                address = this.MMU.InMem(address)
                
                this.println('Cycle ', this.cycle.toString(), ': MMU is running')
                this.println(
                    'Cycle ',
                    this.cycle.toString(),
                    ': Virtual address: ',
                    BinToHex (address),
                    ' Physical address: ',
                    BinToHex(this.MMU.Dmem(address)),
                )
                console.log('Cycle ', this.cycle.toString(), ': MMU is running')
                console.log(
                    'Cycle ',
                    this.cycle.toString(),
                    ': Virtual address: ',
                    BinToHex (address),
                    ' Physical address: ',
                    BinToHex(this.MMU.Dmem(address)),
                )

                const dm2i = this.Processor.master.send(
                    message,
                    address,
                    '0',
                    this.cycle,
                    data,
                    this.println.bind(this),
                )
                
                this.println('Cycle ', this.cycle.toString(), ': CPU is sending GET messeage to MEMORY')
                this.println('Cycle ', this.cycle.toString(), ': INTERCONNECT is receiving messeage from CPU')
                console.log('Cycle ', this.cycle.toString(),  ': CPU is sending GET messeage to MEMORY')
                console.log('Cycle ', this.cycle.toString(),  ': INTERCONNECT is receiving messeage from CPU')
                
                this.Bus.Port_in_CA(dm2i, 0, this.cycle)
                this.Bus.TransmitChannelA()
                this.cycle += 1
                
                this.println('Cycle ', this.cycle.toString(), ': INTERCONNECT is sending messeage to MEMORY')
                console.log('Cycle ', this.cycle.toString(), ': INTERCONNECT is sending messeage to MEMORY')

                const doutChA = this.Bus.Port_out(2)
                const [, ai2s] = this.Memory.slaveMemory.receive(
                    this.cycle,
                    'Port_out[2]',
                    doutChA,
                    this.println.bind(this),
                )
                this.println('Cycle ', this.cycle.toString(), ': MEMORY is receiving messeage from INTERCONNECT')
                console.log('Cycle ', this.cycle.toString(), ': MEMORY is receiving messeage from INTERCONNECT')

                this.disabled = true
                
                this.println('Cycle ', this.cycle.toString(), ': KEYBOARD is waiting')
                console.log('Cycle ', this.cycle.toString(), ': KEYBOARD is waiting')

                this.view?.keyboard.setIsRunning(true)
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
                    this.disabled = false
                })

                await this.delay()
            }
        }
    }
    
}
