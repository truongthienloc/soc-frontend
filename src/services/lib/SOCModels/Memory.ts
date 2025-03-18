import { Register } from '../../../types/register'
import Slave from './Slave'
import { dec, } from './sub_function'
import ChannelA from './ChannelA'
import ChannelD from './ChannelD'
import {Logger } from './soc.d'

export default class Memory {
    Memory          : { [key: string]: string }
    active          : boolean
    slaveMemory     : Slave
    state           : number 
    address         : string
    data            : string
    Ins_pointer     : number
    logger          : Logger
    active_println  : boolean
    burst           : ChannelD[]

    constructor(active: boolean) {
        this.state               = 0 
        this.address            = ''
        this.data               = ''
        
        this.Memory             = {}
        this.active             = active
        this.slaveMemory        = new Slave('DataMemory', true)
        this.Ins_pointer        = 0
        this.active_println     = true
        this.burst              = []
    }

    public setLogger(logger: Logger) {
        this.logger = logger
    }

    public println(active: boolean, ...args: string[]) {
        
        if (active) {
            console.log(...args)
        }

        if (!this.logger) {
            return
        }

        if (active) {
            this.logger.println(...args)
        }
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

        if (this.state == 0) {
            if (MMU2Memory.valid == '1') {
                this.slaveMemory.ChannelD.valid = '1'
                if (MMU2Memory.opcode == '100') {

                    this.println (this.active_println,
                    'Cycle '             +
                    cycle.toString()     +
                    ': The MEMORY is receiving a GET message from the INTERCONNECT.'
                    )
                    this.slaveMemory.receive (MMU2Memory)
                    this.address         =   this.slaveMemory.ChannelA.address


                    this.println (this.active_println,
                    'Cycle '             +
                    cycle.toString()     +
                    ': The MEMORY is sending an AccessAckData message to the INTERCONNECT.'
                    )
                    if (MMU2Memory.size == '00') {
                        this.slaveMemory.send(
                            'AccessAckData', 
                            this.slaveMemory.ChannelA.source, 
                            this.Memory[(parseInt(this.address, 2) + 3).toString(2).padStart(17, '0')] + 
                            this.Memory[(parseInt(this.address, 2) + 2).toString(2).padStart(17, '0')] +
                            this.Memory[(parseInt(this.address, 2) + 1).toString(2).padStart(17, '0')] +
                            this.Memory[(parseInt(this.address, 2) + 0).toString(2).padStart(17, '0')]
                        )
                        this.burst.push (this.slaveMemory.ChannelD)
                    }
                    
                    if (MMU2Memory.size == '10') {
                        // FIRST BURST
                        this.slaveMemory.send(
                            'AccessAckData', 
                            this.slaveMemory.ChannelA.source, 
                            this.Memory[(parseInt(this.address, 2) + 3).toString(2).padStart(17, '0')] + 
                            this.Memory[(parseInt(this.address, 2) + 2).toString(2).padStart(17, '0')] +
                            this.Memory[(parseInt(this.address, 2) + 1).toString(2).padStart(17, '0')] +
                            this.Memory[(parseInt(this.address, 2) + 0).toString(2).padStart(17, '0')]
                        )
                        this.burst.push (this.slaveMemory.ChannelD)

                        //SECOND BURST 
                        this.slaveMemory.send(
                            'AccessAckData', 
                            this.slaveMemory.ChannelA.source, 
                            this.Memory[(parseInt(this.address, 2) + 7).toString(2).padStart(17, '0')] + 
                            this.Memory[(parseInt(this.address, 2) + 6).toString(2).padStart(17, '0')] +
                            this.Memory[(parseInt(this.address, 2) + 5).toString(2).padStart(17, '0')] +
                            this.Memory[(parseInt(this.address, 2) + 4).toString(2).padStart(17, '0')]
                        )
                        this.burst.push (this.slaveMemory.ChannelD)

                        //THIRD BURST
                        this.slaveMemory.send(
                            'AccessAckData', 
                            this.slaveMemory.ChannelA.source, 
                            this.Memory[(parseInt(this.address, 2) + 11).toString(2).padStart(17, '0')] + 
                            this.Memory[(parseInt(this.address, 2) + 10).toString(2).padStart(17, '0')] +
                            this.Memory[(parseInt(this.address, 2) + 9 ).toString(2).padStart(17, '0')] +
                            this.Memory[(parseInt(this.address, 2) + 8 ).toString(2).padStart(17, '0')]
                        )
                        this.burst.push (this.slaveMemory.ChannelD)

                        //FOURTH BURST
                        this.slaveMemory.send(
                            'AccessAckData', 
                            this.slaveMemory.ChannelA.source, 
                            this.Memory[(parseInt(this.address, 2) + 15).toString(2).padStart(17, '0')] + 
                            this.Memory[(parseInt(this.address, 2) + 14).toString(2).padStart(17, '0')] +
                            this.Memory[(parseInt(this.address, 2) + 13).toString(2).padStart(17, '0')] +
                            this.Memory[(parseInt(this.address, 2) + 12).toString(2).padStart(17, '0')]
                        )
                        this.burst.push (this.slaveMemory.ChannelD)
                    }


                    // console.log(this.Memory[(parseInt(this.address, 2) + 3).toString(2).padStart(17, '0')] , 
                    // this.Memory[(parseInt(this.address, 2) + 2).toString(2).padStart(17, '0')] ,
                    // this.Memory[(parseInt(this.address, 2) + 1).toString(2).padStart(17, '0')] ,
                    // this.Memory[(parseInt(this.address, 2) + 0).toString(2).padStart(17, '0')])

                    this.state   = 1
                    return
                    
                }
                if (MMU2Memory.opcode == '000') {

                    this.println (this.active_println,
                        'Cycle '             +
                        cycle.toString()     +
                        ': The MEMORY is receiving a PUT message from the INTERCONNECT.'
                    )
                    this.slaveMemory.receive(MMU2Memory)
                    this.address            = this.slaveMemory.ChannelA.address
                    this.data               = this.slaveMemory.ChannelA.data 

                    this.println (this.active_println,
                        'Cycle '             +
                        cycle.toString()     +
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
                    this.burst.push (this.slaveMemory.ChannelD)
                    this.Memory[(parseInt(this.address, 2) + 3).toString(2).padStart(17, '0')] = this.slaveMemory.ChannelA.data.slice(0,8)
                    this.Memory[(parseInt(this.address, 2) + 2).toString(2).padStart(17, '0')] = this.slaveMemory.ChannelA.data.slice(8,16)
                    this.Memory[(parseInt(this.address, 2) + 1).toString(2).padStart(17, '0')] = this.slaveMemory.ChannelA.data.slice(16,24)
                    this.Memory[(parseInt(this.address, 2) + 0).toString(2).padStart(17, '0')] = this.slaveMemory.ChannelA.data.slice(24,32)

                    this.state   = 1
                    return
                }
            }
           
        }
        if (this.state == 1) 
            this.slaveMemory.ChannelD.valid = '0'
            this.burst = []
            this.state = 0
            // this.state = 0
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
            //     this.state   = 0
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
    
    // public setMemoryFromString(input: string): { beforeColon: string; afterColon: string }[] {
    //     // Split the input into sections using regex that considers new lines and colons
    //     const sections = input.split(/\n(?=0x)/).map(section => section.trim());
    //     // TAO CODE 
    //     const result = sections.map(section => {
    //         // Split each section into beforeColon and afterColon based on the first colon
    //         const [beforeColon, afterColon] = section.split(/:\s*/);
    //         return {
    //             beforeColon: beforeColon.trim(),
    //             afterColon: (afterColon || '').trim().replace(/\s+/g, ' ') // Replace multiple spaces/newlines with single space
    //         };
    //     });
        
    //     for (const element of result) {
    //         let count = 0
    //         const address = parseInt(element.beforeColon, 16)
            
    //         for (const element1 of element.afterColon.split(" ")) {
                
    //             const data    = hexToBinary (element1).padStart(32,'0')
    //             console.log(data)
    //             this.Memory[ (address + count).toString(2).padStart(32,'0')] = data
    //             //console.log('address',hexToBinary (address + count).padStart(32,'0'))
    //             count+=4
    //         }
    //     }
        
    //     return result
    // }
}
