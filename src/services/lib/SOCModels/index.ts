// import DMA from './DMA'
import Soc from './SoC'
import ChannelD from './ChannelD'
import ChannelA from "./ChannelA";
import DMA from './DMA';
import { LayersTwoTone } from '@mui/icons-material';
import { cyan } from '@mui/material/colors';
import { Console } from 'console';

// let sub2DMA  = new ChannelA (  
//                               '000'                 // opcode 
//                             , '000'                 // param
//                             , '10'                  // size
//                             , '00'                  // source
//                             , '0011000001001100'.padStart(17, '0') // address
//                             , '0000'                // mask
//                             , '1'.padStart(32, '0') // data
//                             , '0'                   // corrupt
//                             , '1'
//                             , '0'
//                         ) 
// let Memory2DMA = new ChannelD (  '000'                 // opcode
//                                 , '00'                  // param
//                                 , '10'                  // size
//                                 , '00'                  // source
//                                 , '0'                   // sink
//                                 , '0'                   // denied
//                                 , '1'.padStart(32, '0') // data
//                                 , '0'                   // corrupt
//                                 , '1'
//                                 , '0'
//                           )
                        
// const dma = new DMA ()
// dma.run (sub2DMA, '', '')
// console.log (dma.sourceAddress, dma.sourceAddress.length)
 
// sub2DMA  = new ChannelA (  
//     '000'                 // opcode 
//   , '000'                 // param
//   , '10'                  // size
//   , '00'                  // source
//   , '0011000001010000'.padStart(17, '0') // address
//   , '0000'                // mask
//   , '1'.padStart(32, '0') // data
//   , '0'                   // corrupt
//   , '1'
//   , '0'
// ) 
// dma.run (sub2DMA, '', '')
// console.log (dma.destinationAddress, dma.destinationAddress.length)

// sub2DMA  = new ChannelA (  
//     '000'                 // opcode 
//   , '000'                 // param
//   , '10'                  // size
//   , '00'                  // source
//   , '0011000001010100'.padStart(17, '0') // address
//   , '0000'                // mask
//   , '1'.padStart(32, '0') // data
//   , '0'                   // corrupt
//   , '1'
//   , '0'
// ) 
// dma.run (sub2DMA, '', '')
// console.log (dma.length, dma.length.length)

// sub2DMA  = new ChannelA (  
//     '000'                 // opcode 
//   , '000'                 // param
//   , '10'                  // size
//   , '00'                  // source
//   , '0011000001011000'.padStart(17, '0') // address
//   , '0000'                // mask
//   , '1'.padStart(32, '0') // data
//   , '0'                   // corrupt
//   , '1'
//   , '0'
// ) 
// dma.run (sub2DMA, '', '')
// console.log (dma.control, dma.control.length)
// console.log (dma.run (sub2DMA, '', ''),dma.state)
// console.log (dma.run (sub2DMA, Memory2DMA, ''),dma.state)
// console.log (dma.run (sub2DMA, '', ''),dma.state)
// Memrory2DMA = new ChannelD (

