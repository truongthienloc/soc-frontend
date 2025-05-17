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
    
    RECEIVE_AMO_STATE    = 5

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
        let Int2Memory_ = Int2Memory.peek()
        if (this.state == this.IDLE_STATE)                          {
            Int2Memory_ = Int2Memory.dequeue ()
            this.burst              = []
            this.slaveMemory.ChannelD.valid = '0'
            this.slaveMemory.ChannelA.ready = '1'

            if (Int2Memory_.valid == '1') {
                this.slaveMemory.ChannelD.valid = '1'
                if (Int2Memory_.opcode == '100' ) this.state = this.RECEIVE_GET_STATE
                if (Int2Memory_.opcode == '010'
                || Int2Memory_.opcode == '011'  ) this.state = this.RECEIVE_AMO_STATE
                if (Int2Memory_.opcode == '000' ) this.state = this.RECEIVE_PUT_STATA
            }
        }

        if (this.state == this.RECEIVE_GET_STATE)          {
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

        if (this.state == this.RECEIVE_AMO_STATE)          {
            this.slaveMemory.ChannelD.valid = '0'
            this.slaveMemory.receive (Int2Memory_)
            this.println (this.active_println,
                            'Cycle '             +
                            cycle.toString()     +
                            ': The MEMORY is receiving ArithmeticData message from the INTERCONNECT.'
                            )
            this.slaveMemory.receive (Int2Memory_)
            this.state = this.SEND_ACCESSACKDATA_STATE
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

                    if (this.slaveMemory.ChannelA.opcode == '011') {
                        if (this.slaveMemory.ChannelA.param == '000') {
                            let memory_data = 
                            this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 3).toString(2).padStart(17, '0')] + 
                            this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 2).toString(2).padStart(17, '0')] +
                            this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 1).toString(2).padStart(17, '0')] +
                            this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 0).toString(2).padStart(17, '0')]

                            let access_data = this.slaveMemory.ChannelA.data
                            let mdata       = BigInt('0b' + memory_data);
                            let adata       = BigInt('0b' + access_data);
                            let result      = (mdata ^ adata).toString(2).padStart(32, '0')

                            this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 3).toString(2).padStart(17, '0')] = result.slice(0, 8)
                            this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 2).toString(2).padStart(17, '0')] = result.slice(8, 16)
                            this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 1).toString(2).padStart(17, '0')] = result.slice(16, 23)
                            this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 0).toString(2).padStart(17, '0')] = result.slice(23, 32)
                        }

                        if (this.slaveMemory.ChannelA.param == '001') {
                            let memory_data = 
                            this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 3).toString(2).padStart(17, '0')] + 
                            this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 2).toString(2).padStart(17, '0')] +
                            this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 1).toString(2).padStart(17, '0')] +
                            this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 0).toString(2).padStart(17, '0')]

                            let access_data = this.slaveMemory.ChannelA.data
                            let mdata       = BigInt('0b' + memory_data);
                            let adata       = BigInt('0b' + access_data);
                            let result      = (mdata | adata).toString(2).padStart(32, '0')

                            this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 3).toString(2).padStart(17, '0')] = result.slice(0, 8)
                            this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 2).toString(2).padStart(17, '0')] = result.slice(8, 16)
                            this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 1).toString(2).padStart(17, '0')] = result.slice(16, 23)
                            this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 0).toString(2).padStart(17, '0')] = result.slice(23, 32)
                        }

                        if (this.slaveMemory.ChannelA.param == '010') {
                            let memory_data = 
                            this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 3).toString(2).padStart(17, '0')] + 
                            this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 2).toString(2).padStart(17, '0')] +
                            this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 1).toString(2).padStart(17, '0')] +
                            this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 0).toString(2).padStart(17, '0')]

                            let access_data = this.slaveMemory.ChannelA.data
                            let mdata       = BigInt('0b' + memory_data);
                            let adata       = BigInt('0b' + access_data);
                            let result      = (mdata & adata).toString(2).padStart(32, '0')

                            this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 3).toString(2).padStart(17, '0')] = result.slice(0, 8)
                            this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 2).toString(2).padStart(17, '0')] = result.slice(8, 16)
                            this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 1).toString(2).padStart(17, '0')] = result.slice(16, 23)
                            this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 0).toString(2).padStart(17, '0')] = result.slice(23, 32)
                        }

                        if (this.slaveMemory.ChannelA.param == '011') {
                            let result      = (BigInt('0b' + this.slaveMemory.ChannelA.data)).toString(2).padStart(32, '0')
                            this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 3).toString(2).padStart(17, '0')] = result.slice(0, 8)
                            this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 2).toString(2).padStart(17, '0')] = result.slice(8, 16)
                            this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 1).toString(2).padStart(17, '0')] = result.slice(16, 23)
                            this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 0).toString(2).padStart(17, '0')] = result.slice(23, 32)
                        }
                    }

                    if (this.slaveMemory.ChannelA.opcode == '010') {
                        if (this.slaveMemory.ChannelA.param == '000') {
                            let memory_data = 
                            this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 3).toString(2).padStart(17, '0')] + 
                            this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 2).toString(2).padStart(17, '0')] +
                            this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 1).toString(2).padStart(17, '0')] +
                            this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 0).toString(2).padStart(17, '0')]

                            let access_data = this.slaveMemory.ChannelA.data

                            let mdata       = dec(memory_data)
                            let adata       = dec(access_data)
                            let result      = (((mdata > adata) ? adata : mdata) < 0
                                                ? 0x100000000 + ((mdata > adata) ? adata : mdata) 
                                                : ((mdata > adata) ? adata : mdata)).toString(2).padStart(32, '0')



                            this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 3).toString(2).padStart(17, '0')] = result.slice(0, 8)
                            this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 2).toString(2).padStart(17, '0')] = result.slice(8, 16)
                            this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 1).toString(2).padStart(17, '0')] = result.slice(16, 23)
                            this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 0).toString(2).padStart(17, '0')] = result.slice(23, 32)
                        }

                        if (this.slaveMemory.ChannelA.param == '001') {
                            let memory_data = 
                            this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 3).toString(2).padStart(17, '0')] + 
                            this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 2).toString(2).padStart(17, '0')] +
                            this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 1).toString(2).padStart(17, '0')] +
                            this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 0).toString(2).padStart(17, '0')]

                            let access_data = this.slaveMemory.ChannelA.data
                            let mdata       = dec(memory_data)
                            let adata       = dec(access_data)
                            let result      = (((mdata > adata) ? mdata : adata) < 0
                                                ? 0x100000000 + ((mdata > adata) ? mdata : adata) 
                                                : ((mdata > adata) ? mdata : adata)).toString(2).padStart(32, '0')

                            this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 3).toString(2).padStart(17, '0')] = result.slice(0, 8)
                            this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 2).toString(2).padStart(17, '0')] = result.slice(8, 16)
                            this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 1).toString(2).padStart(17, '0')] = result.slice(16, 23)
                            this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 0).toString(2).padStart(17, '0')] = result.slice(23, 32)
                        }

                        if (this.slaveMemory.ChannelA.param == '010') {
                            let memory_data = 
                            this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 3).toString(2).padStart(17, '0')] + 
                            this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 2).toString(2).padStart(17, '0')] +
                            this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 1).toString(2).padStart(17, '0')] +
                            this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 0).toString(2).padStart(17, '0')]

                            let access_data = this.slaveMemory.ChannelA.data
                            let mdata       = dec('0'+memory_data)
                            let adata       = dec('0'+access_data)
                            let result      = ((mdata > adata) ? adata : mdata).toString(2).padStart(32, '0')

                            this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 3).toString(2).padStart(17, '0')] = result.slice(0, 8)
                            this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 2).toString(2).padStart(17, '0')] = result.slice(8, 16)
                            this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 1).toString(2).padStart(17, '0')] = result.slice(16, 23)
                            this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 0).toString(2).padStart(17, '0')] = result.slice(23, 32)
                        }

                        if (this.slaveMemory.ChannelA.param == '011') {
                            let memory_data = 
                            this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 3).toString(2).padStart(17, '0')] + 
                            this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 2).toString(2).padStart(17, '0')] +
                            this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 1).toString(2).padStart(17, '0')] +
                            this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 0).toString(2).padStart(17, '0')]

                            let access_data = this.slaveMemory.ChannelA.data
                            let mdata       = dec('0'+memory_data)
                            let adata       = dec('0'+access_data)
                            let result      = ((mdata > adata) ? mdata : adata).toString(2).padStart(32, '0')

                            this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 3).toString(2).padStart(17, '0')] = result.slice(0, 8)
                            this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 2).toString(2).padStart(17, '0')] = result.slice(8, 16)
                            this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 1).toString(2).padStart(17, '0')] = result.slice(16, 23)
                            this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 0).toString(2).padStart(17, '0')] = result.slice(23, 32)
                        }

                        if (this.slaveMemory.ChannelA.param == '100') {
                            let memory_data = 
                            this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 3).toString(2).padStart(17, '0')] + 
                            this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 2).toString(2).padStart(17, '0')] +
                            this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 1).toString(2).padStart(17, '0')] +
                            this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 0).toString(2).padStart(17, '0')]

                            let access_data = this.slaveMemory.ChannelA.data
                            let mdata       = dec('0'+memory_data)
                            let adata       = dec('0'+access_data)
                            let result      = ( mdata + adata).toString(2).padStart(32, '0')

                            this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 3).toString(2).padStart(17, '0')] = result.slice(0, 8)
                            this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 2).toString(2).padStart(17, '0')] = result.slice(8, 16)
                            this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 1).toString(2).padStart(17, '0')] = result.slice(16, 23)
                            this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 0).toString(2).padStart(17, '0')] = result.slice(23, 32)
                        }
                    }
                    
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
        
        if (this.state == this.RECEIVE_PUT_STATA)          {
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

        if (this.state ==  this.SEND_ACCESSACK_STATE)      {
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
                if (this.slaveMemory.ChannelA.mask.slice(0,1)=='1')
                    this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 3).toString(2).padStart(17, '0')] = this.slaveMemory.ChannelA.data.slice(0,8)
                if (this.slaveMemory.ChannelA.mask.slice(1,2)=='1') 
                this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 2).toString(2).padStart(17, '0')] = this.slaveMemory.ChannelA.data.slice(8,16)
                if (this.slaveMemory.ChannelA.mask.slice(2,3)=='1')
                    this.Memory[(parseInt(this.slaveMemory.ChannelA.address, 2) + 1).toString(2).padStart(17, '0')] = this.slaveMemory.ChannelA.data.slice(16,24)
                if (this.slaveMemory.ChannelA.mask.slice(3,4)=='1') 
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

    public reset(){
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

    public SetDataMemory (Data_memory: string[][] ){
        const data_base_addr = 0x4000
        let count            = 0
        for (let i = 0; i < Data_memory.length; i++) {
            for (let j = 0; j < Data_memory[i].length; j++) {

                this.Memory[(data_base_addr + count + 0).toString(2).padStart(17, '0')] = Data_memory[i][j].slice(24, 32)
                this.Memory[(data_base_addr + count + 1).toString(2).padStart(17, '0')] = Data_memory[i][j].slice(16, 24)
                this.Memory[(data_base_addr + count + 2).toString(2).padStart(17, '0')] = Data_memory[i][j].slice(8, 16)
                this.Memory[(data_base_addr + count + 3).toString(2).padStart(17, '0')] = Data_memory[i][j].slice(0, 8)
                count +=4
            }
        }
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
    
}
