import Disassembly from '../Compile/Disassembly'
import { Keyboard, Logger, Monitor } from '../Compile/soc.d'
import { NCKHBoard } from '../../soc/boards'
import Assembler from '../Compile/check_syntax'
import EventEmitter from '../../EventEmitter/EventEmitter'
import { assemble } from '../SOC/SOC.assemble'
import { RunAll } from '../SOC/SOC.runAll'
import { StepIns } from '../SOC/SOC.StepIns'


import RiscVProcessor from '../Processor/RiscV_processor'
import Memory from '../Memory/Memory'
import DMA from '../DMA/DMA'
import TL_UH from '../Interconnect/Interconnect'
import TL_UL from '../Interconnect/sub_Interconnect'
import Bridge from "./../Interconnect/Bridge"
import LEDMatrix from '../DMA/Led_matrix'
import Cycle from '../Compile/cycle'
import { Imprima } from 'next/font/google'

export default class Soc {
    name        : string
    Processor   : RiscVProcessor
    TL_UH       : TL_UH
    TL_UL       : TL_UL
    Memory      : Memory
    DMA         : DMA
    Bridge      : Bridge
    Led_matrix  : LEDMatrix

    Assembler   : Assembler
    Disassembly : Disassembly
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
        this.TL_UH.setLogger          (logger)
        this.TL_UL.setLogger          (logger)
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

    constructor() {
        this.Processor      = new RiscVProcessor('RiscV CPU', '00', false)
        this.TL_UH          = new TL_UH(false)
        this.TL_UL          = new TL_UL(false)    
        this.Memory         = new Memory(false)
        this.DMA            = new DMA()
        this.Led_matrix     = new LEDMatrix ()
        this.Bridge         = new Bridge()

        this.Assembler      = new Assembler()
        this.Assembly_code  = []
        this.MMU_endAddr    = 0
        this.Disassembly    = new Disassembly ('')
        this.cycle          = new Cycle (0)

        this.name = 'SOC'
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

    public async stepInsWithEvent() {
        await this.StepIns()
        this.event.emit(Soc.SOCEVENT.STEP_END)
    }


    public async Step() {

        if (this.cycle.cycle % 1 == 0) {
            await this.Processor.Controller(
                this.cycle
                , this.TL_UH.port_out[0].dequeue()
                , this.TL_UH.ready
            )

            this.TL_UH.Controller (
                this.Processor.FIFO.dequeue()
                ,this.DMA.master_interface.ChannelA
                ,this.Memory.slave_interface.ChannelD
                ,this.Bridge.slave_interface.ChannelD
                //valid signal
                ,this.Processor.master_interface.ChannelA.valid   == '1'
                ,this.DMA.master_interface.ChannelA.valid         == '1'
                ,this.Memory.slave_interface.ChannelD.valid       == '1'
                ,this.Bridge.slave_interface.ChannelD.valid       == '1'
                //ready signal
                ,this.Processor.master_interface.ChannelD.ready   == '1'
                ,this.DMA.master_interface.ChannelD.ready         == '1'
                ,this.Memory.slave_interface.ChannelA.ready       == '1'
                ,this.Bridge.master_interface.ChannelA.ready      == '1'
                //cycle
                ,this.cycle
            )

            this.Memory.Controller(
                this.cycle
                , this.TL_UH.port_out[2]
                , this.TL_UH.ready
            )

            this.Bridge.Controller (
                this.TL_UH.port_out[3]
                , this.TL_UL.port_out[0]
                , this.TL_UH.ready
                , this.TL_UL.ready
                , this.cycle
            )
        }

        if (this.cycle.cycle % 2 == 0) {

            this.DMA.Controller (
                this.TL_UL.port_out[1]
                ,this.TL_UH.port_out[1]
                , this.cycle
                , this.TL_UH.ready
                , this.TL_UL.ready && this.cycle.cycle % 8 == 0
            )
        }

        if (this.cycle.cycle % 8 == 0) {
            this.TL_UL.Controller (
                this.Bridge.fifo_to_subInterconnect
                , this.DMA.slave_interface.ChannelD
                , this.Led_matrix.slave_interface.ChannelD
                , this.Bridge.master_interface.ChannelA.valid      == '1'
                , this.Led_matrix.ready
                , this.Bridge.master_interface.ChannelA.ready      == '1'
                , this.DMA.slave_interface.ChannelD.valid             == '1'
                , this.Led_matrix.slave_interface.ChannelD.valid   == '1'
                , this.cycle
            )

            this.Led_matrix.Controller(
                this.TL_UL.port_out[2].dequeue()
                , this.cycle
                , this.TL_UL.ready && this.cycle.cycle % 8 == 0
            )
        }
        
        this.cycle.incr()

    }

    public StepIns() {
        return StepIns.bind(this)()
    }
}