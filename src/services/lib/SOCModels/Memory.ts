import { Register } from 'C:/Users/LENOVO/Desktop/KLTN/src/soc-frontend/src/types/register'
import Slave from './Slave'
import { dec } from './sub_function'
import ChannelA from './ChannelA'

export default class Memory {
    Memory          : { [key: string]: string }
    active          : boolean
    slaveMemory     : Slave
    step            : number 
    address         : string
    data            : string
    Ins_pointer     : number

    constructor(active: boolean) {
        this.step               = 0 
        this.address            = ''
        this.data               = ''
        
        this.Memory             = {}
        this.active             = active
        this.slaveMemory        = new Slave('DataMemory', true)
        this.Ins_pointer        = 0
    }
    public reset(Mem_tb: Register[]){
        // MEMORY AREA OF Kernel
        for (let i = 0; i < 0X1FFFF  + 1; i+=1) 
            this.Memory[i.toString(2).padStart(17,'0')] = '0'.padStart(8,'0')
        
        for (const element of Mem_tb) 
            this.Memory[element.name] = element.value   

        this.setPageNumber ()
    }

    public setPageNumber () {
        let count = 0
        const PageTablePointer = 0x00030000
        for (let i = PageTablePointer; i < (PageTablePointer + 4 * 16); i+=4) { 
            this.Memory[i.toString(2).padStart(17,'0')] = (0X0C000 + count*4096 + 1).toString(2).padStart(32,'0') 
            count ++ 
        }
    }

    public getPageNumber (): Register[] {
        const result: Register[]    = []
        const PageTablePointer0     =   0x00030000
        for (let i = PageTablePointer0; i < (PageTablePointer0 + 4 * 16); i+=4) {
            result.push({
                name: '0x' +  i.toString(16).padStart(8,'0'), 
                value: '0x' + dec('0' + this.Memory[i.toString(2).padStart(17,'0')]).toString(16).padStart(8,'0')
            })
        }
        return result
        // console.log i, dec (this.Memory[i.toString(2).padStart(32,'0')]))
    }

