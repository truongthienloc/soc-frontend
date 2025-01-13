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
import { assemble } from './SOC/SOC.assemble'
import { IO_operate } from './SOC/SOC.ioOperate'
import { DMA_operate } from './SOC/SOC.dmaOperate'
import { RunAll } from './SOC/SOC.runAll'
import { Step } from './SOC/SOC.step'

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
        this.Bus = new InterConnect(false)
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

    public assemble(code: string, 
                    LM_point: number, IO_point: number, Imem_point: number, 
                    Dmem_point: number, Stack_point: number , 
                    Mem_tb: Register[], TLB: TLBEntries[], TLB_pointer: number,
                    dmaSrc: number, dmaLen: number, dmaDes: number
                ) {
        return assemble.bind(this)(code, LM_point, IO_point, Imem_point, Dmem_point, Stack_point, Mem_tb, TLB, TLB_pointer, dmaSrc, dmaLen, dmaDes)
    }

    public IO_operate () {
        return IO_operate.bind(this)()
    }
    
    public DMA_operate () {
        return DMA_operate.bind(this)()
    }

    public RunAll() {
        return RunAll.bind(this)()
    }

    public async stepWithEvent() {
        await this.Step()
        this.event.emit(Soc.SOCEVENT.STEP_END)
    }

    public async Step() {
        return Step.bind(this)()
    }
}


