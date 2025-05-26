import Slave                from './../Interconnect/Slave'
import Master               from './../Interconnect/Master'
import { FIFO_ChannelD }    from "../Interconnect/FIFO_ChannelD"
import Cycle                from "../Compile/cycle"
import {Logger }            from '../Compile/soc.d'
import { BinToHex }         from '../Compile/convert'
import { FIFO_ChannelA }    from '../Interconnect/FIFO_ChannelA'

export default class DMA {
    sourceRegister          : string
    destRegister            : string
    lengthRegister          : string
    controlRegister         : string
    statusRegister          : string

    DMA_Master              : Master
    DMA_Slave               : Slave
    internal_FIFO                 : FIFO_ChannelD

    count_burst             = 0
    count_beats             = 0 
    count_sentByte         = 0
    count_recByte          = 0

    burst                   = false

    state                   : number
    REC_state               =   0
    GET_state               =   1
    PUT_state               =   2
    ACK_state               =   3
    ACKData_state           =   4

    logger                  ?: Logger
    active_println          : boolean

    public Controller (
        subnterConnect2DMA      : FIFO_ChannelA | FIFO_ChannelD
        , InterConnect2DMA      : FIFO_ChannelA | FIFO_ChannelD
        , cycle                 : Cycle
        , Interconnect_ready    : boolean
        , subInterconnect_ready : boolean
        , 
    ) {

        if (this.state == this.REC_state)      {
            this.DMA_Master.ChannelA.valid  = '0'    
            this.DMA_Slave.ChannelD.valid   = '0' 
            this.DMA_Master.ChannelD.ready  = '1'
            this.DMA_Slave.ChannelA.ready   = '1'
            let active                      = this.controlRegister != '00000000000000000000000000000000'

            if (!subnterConnect2DMA.isEmpty()) {
                let data_from_sub_interconnect  = subnterConnect2DMA.dequeue()
                if (data_from_sub_interconnect.valid == '1') {
                    if (data_from_sub_interconnect.opcode == '000') {

                        this.DMA_Slave.receive({...data_from_sub_interconnect})

                        this.println (
                            this.active_println
                            ,'Cycle '
                            + cycle.toString() 
                            +': The DMA is receiving messeage PUT from SUB-INTERCONNECT.'
                        )

                        this.RegisterFiles (
                            this.DMA_Slave.ChannelA.address
                            , '0'.padStart(18,'0')
                            , this.DMA_Slave.ChannelA.data
                        )
                        
                        active      = this.controlRegister != '00000000000000000000000000000000'

                        this.state  = this.ACK_state

                        return
                    }

                    if (data_from_sub_interconnect.opcode == '100') {
                        data_from_sub_interconnect  = subnterConnect2DMA.dequeue()
                        this.println (
                            this.active_println
                            ,'Cycle '
                            + cycle.toString() 
                            +': The DMA is receiving messeage GET from SUB-INTERCONNECT.'
                        )
                        this.DMA_Slave.receive ({...data_from_sub_interconnect})
                        this.state = this.ACKData_state
                        return
                    } 
            }
            }
           
            if (!InterConnect2DMA.isEmpty())   {
                let data_from_interconncet = InterConnect2DMA.dequeue ()
                if (data_from_interconncet.valid == '1') {


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
                    this.internal_FIFO.enqueue(this.DMA_Master.ChannelD)
                    this.count_recByte +=4
                    if (data_from_interconncet.sink == '0') {
                        if (this.count_recByte != 0
                            && this.count_recByte % 16 == 0
                        ) {
                            if (active) this.state = this.PUT_state
                            this.burst = true
                        } else {
                            this.state = this.REC_state
                            this.burst = false
                        }

                    } else 
                    if (active) this.state = this.PUT_state
                    
                }

                if (data_from_interconncet.opcode == '000') {
                    this.println (
                        this.active_println
                        ,'Cycle '
                        + cycle.toString() 
                        +': The DMA is receiving messeage AccessAck from INTERCONNECT.'
                    )
                    
                    this.DMA_Master.receive(data_from_interconncet)
                    if (this.count_sentByte >= parseInt (this.lengthRegister, 2) 
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
                    else  if (active) this.state = this.GET_state
                }
            }
            }
            
        }

        if (this.state == this.GET_state)   {
            this.DMA_Master.ChannelD.ready = '0'
            this.DMA_Slave.ChannelD.valid  = '0'
            if (Interconnect_ready) {
                if (this.count_recByte < parseInt (this.lengthRegister, 2)) {
                    this.println (
                    this.active_println
                    ,'Cycle '
                    + cycle.toString() 
                    +': The DMA is sending messeage GET to INTERCONNET.'
                )
    
                this.DMA_Master.send(
                    'GET',
                    (parseInt(this.sourceRegister.slice(-18), 2) + this.count_recByte).toString(2).padStart(17, '0'),
                    ''
                )
                if (parseInt (this.DMA_Master.ChannelA.address, 2) < 0x20000)
                this.DMA_Master.ChannelA.size = '10'
                else this.DMA_Master.ChannelA.size = '00'
                
                this.DMA_Master.ChannelA.valid = '1'
                this.state = this.REC_state
                }
                else {
                    this.state = this.PUT_state
                }
                
            }
        }

        if (this.state == this.PUT_state)   {
            this.DMA_Master.ChannelD.ready = '0'
            this.DMA_Master.ChannelA.valid = '0'
            if (Interconnect_ready) {

                this.println (
                    this.active_println
                    ,'Cycle '
                    + cycle.toString() 
                    +': The DMA is sending messeage PUT to INTERCONNET.'
                )
                
                this.DMA_Master.send(
                    'PUT',
                    ((parseInt(this.destRegister, 2) + 0 + this.count_sentByte)).toString(2).padStart(17, '0'),
                    this.internal_FIFO.dequeue().data
                )
                this.DMA_Master.ChannelA.valid = '1'
                this.DMA_Master.ChannelD.ready = '0'
                if (this.burst) this.DMA_Master.ChannelA.size  = '10'
                else this.DMA_Master.ChannelA.size ='00'
                this.DMA_Slave.ChannelD.valid  = '0'

                this.count_sentByte += 4
                if (parseInt ('0'+this.destRegister, 2) >= 0x20014) {
                    this.state        = this.REC_state 
                    
                } else {
                    if ((this.count_sentByte != 0   
                        && this.count_sentByte %16 == 0)
                        || this.internal_FIFO.size() == 0
                    ) this.state = this.REC_state
                    else {
                        this.state        = this.PUT_state 
                    }
                }

                return
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

        if (this.state == this.ACKData_state)   {
            if (subInterconnect_ready) {
                const data = this.RegisterFiles('0'.padStart (18, '0'), 
                    this.DMA_Slave.ChannelA.address, 
                    '0'.padStart (32, '0'))
                this.DMA_Slave.send ('AccessAckData', '00', data)
                this.DMA_Slave.ChannelD.sink = '01'
                this.println (
                    this.active_println
                    ,'Cycle '
                    + cycle.toString() 
                    +': The DMA is sending messeage AccessAckData to SUB-INTERCONNECT.'
                )

                this.state = this.REC_state
            }
        }
    }
    

    RegisterFiles(
    writeAddress: string,
    readAddress: string,
    writeData: string
    ): string {
    // 1. Validate độ dài đầu vào
    if (
        writeAddress.length !== 18 ||
        readAddress.length  !== 18 ||
        writeData.length   !== 32
    ) {
        console.log(
        `Invalid length – writeAddress=${writeAddress.length}, ` +
        `readAddress=${readAddress.length}, writeData=${writeData.length}`
        );
        return '0'.repeat(32);
    }

    // 2. Parse binary string thành số
    const writeAddrNum = parseInt(writeAddress, 2);
    const readAddrNum  = parseInt(readAddress,  2);

    // 3. Phần WRITE: gán dữ liệu vào register tương ứng
    switch (writeAddrNum) {
        case 0x20000:
        this.sourceRegister = writeData;
        break;
        case 0x20004:
        this.destRegister   = writeData;
        break;
        case 0x20008:
        this.lengthRegister = writeData;
        break;
        case 0x2000C:
        this.controlRegister = writeData;
        break;
        default:
        console.log(
            `Invalid writeAddress: 0x${writeAddrNum.toString(16).toUpperCase()}`
        );
        // Không return ngay, vẫn phải xử lý phần đọc
    }

    // 4. Phần READ: trả về dữ liệu từ register tương ứng
    let result = '0'.repeat(32);
    console.log ()
    switch (readAddrNum) {
        case 0x20000:
        result = this.sourceRegister;
        break;
        case 0x20004:
        result = this.destRegister;
        break;
        case 0x20008:
        result = this.lengthRegister;
        break;
        case 0x2000C:
        result = this.controlRegister;
        break;
        default:
        console.log(
            `Invalid readAddress: 0x${readAddrNum.toString(16).toUpperCase()}`
        );
    }

    return result;
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
        this.internal_FIFO                    = new FIFO_ChannelD ()
        this.active_println             = true

    }
    
    public reset () {
        this.sourceRegister             = '00000000000000000000000000000000'
        this.destRegister               = '00000000000000000000000000000000'
        this.lengthRegister             = '00000000000000000000000000000000'
        this.controlRegister            = '00000000000000000000000000000000'
        this.statusRegister             = '00000000000000000000000000000000'
        this.state                      = 0
        this.DMA_Master                 = new Master('DMA_Master', true, '01')
        this.DMA_Master.ChannelA.size   = '10'
        this.DMA_Slave                  = new Slave ('DMA_Slave', true)
        this.internal_FIFO                    = new FIFO_ChannelD ()
        this.active_println             = true
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

    


}
