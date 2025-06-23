import Soc from './SOC/SoC'
import ChannelA from './Interconnect/ChannelA'
import ChannelD from './Interconnect/ChannelD'
import { FIFO_ChannelA } from './Interconnect/FIFO_ChannelA'
import { FIFO_ChannelD } from './Interconnect/FIFO_ChannelD'
const SOC               = new Soc()
// const code              = 
// let code              = 
// `
// .text 
// // Create page table base address
// lui t0, 0x3

// page_table_ins: 
// addi t1, zero, 0x0009 // PPN = 0x0000, execute = 1, valid = 1 s 
// sw t1, 0(t0)

// page_table_data: 
// lui t1, 0x8
// addi t1, t1, 0x3 // PPN = 0x0004, execute = 0, write= 0, read= 1, valid = 1 
// sw t1, 4(t0)


// main:

// addi t1, zero, 0x2
// slli t1, t1, 16		  # Create base address of memory-mapped registers

// dma:
// lui  t5, 0x10 		  # Create DMA ource register's value.
// addi t6, t1, 0x14     # Create DMA destination register's value.
// addi t0, zero, 32     # Create DMA length register's value.
// sw   t0, 16(t1)		  # Store to Led control register (non-zero = active).
// sw   t5, 0(t1)        # Store to DMA source register's value.
// sw   t6, 4(t1)        # Store to DMA destination register's value.
// sw   t0, 8(t1)        # Store to DMA length register value.
// sw   t0, 12(t1)       # Store to DMA control register (non-zero = active).

// lui t0, 0x80003  
// csrrw zero, satp, t0  
// lui t0, 0x1
// addi t3, zero, 4
// sw t3, 0(t0)
// addi a0, a0, 1
// lw t5, 0(t0)

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
// code              = 
// `
// .text
//     # Khởi t2 thành 0x5400 (lớn hơn 0x5000, nhỏ hơn 0x6000)
//     lui   t2, 0x5        # t2 ← 0x5_000

//     # 2) amoand.w: AND giữa [t2] và t1
//     lui   t1, 0xF0F1        # t0 ← 0xF0F1_000
//     addi  t1, t1, -241      # t0 ← t0 + (–241) = 0x0F0F0F0FF
//     amoand.w   t0, t2, t1    
// `
let code              = 
`
.text

lui  t5, 0x10   # Create base address will be written.     
addi t2, t5, 32 # The number of byte will be write LED.
addi t0, t0, 0xfff

write_memory:
sw   t0, 0(t5) # Write the value 0xffff_ffff to memory.   
addi t5, t5, 4  # Move to next the next address
bne  t5, t2, write_memory # Stop after writing 32 bytes.

addi t1, zero, 0x2
slli t1, t1, 16		  # Create base address of memory-mapped registers

dma:
lui  t5, 0x10 		  # Create DMA ource register's value.
addi t6, t1, 0x14     # Create DMA destination register's value.
addi t0, zero, 32     # Create DMA length register's value.
sw   t0, 16(t1)		  # Store to Led control register (non-zero = active).
sw   t5, 0(t1)        # Store to DMA source register's value.
sw   t6, 4(t1)        # Store to DMA destination register's value.
sw   t0, 8(t1)        # Store to DMA length register value.
sw   t0, 12(t1)       # Store to DMA control register (non-zero = active).


`
// SOC.assemble(
//             code                                                                   
//             ,[]                                                                                                         
// )
// // // SOC.StepIns()
// // // SOC.StepIns()
// // // SOC.StepIns()
// SOC.RunAll()
// // SOC.DMA.Controller()

// Unit test
// let adrr = ''.padStart(18, '0')
// let data = ''.padStart(32, '1')
// SOC.Led_matrix.writeData (adrr, data)
// console.log (SOC.Led_matrix)

// ######Kiểm tra Memory######
// let Int2Memory          = new FIFO_ChannelA ()
// let opcode_a   = '000'   
// let param_a    = '000'   
// let size_a     = '00'    
// let source_   = '00'
// let address_a  = '0'.padStart(17, '0') 
// let address_a  = '00100000000000010100'.padStart(17, '0') 
// let address_a  = '00000000000000000000'.padStart(17, '0')
// let mask_a     = '1111'     
// let data_a     = '1'.padStart(32, '0')    
// let corrupt_a  = '0' 

// let dataFromProcessor          = new ChannelA (opcode_a, param_a, size_a, source_, address_a, mask_a, data_a, corrupt_a, '1', '0')
// Int2Memory.enqueue(dataFromProcessor)
// SOC.Memory.Controller(SOC.cycle, Int2Memory, true)

