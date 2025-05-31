import Soc from './SOC/SoC'

const SOC               = new Soc()
// const code              = 
const code              = 
`
.text

lui  t5, 0x1c        
addi t2, zero, 8
addi t1, zero, 0x2
slli t1, t1, 16

led:
addi t0, t0, 1
sw   t0, 0(t5)     
addi t5, t5, 4
bne  t0, t2, led

lui  t5, 0x1c  

dma:
addi t6, t1, 0x14   
sw   t5, 0(t1)        // DMA destination register.
sw   t6, 4(t1)        // DMA source register
addi t0, zero, 32     // Create DMA length register value.
sw   t0, 8(t1)        // DMA length register.
sw   t0, 12(t1)       // DMA control register (non-zero = active).
`
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
// const code = `
// .text
//     # Khởi t2 thành 0x5400 (lớn hơn 0x5000, nhỏ hơn 0x6000)
//     lui   t2, 0x5        # t2 ← 0x5_000

//     # 1) amoswap.w: swap giữa [t2] và t1
//     lui   t1, 0x22222    # t1 ← 0x22222_000
//     addi  t1, t1, 0x222  # t1 ← 0x22222222
//     amoswap.w  t0, t2, t1

//     # 2) amoand.w: AND giữa [t2] và t1
//     lui   t1, 0xF0F1        # t0 ← 0xF0F1_000
//     addi  t1, t1, -241      # t0 ← t0 + (–241) = 0x0F0F0F0FF
//     amoand.w   t0, t2, t1
    
//     # 3) amoxor.w: XOR giữa [t2] và t1
//     lui   t1, 0x55555    # t1 ← 0x55555_000
//     addi  t1, t1, 0x555  # t1 ← 0x55555555
//     amoxor.w   t0, t2, t1
    
//     # 4) amoor.w: OR giữa [t2] và t1
//     lui   t1, 0x12345    # t1 ← 0x12345_000
//     addi  t1, t1, 0x678  # t1 ← 0x12345678
//     amoor.w    t0, t2, t1
    
//     # 5) amomin.w: min signed giữa [t2] và 10
//     addi  t1, x0, 10
//     amomin.w   t0, t1, (t2)
// `
0x0020000
// const code = `
// .text

//     addi t1, zero, 1
//     lui t0, 0x20
//     addi t0, t0, 0x14

//     sw t1, 0(t0)
//     lw t3, 0(t0)
// `
SOC.Processor.active    = true
SOC.TL_UH.active         = true
SOC.TL_UL.active         = true
SOC.Memory.active       = true
SOC.assemble(
            code                                                                   
            ,[]                                                                                                         
)

SOC.RunAll()
