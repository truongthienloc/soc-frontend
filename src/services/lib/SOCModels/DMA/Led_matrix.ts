import slave_interface from "../Interconnect/Slave"
import ChannelA from "../Interconnect/ChannelA"
import LedMatrix from '../../control/LedMatrix'
import Cycle from '../Compile/cycle'
import {Logger }            from '../Compile/soc.d'

export default class LEDMatrix {

    controlRegister : string
    dataRegisters   : string[]

    slave_interface    : slave_interface
    logger         ?: Logger
    active_println  : boolean
    led            ?: LedMatrix
    count_beats     = 0
    ready           : boolean


    state           : number
    REC_state       = 0
    Ack_state       = 1
    AckData_state   = 2

    constructor() {
        this.controlRegister            = '00000000000000000000000000000000'
        this.dataRegisters              = Array(288).fill('00000000000000000000000000000000')
        this.slave_interface               = new slave_interface('slave_interface', true)
        this.slave_interface.ChannelD.sink = '1'
        this.active_println             = true
        this.ready                      = false
        this.state                      = 0


        // this.led                        = new LedMatrix ('.led-matrix')

    }

    public setLogger(logger: Logger) {
        this.logger = logger
    }

    public reset () {
        this.controlRegister            = '00000000000000000000000000000000'
        this.dataRegisters              = Array(288).fill('00000000000000000000000000000000')
        this.slave_interface               = new slave_interface('slave_interface', true)
        this.slave_interface.ChannelD.sink = '1'
        this.state           = 0
        this.ready                      = false
        this.active_println             = true
        // this.led                        = new LedMatrix ('.led-matrix')
        for (let i = 0 ; i< 96 ; i++) {
            for (let j =0; j< 96; j++)
            {
                this.led?.turnOff(i,j)
            }
        }
        // this.led?.clear()
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

    public Controller (
        data_from_sub_interconnect: ChannelA
        , cycle : Cycle
        , ready : boolean
    ) {

        if (this.state == this.REC_state) {
            this.slave_interface.ChannelD.valid = '0'
            this.ready = true
            if (data_from_sub_interconnect.valid == '1') {

                if (data_from_sub_interconnect.opcode == '000') {

                    this.println (this.active_println,
                    'Cycle '             +
                    cycle.toString()     +
                    ': The LED-MATRIX is receiving a PUT message from the INTERCONNECT.'
                    )

                    this.slave_interface.receive (data_from_sub_interconnect)
                    if (parseInt (this.slave_interface.ChannelA.address, 2) == 0x20010) {
                        this.controlRegister = this.slave_interface.ChannelA.data
                    } else {
                        this.writeData (this.slave_interface.ChannelA.address, this.slave_interface.ChannelA.data)
                    }
                    
                    this.state = this.Ack_state
                    this.ready = false
                }

                if (data_from_sub_interconnect.opcode == '100') {

                    this.println (this.active_println,
                    'Cycle '             +
                    cycle.toString()     +
                    ': The LED-MATRIX is receiving a GET message from the INTERCONNECT.'
                    )

                    this.slave_interface.receive (data_from_sub_interconnect)
                    this.state = this.AckData_state
                    this.ready = false
                }
                
            }
            return
        }

        if (this.state == this.Ack_state) {
            this.ready = false
            if (ready) {
                this.println   (
                    this.active_println
                    ,'Cycle ' 
                    + cycle.toString() 
                    + ': The LED-MATRIX is sending an AccessAck message to the SUB-INTERCONNECT.2'
                )
                this.slave_interface.send ('AccessAck', this.slave_interface.ChannelA.source, '')
                this.slave_interface.ChannelD.valid = '1'
                this.slave_interface.ChannelD.sink  = '1'
                this.state = this.REC_state
            }
            this.ready = false

            return
        }

        if (this.state == this.AckData_state) {
            this.ready = false
            if (ready) {
                let index = (parseInt (this.slave_interface.ChannelA.address, 2) - 0x20014 ) / 4
                let data  = this.dataRegisters[index]
                this.println   (
                    this.active_println
                    ,'Cycle ' 
                    + cycle.toString() 
                    + ': The LED-MATRIX is sending an AccessAckData message to the SUB-INTERCONNECT.'
                )

                this.slave_interface.send ('AccessAckData', this.slave_interface.ChannelA.source, data)
                this.slave_interface.ChannelD.valid = '1'
                this.slave_interface.ChannelD.sink  = '1'
                this.state = this.REC_state
            }
            this.ready = false
        }
    }

    writeData(address: string, data: string) {

        if (address.length !== 18 || data.length !== 32) {
            throw new Error("Invalid address or data length")
        }

        let addr = parseInt(address, 2)
        if (addr % 4 !== 0) {
            console.log (addr)
            throw new Error("Address must be a multiple of 4")
           
        }

        let index = (addr -  0x20014) / 4 
        if (index >= 384) {
            console.log (addr)
            throw new Error("Address out of range")
        }

        this.dataRegisters[index] = data
        for (let i = 0 ; i< 32; i++) {
            if (this.dataRegisters[index][i]  == '1' && this.led != undefined) 
                this.led.turnOn(~~(index / 3), i + (index % 3) * 32)
        }
    }

}

class LED_controller {
    
    state           : number
    REC_state       = 0
    Ack_state       = 1
    AckData_state   = 2

    constructor () {
        this.state = 0
    }
}
// STATE 0 : CONFIG LIKE DMA MUST HAVE ALL CONTROL REGISTER.
// STATE 1 : GET -> DISPLAY