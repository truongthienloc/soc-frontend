import RiscVProcessor from './RiscV_processor'
import InterConnect from './Interconnect'
import disAssembly from './Disassembly'
import MMU from './MMU'
import { dec, stringToAsciiAndBinary, BinToHex } from './convert'
import Memory from './Memory'
import { Keyboard, Logger, Monitor } from './soc.d'
import { NCKHBoard } from '../soc/boards'
import DMA from './DMA'
import Assembler from './check_syntax'
import LedMatrix from '../control/LedMatrix'
import { Register } from '~/types/register'
import { eventNames } from 'process'
import EventEmitter from '../EventEmitter/EventEmitter'

import type { TLB, TLBEntries } from './soc.d'
import { Disassembly } from '~/components/CodeEditor'

export default class Soc {
    name: string
    Processor: RiscVProcessor
    Bus: InterConnect
    MMU: MMU
    Memory: Memory
    DMA: DMA
    Led_matrix: boolean[][]
    Assembler: Assembler
    Disassembly : disAssembly

    cycle: number
    public static SOCEVENT = {DONE_ALL: 'DONE ALL', STEP_END: 'STEP END'}
    event = new EventEmitter ()

    disabled: boolean = false
    
    Assembly_code: any
    logger?: Logger
    active_keyboard: any
    active_monitor: any
    LedMatrix?: LedMatrix
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

    public setLedMatrix (Led_matrix: LedMatrix) {
        this.LedMatrix = Led_matrix
    }

    public println(...args: string[]) {
        if (!this.logger) {
            return
        }
        this.logger.println(...args)
        //console.log(...args)
    }

