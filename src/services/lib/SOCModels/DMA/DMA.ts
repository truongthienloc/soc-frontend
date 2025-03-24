import Slave from './../Interconnect/Slave'
import Master from './../Interconnect/Master'
import ChannelA             from "./../Interconnect/ChannelA"
import ChannelD             from "./../Interconnect/ChannelD"
import { Interconnect } from '../../soc/components/Interconnect'
import Cycle from "../Compile/cycle"
import {Logger }            from '../Compile/soc.d'

export default class DMA {
    sourceAddress       : string
    destinationAddress  : string
    length              : string
    control             : string
    status              : string
    state               : number 
    sendoffset          : number
    DMA_Master          : Master
    DMA_Slave           : Slave
    DMA_buffer          : string[]
    logger             ?: Logger

    constructor() {
        this.sourceAddress      = '00000000000000000000000000000000'
        this.destinationAddress = '00000000000000000000000000000000'
        this.length             = '00000000000000000000000000000000'
        this.control            = '00000000000000000000000000000000'
        this.status             = '00000000000000000000000000000000'
        this.state              = 0
        this.sendoffset         = 0
        this.DMA_Master         = new Master('DMA_Master', true, '01')
        this.DMA_Master.ChannelA.size = '10'
        this.DMA_Slave          = new Slave ('DMA_Slave', true)
        this.DMA_buffer         = Array(288).fill('00000000000000000000000000000000')

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
        sub2DMA             : ChannelA
        , InterConnect2DMA  : ChannelD
        , Cycle             : Cycle
    ) {
        
        if (this.state == 0 && sub2DMA.valid == '1') {
            this.DMA_Slave.receive(sub2DMA)
            this.config ()
            this.DMA_Slave.send ('AccessAck', '00', '')
            return
        }

        if (this.state == 1) {
            this.DMA_Slave.ChannelD.valid = '0'
            this.state = 0
            // console.log ('this.DMA_Slave', this.DMA_Slave)
            return
        }
        // if (this.state == 2 || this.state == 3) {
        //     return this.get    (InterConnect2DMA)
            
        // }
        // if (this.state == 4 || this.state == 5) {
        //     return this.put    (InterConnect2DMA)
        // }

    }

    config() {
        const address = this.DMA_Slave.ChannelA.address
        const data    = this.DMA_Slave.ChannelA.data
        // Kiểm tra địa chỉ và dữ liệu có hợp lệ không
        if (address.length !== 17 || data.length !== 32) {
            console.log("Invalid address or data length")
            return
        }

        // Chuyển địa chỉ từ chuỗi nhị phân sang số nguyên và sau đó sang hex
        const hexAddress = '0x' + parseInt(address, 2).toString(16).toUpperCase().padStart(8, '0')

        if (this.state == 0) {
            switch (hexAddress) {
                case '0x0000304C':
                    this.sourceAddress = data
                    break
                case '0x00003050':
                    this.destinationAddress = data
                    break
                case '0x00003054':
                    this.length = data
                    break
                case '0x00003058':
                    this.control = data
                    break
                default:
                    console.log("Invalid address for configuration: " + hexAddress)
                    return
            }
                    // Kiểm tra xem đã cấu hình đầy đủ chưa
            if ((this.sourceAddress         != '00000000000000000000000000000000') && 
                (this.destinationAddress    != '00000000000000000000000000000000') && 
                (this.length                != '00000000000000000000000000000000') && 
                (this.control               != '00000000000000000000000000000000')
                ) {
                this.state    = 2
            } else this.state = 1
        }
    }

    get(InterConnect2DMA: ChannelD) {
        if (this.state == 2) {
            // Get operation for different addresses and store results in beats array
            this.DMA_Master.send(
                'GET',
                (parseInt(this.sourceAddress.slice(-17), 2)).toString(2).padStart(17, '0'),
                ''
            )
            this.state += 1
            return {...this.DMA_Master.ChannelA}
        }
    
        if (this.state == 3) {
            if (InterConnect2DMA.valid == '1'
                && InterConnect2DMA.sink == '0'
            ) {
                    this.DMA_Master.receive(InterConnect2DMA)
                    this.DMA_buffer[parseInt(this.length, 2)] = this.DMA_Master.ChannelD.data
                    this.length = (parseInt(this.length, 2) - 4).toString(2).padStart(32, '0')
                    this.state += 1
            }
        }
    }

    put(InterConnect2DMA: ChannelD) {
        if (this.state == 4 ) {
            console.log(`Sending data from source address: ${this.sourceAddress}`)
            this.DMA_Master.send (
                'PUT'
                , (this.destinationAddress).slice(0,18)
                , this.DMA_buffer [parseInt(this.destinationAddress + this.sendoffset + 0, 2)]
            )
            this.state += 1
            return {...this.DMA_Master.ChannelA}
        }

        if (this.state == 5 ) {
            if (InterConnect2DMA.valid == '1'
                && InterConnect2DMA.sink == '1'
            ) {
                this.DMA_Master.receive (InterConnect2DMA)
                this.state = 0
            }
        }
    }
}
