import RiscVProcessor from '../Processor/RiscV_processor'
import InterConnect from '../Interconnect/Interconnect'
import disAssembly from '../Compile/Disassembly'
import MMU from '../Processor/MMU'
import { dec, stringToAsciiAndBinary, BinToHex } from '../Compile/convert'
import Memory from '../Memory/Memory'
import { Keyboard, Logger, Monitor } from '../Compile/soc.d'
// import {Logger } from './soc.d'
import Ecall from '../Ecall/Ecall'
import { NCKHBoard } from '../../soc/boards'
import DMA from '../DMA/DMA'
import Assembler from '../Compile/check_syntax'
// import LedMatrix from '../control/LedMatrix'
import { Register } from '~/types/register'
// import { eventNames } from 'process'
import EventEmitter from '../../EventEmitter/EventEmitter'
import type { TLB, TLBEntries } from '../Compile/soc.d'
import { Disassembly } from '~/components/CodeEditor'
import { assemble } from '../SOC/SOC.assemble'

import { RunAll } from '../SOC/SOC.runAll'
import { Step } from '../SOC/SOC.step'
import BuddyAllocator from "../Memory/BuddyAllocator"
import sub_InterConnect from '../Interconnect/sub_Interconnect'
import ChannelA from '../Interconnect/ChannelA'
import ChannelD from "./../Interconnect/ChannelD"
import Bridge from "./../Interconnect/Bridge"
import { FIFO_ChannelA } from '../Interconnect/FIFO_ChannelA'
import LEDMatrix from '../DMA/Led_matrix'
import Cycle from '../Compile/cycle'
// import { Console } from 'console'
// import {Monitor} from './Monitor'
// import {Keyboard} from './Keyboard'

export default class Soc {
    name        : string
    Processor   : RiscVProcessor
    Bus0        : InterConnect
    Bus1        : sub_InterConnect
    MMU         : MMU
    Memory      : Memory
    DMA         : DMA
    Bridge      : Bridge
    Led_matrix  : LEDMatrix
    // Monitor     : Monitor
    // Keyboard    : Keyboard

    arbiter     : boolean

    // Ecall       : Ecall
    Assembler   : Assembler
    Disassembly : disAssembly
    Allocator   : BuddyAllocator
    cycle       : Cycle
    MMU_endAddr : number
    public static SOCEVENT = {DONE_ALL: 'DONE ALL', STEP_END: 'STEP END'}
    event = new EventEmitter ()

    disabled: boolean = false
    
    Assembly_code: any
    logger?: Logger
    active_keyboard: any
    active_monitor: any
    // LedMatrix?: LedMatrix
    keyboard?: Keyboard
    monitor?: Monitor
    view?: NCKHBoard

    public setLogger(logger: Logger) {
        this.logger = logger
        this.Processor.setLogger    (logger)
        this.Memory.setLogger       (logger)
        this.Bus0.setLogger         (logger)
        this.Bus1.setLogger         (logger)
        this.Led_matrix.setLogger   (logger)
    }

    public setKeyboard(keyboard: Keyboard) {
        this.keyboard       = keyboard
        this.Processor.setKeyboard (keyboard)
    }

    public setMonitor(monitor: Monitor) {
        this.monitor        = monitor
        this.Processor.setMonitor (monitor)
    }

    public setView(view: NCKHBoard) {
        this.view = view
    }

    // public setLedMatrix (Led_matrix: LedMatrix) {
    //     this.LedMatrix = Led_matrix
    // }

    public println(...args: string[]) {
        if (!this.logger) {
            return
        }
        this.logger.println(...args)
        //console.log(...args)
    }

    constructor(name: string) {
        this.Processor      = new RiscVProcessor('RiscV CPU', '00', false)
        this.Bus0           = new InterConnect(false)
        this.Bus1           = new sub_InterConnect(false)    
        this.MMU            = new MMU(false)
        this.Memory         = new Memory(false)
        this.DMA            = new DMA()
        this.Assembler      = new Assembler()
        this.Assembly_code  = []
        this.Led_matrix     = new LEDMatrix ()
        this.Bridge         = new Bridge()
        // this.Monitor        = new Monitor        ()
        // this.Keyboard       = new Keyboard       ()
        this.Allocator      = new BuddyAllocator (0x0BFFF, 0X0C000)
        this.MMU_endAddr    = 0
        this.arbiter        = false
        // this.Ecall          = new Ecall
        this.Disassembly    = new disAssembly ('')
        this.cycle = new Cycle (0)

        this.name = name
    }

