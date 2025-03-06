import { Register } from '~/types/register'
import Slave from './Slave'
import { dec } from './sub_function'
import { hexToBinary } from '~/helpers/converts/Hextobin'

export default class Memory {
    Memory: { [key: string]: string }
    active: boolean
    Kernel_point: number
    User_point: number
    IO_point: number
    slaveMemory: Slave
    constructor(active: boolean) {
        this.Kernel_point     = 0
        this.User_point       = 0
        this.IO_point         = 0 
        
        this.Memory = {}
        this.active = active
        this.slaveMemory = new Slave('DataMemory', true)
    }
    public reset(Mem_tb: Register[], Kernel_point: number, User_point: number, IO_point: number){

        this.Kernel_point     = 0x07FFF
        this.User_point       = 0x1BFFF
        this.IO_point         = 0x1FFFF
        
        // MEMORY AREA OF Kernel
        for (let i = 0; i < 0x07FFF  + 1; i+=4) 
            this.Memory[i.toString(2).padStart(17,'0')] = '0'.padStart(32,'0')

        // MEMORY AREA OF RVD 
        for (let i = 0x07FFF  + 1; i < 0x0BFFF  + 1; i+=4) 
            this.Memory[i.toString(2).padStart(17,'0')] = '0'.padStart(32,'0')
        
        // MEMORY AREA OF IO
        for (let i = 0x0BFFF  + 1 ; i < 0x1BFFF  + 1; i+=4)
            this.Memory[i.toString(2).padStart(17,'0')] = '0'.padStart(32,'0')
        
        // MEMORY AREA OF user
        for (let i =  0x1BFFF  + 1  ; i < 0x1FFFF; i+=4) // 17bit physical address
            this.Memory[i.toString(2).padStart(17,'0')] = '0'.padStart(32,'0')
        
        for (const element of Mem_tb) 
            this.Memory[element.name] = element.value   
    }

    public setPageNumber () {
        let count = 0
        const PageTablePointer = 0x1FFFF + 1
        for (let i = PageTablePointer + 8 * 4; i < (PageTablePointer + 4 * 16); i+=4) { 
            this.Memory[i.toString(2).padStart(17,'0')] = (0x0BFFF + count*4096 + 1).toString(2).padStart(32,'0') 
            count ++ 
        }
        for (let i = PageTablePointer; i < (PageTablePointer + 8 * 4); i+=4) { 
            this.Memory[i.toString(2).padStart(17,'0')] = (0x0BFFF + count*4096 + 1).toString(2).padStart(32,'0') 
            count ++ 
        }

    }

    public getPageNumber (): Register[] {
        const result: Register[] = []
        let count = 0
        const PageTablePointer0 =   0x1FFFF + 1
        for (let i = PageTablePointer0; i < (PageTablePointer0 + 4 * 16); i+=4) {
            result.push({
                name: '0x' +  i.toString(16).padStart(8,'0'), 
                value: '0x' + dec('0' + this.Memory[i.toString(2).padStart(17,'0')]).toString(16).padStart(8,'0')
            })
        }
        return result
        // console.log i, dec (this.Memory[i.toString(2).padStart(32,'0')]))
    }

    // public getLedMatrix () {
    //     for (let i = this.LM_point; i < this.Monitor_point; i+=4) 
    //         console.log(i.toString(2).padStart(32,'0'), this.Memory[i.toString(2).padStart(32,'0')])
    // }

    // public getIO () {
    //     for (let i = this.Monitor_point; i < this.Imem_point; i+=4) 
    //         console.log(this.Memory[i.toString(2).padStart(32,'0')])
    // }

    // public getImem () {
    //     for (let i = this.Imem_point; i < this.Dmem_point; i+=4) 
    //         console.log(this.Memory[i.toString(2).padStart(32,'0')])
    // }

    // public getDmem () {
    //     for (let i = this.Dmem_point; i < this.Stack_point; i+=4) 
    //         console.log(this.Memory[i.toString(2).padStart(32,'0')])
    // }

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
        console.log('Instruction Mem',Instruction_memory)
        let count = 0
        for (const key in Instruction_memory) {
            if (Instruction_memory.hasOwnProperty(key) && (Instruction_memory[key]!= '')) {
                this.Memory[count.toString(2).padStart(17,'0')] = Instruction_memory[key];
                count+=4
            }
        }
    }

    public setMemoryFromString(input: string): { beforeColon: string; afterColon: string }[] {
        // Split the input into sections using regex that considers new lines and colons
        const sections = input.split(/\n(?=0x)/).map(section => section.trim());
        // TAO CODE 
        const result = sections.map(section => {
            // Split each section into beforeColon and afterColon based on the first colon
            const [beforeColon, afterColon] = section.split(/:\s*/);
            return {
                beforeColon: beforeColon.trim(),
                afterColon: (afterColon || '').trim().replace(/\s+/g, ' ') // Replace multiple spaces/newlines with single space
            };
        });
        
        for (const element of result) {
            let count = 0
            const address = parseInt(element.beforeColon, 16)
            
            for (const element1 of element.afterColon.split(" ")) {
                
                const data    = hexToBinary (element1).padStart(32,'0')
                console.log(data)
                this.Memory[ (address + count).toString(2).padStart(32,'0')] = data
                //console.log('address',hexToBinary (address + count).padStart(32,'0'))
                count+=4
            }
        }
        
        return result
    }
}
