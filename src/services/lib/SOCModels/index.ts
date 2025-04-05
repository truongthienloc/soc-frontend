import DMA from './DMA'
import Soc from './SoC'
import ChannalD from './ChannelD'
const SOC               = new Soc('super SoC')
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

SOC.Processor.active    = true
SOC.MMU.active          = true
SOC.Bus0.active          = true
SOC.Bus1.active          = true
SOC.Memory.active       = true
SOC.DMA.active          = false

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
