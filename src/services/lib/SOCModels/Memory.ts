import { Register } from '~/types/register'
import Slave from './Slave'
import { dec } from './sub_function'

export default class Memory {
    Memory: { [key: string]: string }
    active: boolean
    LM_point: number
    IO_point: number
    Imem_point: number
    Dmem_point: number
    Stack_point: number
    slaveMemory: Slave
    constructor(active: boolean) {
            this.LM_point    = 0
            this.IO_point    = 0
            this.Imem_point  = 0
            this.Dmem_point  = 0 
            this.Stack_point = 0
        
        this.Memory = {}
        this.active = active
        this.slaveMemory = new Slave('DataMemory', true)
    }
    public reset( LM_point: number, IO_point: number, 
    Imem_point: number, Dmem_point: number, Stack_point: number){
            
            this.LM_point    = LM_point
            this.IO_point    = IO_point
            this.Imem_point  = Imem_point
            this.Dmem_point  = Dmem_point
            this.Stack_point = Stack_point

            // MEMORY AREA OF LED MATRIX
            for (let i = LM_point; i < IO_point; i+=4) 
                this.Memory[i.toString(2).padStart(32,'0')] = '0'.padStart(32,'0')
            
            // MEMORY AREA OF I/O
            for (let i = IO_point; i < Imem_point; i+=4) 
                this.Memory[i.toString(2).padStart(32,'0')] = '0'.padStart(32,'0')
                this.Memory[Imem_point.toString(2).padStart(32,'0')] = '0'.padStart(32,'0')
            
            // MEMORY AREA OF I-MEM
            for (let i = Imem_point + 4; i < Dmem_point; i+=4) 
                this.Memory[i.toString(2).padStart(32,'0')] = '0'.padStart(32,'0')
            
            // MEMORY AREA OF D-MEM
            for (let i = Dmem_point; i < Stack_point; i+=4) 
                this.Memory[i.toString(2).padStart(32,'0')] = '0'.padStart(32,'0')
            
            // MEMORY AREA OF STACK
            for (let i = Stack_point; i < 100; i+=4) 
                this.Memory[i.toString(2).padStart(32,'0')] = '0'.padStart(32,'0')
            
    }
    public GetMemory(): { [key: string]: string } {
        // Chuyển object sang mảng các cặp [key, value]
        const entries = Object.entries(this.Memory);
    
        // Sắp xếp mảng dựa trên key, chuyển key từ nhị phân sang thập phân để so sánh
        const sortedEntries = entries.sort((a, b) => {
            const decimalA = parseInt(a[0], 2); // Chuyển key a từ nhị phân sang thập phân
            const decimalB = parseInt(b[0], 2); // Chuyển key b từ nhị phân sang thập phân
            return decimalA - decimalB;
        });
    
        // Chuyển mảng đã sắp xếp trở lại object
        const sortedObj: { [key: string]: string } = {};
        for (const [key, value] of sortedEntries) {
            sortedObj[dec('0'+key)] = value;
        }
    
        return sortedObj;
    }
    public SetInstuctionMemory (Instruction_memory: { [key: string]: string}) {
        console.log(Instruction_memory)
        let count = this.Imem_point + 4
        for (const key in Instruction_memory) {
            if (Instruction_memory.hasOwnProperty(key) && (Instruction_memory[key]!= '')) {
                this.Memory[count.toString(2).padStart(32,'0')] = Instruction_memory[key];
                count+=4
            }
        }
    }
}
