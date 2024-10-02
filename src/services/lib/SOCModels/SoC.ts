import RiscVProcessor from './RiscV_processor'
import InterConnect from './Interconnect'
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


export default class Soc {
    name: string
    Processor: RiscVProcessor
    Bus: InterConnect
    MMU: MMU
    Memory: Memory
    DMA: DMA
    Led_matrix: boolean[][]
    Assembler: Assembler

    cycle: number
    public static SOCEVENT = {DONE_ALL: 'DONE ALL'}
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
        for (let i = 0; i < 32; i++) {
            let row: boolean[] = [];
            for (let j = 0; j < 32; j++) row.push(false);
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
                    Mem_tb: Register[] 
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
        this.MMU.SetTLB([0, (0*4095) + (96 + 16 + 1024) *4, 1, 1],
                        [1, (1*4095) + (96 + 16 + 1024) *4, 1, 2],
                        [2, (2*4095) + (96 + 16 + 1024) *4, 1, 3],
                        [3, (3*4095) + (96 + 16 + 1024) *4, 1, 4],
                        [4, (4*4095) + (96 + 16 + 1024) *4, 1, 5],
                        [5, (5*4095) + (96 + 16 + 1024) *4, 1, 6],
                        [6, (6*4095) + (96 + 16 + 1024) *4, 1, 7],
                        [244 , (244*4095) + (96 + 16 + 1024) *4, 1, 8],
                )
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
        return !this.Assembler.syntax_error
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

    public async Step() {
        //console.log('Memory: ', this.Memory.Memory);
        
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
        this.view?.cpu.setIsRunning(this.Processor.active)
        // CPU RUN
        let [CPU_message, CPU_data, logical_address, rd] = this.Processor.run(element, this.Processor.pc)
        
        if (CPU_message!= 'PUT' && CPU_message != 'GET') return // CHECK message is PUT or GET
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
        console.log('logical_address', logical_address)
        let [physical_address, MMU_message] = this.MMU.Run(logical_address)
        console.log(MMU_message)
        this.println(MMU_message)

        if (MMU_message == 'WARNING TLB: Address is missed') {
            // MISSED
            // CALCULATE physical_address
            // this.Memory.IOpoint
            const VPN = dec ('0'+logical_address.slice(0,24))
            const PPN = dec ('0'+this.Memory.Memory[physical_address])
            this.MMU.pageReplace([VPN, PPN, 1, this.cycle])
            let [nphysical_address, MMU_message] = this.MMU.Run(logical_address)
            console.log(MMU_message)
            this.println(MMU_message)
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
            this.println('Cycle ', this.cycle.toString(), ': CPU is sending PUT messeage to MEMORY')
            console.log('Cycle ', this.cycle.toString(), ': CPU is sending PUT messeage to MEMORY')
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
                ': INTERCONNECT is receiving messeage from CPU',
            )
            console.log(
                'Cycle ',
                this.cycle.toString(),
                ': INTERCONNECT is receiving messeage from CPU',
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
                ': MEMORY is sending ACCESS_ACK messeage to CPU',
            )
            console.log(
                'Cycle ',
                this.cycle.toString(),
                ': MEMORY is sending ACCESS_ACK messeage to CPU',
            )

            const doutChD = this.Memory.slaveMemory.send('AccessAck','',)

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

            this.Bus.Port_in(doutChD, 0)
            this.Bus.Transmit()
            this.Bus.Port_out(1)
            
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
            const monitor_address = this.Memory.IO_point.toString(2).padStart(32,'0')
            // console.log('monitor_address', this.Memory.Memory[monitor_address].padStart(32,'0'))
            // console.log('IO_point',this.Memory.IO_point)
            if (this.active_monitor == true) {
                this.monitor?.println(BinToHex(this.Memory.Memory[monitor_address]))
                this.view?.monitor.setIsRunning(this.active_monitor)}
            else {
                this.println('MONITOR has not actived!!!')
                console.log('MONITOR has not actived!!!')
            }

        }
    

    // IF MESSAGE IS GET (LOAD): 
    if (CPU_message == 'GET') {
        this.println('Cycle ', this.cycle.toString(), ': CPU is sending GET messeage to MEMORY')
        console.log('Cycle ', this.cycle.toString(), ': CPU is sending GET messeage to MEMORY')
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
            ': INTERCONNECT is receiving messeage from CPU',
        )
        console.log(
            'Cycle ',
            this.cycle.toString(),
            ': INTERCONNECT is receiving messeage from CPU',
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
        const [, ai2s] = this.Memory.slaveMemory.receive(doutChA)
        let di2s= this.Memory.Memory[ai2s] 
        
        console.log("address keyboard", dec ('0'+ai2s), this.Memory.IO_point + 4)
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
            ': MEMORY is sending ACCESS_ACK messeage to CPU',
        )
        console.log(
            'Cycle ',
            this.cycle.toString(),
            ': MEMORY is sending ACCESS_ACK messeage to CPU',
        )

        const doutChD = this.Memory.slaveMemory.send('AccessAckData',di2s)

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

        this.Bus.Port_in(doutChD, 1)
        this.Bus.Transmit()
        
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
            ': CPU is receiving ACCESS_ACK DATA messeage from INTERCONNECT',
        )
        console.log(
            'Cycle ',
            this.cycle.toString(),
            ': CPU is receiving ACCESS_ACK DATA messeage from INTERCONNECT',
        )

        const di2m = this.Bus.Port_out(0)
        if (di2m === 'undefined' || di2m === undefined) this.Processor.register[rd] = '0'.padStart(32, '0')
        if (di2m !== 'undefined' && di2m !== undefined) this.Processor.register[rd] = (di2m.slice(-34)).slice(0,32)
        }
        // LED MATRIX OPERATE
        if (this.view) 
            this.view?.ledMatrix.setIsRunning(this.view.matrixModule.getActivated())
        for (let i = 0; i < 32; i++) {
            for (let j = 0; j < 32; j++) {
                if (this.Memory.Memory[(i*4).toString(2).padStart(32,'0')].padStart(32,'0')[j]==='0') 
                    this.Led_matrix[i][j]= false
                if (this.Memory.Memory[(i*4).toString(2).padStart(32,'0')].padStart(32,'0')[j]==='1') 
                    this.Led_matrix[i][j]= true;
            }
        }
        for (let i = 0; i < 32; i++) {
            for (let j = 0; j < 32; j++) {
                if (this.Led_matrix[i][j]==true) this.LedMatrix?.turnOn(i, j)
                if (this.Led_matrix[i][j]==false) this.LedMatrix?.turnOff(i, j)
            }
        }
    }
}


