import Soc from './SoC'
import *as path from 'path'
import *as fs from 'fs'
// const fp                = path.join(__dirname, '/testing/input/Code_editor.txt')
// const data              = fs.readFileSync(fp, "utf-8")
const code              = ".text\n lw x1, 1032(x0)\n lw x1, 2056(x0)\n"
const SOC               = new Soc('super SoC')
SOC.Processor.active    = true
SOC.MMU.active          = true
SOC.Bus.active          = true
SOC.Memory.active       = true
SOC.MMU.SetTLB([0, (0*4095) + (96 + 16 + 1024) *4, 1, 1],
               [1, (1*4095) + (96 + 16 + 1024) *4, 1, 2],
               [2, (2*4095) + (96 + 16 + 1024) *4, 1, 3],
               [3, (3*4095) + (96 + 16 + 1024) *4, 1, 4],
               [4, (4*4095) + (96 + 16 + 1024) *4, 1, 5],
               [5, (5*4095) + (96 + 16 + 1024) *4, 1, 6],
               [6, (6*4095) + (96 + 16 + 1024) *4, 1, 7],
               [244 , (244*4095) + (96 + 16 + 1024) *4, 1, 8],
)
console.log(SOC.MMU.TLB)
// 1 003 836
console.log (SOC.MMU.Run('00000000000000001111010001110000'))//000000000000000011110100 01110000

const data = [
   [0, (0*4095) + (96 + 16 + 1024) * 4, 1, 1],
   [1, (1*4095) + (96 + 16 + 1024) * 4, 1, 2],
   [2, (2*4095) + (96 + 16 + 1024) * 4, 1, 3],
   [3, (3*4095) + (96 + 16 + 1024) * 4, 1, 4],
   [4, (4*4095) + (96 + 16 + 1024) * 4, 1, 5],
   [5, (5*4095) + (96 + 16 + 1024) * 4, 1, 6],
   [6, (6*4095) + (96 + 16 + 1024) * 4, 1, 7],
   [244, (244*4095) + (96 + 16 + 1024) * 4, 1, 8]
];

// Step 1: Find the row with the minimum value in the fifth column
let minValue = Infinity;
let minIndex = -1;

for (let i = 0; i < data.length; i++) {
   if (data[i][3] < minValue) { // Check the fifth column (index 3)
       minValue = data[i][3];
       minIndex = i;
   }
}

// Step 2: Replace the row with the new values
if (minIndex !== -1) {
   data[minIndex] = [999, 888, 777, 666]; // Replace with new row values
}

console.log(data);


// SOC.MMU.Run()
// SOC.RunAll ()

// SOC.assemble(
//    code, 
//    0 * 4, //   LM point
//    96 * 4, //  I/O point
//    (96 + 16) * 4, // I-Mem point
//    (96 + 16 + 1024) *4, // D-Mem point  
//    4095*0xffffff, //Stack point
//    []
// )
// SOC.RunAll()
//console.log(SOC.Processor.getRegisters())
// console.log(SOC.Memory.GetMemory())
