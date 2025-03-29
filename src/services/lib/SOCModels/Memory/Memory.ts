import { Register } from './../../../../types/register'
import Slave from './../Interconnect/Slave'
import { dec, } from './../Compile/sub_function'
import ChannelA from './../Interconnect/ChannelA'
import ChannelD from './../Interconnect/ChannelD'
import {Logger } from './../Compile/soc.d'
import Cycle from '../Compile/cycle'
import { Rock_3D } from 'next/font/google'
import { BinToHex } from '../Compile/convert'

export default class Memory {
    Memory          : { [key: string]: string }
    active          : boolean
    slaveMemory     : Slave
    state           : number 
    address         : string
    data            : string
    Ins_pointer     : number
    logger          ?: Logger
    active_println  : boolean
    burst           : ChannelD[]

    constructor(active: boolean) {
        this.state               = 0 
        this.address            = ''
        this.data               = ''
        
        this.Memory             = {}
        this.active             = active
        this.slaveMemory        = new Slave('DataMemory', true)
        this.slaveMemory.ChannelD.sink = '0'
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
        const PageTablePointer = 0x0003000
        for (let i = PageTablePointer; i < (PageTablePointer + 4 * 16); i+=4) { 
            this.Memory[i.toString(2).padStart(17,'0')] = (0X0C000 + count*4096).toString(2).padStart(32,'0') 
            count ++ 
        }
    }

    public getPageNumber (): Register[] {
        const result: Register[]    = []
        const PageTablePointer0     =   0x0003000
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
        cycle           : Cycle
        , MMU2Memory    : ChannelA
        , ready         : boolean
    ) {

        if (this.state == 0) {
            this.slaveMemory.ChannelD.valid = '0'
            if (MMU2Memory.valid == '1') {

                this.slaveMemory.ChannelD.valid = '1'
                if (MMU2Memory.opcode == '100') {
                    this.slaveMemory.ChannelD.valid = '1'
                    this.println (this.active_println,
                    'Cycle '             +
                    cycle.toString()     +
                    ': The MEMORY is receiving a GET message from the INTERCONNECT.'
                    )
                    this.slaveMemory.receive (MMU2Memory)
                    this.address         =   this.slaveMemory.ChannelA.address

                    cycle.incr() 
                    if (ready) {
                        

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
                        this.println (this.active_println,
                            'Cycle '             +
                            cycle.toString()     +
                            ': The MEMORY is sending an AccessAckData message to the INTERCONNECT. (' 
                            + BinToHex (this.slaveMemory.ChannelD.data) 
                            +')'
                        )

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
                         
                        this.state   = 1
                        cycle.incr()
                    }

                    return
                    
                }
                if (MMU2Memory.opcode == '000') {
                    this.slaveMemory.ChannelD.valid = '1'
                    this.println (this.active_println,
                        'Cycle '             +
                        cycle.toString()     +
                        ': The MEMORY is receiving a PUT message from the INTERCONNECT.'
                    )
                    this.slaveMemory.receive(MMU2Memory)
                    this.address            = this.slaveMemory.ChannelA.address
                    this.data               = this.slaveMemory.ChannelA.data 

                    cycle.incr() 
                    if (ready) {
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
                        cycle.incr()
                    }
                    
                    return
                }
            }
           
        }
        if (this.state == 1) {
            this.slaveMemory.ChannelD.valid = '0'
            this.burst = []
            this.state = 0
        }
            
    }

    public GetInstructionMemory () {
        for (let i = 0; i<0X00FFF; i+=1 ){
            console.log(i.toString(2).padStart(17,'0'),this.Memory[i.toString(2).padStart(17,'0')])
        }
    }

    public SetInstructionMemory(Instruction_memory: string[] = []) {
        let count = 0
        console.log('ins',Instruction_memory)

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
    
    
    

    public GetMemory() {
        // Chuyển object sang mảng các cặp [key, value]
        const entries = Object.entries(this.Memory)
        const littleEndianMemory: { [key: string]: string } = {};
        
        // Sắp xếp mảng dựa trên key, giữ nguyên dạng số thập phân
        const sortedMemory = entries.sort((a, b) => parseInt(a[0], 10) - parseInt(b[0], 10));
        for (let i = 0; i < sortedMemory.length; i += 4) {
            let element = ''
            for (let j = 3; j>=0 ; j--) {
                element += sortedMemory[i+j][1]
            }
            littleEndianMemory [i.toString(2).padStart(17, '0')] = element

        }

        return littleEndianMemory
    
        // // Tạo một object mới để lưu trữ các giá trị được chuyển đổi theo Little Endian
        // const littleEndianMemory: { [key: string]: string } = {};
    
        // // Duyệt qua mỗi nhóm 4 entries, gộp và đảo ngược byte
        // for (let i = 0; i < sortedEntries.length / 4; i += 4) {
        //     const keyBase = parseInt(sortedEntries[i][0], 10); // Lấy key cơ sở là địa chỉ đầu tiên của mỗi nhóm 4 bytes
        //     let littleEndianValue = '';
    
        //     // Đảo ngược thứ tự các bytes và gộp lại thành một giá trị nhị phân duy nhất
        //     for (let j = 3; j >= 0; j--) {
        //         if (i + j < sortedEntries.length) {
        //             littleEndianValue += sortedEntries[i + j][1];
        //         }
        //     }
    
        //     // Lưu trữ vào object mới với key là địa chỉ cơ sở
        //     littleEndianMemory[keyBase.toString()] = littleEndianValue;
        // }
    
        // return littleEndianMemory;
    }
    
    
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
