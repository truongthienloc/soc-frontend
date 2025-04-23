import { Register } from "~/types/register"
import Soc from "../SOC/SoC"
import { TLBEntries } from "../Compile/soc.d"
import LedMatrix from '../../control/LedMatrix'
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

    //****************SYNC ACTIVED MODEL VS VIEW****************
    if (this.view) {
        this.Processor.active   = this.view.cpuModule.getActivated()
        this.MMU.active         = this.view.mmuModule.getActivated()
        this.Bus0.active        = this.view.interconnect.getActivated()
        this.Bus1.active        = this.view.interconnect.getActivated()
        this.Memory.active      = this.view.memoryModule.getActivated()
    }
    
    //****************CHECK SYNTAX ERROR****************
    this.Assembler.reset()
    this.Assembler.assemblerFromIns(code)                             
    
    //****************SET INITIAL STATUS****************
    // SET INITIAL DATA
    this.Processor.reset()
    this.Processor.pc = 0
    this.cycle.cycle  = 0
    this.Processor.MMU.satp     = 0 
    this.Led_matrix.reset ()
    this.DMA.reset()
    this.Memory.reset (Mem_tb)
    console.log ('Mem_tb', Mem_tb)
    this.Memory.SetInstructionMemory(this.Assembler.binary_code) 

    this.Processor.InsLength = this.Memory.Ins_pointer
    this.Processor.MMU.Set(
        [
             [0, 0, 0, 0, 0, 0, 0]
            ,[0, 0, 0, 0, 0, 0, 0]
            ,[0, 0, 0, 0, 0, 0, 0]
            ,[0, 0, 0, 0, 0, 0, 0]
            ,[0, 0, 0, 0, 0, 0, 0]
            ,[0, 0, 0, 0, 0, 0, 0]
            ,[0, 0, 0, 0, 0, 0, 0]
            ,[0, 0, 0, 0, 0, 0, 0]
        ]                  
        , 0              
        , this.Allocator.allocate(required_mem)                  
    )

    // console.log (this.Allocator.allocate(required_mem))
    // console.log (this.Processor.MMU.endAddress)

    for (let i of this.Assembler.Instructions)
        if (i != '.text' && i != '') this.Assembly_code.push(i)
    //SET INITIAL ANIMATION'STATUS
    
    // this.logger?.clear()
    // this.view?.cpu.setIsRunning(false)
    // this.view?.mmu.setIsRunning(false)
    // this.view?.memory.setIsRunning(false)
    // this.view?.dma.setIsRunning(false)
    // this.view?.interconnect.setIsRunning(false)
    // this.view?.ledMatrix.setIsRunning(false)
    // NOTIFY SYSTEM'S STATUS IS READY OR NOT
    if (this.Assembler.syntax_error) {
        this.println('SYNTAX ERROR!!!')
        console.log('SYNTAX ERROR!!!')
    } else {
        this.println('SYSTEM IS READY TO RUN')
        console.log('SYSTEM IS READY TO RUN')
    }

    this.Processor.keyBoard_waiting = false
    console.log (this.Processor.pc, this.cycle.cycle, this.MMU.satp)
    this.println('Cycle ', this.cycle.toString(), ': System is setting up')
    console.log('Cycle ', this.cycle.toString(), ': System is setting up')

    return !this.Assembler.syntax_error
}