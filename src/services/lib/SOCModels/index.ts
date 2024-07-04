import Soc from './SoC'
const SOC = new Soc('super SoC')
SOC.assemble(".text\naddi x1, x2, 1\nloop:\n addi x1, x2, 1\n\n")
//SOC.assemble(".text\naddi x1, x2, 1\nloop:addi x1, x2, 1\n \n\n")
SOC.RunAll()