    public Run (
        cycle           : number
        , MMU2Memory    : ChannelA
    ) {

        if (this.step == 0) {
            if (MMU2Memory.valid == '1') {
                this.slaveMemory.ChannelD.valid = '1'
                if (MMU2Memory.opcode == '100') {
                    console.log  (
                        'Cycle ', 
                        cycle.toString(),
                        ': The MEMORY is receiving a GET message from the INTERCONNECT.'
                    )
                    //this.println (
                    // 'Cycle '             ,
                    // cycle.toString()     , 
                    // ': The MEMORY is receiving a GET message from the INTERCONNECT.'
                    //)
    
                    this.slaveMemory.receive (MMU2Memory)
                    console.log('MMU2Memory!', MMU2Memory)
                    console.log( this.slaveMemory.ChannelA.source)
                    this.address         =   this.slaveMemory.ChannelA.address

                    console.log  (
                        'Cycle ',
                        cycle.toString(), 
                        ': The MEMORY is sending an AccessAckData message to the INTERCONNECT.'
                    )
                    this.slaveMemory.send(
                        'AccessAckData', 
                        this.slaveMemory.ChannelA.source, 
                        this.Memory[(parseInt(this.address, 2) + 3).toString(2).padStart(17, '0')] + 
                        this.Memory[(parseInt(this.address, 2) + 2).toString(2).padStart(17, '0')] +
                        this.Memory[(parseInt(this.address, 2) + 1).toString(2).padStart(17, '0')] +
                        this.Memory[(parseInt(this.address, 2) + 0).toString(2).padStart(17, '0')]
                    )
                    console.log('this.slaveMemory.ChannelA.source', this.slaveMemory.ChannelA.source)
                    console.log(this.Memory[(parseInt(this.address, 2) + 3).toString(2).padStart(17, '0')] , 
                    this.Memory[(parseInt(this.address, 2) + 2).toString(2).padStart(17, '0')] ,
                    this.Memory[(parseInt(this.address, 2) + 1).toString(2).padStart(17, '0')] ,
                    this.Memory[(parseInt(this.address, 2) + 0).toString(2).padStart(17, '0')])
                    this.Memory[(parseInt(this.address, 2) + 3).toString(2)] = this.slaveMemory.ChannelD.data.slice(0,8)
                    this.Memory[(parseInt(this.address, 2) + 2).toString(2)] = this.slaveMemory.ChannelD.data.slice(8,16)
                    this.Memory[(parseInt(this.address, 2) + 1).toString(2)] = this.slaveMemory.ChannelD.data.slice(16,24)
                    this.Memory[(parseInt(this.address, 2) + 0).toString(2)] = this.slaveMemory.ChannelD.data.slice(24,32)
                    this.step   = 1
                    return
                    
                }
                if (MMU2Memory.opcode == '000') {
                    console.log()
                    console.log(
                        'Cycle ',
                        cycle.toString(),
                        ': The MEMORY is receiving a PUT message from the INTERCONNECT.',
                    )
                    // this.println(
                    //     'Cycle ',
                    //     this.cycle.toString(),
                    //    ': The MEMORY is receiving a PUT message from the INTERCONNECT.',
                    // )
                    this.slaveMemory.receive(MMU2Memory)
                    this.address            = this.slaveMemory.ChannelA.address
                    this.data               = this.slaveMemory.ChannelA.data 

                    console.log  (
                        'Cycle ',
                        cycle.toString(), 
                        ': The MEMORY is sending an AccessAck message to the INTERCONNECT.'
                    )
                    this.slaveMemory.send(
                        'AccessAck', 
                        this.slaveMemory.ChannelA.source,                 
                        this.Memory[(parseInt(this.address, 2) + 3).toString(2).padStart(17, '0')] + 
                        this.Memory[(parseInt(this.address, 2) + 2).toString(2).padStart(17, '0')] +
                        this.Memory[(parseInt(this.address, 2) + 1).toString(2).padStart(17, '0')] +
                        this.Memory[(parseInt(this.address, 2) + 0).toString(2).padStart(17, '0')]
                        )
                    this.step   = 1
                    return
                }
            }
           
        }
        if (this.step == 1) 
            this.slaveMemory.ChannelD.valid = '0'
            this.step = 0
            // this.step = 0
            // console.log  (
            //     'Cycle ',
            //     cycle.toString(), 
            //     ': The MEMORY is sending an AccessAckData message to the INTERCONNECT.'
            // )
            // // this.println  (
            // //     'Cycle ',
            // //     cycle.toString(), 
            // //     ': The MEMORY is sending an AccessAckData message to the INTERCONNECT.'
            // // )
            // if (this.slaveMemory.ChannelD.opcode == '000') {
            //     this.slaveMemory.send(
            //                         'AccessAck', 
            //                         this.slaveMemory.ChannelA.source, 
            //                         this.Memory[(parseInt(this.address, 2) + 3).toString(2).padStart(17, '0')] + 
            //                         this.Memory[(parseInt(this.address, 2) + 2).toString(2).padStart(17, '0')] +
            //                         this.Memory[(parseInt(this.address, 2) + 1).toString(2).padStart(17, '0')] +
            //                         this.Memory[(parseInt(this.address, 2) + 0).toString(2).padStart(17, '0')]
            //                         )
            //     console.log(this.Memory[(parseInt(this.address, 2) + 3).toString(2).padStart(17, '0')] , 
            //     this.Memory[(parseInt(this.address, 2) + 2).toString(2).padStart(17, '0')] ,
            //     this.Memory[(parseInt(this.address, 2) + 1).toString(2).padStart(17, '0')] ,
            //     this.Memory[(parseInt(this.address, 2) + 0).toString(2).padStart(17, '0')])
            //     this.Memory[(parseInt(this.address, 2) + 3).toString(2)] = this.slaveMemory.ChannelD.data.slice(0,8)
            //     this.Memory[(parseInt(this.address, 2) + 2).toString(2)] = this.slaveMemory.ChannelD.data.slice(8,16)
            //     this.Memory[(parseInt(this.address, 2) + 1).toString(2)] = this.slaveMemory.ChannelD.data.slice(16,24)
            //     this.Memory[(parseInt(this.address, 2) + 0).toString(2)] = this.slaveMemory.ChannelD.data.slice(24,32)
            // }

            // if (this.slaveMemory.ChannelD.opcode == '001')
            //     this.slaveMemory.send(
            //                         'AccessAckData', 
            //                         this.slaveMemory.ChannelA.source,                 
            //                         this.Memory[(parseInt(this.address, 2) + 3).toString(2).padStart(17, '0')] + 
            //                         this.Memory[(parseInt(this.address, 2) + 2).toString(2).padStart(17, '0')] +
            //                         this.Memory[(parseInt(this.address, 2) + 1).toString(2).padStart(17, '0')] +
            //                         this.Memory[(parseInt(this.address, 2) + 0).toString(2).padStart(17, '0')]
            //                         )
            //     this.step   = 0
            //     return
                
            // }
            
    }

