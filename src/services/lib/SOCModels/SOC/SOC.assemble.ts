import { Register } from "~/types/register"
import Soc from "../SOC/SoC"
import { CommentBankSharp, ConstructionOutlined, Monitor } from "@mui/icons-material"


export function assemble(
                this                : Soc
                ,code               : string 
                ,break_point        : number[]
    ) {

    //****************CHECK SYNTAX ERROR****************
    this.Assembler.reset()
    this.Assembler.run(code, break_point)        
    
    //****************SET INITIAL STATUS****************
    // SET INITIAL DATA
    this.Processor.reset()
    this.Processor.pc           = 0
    this.cycle.cycle            = 0
    this.Processor.MMU.satp     = 0 
    this.Led_matrix.reset ()
    this.DMA.reset()
    this.Memory.reset ()
    this.Memory.SetInstructionMemory(this.Assembler.binary_code)
    this.Memory.SetDataMemory(this.Assembler.data)
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
    console.log('Cycle', this.cycle.toString(), ': System is setting up')

    return !this.Assembler.syntax_error
}