import Slave from '../Interconnect/Slave'
import ChannelA from "../Interconnect/ChannelA"
import LedMatrix from '../../control/LedMatrix'
import Cycle from '../Compile/cycle'
import {Logger }            from '../Compile/soc.d'

export default class LEDMatrix {

    controlRegister : string
    dataRegisters   : string[]
    matrix_buffer   : string[]
    Matrix_Slave    : Slave
    active          : boolean
    state           : number
    logger         ?: Logger
    active_println  : boolean
    led             ?: LedMatrix
    count_beats      = 0

    constructor() {
        this.controlRegister            = '00000000000000000000000000000000'
        this.dataRegisters              = Array(288).fill('00000000000000000000000000000000')
        this.matrix_buffer              = Array(96).fill('00000000000000000000000000000000')
        this.Matrix_Slave               = new Slave('Matrix_Slave', true)
        this.Matrix_Slave.ChannelD.sink = '1'
        this.state                      = 0
        this.active                     = false
        this.active_println             = true
        // this.led                        = new LedMatrix ('.led-matrix')

    }

    public setLogger(logger: Logger) {
        this.logger = logger
    }

    public reset () {
        this.controlRegister            = '00000000000000000000000000000000'
        this.dataRegisters              = Array(288).fill('00000000000000000000000000000000')
        this.matrix_buffer              = Array(96).fill('00000000000000000000000000000000')
        this.Matrix_Slave               = new Slave('Matrix_Slave', true)
        this.Matrix_Slave.ChannelD.sink = '1'
        this.state                      = 0
        this.active                     = false
        this.active_println             = true
        this.led?.clear()
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

    public Run (
        ChannelA: ChannelA
        , cycle : Cycle
        , ready : boolean
    ) {

        if (this.state == 0) {
            if  (ChannelA.valid == '1' && ChannelA.source == '00') {
                this.println (
                    this.active_println
                    , 'Cycle '+ cycle.toString() + ': The LED matrix is being configured.'
                )

                this.Matrix_Slave.receive (ChannelA)
                this.controlRegister = this.Matrix_Slave.ChannelA.data
                this.active          = true
                this.state          += 1
                
                return
            }
        }

        if (this.state == 1 && ready) {

            this.println (this.active_println,
                'Cycle '             +
                cycle.toString()     +
                ': The LED-MATRIX is sending an AccessAck message to the SUB-INTERCONNECT.'
            )
            this.Matrix_Slave.send ('AccessAck', this.Matrix_Slave.ChannelA.source, '')
            this.Matrix_Slave.ChannelD.valid = '1'
            this.Matrix_Slave.ChannelD.sink  = '10'
            this.state +=1
            return
        }

        if (this.state == 2) {
            this.Matrix_Slave.ChannelD.valid = '0'
            if (ChannelA.valid == '1') {

                this.println (this.active_println,
                    'Cycle '             +
                    cycle.toString()     +
                    ': The LED-MATRIX is operating.'
                )

                this.Matrix_Slave.receive (ChannelA)
                this.writeData (this.Matrix_Slave.ChannelA.address, this.Matrix_Slave.ChannelA.data)

                this.state = 3
            }
            // this.display ()
            return
        }

        if (this.state == 3 && ready) {

                this.println   (
                    this.active_println
                    ,'Cycle ' 
                    + cycle.toString() 
                    + ': The LED-MATRIX is sending an AccessAck message to the SUB-INTERCONNECT.'
                )
                this.Matrix_Slave.send ('AccessAck', this.Matrix_Slave.ChannelA.source, '')
                this.Matrix_Slave.ChannelD.valid = '1'
                this.Matrix_Slave.ChannelD.sink  = '10'
                this.state = 2

            return
        }

    }

    writeData(address: string, data: string) {
        // Kiểm tra địa chỉ và dữ liệu có hợp lệ không
        if (address.length !== 17 || data.length !== 32) {
            throw new Error("Invalid address or data length")
        }

        let addr = parseInt(address, 2)  // Chuyển địa chỉ từ chuỗi nhị phân sang số nguyên
        if (addr % 4 !== 0) {
            console.log (addr)
            throw new Error("Address must be a multiple of 4")
           
        }

        let index = (addr -  0x1C000) / 4  // Tính toán chỉ số của thành ghi
        if (index >= 384) {
            console.log (addr)
            throw new Error("Address out of range")
        }
        this.dataRegisters[index] = data  // Gán giá trị vào thành ghi
        for (let i = 0 ; i< 32; i++) {
            if (this.dataRegisters[index][i]  == '1' && this.led != undefined) 
                this.led.turnOn(~~(index / 3), i + (index % 3) * 32)
        }
    }

}

// STATE 0 : CONFIG LIKE DMA MUST HAVE ALL CONTROL REGISTER.
// STATE 1 : GET -> DISPLAY