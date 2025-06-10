import MMU from '../Processor/MMU'
import {handleRegister, mux } from '../Compile/sub_function'
import master_interface from '../Interconnect/Master'
import { dec, stringToAsciiAndBinary, BinToHex } from '../Compile/convert'
import { Keyboard, Logger, Monitor } from '../Compile/soc.d'
import Ecall from '../Ecall/Ecall'
import { FIFO_ChannelA }    from "../Interconnect/FIFO_ChannelA"

import ChannelD from '../Interconnect/ChannelD'
import Cycle from '../Compile/cycle'
import { Key } from 'react'
import { read } from 'fs'
import { hexToBinary } from '~/helpers/converts/Hextobin'
import EventEmitter from '../../EventEmitter/EventEmitter'
// import { measureMemory } from 'vm'
// import { symlink, write } from 'fs'
// import { Console } from 'console'

export default class RiscVProcessor {
    name                        : string
    active                      : boolean
    master_interface            : master_interface
    register                    : { [key: string]: string }
    MMU                         : MMU
    lineColor                   : { [key: string]: string }
    colorCode                   : { [key: string]: string }
    writeReg                    : string
    Processor_messeage          : string
    SendAddress                 : string
    SendData                    : string
    instruction                 : string
    InsLength                   : number

    pre_pc                      = 0
    pc                          = 0
    active_println              : boolean
    FIFO                        = new FIFO_ChannelA()

    public static PROCESSOR_EVENT = {KEY_WAITING: 'KEY_WAITING', KEY_FREE: 'KEY_FREE'}
    event = new EventEmitter ()
    // Ecall                       : Ecall

    ALUOp                       : any
    zero                        : any
    ALUSrc                      : any
    operation                   : any
    jal                         : any
    jalr                        : any
    branch                      : any
    memRead                     : any
    memWrite                    : any
    unsigned                    : any
    memToReg                    : any
    jump                        : any
    regWrite                    : any
    pcSrc1                      : any
    pcSrc2                      : any
    signBit                     : any
    slt                         : any
    auiOrLui                    : any
    wb                          : any
    imm                         : any
    stalled                     : any
    mask                        : string

    logger                     ?: Logger
    monitor                    ?: Monitor
    keyboard                   ?: Keyboard

    Warnning                = 0
    stepDone                = 2
    keyBoard_waiting        : boolean

    state                           : number
    GET_INSTRUCTION           = 0
    RECEIVE_INSTRUCTION       = 1
    PROCESSING                = 2
    ACESS_INTERCONNECT        = 3
    RECEIVE_INTERCONNECT      = 4
    REPLACE_TLBE_DATA        = 5
    REPLACE_TLBE_INS         = 6

    OUT_WORK                  = 7 

