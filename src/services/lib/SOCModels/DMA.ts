import Slave from './Slave';
import Master from './Master';
import ChannalD from './ChannelD';

export default class DMA {
    active: boolean
    masterDMA: Master

    Src_addr: number
    Des_addr: number
    Size: number
    buffer: boolean[][]
    phase: boolean
    line_rec: number
    line_send: number
    offset_send: number
    
    constructor(active: boolean) {
        this.active     = active
        this.Des_addr   = 0
        this.Src_addr   = 0
        this.Size       = 0
        this.phase      = false
        this.line_rec   = 0
        this.line_send  = 0
        this.offset_send  = 0

        this.masterDMA = new Master('DMA Master', active, '01');
        this.buffer = Array(96).fill(null).map(() => Array(96).fill(false));
    }

    public config(Des_addr: number, Src_addr: number, Size: number) {
        this.Des_addr = Des_addr;
        this.Src_addr = Src_addr;
        this.Size = Size;
    }

    public SENDtoMemory() {
        this.masterDMA.active = this.active;
        if (this.Size > 0) {
            this.masterDMA.send('GET', this.Src_addr.toString(2), '');
            this.Size -= 4;
        } else {
            this.active = false;
        }
    }

    public RECfromMemory(channelD: ChannalD) {
        this.masterDMA.active = this.active;
        if (this.line_rec < 96) {
            let data = this.masterDMA.receive('AccessAckData', channelD);
            // console.log('data: ', data)
            let boolArray: boolean[] = data.split('').map(char => char === '1');
            // console.log ('boolArray: ', boolArray)
            // console.log ('data: ', this.active)
            for (let j = 0; j < 32; j++) {
                this.buffer[this.line_rec][j] = boolArray[j];
            }
            this.line_rec = (this.line_rec + 32) % 96;
        } else {
            this.active = false;
        }
    }

    public SENDtoLED() {
        this.masterDMA.active = this.active;
        if (this.line_send < 96) {
            let row         = this.buffer[this.line_send]
            let data1       = row.slice(this.offset_send*32, this.offset_send*32 + 32).map(value => value ? '1' : '0').join('')
            this.masterDMA.send('PUT', this.Des_addr.toString(2), data1)
            
            this.line_send  = (this.line_send + 32) % 96
        } else 
        {
            this.active = false
        }
        return this.masterDMA.ChannelA.data
    }
}


    
    // public Send2Memory () {
    //     this.masterDMA.active = this.active
    //     this.masterDMA.send('GET', this.SendAddrM.toString(2), '')
    //     if (this.CountTransaction == this.NumTransaction) {
    //         this.SendAddrM        = 0
    //         this.CountTransaction = 0
    //     } else this.SendAddrM += this.Start_addr + 4
    // }

    // public ReceivefMemory (data: string) {
    //     this.Databuffer[this.bufferPointerW.toString(2).padStart(32, '0')] = data
    //     this.ReceiveAddr     = this.ReceiveAddr + 1
    //     if (this.bufferPointerW <= this.Len) this.bufferPointerW += 4
    //     else this.bufferPointerW = 0
    // }

    // public Send2Peri ()  {
    //     //this.CountTransaction += 1
    //     const data = this.Databuffer[this.bufferPointerR.toString(2).padStart(32, '0')] 
    //     this.masterDMA.send('PUT', this.bufferPointerR.toString(2),  data)
    //     if (this.bufferPointerR == this.Len) {
    //         this.bufferPointerR        = 0
    //     }
    //     else this.bufferPointerR += this.bufferPointerR + 4

    // }
    
    
    // public ScanData() {
    //     let addr = this.Start_addr;
    //     let trans_buffer: string[] = [];
    //     const TransLen = this.NumTransaction;

    //     for (let i = 0; i < TransLen; i++) {
    //         trans_buffer.push(
    //             this.masterDMA.send('GET', addr.toString(2), '_', 0, '_').slice(10, 42)
    //         );
    //         addr += 4; 
    //     }
    //     return trans_buffer;
    // }
    
    // public getData(mem: { [key: string]: string}) {
    //     const address = this.ScanData()
    //     const result = [] as string[]
    //     for (const element of address) {
    //         result.push(mem[element])
    //     }
    //     return result
    // }

