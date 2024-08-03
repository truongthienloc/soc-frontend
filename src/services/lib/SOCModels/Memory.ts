import Slave from './Slave'

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
            
            this.LM_point    = LM_point*4
            this.IO_point    = IO_point*4
            this.Imem_point  = Imem_point*4
            this.Dmem_point  = Dmem_point*4 
            this.Stack_point = Stack_point*4

            for (let i = 0; i < LM_point; i+=4) 
                this.Memory[i.toString(2).padStart(32,'0')] = '0'.padStart(32,'0')
            for (let i = LM_point; i < IO_point; i+=4) 
                this.Memory[i.toString(2).padStart(32,'0')] = '0'.padStart(32,'0')
            this.Memory[IO_point.toString(2).padStart(32,'0')] = '0'.padStart(32,'0')
            for (let i = IO_point + 4; i < Imem_point; i+=4) 
                this.Memory[i.toString(2).padStart(32,'0')] = '0'.padStart(32,'0')
            for (let i = Imem_point; i < Dmem_point; i+=4) 
                this.Memory[i.toString(2).padStart(32,'0')] = '0'.padStart(32,'0')
            for (let i = Dmem_point; i < Stack_point; i+=4) 
                this.Memory[i.toString(2).padStart(32,'0')] = '0'.padStart(32,'0')
            
    }
    public SetInstuctionMemory (Instruction_memory: { [key: string]: string}) {
        let count = this.IO_point + 1
        for (const key in Instruction_memory) {
            if (Instruction_memory.hasOwnProperty(key)) {
            this.Memory[count.toString(2).padStart(32,'0')] = Instruction_memory[key];
            count++
            }
        }
    }
}
