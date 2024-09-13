import Soc from './SoC'
import *as path from 'path'
import *as fs from 'fs'
// const fp                = path.join(__dirname, '/testing/input/Code_editor.txt')
// const data              = fs.readFileSync(fp, "utf-8")
const SOC               = new Soc('super SoC')
SOC.Processor.active    = true
SOC.MMU.active          = true
SOC.Bus.active          = true
SOC.Memory.active       = true
SOC.Memory.reset(
    0 * 4,                       //   LM point
    1 * 4,                      //  I/O point
    (0 + 4) * 4,               // I-Mem point
    (0 + 1 + 4) *4,           // D-Mem point  
    ((0 + 1 + 4 + 4) + 4)*4, //Stack point
    []
)
const addnData= SOC.Memory.setMemoryFromString(`0x12: 121ff 123 

12123
11111 123123

0x36: 0x123 123123`)

console.log(addnData)
console.log(SOC.Memory.Memory)
// SOC.assemble(data, 
//     0 * 4, //   LM point
//     96 * 4, //  I/O point
//     (96 + 16) * 4, // I-Mem point
//     (96 + 16 + 1024) *4, // D-Mem point  
//     ((96 + 16 + 1024) + 256 + 256 + 256 + 256 + 256 + 256 + 256)*4, //Stack point
//     []
// )
// SOC.RunAll()
//console.log(SOC.Processor.getRegisters())
// console.log(SOC.Memory.GetMemory())
