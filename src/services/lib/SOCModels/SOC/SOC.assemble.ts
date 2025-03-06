import { Register } from "~/types/register"
import Soc from "../SoC"
import { TLBEntries } from "../soc.d"
import BuddyAllocator from "../BuddyAllocator"
import { ConstructionOutlined, Monitor } from "@mui/icons-material"


export function assemble(
                this                : Soc
                ,code               : string 
                ,required_mem       : number
                ,Mem_tb             : Register[]
                ,TLB                : TLBEntries[]
                ,stap               : number
                ,dmaSrc             : number
                ,dmaLen             : number
                ,dmaDes             : number
    ) {
    this.println('Cycle ', this.cycle.toString(), ': System is setting up')
    console.log('Cycle ', this.cycle.toString(), ': System is setting up')
    
    //****************SYNC ACTIVED MODEL VS VIEW****************
    if (this.view) {
        this.Processor.active   = this.view.cpuModule.getActivated()
        this.MMU.active         = this.view.mmuModule.getActivated()
        this.Bus0.active        = this.view.interconnect.getActivated()
        this.Bus1.active        = this.view.interconnect.getActivated()
        this.DMA.active         = this.view.dmaModule.getActivated()
        this.Memory.active      = this.view.memoryModule.getActivated()
        this.active_keyboard    = this.view.keyboardModule.getActivated()
        this.active_monitor     = this.view.monitorModule.getActivated()
        
    }
    
    //****************CHECK SYNTAX ERROR****************
    this.Assembler.syntax_error = false
    this.Assembly_code = []
    this.Assembler.assemblerFromIns(code)                             
    
    //****************SET INITIAL STATUS****************
    // SET INITIAL DATA

    // const endaddr = this.Allocator.allocate(required_mem)
    this.Processor.reset()
    this.Processor.setImem(this.Assembler.binary_code)                 // LOAD INTUCTIONS INTO PROCESSOR
    this.Memory.reset (Mem_tb, 0x07FFF, 0x1BFFF, 0x1FFFF)
    this.Memory.SetInstuctionMemory(this.Processor.Instruction_memory) // LOAD INTUCTIONS INTO MAIN MEMORY
    this.Memory.setPageNumber()
    this.DMA.config(dmaDes, dmaSrc, dmaLen)
    this.MMU.Set(
        TLB                 // P: [number, number, number, number][]
        , stap              // , pointer       : number
        , this.Allocator.allocate(required_mem)           // , end_addr      : number
        , 0x07FFF + 1  // , start_addr    : number
        , 0x1BFFF        // , 0x1BFFF    : number
        , 0x07FFF      // , 0x07FFF  : number
        , 0x1FFFF          // , 0x1FFFF      : number
    )
    this.Bus0.setaddress (0x07FFF , 0x1BFFF)
    for (let i of this.Assembler.Instructions)
        if (i != '.text' && i != '') this.Assembly_code.push(i)
    //SET INITIAL ANIMATION'STATUS
    
    this.logger?.clear()
    // this.monitor?.clear()
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

    // console.log("MMU: ", this.MMU);
    return !this.Assembler.syntax_error
}