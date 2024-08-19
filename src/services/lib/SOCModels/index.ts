import Soc from './SoC'
import *as path from 'path'
import *as fs from 'fs'
const fp                = path.join(__dirname, '/testing/input/Code_editor.txt')
const data              = fs.readFileSync(fp, "utf-8")
const SOC               = new Soc('super SoC')
SOC.Processor.active    = true
SOC.MMU.active          = true
SOC.Bus.active          = true
SOC.Memory.active       = true
SOC.assemble(data, 
    0 * 4, //   LM point
    96 * 4, //  I/O point
    (96 + 16) * 4, // I-Mem point
    (96 + 16 + 1024) *4, // D-Mem point  
    ((96 + 16 + 1024) + 256 + 256 + 256 + 256 + 256 + 256 + 256)*4 //Stack point
)
SOC.RunAll()
//console.log(SOC.Processor.getRegisters())
console.log(SOC.Memory.GetMemory())
