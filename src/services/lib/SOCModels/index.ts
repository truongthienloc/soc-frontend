import Soc from './SoC'
import *as path from 'path'
import *as fs from 'fs'
// const fp                = path.join(__dirname, '/testing/input/Code_editor.txt')
// const data              = fs.readFileSync(fp, "utf-8")
// const code              = ".text\n addi x1, x0, 2047\n lw x1,1024(x0)\n"
// const code              = ".text\n addi x1, x0, 2048\n slli x1, x1, 2\n addi x2, x0, 1\n sw x2, 0(x1)\n lw x3, 0(x1)"
const code              = ".text\n addi x1, x0, 19\n addi x1, x1, 1\naddi x2, x0, 1\n sw x2, 0(x1)\n lw x3, 0(x1)"
const SOC               = new Soc('super SoC')
SOC.Processor.active    = true
SOC.MMU.active          = true
SOC.Bus.active          = true
SOC.Memory.active       = true
SOC.DMA.active          = true
const binaryCode = `
00000000011000000000110110010011
00010000000000000000001000010011
00000000000000000000010100110011
00000010000000000000100110010011
00000000001001010001000100010011
00000001001100010000010010110011
00000010010001001010111100000011
00000001111000100000001000110011
00000000000101010000010100010011
11111111101101010001011011100011
00010000000000000000110010010011
00000000010011001001011001100011
00000101010000000000000010010011
00000000100000000000000001101111
00000100011000000000000010010011
00000000000000000000000001101111
00101001101000000000000010010011
00000010000100000010000000100011
`;

SOC.Disassembly.setBinaryCode(binaryCode);
console.log(SOC.Disassembly.process());

// SOC.DMA.config(0, (96 * 3 + 16)*4)
// //console.log(SOC.DMA.ScanData())
// // SOC.MMU.SetTLB([0, (0*4095) + (96 + 16 + 1024) *4, 1, 1],
// //                [1, (1*4095) + (96 + 16 + 1024) *4, 1, 2],
// //                [2, (2*4095) + (96 + 16 + 1024) *4, 1, 3],
// //                [3, (3*4095) + (96 + 16 + 1024) *4, 1, 4],
// //                [4, (4*4095) + (96 + 16 + 1024) *4, 1, 5],
// //                [5, (5*4095) + (96 + 16 + 1024) *4, 1, 6],
// //                [6, (6*4095) + (96 + 16 + 1024) *4, 1, 7],
// //                [244 , (244*4095) + (96 + 16 + 1024) *4, 1, 8],
// // )
// SOC.assemble(
//     code, 
//     0 * 4, //   LM point
//     96 * 3 * 4, //  I/O point //0x480
//    (96 * 3 + 16) * 4, // I-Mem point // 4C0
//    (96 * 3+ 16 + 1024) *4, // D-Mem point  // 14C0
//    (96 * 3 + 16 + 1024 + 1024*16) *4, //Stack point // 114c0
//    //4095*0xffffff, //Stack point
//    [],
//     [
//     [0, (0*1023) + (96 + 16 + 1024) *4, 1, 0], // 11c0
//     [1, (1*1023) + (96 + 16 + 1024) *4, 1, 1], // 
//     [2, (2*1023) + (96 + 16 + 1024) *4, 1, 1], // 19be
//     [3, (3*1023) + (96 + 16 + 1024) *4, 1, 1], // 
//     [4, (4*1023) + (96 + 16 + 1024) *4, 1, 1],
//     [5, (5*1023) + (96 + 16 + 1024) *4, 1, 1],
//     [6, (6*1023) + (96 + 16 + 1024) *4, 1, 1],
//     [7, (7*1023) + (96 + 16 + 1024) *4, 1, 1],
// ]   ,
//     70208,
// )
// SOC.RunAll()
// //console.log(SOC.Memory.getLedMatrix())

// console.log(SOC.Led_matrix)

// console.log(SOC.Processor.getRegisters())
// // console.log(SOC.MMU.TLB)
// SOC.Memory.getPageNumber()