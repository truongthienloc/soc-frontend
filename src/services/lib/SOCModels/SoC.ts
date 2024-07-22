import RiscVProcessor from './RiscV_processor'
import InterConnect from './Interconnect'
import MMU from './MMU'
import { dec, stringToAsciiAndBinary, BinToHex } from './convert'
import Memory from './Memory'
import { Keyboard, Logger, Monitor } from './soc.d'
import { NCKHBoard } from '../soc/boards'
import DMA from './DMA'

export default class Soc {
    name: string
    Processor: RiscVProcessor
    Bus: InterConnect
    MMU: MMU
    Memory: Memory
    DMA: DMA

    cycle: number

    disabled: boolean = false

    logger?: Logger
    active_keyboard: any
    active_monitor: any
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
        this.Bus = new InterConnect(4, 4, true, 399, 499, 599)
        this.MMU = new MMU(true)
        this.Memory = new Memory(true)
        this.DMA = new DMA(true)
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

    public assemble(code: string) {
        if (this.view) {
            this.Processor.active = this.view.cpuModule.getActivated()
            this.MMU.active = this.view.mmuModule.getActivated()
            this.Bus.active = this.view.interconnect.getActivated()
            this.DMA.active = this.view.dmaModule.getActivated()
            this.Memory.active = this.view.memoryModule.getActivated()
            this.active_keyboard = this.view.keyboardModule.getActivated()
            this.active_monitor = this.view.monitorModule.getActivated()
        }
        this.logger?.clear()
        this.monitor?.clear()
        this.Processor.reset()
        this.cycle = 0
        this.Processor.Assembler.syntax_error = false
        this.Processor.Assembler.assemblerFromIns(code)
        this.Processor.setImem()
        this.view?.cpu.setIsRunning(false)
        this.view?.mmu.setIsRunning(false)
        this.view?.monitor.setIsRunning(false)
        this.view?.keyboard.setIsRunning(false)
        this.view?.memory.setIsRunning(false)
        this.view?.dma.setIsRunning(false)
        this.view?.interconnect.setIsRunning(false)

        this.println('Cycle ', this.cycle.toString(), ': System is setting up')
        console.log('Cycle ', this.cycle.toString(), ': System is setting up')
        console.log('assembly code SOC', this.Processor.Assembly_code)

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
        if (this.Processor.active == false) {
            console.log('CPU has not been actived!!!')
            this.println('CPU has not been actived!!!')
            return
        }

        while (
            this.Processor.pc <
            (Object.values(this.Processor.Instruction_memory).length - 1) * 4
        ) {
            this.Step()
        }
    }

