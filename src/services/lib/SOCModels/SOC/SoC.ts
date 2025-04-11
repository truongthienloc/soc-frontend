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
    keyboard?: Keyboard
    monitor?: Monitor
    view?: NCKHBoard

    public setLogger(logger: Logger) {
        this.logger = logger
        this.Processor.setLogger     (logger)
        this.Memory.setLogger        (logger)
        this.Bus0.setLogger          (logger)
        this.Bus1.setLogger          (logger)
        this.Led_matrix.setLogger    (logger)
        this.Processor.MMU.setLogger (logger)
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

    public println(...args: string[]) {
        if (!this.logger) {
            return
        }
        this.logger.println(...args)
    }

    constructor(name: string) {
        this.Processor      = new RiscVProcessor('RiscV CPU', '00', false)
        this.Bus0           = new InterConnect(false)
        this.Bus1           = new sub_InterConnect(false)    
        this.MMU            = new MMU(false)
        this.Memory         = new Memory(false)
        this.DMA            = new DMA()
        this.Led_matrix     = new LEDMatrix ()
        this.Bridge         = new Bridge()

        this.Assembler      = new Assembler()
        this.Assembly_code  = []
        this.Allocator      = new BuddyAllocator (0x0BFFF, 0X0C000)
        this.MMU_endAddr    = 0
        this.Disassembly    = new disAssembly ('')
        this.cycle          = new Cycle (0)

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
            , this.Bus1.Pout[0]
            , this.Bus0.state == 0
            , this.Bus1.state == 0
            , this.cycle
        )
        
        this.Bus1.Run (
            this.Bridge.Bridge_master.ChannelA
            , this.DMA.DMA_Slave.ChannelD
            , this.Led_matrix.Matrix_Slave.ChannelD
            , this.Bridge.Bridge_master.ChannelA.valid == '1'
            , this.Bridge.state == 0
            , this.DMA.DMA_Slave.ChannelD.valid == '1'
            , this.Led_matrix.Matrix_Slave.ChannelD.valid == '1'
            , this.cycle
        )

        this.Led_matrix.Run(
            this.Bus1.Pout[2].dequeue()
            , this.cycle
            , this.Bus1.state == 0
        )
        
        this.cycle.incr()
    }

    public self_config () {
        let bre = 0
        while (
            this.Processor.pc <
            this.Memory.Ins_pointer || this.Processor.state != 0
        ) {
            // if (bre > 7) break
            // bre ++ 
            this.Processor.active_println = true
            this.Bus0.active_println      = true
            this.Memory.active_println    = true

            this.Processor.Run(
                false
                , this.cycle
                , this.Bus0.Pout[0].dequeue()
                , this.Bus0.state == 0
            )

            this.Memory.Run(
                this.cycle
                , this.Bus0.Pout[2].dequeue()
                , this.Bus0.state == 0
            )

            this.Bus0.Run (
                this.Processor.FIFO.dequeue()
                ,this.DMA.burst
                ,this.Memory.burst
                ,this.Bridge.Bridge_slave.ChannelD
                ,this.Processor.master.ChannelA.valid == '1'
                ,this.DMA.DMA_Master.ChannelA.valid == '1'
                ,this.Memory.slaveMemory.ChannelD.valid == '1'
                ,this.Bridge.Bridge_slave.ChannelD.valid == '1'
                ,this.cycle
            )
            this.cycle.incr()
        }
        // console.log('bre', bre)
        // console.log (this.Processor.getRegisters())
        this.Processor.active_println = true
        this.Bus0.active_println      = true
        this.Memory.active_println    = true
    }
}