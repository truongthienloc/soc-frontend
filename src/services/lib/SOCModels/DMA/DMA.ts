import Slave from './../Interconnect/Slave'
import Master from './../Interconnect/Master'
import ChannelA             from "./../Interconnect/ChannelA"
import ChannelD             from "./../Interconnect/ChannelD"
import { FIFO_ChannelD }    from "../Interconnect/FIFO_ChannelD"
import Cycle from "../Compile/cycle"
import {Logger }            from '../Compile/soc.d'
import { BinToHex } from '../Compile/convert'
import { read } from 'fs'
import { FIFO_ChannelA } from '../Interconnect/FIFO_ChannelA'

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
    DMA_buffer          : FIFO_ChannelD
    burst               : ChannelA[]
    logger             ?: Logger
    active_println      : boolean

    count_burst        = 0
    count_beats        = 0 
    fifo_to_subInterconnect : FIFO_ChannelD

    STATE_RecPutFrSub = 0



    public Run (
        sub2DMA             : ChannelA
        , InterConnect2DMA  : ChannelD
        , cycle             : Cycle
        , ready0            : boolean
        , ready1            : boolean
        , 
    ) {
        
        if (this.state == this.STATE_RecPutFrSub) {
            this.DMA_Master.ChannelD.ready ='1'

            if (sub2DMA.valid == '1') {
                this.println (
                    this.active_println
                    ,'Cycle '
                    + cycle.toString() 
                    +': The DMA is receiving messeage PUT from SUB-INTERCONNETC.'
                )
    
                this.DMA_Slave.receive(sub2DMA)
                this.config (ready0, cycle)
                if (ready1) {
                    this.DMA_Slave.send ('AccessAck', '00', '')
                    this.DMA_Slave.ChannelD.sink = '01'
                    this.println (
                        this.active_println
                        ,'Cycle '
                        + cycle.toString() 
                        +': The DMA is sending messeage AccessAck to SUB-INTERCONNETC.'
                    )
    
                    this.fifo_to_subInterconnect.enqueue({...this.DMA_Slave.ChannelD})
                }
                else {
                    this.state = this.STATE_RecPutFrSub
                }
            }

            return
        }

        if (this.state == 1) {
            this.DMA_Slave.ChannelD.valid = '0'
            this.state = 0
            // console.log ('this.DMA_Slave', this.DMA_Slave)
            return
        }

        if (this.state == 2) {
            this.burst = []
            this.DMA_Master.ChannelD.ready = '0'
            // console.log ( this.count_burst, this.count_beats)
            if (this.count_burst * 16 >= parseInt (this.length, 2)) {
                this.state = 0
                // this.count_burst = 0
                // this.count_beats = 0

                this.println (
                    this.active_println
                    ,'Cycle '
                    + cycle.toString() 
                    +': **************** DMA DONE ****************'
                )
                this.status = '00000000000000000000000000000001'
                return
            }
            if (ready0) {
                this.println (
                    this.active_println
                    ,'Cycle '
                    + cycle.toString() 
                    +': The DMA is sending messeage GET to INTERCONNET.'
                )
    
                this.DMA_Master.send(
                    'GET',
                    (parseInt(this.sourceAddress.slice(-17), 2) + this.count_burst * 16).toString(2).padStart(17, '0'),
                    ''
                )
    
                this.DMA_Master.ChannelA.size = '10'
                this.DMA_Slave.ChannelD.valid = '0'
                this.DMA_Master.ChannelA.valid = '1'

    
                this.burst.push ( {...this.DMA_Master.ChannelA})
                this.state += 1
            }
            

            return 
        }

        if (this.state == 3) {
            
            this.DMA_Master.ChannelA.valid = '0'
            this.DMA_Master.ChannelD.ready = '1'
            if (InterConnect2DMA.valid == '1'
                && InterConnect2DMA.sink == '0'
            ) {

                this.DMA_Master.receive(InterConnect2DMA)
                this.println (
                    this.active_println
                    ,'Cycle '
                    + cycle.toString() 
                    +': The DMA is receiving messeage AccessAckData from INTERCONNET. ('
                    + BinToHex (this.DMA_Master.ChannelD.data) 
                    +')'
                )
                this.DMA_Master.ChannelA.valid = '0'

                this.DMA_buffer.enqueue(this.DMA_Master.ChannelD)

                this.count_beats +=1
                if (this.count_beats == 4) {
                    this.state +=1
                    this.count_beats = 0
                }
                else this.state = 3
            }
            return
        }

        if (this.state == 4 && ready0) {
            this.burst = []
            this.DMA_Master.ChannelD.ready = '0'
            if (ready0) {
                this.println (
                    this.active_println
                    ,'Cycle '
                    + cycle.toString() 
                    +': The DMA is sending messeage PUT to INTERCONNET.'
                )
                this.DMA_Master.send(
                    'PUT',
                    ((parseInt(this.destinationAddress, 2) + 0 + this.count_burst*16)).toString(2).padStart(17, '0'),
                    this.DMA_buffer.dequeue().data
                )
                this.DMA_Master.ChannelA.valid = '1'
                this.DMA_Master.ChannelD.ready = '0'
                this.DMA_Master.ChannelA.size  = '10'
                this.DMA_Slave.ChannelD.valid  = '0'
                this.burst.push ( {...this.DMA_Master.ChannelA})
                // cycle.incr()
    
                this.println (
                    this.active_println
                    ,'Cycle '
                    + cycle.toString() 
                    +': The DMA is sending messeage PUT to INTERCONNET.'
                )
                this.DMA_Master.send(
                    'PUT',
                    ((parseInt(this.destinationAddress, 2) + 4  + this.count_burst*16)).toString(2).padStart(17, '0'),
                    this.DMA_buffer.dequeue().data
                )
                this.DMA_Master.ChannelA.valid = '1'
                this.DMA_Master.ChannelD.ready = '0'
                this.DMA_Master.ChannelA.size  = '10'
                this.DMA_Slave.ChannelD.valid  = '0'
                this.burst.push ( {...this.DMA_Master.ChannelA})
                // cycle.incr()
    
                this.println (
                    this.active_println
                    ,'Cycle '
                    + cycle.toString() 
                    +': The DMA is sending messeage PUT to INTERCONNET.'
                )
                this.DMA_Master.send(
                    'PUT',
                    ((parseInt(this.destinationAddress, 2) + 8  + this.count_burst*16)).toString(2).padStart(17, '0'),
                    this.DMA_buffer.dequeue().data
                )
                this.DMA_Master.ChannelA.valid = '1'
                this.DMA_Master.ChannelA.size  = '10'
                this.DMA_Slave.ChannelD.valid  = '0'
                this.burst.push ( {...this.DMA_Master.ChannelA})
                // cycle.incr()
    
                this.println (
                    this.active_println
                    ,'Cycle '
                    + cycle.toString() 
                    +': The DMA is sending messeage PUT to INTERCONNET.'
                )
                // console.log ('this.destinationAddress', parseInt(this.destinationAddress, 2))
                this.DMA_Master.send(
                    'PUT',
                    ((parseInt(this.destinationAddress, 2) + 12  + this.count_burst*16)).toString(2).padStart(17, '0'),
                    this.DMA_buffer.dequeue().data
                )
                this.DMA_Master.ChannelA.valid = '1'
                this.DMA_Master.ChannelA.size  = '10'
                this.DMA_Slave.ChannelD.valid  = '0'
                this.burst.push ( {...this.DMA_Master.ChannelA})
                // console.log (this.count_burst)
                // cycle.incr()
    
                this.state += 1
            }

            
            return 
        }

        if (this.state == 5) {
            
            this.DMA_Master.ChannelA.valid = '0'    
            this.DMA_Master.ChannelD.ready = '1'
            if (InterConnect2DMA.valid == '1'
                && InterConnect2DMA.sink == '1'
            ) {
                this.println (
                    this.active_println
                    ,'Cycle '
                    + cycle.toString() 
                    +': The DMA is receiving messeage AccessAck from SUB-INTERCONNET.'
                )
                
                this.DMA_Master.receive(InterConnect2DMA)
                
                // console.log ('this.count_beats', this.count_beats)
                this.count_beats +=1
                if (this.count_beats == 4) {
                    this.state = 2
                    this.count_beats = 0
                    this.count_burst +=1
                } else this.state = 5
            }

            return
        }

    }

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
        this.DMA_buffer         = new FIFO_ChannelD ()
        this.fifo_to_subInterconnect = new FIFO_ChannelD ()
        this.active_println     = true
        this.burst              = []

    }
    
    public reset () {
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
        this.DMA_buffer         = new FIFO_ChannelD ()
        this.active_println     = true
        this.burst              = []
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

    

    config( ready0            : boolean
        ,cycle             : Cycle
    ) {
        const address = this.DMA_Slave.ChannelA.address
        const data    = this.DMA_Slave.ChannelA.data
        // Kiểm tra địa chỉ và dữ liệu có hợp lệ không
        if (address.length !== 18 || data.length !== 32) {
            console.log("Invalid address or data length")
            return
        }

        // Chuyển địa chỉ từ chuỗi nhị phân sang số nguyên và sau đó sang hex
        const hexAddress = '0x' + parseInt(address, 2).toString(16).toUpperCase().padStart(8, '0')

        if (this.state == 0) {
            switch (hexAddress) {
                case '0x00020000':
                    this.sourceAddress = data
                    break
                case '0x00020004':
                    this.destinationAddress = data
                    break
                case '0x00020008':
                    this.length = data
                    break
                case '0x0002000C':
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
                    this.println (
                        this.active_println
                        ,'Cycle '
                        + cycle.toString() 
                        +': The DMA is actived.'
                    )
                    this.DMA_Master.ChannelD.ready = '0'
                if (ready0) this.state    = 2
            } else {
                if (ready0) this.state = 1
            }
        }
    }
}
