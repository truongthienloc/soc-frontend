import { Register } from "~/types/register"
import Soc from "../SoC"
import { TLBEntries } from "../soc.d"

export function assemble(this: Soc, code: string, 
                LM_point: number, IO_point: number, Imem_point: number, 
                Dmem_point: number, Stack_point: number , 
                Mem_tb: Register[], TLB: TLBEntries[], TLB_pointer: number,
                dmaSrc: number, dmaLen: number
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
    this.DMA.config(dmaSrc, dmaLen)
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