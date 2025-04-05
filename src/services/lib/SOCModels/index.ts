// import DMA from './DMA'
import Soc from './SOC/SoC'
import ChannelD from './Interconnect/ChannelD'
import ChannelA from "./Interconnect/ChannelA";
import DMA from './DMA/DMA';
// import { LayersTwoTone } from '@mui/icons-material';
// import { cyan } from '@mui/material/colors';
// import { Console } from 'console';

const SOC               = new Soc('super SoC')
<<<<<<< HEAD
const channelD          = new ChannalD( '001'                   ,                       //opcode
                                        '00'                    ,                       //param
                                        '10'                    ,                       //size
                                        '00'                    ,                       //source
                                        '0'.padStart(21, '0')   ,     //sink
                                        '0'                     ,                       //denied
                                        '1'.padStart(32, '1')   ,      //data
                                        '0'                         //corrupt
                                    );

SOC.Memory.Memory['11000000000000000'] = '1'.padStart(32, '1')
SOC.Memory.Memory['100'.padStart(17, '0')] = '0'.padStart(32, '01')
// SOC.DMA.active  = true
// SOC.Bus0.active = true
// SOC.Bus1.active = true
// SOC.Bus1.setaddress (0x2241f, 0x2240, 0x223ff )
// SOC.DMA.config (0x1fff + 1, 0x4, 4)
// SOC.DMA_Get ()
// console.log (SOC.DMA_put ())
// SOC.DMA.RECfromMemory (channelD)

// console.log (SOC.DMA.buffer)
// console.log (SOC.DMA.SENDtoLED())
// console.log (SOC.DMA.SENDtoLED())
const code              = 
`
.text 
addi x10, x0, 1
addi x17, x0, 11
ecall
`
// const code              = 
// `
// .text  
// lui  x2 , 0x00008  
// lui  x3 , 0x00009 
// lui  x4 , 0x0000A 
// lui  x5 , 0x0000B
// lui  x6 , 0x0000C 
// lui  x8 , 0x0001D 

// addi x1 , x0, 1
// sw   x1 , 0(x2)
// sw   x1 , 0(x3)
// sw   x1 , 0(x4)
// sw   x1 , 0(x5)
// sw   x1 , 0(x6)
// sw   x1 , 4(x7)
// sw   x1 , 4(x8)
// `
=======
const code              = 
`
.text
lui  x1, 0x3
ori  x1, x1, 0x04c

addi x2, x0, 1
//sw   x1, 16(x1)
//lw   x3, 16(x1)
sw   x2, 16(x1) // Led control register
sw   x2, 0(x1)  // DMA source register
sw   x2, 4(x1)  // DMA destination register
addi x2, x0, 1
sw   x2, 8(x1)  // DMA length register
sw   x2, 12(x1) // DMA control register

`
>>>>>>> 818de6461e4dae295b3a0990bdead82eb7480e6e

SOC.Processor.active    = true
SOC.MMU.active          = true
SOC.Bus0.active         = true
SOC.Bus1.active         = true
SOC.Memory.active       = true
<<<<<<< HEAD
SOC.DMA.active          = false
=======
>>>>>>> 818de6461e4dae295b3a0990bdead82eb7480e6e

SOC.assemble(
            code                                     // ,code               : string 
            ,3 * 4096                               // ,required_mem       : number
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
<<<<<<< HEAD
            ,0x1FFFF + 1                            // ,stap               : number
            ,0x1BFFF + 1                            // ,dmaSrc             : number
            ,16*32                                  // ,dmaLen             : number
            ,0x17FFF + 1                            // ,dmaDes             : number
) 
// SOC.Memory.Memory['11100000000000000'] = '1'.padStart(32, '1')
SOC.RunAll()
console.log(SOC.Processor.getRegisters())
// console.log(SOC.Memory.getPageNumber())
// console.log(SOC.Memory.Memory)
// console.log(SOC.Memory.Memory['01100000000000000'])
// console.log(SOC.Memory.Memory['01101000000000000'])
// console.log(SOC.Memory.Memory['01110000000000000'])
// console.log(SOC.Memory.Memory['01111000000000000'])
// console.log(SOC.Memory.Memory['11011000000000000'])
// console.log(SOC.DMA.buffer)
=======
            ,0x0003000                             // ,stap               : number
        )

SOC.RunAll()
>>>>>>> 818de6461e4dae295b3a0990bdead82eb7480e6e
