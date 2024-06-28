import Soc from './SoC'

const SOC = new Soc('super SoC')
SOC.Run('.text\n lui x23, 9\n lui x25, 9\n sw x25 0(x0)\n')
// console.log(SOC.Processor.register)
