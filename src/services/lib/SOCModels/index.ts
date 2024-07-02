import Soc from './SoC'
// import Assembler from './check_syntax'
const SOC = new Soc('super SoC')
// const as = new Assembler ()
SOC.Run(".text\naddi x1, x2 8\n")
// as.assemblerFromIns (".text\n lw x1, 400(x0)\n")
// console.log(as.binary_code)
// console.log(as.syntax_error)
// console.log("123")
// SOC.assemble(".text\n lui x23, 9\n lui x25, 9\n sw x25 0(x0)\n")
// SOC.Run()
// console.log(SOC.Processor.register)