// SOC.cycle.incr()
// dataFromProcessor.opcode = '100'
// dataFromProcessor.data = '10'.padStart(32, '0') 
// dataFromProcessor.address   = '000'.padStart(17, '0')
// Int2Memory.enqueue(dataFromProcessor)
// SOC.Memory.Controller(SOC.cycle, Int2Memory, true)

// SOC.cycle.incr()
// dataFromProcessor.opcode = '100'
// dataFromProcessor.data = '10'.padStart(32, '0') 
// dataFromProcessor.address   = '000'.padStart(17, '0')
// Int2Memory.enqueue(dataFromProcessor)
// SOC.Memory.Controller(SOC.cycle, Int2Memory, true)
// SOC.cycle.incr()
// dataFromProcessor.data = '11'.padStart(32, '0') 
// dataFromProcessor.address   = '1000'.padStart(17, '0')
// Int2Memory.enqueue(dataFromProcessor)
// SOC.Memory.Controller(SOC.cycle, Int2Memory, true)

// SOC.cycle.incr()
// dataFromProcessor.data = '100'.padStart(32, '0') 
// dataFromProcessor.address   = '1100'.padStart(17, '0')
// Int2Memory.enqueue(dataFromProcessor)
// SOC.Memory.Controller(SOC.cycle, Int2Memory, true)

// SOC.cycle.incr()
// dataFromProcessor.opcode = '100'
// dataFromProcessor.data = '000'.padStart(32, '0') 
// dataFromProcessor.address   = '0000'.padStart(17, '0')
// Int2Memory.enqueue(dataFromProcessor)
// SOC.Memory.Controller(SOC.cycle, Int2Memory, true)

// SOC.cycle.incr()
// Int2Memory.enqueue(dataFromProcessor)
// SOC.Memory.Controller(SOC.cycle, Int2Memory, true)

// // dataFromProcessor.address   = '0100'.padStart(17, '0')
// SOC.cycle.incr()
// Int2Memory.enqueue(dataFromProcessor)
// SOC.Memory.Controller(SOC.cycle, Int2Memory, true)

// SOC.cycle.incr()
// Int2Memory.enqueue(dataFromProcessor)
// SOC.Memory.Controller(SOC.cycle, Int2Memory, true)

// SOC.cycle.incr()
// Int2Memory.enqueue(dataFromProcessor)
// SOC.Memory.Controller(SOC.cycle, Int2Memory, true)
// SOC.cycle.incr()
// SOC.Memory.Controller(SOC.cycle, Int2Memory, true)
// dataFromProcessor          = new ChannelA ('100', param_a, size_a, source_, address_a, mask_a, data_a, corrupt_a, '1', '0')
// Int2Memory.enqueue(dataFromProcessor)
// SOC.Memory.Controller(SOC.cycle, Int2Memory, true)
// SOC.cycle.incr()
// SOC.Memory.Controller(SOC.cycle, Int2Memory, true)

// ******Kiểm tra MMU******
// SOC.Processor.MMU.satp = 0x80000000
// SOC.Processor.MMU.TLB   = [[0x2, 0x5000, 0, 1, 1, 0, 0]
//                             ,[0, 0, 0, 0, 0, 0, 0]
//                             ,[0, 0, 0, 0, 0, 0, 0]
//                             ,[0, 0, 0, 0, 0, 0, 0]
//                             ,[0, 0, 0, 0, 0, 0, 0]
//                             ,[0, 0, 0, 0, 0, 0, 0]
//                             ,[0, 0, 0, 0, 0, 0, 0]
//                             ,[0, 0, 0, 0, 0, 0, 0]
//                         ]
// let logic_address   = '0010000000000000'.padStart(32, '0') 
// SOC.Processor.MMU.run(logic_address, 'PUT')

