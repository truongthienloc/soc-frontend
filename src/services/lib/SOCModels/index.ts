import Soc from './SoC'
const SOC = new Soc('super SoC')
SOC.Processor.active = true
SOC.MMU.active= true
SOC.Bus.active= true
SOC.Memory.active= true
//SOC.Assembler.assemblerFromIns('.text\nlui x1, 0xff\naddi x3, x0, 32\naddi x1, x0, 0xfff\nloop:\nbeq x2, x3, end\nsw x1, 0(x2)\naddi x2, x0, 4\njal x0, loop\nend:')
//console.log(SOC.Assembler.handlerString('.text\nbeq x2, x3, end\nend:\n'))
//console.log(SOC.Assembler.binary_code)
//SOC.assemble('.text\nlui x1, 0xff\n')
//SOC.assemble('.text\nbeq x2, x3, end\nsw x1, 0(x2)\n')
//SOC.assemble(".text\naddi x1, x2, 1\nloop:addi x1, x2, 1\n \n\n")
//SOC.assemble('.text\nlui x1, 0xff\naddi x3, x0, 32\naddi x1, x1, 0xfff\nloop:\nbeq x2, x3, end\nsw x1, 0(x2)\naddi x2, x2, 4\njal x0, loop\nend:')
//SOC.assemble(".text\naddi x1, x2, 1\nloop:addi x1, x2, 1\n \n\n")
//SOC.RunAll()

// console.log(SOC.Processor.Instruction_memory)
//'.text\nlui x1, 0xff\naddi x1, x0, 0xfff\nsw x1, 4(x0)\n'
//console.log(SOC.Led_matrix)
// lui x1, 0xff
// addi x3, x0, 32
// addi x1, x0, 0xfff
// loop:
// beq x2, x3, end
// sw x1, 0(x2)
// addi x2, x0, 4
// jal x0, loop
// end:

console.log(SOC.Processor.register)
console.log(SOC.Memory.Memory)
// .text
// addi x1, x0, 1
// addi x2, x0, 2
// addi x3, x0, 3
// addi x4, x0, 4
// addi x5, x0, 5
// addi x6, x0, 6
// sw	x6, 4(x0)
// lw  x7, 4(x0)
// sw	x1, 400(x0)
// sw	x2, 400(x0)
// sw	x3, 400(x0)
// sw	x4, 400(x0)
// sw	x5, 400(x0)
// sw	x7, 400(x0)