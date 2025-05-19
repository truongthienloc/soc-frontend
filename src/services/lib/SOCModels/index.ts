import Soc from './SOC/SoC'

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
// const code              = 
// `
// .text
// addi t0, zero, 0xfff
// lui t1, 0x3
// example_amo:
//     //amoswap.w t3, t1, t0
//     //amoand.w  t4, t1, t0
//     //amoor.w   t5, t1, t0
//     //amoxor.w  t6, t1, t0
//     //amomin.w  t6, t1, t0
//     //amomaxu.w  t6, t1, t1
//     amoadd.w    t6, t1, t0
// `

// const code              = 
// `
// .text
// addi x1, x0, 0xfff
// lui x2, 0x3
// sb x1, 0(x2)
// lb x3, 0(x2)
// `
// const code = `
// .data
//     .word 0xf, 2, 3, 4
//     .half 1, 2, 3, 4
//     .byte 1, 2, 3, 4
//     .asciz "hello world"
//     .ascii "UIT"
// .text
// addi x1, x0, 0xfff
// lui t0, 0x10010
// sb x1, 0(t0)
// lw x3, 0(t0)
// `
const code = `
.text
    # Khởi t2 thành 0x5400 (lớn hơn 0x5000, nhỏ hơn 0x6000)
    lui   t2, 0x5        # t2 ← 0x5_000

    # 1) amoswap.w: swap giữa [t2] và t1
    lui   t1, 0x22222    # t1 ← 0x22222_000
    addi  t1, t1, 0x222  # t1 ← 0x22222222
    amoswap.w  t0, t2, t1

    # 2) amoand.w: AND giữa [t2] và t1
    lui   t1, 0xF0F1        # t0 ← 0xF0F1_000
    addi  t1, t1, -241      # t0 ← t0 + (–241) = 0x0F0F0F0FF
    amoand.w   t0, t2, t1
    
    # 3) amoxor.w: XOR giữa [t2] và t1
    lui   t1, 0x55555    # t1 ← 0x55555_000
    addi  t1, t1, 0x555  # t1 ← 0x55555555
    amoxor.w   t0, t2, t1
    
    # 4) amoor.w: OR giữa [t2] và t1
    lui   t1, 0x12345    # t1 ← 0x12345_000
    addi  t1, t1, 0x678  # t1 ← 0x12345678
    amoor.w    t0, t2, t1
    
    # 5) amomin.w: min signed giữa [t2] và 10
    addi  t1, x0, 10
    amomin.w   t0, t1, (t2)
`
SOC.Processor.active    = true
SOC.MMU.active          = true
SOC.Bus0.active         = true
SOC.Bus1.active         = true
SOC.Memory.active       = true
SOC.assemble(
            code                                                                   
            ,[]                                                                                                         
)

SOC.RunAll()
