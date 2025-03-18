// import DMA from './DMA'
import Soc from './SoC'
import ChannelD from './ChannelD'
import ChannelA from "./ChannelA";
import DMA from './DMA';
// import { LayersTwoTone } from '@mui/icons-material';
// import { cyan } from '@mui/material/colors';
// import { Console } from 'console';

const SOC               = new Soc('super SoC')
const code              = 
`
.text

#The program checks the ALU instruction in I_type

Main:
		addi    x15 , x0 , -2048 
		addi    x21 , x0 , 62 
		sltu    x29 , x15 , x21 
		bltu    x15 , x21 , Less_i 
		bgeu    x15 , x21 , Bigger_i 
Less_i:
		ori     x30 , x15 , 67 
		sub     x5 , x21 , x15 
		srai    x5 , x5 , 3 
		and     x5 , x5 , x0 
		addi    x19 , x0 , 0 
		beq     x5 , x19 , Pass 
Bigger_i:
		ori     x30 , x15 , 175 
		sub     x5 , x21 , x15 
		srai    x5 , x5 , 4 
		and     x5 , x5 , x0 
		addi    x19 , x0 , 0 
		beq     x5 , x19 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
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
                ,[0, (0x07FFF + 1 ) + 4096*2, 1, 0]
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
console.log(SOC.Processor.active_println)
SOC.RunAll()
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