    public delay() {
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

    public assemble(                 
        code               : string 
        ,required_mem       : number
        ,Mem_tb             : Register[]
        ,TLB                : TLBEntries[]
        ,stap               : number
        ) {
        return assemble.bind(this) (
            code                 
            ,required_mem                
            ,Mem_tb             
            ,TLB                
            ,stap                                          
        )
    }

    // public IO_operate () {
    //     return IO_operate.bind(this)()
    // }
    
    // public DMA_operate () {
    //     return DMA_Get.bind(this)()
    // }

    public RunAll() {
        return RunAll.bind(this)()
    }

    public async stepWithEvent() {
        await this.Step()
        this.event.emit(Soc.SOCEVENT.STEP_END)
    }

    public async Step()  {     

        await this.Processor.Run(
            false
            , this.cycle
            , this.Bus0.Pout[0].dequeue()
            , this.Bus0.state == 0
        )
        
        this.DMA.Run (
            this.Bus1.Pout[1].dequeue()
            ,this.Bus0.Pout[1].dequeue()
            , this.cycle
            , this.Bus0.state == 0
            , this.Bus1.state == 0
        )
            
        this.Memory.Run(
            this.cycle
            , this.Bus0.Pout[2].dequeue()
            , this.Bus0.state == 0
        )
        
        this.Bus0.Run (
            this.Processor.master.ChannelA
            ,this.DMA.burst
            ,this.Memory.burst
            ,this.Bridge.Bridge_slave.ChannelD
            ,this.Processor.master.ChannelA.valid == '1'
            ,this.DMA.DMA_Master.ChannelA.valid == '1'
            ,this.Memory.slaveMemory.ChannelD.valid == '1'
            ,this.Bridge.Bridge_slave.ChannelD.valid == '1'
            ,this.cycle
        )

        this.Bridge.Run (
            this.Bus0.Pout[3]
            , this.Bus1.Pout[0].dequeue()
            , this.Bus0.state == 0
            , this.Bus1.state == 0
            , this.cycle
        )
        
        this.Bus1.Run (
            this.Bridge.Bridge_master.ChannelA
            , this.DMA.DMA_Slave.ChannelD
            , this.Led_matrix.Matrix_Slave.ChannelD
            , this.Bridge.Bridge_master.ChannelA.valid == '1'
            , this.DMA.DMA_Slave.ChannelD.valid == '1'
            , this.Led_matrix.Matrix_Slave.ChannelD.valid == '1'
            , this.cycle
        )

        this.Led_matrix.Run(
            this.Bus1.Pout[2].dequeue()
            , this.cycle
            , this.Bus1.state == 0
        )

        // this.cycle.incr()
        

        // console.log('this.Processor.master.ChannelA', this.Processor.master.ChannelA)
        // console.log('this.Memory.slaveMemory.ChannelD', this.Memory.slaveMemory.ChannelD)
        // console.log('this.Processor.state, this.Memory.step, this.Bus0.state', this.Processor.state, this.Memory.state, this.Bus0.state)
        // console.log(this.Bus0.Timming)
        // console.log('pin0',this.Bus0.Pin[0])
        // console.log('********************************')
        // console.log('this.Processor.state, this.Memory.step, this.Bus0.state', this.Processor.state, this.Memory.step, this.Bus0.state)
        // console.log('pin0',this.Bus0.Pin[0].peek())

        // if (this.Processor)


    }
//     public async Step()                                                                                             {
//         this.Check_Processor ()
//         // ****************RUN SYSTEM ****************
//         this.cycle+=1
//         let  [CPU_message, CPU_data, logical_address, rd, size] = this.Processor_run (this.arbiter)

//         const CPU_access = (CPU_message == 'PUT') || (CPU_message == 'GET') 
//         if (CPU_access && this.arbiter == false) {
//             this.Ecall(CPU_message)
//             this.Check_otherComponents ()
//             this.Bus0.Pactived[1] = false
//             // CHECK ADDRESS
//             if (dec('0' + logical_address) % 4 != 0) {
//                 console.log('ERORR: Invaild Address!!!')
//                 this.println('ERORR: Invaild Address!!!')
//                 return
//             }
//             const physical_address = this.MMU_run (logical_address)
//             if ((dec ('0' + physical_address) > this.MMU.end_addr - 1) &&  (parseInt (logical_address,2) <= this.MMU.user_point)) {
//                 console.log('ERORR: Page fault!!!!')
//                 this.println('ERORR: Page fault!!!!')
//                 return
//             }

//             this.cycle += 1
//             this.println(
//                 'Cycle ',
//                 this.cycle.toString(),
//                 ': Logical_address: ',
//                 BinToHex(logical_address),
//                 ' Physical address: ',
//                 BinToHex(physical_address),
//             )
//             console.log(
//                 'Cycle ',
//                 this.cycle.toString(),
//                 ': Virtual address: ',
//                 BinToHex(logical_address),
//                 ' Physical address: ',
//                 BinToHex(physical_address)
//             )
//             if (CPU_message == 'PUT') this.Processor_PUTmesseage (CPU_message, physical_address, CPU_data)
//             if (CPU_message == 'GET') {
//                 const di2m = this.Processor_GETmesseage (CPU_message, physical_address, CPU_data, rd)
//                 console.log('di2m: ', di2m)
//                 if (di2m === 'undefined' || di2m === undefined) this.Processor.register[rd] = '0'.padStart(32, '0')
//                 if (di2m !== 'undefined' && di2m !== undefined) this.Processor.register[rd] = (di2m.slice(-34)).slice(0,32)
        
//             }
//             this.arbiter = true
//         }
//         else {
//             if (this.DMA.phase == false) {
//                 this.DMA_Get()
//                 this.DMA.phase = true
//             }
//             else {
//                 this.DMA_Put ()
//                 this.DMA.phase = false
//             }
//             this.arbiter = false
//         }
// }        
        // } else {
        //         if (this.DMA.phase == false) {
        //             this.DMA_Get()
        //             this.DMA.phase = true
        //         }
        //         else {
        //             this.DMA_Put ()
        //             this.DMA.phase = false
        //         }
        //     }
                
            // IF ECALL > USER_POINT

    public Check_Processor ()                                                                              {
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
    }
    // public Processor_run (icBusy: boolean) : [string, string, string, string, string]                                     {
    //     this.println('Cycle ', this.cycle.toString(), ': CPU is processing')
    //     console.log('Cycle ', this.cycle.toString(),  ': CPU is processing')
    //     const element = this.Processor.Instruction_memory[this.Processor.pc.toString(2)]
    //     this.view?.cpu.setIsRunning(this.Processor.active)
    //     let    [CPU_message, CPU_data, logical_address, rd, size] = this.Processor.run(element, this.Processor.pc, icBusy)
    //     return [CPU_message, CPU_data, logical_address, rd, size]
    // }
    // public Ecall (CPU_message : any)                                                                     {
    //     if (CPU_message == 'ECALL') {
    //         this.println('Cycle ', this.cycle.toString(), ': Ecall instruction')
    //         console.log('Cycle ', this.cycle.toString(), ': Ecall instruction')
            
    //         // await this.Ecall.execute (this.Processor.register)
    //         return 
    //     }
    // }
    // public Check_otherComponents ()                                                                        {

    //     // CHECK INTERCONNET 
    //     if (this.Bus0.active == false) {
    //         console.log('ERORR: INTERCONNECT has not been actived!!!')
    //         this.println('ERORR: INTERCONNECT has not been actived!!!')
    //         return
    //     }
    //     // CHECK MEMORY 
    //     if (this.Memory.active == false) {
    //         console.log('ERORR: MEMORY has not been actived!!!')
    //         this.println('ERORR: MEMORY has not been actived!!!')
    //         return
    //     }
    //     if (this.DMA.active == false) {
    //         console.log('WARNING: DMA has not been actived!!!')
    //         this.println('WARNING: DMA has not been actived!!!')
    //     }
    // }
    // // public MMU_run (logical_address: string)                                                             {
    // //     this.view?.mmu.setIsRunning(this.MMU.active)
    // //     let [physical_address, MMU_message] = this.MMU.Run(logical_address)
    // //     console.log  ('Cycle ', this.cycle.toString()+' : ' + MMU_message)
    // //     this.println ('Cycle ', this.cycle.toString()+' : ' + MMU_message)
    // //     if (MMU_message == 'TLB: VPN is missed.') {

    // //         const VPN       = logical_address.slice(0, 20)  // 10 bit đầu tiên
    // //         const stap      = this.MMU.stap

    // //         //***************************GET PTE ****************************
    // //         const PTE = stap + (parseInt(VPN , 2) & 0xf)* 4
    // //         // console.log('stap: 0x', stap.toString(16))
    // //         console.log('Cycle ', this.cycle.toString()+' : '+ 
    // //         'The MMU want to GET data at address '+
    // //         BinToHex((PTE).toString(2).padStart(32,'0'))+' from MEMORY')
    // //         this.println('Cycle ', this.cycle.toString()+' : '+ 
    // //         'The MMU want to GET data at address '+
    // //         BinToHex((PTE).toString(2).padStart(32,'0'))+' from MEMORY')
            
    // //         this.MMU.master.send('GET', (PTE).toString(2).padStart(17,'0'), '0')
    // //         console.log  ('Cycle ', this.cycle.toString()+': The MMU is sending a GET message to MEMORY through the INTERCONNECT.')
    // //         this.println ('Cycle ', this.cycle.toString()+': The MMU is sending a GET message to MEMORY through the INTERCONNECT.')
    // //         this.Bus0.Port_in(this.MMU.master.ChannelA, 0)

    // //         this.cycle = this.cycle + 1
    // //         console.log  ('Cycle ', this.cycle.toString()+': The INTERCONNECT is forwarding the message to MEMORY.')
    // //         this.println ('Cycle ', this.cycle.toString()+': The INTERCONNECT is forwarding the message to MEMORY.')
    // //         this.Bus0.Transmit()

    // //         this.cycle     = this.cycle + 1
    // //         let MMU2Memory = this.Bus0.Port_out(2) // channelD
    // //         let [, ai2s]   = this.Memory.slaveMemory.receive (MMU2Memory)
    // //         console.log  ('Cycle ', this.cycle.toString()+': The MEMORY is receiving a GET message from the INTERCONNECT.')
    // //         this.println ('Cycle ', this.cycle.toString()+': The MEMORY is receiving a GET message from the INTERCONNECT.')

    // //         this.cycle = this.cycle + 1
    // //         this.Memory.slaveMemory.send('AccessAckData','00', this.Memory.Memory[ai2s])
    // //         this.Bus0.Port_in(this.Memory.slaveMemory.ChannelD, 2)
    // //         console.log  ('Cycle ', this.cycle.toString()+': The MEMORY is sending an AccessAckData message to the INTERCONNECT.')
    // //         this.println ('Cycle ', this.cycle.toString()+': The MEMORY is sending an AccessAckData message to the INTERCONNECT.')

    // //         this.cycle = this.cycle + 1
    // //         this.Bus0.Transmit()
    // //         console.log  ('Cycle ', this.cycle.toString()+': The INTERCONNECT is forwarding the message to MMU.')
    // //         this.println ('Cycle ', this.cycle.toString()+': The INTERCONNECT is forwarding the message to MMU.')

    // //         this.cycle     = this.cycle + 1
    // //         let Memory2MMU = this.Bus0.Port_out(0) // channelD

    // //         let frame      = this.MMU.master.receive ('AccessAckData', Memory2MMU)
    // //         console.log  ('Cycle ', this.cycle.toString()+': The MMU is receiving an AccessAckData message from the INTERCONNECT.')
    // //         this.println ('Cycle ', this.cycle.toString()+': The MMU is receiving an AccessAckData message from the INTERCONNECT.')

    // //         this.cycle+=1
    // //         this.MMU.pageReplace ([parseInt(VPN , 2) & 0xf,  dec (frame), 1, this.cycle])
    // //         console.log  ('Cycle ', this.cycle.toString()+': TLB entry is replaced')
    // //         this.println ('Cycle ', this.cycle.toString()+': TLB entry is replaced')
    // //         console.log(this.MMU.TLB)

    // //         this.cycle+=1
    // //         let [physical_address, MMU_message] = this.MMU.Run(logical_address)
    // //         console.log  ('Cycle ', this.cycle.toString()+ ' : ' +MMU_message)
    // //         // this.println ('Cycle ', this.cycle.toString()+ ' : ' +MMU_message)
    // //         return physical_address
    // //     } else {
    // //         return physical_address
    // //     }
    // // }
    // public Processor_PUTmesseage ( CPU_message :string, physical_address  : string, CPU_data  :string)              {
    //     this.println('Cycle '       , 
    //         this.cycle.toString()   , 
    //         ': The CPU is sending a PUT message to MEMORY through the INTERCONNECT.'
    //     )
    //     console.log ('Cycle '       , 
    //         this.cycle.toString()   , 
    //         ': The CPU is sending a PUT message to MEMORY through the INTERCONNECT.'
    //     )
            
    //     // PROCESSOR is sending PUT
    //     this.Processor.master.send(
    //         CPU_message         ,
    //         physical_address    ,
    //         CPU_data            ,
    //     )
    //     const dm2i = this.Processor.master.ChannelA
    //     // console.log("dm2i: ",  dm2i)
    //     this.Bus0.Port_in(dm2i, 0) // CPU IS LOADING DATA INTO PORT[1]

    //     //INTERCONNCET RUN
    //     this.cycle += 1
    //     this.view?.interconnect.setIsRunning(this.Bus0.active)
    //     this.Bus0.Transmit() // INTERCONNECT IS TRANSMITTING
    //     this.println(
    //         'Cycle ',
    //         this.cycle.toString(),
    //         ': The INTERCONNECT is forwarding the message to MEMORY.',
    //     )
    //     console.log(
    //         'Cycle ',
    //         this.cycle.toString(),
    //         ': The INTERCONNECT is forwarding the message to MEMORY.',
    //     )
        
    //     //MEMORY RUN
    //     this.cycle      += 1
    //     const cpu2mem    = this.Bus0.Port_out(2) // GET DATA FROM POUT[0], POUT[0] IS POUT FOR MEMORY
    //     this.view?.memory.setIsRunning(this.Memory.active)
    //     this.println(
    //         'Cycle ',
    //         this.cycle.toString(),
    //        ': The MEMORY is receiving a PUT message from the INTERCONNECT.',
    //     )
    //     console.log(
    //         'Cycle ',
    //         this.cycle.toString(),
    //         ': The MEMORY is receiving a PUT message from the INTERCONNECT.',
    //     )
    //     const [di2s, ai2s] = this.Memory.slaveMemory.receive(cpu2mem)
    //     // console.log("cpu2mem: ",  cpu2mem)
    //     this.Memory.Memory[dec ('0'+ai2s).toString(2).padStart(17, '0')] = di2s
    //     // console.log(" this.Memory.Memory[ai2s]: ",  dec ('0'+ai2s).toString(2).padStart(17, '0'))
    //     // console.log("di2s: ",  di2s)

    //     // MEMORY RESPONSE
    //     this.cycle += 1
    //     this.Memory.slaveMemory.send('AccessAck','00', '')
    //     const mem2cpu = this.Memory.slaveMemory.ChannelD
    //     this.Bus0.Port_in(mem2cpu, 2)
    //     this.println(
    //         'Cycle ',
    //         this.cycle.toString(),
    //         ': The MEMORY is sending an AccessAck message to the CPU.',
    //     )
    //     console.log(
    //         'Cycle ',
    //         this.cycle.toString(),
    //         ': The MEMORY is sending an AccessAck message to the CPU.',
    //     )

    //     this.cycle += 1
    //     this.Bus0.Transmit()
    //     this.println(
    //         'Cycle ',
    //         this.cycle.toString(),
    //        ': The INTERCONNECT is forwarding the message to CPU.',
    //     )
    //     console.log(
    //         'Cycle ',
    //         this.cycle.toString(),
    //         ': The INTERCONNECT is forwarding the message to CPU.',
    //     )

    //     this.cycle += 1
    //     this.Bus0.Port_out(0)
    //     this.println(
    //         'Cycle ',
    //         this.cycle.toString(),
    //         ': The CPU is receiving an AccessAck message from the INTERCONNECT.',
    //     )
    //     console.log(
    //         'Cycle ',
    //         this.cycle.toString(),
    //         ': The CPU is receiving an AccessAck message from the INTERCONNECT.',
    //     )

    //     this.cycle += 1
    // }
    // public Processor_GETmesseage ( CPU_message :string, physical_address  : string, CPU_data  :string, rd: string)  {
    //     this.println(
    //         'Cycle ', 
    //         this.cycle.toString(), 
    //         ': The CPU is sending a GET message to MEMORY through the INTERCONNECT.'
    //     )
    //     console.log (
    //         'Cycle ', 
    //         this.cycle.toString(), 
    //         ': The CPU is sending a GET message to MEMORY through the INTERCONNECT.'
    //     )
    //     // PROCESSOT is sending GET
    //     this.Processor.master.send(
    //         CPU_message,
    //         physical_address,
    //         CPU_data,
    //     )
    //     const dm2i =  this.Processor.master.ChannelA
    //     this.Bus0.Port_in(dm2i, 0)
    //     //INTERCONNCET RUN
        
    //     this.cycle += 1
    //     this.println(
    //         'Cycle ',
    //         this.cycle.toString(),
    //         ': The INTERCONNECT is forwarding the message to MEMORY.',
    //     )
    //     console.log(
    //         'Cycle ',
    //         this.cycle.toString(),
    //         ': The INTERCONNECT is forwarding the message to MEMORY.',
    //     )
    //     this.view?.interconnect.setIsRunning(this.Bus0.active)
    //     this.Bus0.Transmit() // INTERCONNECT IS TRANSMITTING

    //     //MEMORY RUN
    //     this.cycle += 1
    //     this.println(
    //         'Cycle ',
    //         this.cycle.toString(),
    //         ': MEMORY is receiving message from INTERCONNECT',
    //     )
    //     console.log(
    //         'Cycle ',
    //         this.cycle.toString(),
    //         ': MEMORY is receiving message from INTERCONNECT',
    //     )
    //     const cpu2mem = this.Bus0.Port_out(2) // GET DATA FROM POUT[0], POUT[0] IS POUT FOR MEMORY
    //     this.view?.memory.setIsRunning(this.Memory.active)
    //     const [, ai2mem] = this.Memory.slaveMemory.receive(cpu2mem)
    //     let di2mem= this.Memory.Memory[ai2mem] 
        
    //     // MEMORY RESPONSE
    //     this.cycle += 1
    //     this.println(
    //         'Cycle ',
    //         this.cycle.toString(),
    //         ': MEMORY is sending ACCESS_ACK message to CPU',
    //     )
    //     console.log(
    //         'Cycle ',
    //         this.cycle.toString(),
    //         ': MEMORY is sending ACCESS_ACK message to CPU',
    //     )
    //     this.Memory.slaveMemory.send('AccessAckData','00', di2mem)
    //     const mem2cpu = this.Memory.slaveMemory.ChannelD
    //     this.Bus0.Port_in(mem2cpu, 2) //FIX ME

    //     this.cycle += 1
    //     this.println(
    //         'Cycle ',
    //         this.cycle.toString(),
    //         ': INTERCONNECT is sending message to CPU',
    //     )
    //     console.log(
    //         'Cycle ',
    //         this.cycle.toString(),
    //         ': INTERCONNECT is sending message to CPU',
    //     )
    //     this.Bus0.Transmit()

    //     this.cycle += 1
    //     this.println(
    //         'Cycle ',
    //         this.cycle.toString(),
    //         ': CPU is receiving ACCESS_ACK_DATA message from INTERCONNECT',
    //     )
    //     console.log(
    //         'Cycle ',
    //         this.cycle.toString(),
    //         ': CPU is receiving ACCESS_ACK_DATA message from INTERCONNECT',
    //     )
    //     this.cycle = this.cycle + 1
    //     return this.Bus0.Port_out(0).data
    // }
    // public SubInterconncet       ( portIn: ChannelA)                                                                {
    //     this.println(
    //         'Cycle ',
    //         this.cycle.toString(),
    //         ': The SUB-INTERCONNECT is receiving the message from the INTERCONNECT.',
    //     )
    //     console.log(
    //         'Cycle ',
    //         this.cycle.toString(),
    //         ': The SUB-INTERCONNECT is receiving the message from the INTERCONNECT.',
    //     )
    //     this.Bus1.Port_in (portIn, 0)

    //     this.cycle +=1
    //     this.println(
    //         'Cycle ',
    //         this.cycle.toString(),
    //         ': The SUB-INTERCONNECT is forwarding the message to the PERIPHERALS.',
    //     )
    //     console.log(
    //         'Cycle ',
    //         this.cycle.toString(),
    //         ': The SUB-INTERCONNECT is forwarding the message to the PERIPHERALS.',
    //     )
    //     this.Bus1.Transmit()

    //     this.cycle +=1
    //     this.println(
    //         'Cycle ',
    //         this.cycle.toString(),
    //         ': The PERIPHERALS are receiving the message from the INTERCONNECT.',
    //     )
    //     console.log(
    //         'Cycle ',
    //         this.cycle.toString(),
    //        ': The PERIPHERALS are receiving the message from the INTERCONNECT.',
    //     )
    // }            
    // public handleCpuOperationDMA () {
    //     if (this.Processor.pc >= (Object.values(this.Processor.Instruction_memory).length - 1) * 4) {
    //         if (this.Processor.active) {
    //             this.Processor.active = false;
    //             this.println('THE PROGRAM COUNTER IS OUT OF THE INSTRUCTION MEMORY RANGE.');
    //             console.log('THE PROGRAM COUNTER IS OUT OF THE INSTRUCTION MEMORY RANGE.');
    //         }
    //     } else {
    //         let element = this.Processor.Instruction_memory[this.Processor.pc.toString(2)];
    //         this.view?.cpu.setIsRunning(this.Processor.active);
    //         this.Processor.run(element, this.Processor.pc, true);
    //         if (this.Processor.stalled) {
    //             this.println('Cycle ', this.cycle.toString(), ': CPU is stalled');
    //             console.log('Cycle ', this.cycle.toString(), ': CPU is stalled');
    //         } else {
    //                 this.println('Cycle ', this.cycle.toString(), ': CPU is processing');
    //                 console.log('Cycle ', this.cycle.toString(), ': CPU is processing ');
    //         }
    //     }
    // }   
    // public DMA_Get () {
    //     // console.log(        
    //     // ' Destination Address:  ', this.DMA.Des_addr, '\n',
    //     // 'Start address:         ',this.DMA.Start_addr      ,'\n',
    //     // 'Number of Transaction: ',this.DMA.NumTransaction     ,'\n',
    //     // 'Length of internal Buffer: ',this.DMA.BufferLen          ,'\n',
    //     // 'Internal buffer: ',this.DMA.Databuffer         , 
    //     // )
    //     this.DMA.SENDtoMemory()
    //     const dma2i = this.DMA.masterDMA.ChannelA
    //     this.println('Cycle ', this.cycle.toString(), ': The DMA is sending a GET message to MEMORY through the INTERCONNECT.')
    //     console.log ('Cycle ', this.cycle.toString(), ': The DMA is sending a GET message to MEMORY through the INTERCONNECT.')
    //     this.Bus0.Port_in(dma2i, 1)
    
    //     this.cycle += 1
    //     this.handleCpuOperationDMA.call(this);
    //     this.view?.interconnect.setIsRunning(this.Bus0.active)
    //     this.println('Cycle ', this.cycle.toString(), ': The INTERCONNECT is forwarding the message to MEMORY.')
    //     console.log ('Cycle ', this.cycle.toString(), ': The INTERCONNECT is forwarding the message to MEMORY.')
    //     this.Bus0.Transmit()
    
    //     this.cycle += 1
    //     this.handleCpuOperationDMA.call(this);
    //     this.println('Cycle ', this.cycle.toString(), ': The MEMORY is receiving a GET message from the INTERCONNECT.')
    //     console.log('Cycle ', this.cycle.toString(),  ': The MEMORY is receiving a GET message from the INTERCONNECT.')
    //     const i2memory = this.Bus0.Port_out(2)
    //     const [, ai2s] = this.Memory.slaveMemory.receive(i2memory)

    //     this.cycle += 1
    //     this.handleCpuOperationDMA.call(this);
    //     this.println('Cycle ', this.cycle.toString(), ': The MEMORY is sending an AccessAckData message to the DMA.')
    //     console.log('Cycle ', this.cycle.toString(),  ': The MEMORY is sending an AccessAckData message to the DMA.')
    //     this.Memory.slaveMemory.send('AccessAckData','01', this.Memory.Memory[ai2s])
    //     const m2dma =   this.Memory.slaveMemory.ChannelD
    //     this.Bus0.Port_in(m2dma, 2)
    
    //     this.cycle = this.cycle + 1
    //     this.handleCpuOperationDMA.call(this);
    //     this.Bus0.Transmit()
    //     this.println('Cycle ', this.cycle.toString(),': The INTERCONNECT is forwarding the message to DMA.')
    //     console.log('Cycle ', this.cycle.toString(), ': The INTERCONNECT is forwarding the message to DMA.')
    
    //     this.cycle += 1
    //     this.handleCpuOperationDMA.call(this);
    //     const i2dma = this.Bus0.Port_out(1)
    //     this.println('Cycle ', this.cycle.toString(), ': The DMA is receiving an AccessAckData message from the INTERCONNECT.')
    //     console.log('Cycle ', this.cycle.toString(),  ': The DMA is receiving an AccessAckData message from the INTERCONNECT.')
    //     this.DMA.RECfromMemory(i2dma)
    // } 
    // public DMA_Put      (){
    //     this.DMA.SENDtoLED ()
    //     const dma2i = this.DMA.masterDMA.ChannelA
    //     this.println('Cycle ', this.cycle.toString(), ': The DMA is sending a PUT message to MEMORY through the INTERCONNECT.')
    //     console.log ('Cycle ', this.cycle.toString(), ': The DMA is sending a PUT message to MEMORY through the INTERCONNECT.')
    //     this.Bus0.Port_in(dma2i, 1)
        
    //     this.cycle += 1
    //     this.handleCpuOperationDMA.call(this);
    //     this.view?.interconnect.setIsRunning(this.Bus0.active)
    //     this.println('Cycle ', this.cycle.toString(), ': The INTERCONNECT is forwarding the message to SUB-INTERCONNECT.')
    //     console.log ('Cycle ', this.cycle.toString(), ': The INTERCONNECT is forwarding the message to SUB-INTERCONNECT.')
    //     this.Bus0.Transmit()

    //     this.cycle += 1
    //     const dma2sub = this.Bus0.Port_out(3)
    //     this.SubInterconncet (dma2sub)

    //     return this.Bus1.Port_out(3)

    // }
    // public CPU_acces_monitor  ( CPU_message :string, physical_address  : string, CPU_data  :string, rd: string) {
    //     this.println('Cycle '       , 
    //         this.cycle.toString()   , 
    //         ': The CPU is sending a PUT message to MONITOR through the INTERCONNECT.'
    //     )
    //     console.log ('Cycle '       , 
    //         this.cycle.toString()   , 
    //         ': The CPU is sending a PUT message to MONITOR through the INTERCONNECT.'
    //     )
            
    //     // PROCESSOR is sending PUT
    //     this.Processor.master.send(
    //         CPU_message         ,
    //         physical_address    ,
    //         CPU_data            ,
    //     )
    //     this.Bus0.Port_in(this.Processor.master.ChannelA, 0) // CPU IS LOADING DATA INTO PORT[1]

    //     //INTERCONNCET RUN
    //     this.cycle += 1
    //     this.view?.interconnect.setIsRunning(this.Bus0.active)
    //     this.Bus0.Transmit() // INTERCONNECT IS TRANSMITTING
    //     this.println(
    //         'Cycle ',
    //         this.cycle.toString(),
    //         ': The INTERCONNECT is forwarding the message to SUB-INTERCONNECT.',
    //     )
    //     console.log(
    //         'Cycle ',
    //         this.cycle.toString(),
    //         ': The INTERCONNECT is forwarding the message to SUB-INTERCONNECT.',
    //     )
        
    //     //MEMORY RUN
    //     this.cycle      += 1
    //     // this.view?.memory.setIsRunning(this.Memory.active)
    //     this.println(
    //         'Cycle ',
    //         this.cycle.toString(),
    //        ': The SUB-INTERCONNECT is receiving a PUT message from the INTERCONNECT.',
    //     )
    //     console.log(
    //         'Cycle ',
    //         this.cycle.toString(),
    //         ': The SUB-INTERCONNECT is receiving a PUT message from the INTERCONNECT.',
    //     )
    //     this.SubInterconncet (this.Bus0.Port_out(3))

    //     this.Monitor.setData (this.Bus1.Port_out(2))
        
    //     this.cycle += 1
    //     this.Monitor.slave.send('AccessAck','00', '')
    //     this.println(
    //         'Cycle ',
    //         this.cycle.toString(),
    //         ': The MONITOR is sending an AccessAck message to the CPU.',
    //     )
    //     console.log(
    //         'Cycle ',
    //         this.cycle.toString(),
    //         ': The MONITOR is sending an AccessAck message to the CPU.',
    //     )
        
    //     this.cycle += 1
    //     this.Bus1.Port_in(this.Monitor.slave.ChannelD, 2)
    //     this.println(
    //         'Cycle ',
    //         this.cycle.toString(),
    //         ': The MONITOR is sending an AccessAck message to the SUB-INTERCONNECT.',
    //     )
    //     console.log(
    //         'Cycle ',
    //         this.cycle.toString(),
    //         ': The MONITOR is sending an AccessAck message to the SUB-INTERCONNECT.',
    //     )

    //     this.cycle += 1
    //     this.Bus1.Transmit ()
    //     this.println(
    //         'Cycle ',
    //         this.cycle.toString(),
    //         ': The SUB-INTERCONNECT is forwarding the message to INTERCONNECT.',
    //     )
    //     console.log(
    //         'Cycle ',
    //         this.cycle.toString(),
    //         ': The SUB-INTERCONNECT is forwarding the message to INTERCONNECT.',
    //     )

    //     this.cycle += 1
    //     this.Bus0.Port_in(this.Bus1.Port_out(0), 3)
    //     this.println(
    //         'Cycle ',
    //         this.cycle.toString(),
    //         ': The INTERCONNECT is receiving a PUT message from the SUB-INTERCONNECT.',
    //     )
    //     console.log(
    //         'Cycle ',
    //         this.cycle.toString(),
    //         ': The INTERCONNECT is receiving a PUT message from the SUB-INTERCONNECT.',
    //     )

    //     this.cycle += 1
    //     this.Bus0.Transmit()
    //     this.println(
    //         'Cycle ',
    //         this.cycle.toString(),
    //        ': The INTERCONNECT is forwarding the message to CPU.',
    //     )
    //     console.log(
    //         'Cycle ',
    //         this.cycle.toString(),
    //         ': The INTERCONNECT is forwarding the message to CPU.',
    //     )

    //     this.cycle += 1
    //     this.Bus0.Port_out(0)
    //     this.println(
    //         'Cycle ',
    //         this.cycle.toString(),
    //         ': The CPU is receiving an AccessAck message from the INTERCONNECT.',
    //     )
    //     console.log(
    //         'Cycle ',
    //         this.cycle.toString(),
    //         ': The CPU is receiving an AccessAck message from the INTERCONNECT.',
    //     )
    //     this.cycle += 1
    // }
    // public CPU_acces_keyboard ( CPU_message :string, physical_address  : string, CPU_data  :string, rd: string) {
    //     this.println(
    //         'Cycle ', 
    //         this.cycle.toString(), 
    //         ': The CPU is sending a GET message to KEYBOARD through the INTERCONNECT.'
    //     )
    //     console.log (
    //         'Cycle ', 
    //         this.cycle.toString(), 
    //         ': The CPU is sending a GET message to KEYBOARD through the INTERCONNECT.'
    //     )
    //     // PROCESSOT is sending GET
    //     this.Processor.master.send(
    //         CPU_message,
    //         physical_address,
    //         CPU_data,
    //     )
    //     this.Bus0.Port_in(this.Processor.master.ChannelA, 0)
    //     //INTERCONNCET RUN
        
    //     this.cycle += 1
    //     this.println(
    //         'Cycle ',
    //         this.cycle.toString(),
    //         ': The INTERCONNECT is forwarding the message to SUB-INTERCONNECT..',
    //     )
    //     console.log(
    //         'Cycle ',
    //         this.cycle.toString(),
    //         ': The INTERCONNECT is forwarding the message to SUB-INTERCONNECT.',
    //     )
    //     this.view?.interconnect.setIsRunning(this.Bus0.active)
    //     this.Bus0.Transmit() // INTERCONNECT IS TRANSMITTING

    //     //MEMORY RUN
    //     this.cycle += 1
    //     this.println(
    //         'Cycle ',
    //         this.cycle.toString(),
    //         ': SUB-INTERCONNECT is receiving message from INTERCONNECT.',
    //     )
    //     console.log(
    //         'Cycle ',
    //         this.cycle.toString(),
    //         ': SUB-INTERCONNECT is receiving message from INTERCONNECT.',
    //     )

    //     this.SubInterconncet (this.Bus0.Port_out(3))

    //     this.cycle += 1
    //     this.Bus1.Port_in(this.Keyboard.getData(), 1)
    //     this.println(
    //         'Cycle ',
    //         this.cycle.toString(),
    //         ': The KEYBOARD is sending an AccessAck message to the SUB-INTERCONNECT.',
    //     )
    //     console.log(
    //         'Cycle ',
    //         this.cycle.toString(),
    //         ': The KEYBOARD is sending an AccessAck message to the SUB-INTERCONNECT.',
    //     )

    //     this.cycle += 1
    //     this.Bus1.Transmit ()
    //     this.println(
    //         'Cycle ',
    //         this.cycle.toString(),
    //         ': The SUB-INTERCONNECT is forwarding the message to INTERCONNECT.',
    //     )
    //     console.log(
    //         'Cycle ',
    //         this.cycle.toString(),
    //         ': The SUB-INTERCONNECT is forwarding the message to INTERCONNECT.',
    //     )
        
    //     // MEMORY RESPONSE
    //     this.cycle += 1
    //     this.println(
    //         'Cycle ',
    //         this.cycle.toString(),
    //         ': MEMORY is sending ACCESS_ACK message to CPU',
    //     )
    //     console.log(
    //         'Cycle ',
    //         this.cycle.toString(),
    //         ': MEMORY is sending ACCESS_ACK message to CPU',
    //     )
    //     this.Bus0.Port_in(this.Bus1.Port_out(0), 2) //FIX ME

    //     this.cycle += 1
    //     this.println(
    //         'Cycle ',
    //         this.cycle.toString(),
    //         ': INTERCONNECT is sending message to CPU',
    //     )
    //     console.log(
    //         'Cycle ',
    //         this.cycle.toString(),
    //         ': INTERCONNECT is sending message to CPU',
    //     )
    //     this.Bus0.Transmit()

    //     this.cycle += 1
    //     const di2m = this.Bus0.Port_out(0).data
    //     if (di2m === 'undefined' || di2m === undefined) this.Processor.register[rd] = '0'.padStart(32, '0')
    //     if (di2m !== 'undefined' && di2m !== undefined) this.Processor.register[rd] = (di2m.slice(-34)).slice(0,32)
    //     this.println(
    //         'Cycle ',
    //         this.cycle.toString(),
    //         ': CPU is receiving ACCESS_ACK_DATA message from INTERCONNECT',
    //     )
    //     console.log(
    //         'Cycle ',
    //         this.cycle.toString(),
    //         ': CPU is receiving ACCESS_ACK_DATA message from INTERCONNECT',
    //     )
    //     this.cycle = this.cycle + 1
    // }
    // public setImem            () {
    //     let instruction = ''
    //     let pc_addr = 0
    //     while (instruction != '0'.padStart(32, '0')) {
    //         instruction =this.Processor_GETmesseage ('GET', '0'.padStart(17, '0'), '', '')
    //         this.Processor.Instruction_memory[pc_addr.toString(2)] = instruction
    //         pc_addr += 4
                
    //     }
    // }
}