    constructor(name: string) {
        this.Processor = new RiscVProcessor('RiscV CPU', '01', false)
        this.Bus = new InterConnect(6, 6, false)
        this.MMU = new MMU(false)
        this.Memory = new Memory(false)
        this.DMA = new DMA(false)
        this.Assembler = new Assembler()
        this.Assembly_code = []
        this.Led_matrix = []
        this.Disassembly = new disAssembly ('')
        for (let i = 0; i < 96; i++) {
            let row: boolean[] = [];
            for (let j = 0; j < 96; j++) row.push(false);
            this.Led_matrix.push(row);
        }
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

    public assemble(code: string, 
                    LM_point: number, IO_point: number, Imem_point: number, 
                    Dmem_point: number, Stack_point: number , 
                    Mem_tb: Register[], TLB: TLBEntries[], TLB_pointer: number,
                    dmaSrc: number, dmaDes: number
                ) {
        this.println('Cycle ', this.cycle.toString(), ': System is setting up')
        console.log('Cycle ', this.cycle.toString(), ': System is setting up')
        
        //****************SYNC ACTIVED MODEL VS VIEW****************
        if (this.view) {
            this.Processor.active = this.view.cpuModule.getActivated()
            this.MMU.active = this.view.mmuModule.getActivated()
            this.Bus.active = this.view.interconnect.getActivated()
            this.DMA.active = this.view.dmaModule.getActivated()
            this.Memory.active = this.view.memoryModule.getActivated()
            this.active_keyboard = this.view.keyboardModule.getActivated()
            this.active_monitor = this.view.monitorModule.getActivated()
        }
        
        //****************CHECK SYNTAX ERROR****************
        this.Assembler.syntax_error = false
        this.Assembly_code = []
        this.Assembler.assemblerFromIns(code)                             
        
        //****************SET INITIAL STATUS****************
        // SET INITIAL DATA
        
        this.Processor.reset()

        this.Memory.reset( LM_point, IO_point, Imem_point, Dmem_point, Stack_point,
                            Mem_tb  )
        
        this.Processor.setImem(this.Assembler.binary_code)                 // LOAD INTUCTIONS INTO PROCESSOR
        this.Memory.SetInstuctionMemory(this.Processor.Instruction_memory) // LOAD INTUCTIONS INTO MAIN MEMORY
        this.Memory.setPageNumber()
        this.DMA.config(dmaSrc, dmaDes)
        this.MMU.SetTLB(TLB, TLB_pointer)
        for (let i of this.Assembler.Instructions)
            if (i != '.text' && i != '') this.Assembly_code.push(i)
        //SET INITIAL ANIMATION'STATUS
        
        this.logger?.clear()
        this.monitor?.clear()
        this.LedMatrix?.clear()
        this.cycle = 0
        this.view?.cpu.setIsRunning(false)
        this.view?.mmu.setIsRunning(false)
        this.view?.monitor.setIsRunning(false)
        this.view?.keyboard.setIsRunning(false)
        this.view?.memory.setIsRunning(false)
        this.view?.dma.setIsRunning(false)
        this.view?.interconnect.setIsRunning(false)
        this.view?.ledMatrix.setIsRunning(false)
        // NOTIFY SYSTEM'S STATUS IS READY OR NOT
        if (this.Assembler.syntax_error) {
            this.println('SYNTAX ERROR!!!')
            console.log('SYNTAX ERROR!!!')
        } else {
            this.println('SYSTEM IS READY TO RUN')
            console.log('SYSTEM IS READY TO RUN')
        }

        console.log("MMU: ", this.MMU);
        
        return !this.Assembler.syntax_error
    }

    public IO_operate () {
        const DMA_buffer = this.DMA.Databuffer
        //MONITOR MATRIX OPERATE
        const monitor_address = this.Memory.IO_point.toString(2).padStart(32,'0')
        //console.log('monitor: ', BinToHex(this.Memory.Memory[monitor_address]))
        if (this.active_monitor == true) {
            this.monitor?.println(BinToHex(this.Memory.Memory[monitor_address]))
            this.view?.monitor.setIsRunning(this.active_monitor)
        }
        else {
            this.println('MONITOR has not actived!!!')
            console.log('MONITOR has not actived!!!')
        }

        //LED MATRIX OPERATE
        let addr_buffer  = 0 
        if (this.view) 
            this.view?.ledMatrix.setIsRunning(this.view.matrixModule.getActivated())
        for (let i = 0; i < 96; i++) {
            let lineOfLed = DMA_buffer[addr_buffer] + DMA_buffer[addr_buffer + 1] + DMA_buffer[addr_buffer + 2]
            addr_buffer = addr_buffer + 3
            for (let j = 0; j < 96; j++) {
                if (lineOfLed[j] == '0' || lineOfLed[j] == undefined) 
                    this.Led_matrix[i][j]= false
                if (lineOfLed[j] == '1')
                    this.Led_matrix[i][j]= true
                }
        }

        this.LedMatrix?.clear()
        for (let i = 0; i < 96; i++) {
            for (let j = 0; j < 96; j++) {
                if (this.Led_matrix[i][j]) {
                    this.LedMatrix?.turnOn(i, j)
                }
                else {
                    this.LedMatrix?.turnOff(i, j)
                }
            }
        }
    }
    
    public DMA_operate () {
        const dma2i = this.DMA.Send()

        this.println('Cycle ', this.cycle.toString(), ': DMA is sending GET message to MEMORY')
        console.log('Cycle ', this.cycle.toString(), ': DMA is sending GET message to MEMORY')
//****************************CPU OPERATION**************************** */
        if (this.Processor.pc < (Object.values(this.Processor.Instruction_memory).length - 1) * 4) 
            this.Processor.active = true
        else {
            this.Processor.active =false
            this.println('THE PROGRAM COUNTER IS OUT OF THE INSTRUCTION MEMORY RANGE.')
            console.log('THE PROGRAM COUNTER IS OUT OF THE INSTRUCTION MEMORY RANGE.')
        }
        if ( this.Processor.active == true) {
            this.println('Cycle ', this.cycle.toString(), ': CPU is processing')
            console.log('Cycle ', this.cycle.toString(), ': CPU is processing')
        } 
        let element             = this.Processor.Instruction_memory[this.Processor.pc.toString(2)]
        let [CPU_message, , , ] = this.Processor.run(element, this.Processor.pc)
        this.view?.cpu.setIsRunning(this.Processor.active)

        this.cycle += 1
        this.Bus.Port_in(dma2i, 2)
        this.println(
            'Cycle ',
            this.cycle.toString(),
            ': INTERCONNECT is receiving message from DMA',
        )
        console.log(
            'Cycle ',
            this.cycle.toString(),
            ': INTERCONNECT is receiving message from DMA',
        )

        if (CPU_message == 'GET' || CPU_message == 'PUT') {
            if (this.Processor.pc < (Object.values(this.Processor.Instruction_memory).length - 1) * 4) {
                this.println('Cycle ', this.cycle.toString(), ': CPU is stalled')
                console.log('Cycle ', this.cycle.toString(), ': CPU is stalled')
                this.Processor.stalled = true
            }
            else {
                if (this.Processor.active) {
                    this.Processor.active =false
                    this.println('THE PROGRAM COUNTER IS OUT OF THE INSTRUCTION MEMORY RANGE.')
                    console.log('THE PROGRAM COUNTER IS OUT OF THE INSTRUCTION MEMORY RANGE.')
                }
            }
            element = this.Processor.Instruction_memory[this.Processor.pre_pc.toString(2)];
            this.view?.cpu.setIsRunning(this.Processor.active);
            [CPU_message, , , ] = this.Processor.run(element, this.Processor.pre_pc)    
        } else {
            if (this.Processor.pc >= (Object.values(this.Processor.Instruction_memory).length - 1) * 4) {
                if (this.Processor.active) {
                    this.Processor.active =false
                    this.println('THE PROGRAM COUNTER IS OUT OF THE INSTRUCTION MEMORY RANGE.')
                    console.log('THE PROGRAM COUNTER IS OUT OF THE INSTRUCTION MEMORY RANGE.')
                }
            }
            if ( this.Processor.active == true) {
                this.println('Cycle ', this.cycle.toString(), ': CPU is processing')
                console.log('Cycle ', this.cycle.toString(), ': CPU is processing')
            } 
            element = this.Processor.Instruction_memory[this.Processor.pc.toString(2)];
            this.view?.cpu.setIsRunning(this.Processor.active);
            [CPU_message, , , ] = this.Processor.run(element, this.Processor.pc)    
        }
        
        this.cycle += 1
        if (CPU_message == 'GET' || CPU_message == 'PUT') {
            if (this.Processor.pc < (Object.values(this.Processor.Instruction_memory).length - 1) * 4) {
                this.println('Cycle ', this.cycle.toString(), ': CPU is stalled')
                console.log('Cycle ', this.cycle.toString(), ': CPU is stalled')
                this.Processor.stalled = true
            }
            else {
                if (this.Processor.active) {
                    this.Processor.active =false
                    this.println('THE PROGRAM COUNTER IS OUT OF THE INSTRUCTION MEMORY RANGE.')
                    console.log('THE PROGRAM COUNTER IS OUT OF THE INSTRUCTION MEMORY RANGE.')
                }
            }
            element = this.Processor.Instruction_memory[this.Processor.pre_pc.toString(2)];
            this.view?.cpu.setIsRunning(this.Processor.active);
            [CPU_message, , , ] = this.Processor.run(element, this.Processor.pre_pc)    
        } else {
            if (this.Processor.pc >= (Object.values(this.Processor.Instruction_memory).length - 1) * 4) {
                if (this.Processor.active) {
                    this.Processor.active =false
                    this.println('THE PROGRAM COUNTER IS OUT OF THE INSTRUCTION MEMORY RANGE.')
                    console.log('THE PROGRAM COUNTER IS OUT OF THE INSTRUCTION MEMORY RANGE.')
                }
            }
            if ( this.Processor.active == true) {
                this.println('Cycle ', this.cycle.toString(), ': CPU is processing')
                console.log('Cycle ', this.cycle.toString(), ': CPU is processing')
            } 
            element = this.Processor.Instruction_memory[this.Processor.pc.toString(2)];
            this.view?.cpu.setIsRunning(this.Processor.active);
            [CPU_message, , , ] = this.Processor.run(element, this.Processor.pc)    
        }

        this.view?.interconnect.setIsRunning(this.Bus.active)
        this.Bus.Transmit()
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

        this.cycle += 1
        if (CPU_message == 'GET' || CPU_message == 'PUT') {
            if (this.Processor.pc < (Object.values(this.Processor.Instruction_memory).length - 1) * 4) {
                this.println('Cycle ', this.cycle.toString(), ': CPU is stalled')
                console.log('Cycle ', this.cycle.toString(), ': CPU is stalled')
                this.Processor.stalled = true
            }
            else {
                if (this.Processor.active) {
                    this.Processor.active =false
                    this.println('THE PROGRAM COUNTER IS OUT OF THE INSTRUCTION MEMORY RANGE.')
                    console.log('THE PROGRAM COUNTER IS OUT OF THE INSTRUCTION MEMORY RANGE.')
                }
            }
            element = this.Processor.Instruction_memory[this.Processor.pre_pc.toString(2)];
            this.view?.cpu.setIsRunning(this.Processor.active);
            [CPU_message, , , ] = this.Processor.run(element, this.Processor.pre_pc)    
        } else {
            if (this.Processor.pc >= (Object.values(this.Processor.Instruction_memory).length - 1) * 4) {
                if (this.Processor.active) {
                    this.Processor.active =false
                    this.println('THE PROGRAM COUNTER IS OUT OF THE INSTRUCTION MEMORY RANGE.')
                    console.log('THE PROGRAM COUNTER IS OUT OF THE INSTRUCTION MEMORY RANGE.')
                }
            }
            if ( this.Processor.active == true) {
                this.println('Cycle ', this.cycle.toString(), ': CPU is processing')
                console.log('Cycle ', this.cycle.toString(), ': CPU is processing')
            } 
            element = this.Processor.Instruction_memory[this.Processor.pc.toString(2)];
            this.view?.cpu.setIsRunning(this.Processor.active);
            [CPU_message, , , ] = this.Processor.run(element, this.Processor.pc)    
        }
        this.println(
            'Cycle ',
            this.cycle.toString(),
            ': MEMORY is sending ACCESS_ACK message to DMA',
        )
        console.log(
            'Cycle ',
            this.cycle.toString(),
            ': MEMORY is sending ACCESS_ACK message to DMA',
        )
        const i2memory = this.Bus.Port_out(3)
        const [, ai2s] = this.Memory.slaveMemory.receive(i2memory)
        let di2s= this.Memory.Memory[ai2s] 
        this.Memory.Memory[ai2s] = di2s

        this.cycle += 1
        if (CPU_message == 'GET' || CPU_message == 'PUT') {
            if (this.Processor.pc < (Object.values(this.Processor.Instruction_memory).length - 1) * 4) {
                this.println('Cycle ', this.cycle.toString(), ': CPU is stalled')
                console.log('Cycle ', this.cycle.toString(), ': CPU is stalled')
                this.Processor.stalled = true
            }
            else {
                if (this.Processor.active) {
                    this.Processor.active =false
                    this.println('THE PROGRAM COUNTER IS OUT OF THE INSTRUCTION MEMORY RANGE.')
                    console.log('THE PROGRAM COUNTER IS OUT OF THE INSTRUCTION MEMORY RANGE.')
                }
            }
            element = this.Processor.Instruction_memory[this.Processor.pre_pc.toString(2)];
            this.view?.cpu.setIsRunning(this.Processor.active);
            [CPU_message, , , ] = this.Processor.run(element, this.Processor.pre_pc)    
        } else {
            if (this.Processor.pc >= (Object.values(this.Processor.Instruction_memory).length - 1) * 4) {
                if (this.Processor.active) {
                    this.Processor.active =false
                    this.println('THE PROGRAM COUNTER IS OUT OF THE INSTRUCTION MEMORY RANGE.')
                    console.log('THE PROGRAM COUNTER IS OUT OF THE INSTRUCTION MEMORY RANGE.')
                }
            }
            if ( this.Processor.active == true) {
                this.println('Cycle ', this.cycle.toString(), ': CPU is processing')
                console.log('Cycle ', this.cycle.toString(), ': CPU is processing')
            } 
            element = this.Processor.Instruction_memory[this.Processor.pc.toString(2)];
            this.view?.cpu.setIsRunning(this.Processor.active);
            [CPU_message, , , ] = this.Processor.run(element, this.Processor.pc)    
        }
        this.println(
            'Cycle ',
            this.cycle.toString(),
            ': INTERCONNECT is receiving message from MEMORY',
        )
        console.log(
            'Cycle ',
            this.cycle.toString(),
            ': INTERCONNECT is receiving message from MEMORY',
        )
        
        this.cycle += 1
        if (CPU_message == 'GET' || CPU_message == 'PUT') {
            if (this.Processor.pc < (Object.values(this.Processor.Instruction_memory).length - 1) * 4) {
                this.println('Cycle ', this.cycle.toString(), ': CPU is stalled')
                console.log('Cycle ', this.cycle.toString(), ': CPU is stalled')
                this.Processor.stalled = true
            }
            else {
                if (this.Processor.active) {
                    this.Processor.active =false
                    this.println('THE PROGRAM COUNTER IS OUT OF THE INSTRUCTION MEMORY RANGE.')
                    console.log('THE PROGRAM COUNTER IS OUT OF THE INSTRUCTION MEMORY RANGE.')
                }
            }
            element = this.Processor.Instruction_memory[this.Processor.pre_pc.toString(2)];
            this.view?.cpu.setIsRunning(this.Processor.active);
            [CPU_message, , , ] = this.Processor.run(element, this.Processor.pre_pc)    
        } else {
            if (this.Processor.pc >= (Object.values(this.Processor.Instruction_memory).length - 1) * 4) {
                if (this.Processor.active) {
                    this.Processor.active =false
                    this.println('THE PROGRAM COUNTER IS OUT OF THE INSTRUCTION MEMORY RANGE.')
                    console.log('THE PROGRAM COUNTER IS OUT OF THE INSTRUCTION MEMORY RANGE.')
                }
            }
            if ( this.Processor.active == true) {
                this.println('Cycle ', this.cycle.toString(), ': CPU is processing')
                console.log('Cycle ', this.cycle.toString(), ': CPU is processing')
            } 
            element = this.Processor.Instruction_memory[this.Processor.pc.toString(2)];
            this.view?.cpu.setIsRunning(this.Processor.active);
            [CPU_message, , , ] = this.Processor.run(element, this.Processor.pc)    
        }
        this.println(
            'Cycle ',
            this.cycle.toString(),
            ': INTERCONNECT is sending message to CPU',
        )
        console.log(
            'Cycle ',
            this.cycle.toString(),
            ': INTERCONNECT is sending message to CPU',
        )

        this.cycle += 1
        if (CPU_message == 'GET' || CPU_message == 'PUT') {
            if (this.Processor.pc < (Object.values(this.Processor.Instruction_memory).length - 1) * 4) {
                this.println('Cycle ', this.cycle.toString(), ': CPU is stalled')
                console.log('Cycle ', this.cycle.toString(), ': CPU is stalled')
                this.Processor.stalled = true
            }
            else {
                if (this.Processor.active) {
                    this.Processor.active =false
                    this.println('THE PROGRAM COUNTER IS OUT OF THE INSTRUCTION MEMORY RANGE.')
                    console.log('THE PROGRAM COUNTER IS OUT OF THE INSTRUCTION MEMORY RANGE.')
                }
            }
            element = this.Processor.Instruction_memory[this.Processor.pre_pc.toString(2)];
            this.view?.cpu.setIsRunning(this.Processor.active);
            [CPU_message, , , ] = this.Processor.run(element, this.Processor.pre_pc)    
        } else {
            if (this.Processor.pc >= (Object.values(this.Processor.Instruction_memory).length - 1) * 4) {
                if (this.Processor.active) {
                    this.Processor.active =false
                    this.println('THE PROGRAM COUNTER IS OUT OF THE INSTRUCTION MEMORY RANGE.')
                    console.log('THE PROGRAM COUNTER IS OUT OF THE INSTRUCTION MEMORY RANGE.')
                }
            }
            if ( this.Processor.active == true) {
                this.println('Cycle ', this.cycle.toString(), ': CPU is processing')
                console.log('Cycle ', this.cycle.toString(), ': CPU is processing')
            } 
            element = this.Processor.Instruction_memory[this.Processor.pc.toString(2)];
            this.view?.cpu.setIsRunning(this.Processor.active);
            [CPU_message, , , ] = this.Processor.run(element, this.Processor.pc)    
        }
        this.println(
            'Cycle ',
            this.cycle.toString(),
            ': DMA is receiving ACCESS_ACK DATA message from INTERCONNECT',
        )
        console.log(
            'Cycle ',
            this.cycle.toString(),
            ': DMA is receiving ACCESS_ACK DATA message from INTERCONNECT',
        )
        this.DMA.Receive(this.Memory.slaveMemory.send('AccessAckData',di2s))
        this.Processor.active = true
        this.Processor.stalled = false
    }

    public RunAll() {
        // CHECK PROCESSOR IS ACTIVED OR NOT
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

       this.event.emit(Soc.SOCEVENT.DONE_ALL)
    }

    public async stepWithEvent() {
        await this.Step()
        this.event.emit(Soc.SOCEVENT.STEP_END)
    }

    public async Step() {   
//---------------------------------------------------------------------------------------------------------\\
        // ****************CHECK CONDITION TO RUN SYSTEM ****************
        // CHECK PROCESSOR IS ACTIVED
        if (this.Processor.active == false) {
            console.log('CPU HAS NOT BEEN ACTIVED!!!')
            this.println('CPU HAS NOT BEEN ACTIVED!!!')
            return
        }
        // CHECK THE PROGRAM COUNTER IS OUT OF THE INSTRUCTION MEMORY RANGE
        if (
            this.Processor.pc >=
            (Object.values(this.Processor.Instruction_memory).length - 1) * 4
        ) {
            this.println('THE PROGRAM COUNTER IS OUT OF THE INSTRUCTION MEMORY RANGE.')
            console.log('THE PROGRAM COUNTER IS OUT OF THE INSTRUCTION MEMORY RANGE.')
            return
        }
        // CHECK SYNTAX ERROR
        if (this.Assembler.syntax_error) return

//---------------------------------------------------------------------------------------------------------\\
        // ****************RUN SYSTEM ****************
        this.println('Cycle ', this.cycle.toString(), ': CPU is processing')
        console.log('Cycle ', this.cycle.toString(), ': CPU is processing')
        
        this.cycle += 1
        
        const element = this.Processor.Instruction_memory[this.Processor.pc.toString(2)]
        //console.log("this.Processor.pre_pc, this.Processor.pc", this.Processor.pre_pc, this.Processor.pc)
        this.view?.cpu.setIsRunning(this.Processor.active)
        // CPU RUN
        let [CPU_message, CPU_data, logical_address, rd] = this.Processor.run(element, this.Processor.pc)
        //console.log("CPU messeage: ", CPU_message)
        this.IO_operate ()
        if (CPU_message!= 'PUT' && CPU_message != 'GET') {
            this.DMA_operate()
            return 
        }// CHECK message is PUT or GET
        // ****************IF message is PUT OR GET****************
        // CHECK ADDRESS
        if (dec('0' + logical_address) % 4 != 0) {
            console.log('ERORR: Invaild Address!!!')
            this.println('ERORR: Invaild Address!!!')
            return
        }
        // CHECK INTERCONNET 
        if (this.Bus.active == false) {
            console.log('ERORR: INTERCONNECT has not been actived!!!')
            this.println('ERORR: INTERCONNECT has not been actived!!!')
            return
        }
        // CHECK MEMORY 
        if (this.Memory.active == false) {
            console.log('ERORR: MEMORY has not been actived!!!')
            this.println('ERORR: MEMORY has not been actived!!!')
            return
        }
        if (this.DMA.active == false) {
            console.log('WARNING: DMA has not been actived!!!')
            this.println('WARNING: DMA has not been actived!!!')
        }
        // RUN MMU
        this.view?.mmu.setIsRunning(this.MMU.active)
        let [physical_address, MMU_message] = this.MMU.Run(logical_address)
        console.log ('Cycle ', this.cycle.toString() +' : '+ MMU_message)
        this.println ('Cycle ', this.cycle.toString()+' : '+ MMU_message)

        //console.log(this.MMU.TLB)

        if (MMU_message == 'TLB: PPN is missed.') {
            // MISSED
            // CALCULATE physical_address
            // this.Memory.IOpoint
            this.cycle+=1
            
            const VPN = dec('0' + logical_address.slice(18).slice(0, 4));

            console.log('Cycle ', this.cycle.toString()+' : '+ 
            'MMU want to GET data at address '+
            BinToHex((VPN*4 + this.MMU.pageNumberPointer).toString(2).padStart(32,'0'))+' from MEMORY')
            this.println('Cycle ', this.cycle.toString()+' : '+ 
            'MMU want to GET data at address '+
            BinToHex((VPN*4 + this.MMU.pageNumberPointer).toString(2).padStart(32,'0'))+' from MEMORY')
            
            const MMU2Memory = this.MMU.master.send('GET', 
            (VPN*4 + this.MMU.pageNumberPointer).toString(2).padStart(32,'0'),
            '0', this.cycle, '0')
            console.log  ('Cycle ', this.cycle.toString()+' : '+'MMU is sending message GET to MEMORY')
            this.println ('Cycle ', this.cycle.toString()+' : '+'MMU is sending message GET to MEMORY')

            this.cycle = this.cycle + 1
            const [, ai2s]  = this.Memory.slaveMemory.receive (MMU2Memory)
            console.log  ('Cycle ', this.cycle.toString()+' : '+'MEMORY is receiving message from MMU')
            this.println ('Cycle ', this.cycle.toString()+' : '+'MEMORY is receiving message from MMU')

            this.cycle = this.cycle + 1
            const dfm2mmu   = this.Memory.slaveMemory.send('AccessAckData', this.Memory.Memory[ai2s])
            console.log  ('Cycle ', this.cycle.toString()+' : '+'MEMORY is sending message to MMU')
            this.println ('Cycle ', this.cycle.toString()+' : '+'MEMORY is sending message to MMU')

            this.cycle = this.cycle + 1
            const ammurfm   = this.MMU.master.receive ('MEMORY', 
                this.cycle, 
                'bn',
                {opcode: '001', payload: ''+this.Memory.Memory[ai2s]},
            )
            console.log  ('Cycle ', this.cycle.toString()+' : '+'MMU is receiving message from MEMORY')
            this.println ('Cycle ', this.cycle.toString()+' : '+'MMU is receiving message from MEMORY')

            this.cycle+=1
            const PPN = dec ('0'+ammurfm)
            console.log(VPN)
            this.MMU.pageReplace([VPN, PPN, 1, this.cycle])
            console.log ('Cycle ', this.cycle.toString()+' : ' + 'TLB: Page Number is replaced')
            this.println('Cycle ', this.cycle.toString()+' : ' + 'TLB: Page Number is replaced')

            this.cycle+=1
            let [nphysical_address, MMU_message] = this.MMU.Run(logical_address)
            console.log ('Cycle ', this.cycle.toString()+' : '+ MMU_message)
            this.println('Cycle ', this.cycle.toString()+' : '+ MMU_message)

            console.log(this.MMU.TLB)
            physical_address = nphysical_address

        } 
        
        this.println(
            'Cycle ',
            this.cycle.toString(),
            ': Logical_address: ',
            BinToHex(logical_address),
            ' Physical address: ',
            BinToHex(physical_address),
        )
        console.log(
            'Cycle ',
            this.cycle.toString(),
            ': Virtual address: ',
            BinToHex(logical_address),
            ' Physical address: ',
            BinToHex(physical_address)
        )
        // IF MESSAGE IS PUT (STORE): 
        if (CPU_message == 'PUT') {
            this.println('Cycle ', this.cycle.toString(), ': CPU is sending PUT message to MEMORY')
            console.log('Cycle ', this.cycle.toString(), ': CPU is sending PUT message to MEMORY')
            // PROCESSOT is sending PUT
            const dm2i = this.Processor.master.send(
                CPU_message,
                physical_address,
                '0',
                this.cycle,
                CPU_data,
            )

            this.println(
                'Cycle ',
                this.cycle.toString(),
                ': INTERCONNECT is receiving message from CPU',
            )
            console.log(
                'Cycle ',
                this.cycle.toString(),
                ': INTERCONNECT is receiving message from CPU',
            )
            //INTERCONNCET RUN
           
            this.cycle += 1

            this.view?.interconnect.setIsRunning(this.Bus.active)
            this.Bus.Port_in(dm2i, 1) // CPU IS LOADING DATA INTO PORT[1]
            this.Bus.Transmit() // INTERCONNECT IS TRANSMITTING
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
            const doutChA = this.Bus.Port_out(0) // GET DATA FROM POUT[0], POUT[0] IS POUT FOR MEMORY
            
            //MEMORY RUN
            
            this.cycle += 1

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
            const [di2s, ai2s] = this.Memory.slaveMemory.receive(doutChA)
            //console.log ('data and address', di2s, ai2s)
            this.Memory.Memory[ai2s] = di2s
            // MEMORY RESPONSE
           
            this.cycle += 1

            this.println(
                'Cycle ',
                this.cycle.toString(),
                ': MEMORY is sending ACCESS_ACK message to CPU',
            )
            console.log(
                'Cycle ',
                this.cycle.toString(),
                ': MEMORY is sending ACCESS_ACK message to CPU',
            )

            const doutChD = this.Memory.slaveMemory.send('AccessAck','',)

            this.println(
                'Cycle ',
                this.cycle.toString(),
                ': INTERCONNECT is receiving message from MEMORY',
            )
            console.log(
                'Cycle ',
                this.cycle.toString(),
                ': INTERCONNECT is receiving message from MEMORY',
            )

            this.Bus.Port_in(doutChD, 0)
            this.Bus.Transmit()
            this.Bus.Port_out(1)
            
            this.cycle += 1

            this.println(
                'Cycle ',
                this.cycle.toString(),
                ': INTERCONNECT is sending message to CPU',
            )
            console.log(
                'Cycle ',
                this.cycle.toString(),
                ': INTERCONNECT is sending message to CPU',
            )
            this.println(
                'Cycle ',
                this.cycle.toString(),
                ': CPU is receiving ACCESS_ACK message from INTERCONNECT',
            )
            console.log(
                'Cycle ',
                this.cycle.toString(),
                ': CPU is receiving ACCESS_ACK message from INTERCONNECT',
            )
        }

        // IF MESSAGE IS GET (LOAD): 
        if (CPU_message == 'GET') {
        this.println('Cycle ', this.cycle.toString(), ': CPU is sending GET message to MEMORY')
        console.log('Cycle ', this.cycle.toString(), ': CPU is sending GET message to MEMORY')
        // PROCESSOT is sending GET
        const dm2i = this.Processor.master.send(
            CPU_message,
            physical_address,
            '0',
            this.cycle,
            CPU_data,
        )

        this.println(
            'Cycle ',
            this.cycle.toString(),
            ': INTERCONNECT is receiving message from CPU',
        )
        console.log(
            'Cycle ',
            this.cycle.toString(),
            ': INTERCONNECT is receiving message from CPU',
        )
        //INTERCONNCET RUN
        
        this.cycle += 1
        this.view?.interconnect.setIsRunning(this.Bus.active)

//******************************************************************** */
        this.Bus.Port_in(dm2i, 1) // CPU IS LOADING DATA INTO PORT[1]
//******************************************************************** */

        this.Bus.Transmit() // INTERCONNECT IS TRANSMITTING
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
        const doutChA = this.Bus.Port_out(0) // GET DATA FROM POUT[0], POUT[0] IS POUT FOR MEMORY
        
        //MEMORY RUN
       
        this.cycle += 1

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
        const [, ai2s] = this.Memory.slaveMemory.receive(doutChA)
        let di2s= this.Memory.Memory[ai2s] 
        
        // KEYBOARD
        // console.log("address keyboard", dec ('0'+ai2s), this.Memory.IO_point + 4)
        if (dec ('0'+ai2s)== this.Memory.IO_point + 4) {
            this.println('Cycle ', this.cycle.toString(), ': KEYBOARD is waiting')
            console.log('Cycle ', this.cycle.toString(), ': KEYBOARD is waiting')
            this.view?.keyboard.setIsRunning(this.active_keyboard)
            this.keyboard?.getEvent().once('line-down', (text: string) => {di2s = stringToAsciiAndBinary(text).binary.join('')})
            await this.delay()
        }

        // MEMORY RESPONSE
        this.cycle += 1

        this.println(
            'Cycle ',
            this.cycle.toString(),
            ': MEMORY is sending ACCESS_ACK message to CPU',
        )
        console.log(
            'Cycle ',
            this.cycle.toString(),
            ': MEMORY is sending ACCESS_ACK message to CPU',
        )

        const doutChD = this.Memory.slaveMemory.send('AccessAckData',di2s)

        this.println(
            'Cycle ',
            this.cycle.toString(),
            ': INTERCONNECT is receiving message from MEMORY',
        )
        console.log(
            'Cycle ',
            this.cycle.toString(),
            ': INTERCONNECT is receiving message from MEMORY',
        )

        this.Bus.Port_in(doutChD, 1) //FIX ME
        this.Bus.Transmit()
        
        this.cycle += 1

        this.println(
            'Cycle ',
            this.cycle.toString(),
            ': INTERCONNECT is sending message to CPU',
        )
        console.log(
            'Cycle ',
            this.cycle.toString(),
            ': INTERCONNECT is sending message to CPU',
        )
        this.println(
            'Cycle ',
            this.cycle.toString(),
            ': CPU is receiving ACCESS_ACK DATA message from INTERCONNECT',
        )
        console.log(
            'Cycle ',
            this.cycle.toString(),
            ': CPU is receiving ACCESS_ACK DATA message from INTERCONNECT',
        )

        const di2m = this.Bus.Port_out(0)
        if (di2m === 'undefined' || di2m === undefined) this.Processor.register[rd] = '0'.padStart(32, '0')
        if (di2m !== 'undefined' && di2m !== undefined) this.Processor.register[rd] = (di2m.slice(-34)).slice(0,32)
        }

        this.DMA_operate()
    }
}


