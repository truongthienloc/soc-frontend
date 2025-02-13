import Soc from './SoC'
import *as path from 'path'
import *as fs from 'fs'

const code              = 
`
.text 
lw   x3, 0(x4)
`
const SOC               = new Soc('super SoC')
SOC.Processor.active    = true
SOC.MMU.active          = true
SOC.Bus.active          = true
SOC.Memory.active       = true
SOC.DMA.active          = true

SOC.assemble(
    code, 
    0 * 4, //   LM point
    96 * 3 * 4, //  I/O point //0x480
   (96 * 3 + 16) * 4, // I-Mem point // 4C0
   (96 * 3+ 16 + 1024) *4, // D-Mem point  // 14C0
   (96 * 3 + 16 + 1024 + 1024*16) *4, //Stack point 
   [],
    [
    [0, (0*1023) + (96 + 16 + 1024) *4, 1, 0], // 11c0
    [1, (1*1023) + (96 + 16 + 1024) *4, 1, 1], // 
    [2, (2*1023) + (96 + 16 + 1024) *4, 1, 1], // 19be
    [3, (3*1023) + (96 + 16 + 1024) *4, 1, 1], // 
    [4, (4*1023) + (96 + 16 + 1024) *4, 1, 1],
    [5, (5*1023) + (96 + 16 + 1024) *4, 1, 1],
    [6, (6*1023) + (96 + 16 + 1024) *4, 1, 1],
    [7, (7*1023) + (96 + 16 + 1024) *4, 1, 1],
]   ,
    70208,
    0,
    16,
    1
)
// SOC.DMA.active = true
// SOC.DMA.masterDMA.active = true
// SOC.DMA.config(0, 0, 16, 16)
// SOC.DMA_operate()
// SOC.DMA.Send2Memory()
// SOC.DMA.ReceivefMemory(SOC.Memory.slaveMemory.send('AccessAckData','1'.padStart(32, '1')))
// SOC.DMA.Send2Peri()

// SOC.DMA.Send2Memory()
// SOC.DMA.ReceivefMemory(SOC.Memory.slaveMemory.send('AccessAckData','1'.padStart(32, '1')))
// const sendperi = SOC.DMA.Send2Peri()
// console.log()

// //console.log(code)
SOC.RunAll()
// //SOC.DMA_operate()
console.log(SOC.DMA.Databuffer)
console.log(SOC.Memory.Memory['00000000000000000000000000001000'])

// const sourcePUT = sendperi.slice(8, 10);

// // Extract address (bits 17-48, indices 16-47)
// const addressPUT = sendperi.slice(10, 42);

// // Extract data (bits 49 onwards, index 48 to end)
// const dataPUT = sendperi.slice(45);
// console.log(sourcePUT, addressPUT, dataPUT)
// console.log(SOC.DMA.ScanData())
// console.log(SOC.Processor.lineColor)

// //console.log(SOC.Memory.getLedMatrix())
// console.log(SOC.Memory.IO_point)
// console.log(SOC.Memory.getIO())
// console.log(SOC.Led_matrix)

// console.log(SOC.Processor.getRegisters())
// // console.log(SOC.MMU.TLB)
// SOC.Memory.getPageNumber()