// )
const SOC               = new Soc('super SoC')
const code              = 
`
.text  
lui  x2 , 0x00008  
lui  x1 , 0x00008
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
console.log(SOC.Processor.getRegisters())
// let cycle = 0
// SOC.Processor.Run(false, cycle, SOC.Bus0.Pout[0].dequeue())
// SOC.Memory.Run(cycle, SOC.Bus0.Pout[2].dequeue())
// SOC.Bus0.Run (
//   SOC.Processor.master.ChannelA
//   ,SOC.DMA.DMA_Master.ChannelA
//   ,SOC.Memory.slaveMemory.ChannelD
//   ,SOC.Bus1.Pout[0].dequeue()
//   ,SOC.Processor.master.ChannelA.valid == '1'
//   ,false
//   ,SOC.Memory.slaveMemory.ChannelD.valid == '1'
//   ,false
//   ,cycle
// )
// cycle +=1
// console.log('SOC.Processor.master.ChannelA  :  ', SOC.Processor.master.ChannelA)
// console.log('SOC.Memory.slaveMemory.ChannelD:  ', SOC.Memory.slaveMemory.ChannelD)
// console.log('Timming fifo',SOC.Bus0.Timming)
// console.log('state',SOC.Processor.state, SOC.Bus0.state, SOC.Memory.step)

// SOC.Processor.Run(false, cycle, SOC.Bus0.Pout[0].dequeue())
// SOC.Memory.Run(cycle, SOC.Bus0.Pout[2].dequeue())
// SOC.Bus0.Run (
//   SOC.Processor.master.ChannelA
//   ,SOC.DMA.DMA_Master.ChannelA
//   ,SOC.Memory.slaveMemory.ChannelD
//   ,SOC.Bus1.Pout[0].dequeue()
//   ,SOC.Processor.master.ChannelA.valid == '1'
//   ,false
//   ,SOC.Memory.slaveMemory.ChannelD.valid == '1'
//   ,false
//   ,cycle
// )
// cycle +=1
// console.log('SOC.Processor.master.ChannelA  :  ', SOC.Processor.master.ChannelA)
// console.log('SOC.Memory.slaveMemory.ChannelD:  ', SOC.Memory.slaveMemory.ChannelD)
// console.log('Timming fifo',SOC.Bus0.Timming)
// console.log('state',SOC.Processor.state, SOC.Bus0.state, SOC.Memory.step)

// SOC.Processor.Run(false, cycle, SOC.Bus0.Pout[0].dequeue())
// SOC.Memory.Run(cycle, SOC.Bus0.Pout[2].dequeue())
// SOC.Bus0.Run (
//   SOC.Processor.master.ChannelA
//   ,SOC.DMA.DMA_Master.ChannelA
//   ,SOC.Memory.slaveMemory.ChannelD
//   ,SOC.Bus1.Pout[0].dequeue()
//   ,SOC.Processor.master.ChannelA.valid == '1'
//   ,false
//   ,SOC.Memory.slaveMemory.ChannelD.valid == '1'
//   ,false
//   ,cycle
// )
// cycle +=1
// console.log('SOC.Processor.master.ChannelA  :  ', SOC.Processor.master.ChannelA)
// console.log('SOC.Memory.slaveMemory.ChannelD:  ', SOC.Memory.slaveMemory.ChannelD)
// console.log('Timming fifo',SOC.Bus0.Timming)
// console.log('state',SOC.Processor.state, SOC.Bus0.state, SOC.Memory.step)

// SOC.Processor.Run(false, cycle, SOC.Bus0.Pout[0].dequeue())
// SOC.Memory.Run(cycle, SOC.Bus0.Pout[2].dequeue())
// SOC.Bus0.Run (
//   SOC.Processor.master.ChannelA
//   ,SOC.DMA.DMA_Master.ChannelA
//   ,SOC.Memory.slaveMemory.ChannelD
//   ,SOC.Bus1.Pout[0].dequeue()
//   ,SOC.Processor.master.ChannelA.valid == '1'
//   ,false
//   ,SOC.Memory.slaveMemory.ChannelD.valid == '1'
//   ,false
//   ,cycle
// )
// cycle +=1
// console.log('SOC.Processor.master.ChannelA  :  ', SOC.Processor.master.ChannelA)
// console.log('SOC.Memory.slaveMemory.ChannelD:  ', SOC.Memory.slaveMemory.ChannelD)
// console.log('Timming fifo',SOC.Bus0.Timming)
// console.log('state',SOC.Processor.state, SOC.Bus0.state, SOC.Memory.step)
// console.log('SOC.Bus0.Pout[0].peek(): ', SOC.Bus0.Pout[0].peek())

// SOC.Processor.Run(false, cycle, SOC.Bus0.Pout[0].dequeue())
// SOC.Memory.Run(cycle, SOC.Bus0.Pout[2].dequeue())
// SOC.Bus0.Run (
//   SOC.Processor.master.ChannelA
//   ,SOC.DMA.DMA_Master.ChannelA
//   ,SOC.Memory.slaveMemory.ChannelD
//   ,SOC.Bus1.Pout[0].dequeue()
//   ,SOC.Processor.master.ChannelA.valid == '1'
//   ,false
//   ,SOC.Memory.slaveMemory.ChannelD.valid == '1'
//   ,false
//   ,cycle
// )
// cycle +=1
// console.log('SOC.Processor.master.ChannelA  :  ', SOC.Processor.master.ChannelA)
// console.log('SOC.Memory.slaveMemory.ChannelD:  ', SOC.Memory.slaveMemory.ChannelD)
// console.log('Timming fifo',SOC.Bus0.Timming)
// console.log('state',SOC.Processor.state, SOC.Bus0.state, SOC.Memory.step)
// console.log('SOC.Bus0.Pout[0].peek(): ', SOC.Bus0.Pout[0].peek())

// SOC.Processor.Run(false, cycle, SOC.Bus0.Pout[0].dequeue())
// SOC.Memory.Run(cycle, SOC.Bus0.Pout[2].dequeue())
// SOC.Bus0.Run (
//   SOC.Processor.master.ChannelA
//   ,SOC.DMA.DMA_Master.ChannelA
//   ,SOC.Memory.slaveMemory.ChannelD
//   ,SOC.Bus1.Pout[0].dequeue()
//   ,SOC.Processor.master.ChannelA.valid == '1'
//   ,false
//   ,SOC.Memory.slaveMemory.ChannelD.valid == '1'
//   ,false
//   ,cycle
// )
// cycle +=1
// console.log('SOC.Processor.master.ChannelA  :  ', SOC.Processor.master.ChannelA)
// console.log('SOC.Memory.slaveMemory.ChannelD:  ', SOC.Memory.slaveMemory.ChannelD)
// console.log('Timming fifo',SOC.Bus0.Timming)
// console.log('state',SOC.Processor.state, SOC.Bus0.state, SOC.Memory.step)
// console.log('SOC.Bus0.Pout[0].peek(): ', SOC.Bus0.Pout[0].peek())
// console.log(SOC.Processor.getRegisters())

// SOC.Processor.Run(false, cycle, SOC.Bus0.Pout[0].dequeue())
// SOC.Memory.Run(cycle, SOC.Bus0.Pout[2].dequeue())
// SOC.Bus0.Run (
//   SOC.Processor.master.ChannelA
//   ,SOC.DMA.DMA_Master.ChannelA
//   ,SOC.Memory.slaveMemory.ChannelD
//   ,SOC.Bus1.Pout[0].dequeue()
//   ,SOC.Processor.master.ChannelA.valid == '1'
//   ,false
//   ,SOC.Memory.slaveMemory.ChannelD.valid == '1'
//   ,false
//   ,cycle
// )
// cycle +=1
// console.log('SOC.Processor.master.ChannelA  :  ', SOC.Processor.master.ChannelA)
// console.log('SOC.Memory.slaveMemory.ChannelD:  ', SOC.Memory.slaveMemory.ChannelD)
// console.log('Timming fifo',SOC.Bus0.Timming)
// console.log('state',SOC.Processor.state, SOC.Bus0.state, SOC.Memory.step)
// console.log('SOC.Bus0.Pout[0].peek(): ', SOC.Bus0.Pout[0].peek())

// SOC.Processor.Run(false, cycle, SOC.Bus0.Pout[0].dequeue())
// SOC.Memory.Run(cycle, SOC.Bus0.Pout[2].dequeue())
// SOC.Bus0.Run (
//   SOC.Processor.master.ChannelA
//   ,SOC.DMA.DMA_Master.ChannelA
//   ,SOC.Memory.slaveMemory.ChannelD
//   ,SOC.Bus1.Pout[0].dequeue()
//   ,SOC.Processor.master.ChannelA.valid == '1'
//   ,false
//   ,SOC.Memory.slaveMemory.ChannelD.valid == '1'
//   ,false
//   ,cycle
// )
// cycle +=1
// console.log('SOC.Processor.master.ChannelA  :  ', SOC.Processor.master.ChannelA)
// console.log('SOC.Memory.slaveMemory.ChannelD:  ', SOC.Memory.slaveMemory.ChannelD)
// console.log('Timming fifo',SOC.Bus0.Timming)
// console.log('state',SOC.Processor.state, SOC.Bus0.state, SOC.Memory.step)
// console.log('SOC.Bus0.Pout[0].peek(): ', SOC.Bus0.Pout[0].peek())
// console.log('SOC.Bus0.Pout[2].peek(): ', SOC.Bus0.Pout[2].peek())

// SOC.Processor.Run(false, cycle, SOC.Bus0.Pout[0].dequeue())
// SOC.Memory.Run(cycle, SOC.Bus0.Pout[2].dequeue())
// SOC.Bus0.Run (
//   SOC.Processor.master.ChannelA
//   ,SOC.DMA.DMA_Master.ChannelA
//   ,SOC.Memory.slaveMemory.ChannelD
//   ,SOC.Bus1.Pout[0].dequeue()
//   ,SOC.Processor.master.ChannelA.valid == '1'
//   ,false
//   ,SOC.Memory.slaveMemory.ChannelD.valid == '1'
//   ,false
//   ,cycle
// )
// cycle +=1
// console.log('SOC.Processor.master.ChannelA  :  ', SOC.Processor.master.ChannelA)
// console.log('SOC.Memory.slaveMemory.ChannelD:  ', SOC.Memory.slaveMemory.ChannelD)
// console.log('Timming fifo',SOC.Bus0.Timming)
// console.log('state',SOC.Processor.state, SOC.Bus0.state, SOC.Memory.step)
// console.log('SOC.Bus0.Pout[0].peek(): ', SOC.Bus0.Pout[0].peek())
// console.log('SOC.Bus0.Pout[2].peek(): ', SOC.Bus0.Pout[2].peek())

// SOC.Processor.Run(false, cycle, SOC.Bus0.Pout[0].dequeue())
// SOC.Memory.Run(cycle, SOC.Bus0.Pout[2].dequeue())
// SOC.Bus0.Run (
//   SOC.Processor.master.ChannelA
//   ,SOC.DMA.DMA_Master.ChannelA
//   ,SOC.Memory.slaveMemory.ChannelD
//   ,SOC.Bus1.Pout[0].dequeue()
//   ,SOC.Processor.master.ChannelA.valid == '1'
//   ,false
//   ,SOC.Memory.slaveMemory.ChannelD.valid == '1'
//   ,false
//   ,cycle
// )
// cycle +=1
// console.log('SOC.Processor.master.ChannelA  :  ', SOC.Processor.master.ChannelA)
// console.log('SOC.Memory.slaveMemory.ChannelD:  ', SOC.Memory.slaveMemory.ChannelD)
// console.log('Timming fifo',SOC.Bus0.Timming)
// console.log('state',SOC.Processor.state, SOC.Bus0.state, SOC.Memory.step)
// console.log('SOC.Bus0.Pout[0].peek(): ', SOC.Bus0.Pout[0].peek())
// console.log('SOC.Bus0.Pout[2].peek(): ', SOC.Bus0.Pout[2].peek())

// SOC.Processor.Run(false, cycle, SOC.Bus0.Pout[0].dequeue())
// SOC.Memory.Run(cycle, SOC.Bus0.Pout[2].dequeue())
// SOC.Bus0.Run (
//   SOC.Processor.master.ChannelA
//   ,SOC.DMA.DMA_Master.ChannelA
//   ,SOC.Memory.slaveMemory.ChannelD
//   ,SOC.Bus1.Pout[0].dequeue()
//   ,SOC.Processor.master.ChannelA.valid == '1'
//   ,false
//   ,SOC.Memory.slaveMemory.ChannelD.valid == '1'
//   ,false
//   ,cycle
// )
// cycle +=1
// console.log('SOC.Processor.master.ChannelA  :  ', SOC.Processor.master.ChannelA)
// console.log('SOC.Memory.slaveMemory.ChannelD:  ', SOC.Memory.slaveMemory.ChannelD)
// console.log('Timming fifo',SOC.Bus0.Timming)
// console.log('state',SOC.Processor.state, SOC.Bus0.state, SOC.Memory.step)
// console.log('SOC.Bus0.Pout[0].peek(): ', SOC.Bus0.Pout[0].peek())
// console.log('SOC.Bus0.Pout[2].peek(): ', SOC.Bus0.Pout[2].peek())

// SOC.Processor.Run(false, cycle, SOC.Bus0.Pout[0].dequeue())
// SOC.Memory.Run(cycle, SOC.Bus0.Pout[2].dequeue())
// SOC.Bus0.Run (
//   SOC.Processor.master.ChannelA
//   ,SOC.DMA.DMA_Master.ChannelA
//   ,SOC.Memory.slaveMemory.ChannelD
//   ,SOC.Bus1.Pout[0].dequeue()
//   ,SOC.Processor.master.ChannelA.valid == '1'
//   ,false
//   ,SOC.Memory.slaveMemory.ChannelD.valid == '1'
//   ,false
//   ,cycle
// )
// cycle +=1
// console.log('SOC.Processor.master.ChannelA  :  ', SOC.Processor.master.ChannelA)
// console.log('SOC.Memory.slaveMemory.ChannelD:  ', SOC.Memory.slaveMemory.ChannelD)
// console.log('Timming fifo',SOC.Bus0.Timming)
// console.log('state',SOC.Processor.state, SOC.Bus0.state, SOC.Memory.step)
// console.log('SOC.Bus0.Pout[0].peek(): ', SOC.Bus0.Pout[0].peek())
// console.log('SOC.Bus0.Pout[2].peek(): ', SOC.Bus0.Pout[2].peek())
// console.log(SOC.Processor.getRegisters())
// console.log('SOC.Processor.master.ChannelA  :  ', SOC.Processor.master.ChannelA)
// console.log('SOC.Memory.slaveMemory.ChannelD:  ', SOC.Memory.slaveMemory.ChannelD)
// console.log('Timming fifo',SOC.Bus0.Timming)
// console.log('state',SOC.Processor.state, SOC.Bus0.state, SOC.Memory.step)
// console.log('SOC.Bus0.Pout[0].peek(): ', SOC.Bus0.Pout[0].peek())
// console.log('SOC.Bus0.Pout[2].peek(): ', SOC.Bus0.Pout[2].peek())
// console.log('SOC.Processor.master.ChannelA  :  ', SOC.Processor.master.ChannelA)
// console.log('SOC.Memory.slaveMemory.ChannelD:  ', SOC.Memory.slaveMemory.ChannelD)
// console.log('Timming fifo',SOC.Bus0.Timming)
// console.log('state',SOC.Processor.state, SOC.Bus0.state, SOC.Memory.step)
// console.log('SOC.Bus0.Pout[0].peek(): ', SOC.Bus0.Pout[0].peek())
// console.log(SOC.Processor.getRegisters)
// SOC.Processor.Run(false, cycle, SOC.Bus0.Pout[0].dequeue())
// SOC.Memory.Run(cycle, SOC.Bus0.Pout[2].dequeue())
// SOC.Bus0.Run (
//   SOC.Processor.master.ChannelA
//   ,SOC.DMA.DMA_Master.ChannelA
//   ,SOC.Memory.slaveMemory.ChannelD
//   ,SOC.Bus1.Pout[0].dequeue()
//   ,SOC.Processor.master.ChannelA.valid == '1'
//   ,false
//   ,true
//   ,false
//   ,cycle
// )
// cycle +=1

// console.log(SOC.Processor.getRegisters())
// SOC.Processor.Run(false, 0, SOC.Bus0.Pout[0].dequeue())
// console.log('1 SOC.Processor.master.ChannelA: ',   SOC.Processor.master.ChannelA)
// console.log('1 SOC.Bus0.Pout[2].peek(): ',   SOC.Bus0.Pout[2].peek())
// SOC.Memory.Run(0, SOC.Bus0.Pout[2].dequeue())
// SOC.Bus0.Run (
//   SOC.Processor.master.ChannelA
//   ,SOC.DMA.DMA_Master.ChannelA
//   ,SOC.Memory.slaveMemory.ChannelD
//   ,SOC.Bus1.Pout[0].dequeue()
//   ,SOC.Processor.master.ChannelA.valid == '1'
//   ,false
//   ,true
//   ,false
//   ,0
// )
// console.log()
// console.log('1 SOC.Bus0.Pout[0].peek(): ', SOC.Bus0.Pout[0].peek(), SOC.Processor.state)
// console.log(SOC.Processor.getRegisters())

// SOC.Processor.Run(false, 0, SOC.Bus0.Pout[0].dequeue())
// console.log('2 SOC.Processor.master.ChannelA: ',   SOC.Processor.master.ChannelA)
// console.log('2 SOC.Bus0.Pout[2].peek(): ',   SOC.Bus0.Pout[2].peek())
// SOC.Memory.Run(0, SOC.Bus0.Pout[2].dequeue())
// SOC.Bus0.Run (
//   SOC.Processor.master.ChannelA
//   ,SOC.DMA.DMA_Master.ChannelA
//   ,SOC.Memory.slaveMemory.ChannelD
//   ,SOC.Bus1.Pout[0].dequeue()
//   ,SOC.Processor.master.ChannelA.valid == '1'
//   ,false
//   ,true
//   ,false
//   ,0
// )
// console.log('2 SOC.Bus0.Pout[0].peek(): ', SOC.Bus0.Pout[0].peek(), SOC.Processor.state)
// console.log(SOC.Processor.getRegisters())
// // SOC.Processor.Run(false, 0, SOC.Bus0.Pout[0].dequeue())
// SOC.Memory.Run(0, SOC.Bus0.Pout[2].dequeue())
// SOC.Bus0.Run (
//   SOC.Processor.master.ChannelA
//   ,SOC.DMA.DMA_Master.ChannelA
//   ,SOC.Memory.slaveMemory.ChannelD
//   ,SOC.Bus1.Pout[0].dequeue()
//   ,SOC.Processor.master.ChannelA.valid == '1'
//   ,false
//   ,true
//   ,false
//   ,0
// )

// SOC.Processor.Run(false, 0, SOC.Bus0.Pout[0].dequeue())
// SOC.Memory.Run(0, SOC.Bus0.Pout[2].dequeue())
// SOC.Bus0.Run (
//   SOC.Processor.master.ChannelA
//   ,SOC.DMA.DMA_Master.ChannelA
//   ,SOC.Memory.slaveMemory.ChannelD
//   ,SOC.Bus1.Pout[0].dequeue()
//   ,SOC.Processor.master.ChannelA.valid == '1'
//   ,false
//   ,true
//   ,false
//   ,0
// )

// SOC.Processor.Run(false, 0, SOC.Bus0.Pout[0].dequeue())
// SOC.Memory.Run(0, SOC.Bus0.Pout[2].dequeue())
// SOC.Bus0.Run (
//   SOC.Processor.master.ChannelA
//   ,SOC.DMA.DMA_Master.ChannelA
//   ,SOC.Memory.slaveMemory.ChannelD
//   ,SOC.Bus1.Pout[0].dequeue()
//   ,SOC.Processor.master.ChannelA.valid == '1'
//   ,false
//   ,true
//   ,false
//   ,0
// )
// console.log(SOC.Processor.state)

// SOC.Processor.Run(false, 0, SOC.Bus0.Pout[0].dequeue())
// SOC.Memory.Run(0, SOC.Bus0.Pout[2].dequeue())
// SOC.Bus0.Run (
//   SOC.Processor.master.ChannelA
//   ,SOC.DMA.DMA_Master.ChannelA
//   ,SOC.Memory.slaveMemory.ChannelD
//   ,SOC.Bus1.Pout[0].dequeue()
//   ,SOC.Processor.master.ChannelA.valid == '1'
//   ,false
//   ,true
//   ,false
//   ,0
// )
// console.log(SOC.Processor.state)
// console.log(SOC.Processor.getRegisters())
// console.log('state: ', SOC.Bus0.state)

// // console.log (SOC.Memory.slaveMemory.ChannelD)

// SOC.Processor.Run(false, 0, SOC.Bus0.Pout[0].dequeue())

// console.log(SOC.Bus0.Pout[0].peek(), SOC.Processor.state)
// SOC.Memory.Run(0, SOC.Bus0.Pout[2].dequeue())
// console.log('state: ', SOC.Bus0.state)
// SOC.Bus0.Run (
//   SOC.Processor.master.ChannelA
//   ,SOC.DMA.DMA_Master.ChannelA
//   ,SOC.Memory.slaveMemory.ChannelD
//   ,SOC.Bus1.Pout[0].dequeue()
//   ,SOC.Processor.master.ChannelA.valid == '1'
//   ,false
//   ,true
//   ,false
//   ,0
// )
// SOC.Processor.Run(false, 0, SOC.Bus0.Pout[0].dequeue())
// SOC.Bus0.Run (
//   SOC.Processor.master.ChannelA
//   ,SOC.DMA.DMA_Master.ChannelA
//   ,SOC.Memory.slaveMemory.ChannelD
//   ,SOC.Bus1.Pout[0].dequeue()
//   ,SOC.Processor.master.ChannelA.valid == '1'
//   ,false
//   ,true
//   ,false
//   ,1
// )
// SOC.Memory.Run(1, SOC.Bus0.Pout[2].dequeue())

// SOC.Processor.Run(false, 0, SOC.Bus0.Pout[0].dequeue())
// SOC.Bus0.Run (
//   SOC.Processor.master.ChannelA
//   ,SOC.DMA.DMA_Master.ChannelA
//   ,SOC.Memory.slaveMemory.ChannelD
//   ,SOC.Bus1.Pout[0].dequeue()
//   ,SOC.Processor.master.ChannelA.valid == '1'
//   ,false
//   ,true
//   ,false
//   ,2
// )
// SOC.Memory.Run(2, SOC.Bus0.Pout[2].dequeue())

// SOC.Processor.Run(false, 0, SOC.Bus0.Pout[0].dequeue())
// console.log(SOC.Processor.master.ChannelA.valid == '1')
// SOC.Bus0.Run (
//   SOC.Processor.master.ChannelA
//   ,SOC.DMA.DMA_Master.ChannelA
//   ,SOC.Memory.slaveMemory.ChannelD
//   ,SOC.Bus1.Pout[0].dequeue()
//   ,SOC.Processor.master.ChannelA.valid == '1'
//   ,false
//   ,true
//   ,false
//   ,2
// )
// SOC.Memory.Run(2, SOC.Bus0.Pout[2].dequeue())
// console.log('SOC.Memory.step, SOC.Bus0.state, SOC.Processor.state', SOC.Memory.step, SOC.Bus0.state, SOC.Processor.state)
// console.log(SOC.Bus0.Pout[2].peek())
// SOC.Memory.Run(0, SOC.Bus0.Pout[2].dequeue())
// console.log(SOC.Bus0.Pout[2].peek())

// SOC.Processor.Run(false, 0, SOC.Bus0.Pout[0].dequeue())
// console.log(SOC.Bus0.Pin[0].peek())
// // console.log('SOC.Processor.master.ChannelA ',SOC.Processor.master.ChannelA)
// SOC.Bus0.Run (
//   SOC.Processor.master.ChannelA
//   ,SOC.DMA.DMA_Master.ChannelA
//   ,SOC.Memory.slaveMemory.ChannelD
//   ,SOC.Bus1.Pout[0].dequeue()
//   ,(SOC.Processor.state == 1) || (SOC.Processor.state == 3)
//   ,true
//   ,true
//   ,true
//   ,0
// )
// console.log(SOC.Bus0.Pout[2].peek())
// SOC.Memory.Run(0, SOC.Bus0.Pout[2].dequeue())
// console.log(SOC.Bus0.Pout[2].peek())
// console.log('SOC.Memory: ', SOC.Memory.step, SOC.Bus0.state, SOC.Processor.state)

// SOC.Processor.Run(false, 0, SOC.Bus0.Pout[0].dequeue())
// console.log('SOC.Processor.master.ChannelA ',SOC.Processor.master.ChannelA)
// console.log('SOC.Processor.state ',SOC.Processor.state)
// SOC.Bus0.Run (
//   SOC.Processor.master.ChannelA
//   ,SOC.DMA.DMA_Master.ChannelA
//   ,SOC.Memory.slaveMemory.ChannelD
//   ,SOC.Bus1.Pout[0].dequeue()
//   ,true
//   ,true
//   ,true
//   ,true
//   ,0
// )
// console.log(SOC.Bus0.Pout[2].peek())
// SOC.Memory.Run(0, SOC.Bus0.Pout[2].dequeue())
// console.log('SOC.Memory: ', SOC.Memory.step, SOC.Bus0.state)

// SOC.Processor.Run(false, 0, SOC.Bus0.Pout[0].dequeue())
// console.log('SOC.Processor.master.ChannelA ',SOC.Processor.master.ChannelA)
// SOC.Bus0.Run (
//   SOC.Processor.master.ChannelA
//   ,SOC.DMA.DMA_Master.ChannelA
//   ,SOC.Memory.slaveMemory.ChannelD
//   ,SOC.Bus1.Pout[0].dequeue()
//   ,true
//   ,true
//   ,true
//   ,true
//   ,0
// )
// console.log(SOC.Bus0.Pout[2].peek())
// SOC.Memory.Run(0, SOC.Bus0.Pout[2].dequeue())
// console.log('SOC.Memory: ', SOC.Memory.step, SOC.Bus0.state)

// SOC.Processor.Run(false, 0, SOC.Bus0.Pout[0].dequeue())
// console.log('SOC.Processor.master.ChannelA ',SOC.Processor.master.ChannelA)
// SOC.Bus0.Run (
//   SOC.Processor.master.ChannelA
//   ,SOC.DMA.DMA_Master.ChannelA
//   ,SOC.Memory.slaveMemory.ChannelD
//   ,SOC.Bus1.Pout[0].dequeue()
//   ,true
//   ,true
//   ,true
//   ,true
//   ,0
// )
// SOC.Memory.Run(0, SOC.Bus0.Pout[2].dequeue())
// console.log(SOC.Bus0.Pout[0].dequeue())
// console.log(SOC.Bus0.state)
// console.log(SOC.Memory.slaveMemory.ChannelD)

// SOC.Processor.Run(false, 0, SOC.Bus0.Pout[0].dequeue())
// console.log('SOC.Processor.master.ChannelA ',SOC.Processor.master.ChannelA)
// SOC.Bus0.Run (
//   SOC.Processor.master.ChannelA
//   ,SOC.DMA.DMA_Master.ChannelA
//   ,SOC.Memory.slaveMemory.ChannelD
//   ,SOC.Bus1.Pout[0].dequeue()
//   ,true
//   ,true
//   ,true
//   ,true
//   ,0
// )
// SOC.Memory.Run(0, SOC.Bus0.Pout[2].dequeue())
// console.log('SOC.Memory: ', SOC.Bus0.Pout[0].peek())
// SOC.Processor.Run(false, 0, SOC.Bus0.Pout[0].dequeue())
// console.log(SOC.Processor.state)
// console.log(SOC.Processor.getRegisters())
