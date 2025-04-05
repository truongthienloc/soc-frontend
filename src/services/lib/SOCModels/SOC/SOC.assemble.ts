import { Register } from "~/types/register"
import Soc from "../SOC/SoC"
import { TLBEntries } from "../Compile/soc.d"
import BuddyAllocator from "../Memory/BuddyAllocator"
import { ConstructionOutlined, Monitor } from "@mui/icons-material"


export function assemble(
                this                : Soc
                ,code               : string 
                ,required_mem       : number
                ,Mem_tb             : Register[]
                ,TLB                : TLBEntries[]
                ,stap               : number
    ) {
    this.println('Cycle ', this.cycle.toString(), ': System is setting up')
    console.log('Cycle ', this.cycle.toString(), ': System is setting up')
    
    //****************SYNC ACTIVED MODEL VS VIEW****************
    if (this.view) {
        this.Processor.active   = this.view.cpuModule.getActivated()
        this.MMU.active         = this.view.mmuModule.getActivated()
        this.Bus0.active        = this.view.interconnect.getActivated()
        this.Bus1.active        = this.view.interconnect.getActivated()
        // this.DMA.active         = this.view.dmaModule.getActivated()
        this.Memory.active      = this.view.memoryModule.getActivated()
    }
    
    //****************CHECK SYNTAX ERROR****************
    this.Assembler.syntax_error = false
    this.Assembly_code = []
    this.Assembler.assemblerFromIns(code)                             
    
    //****************SET INITIAL STATUS****************
    // SET INITIAL DATA
    this.Processor.reset()
    this.cycle.cycle = 0

    this.Memory.reset (Mem_tb)
    this.Memory.SetInstructionMemory(this.Assembler.binary_code) 
    this.Memory.setPageNumber()

    this.Processor.InsLength = this.Memory.Ins_pointer

    this.Processor.MMU.Set(
        TLB                 
        , stap              
        , this.Allocator.allocate(required_mem)                  
    )

    // console.log (this.Allocator.allocate(required_mem))
    // console.log (this.Processor.MMU.endAddress)

    for (let i of this.Assembler.Instructions)
        if (i != '.text' && i != '') this.Assembly_code.push(i)
    //SET INITIAL ANIMATION'STATUS
    
    this.logger?.clear()
    this.view?.cpu.setIsRunning(false)
    this.view?.mmu.setIsRunning(false)
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