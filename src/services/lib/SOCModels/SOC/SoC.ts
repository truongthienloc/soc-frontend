import RiscVProcessor from '../Processor/RiscV_processor'
import InterConnect from '../Interconnect/Interconnect'
import disAssembly from '../Compile/Disassembly'
import MMU from '../Processor/MMU'
import Memory from '../Memory/Memory'
import { Keyboard, Logger, Monitor } from '../Compile/soc.d'
import { NCKHBoard } from '../../soc/boards'
import DMA from '../DMA/DMA'
import Assembler from '../Compile/check_syntax'
import { Register } from '~/types/register'
import EventEmitter from '../../EventEmitter/EventEmitter'
import { assemble } from '../SOC/SOC.assemble'

import { RunAll } from '../SOC/SOC.runAll'
import sub_InterConnect from '../Interconnect/sub_Interconnect'
import Bridge from "./../Interconnect/Bridge"
import LEDMatrix from '../DMA/Led_matrix'
import Cycle from '../Compile/cycle'

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
        ,break_point        : number[]

        ) {
        return assemble.bind(this) (
            code                             
            ,break_point                                       
        )
    }

    public RunAll() {
        return RunAll.bind(this)()
    }

    public async stepWithEvent() {
        await this.Step()
        this.event.emit(Soc.SOCEVENT.STEP_END)
    }


    public async Step() {

        if (this.cycle.cycle % 1 == 0) {
            await this.Processor.Run(
                false
                , this.cycle
                , this.Bus0.Pout[0].dequeue()
                , this.Bus0.ready
            )

            this.Bus0.Run (
                this.Processor.FIFO.dequeue()
                ,this.DMA.DMA_Master.ChannelA
                ,this.Memory.slaveMemory.ChannelD
                ,this.Bridge.Bridge_slave.ChannelD
                //valid signal
                ,this.Processor.master.ChannelA.valid       == '1'
                ,this.DMA.DMA_Master.ChannelA.valid         == '1'
                ,this.Memory.slaveMemory.ChannelD.valid     == '1'
                ,this.Bridge.Bridge_slave.ChannelD.valid    == '1'
                //ready signal
                ,this.Processor.master.ChannelD.ready       == '1'
                ,this.DMA.DMA_Master.ChannelD.ready         == '1'
                ,this.Memory.slaveMemory.ChannelA.ready     == '1'
                ,this.Bridge.Bridge_master.ChannelA.ready   == '1'
                //cycle
                ,this.cycle
            )

            this.Memory.Run(
                this.cycle
                , this.Bus0.Pout[2]
                , this.Bus0.ready
            )

            this.Bridge.Run (
                this.Bus0.Pout[3]
                , this.Bus1.Pout[0]
                , this.Bus0.ready
                , this.Bus1.ready
                , this.cycle
            )
        }

        if (this.cycle.cycle % 1 == 0) {

            this.DMA.Controller (
                this.Bus1.Pout[1]
                ,this.Bus0.Pout[1]
                , this.cycle
                , this.Bus0.ready
                , this.Bus1.ready && this.cycle.cycle % 1 == 0
            )
        }

        if (this.cycle.cycle % 1 == 0) {
            this.Bus1.Run (
                this.Bridge.fifo_to_subInterconnect
                , this.DMA.DMA_Slave.ChannelD
                , this.Led_matrix.Matrix_Slave.ChannelD
                , this.Bridge.Bridge_master.ChannelA.valid      == '1'
                , this.Led_matrix.ready
                , this.Bridge.Bridge_master.ChannelA.ready      == '1'
                , this.DMA.DMA_Slave.ChannelD.valid             == '1'
                , this.Led_matrix.Matrix_Slave.ChannelD.valid   == '1'
                , this.cycle
            )

            this.Led_matrix.Run(
                this.Bus1.Pout[2].dequeue()
                , this.cycle
                , this.Bus1.ready && this.cycle.cycle % 1 == 0
            )
        }
        
        this.cycle.incr()

    }
}