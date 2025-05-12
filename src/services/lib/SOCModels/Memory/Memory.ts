import { Register } from './../../../../types/register'
import Slave from './../Interconnect/Slave'
import { dec, } from './../Compile/sub_function'
import ChannelA from './../Interconnect/ChannelA'
import ChannelD from './../Interconnect/ChannelD'
import {Logger } from './../Compile/soc.d'
import Cycle from '../Compile/cycle'
import { Rock_3D } from 'next/font/google'
import { BinToHex } from '../Compile/convert'
import { FIFO_ChannelA }    from "../Interconnect/FIFO_ChannelA"

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

    IDLE_STATE                          = 0
    RECEIVE_GET_STATE                   = 1
    RECEIVE_PUT_STATA                   = 2
    SEND_ACCESSACKDATA_STATE            = 3
    SEND_ACCESSACK_STATE                = 4
    
    RECEIVE_ArithmeticData_Min_STATE    = 5
    RECEIVE_ArithmeticData_Max_STATE    = 6
    RECEIVE_ArithmeticData_MinU_STATE   = 7
    RECEIVE_ArithmeticData_MaxU_STATE   = 8
    RECEIVE_ArithmeticData_Add_STATE    = 9
    RECEIVE_LogicalData_Xor_STATE       = 10
    RECEIVE_LogicalData_Or_STATE        = 11
    RECEIVE_LogicalData_And_STATE       = 12
    RECEIVE_LogicalData_Swap_STATE      = 13

    SEND_ArithmeticData_Min_STATE       = 14
    SEND_ArithmeticData_Max_STATE       = 15
    SEND_ArithmeticData_MinU_STATE      = 16
    SEND_ArithmeticData_MaxU_STATE      = 17
    SEND_ArithmeticData_Add_STATE       = 18
    SEND_LogicalData_Xor_STATE          = 19
    SEND_LogicalData_Or_STATE           = 20
    SEND_LogicalData_And_STATE          = 21
    SEND_LogicalData_Swap_STATE         = 22


    constructor(active: boolean) {
        this.state              = 0 
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

    public Run (
        cycle           : Cycle
        , Int2Memory    : any // FIFO_ChannelA
        , ready         : boolean
    ) {
        // console.log ('Int2Memory', Int2Memory)
        let Int2Memory_ = Int2Memory.peek()
        if (this.state == this.IDLE_STATE)                          {
            Int2Memory_ = Int2Memory.dequeue ()
            this.burst              = []
            this.slaveMemory.ChannelD.valid = '0'
            this.slaveMemory.ChannelA.ready = '1'

            if (Int2Memory_.valid == '1') {
                this.slaveMemory.ChannelD.valid = '1'
                if (Int2Memory_.opcode == '100' ) this.state = this.RECEIVE_GET_STATE
                if (Int2Memory_.opcode == '010' ) {
                    if (Int2Memory_.param == '000')
                        this.state = this.RECEIVE_ArithmeticData_Min_STATE
                    if (Int2Memory_.param == '001')
                        this.state = this.RECEIVE_ArithmeticData_Max_STATE
                    if (Int2Memory_.param == '010')
                        this.state = this.RECEIVE_ArithmeticData_MinU_STATE
                    if (Int2Memory_.param == '011')
                        this.state = this.RECEIVE_ArithmeticData_MaxU_STATE
                    if (Int2Memory_.param == '100')
                        this.state = this.RECEIVE_ArithmeticData_Add_STATE
                }
                    
                if (Int2Memory_.opcode == '011' ) {
                    if (Int2Memory_.param == '000')
                        this.state = this.RECEIVE_LogicalData_Xor_STATE
                    if (Int2Memory_.param == '001')
                        this.state = this.RECEIVE_LogicalData_Or_STATE
                    if (Int2Memory_.param == '010')
                        this.state = this.RECEIVE_LogicalData_And_STATE
                    if (Int2Memory_.param == '011')
                        this.state = this.RECEIVE_LogicalData_Swap_STATE
                }
                if (Int2Memory_.opcode == '000') this.state = this.RECEIVE_PUT_STATA
            }
        }

        if (this.state == this.RECEIVE_GET_STATE)                   {
            this.slaveMemory.ChannelD.valid = '0'
            this.slaveMemory.receive (Int2Memory_)
            this.println (this.active_println,
                            'Cycle '             +
                            cycle.toString()     +
                            ': The MEMORY is receiving GET message from the INTERCONNECT.'
                            )
            this.slaveMemory.receive (Int2Memory_)
            this.state = this.SEND_ACCESSACKDATA_STATE

            return 
        }

        if (this.state == this.RECEIVE_ArithmeticData_Min_STATE)               {
            this.slaveMemory.ChannelD.valid = '0'
            this.slaveMemory.receive (Int2Memory_)
            this.println (this.active_println,
                            'Cycle '             +
                            cycle.toString()     +
                            ': The MEMORY is receiving ArithmeticData message from the INTERCONNECT.'
                            )
            this.slaveMemory.receive (Int2Memory_)
            this.state = this.SEND_ArithmeticData_Min_STATE

            return 
        }

        if (this.state == this.RECEIVE_ArithmeticData_Max_STATE)                {
            this.slaveMemory.ChannelD.valid = '0'
            this.slaveMemory.receive (Int2Memory_)
            this.println (this.active_println,
                            'Cycle '             +
                            cycle.toString()     +
                            ': The MEMORY is receiving ArithmeticData message from the INTERCONNECT.'
                            )
            this.slaveMemory.receive (Int2Memory_)
            this.state = this.SEND_ArithmeticData_Max_STATE

            return 
        }

        if (this.state == this.RECEIVE_ArithmeticData_MinU_STATE)                 {
            this.slaveMemory.ChannelD.valid = '0'
            this.slaveMemory.receive (Int2Memory_)
            this.println (this.active_println,
                            'Cycle '             +
                            cycle.toString()     +
                            ': The MEMORY is receiving ArithmeticData message from the INTERCONNECT.'
                            )
            this.slaveMemory.receive (Int2Memory_)
            this.state = this.SEND_ArithmeticData_MinU_STATE
            return 
        }

        if (this.state == this.RECEIVE_ArithmeticData_MaxU_STATE)                   {
            this.slaveMemory.ChannelD.valid = '0'
            this.slaveMemory.receive (Int2Memory_)
            this.println (this.active_println,
                            'Cycle '             +
                            cycle.toString()     +
                            ': The MEMORY is receiving ArithmeticData message from the INTERCONNECT.'
                            )
            this.slaveMemory.receive (Int2Memory_)
            this.state = this.SEND_ArithmeticData_MaxU_STATE

            return 
        }

        if (this.state == this.RECEIVE_LogicalData_Xor_STATE)                   {
            this.slaveMemory.ChannelD.valid = '0'
            this.slaveMemory.receive (Int2Memory_)
            this.println (this.active_println,
                            'Cycle '             +
                            cycle.toString()     +
                            ': The MEMORY is receiving LogicalData message from the INTERCONNECT.'
                            )
            this.slaveMemory.receive (Int2Memory_)
            this.state = this.SEND_LogicalData_Xor_STATE

            return 
        }

        if (this.state == this.RECEIVE_LogicalData_Or_STATE)                   {
            this.slaveMemory.ChannelD.valid = '0'
            this.slaveMemory.receive (Int2Memory_)
            this.println (this.active_println,
                            'Cycle '             +
                            cycle.toString()     +
                            ': The MEMORY is receiving LogicalData message from the INTERCONNECT.'
                            )
            this.slaveMemory.receive (Int2Memory_)
            this.state = this.SEND_LogicalData_Or_STATE

            return 
        }
        
        if (this.state == this.RECEIVE_LogicalData_And_STATE)                   {
            this.slaveMemory.ChannelD.valid = '0'
            this.slaveMemory.receive (Int2Memory_)
            this.println (this.active_println,
                            'Cycle '             +
                            cycle.toString()     +
                            ': The MEMORY is receiving LogicalData message from the INTERCONNECT.'
                            )
            this.slaveMemory.receive (Int2Memory_)
            this.state = this.SEND_LogicalData_And_STATE

            return 
        }

        if (this.state == this.RECEIVE_LogicalData_Swap_STATE)                   {
            this.slaveMemory.ChannelD.valid = '0'
            this.slaveMemory.receive (Int2Memory_)
            this.println (this.active_println,
                            'Cycle '             +
                            cycle.toString()     +
                            ': The MEMORY is receiving LogicalData message from the INTERCONNECT.'
                            )
            this.slaveMemory.receive (Int2Memory_)
            this.state = this.SEND_LogicalData_Swap_STATE

            return 
        }

        if (this.state == this.SEND_ACCESSACKDATA_STATE)   {
            this.slaveMemory.ChannelA.ready = '0'
            if (ready) {
                if (this.slaveMemory.ChannelA.size == '00') {
                    this.slaveMemory.ChannelD.valid = '1'
    
                    this.slaveMemory.send(
                        'AccessAckData', 
                        this.slaveMemory.ChannelA.source, 
                        this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 3).toString(2).padStart(17, '0')] + 
                        this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 2).toString(2).padStart(17, '0')] +
                        this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 1).toString(2).padStart(17, '0')] +
                        this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 0).toString(2).padStart(17, '0')]
                    )
                    this.burst.push ({...this.slaveMemory.ChannelD})
    
                    this.println (this.active_println,
                        'Cycle '             +
                        cycle.toString()     +
                        ': The MEMORY is sending an AccessAckData message to the INTERCONNECT.' 
                    )
                }
    
                if (this.slaveMemory.ChannelA.size == '10') {
                    // FIRST BURST
                    this.slaveMemory.send(
                        'AccessAckData', 
                        this.slaveMemory.ChannelA.source, 
                        this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 3).toString(2).padStart(17, '0')] + 
                        this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 2).toString(2).padStart(17, '0')] +
                        this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 1).toString(2).padStart(17, '0')] +
                        this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 0).toString(2).padStart(17, '0')]
                    )
                    this.println (this.active_println,
                        'Cycle '             +
                        cycle.toString()     +
                        ': The MEMORY is sending an AccessAckData message to the INTERCONNECT.'
                    )
                    this.burst.push ({...this.slaveMemory.ChannelD})
    
                    //SECOND BURST
                    this.slaveMemory.send(
                        'AccessAckData', 
                        this.slaveMemory.ChannelA.source, 
                        this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 7).toString(2).padStart(17, '0')] + 
                        this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 6).toString(2).padStart(17, '0')] +
                        this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 5).toString(2).padStart(17, '0')] +
                        this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 4).toString(2).padStart(17, '0')]
                    )
                    this.burst.push ({...this.slaveMemory.ChannelD})
    
                    //THIRD BURST
                    this.slaveMemory.send(
                        'AccessAckData', 
                        this.slaveMemory.ChannelA.source, 
                        this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 11).toString(2).padStart(17, '0')] + 
                        this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 10).toString(2).padStart(17, '0')] +
                        this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 9 ).toString(2).padStart(17, '0')] +
                        this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 8 ).toString(2).padStart(17, '0')]
                    )
                    this.burst.push ({...this.slaveMemory.ChannelD})
    
                    //FOURTH BURST
                    this.slaveMemory.send(
                        'AccessAckData', 
                        this.slaveMemory.ChannelA.source, 
                        this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 15).toString(2).padStart(17, '0')] + 
                        this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 14).toString(2).padStart(17, '0')] +
                        this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 13).toString(2).padStart(17, '0')] +
                        this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 12).toString(2).padStart(17, '0')]
                    )
                    this.burst.push ({...this.slaveMemory.ChannelD})
    
                    // console.log ('this.burst', this.burst)
                }
                             
                this.state   = this.IDLE_STATE
            }
            
            return
        }   
        
        if (this.state == this.RECEIVE_PUT_STATA)                   {
            if (Int2Memory_.opcode == '000') {
                this.slaveMemory.ChannelD.valid = '0'
                this.slaveMemory.receive (Int2Memory_)
                this.println (this.active_println,
                    'Cycle '             +
                    cycle.toString()     +
                    ': The MEMORY is receiving a PUT message from the INTERCONNECT.'
                )
                this.state = this.SEND_ACCESSACK_STATE
            }
        }

        if (this.state ==  this.SEND_ACCESSACK_STATE)       {
            this.slaveMemory.ChannelA.ready = '0'
            if (ready) {
                
                this.slaveMemory.ChannelD.valid = '1'
                this.println (this.active_println,
                    'Cycle '             +
                    cycle.toString()     +
                    ': The MEMORY is sending an AccessAck message to the INTERCONNECT.'
                )
                this.slaveMemory.send(
                    'AccessAck', 
                    this.slaveMemory.ChannelA.source,                 
                    '0'.padStart(32, '0')
                )
                this.burst.push ({...this.slaveMemory.ChannelD})
                this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 3).toString(2).padStart(17, '0')] = this.slaveMemory.ChannelA.data.slice(0,8)
                this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 2).toString(2).padStart(17, '0')] = this.slaveMemory.ChannelA.data.slice(8,16)
                this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 1).toString(2).padStart(17, '0')] = this.slaveMemory.ChannelA.data.slice(16,24)
                this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 0).toString(2).padStart(17, '0')] = this.slaveMemory.ChannelA.data.slice(24,32)
                this.state   = this.IDLE_STATE
            }
        }
            
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
    }

    public getPageNumber (): Register[] {
        const result: Register[]    = []
        const PageTablePointer0     =   0x0003000
        for (let i = PageTablePointer0; i < (PageTablePointer0 + 4 * 24); i+=1) {
            result.push({
                name: '0x' +  i.toString(16).padStart(8,'0'), 
                value: '0x' + dec('0' + this.Memory[i.toString(2).padStart(17,'0')]).toString(16).padStart(2,'0')
            })
        }
        return result
    }

    public GetInstructionMemory () {

        for (let i = 0; i<0X00FFF; i+=4 ){
            console.log(
            this.Memory[(i + 3).toString(2).padStart(17,'0')]+
            this.Memory[(i + 2).toString(2).padStart(17,'0')]+
            this.Memory[(i + 1).toString(2).padStart(17,'0')]+
            this.Memory[(i + 0).toString(2).padStart(17,'0')]
            )
        }
    }

    public SetInstructionMemory(Instruction_memory: string[] = []) {
        let count =  0
        this.Ins_pointer = 0 
        // for (let i = 0; i < 0X1FFFF  + 1; i+=1) 
        //     this.Memory[i.toString(2).padStart(17,'0')] = '0'.padStart(8,'0')
        for (const binString of Instruction_memory) {
            if (binString !== '') {
                for (let i = 3; i >= 0; i--) {
                    let part = binString.substring(i * 8, (i + 1) * 8);
                    this.Memory[count.toString(2).padStart(17, '0')] = part;
                    count += 1;
                }
            }
        }

        this.Ins_pointer = (Object.values(Instruction_memory).length - 1) * 4
    }

    public GetMemory() {

        const newFormMemory = Object.entries(this.Memory) // CONVERT INTO [KEY, VALUE] FORM
        const littleEndianMemory: { [key: string]: string } = {};
        
        const sortMemory = newFormMemory.sort((a, b) => parseInt(a[0], 10) - parseInt(b[0], 10)) // SORT BY INDEX ([1]-> VALUEVALUE)
        for (let i = 0; i < sortMemory.length; i += 4) {
            let element = ''
            for (let j = 3; j>=0 ; j--) {
                if (i+j < sortMemory.length) element += sortMemory[i+j][1]
            }
            littleEndianMemory [i.toString(2).padStart(17, '0')] = element

        }

        return littleEndianMemory
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
