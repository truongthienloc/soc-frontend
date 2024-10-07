import Soc from './SoC'
import *as path from 'path'
import *as fs from 'fs'
// const fp                = path.join(__dirname, '/testing/input/Code_editor.txt')
// const data              = fs.readFileSync(fp, "utf-8")
// const code              = ".text\n addi x1, x0, 2047\n lw x1,1024(x0)\n"
const code              = ".text\n addi x1, x0, 2047\n slli x1, x1, 2\n addi x2, x0, 1\n sw x2, 0(x1)\n lw x3, 0(x1)"
const SOC               = new Soc('super SoC')
SOC.Processor.active    = true
SOC.MMU.active          = true
SOC.Bus.active          = true
SOC.Memory.active       = true
SOC.DMA.active          = true
// SOC.MMU.SetTLB([0, (0*4095) + (96 + 16 + 1024) *4, 1, 1],
//                [1, (1*4095) + (96 + 16 + 1024) *4, 1, 2],
//                [2, (2*4095) + (96 + 16 + 1024) *4, 1, 3],
//                [3, (3*4095) + (96 + 16 + 1024) *4, 1, 4],
//                [4, (4*4095) + (96 + 16 + 1024) *4, 1, 5],
//                [5, (5*4095) + (96 + 16 + 1024) *4, 1, 6],
//                [6, (6*4095) + (96 + 16 + 1024) *4, 1, 7],
//                [244 , (244*4095) + (96 + 16 + 1024) *4, 1, 8],
// )
SOC.assemble(
   code, 
   0 * 4, //   LM point
   96 * 4, //  I/O point
   (96 + 16) * 4, // I-Mem point
   (96 + 16 + 1024) *4, // D-Mem point  
   0xffffff,
   //4095*0xffffff, //Stack point
   [],
   {p0: [0, (0*4095) + (96 + 16 + 1024) *4, 1, 0],
    p1: [1, (1*4095) + (96 + 16 + 1024) *4, 1, 1],
    p2: [2, (2*4095) + (96 + 16 + 1024) *4, 1, 1],
    p3: [3, (3*4095) + (96 + 16 + 1024) *4, 1, 1],
    p4: [4, (4*4095) + (96 + 16 + 1024) *4, 1, 1],
    p5: [5, (5*4095) + (96 + 16 + 1024) *4, 1, 1],
    p6: [6, (6*4095) + (96 + 16 + 1024) *4, 1, 1],
    p7: [244 , (244*4095) + (96 + 16 + 1024) *4, 1, 1]},
)
SOC.RunAll()
console.log(SOC.Processor.getRegisters())
console.log(SOC.MMU.TLB)