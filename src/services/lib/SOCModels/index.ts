// import DMA from './DMA'
import Soc from './SOC/SoC'
// import ChannelD from './Interconnect/ChannelD'
// import ChannelA from "./Interconnect/ChannelA";
// import DMA from './DMA/DMA';
// import { LayersTwoTone } from '@mui/icons-material';
// import { cyan } from '@mui/material/colors';
// import { Console } from 'console';

const SOC               = new Soc('super SoC')
const code              = 
`
.text
addi x1, x0, 0x2
slli x1, x1, 16
lui x31,0x1c
addi x30, x1, 20

led:
addi x2, x0, 1
sw   x2, 16(x1) // Led control register
dma:
sw   x31, 0(x1)  // DMA source register
sw   x30, 4(x1)  // DMA destination register
addi x2, x0, 0x480
sw   x2, 8(x1)  // DMA length register
sw   x2, 12(x1) // DMA control register
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
