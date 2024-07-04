import Soc from './SoC'
const SOC = new Soc('super SoC')
SOC.assemble(".text\naddi x1, x2, 1\n")
SOC.RunAll()
