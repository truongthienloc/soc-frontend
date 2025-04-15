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
    this.println('Cycle ', this.cycle.toString(), ': System is setting up')
    console.log('Cycle ', this.cycle.toString(), ': System is setting up')
    // this.Memory.reset (Mem_tb)

    // const setting_code = `
    //     .text
    //     lui x1, 0x1
    //     addi x1, x1, 0x3

    //     lui  x2, 0x3
    //     addi x3, x2, 0x60

    //     page_table:
    //     addi x31, x31, 1
    //     sw x1, 0(x2)
    //     addi x2, x2, 4
    //     addi x1, x1, 0x400
    //     bne x2, x3, page_table

    //     end:

    //     `

    // this.Assembler.reset()
    // this.Processor.MMU.satp = 0x00003000
    // this.Assembler.assemblerFromIns(setting_code)

    // this.Memory.reset (Mem_tb)
    // this.Memory.Ins_pointer = 0
    // this.Processor.reset()
    // this.Processor.pc = 0
    

    // this.Memory.SetInstructionMemory(this.Assembler.binary_code)
    // this.Memory.GetInstructionMemory()
    
    // this.Processor.InsLength = this.Memory.Ins_pointer
    
    // this.Processor.pc = this.Memory.Ins_pointer
   
    // this.self_config()

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
    this.cycle.cycle = 0
    this.Led_matrix.reset ()
    this.DMA.reset()
    this.Memory.reset (Mem_tb)
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

    this.Processor.keyBoard_waiting = false
    // this.MMU.satp = 0x80000000 

    return !this.Assembler.syntax_error
}