// import DMA from './DMA'
import Soc from './SoC'
import ChannelD from './ChannelD'
import ChannelA from "./ChannelA";
import DMA from './DMA';
import { LayersTwoTone } from '@mui/icons-material';
import { cyan } from '@mui/material/colors';
import { Console } from 'console';

const SOC               = new Soc('super SoC')
const code              = 
`
.text

#The program finds the value of fibonacci 

Fibo:
		addi    x21 , x0 , 6 // 0 
		addi    x24 , x0 , 1 // 4
		addi    x26 , x0 , 1 // 8
		addi    x12 , x0 , 3 //12
		beq     x21 , x0 , Result0 // 16
		beq     x21 , x26 , Result1 //20
Loop: 
		blt     x21 , x12 , Result // 24	
		add     x1 , x24 , x26 // 28
		addi    x24 , x26 , 0 //32
		addi    x26 , x1 , 0 //36
		addi    x12 , x12 , 1 //40
		jal     x0 , Loop //44
Result0:
		addi    x1 , x0 , 0 //48
		addi    x18 , x0 , 0 //52
		bne     x1 , x18 , Fail // 56
Result1:
		addi    x1 , x0 , 1 // 60 
		addi    x5 , x0 , 1 // 64
		bne     x1 , x5 , Fail // 68
Result:
		addi    x10 , x0 , 8 // 72
		bne     x1 , x10 , Result1 // 76 

Pass: 
		addi    x1 , x0 , 084 //80
		jal     x0 , End // 	
Fail: 
		addi    x1 , x0 , 070 // 88 
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