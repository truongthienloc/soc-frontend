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
// lui t0, 0x3

// // Generate instruction page table
// page_table_ins:
// addi t1, zero, 0x0009       // first page table for instructions with PPN = 0x0000, executable = 1, valid = 1
// sw   t1, 0(t0)

// page_table_peri:
// lui  t1, 0x7
// addi t1, t1, 0x7
// sw   t1, 112(t0)

// lui t0, 0x80003     
// csrrw zero, satp, t0 

// lui t1, 0x1c
// lui t2, 0xfff
// ori t2, t2, 0xfff
// addi t0, zero, 288

// mmio:
// addi t4, t4, 1
// sw   t4, 0(t1)
// addi t1, t1, 4
// bne  t0, t4, mmio

// // Create base memory map address register: 0x20000 
// addi t1, zero, 0x2
// slli t1, t1, 16

// csrrw zero, satp, zero

// // Config for led-matrix's control registers.
// led:
// addi t0, zero, 1
// sw   t0, 16(t1)      // Led control register at address: 0x20010.

// // Config for led-matrix's operation registers.
// dma:
// lui  t5, 0x1c         // Create DMA source register's value.
// sw   t5, 0(t1)        // DMA source register 
// addi t6, t1, 0x14     // Create DMA destination register's value.
// sw   t6, 4(t1)        // DMA destination register.
// addi t0, zero, 0x480  // Create DMA length register value.
// sw   t0, 8(t1)        // DMA length register.
// sw   t0, 12(t1)       // DMA control register (non-zero = active).

// `
const code              = 
`
.text
// Create page table base address
lui t0, 0x3

// Generate instruction page table
page_table_ins:
addi t1, zero, 0x0009       // first page table for instructions with PPN = 0x0000, executable = 1, valid = 1
sw   t1, 0(t0)

page_table_peri:
lui  t1, 0x7
addi t1, t1, 0x7
sw   t1, 112(t0)

lui t0, 0x80003     
csrrw zero, satp, t0 

lui t1, 0x1c
lui t2, 0xfff
ori t2, t2, 0xfff
addi t0, zero, 288

mmio:
addi t4, t4, 1
sw   t4, 0(t1)
addi t1, t1, 4
bne  t0, t4, mmio

// Create base memory map address register: 0x20000 
addi t1, zero, 0x2
slli t1, t1, 16

csrrw zero, satp, zero

// Config for led-matrix's control registers.
led:
addi t0, zero, 1
sw   t0, 16(t1)      // Led control register at address: 0x20010.

// Config for led-matrix's operation registers.
dma:
lui  t5, 0x1c         // Create DMA source register's value.
sw   t5, 0(t1)        // DMA source register 
addi t6, zero, 0x140  // Create DMA destination register's value.
sw   t6, 4(t1)        // DMA destination register.
addi t0, zero, 0x480  // Create DMA length register value.
sw   t0, 8(t1)        // DMA length register.
sw   t0, 12(t1)       // DMA control register (non-zero = active).

addi t1, zero, 0x2
slli t1, t1, 16
addi t0, zero, 200
addi t2, zero, 1 
addi t4, zero, 0
mmio_:
addi t4, t4, 1
sw   t4, 20(t1)
addi t1, t1, 4
bne  t0, t4, mmio_

`
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

// const code              = 
// `
// .text
// // Create page table base address
// addi x1, x0, 0x2
// slli x1, x1, 16

// //csrrw x0, satp, x0
// //Config for led-matrix's control registers.
// led:
// addi x2, x0, 1
// sw   x2, 16(x1) // Led control register at address: 0x20010.
// lui  x31, 0x1c
// //Config for led-matrix's operation registers.
// dma:
// lui  x31, 0x1c      // Create DMA source register's value.
// sw   x31, 0(x1)     // DMA source register 
// addi x30, x1, 0x14  // Create DMA destination register's value.
// sw   x30, 4(x1)     // DMA destination register.
// addi x2 , x0, 0x480  // Create DMA length register value.
// sw   x2 , 8(x1)     // DMA length register.
// sw   x2 , 12(x1)    // DMA control register (non-zero = active).
// `

// const code              = 
// `
// .text
// _start:
//     jalr  ra, t0, 8       

// check0:
//     addi   a0, a0, 1

// check1:
//     addi   a0, a0, 2
// `
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
const text =
`.text

lui t0, 0x3 // Create page table base address
page_table_allocate:
addi t1, zero, 0x0009    // first page table for instructions with PPN = 0x0000, executable = 1, valid = 1
sw   t1, 0(t0)
lui  t1, 0x7
addi t1, t1, 0x7	// first page table for data with PPN = 0x0000, executable = 1, valid = 1
sw   t1, 112(t0)

main:
lui   s0, 0x80003      // active MMU
csrrw zero, satp, s0
lui   t1, 0x1c		//create base address to write memory
addi  t0, zero, 288

write_to_memory:
	addi t4, t4, 1
	sw   t4, 0(t1)
	addi t1, t1, 4
	bne  t0, t4, write_to_memory

addi t1, zero, 0x2	// create base address to config led
slli t1, t1, 16
addi t0, zero, 1
csrrw zero, satp, zero	//disactive MMU

config_led:
	sw   t0, 16(t1)     
	addi t1, zero, 0x2 //active led

csrrw zero, satp, s0 // active MMU
slli t1, t1, 16
addi t0, zero, 200
addi t2, zero, 1 
addi t4, zero, 0

write_to_led:	
	addi t4, t4, 1
	sw   t4, 20(t1)
	addi t1, t1, 4
	bne  t0, t4, write_to_led

csrrw zero, satp, zero
addi t1, zero, 0x2
slli t1, t1, 16

dma:
	lui  t5, 0x1c         // Create DMA source register's value.
	sw   t5, 0(t1)        // DMA source register 
	addi t6, zero, 0x140  // Create DMA destination register's value.
	sw   t6, 4(t1)        // DMA destination register.
	addi t0, zero, 0x480  // Create DMA length register value.
	sw   t0, 8(t1)        // DMA length register.
	sw   t0, 12(t1)       // DMA control register (non-zero = active).
`