    public SetInstructionMemory(Instruction_memory: string[] = []) {
        let count = 0

        this.Ins_pointer = (Object.values(Instruction_memory).length - 1) * 4

        for (const binString of Instruction_memory) {
            if (binString !== '') {
                // Chia chuỗi nhị phân thành 4 phần và sắp xếp theo kiểu Little Endian
                for (let i = 3; i >= 0; i--) {
                    let part = binString.substring(i * 8, (i + 1) * 8);
                    // Lưu mỗi phần vào Memory với key là địa chỉ nhị phân tương ứng
                    this.Memory[count.toString(2).padStart(17, '0')] = part;
                    count += 1;
                }
            }
        }
    }
    
    
    }

    // public GetMemory(): { [key: string]: string } {
    //     // Chuyển object sang mảng các cặp [key, value]
    //     const entries = Object.entries(this.Memory);
    
    //     // Sắp xếp mảng dựa trên key, chuyển key từ nhị phân sang thập phân để so sánh
    //     const sortedEntries = entries.sort((a, b) => {
    //         const decimalA = parseInt(a[0], 2); // Chuyển key a từ nhị phân sang thập phân
    //         const decimalB = parseInt(b[0], 2); // Chuyển key b từ nhị phân sang thập phân
    //         return decimalA - decimalB;
    //     });
    
    //     // Chuyển mảng đã sắp xếp trở lại object
    //     const sortedObj: { [key: string]: string } = {};
    //     for (const [key, value] of sortedEntries) {
    //         sortedObj[dec('0'+key)] = value;
    //     }
    
    //     return sortedObj;
    // }
    
//     public setMemoryFromString(input: string): { beforeColon: string; afterColon: string }[] {
//         // Split the input into sections using regex that considers new lines and colons
//         const sections = input.split(/\n(?=0x)/).map(section => section.trim());
//         // TAO CODE 
//         const result = sections.map(section => {
//             // Split each section into beforeColon and afterColon based on the first colon
//             const [beforeColon, afterColon] = section.split(/:\s*/);
//             return {
//                 beforeColon: beforeColon.trim(),
//                 afterColon: (afterColon || '').trim().replace(/\s+/g, ' ') // Replace multiple spaces/newlines with single space
//             };
//         });
        
//         for (const element of result) {
//             let count = 0
//             const address = parseInt(element.beforeColon, 16)
            
//             for (const element1 of element.afterColon.split(" ")) {
                
//                 const data    = hexToBinary (element1).padStart(32,'0')
//                 console.log(data)
//                 this.Memory[ (address + count).toString(2).padStart(32,'0')] = data
//                 //console.log('address',hexToBinary (address + count).padStart(32,'0'))
//                 count+=4
//             }
//         }
        
//         return result
//     }
// }
