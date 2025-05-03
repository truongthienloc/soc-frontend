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
import { act } from 'react'

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
    DMA_RXbuffer        : FIFO_ChannelD
    DMA_TXbuffer        : FIFO_ChannelA
    logger             ?: Logger
    active_println      : boolean

    count_burst        = 0
    count_beats        = 0 
    fifo_to_subInterconnect : FIFO_ChannelD

    STATE_RecPutFrSub = 0
    IDLE_state        = 0
    ResponseSubInterconnect = 1
    sendGET_state         = 2
    sendPUT_state       =3
    ResConfig           =4
    DONE                =5



    public Run (
        subnterConnect2DMA      : FIFO_ChannelA | FIFO_ChannelD
        , InterConnect2DMA      : FIFO_ChannelA | FIFO_ChannelD
        , cycle                 : Cycle
        , Interconnect_ready    : boolean
        , subInterconnect_ready : boolean
        , 
    ) {

        if (this.state == this.IDLE_state) {
            this.DMA_Master.ChannelA.valid = '0'    
            this.DMA_Master.ChannelD.ready = '1'
            let subnterConnect2DMA_ = subnterConnect2DMA.peek()
            let InterConnect2DMA_   = InterConnect2DMA.peek()
            let active              = this.control != '00000000000000000000000000000000'
            if (subnterConnect2DMA_.valid == '1') {
                subnterConnect2DMA_ = subnterConnect2DMA.dequeue()
                
                this.println (
                    this.active_println
                    ,'Cycle '
                    + cycle.toString() 
                    +': The DMA is receiving messeage PUT from SUB-INTERCONNECT.'
                )
                this.DMA_Slave.receive({...subnterConnect2DMA_})
                this.config (Interconnect_ready, cycle)
                active              = this.control != '00000000000000000000000000000000'
                this.state  = this.ResConfig
            }

            if (InterConnect2DMA_.valid == '1') {
                InterConnect2DMA_ = InterConnect2DMA.dequeue ()
                if (InterConnect2DMA_.opcode == '001') {
                    this.DMA_Master.receive(InterConnect2DMA_)
                    this.println (
                        this.active_println
                        ,'Cycle '
                        + cycle.toString() 
                        +': The DMA is receiving messeage AccessAckData from INTERCONNET. ('
                        + BinToHex (this.DMA_Master.ChannelD.data) 
                        +')'
                    )
                    this.DMA_Master.ChannelA.valid = '0'
                    this.DMA_RXbuffer.enqueue(this.DMA_Master.ChannelD)
                    this.count_beats +=1
                    if (this.count_beats == 4) {
                        if (active) this.state = this.sendPUT_state
                        this.count_beats = 0
                    }
                    else this.state = this.IDLE_state
                }
                if (InterConnect2DMA_.opcode == '000') {
                    this.println (
                        this.active_println
                        ,'Cycle '
                        + cycle.toString() 
                        +': The DMA is receiving messeage AccessAck from SUB-INTERCONNET.'
                    )
                    
                    this.DMA_Master.receive(InterConnect2DMA_)
                    this.count_beats +=1
                    if (this.count_beats == 4) {
                        if (active) this.state = this.sendGET_state
                        this.count_beats = 0
                        this.count_burst +=1
                        if (this.count_burst * 16 >= parseInt (this.length, 2) 
                            && this.control != '00000000000000000000000000000000'
                        ) {
                            this.state = this.DONE
                            this.println (
                                this.active_println
                                ,'Cycle '
                                + cycle.toString() 
                                +': **************** DMA DONE ****************'
                            )
                            this.status = '00000000000000000000000000000001'
                            return
                        }
                    } 
                    else this.state = this.IDLE_state
                    
                }
            }
        }

        if (this.state == this.sendGET_state) {
            this.DMA_Master.ChannelD.ready = '0'
            if (Interconnect_ready) {
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
                this.DMA_TXbuffer.enqueue ( {...this.DMA_Master.ChannelA})
                this.state = this.IDLE_state
            }
        }

        if (this.state == this.sendPUT_state) {
            this.DMA_TXbuffer       = new FIFO_ChannelA ()
            this.DMA_Master.ChannelD.ready = '0'
            if (Interconnect_ready) {
                this.println (
                    this.active_println
                    ,'Cycle '
                    + cycle.toString() 
                    +': The DMA is sending messeage PUT to INTERCONNET.'
                )
                this.DMA_Master.send(
                    'PUT',
                    ((parseInt(this.destinationAddress, 2) + 0 + this.count_burst*16)).toString(2).padStart(17, '0'),
                    this.DMA_RXbuffer.dequeue().data
                )
                this.DMA_Master.ChannelA.valid = '1'
                this.DMA_Master.ChannelD.ready = '0'
                this.DMA_Master.ChannelA.size  = '10'
                this.DMA_Slave.ChannelD.valid  = '0'
                this.DMA_TXbuffer.enqueue ( {...this.DMA_Master.ChannelA})
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
                    this.DMA_RXbuffer.dequeue().data
                )
                this.DMA_Master.ChannelA.valid = '1'
                this.DMA_Master.ChannelD.ready = '0'
                this.DMA_Master.ChannelA.size  = '10'
                this.DMA_Slave.ChannelD.valid  = '0'
                this.DMA_TXbuffer.enqueue ( {...this.DMA_Master.ChannelA})
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
                    this.DMA_RXbuffer.dequeue().data
                )
                this.DMA_Master.ChannelA.valid = '1'
                this.DMA_Master.ChannelA.size  = '10'
                this.DMA_Slave.ChannelD.valid  = '0'
                this.DMA_TXbuffer.enqueue ( {...this.DMA_Master.ChannelA})
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
                    this.DMA_RXbuffer.dequeue().data
                )
                this.DMA_Master.ChannelA.valid = '1'
                this.DMA_Master.ChannelA.size  = '10'
                this.DMA_Slave.ChannelD.valid  = '0'
                this.DMA_TXbuffer.enqueue ( {...this.DMA_Master.ChannelA})
                this.state = this.IDLE_state
            }
        }

        if (this.state == this.ResConfig) {
            if (subInterconnect_ready) {
                this.DMA_Slave.send ('AccessAck', '00', '')
                this.DMA_Slave.ChannelD.sink = '01'
                this.println (
                    this.active_println
                    ,'Cycle '
                    + cycle.toString() 
                    +': The DMA is sending messeage AccessAck to SUB-INTERCONNETC.'
                )

                this.fifo_to_subInterconnect.enqueue({...this.DMA_Slave.ChannelD})


                if (this.control != '00000000000000000000000000000000') {
                    this.println (
                        this.active_println
                        ,'Cycle '
                        + cycle.toString() 
                        +': The DMA is actived.'
                    )
                    this.DMA_Master.ChannelD.ready = '0'
                    this.state = this.sendGET_state
                    return
                } else this.state = this.IDLE_state
            }
        }
        // if (this.state == this.STATE_RecPutFrSub) {
        //     this.DMA_Master.ChannelD.ready ='1'
        //     let sub2DMA_ = sub2DMA.peek()
        //     if (sub2DMA_.valid == '1') {
        //         sub2DMA_ = sub2DMA.dequeue()
        //         this.println (
        //             this.active_println
        //             ,'Cycle '
        //             + cycle.toString() 
        //             +': The DMA is receiving messeage PUT from SUB-INTERCONNECT.'
        //         )
    
        //         this.DMA_Slave.receive(sub2DMA_)
        //         this.config (ready0, cycle)
        //         if (ready1) {
        //             this.DMA_Slave.send ('AccessAck', '00', '')
        //             this.DMA_Slave.ChannelD.sink = '01'
        //             this.println (
        //                 this.active_println
        //                 ,'Cycle '
        //                 + cycle.toString() 
        //                 +': The DMA is sending messeage AccessAck to SUB-INTERCONNETC.'
        //             )
    
        //             this.fifo_to_subInterconnect.enqueue({...this.DMA_Slave.ChannelD})
        //         }
        //         else {
        //             this.state = this.STATE_RecPutFrSub
        //         }
        //     }

        //     return
        // }

        // if (this.state == 1) {
        //     this.DMA_Slave.ChannelD.valid = '0'
        //     this.state = 0
        //     return
        // }

        // if (this.state == 2) {
        //     this.DMA_TXbuffer       = new FIFO_ChannelA ()
        //     this.DMA_Master.ChannelD.ready = '0'
        //     if (this.count_burst * 16 >= parseInt (this.length, 2)) {
        //         this.state = 0
        //         this.println (
        //             this.active_println
        //             ,'Cycle '
        //             + cycle.toString() 
        //             +': **************** DMA DONE ****************'
        //         )
        //         this.status = '00000000000000000000000000000001'
        //         return
        //     }
        //     if (ready0) {
        //         this.println (
        //             this.active_println
        //             ,'Cycle '
        //             + cycle.toString() 
        //             +': The DMA is sending messeage GET to INTERCONNET.'
        //         )
    
        //         this.DMA_Master.send(
        //             'GET',
        //             (parseInt(this.sourceAddress.slice(-17), 2) + this.count_burst * 16).toString(2).padStart(17, '0'),
        //             ''
        //         )
    
        //         this.DMA_Master.ChannelA.size = '10'
        //         this.DMA_Slave.ChannelD.valid = '0'
        //         this.DMA_Master.ChannelA.valid = '1'
        //         this.DMA_TXbuffer.enqueue ( {...this.DMA_Master.ChannelA})
        //         this.state += 1
        //     }
        //     return 
        // }

        // if (this.state == 3) {
            
        //     this.DMA_Master.ChannelA.valid = '0'
        //     this.DMA_Master.ChannelD.ready = '1'
        //     if (InterConnect2DMA.valid == '1'
        //         && InterConnect2DMA.sink == '0'
        //     ) {

        //         this.DMA_Master.receive(InterConnect2DMA)
        //         this.println (
        //             this.active_println
        //             ,'Cycle '
        //             + cycle.toString() 
        //             +': The DMA is receiving messeage AccessAckData from INTERCONNET. ('
        //             + BinToHex (this.DMA_Master.ChannelD.data) 
        //             +')'
        //         )
        //         this.DMA_Master.ChannelA.valid = '0'

        //         this.DMA_RXbuffer.enqueue(this.DMA_Master.ChannelD)

        //         this.count_beats +=1
        //         if (this.count_beats == 4) {
        //             this.state +=1
        //             this.count_beats = 0
        //         }
        //         else this.state = 3
        //     }
        //     return
        // }

        // if (this.state == 4 && ready0) {
        //     this.DMA_TXbuffer       = new FIFO_ChannelA ()
        //     this.DMA_Master.ChannelD.ready = '0'
        //     if (ready0) {
        //         this.println (
        //             this.active_println
        //             ,'Cycle '
        //             + cycle.toString() 
        //             +': The DMA is sending messeage PUT to INTERCONNET.'
        //         )
        //         this.DMA_Master.send(
        //             'PUT',
        //             ((parseInt(this.destinationAddress, 2) + 0 + this.count_burst*16)).toString(2).padStart(17, '0'),
        //             this.DMA_RXbuffer.dequeue().data
        //         )
        //         this.DMA_Master.ChannelA.valid = '1'
        //         this.DMA_Master.ChannelD.ready = '0'
        //         this.DMA_Master.ChannelA.size  = '10'
        //         this.DMA_Slave.ChannelD.valid  = '0'
        //         this.DMA_TXbuffer.enqueue ( {...this.DMA_Master.ChannelA})
        //         // cycle.incr()
    
        //         this.println (
        //             this.active_println
        //             ,'Cycle '
        //             + cycle.toString() 
        //             +': The DMA is sending messeage PUT to INTERCONNET.'
        //         )
        //         this.DMA_Master.send(
        //             'PUT',
        //             ((parseInt(this.destinationAddress, 2) + 4  + this.count_burst*16)).toString(2).padStart(17, '0'),
        //             this.DMA_RXbuffer.dequeue().data
        //         )
        //         this.DMA_Master.ChannelA.valid = '1'
        //         this.DMA_Master.ChannelD.ready = '0'
        //         this.DMA_Master.ChannelA.size  = '10'
        //         this.DMA_Slave.ChannelD.valid  = '0'
        //         this.DMA_TXbuffer.enqueue ( {...this.DMA_Master.ChannelA})
        //         // cycle.incr()
    
        //         this.println (
        //             this.active_println
        //             ,'Cycle '
        //             + cycle.toString() 
        //             +': The DMA is sending messeage PUT to INTERCONNET.'
        //         )
        //         this.DMA_Master.send(
        //             'PUT',
        //             ((parseInt(this.destinationAddress, 2) + 8  + this.count_burst*16)).toString(2).padStart(17, '0'),
        //             this.DMA_RXbuffer.dequeue().data
        //         )
        //         this.DMA_Master.ChannelA.valid = '1'
        //         this.DMA_Master.ChannelA.size  = '10'
        //         this.DMA_Slave.ChannelD.valid  = '0'
        //         this.DMA_TXbuffer.enqueue ( {...this.DMA_Master.ChannelA})
        //         // cycle.incr()
    
        //         this.println (
        //             this.active_println
        //             ,'Cycle '
        //             + cycle.toString() 
        //             +': The DMA is sending messeage PUT to INTERCONNET.'
        //         )
        //         // console.log ('this.destinationAddress', parseInt(this.destinationAddress, 2))
        //         this.DMA_Master.send(
        //             'PUT',
        //             ((parseInt(this.destinationAddress, 2) + 12  + this.count_burst*16)).toString(2).padStart(17, '0'),
        //             this.DMA_RXbuffer.dequeue().data
        //         )
        //         this.DMA_Master.ChannelA.valid = '1'
        //         this.DMA_Master.ChannelA.size  = '10'
        //         this.DMA_Slave.ChannelD.valid  = '0'
        //         this.DMA_TXbuffer.enqueue ( {...this.DMA_Master.ChannelA})
        //         // this.DMA_Master.ChannelA.valid = '0'
    
        //         this.state += 1
        //     }

            
        //     return 
        // }

        // if (this.state == 5) {
            
        //     this.DMA_Master.ChannelA.valid = '0'    
        //     this.DMA_Master.ChannelD.ready = '1'
        //     if (InterConnect2DMA.valid == '1'
        //         && InterConnect2DMA.sink == '1'
        //     ) {
        //         this.println (
        //             this.active_println
        //             ,'Cycle '
        //             + cycle.toString() 
        //             +': The DMA is receiving messeage AccessAck from SUB-INTERCONNET.'
        //         )
                
        //         this.DMA_Master.receive(InterConnect2DMA)
                
        //         // console.log ('this.count_beats', this.count_beats)
        //         this.count_beats +=1
        //         if (this.count_beats == 4) {
        //             this.state = 2
        //             this.count_beats = 0
        //             this.count_burst +=1
        //         } else this.state = 5
        //     }

        //     return
        // }

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
        this.DMA_RXbuffer         = new FIFO_ChannelD ()
        this.fifo_to_subInterconnect = new FIFO_ChannelD ()
        this.active_println     = true
        this.DMA_TXbuffer              = new FIFO_ChannelA ()

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
        this.DMA_RXbuffer       = new FIFO_ChannelD ()
        this.active_println     = true
        this.DMA_TXbuffer       = new FIFO_ChannelA ()
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
            console.log("Invalid address or data length", address,data.length  )
            return
        }

        // Chuyển địa chỉ từ chuỗi nhị phân sang số nguyên và sau đó sang hex
        const hexAddress = '0x' + parseInt(address, 2).toString(16).toUpperCase().padStart(8, '0')

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
    }
}
