// import DMA from './DMA'
import Soc from './SOC/SoC'
// import ChannelD from './Interconnect/ChannelD'
// import ChannelA from "./Interconnect/ChannelA";
// import DMA from './DMA/DMA';
// import { LayersTwoTone } from '@mui/icons-material';
// import { cyan } from '@mui/material/colors';
// import { Console } from 'console';

const SOC               = new Soc('super SoC')
// const code              = 
// `
// .text
// // Create page table base address
// lui x2, 0x3

// // Generate instruction page table
// page_table_ins:
// addi x1, x0, 0x0009 // firsrt page table for instructions with PPN = 0x0000, executable = 1, valid = 1
// sw   x1, 0(x2)
// addi x1, x1, 0x0400 // second page table for instructions with PPN = 0x0001, executable = 1, valid = 1
// sw   x1, 4(x2)
// addi x1, x1, 0x0400 // third page table for instructions with PPN = 0x0002, executable = 1, valid = 1
// sw   x1, 8(x2)

// lui  x1, 0x1        // create pattern for first page table entry for data with PPN = 0x0004 
// addi x1, x1, 0x7    // readable = 1, wirteable = 1, valid = 1

// addi x2, x2, 12   // re-Create page table base address
// addi x3, x2, 0x60   // Number of all PTE bytes
// page_table_data:
// sw 	x1, 0(x2)       // store PTE  
// addi x2, x2, 4      // move to next PTE
// addi x1, x1, 0x400  // updates next PTE value
// bne x2, x3, page_table_data

// // upadte satp, active MMUMMU
// lui x2, 0x80003     
// csrrw x0, x2, satp 

// start:
// addi x31, x0, 1
// lui x1, 0x8
// sw x31, 0(x1)
// `
// const code              = 
// `
// .text
// // Create page table base address
// lui x2, 0x3

// // Generate instruction page table
// page_table_ins:
// addi x1, x0, 0x0009 // firsrt page table for instructions with PPN = 0x0000, executable = 1, valid = 1
// sw   x1, 0(x2)

// page_table_peri:
// lui  x1, 0x7
// addi x1, x1, 0x7
// sw   x1, 112(x2)

// lui x2, 0x80003     
// csrrw x0, satp, x2 

// lui x1,0x1c
// lui x5,0xfff
// ori x5, x5, 0xfff
// addi x2, x0, 288

// mmio:
// addi x3, x3, 1
// sw x3, 0(x1)
// addi x1, x1, 4
// bne x2, x3, mmio

// Create base memory map address registerss: 0x20000 
// addi x1, x0, 0x2
// slli x1, x1, 16

// csrrw x0, satp, x0
// //Config for led-matrix's control registers.
// led:
// addi x2, x0, 1
// sw   x2, 16(x1) // Led control register at address: 0x20010.

// //Config for led-matrix's operation registers.
// dma:
// lui  x31, 0x1c      // Create DMA source register's value.
// sw   x31, 0(x1)     // DMA source register 
// addi x30, x1, 0x14  // Create DMA destination register's value.
// sw   x30, 4(x1)     // DMA destination register.
// addi x2 , x0, 0x480 // Create DMA length register value.
// sw   x2 , 8(x1)     // DMA length register.
// sw   x2 , 12(x1)    // DMA control register (non-zero = active).
// `

// const code              = 
// `
// .text
// lui x2, 0x3
// csrrw x0, x2, satp 
// addi x3, x2, 0x10

// lui x1, 0x1
// addi x1, x1, 0x7

// page_table_0:
// addi x31, x31, 1
// sw 	x1, 0(x2)
// addi x2, x2, 4
// addi x1, x1, 0x400
// bne x2, x3, page_table_0

// csrrw x2, x2, satp 
// addi x2, x2, 0x14
// addi x3, x2, 0x10
// page_table_1:
// addi x31, x31, 1
// sw 	x1, 0(x2)
// addi x2, x2, 4
// addi x1, x1, 0x400
// bne x2, x3, page_table_1
// `

// const code              = 
// `
// .text
// // Create page table base address
// lui x2, 0x3

// // Generate instruction page table
// page_table_ins:
// addi x1, x0, 0x0009 // firsrt page table for instructions with PPN = 0x0000, executable = 1, valid = 1
// sw   x1, 0(x2)

// page_table_peri:
// lui  x1, 0x7
// addi x1, x1, 0x6
// sw   x1, 112(x2)

// lui x2, 0x80003     
// csrrw x0, satp, x2 

// lui x1,0x1c
// sw x3, 0(x1)
// `

const code              = 
`
.text
// Create page table base address
addi x1, x0, 0x2
slli x1, x1, 16

//csrrw x0, satp, x0
//Config for led-matrix's control registers.
led:
addi x2, x0, 1
sw   x2, 16(x1) // Led control register at address: 0x20010.
lui  x31, 0x1c
//Config for led-matrix's operation registers.
dma:
lui  x31, 0x1c      // Create DMA source register's value.
sw   x31, 0(x1)     // DMA source register 
addi x30, x1, 0x14  // Create DMA destination register's value.
sw   x30, 4(x1)     // DMA destination register.
addi x2 , x0, 0x480  // Create DMA length register value.
sw   x2 , 8(x1)     // DMA length register.
sw   x2 , 12(x1)    // DMA control register (non-zero = active).
`
SOC.Processor.active    = true
SOC.MMU.active          = true
SOC.Bus0.active         = true
SOC.Bus1.active         = true
SOC.Memory.active       = true

SOC.assemble(
            code                                     // ,code               : string 
            ,32 * 4096                               // ,required_mem       : number
            ,[]                                      // ,Mem_tb             : Register[]
            ,[
                [0, 0, 0, 0]
                ,[0, 0, 0, 0]
                ,[0, 0, 0, 0]
                ,[0, 0, 0, 0]
                ,[0, 0, 0, 0]
                ,[0, 0, 0, 0]
                ,[0, 0, 0, 0]
                ,[0, 0, 0, 0]
            ]                                       // ,TLB                : TLBEntries[]
            ,0x0003000                             // ,stap               : number
        )
// console.log (SOC.Processor.InsLength)
// console.log (SOC.Processor.pc)



SOC.RunAll()
