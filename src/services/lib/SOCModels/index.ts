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
SOC.assemble(data, 1*4, 2*4, 4*4, 6*4, 256)
SOC.RunAll()
//console.log(SOC.Processor.getRegisters())
console.log(SOC.Memory.GetMemory())
