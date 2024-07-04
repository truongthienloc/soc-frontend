import Soc from './SoC'
const SOC = new Soc('super SoC')
SOC.assemble(".text\naddi x1, x2, 1\naddi x2, x2, 1\nlw x1, 400(x0)\nsw x2, 400(x0)\n")
SOC.RunAll()
