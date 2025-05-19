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
    sourceRegister       : string
    destRegister  : string
    lengthRegister              : string
    controlRegister             : string
    statusRegister              : string
    state               : number 
    DMA_Master          : Master
    DMA_Slave           : Slave
    RX_FIFO        : FIFO_ChannelD
    TX_FIFO_0        : FIFO_ChannelA
    logger             ?: Logger
    active_println      : boolean

    count_burst        = 0
    count_beats        = 0 
    TX_FIFO_1 : FIFO_ChannelD


    REC_state      =   0
    GET_state       =   1
    PUT_state       =   2
    ACK_state       =   3



    public Run (
        subnterConnect2DMA      : FIFO_ChannelA | FIFO_ChannelD
        , InterConnect2DMA      : FIFO_ChannelA | FIFO_ChannelD
        , cycle                 : Cycle
        , Interconnect_ready    : boolean
        , subInterconnect_ready : boolean
        , 
    ) {

        if (this.state == this.REC_state)      {
            this.DMA_Master.ChannelA.valid  = '0'    
            this.DMA_Master.ChannelD.ready  = '1'
            let data_from_sub_interconnect  = subnterConnect2DMA.peek()
            let data_from_interconncet      = InterConnect2DMA.peek()
            let active                      = this.controlRegister != '00000000000000000000000000000000'
            if (data_from_sub_interconnect.valid == '1') {
                data_from_sub_interconnect  = subnterConnect2DMA.dequeue()
                this.println (
                    this.active_println
                    ,'Cycle '
                    + cycle.toString() 
                    +': The DMA is receiving messeage PUT from SUB-INTERCONNECT.'
                )
                this.DMA_Slave.receive({...data_from_sub_interconnect})
                this.config (Interconnect_ready, cycle)
                active      = this.controlRegister != '00000000000000000000000000000000'
                this.state  = this.ACK_state
                return
            }

            if (data_from_interconncet.valid == '1') {
                data_from_interconncet = InterConnect2DMA.dequeue ()

                if (data_from_interconncet.opcode == '001') {
                    this.DMA_Master.receive(data_from_interconncet)
                    this.println (
                        this.active_println
                        ,'Cycle '
                        + cycle.toString() 
                        +': The DMA is receiving messeage AccessAckData from INTERCONNET. ('
                        + BinToHex (this.DMA_Master.ChannelD.data) 
                        +')'
                    )
                    this.DMA_Master.ChannelA.valid = '0'
                    this.RX_FIFO.enqueue(this.DMA_Master.ChannelD)
                    this.count_beats +=1
                    if (this.count_beats == 4) {
                        if (active) this.state = this.PUT_state
                        this.count_beats = 0
                    }
                    else this.state = this.REC_state
                }

                if (data_from_interconncet.opcode == '000') {
                    this.println (
                        this.active_println
                        ,'Cycle '
                        + cycle.toString() 
                        +': The DMA is receiving messeage AccessAck from INTERCONNECT.'
                    )
                    
                    this.DMA_Master.receive(data_from_interconncet)
                    this.count_beats +=1
                    if (this.count_beats == 4) {
                        if (active) this.state = this.GET_state
                        this.count_beats = 0
                        this.count_burst +=1
                        if (this.count_burst * 16 >= parseInt (this.lengthRegister, 2) 
                            && this.controlRegister != '00000000000000000000000000000000'
                        ) {
                            this.state = this.REC_state
                            this.println (
                                this.active_println
                                ,'Cycle '
                                + cycle.toString() 
                                +': **************** DMA DONE ****************'
                            )
                            this.statusRegister = '00000000000000000000000000000001'
                            return
                        }
                    } 
                    else this.state = this.REC_state
                }
            }
        }

        if (this.state == this.GET_state)   {
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
                    (parseInt(this.sourceRegister.slice(-17), 2) + this.count_burst * 16).toString(2).padStart(17, '0'),
                    ''
                )
    
                this.DMA_Master.ChannelA.size = '10'
                this.DMA_Slave.ChannelD.valid = '0'
                this.DMA_Master.ChannelA.valid = '1'
                this.TX_FIFO_0.enqueue ( {...this.DMA_Master.ChannelA})
                this.state = this.REC_state
            }
        }

        if (this.state == this.PUT_state)   {
            this.TX_FIFO_0               = new FIFO_ChannelA ()
            this.DMA_Master.ChannelD.ready  = '0'
            if (Interconnect_ready) {
                this.println (
                    this.active_println
                    ,'Cycle '
                    + cycle.toString() 
                    +': The DMA is sending messeage PUT to INTERCONNET.'
                )
                this.DMA_Master.send(
                    'PUT',
                    ((parseInt(this.destRegister, 2) + 0 + this.count_burst*16)).toString(2).padStart(17, '0'),
                    this.RX_FIFO.dequeue().data
                )
                this.DMA_Master.ChannelA.valid = '1'
                this.DMA_Master.ChannelD.ready = '0'
                this.DMA_Master.ChannelA.size  = '10'
                this.DMA_Slave.ChannelD.valid  = '0'
                this.TX_FIFO_0.enqueue ( {...this.DMA_Master.ChannelA})
                // cycle.incr()
    
                this.DMA_Master.send(
                    'PUT',
                    ((parseInt(this.destRegister, 2) + 4  + this.count_burst*16)).toString(2).padStart(17, '0'),
                    this.RX_FIFO.dequeue().data
                )
                this.DMA_Master.ChannelA.valid = '1'
                this.DMA_Master.ChannelD.ready = '0'
                this.DMA_Master.ChannelA.size  = '10'
                this.DMA_Slave.ChannelD.valid  = '0'
                this.TX_FIFO_0.enqueue ( {...this.DMA_Master.ChannelA})
                // cycle.incr()
    
                this.DMA_Master.send(
                    'PUT',
                    ((parseInt(this.destRegister, 2) + 8  + this.count_burst*16)).toString(2).padStart(17, '0'),
                    this.RX_FIFO.dequeue().data
                )
                this.DMA_Master.ChannelA.valid = '1'
                this.DMA_Master.ChannelA.size  = '10'
                this.DMA_Slave.ChannelD.valid  = '0'
                this.TX_FIFO_0.enqueue ( {...this.DMA_Master.ChannelA})
                // cycle.incr()
    
                // console.log ('this.destRegister', parseInt(this.destRegister, 2))
                this.DMA_Master.send(
                    'PUT',
                    ((parseInt(this.destRegister, 2) + 12  + this.count_burst*16)).toString(2).padStart(17, '0'),
                    this.RX_FIFO.dequeue().data
                )
                this.DMA_Master.ChannelA.valid = '1'
                this.DMA_Master.ChannelA.size  = '10'
                this.DMA_Slave.ChannelD.valid  = '0'
                this.TX_FIFO_0.enqueue ( {...this.DMA_Master.ChannelA})
                this.state = this.REC_state
            }
        }

        if (this.state == this.ACK_state)   {
            if (subInterconnect_ready) {
                this.DMA_Slave.send ('AccessAck', '00', '')
                this.DMA_Slave.ChannelD.sink = '01'
                this.println (
                    this.active_println
                    ,'Cycle '
                    + cycle.toString() 
                    +': The DMA is sending messeage AccessAck to SUB-INTERCONNECT.'
                )

                this.TX_FIFO_1.enqueue({...this.DMA_Slave.ChannelD})


                if (this.controlRegister != '00000000000000000000000000000000') {
                    this.println (
                        this.active_println
                        ,'Cycle '
                        + cycle.toString() 
                        +': The DMA is actived.'
                    )
                    this.DMA_Master.ChannelD.ready = '0'
                    this.state = this.GET_state
                    return
                } else this.state = this.REC_state
            }
        }

    }

    constructor() {
        this.sourceRegister             = '00000000000000000000000000000000'
        this.destRegister               = '00000000000000000000000000000000'
        this.lengthRegister             = '00000000000000000000000000000000'
        this.controlRegister            = '00000000000000000000000000000000'
        this.statusRegister             = '00000000000000000000000000000000'
        this.state                      = 0
        this.DMA_Master                 = new Master('DMA_Master', true, '01')
        this.DMA_Master.ChannelA.size   = '10'
        this.DMA_Slave                  = new Slave ('DMA_Slave', true)
        this.RX_FIFO                    = new FIFO_ChannelD ()
        this.TX_FIFO_1                  = new FIFO_ChannelD ()
        this.TX_FIFO_0                  = new FIFO_ChannelA ()
        this.active_println             = true

    }
    
    public reset () {
        this.sourceRegister              = '00000000000000000000000000000000'
        this.destRegister         = '00000000000000000000000000000000'
        this.lengthRegister                     = '00000000000000000000000000000000'
        this.controlRegister                    = '00000000000000000000000000000000'
        this.statusRegister                     = '00000000000000000000000000000000'
        this.state                      = 0
        this.DMA_Master                 = new Master('DMA_Master', true, '01')
        this.DMA_Master.ChannelA.size   = '10'
        this.DMA_Slave                  = new Slave ('DMA_Slave', true)
        this.RX_FIFO               = new FIFO_ChannelD ()
        this.active_println             = true
        this.TX_FIFO_0               = new FIFO_ChannelA ()
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
            console.log("Invalid address or data lengthRegister", address,data.length  )
            return
        }

        // Chuyển địa chỉ từ chuỗi nhị phân sang số nguyên và sau đó sang hex
        const hexAddress = '0x' + parseInt(address, 2).toString(16).toUpperCase().padStart(8, '0')

        switch (hexAddress) {
            case '0x00020000':
                this.sourceRegister = data
                break
            case '0x00020004':
                this.destRegister = data
                break
            case '0x00020008':
                this.lengthRegister = data
                break
            case '0x0002000C':
                this.controlRegister = data
                break
            default:
                console.log("Invalid address for configuration: " + hexAddress)
                return
        }
    }
}