    async Controller  (
      cycle               : Cycle
      , InterConnect2CPU  : any
      , ready             : boolean
  ) 
    {

    if (this.state == this.GET_INSTRUCTION)             {

        //########################################################################################
        //#                                                                                      #
        //#This state is an idle state and is used to retrieve instruction data from memory.     #
        //#The address is the Program Counter.                                                   #
        //#This state also checks the available values of the Program Counter.                   #
        //#                                                                                      #
        //########################################################################################
        this.master_interface.ChannelD.ready = '0'
        if (this.pc >= this.InsLength) {
            this.state = this.GET_INSTRUCTION
            if (this.Warnning == 0) {
                this.println (
                    this.active_println
                    ,'Cycle '
                    + cycle.toString() 
                    +': **********THE PROGRAM COUNTER IS OUT OF THE INSTRUCTION MEMORY RANGE.**********'
                )
                this.Warnning = 1
            }
            return
        }   

        if (ready) {
            this.println (
                this.active_println
                ,'Cycle '
                + cycle.toString() 
                +': The PROCESSOR is sending messeage GET to TL-UH.'
            )

            this.MMU.run ((this.pc).toString(2).padStart(32, '0'), 'FETCH')
            this.SendAddress = (this.pc).toString(2).padStart(32, '0')

            if (this.MMU.MMU_message == ' TLB: VPN is missed.') {

                this.println (
                    this.active_println
                    ,'Cycle '
                    + cycle.toString() +':'
                    + this.MMU.MMU_message
                )

                this.println (
                    this.active_println
                    ,'Cycle '
                    + cycle.toString() 
                    +': The PROCESSOR is sending messeage GET to TL-UH.'
                )

                this.println(this.active_println,
                    'Cycle ' 
                    + cycle.toString()  
                    +': Logical_address: ' 
                    +BinToHex((this.pc).toString(2).padStart(32, '0')) 
                    +' -> Physical address: ' 
                    +BinToHex(this.MMU.physical_address)
                )
                
                this.master_interface.ChannelA.valid = '1'
                this.master_interface.send ('GET',  this.MMU.physical_address, this.SendData)
                this.master_interface.ChannelA.valid = '1'
                this.FIFO.enqueue ({...this.master_interface.ChannelA})
                this.state = this.REPLACE_TLBE_INS
            }
            else if (this.MMU.MMU_message == ' ERROR: Page fault!!!!') {

                this.println (
                    this.active_println
                    ,'Cycle '
                    + cycle.toString()
                    + this.MMU.MMU_message
                )

                this.state  = this.OUT_WORK
                this.pc     = this.pc + 4
            }
            else {
                this.master_interface.ChannelA.valid = '1'
                this.master_interface.send ('GET',  (this.pc).toString(2).padStart(17, '0'), this.SendData)

                this.println (
                    this.active_println
                    ,'Cycle '
                    + cycle.toString() + ':'
                    + this.MMU.MMU_message
                )

                this.println(this.active_println,
                    'Cycle ' 
                    + cycle.toString()  
                    +': Logical_address: ' 
                    +BinToHex((this.pc).toString(2).padStart(32, '0')) 
                    +' -> Physical address: ' 
                    +BinToHex(this.MMU.physical_address)
                )
                
                this.master_interface.ChannelA.mask  = '00'
                this.FIFO.enqueue ({...this.master_interface.ChannelA})
                this.state              = this.RECEIVE_INSTRUCTION

            }
        }
        return
    }

    if (this.state == this.RECEIVE_INSTRUCTION)         {

        //#######################################################
        //#                                                     #
        //#This state is the 'Receive Instructions' state.      #
        //#Only when data from the Interconnect is valid,       #
        //#is the processor's instruction register accepted.    #
        //#Next state is Internal Processing state.             #
        //#                                                     #
        //#######################################################

        this.master_interface.ChannelA.valid = '0'
        this.master_interface.ChannelD.ready = '1'
        if (InterConnect2CPU.valid == '1') {
            this.master_interface.receive (InterConnect2CPU)
            this.instruction = this.master_interface.ChannelD.data

            this.println (
                this.active_println
                ,'Cycle '
                + cycle.toString() 
                +': The PROCESSOR is receiving messeage AccessAckData from TL-UH. ('
                +BinToHex (this.master_interface.ChannelD.data)
                +').'
            )
            this.state              = this.PROCESSING
        }
        return
    }

    if (this.state == this.PROCESSING)                  {
        //#######################################################
        //#                                                     #
        //#This state is the 'Receive Instructions' state.      #
        //#Only when data from the Interconnect is valid,       #
        //#is the processor's instruction register accepted.    #
        //#Next state is Internal Processing state.             #
        //#                                                     #
        //#######################################################
        this.master_interface.ChannelA.valid = '0'
        this.master_interface.ChannelD.ready = '0'

        this.println (
            this.active_println
            ,'Cycle '
            + cycle.toString() 
            +': The PROCESSOR is processing.'
        )
        
            let [message, data, logic_address, writeRegister, mask] = this.Datapath (this.instruction, '')
            if (message == 'ECALL') {
                this.println (this.active_println, 'Ecall instruction')
                if (parseInt(this.register['10001'], 2) == 1) {
                    if (this.register['01010'].slice(0,1) == '1') {
                        this.println (this.active_println, 'Register a0:'+ ((4294967296 - parseInt(this.register['01010'], 2))*-1).toString())
                        this.monitor?.println (((4294967296 - parseInt(this.register['01010'], 2))*-1).toString())
                    }
                    else {
                        this.println (this.active_println, 'Register a0:'+ parseInt(this.register['01010'], 2).toString())
                        this.monitor?.println (parseInt(this.register['01010'], 2).toString())
                    }
                }

                if (parseInt(this.register['10001'], 2) == 5) {
                    this.keyBoard_waiting = true
                    this.event.emit(RiscVProcessor.PROCESSOR_EVENT.KEY_WAITING)
                    const ecall_read = new Promise((resolve) => {
                                    this.keyboard?.getEvent().on('line-down', (line: string) => {
                                    this.register['01010']  = parseInt(line).toString(2).padStart(32,'0')
                                    this.keyBoard_waiting   = false
                                    this.event.emit(RiscVProcessor.PROCESSOR_EVENT.KEY_FREE)
                                    resolve(parseInt(line))
                                    })
                                })

                    await ecall_read
                }

                if (parseInt(this.register['10001'], 2) == 12) {

                }


                if (parseInt(this.register['10001'], 2) == 34) {
                    console.log ('Register a0:', '0x'+parseInt(this.register['01010'], 2).toString(16).padStart(8,'0'))
                    this.monitor?.println ('0x'+parseInt(this.register['01010'], 2).toString(16).padStart(8,'0').toString())
                }

                if (parseInt(this.register['10001'], 2) == 35) {
                    console.log ('Register a0:', '0b'+this.register['01010'])
                    this.monitor?.println (this.register['01010'].toString())
                }

                if (parseInt(this.register['10001'], 2) == 36) {
                    console.log ('Register a0:', parseInt(this.register['01010'], 2))
                    this.monitor?.println (parseInt(this.register['01010'], 2).toString())
                }

                if (parseInt(this.register['10001'], 2) == 41) {
                    this.register['01010'] = (Math.floor(Math.random() * Math.pow(2, 32)) & 0xFFFFFFFF).toString(2).padStart(32, '0')
                }
            }
            const access_interconnect = (
                   message == 'PUT' 
                || message == 'GET'
                || message === 'SWAP'
                || message === 'ADD'
                || message === 'MAXU'
                || message === 'MINU'
                || message === 'MAX'
                || message === 'MIN'
                || message === 'OR'
                || message === 'XOR'
                || message === 'AND'
            )

            if (access_interconnect
            ) {
                this.Processor_messeage = message
                this.SendData           = data
                this.SendAddress        = logic_address
                this.writeReg           = writeRegister
                this.mask               = mask
                this.state              = this.ACESS_INTERCONNECT
                this.stepDone           = 0
                
            }
            else {
                this.state      = this.GET_INSTRUCTION
                this.stepDone   = 1
                if (this.pc >= this.InsLength) {
                if (this.Warnning == 0) {
                    this.println (
                        this.active_println
                        ,'Cycle '
                        + cycle.toString() 
                        +': **********THE PROGRAM COUNTER IS OUT OF THE INSTRUCTION MEMORY RANGE.**********'
                    )
                    this.Warnning = 1
                }
            } 
        }
            return
    }

    if (this.state == this.ACESS_INTERCONNECT )         {
        this.master_interface.ChannelD.ready = '0'
        this.MMU.run(this.SendAddress, this.Processor_messeage)
        if (this.MMU.MMU_message == ' ERROR: Page fault!!!!') {

                this.println (
                    this.active_println
                    ,'Cycle '
                    + cycle.toString()+':'
                    + this.MMU.MMU_message
                )

                this.state = this.OUT_WORK

        } else 
        if (ready) {
            

            if (this.Processor_messeage == 'PUT') {
                this.println (
                    this.active_println
                    ,'Cycle '
                    + cycle.toString() 
                    +': The PROCESSOR is sending messeage PUT to TL-UH.'
                )

            }

            if (this.Processor_messeage == 'GET') {
                this.println (
                    this.active_println
                    ,'Cycle '
                    +cycle.toString() 
                    +': The PROCESSOR is sending messeage GET to TL-UH.'

                )
            }

            if (this.Processor_messeage === 'AND'
                || this.Processor_messeage === 'XOR'
                || this.Processor_messeage === 'OR'
                || this.Processor_messeage === 'SWAP'
            ) {
                this.println (
                    this.active_println
                    ,'Cycle '
                    + cycle.toString() 
                    +': The PROCESSOR is sending messeage LogicalData to TL-UH.'
                )
            }

            if (this.Processor_messeage === 'MIN'
                || this.Processor_messeage === 'MAX'
                || this.Processor_messeage === 'MINU'
                || this.Processor_messeage === 'MAXU'
                || this.Processor_messeage === 'ADD'
            ) {
                this.println (
                    this.active_println
                    ,'Cycle '
                    + cycle.toString() 
                    +': The PROCESSOR is sending messeage ArithmeticData to TL-UH.'
                )                  
            }
            
            if (this.MMU.MMU_message == ' TLB: VPN is missed.') {

                this.println (
                    this.active_println
                    ,'Cycle '
                    + cycle.toString() +':'
                    + this.MMU.MMU_message
                )

                this.println (
                    this.active_println
                    ,'Cycle '
                    + cycle.toString() 
                    +': The PROCESSOR is sending messeage GET to TL-UH.'
                )

                this.println(this.active_println,
                    'Cycle ' 
                    + cycle.toString()  
                    +': Logical_address: ' 
                    +BinToHex(this.SendAddress) 
                    +' -> Physical address: ' 
                    +BinToHex(this.MMU.physical_address)
                )
                
                this.master_interface.ChannelA.valid = '1'
                this.master_interface.send ('GET',  this.MMU.physical_address, this.SendData)
                this.master_interface.ChannelA.valid = '1'
                this.FIFO.enqueue ({...this.master_interface.ChannelA})
                this.state = this.REPLACE_TLBE_DATA
            }
            else {
                this.state =  this.RECEIVE_INTERCONNECT 
                this.master_interface.send (this.Processor_messeage,  this.MMU.physical_address, this.SendData)
                if (this.mask == 'sb') this.master_interface.ChannelA.mask = '0001'
                if (this.mask == 'sh') this.master_interface.ChannelA.mask = '0011'
                if (this.mask == 'sw') this.master_interface.ChannelA.mask = '1111'

                this.println (
                    this.active_println
                    ,'Cycle '
                    + cycle.toString()
                    + this.MMU.MMU_message
                )

                this.println(this.active_println,
                    'Cycle ' 
                    + cycle.toString()  
                    +': Logical_address: ' 
                    +BinToHex(this.SendAddress) 
                    +' -> Physical address: ' 
                    +BinToHex(this.MMU.physical_address)
                )
                this.master_interface.ChannelA.valid = '1'
                this.FIFO.enqueue ({...this.master_interface.ChannelA})

            }
        }
        
        return
    }

    if (this.state == this.RECEIVE_INTERCONNECT)        {
        this.master_interface.ChannelA.valid = '0'
        this.master_interface.ChannelD.ready = '1'
        if (InterConnect2CPU.valid == '1') {

            this.master_interface.receive (InterConnect2CPU)

            if (InterConnect2CPU.opcode == '000') {

                this.println (
                    this.active_println
                    ,'Cycle '
                    + cycle.toString() 
                    +': The PROCESSOR is receiving messeage AccessAck from TL-UH.'
                )
                
            }

            if (InterConnect2CPU.opcode == '001') {
                
                this.println (
                    this.active_println
                    ,'Cycle '
                    + cycle.toString() 
                    +': The PROCESSOR is receiving messeage AccessAckData from TL-UH.'
                )

                this.Datapath ('', this.master_interface.ChannelD.data)
                

            }

            this.stepDone = 1
            this.master_interface.receive (InterConnect2CPU)
            this.state =  this.GET_INSTRUCTION
        }
        return
    }
      
    if (this.state == this.REPLACE_TLBE_INS)           {
        this.master_interface.ChannelA.valid = '0'
        this.master_interface.ChannelD.ready = '1'

        if (InterConnect2CPU.valid == '1') {

            this.println (
                this.active_println
                ,'Cycle '
                + cycle.toString() 
                +': The PROCESSOR is receiving messeage AccessAckData from TL-UH.'
            )

            const VPN       = this.SendAddress.slice(0, 20)  
            this.master_interface.receive (InterConnect2CPU)
            const frame     = this.master_interface.ChannelD.data

            this.println (
                this.active_println
                ,'Cycle '
                + cycle.toString() 
                +': The TLB is replacing an entry.'
            )
            // VA, PA, excute, read, write, valid, timetime 
            console.log ('frame', frame)
            this.MMU.pageReplace ([
                parseInt(VPN , 2) & 0x1f
                , (dec (frame) & 0XFFF0) * 4
                , (dec (frame) & 0X0008) /8
                , (dec (frame) & 0X0004) /4
                , (dec (frame) & 0X0002) /2
                , (dec (frame) & 0X0001) 
                , cycle.cycle])

            this.master_interface.ChannelA.valid = '0'
            this.state = this.GET_INSTRUCTION
        }
        return
    }

    if (this.state == this.REPLACE_TLBE_DATA)          {
        this.master_interface.ChannelA.valid = '0'
        this.master_interface.ChannelD.ready = '1'

        if (InterConnect2CPU.valid == '1') {

            this.println (
                this.active_println
                ,'Cycle '
                + cycle.toString() 
                +': The PROCESSOR is receiving messeage AccessAckData from TL-UH.'
            )

            const VPN       = this.SendAddress.slice(0, 20)  
            this.master_interface.receive (InterConnect2CPU)
            const frame     = this.master_interface.ChannelD.data

            this.println (
                this.active_println
                ,'Cycle '
                + cycle.toString() 
                +': The TLB is replacing an entry.'
            )
            // VA, PA, excute, read, write, valid, timetime 
            console.log ('frame', frame)
            this.MMU.pageReplace ([
                parseInt(VPN , 2) & 0x1f
                , (dec (frame) & 0XFFF0) * 4
                , (dec (frame) & 0X0008) /8
                , (dec (frame) & 0X0004) /4
                , (dec (frame) & 0X0002) /2
                , (dec (frame) & 0X0001) 
                , cycle.cycle])

            if (this.MMU.MMU_message == ' ERROR: Page fault!!!!') {
                this.println (
                    this.active_println
                    ,'Cycle '
                    + cycle.toString()+':'
                    + this.MMU.MMU_message
                )
                
                this.state = this.OUT_WORK
                this.master_interface.ChannelA.valid = '0'
            } else {
                this.master_interface.ChannelA.valid = '0'
                this.state = this.ACESS_INTERCONNECT
            }
            
        }
        return
    }
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

    public setLogger(logger: Logger) {
        this.logger = logger
    }

    public setKeyboard(keyboard: Keyboard) {
        this.keyboard       = keyboard
        // this.Processor.Ecall.keyboard = keyboard
    }

    public setMonitor(monitor: Monitor) {
        this.monitor        = monitor
        // this.Processor.Ecall.monitor  = monitor
    } 
    

    constructor(name: string, source: string, active: boolean) {
        this.name                       = name
        this.active                     = active
        this.master_interface                     = new master_interface(name, true, source)
        this.MMU                        = new MMU   (active)
        this.writeReg                   = ''
        this.Processor_messeage         = ''
        this.SendAddress                = ''
        this.SendData                   = ''
        this.instruction                = ''
        this.active_println             = true
        this.InsLength                  = 0
        this.keyBoard_waiting           = false
        this.mask                       = ''
        this.state                      = 0

        // this.Ecall                      = new Ecall ()

        this.colorCode = {
        'orange'  : 'FF8000',
        'red'     : 'FF0000',
        'yellow'  : 'FFFF00',
        'green'   : '00CC00',
        'pink'    : 'FF33FF',
        'blue'    : '3333FF',
        'purple'  : '6600CC',
        'brown'   : '994C00',
        }
        this.lineColor = {
        '0'         : this.colorCode['orange'], 
        '1'         : this.colorCode['red']   , 
        '2'         : this.colorCode['yellow'], 
        '3'         : ''      , 
        '4'         : this.colorCode['green'] , 
        '5'         : this.colorCode['pink']  , 
        '6'         : ''      , 
        '7'         : this.colorCode['green'] , 
        '8'         : this.colorCode['blue']  ,
        '9'         : ''      , 
        '10'        : ''      , 
        '11'        : ''      , 
        '12'        : ''      , 
        '13'        : this.colorCode['brown'] , 
        '14'        : this.colorCode['purple'], 
        '15'        : ''      , 
        '16'        : ''      , 
        '17'        : ''      ,
        'ALUOp'     : ''      ,
        'zero'      : ''      ,
        'ALUSrc'    : ''      ,   
        'operation' : ''      ,   
        'jal'       : ''      ,   
        'jalr'      : ''      ,   
        'branch'    : ''      ,   
        'memRead'   : ''      ,   
        'memWrite'  : ''      ,   
        'unsigned'  : ''      ,   
        'memToReg'  : ''      ,   
        'jump'      : ''      ,   
        'regWrite'  : ''      ,   
        'pcSrc1'    : ''      ,   
        'pcSrc2'    : ''      ,   
        'signBit'   : ''      ,   
        'slt'       : ''      ,   
        'auiOrLui'  : ''      ,   
        'wb'        : ''      ,   
        'imm'       : ''      ,   
        };  
        this.register = {
        '00000': '00000000000000000000000000000000',
        '00001': '00000000000000000000000000000000',
        '00010': '00000000000000000000000000000000',
        '00011': '00000000000000000000000000000000',
        '00100': '00000000000000000000000000000000',
        '00101': '00000000000000000000000000000000',
        '00110': '00000000000000000000000000000000',
        '00111': '00000000000000000000000000000000',
        '01000': '00000000000000000000000000000000',
        '01001': '00000000000000000000000000000000',
        '01010': '00000000000000000000000000000000',
        '01011': '00000000000000000000000000000000',
        '01100': '00000000000000000000000000000000',
        '01101': '00000000000000000000000000000000',
        '01110': '00000000000000000000000000000000',
        '01111': '00000000000000000000000000000000',
        '10000': '00000000000000000000000000000000',
        '10001': '00000000000000000000000000000000',
        '10010': '00000000000000000000000000000000',
        '10011': '00000000000000000000000000000000',
        '10100': '00000000000000000000000000000000',
        '10101': '00000000000000000000000000000000',
        '10110': '00000000000000000000000000000000',
        '10111': '00000000000000000000000000000000',
        '11000': '00000000000000000000000000000000',
        '11001': '00000000000000000000000000000000',
        '11010': '00000000000000000000000000000000',
        '11011': '00000000000000000000000000000000',
        '11100': '00000000000000000000000000000000',
        '11101': '00000000000000000000000000000000',
        '11110': '00000000000000000000000000000000',
        '11111': '00000000000000000000000000000000',
        }
        this.jal = 0
        this.jalr = 0
        this.branch = '000'
        this.auiOrLui = 0
        this.wb = 0
        this.memToReg = 0
        this.unsigned = 0
        this.memRead = '000'
        this.memWrite = '000'
        this.ALUSrc = 0
        this.regWrite = 0
        this.ALUOp = 'z'
        this.slt = 0
        this.pc = 0
        this.stalled = false
    }

    public getRegisters() {
        return handleRegister(this.register)
    }

    public reset(): void {
        this.register = {
            '00000': '00000000000000000000000000000000',
            '00001': '00000000000000000000000000000000',
            '00010': '00000000000000000000000000000000',
            '00011': '00000000000000000000000000000000',
            '00100': '00000000000000000000000000000000',
            '00101': '00000000000000000000000000000000',
            '00110': '00000000000000000000000000000000',
            '00111': '00000000000000000000000000000000',
            '01000': '00000000000000000000000000000000',
            '01001': '00000000000000000000000000000000',
            '01010': '00000000000000000000000000000000',
            '01011': '00000000000000000000000000000000',
            '01100': '00000000000000000000000000000000',
            '01101': '00000000000000000000000000000000',
            '01110': '00000000000000000000000000000000',
            '01111': '00000000000000000000000000000000',
            '10000': '00000000000000000000000000000000',
            '10001': '00000000000000000000000000000000',
            '10010': '00000000000000000000000000000000',
            '10011': '00000000000000000000000000000000',
            '10100': '00000000000000000000000000000000',
            '10101': '00000000000000000000000000000000',
            '10110': '00000000000000000000000000000000',
            '10111': '00000000000000000000000000000000',
            '11000': '00000000000000000000000000000000',
            '11001': '00000000000000000000000000000000',
            '11010': '00000000000000000000000000000000',
            '11011': '00000000000000000000000000000000',
            '11100': '00000000000000000000000000000000',
            '11101': '00000000000000000000000000000000',
            '11110': '00000000000000000000000000000000',
            '11111': '00000000000000000000000000000000',
        }
        this.pc = 0
        this.state = 0
        this.FIFO = new FIFO_ChannelA()
    }

    ALU(operand1: any, operand2: any, operation: string): string {
        this.zero = 0
        this.signBit = 0
        let ALUResult: any 
        if (operation == 'z') { 
            return '0'
        }

        operand1 = dec(operand1)
        operand2 = dec(operand2)

        if (operation[0] === '1' && this.ALUOp === '11') {
            operand1 = Math.abs(operand1)
        }

        if (operation[0] === '1' && this.ALUOp !== '11') {
            operand1 = Math.abs(operand1)
            operand2 = Math.abs(operand2)
        }
        const signOperand1 = operand1 < 0 ? 1 : 0
        switch (operation.slice(1)) {
            case '000':
                ALUResult = operand1 & operand2
                break
            case '001':
                ALUResult = operand1 | operand2
                break
            case '010':
                ALUResult = operand1 ^ operand2
                break
            case '011':
                ALUResult = operand1 + operand2
                break
            case '100':
                ALUResult = operand1 - operand2
                break
            case '101':
                operand2 = operand2 & 31
                ALUResult = operand1 << operand2
                break
            case '110':
                ALUResult = operand1 >> operand2
                break
            case '111':

                if (operand1 < 0) operand1 = 0x100000000 + operand1
                ALUResult = signOperand1
                    ? dec((operand1 >>> operand2).toString(2).padStart(32, '1'))
                    : dec((operand1 >> operand2).toString(2).padStart(32, '0'))
                break
        }

        if (ALUResult === 0) this.zero = 1



        if (ALUResult< 0) {
            this.signBit = 1
            ALUResult = (4294967296) + ALUResult
        } 


        ALUResult = ALUResult.toString(2)

        
        if (ALUResult[0] === '-') ALUResult = ALUResult.slice(3).padStart(32, '1')
        if (ALUResult[0] === '0') ALUResult = ALUResult.slice(2).padStart(32, '0')
        return ALUResult
    }

    dataGen(readData: string, unsigned: number): string {
        if (unsigned === 0 && readData !== '') {
            readData = readData.padStart(32, readData[0])
        }
        if (unsigned === 1 && readData !== '') {
            readData = readData.padStart(32, '0')
        }
        return readData
    }

    immGen(instruction: string): string {
        let imm = ''

        if (instruction.slice(-7) === '0110011') {
            // R-type
            return '0'
        }
       
        if (['0010011', '0000011', '1100111'].includes(instruction.slice(-7))) {
            // I-TYPE
            this.imm = instruction.slice(0, 12)
            if (instruction.slice(-15, -12) === '101') return instruction.slice(7, 12).padStart (32,'0')
            if (instruction.slice(-15, -12) === '011') return this.imm.padStart(32, '0')
        }
        
        if (instruction.slice(-7) === '0100011') {
            // S-TYPE
            this.imm = instruction.slice(0, 7) + instruction.slice(20, 25)
        }
        if (instruction.slice(-7) === '1100011') {
            // B-TYPE
            this.imm =
                instruction[0] +
                instruction[24] +
                instruction.slice(1, 7) +
                instruction.slice(20, 24)
        }
        if (instruction.slice(-7) === '1101111') {
            // J-TYPE
            this.imm =
                instruction[0] +
                instruction.slice(12, 20) +
                instruction[11] +
                instruction.slice(1, 11)
        }
        
        if (['0110111', '0010111'].includes(instruction.slice(-7))) {
            // U-TYPE
            this.imm = instruction.slice(0, 20)
        }

        if (instruction.slice(-7) == '0101111') return this.imm = ''.padStart(32, '0')
        if (['0110111', '0010111'].includes(instruction.slice(-7))) {
            return this.imm.padStart(32, '0')
        } else {
            return this.imm.padStart(32, this.imm[0])
        }
        
    }

    control(opcode: string, funct3: string): void {
        switch (opcode) {
            case '0110011': // R-type
                this.jal = 0
                this.jalr = 0
                this.branch = '000'
                this.auiOrLui = 0
                this.wb = 0
                this.memToReg = 0
                this.unsigned = 0
                this.memRead = '000'
                this.memWrite = '000'
                this.ALUSrc = 0
                this.regWrite = 1
                this.ALUOp = '10'
                if (funct3 === '010' || funct3 === '011') this.slt = 1
                else this.slt = 0
                break
            case '1100011': // BEQ
                this.jal = 0
                this.jalr = 0
                this.auiOrLui = 0
                this.wb = 0
                this.memToReg = 0
                this.unsigned = 0
                this.memRead = '000'
                this.memWrite = '000'
                this.ALUSrc = 0
                this.regWrite = 0
                this.ALUOp = '01'
                this.slt = 0
                switch (funct3) {
                    case '000':
                        this.branch = '100' // BEQ
                        break
                    case '001':
                        this.branch = '101' // BNE
                        break
                    case '100':
                        this.branch = '110' // BLT
                        break
                    case '101':
                        this.branch = '111' // BGE
                        break
                    case '110':
                        this.branch = '110' // BLTU
                        break
                    case '111':
                        this.branch = '111' // BGEU
                        break
                }
                break
            case '0000011': // LOAD
                this.jal = 0
                this.jalr = 0
                this.branch = '000'
                this.auiOrLui = 0
                this.wb = 0
                this.memToReg = 1
                this.unsigned = +funct3[0]
                this.memRead = '1' + funct3.slice(1)
                this.memWrite = '000'
                this.ALUSrc = 1
                this.regWrite = 1
                this.ALUOp = '00'
                this.slt = 0
                break
            case '0100011': // STORE
                this.jal = 0
                this.jalr = 0
                this.branch = '000'
                this.auiOrLui = 0
                this.wb = 0
                this.memToReg = 0
                this.unsigned = +funct3[0]
                this.memRead = '000'
                this.memWrite = '1' + funct3.slice(1)
                this.ALUSrc = 1
                this.regWrite = 0
                this.ALUOp = '00'
                this.slt = 0
                break
            case '0010011': // I-FORMAT
                this.jal = 0
                this.jalr = 0
                this.branch = '000'
                this.auiOrLui = 0
                this.wb = 0
                this.memToReg = 0
                this.unsigned = 0
                this.memRead = '000'
                this.memWrite = '000'
                this.ALUSrc = 1
                this.regWrite = 1
                this.ALUOp = '11'
                if (funct3 === '010' || funct3 === '011') this.slt = 1
                else this.slt = 0
                break
            case '1100111': // this.JALR
                this.jal = 0
                this.jalr = 1
                this.branch = '000'
                this.auiOrLui = 0
                this.wb = 0
                this.memToReg = 0
                this.unsigned = 0
                this.memRead = '000'
                this.memWrite = '000'
                this.ALUSrc = 1
                this.regWrite = 1
                this.ALUOp = '00'
                this.slt = 0
                break
            case '1101111': // this.JAL
                this.jal = 1
                this.jalr = 0
                this.branch = '000'
                this.auiOrLui = 0
                this.wb = 0
                this.memToReg = 0
                this.unsigned = 0
                this.memRead = '000'
                this.memWrite = '000'
                this.ALUSrc = 0
                this.regWrite = 1
                this.ALUOp = 'z'
                this.slt = 0
                break
            case '0110111': // LUI
                this.jal = 0
                this.jalr = 0
                this.branch = '000'
                this.auiOrLui = 1
                this.wb = 1
                this.memToReg = 0
                this.unsigned = 0
                this.memRead = '000'
                this.memWrite = '000'
                this.ALUSrc = 0
                this.regWrite = 1
                this.ALUOp = 'z'
                this.slt = 0
                break
            case '0010111': // AUIPC
                this.jal = 0
                this.jalr = 0
                this.branch = '000'
                this.auiOrLui = 0
                this.wb = 1
                this.memToReg = 0
                this.unsigned = 0
                this.memRead = '000'
                this.memWrite = '000'
                this.ALUSrc = 0
                this.regWrite = 1
                this.ALUOp = 'z'
                this.slt = 0
                break
        }
    }

    aluControl(ALUOp: string, funct3: string, funct7: string): void {
        switch (ALUOp) {
            case '00': // LOAD and STORE and JALR
                this.operation = '0011'
                break
            case '01': // BRANCH
                if (['000', '001', '100', '101'].includes(funct3)) {
                    this.operation = '0100'
                } else if (['110', '111'].includes(funct3)) {
                    this.operation = '1100'
                }
                break
            case '10': // R-TYPE
                switch (funct3) {
                    case '000':
                        this.operation = funct7 === '0' ? '0011' : '0100'
                        break
                    case '001':
                        this.operation = '0101'
                        break
                    case '010':
                        this.operation = '0100'
                        break
                    case '011':
                        this.operation = '1100'
                        break
                    case '100':
                        this.operation = '0010'
                        break
                    case '101':
                        this.operation = funct7 === '0' ? '0110' : '0111'
                        break
                    case '110':
                        this.operation = '0001'
                        break
                    case '111':
                        this.operation = '0000'
                        break
                }
                break
            case '11': // I-TYPE
                switch (funct3) {
                    case '000':
                        this.operation = '0011' // ADDI
                        break
                    case '001':
                        this.operation = '0101' // SLLI
                        break
                    case '010':
                        this.operation = '0100' // SLTI
                        break
                    case '011':
                        this.operation = '1100' // SLTIU
                        break
                    case '100':
                        this.operation = '0010' // XORI
                        break
                    case '101': // SRLI OR SRAI
                        this.operation = funct7 === '0' ? '0110' : '0111'
                        break
                    case '110':
                        this.operation = '0001' // ORI
                        break
                    case '111':
                        this.operation = '0000' // ANDI
                        break
                }
                break
            case 'z':
                this.operation = 'z'
                break
        }
    }

    branchControl(jal: number, jalr: number, branch: string): void {
        if (jal === 1) {
            this.jump = 1
            this.pcSrc1 = 1
            this.pcSrc2 = 0
            return
        }
        if (jalr === 1) {
            this.jump = 1
            this.pcSrc1 = 0
            this.pcSrc2 = 1
            return
        }
        if (branch === '000') {
            this.pcSrc1 = 0
            this.pcSrc2 = 0
            this.jump = 0
            return
        }

        if (branch[0] === '1') {
            switch (branch) {
                case '100': // beq
                    if (this.zero === 1) {
                        this.pcSrc1 = 1
                        this.pcSrc2 = 0
                        this.jump = 0
                    } else {
                        this.pcSrc1 = 0
                        this.pcSrc2 = 0
                        this.jump = 0
                    }
                    break
                case '101': // bne
                    if (this.zero === 0) {
                        this.pcSrc1 = 1
                        this.pcSrc2 = 0
                        this.jump = 0
                    } else {
                        this.pcSrc1 = 0
                        this.pcSrc2 = 0
                        this.jump = 0
                    }
                    break
                case '110': // blt
                    if (this.signBit === 1) {
                        this.pcSrc1 = 1
                        this.pcSrc2 = 0
                        this.jump = 0
                    } else {
                        this.pcSrc1 = 0
                        this.pcSrc2 = 0
                        this.jump = 0
                    }
                    break
                case '111': // bge
                    if (this.signBit === 0) {
                        this.pcSrc1 = 1
                        this.pcSrc2 = 0
                        this.jump = 0
                    } else {
                        this.pcSrc1 = 0
                        this.pcSrc2 = 0
                        this.jump = 0
                    }
                    break
            }
        }
    }

    Datapath (instruction: string, readData: string): [string, string, string, string, string] {

        if (instruction != '') {
            this.stalled = false 
            let readData = ''

            if (instruction == '00000000000000000000000001110011') {
                {
                    this.pc = this.pc + 4
                }
                    
                return ['ECALL', '', '', '', '']
            }
            
            if (instruction.slice(25, 32) == '1110011') {
                const readRegister1 = instruction.slice(12, 17)
                const writeRegister = instruction.slice(20, 25)
                const readRegister2 = instruction.slice(7, 12)
                this.register[writeRegister] = this.MMU.satp.toString(2).padStart(32,'0')
                this.register['00000']       = '0'.padStart(32,'0')
                this.MMU.satp                = parseInt ('0'+this.register[readRegister1], 2)
                this.pc = this.pc + 4
                return ['','','','','']
            }
            this.control(instruction.slice(25, 32), instruction.slice(17, 20))

            let mask = 'none'
            if (instruction.slice(25, 32) === '0000011')
                switch (instruction.slice(17, 20)) {
                    case '000':
                        mask = 'lb'
                        break
                    case '001':
                        mask = 'lh'
                        break
                    case '010':
                        mask = 'lw'
                        break
                    case '100':
                        mask = 'lbu'
                        break
                    case '101':
                        mask = 'lhu'
                        break
                    default:
                        break
                }

            if (instruction.slice(25, 32) === '0100011')
                switch (instruction.slice(17, 20)) {
                    case '000': //Load
                        mask = 'sb'
                        break
                    case '001': //Store
                        mask = 'sh'
                        break
                    case '010': //Load
                        mask = 'sw'
                        break
                    default:
                        break
                }
            const readRegister1 = instruction.slice(12, 17)
            const readRegister2 = instruction.slice(7, 12)
            const writeRegister = instruction.slice(20, 25)
            const readData1 = this.register[readRegister1]
            const readData2 = this.register[readRegister2]

            const imm = this.immGen(instruction)
            
            this.aluControl(this.ALUOp, instruction.slice(17, 20), instruction.slice(1,2))
            const ALUResult = this.ALU(readData1, mux(readData2, imm, this.ALUSrc), this.operation)
                

            this.branchControl(this.jal, this.jalr, this.branch)

            let message = 'None'
            let data = '0'
            let address = ''
            
            
            if (instruction.slice(25, 32) === '0100011') {
                // SW
                message = 'PUT'
                data = readData2
                address = ALUResult.padStart(32,'0')
            }
            if (instruction.slice(25, 32) === '0000011') {
                // LW
                message = 'GET'
                data = ''
                address = ALUResult.padStart(32,'0')
            }
            
            if (instruction.slice(25, 32) == '0101111') {
                const funct7 = instruction.slice(0,7)
                if (funct7  ==  '0000111') {
                    message = 'SWAP'
                    data = readData2
                    address = readData1
                } 

                if (funct7  ==   '0000011') {
                    message = 'ADD'
                    data = readData2
                    address = readData1
                }

                if (funct7  ==   '0010011') {
                    message = 'XOR'
                    data = readData2
                    address = readData1
                }

                if (funct7  ==   '0011111') {
                    message = 'AND'
                    data = readData2
                    address = readData1
                }

                if (funct7  ==    '0011011') {
                    message = 'OR'
                    data = readData2
                    address = readData1
                }

                if (funct7  ==   '0100011') {
                    message = 'MIN'
                    data = readData2
                    address = readData1
                }

                if (funct7  ==   '0100111') {
                    message = 'MAX'
                    data = readData2
                    address = readData1
                }

                if (funct7  ==  '0110011') {
                    message = 'MINU'
                    data = readData2
                    address = readData1
                }

                if (funct7  ==  '0110111') {
                    message = 'MAXU'
                    data = readData2
                    address = readData1
                }
                // return [message, data, address, writeRegister, mask]
            }


                // readData = this.dataMemory(ALUResult, this.memRead, this.memWrite, readData2)

            readData = ''
            let writeDataR = mux(
                mux(
                    mux(
                        mux(ALUResult, readData, this.memToReg),
                        (this.pc+4).toString(2).padStart(32, '0'),
                        this.jump,
                    ),
                    mux(
                        '00000000000000000000000000000000',
                        '00000000000000000000000000000001',
                        this.signBit,
                    ),
                    this.slt,
                ),
                mux(
                    (parseInt (imm,2) * 4096 + this.pc).toString(2).padStart(32, '0'),
                    (parseInt (imm,2) * 4096).toString(2).padStart(32, '0'),
                    this.auiOrLui,
                ),
                this.wb,
            )
            writeDataR = writeDataR.padStart(32, '0')
            if (this.regWrite === 1) {
                this.register[writeRegister] = writeDataR
            }

            this.register['00000'] = '00000000000000000000000000000000'
            
            this.pc     = mux(mux(this.pc + 4, (dec(imm) << 1) + this.pc, this.pcSrc1), dec ('0'+ALUResult), this.pcSrc2)
            
            this.lineColor['3']         = mux(this.lineColor['2'], this.lineColor['1'], this.ALUSrc);
            this.lineColor['6']         = mux(this.lineColor['0'], this.lineColor['4'], this.pcSrc1);
            this.lineColor['9']         = mux(this.lineColor['6'], this.lineColor['5'], this.pcSrc2);
            this.lineColor['10']        = mux(this.lineColor['5'], this.lineColor['8'], this.memToReg);
            this.lineColor['11']        = mux(this.lineColor['10'], this.lineColor['0'], this.jump);
            this.lineColor['12']        = mux(this.lineColor['14'], this.lineColor['13'], this.signBit);
            this.lineColor['15']        = mux(this.lineColor['11'], this.lineColor['12'], this.slt);
            this.lineColor['16']        = mux(this.lineColor['7'], this.lineColor['1'], this.auiOrLui);
            this.lineColor['17']        = mux(this.lineColor['15'], this.lineColor['16'], this.wb);
            this.lineColor['ALUOp'   ]  = this.ALUOp        .toString()   
            this.lineColor['zero'    ]  = this.zero         .toString()      
            this.lineColor['ALUSrc'  ]  = this.ALUSrc       .toString()      
            this.lineColor['operation'] = this.operation    .toString()  
            this.lineColor['jal'     ]  = this.jal          .toString()         
            this.lineColor['jalr'    ]  = this.jalr         .toString()        
            this.lineColor['branch'  ]  = this.branch       .toString()       
            this.lineColor['memRead' ]  = this.memRead      .toString()      
            this.lineColor['memWrite']  = this.memWrite     .toString()     
            this.lineColor['unsigned']  = this.unsigned     .toString()     
            this.lineColor['memToReg']  = this.memToReg     .toString()     
            this.lineColor['jump'    ]  = this.jump         .toString()         
            this.lineColor['regWrite']  = this.regWrite     .toString()    
            this.lineColor['pcSrc1'  ]  = this.pcSrc1       .toString()       
            this.lineColor['pcSrc2'  ]  = this.pcSrc2       .toString()      
            this.lineColor['signBit' ]  = this.signBit      .toString()     
            this.lineColor['slt'     ]  = this.slt          .toString()          
            this.lineColor['auiOrLui']  = this.auiOrLui     .toString()     
            this.lineColor['wb'      ]  = this.wb           .toString()           
            this.lineColor['imm'     ]  = this.imm          .toString()     
            return [message, data, address, writeRegister, mask]
        } else {
            if (readData != '') {
                if (this.mask == 'lb') 
                    this.register[this.writeReg] =  readData.slice(24,32).padStart(32, readData.slice(24,25))
                else if (this.mask == 'lbu')
                    this.register[this.writeReg] =  readData.slice(24,32).padStart(32, '0')
                else if (this.mask == 'lh')
                    this.register[this.writeReg] =  readData.slice(16,32).padStart(32, readData.slice(16,17))
                else if (this.mask == 'lhu')
                    this.register[this.writeReg] =  readData.slice(16,32).padStart(32, '0')
                else if (this.mask == 'lw') 
                    this.register[this.writeReg] =  readData
                else 
                    this.register[this.writeReg] =  readData
            }
            return ['', '', '', '', '']
        }
        

    }
}