// ******Kiểm tra TL_UL******
// let dataFromBridge          = new FIFO_ChannelA ()
// let dataFromDMA             = new ChannelD ('000', '000', '10', '01', '0', '0000', '0'.padStart(32, '0')  , '0', '0', '0')
// let dataFromLed             = new ChannelD ('000', '000', '10', '01', '0', '0000', '0'.padStart(32, '0')  , '0', '0', '0')
// let dataFromBridge_valid    = false
// let Led_ready               = false
// let Bridge_ready            = false
// let dataFromDMA_valid       = false
// let dataFromLed_valid       = false
// let opcode_a   = '100'   
// let param_a    = '000'   
// let size_a     = '00'    
// let source_   = '00'
// // let address_a  = '0'.padStart(17, '0') 
// // let address_a  = '00100000000000010100'.padStart(17, '0') 
// let address_a  = '00100000000000000000'.padStart(17, '0') 
// let mask_a     = '1111'     
// let data_a     = '0'.padStart(32, '0')    
// let corrupt_a  = '0' 
// let dataFromProcessor          = new ChannelA (opcode_a, param_a, size_a, source_, address_a, mask_a, data_a, corrupt_a, '1', '0')
// dataFromBridge.enqueue (dataFromProcessor)
// SOC.TL_UL.Controller(
//     dataFromBridge
//     , dataFromDMA
//     , dataFromLed
//     , dataFromBridge_valid
//     , Led_ready
//     , Bridge_ready
//     , dataFromDMA_valid
//     , dataFromLed_valid
//     , SOC.cycle
// )

// SOC.cycle.incr()
// // Led_ready               = true
// SOC.TL_UL.Controller(
//     dataFromBridge
//     , dataFromDMA
//     , dataFromLed
//     , dataFromBridge_valid
//     , Led_ready
//     , Bridge_ready
//     , dataFromDMA_valid
//     , dataFromLed_valid
//     , SOC.cycle
// )

// SOC.cycle.incr()
// // dataFromLed_valid       = true
// dataFromDMA             = new ChannelD ('000', '000', '10', '01', '0', '0000', '0'.padStart(32, '0')  , '0', '1', '0')
// SOC.TL_UL.Controller(
//     dataFromBridge
//     , dataFromDMA
//     , dataFromLed
//     , dataFromBridge_valid
//     , Led_ready
//     , Bridge_ready
//     , dataFromDMA_valid
//     , dataFromLed_valid
//     , SOC.cycle
// )

// SOC.cycle.incr()
// Bridge_ready       = true
// SOC.TL_UL.Controller(
//     dataFromBridge
//     , dataFromDMA
//     , dataFromLed
//     , dataFromBridge_valid
//     , Led_ready
//     , Bridge_ready
//     , dataFromDMA_valid
//     , dataFromLed_valid
//     , SOC.cycle
// )

// ******Kiểm tra Bridge******
// let opcode_a   = '100'   
// let param_a    = '000'   
// let size_a     = '00'    
// let source_   = '00'
// // let address_a  = '0'.padStart(17, '0') 
// let address_a  = '00100000000000010100'.padStart(17, '0') 
// let mask_a     = '1111'     
// let data_a     = '0'.padStart(32, '0')    
// let corrupt_a  = '0' 
// let dataFrInterconnect         = new FIFO_ChannelA ()
// let dataFrsubInterconnect      = new FIFO_ChannelD ()
// let dataFromLed                =  new ChannelD ('000', '000', '10', '01', '0', '0000', '0'.padStart(32, '0')  , '0', '0', '0')//ChannelD
// let dataFromProcessor          = new ChannelA (opcode_a, param_a, size_a, source_, address_a, mask_a, data_a, corrupt_a, '1', '0')

// dataFrInterconnect.enqueue (dataFromProcessor)
// SOC.Bridge.Controller (dataFrInterconnect, dataFrsubInterconnect, true, true, SOC.cycle)

// SOC.cycle.incr()
// dataFromLed                =  new ChannelD ('000', '000', '10', '01', '0', '0000', '0'.padStart(32, '0')  , '0', '1', '0')//ChannelD
// dataFrsubInterconnect.enqueue (dataFromLed)
// SOC.Bridge.Controller (dataFrInterconnect, dataFrsubInterconnect, true, true, SOC.cycle)

// SOC.cycle.incr()
// SOC.Bridge.Controller (dataFrInterconnect, dataFrsubInterconnect, true, true, SOC.cycle)

// SOC.cycle.incr()
// SOC.Bridge.Controller (dataFrInterconnect, dataFrsubInterconnect, true, true, SOC.cycle)

