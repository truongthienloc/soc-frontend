// import DMA from './DMA'
import Soc from './SOC/SoC'
import ChannelD from './Interconnect/ChannelD'
import ChannelA from "./Interconnect/ChannelA";
import DMA from './DMA/DMA';
// import { LayersTwoTone } from '@mui/icons-material';
// import { cyan } from '@mui/material/colors';
// import { Console } from 'console';

const SOC               = new Soc('super SoC')
const code              = 
`
.text
addi a7, x0, 1
addi a0, x0, 22
ecall
`

SOC.Processor.active    = true
SOC.MMU.active          = true
SOC.Bus0.active          = true
SOC.Bus1.active          = true
SOC.Memory.active       = true

// SOC.DMA.active          = true

SOC.assemble(
            code                                     // ,code               : string 
            ,3 * 4096                               // ,required_mem       : number
            ,[]                                      // ,Mem_tb             : Register[]
            ,[
                 //[0, (0x07FFF + 1 ) + 4096*0, 1, 0]
                 [8, 49152, 1, 6 ]
                ,[0, (0x07FFF + 1 ) + 4096*1, 1, 1]
                ,[0, (0x07FFF + 1 ) + 4096*2, 1, 1]
                ,[0, (0x07FFF + 1 ) + 4096*3, 1, 1]
                ,[0, (0x07FFF + 1 ) + 4096*4, 1, 1]
                ,[0, (0x07FFF + 1 ) + 4096*5, 1, 1]
                ,[0, (0x07FFF + 1 ) + 4096*6, 1, 1]
                ,[0, (0x07FFF + 1 ) + 4096*7, 1, 1]
            ]                                       // ,TLB                : TLBEntries[]
            ,0x1FFFF + 1                            // ,stap               : number
            ,0x1BFFF + 1                            // ,dmaSrc             : number
            ,16*32                                  // ,dmaLen             : number
            ,0x17FFF + 1                            // ,dmaDes             : number
)
// console.log(SOC.Processor.active_println)
SOC.RunAll()
// console.log(SOC.Bridge.Bridge_slave.ChannelA)
// SOC.Step()
// SOC.Step()
// SOC.Step()
// SOC.Step()
// SOC.Step()
// SOC.Step()
// SOC.Step()
// console.log(SOC.Bus0.Timming)
// console.log(SOC.Bus0.Pin[0].peek())
// SOC.Step()
// console.log(SOC.Bus0.Pout[2].peek())
console.log(SOC.Processor.getRegisters())
// SOC.Step()
// SOC.Step()
// SOC.Step()