    public async Step() {
        this.cycle += 1

        if (this.Processor.active == false) {
            console.log('CPU has not been actived!!!')
            this.println('CPU has not been actived!!!')
            return
        }

        if (
            this.Processor.pc >=
            (Object.values(this.Processor.Instruction_memory).length - 1) * 4
        ) {
            this.println('THE PROGRAM COUNTER IS OUT OF THE INSTRUCTION MEMORY RANGE.')
            console.log('THE PROGRAM COUNTER IS OUT OF THE INSTRUCTION MEMORY RANGE.')
            return
        }

        this.println('Cycle ', this.cycle.toString(), ': CPU is processing')
        console.log('Cycle ', this.cycle.toString(), ': CPU is processing')
        if (this.Processor.Assembler.syntax_error) return

        const element = this.Processor.Instruction_memory[this.Processor.pc.toString(2)]
        this.view?.cpu.setIsRunning(this.Processor.active)
        let [message, data, address, rd] = this.Processor.run(element, this.Processor.pc)

        if (dec('0' + address) % 4 != 0) {
            console.log('Invaild Address!!!')
            this.println('Invaild Address!!!')
            return
        }

        if (message == 'PUT') {
            //STORE
            this.println('Cycle ', this.cycle.toString(), ': CPU is sending PUT messeage to MEMORY')
            console.log('Cycle ', this.cycle.toString(), ': CPU is sending PUT messeage to MEMORY')

            if (this.MMU.active == false) {
                console.log('MMU has not been actived!!!')
                this.println('MMU has not been actived!!!')
                return
            }
            if (this.Bus.active == false) {
                console.log('INTERCONNECT has not been actived!!!')
                this.println('INTERCONNECT has not been actived!!!')
                return
            }
            if (this.Memory.active == false) {
                console.log('MEMORY has not been actived!!!')
                this.println('MEMORY has not been actived!!!')
                return
            }

            this.view?.mmu.setIsRunning(this.MMU.active)
            if (dec('0' + address) < this.Bus.memory_address + 1 && 0 <= dec('0' + address)) {
                this.MMU.setActive()
                this.println('Cycle ', this.cycle.toString(), ': MMU is running')
                console.log('Cycle ', this.cycle.toString(), ': MMU is running')

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

                address = this.MMU.Dmem(address)
                const dm2i = this.Processor.master.send(
                    message,
                    address,
                    '0',
                    this.cycle,
                    data,
                    this.println.bind(this),
                )
                this.println(
                    'Cycle ',
                    this.cycle.toString(),
                    ': INTERCONNECT is receiving messeage from CPU',
                )
                console.log(
                    'Cycle ',
                    this.cycle.toString(),
                    ': INTERCONNECT is receiving messeage from CPU',
                )
                this.view?.interconnect.setIsRunning(this.Bus.active)
                this.Bus.Port_in_CA(dm2i, 0, this.cycle)
                this.Bus.TransmitChannelA()
                this.cycle += 1

                this.println(
                    'Cycle ',
                    this.cycle.toString(),
                    ': INTERCONNECT is sending message to MEMORY',
                )
                console.log(
                    'Cycle ',
                    this.cycle.toString(),
                    ': INTERCONNECT is sending message to MEMORY',
                )

                const doutChA = this.Bus.Port_out(1)
                this.view?.memory.setIsRunning(this.Memory.active)
                this.println(
                    'Cycle ',
                    this.cycle.toString(),
                    ': MEMORY is receiving message from INTERCONNECT',
                )
                console.log(
                    'Cycle ',
                    this.cycle.toString(),
                    ': MEMORY is receiving message from INTERCONNECT',
                )

                const [di2s, ai2s] = this.Memory.slaveMemory.receive(
                    this.cycle,
                    'Port_out[1]',
                    doutChA,
                    this.println.bind(this),
                )
                this.Memory.Memory[ai2s] = di2s

                this.cycle += 1
                this.println(
                    'Cycle ',
                    this.cycle.toString(),
                    ': MEMORY is sending ACCESS_ACK messeage to CPU',
                )
                console.log(
                    'Cycle ',
                    this.cycle.toString(),
                    ': MEMORY is sending ACCESS_ACK messeage to CPU',
                )

                const doutChD = this.Memory.slaveMemory.send(
                    this.cycle,
                    'Port_in[1]',
                    'AccessAck',
                    '',
                    this.println.bind(this),
                )

                this.println(
                    'Cycle ',
                    this.cycle.toString(),
                    ': INTERCONNECT is receiving messeage from MEMORY',
                )
                console.log(
                    'Cycle ',
                    this.cycle.toString(),
                    ': INTERCONNECT is receiving messeage from MEMORY',
                )

                this.Bus.Port_in_CD(doutChD, 1, this.cycle)
                this.Bus.TransmitChannelD()
                this.Bus.Port_out(0)
                this.cycle += 1

                this.println(
                    'Cycle ',
                    this.cycle.toString(),
                    ': INTERCONNECT is sending messeage to CPU',
                )
                console.log(
                    'Cycle ',
                    this.cycle.toString(),
                    ': INTERCONNECT is sending messeage to CPU',
                )
                this.println(
                    'Cycle ',
                    this.cycle.toString(),
                    ': CPU is receiving ACCESS_ACK messeage from INTERCONNECT',
                )
                console.log(
                    'Cycle ',
                    this.cycle.toString(),
                    ': CPU is receiving ACCESS_ACK messeage from INTERCONNECT',
                )
            }

            if (
                dec('0' + address) < this.Bus.monitor_address &&
                this.Bus.memory_address + 1 <= dec('0' + address)
            ) {
                this.println('Cycle ', this.cycle.toString(), ': MMU is running')
                console.log('Cycle ', this.cycle.toString(), ': MMU is running')
                this.println(
                    'Cycle ',
                    this.cycle.toString(),
                    ': Virtual address: ',
                    BinToHex(address),
                    ' Physical address: ',
                    BinToHex(this.MMU.OutMem(address)),
                )
                console.log(
                    'Cycle ',
                    this.cycle.toString(),
                    ': Virtual address: ',
                    BinToHex(address),
                    ' Physical address: ',
                    BinToHex(this.MMU.OutMem(address)),
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

                this.println(
                    'Cycle ',
                    this.cycle.toString(),
                    ': INTERCONNECT is receiving messeage from CPU',
                )
                console.log(
                    'Cycle ',
                    this.cycle.toString(),
                    ': INTERCONNECT is receiving messeage from CPU',
                )
                this.view?.interconnect.setIsRunning(this.Bus.active)
                this.Bus.Port_in_CA(dm2i, 0, this.cycle)
                this.Bus.TransmitChannelA()
                this.cycle += 1

                this.println(
                    'Cycle ',
                    this.cycle.toString(),
                    ': INTERCONNECT is sending messeage to MEMORY',
                )
                console.log(
                    'Cycle ',
                    this.cycle.toString(),
                    ': INTERCONNECT is sending messeage to MEMORY',
                )

                const doutChA = this.Bus.Port_out(3)

                this.println(
                    'Cycle ',
                    this.cycle.toString(),
                    ': MEMORY is receiving messeage from INTERCONNECT',
                )
                console.log(
                    'Cycle ',
                    this.cycle.toString(),
                    ': MEMORY is receiving messeage from INTERCONNECT',
                )

                this.view?.memory.setIsRunning(this.Memory.active)
                const [di2s, ai2s] = this.Memory.slaveMemory.receive(
                    this.cycle,
                    'Port_out[3]',
                    doutChA,
                    this.println.bind(this),
                )
                this.Memory.Memory[this.MMU.InMem(ai2s)] = di2s
                this.DMA.setActive()
                this.view?.dma.setIsRunning(this.DMA.active)
                this.println('Cycle ', this.cycle.toString(), ': DMA is running')
                console.log('Cycle ', this.cycle.toString(), ': DMA is running')

                this.view?.monitor.setIsRunning(this.active_monitor)

                this.cycle += 1

                this.println(
                    'Cycle ',
                    this.cycle.toString(),
                    ': MEMORY is sending ACCESS_ACK messeage to CPU',
                )
                console.log(
                    'Cycle ',
                    this.cycle.toString(),
                    ': MEMORY is sending ACCESS_ACK messeage to CPU',
                )
                this.println('Cycle ', this.cycle.toString(), ': DMA is GETTING DATA from MEMORY')
                console.log('Cycle ', this.cycle.toString(), ': DMA is GETTING DATA from MEMORY')
                let dma2monitor = this.Memory.Memory[this.MMU.InMem(ai2s)]

                if (this.active_monitor == true) this.monitor?.println(BinToHex(dma2monitor))
                else {
                    this.println('MONITOR has not actived!!!')
                    console.log('MONITOR has not actived!!!')
                }

                const doutChD = this.Memory.slaveMemory.send(
                    this.cycle,
                    'Port_in[3]',
                    'AccessAck',
                    '',
                    this.println.bind(this),
                )

                this.println(
                    'Cycle ',
                    this.cycle.toString(),
                    ': INTERCONNECT is receiving messeage from MEMORY',
                )
                console.log(
                    'Cycle ',
                    this.cycle.toString(),
                    ': INTERCONNECT is receiving messeage from MEMORY',
                )

                this.Bus.Port_in_CD(doutChD, 2, this.cycle)
                this.Bus.TransmitChannelD()
                this.Bus.Port_out(0)

                this.cycle += 1
                this.println('Cycle ', this.cycle.toString(), ': DMA is PUTING DATA to MONITOR')
                console.log('Cycle ', this.cycle.toString(), ': DMA is PUTING DATA to MONITOR')
                this.println(
                    'Cycle ',
                    this.cycle.toString(),
                    ': CPU is receiving messeage from INTERCONNECT',
                )
                console.log(
                    'Cycle ',
                    this.cycle.toString(),
                    ': CPU is receiving messeage from INTERCONNECT',
                )
            }
        }

        if (message == 'GET') {
            if (this.MMU.active == false) {
                console.log('MMU has not been actived!!!')
                this.println('MMU has not been actived!!!')
                return
            }
            if (this.Bus.active == false) {
                console.log('INTERCONNECT has not been actived!!!')
                this.println('INTERCONNECT has not been actived!!!')
                return
            }
            if (this.Memory.active == false) {
                console.log('MEMORY has not been actived!!!')
                this.println('MEMORY has not been actived!!!')
                return
            }

            this.view?.mmu.setIsRunning(this.MMU.active)
            this.println('Cycle ', this.cycle.toString(), ': CPU is sending GET messeage to MEMORY')
            console.log('Cycle ', this.cycle.toString(), ': CPU is sending GET messeage to MEMORY')

            if (dec('0' + address) < this.Bus.memory_address + 1 && 0 <= dec('0' + address)) {
                address = this.MMU.Dmem(address)
                this.println('Cycle ', this.cycle.toString(), ': MMU is running')
                this.println(
                    'Cycle ',
                    this.cycle.toString(),
                    ': Virtual address: ',
                    BinToHex(address),
                    ' Physical address: ',
                    BinToHex(this.MMU.Dmem(address)),
                )
                console.log('Cycle ', this.cycle.toString(), ': MMU is running')
                console.log(
                    'Cycle ',
                    this.cycle.toString(),
                    ': Virtual address: ',
                    BinToHex(address),
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

                this.println(
                    'Cycle ',
                    this.cycle.toString(),
                    ': INTERCONNECT is receiving messeage from MMU',
                )
                console.log(
                    'Cycle ',
                    this.cycle.toString(),
                    ': INTERCONNECT is receiving messeage from MMU',
                )

                this.view?.interconnect.setIsRunning(this.Bus.active)
                this.Bus.Port_in_CA(dm2i, 0, this.cycle)
                this.Bus.TransmitChannelA()
                this.cycle += 1

                this.println(
                    'Cycle ',
                    this.cycle.toString(),
                    ': INTERCONNECT is sending messeage to MEMORY',
                )
                console.log(
                    'Cycle ',
                    this.cycle.toString(),
                    ': INTERCONNECT is sending messeage to MEMORY',
                )

                const doutChA = this.Bus.Port_out(1)
                const [, ai2s] = this.Memory.slaveMemory.receive(
                    this.cycle,
                    'Port_out[1]',
                    doutChA,
                    this.println.bind(this),
                )
                this.view?.memory.setIsRunning(this.Memory.active)
                this.println(
                    'Cycle ',
                    this.cycle.toString(),
                    ': MEMORY is receiving messeage from INTERCONNECT',
                )
                console.log(
                    'Cycle ',
                    this.cycle.toString(),
                    ': MEMORY is receiving messeage from INTERCONNECT',
                )

                const di2s = this.Memory.Memory[ai2s] ?? ''.padStart(32, '0')
                this.cycle += 1

                this.println(
                    'Cycle ',
                    this.cycle.toString(),
                    ': MEMORY is sending DATA to INTERCONNECT',
                )
                console.log(
                    'Cycle ',
                    this.cycle.toString(),
                    ': MEMORY is sending DATA to INTERCONNECT',
                )

                const doutChD = this.Memory.slaveMemory.send(
                    this.cycle,
                    'Port_in[1]',
                    'AccessAckData',
                    di2s,
                    this.println.bind(this),
                )

                this.println(
                    'Cycle ',
                    this.cycle.toString(),
                    ': INTERCONNECT is receiving DATA from MEMORY',
                )
                console.log(
                    'Cycle ',
                    this.cycle.toString(),
                    ': INTERCONNECT is receiving DATA from MEMORY',
                )

                this.Bus.Port_in_CD(doutChD, 1, this.cycle)
                this.Bus.TransmitChannelD()
                const temp = this.Bus.Port_out(0).payload
                if (temp === 'undefined' || temp === undefined)
                    this.Processor.register[rd] = '0'.padStart(32, '0')
                if (temp !== 'undefined' && temp !== undefined) this.Processor.register[rd] = temp
                this.cycle += 1

                this.println(
                    'Cycle ',
                    this.cycle.toString(),
                    ': INTERCONNECT is sending DATA to MMU',
                )
                console.log(
                    'Cycle ',
                    this.cycle.toString(),
                    ': INTERCONNECT is sending DATA to MMU',
                )
                this.println('Cycle ', this.cycle.toString(), ': CPU received DATA')
                console.log('Cycle ', this.cycle.toString(), ': CPU received DATA')
            }

            if (
                dec('0' + address) < this.Bus.keyboard_address - 100 &&
                this.Bus.keyboard_address - 100 - 99 <= dec('0' + address)
            ) {
                address = this.MMU.InMem(address)

                this.println('Cycle ', this.cycle.toString(), ': MMU is running')
                this.println(
                    'Cycle ',
                    this.cycle.toString(),
                    ': Virtual address: ',
                    BinToHex(address),
                    ' Physical address: ',
                    BinToHex(this.MMU.Dmem(address)),
                )
                console.log('Cycle ', this.cycle.toString(), ': MMU is running')
                console.log(
                    'Cycle ',
                    this.cycle.toString(),
                    ': Virtual address: ',
                    BinToHex(address),
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

                this.println(
                    'Cycle ',
                    this.cycle.toString(),
                    ': CPU is sending GET messeage to MEMORY',
                )
                this.println(
                    'Cycle ',
                    this.cycle.toString(),
                    ': INTERCONNECT is receiving messeage from MMU',
                )
                console.log(
                    'Cycle ',
                    this.cycle.toString(),
                    ': CPU is sending GET messeage to MEMORY',
                )
                console.log(
                    'Cycle ',
                    this.cycle.toString(),
                    ': INTERCONNECT is receiving messeage from MMU',
                )

                this.view?.interconnect.setIsRunning(this.Bus.active)
                this.Bus.Port_in_CA(dm2i, 0, this.cycle)
                this.Bus.TransmitChannelA()
                this.cycle += 1

                this.println(
                    'Cycle ',
                    this.cycle.toString(),
                    ': INTERCONNECT is sending messeage to MEMORY',
                )
                console.log(
                    'Cycle ',
                    this.cycle.toString(),
                    ': INTERCONNECT is sending messeage to MEMORY',
                )

                const doutChA = this.Bus.Port_out(2)

                const [, ai2s] = this.Memory.slaveMemory.receive(
                    this.cycle,
                    'Port_out[2]',
                    doutChA,
                    this.println.bind(this),
                )
                this.println(
                    'Cycle ',
                    this.cycle.toString(),
                    ': MEMORY is receiving messeage from INTERCONNECT',
                )
                console.log(
                    'Cycle ',
                    this.cycle.toString(),
                    ': MEMORY is receiving messeage from INTERCONNECT',
                )

                this.println('Cycle ', this.cycle.toString(), ': KEYBOARD is waiting')
                console.log('Cycle ', this.cycle.toString(), ': KEYBOARD is waiting')

                this.view?.keyboard.setIsRunning(this.active_keyboard)
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
                        this.Processor.register[rd] = stringToAsciiAndBinary(temp).binary.join('')
                    this.cycle += 1

                    this.println('Cycle ', this.cycle.toString(), ': CPU is receiving')
                    this.disabled = false
                })

                await this.delay()
            }
        }
    }
}
