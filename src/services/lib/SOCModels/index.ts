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
//lui x1,0x1c
//lui x5,0xfff
//ori x5, x5, 0xfff
//addi x2, x0, 288

//mmio:
//addi x3, x3, 1
//sw x3, 0(x1)
//addi x1, x1, 4
//bne x2, x3, mmio

//addi x1, x0, 0x2
//slli x1, x1, 16
//lui x31,0x1c

//addi x2, x0, 1
//sw   x2, 16(x1)  // Led control register
//sw   x31, 0(x1)  // DMA source register
//sw   x31, 4(x1)  // DMA destination register

lw   x2, 8(x1)   // DMA length register

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
                 [8, 49152, 0, 6 ]
                ,[0, (131072 ) + 4096*1, 0, 1]
                ,[0, (131072 ) + 4096*2, 0, 1]
                ,[0, (131072 ) + 4096*3, 0, 1]
                ,[0, (131072 ) + 4096*4, 0, 1]
                ,[0, (131072 ) + 4096*5, 0, 1]
                ,[0, (131072 ) + 4096*6, 0, 1]
                ,[0, (131072 ) + 4096*7, 0, 1]
            ]                                       // ,TLB                : TLBEntries[]
            ,0x0003000                             // ,stap               : number
        )
// console.log (SOC.Processor.InsLength)
// console.log (SOC.Processor.pc)



SOC.RunAll()
