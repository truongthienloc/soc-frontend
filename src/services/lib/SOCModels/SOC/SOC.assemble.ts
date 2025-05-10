import { Register } from "~/types/register"
import Soc from "../SOC/SoC"
import { TLBEntries } from "../Compile/soc.d"
import LedMatrix from '../../control/LedMatrix'
import BuddyAllocator from "../Memory/BuddyAllocator"
import { CommentBankSharp, ConstructionOutlined, Monitor } from "@mui/icons-material"


export function assemble(
                this                : Soc
                ,code               : string 
                ,required_mem       : number
                ,Mem_tb             : Register[]
                ,break_point        : number[]
    ) {
        console.log('break_point', break_point)
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
    this.Assembler.assemblerFromIns(code, break_point.sort()[0])        
    
    //****************SET INITIAL STATUS****************
    // SET INITIAL DATA
    this.Processor.reset()
    this.Processor.pc = 0
    this.cycle.cycle  = 0
    this.Processor.MMU.satp     = 0 
    this.Led_matrix.reset ()
    this.DMA.reset()
    this.Memory.reset (Mem_tb)
    this.Memory.SetInstructionMemory(this.Assembler.binary_code) 

    if (break_point.length != 0) 
        this.Processor.InsLength = (this.Assembler.break_point + 1) * 4
    else
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


    for (let i of this.Assembler.Instructions)
        if (i != '.text' && i != '') this.Assembly_code.push(i)
    if (this.Assembler.syntax_error) {
        this.println('SYNTAX ERROR!!!')
        console.log('SYNTAX ERROR!!!')
    } else {
        this.println('SYSTEM IS READY TO RUN')
        console.log('SYSTEM IS READY TO RUN')
    }

    this.Processor.keyBoard_waiting = false
    this.println('Cycle ', this.cycle.toString(), ': System is setting up')
    console.log('Cycle ', this.cycle.toString(), ': System is setting up')

    return !this.Assembler.syntax_error
}