// ******Kiểm tra TL-UH******
// let        dataFromDMA                = new ChannelA (opcode_a, param_a, size_a, source_, address_a, mask_a, data_a, corrupt_a, '1', '0')
// let        dataFromMemory             = new ChannelD ('000', '000', '10', '01', '0', '0000', '0'.padStart(32, '0')  , '0', '1', '0')
// let        dataFromSub                = new ChannelD ('000', '000', '10', '01', '0', '0000', '0'.padStart(32, '0')  , '0', '1', '0')
// let        dataFromProcessor_valid    = true
// let        dataFromDMA_valid          = false
// let        dataFromMemory_valid       = false 
// let        dataFromSub_valid          = false
// let        Processor_ready            = false
// let        DMA_ready                  = true
// let        Memory_ready               = true
// let        Bridge_ready               = true
// SOC.TL_UH.Controller (
//                 dataFromProcessor
//                 ,dataFromDMA
//                 ,dataFromMemory
//                 ,dataFromSub
//                 //valid signal
//                 ,dataFromProcessor_valid
//                 ,dataFromDMA_valid
//                 ,dataFromMemory_valid
//                 ,dataFromSub_valid
//                 //ready signal
//                 ,Processor_ready
//                 ,DMA_ready
//                 ,Memory_ready
//                 ,Bridge_ready
//                 //cycle
//                 ,SOC.cycle
//             )
// SOC.cycle.incr()
// dataFromProcessor          = new ChannelA (opcode_a, param_a, size_a, source_, address_a, mask_a, data_a, corrupt_a, '0', '0')
// dataFromDMA                = new ChannelA (opcode_a, param_a, size_a, source_, address_a, mask_a, data_a, corrupt_a, '0', '0')
// dataFromSub_valid          = true 
// // dataFromMemory_valid       = true
// SOC.TL_UH.Controller (
//                 dataFromProcessor
//                 ,dataFromDMA
//                 ,dataFromMemory
//                 ,dataFromSub
//                 //valid signal
//                 ,dataFromProcessor_valid
//                 ,dataFromDMA_valid
//                 ,dataFromMemory_valid
//                 ,dataFromSub_valid
//                 //ready signal
//                 ,Processor_ready
//                 ,DMA_ready
//                 ,Memory_ready
//                 ,Bridge_ready
//                 //cycle
//                 ,SOC.cycle
//             )

// SOC.cycle.incr()
// SOC.TL_UH.Controller (
//                 dataFromProcessor
//                 ,dataFromDMA
//                 ,dataFromMemory
//                 ,dataFromSub
//                 //valid signal
//                 ,dataFromProcessor_valid
//                 ,dataFromDMA_valid
//                 ,dataFromMemory_valid
//                 ,dataFromSub_valid
//                 //ready signal
//                 ,Processor_ready
//                 ,DMA_ready
//                 ,Memory_ready
//                 ,Bridge_ready
//                 //cycle
//                 ,SOC.cycle
//             )
// Processor_ready            = true
// SOC.cycle.incr()
// SOC.TL_UH.Controller (
//                 dataFromProcessor
//                 ,dataFromDMA
//                 ,dataFromMemory
//                 ,dataFromSub
//                 //valid signal
//                 ,dataFromProcessor_valid
//                 ,dataFromDMA_valid
//                 ,dataFromMemory_valid
//                 ,dataFromSub_valid
//                 //ready signal
//                 ,Processor_ready
//                 ,DMA_ready
//                 ,Memory_ready
//                 ,Bridge_ready
//                 //cycle
//                 ,SOC.cycle
//             )
// // dataFromProcessor          = new ChannelA (opcode_a, param_a, size_a, source_, address_a, mask_a, data_a, corrupt_a, '0', '0')
// // dataFromDMA                = new ChannelA (opcode_a, param_a, size_a, source_, address_a, mask_a, data_a, corrupt_a, '0', '0')
// // SOC.cycle.incr()
// // SOC.TL_UH.Controller (
// //                 dataFromProcessor
// //                 ,dataFromDMA
// //                 ,dataFromMemory
// //                 ,dataFromSub
// //                 //valid signal
// //                 ,dataFromProcessor_valid
// //                 ,dataFromDMA_valid
// //                 ,dataFromMemory_valid
// //                 ,dataFromSub_valid
// //                 //ready signal
// //                 ,Processor_ready
// //                 ,DMA_ready
// //                 ,Memory_ready
// //                 ,Bridge_ready
// //                 //cycle
// //                 ,SOC.cycle
// //             )

// // SOC.TL_UH.Controller (
// //                 dataFromProcessor
// //                 ,dataFromDMA
// //                 ,dataFromMemory
// //                 ,dataFromSub
// //                 //valid signal
// //                 ,dataFromProcessor_valid
// //                 ,dataFromDMA_valid
// //                 ,dataFromMemory_valid
// //                 ,dataFromSub_valid
// //                 //ready signal
// //                 ,Processor_ready
// //                 ,DMA_ready
// //                 ,Memory_ready
// //                 ,Bridge_ready
// //                 //cycle
// //                 ,SOC.cycle
// //             )

// console.log (SOC.TL_UH)