import Slave from './Slave';
import Master from './Master';
import { buffer } from 'stream/consumers';
import { BusAlert, TramSharp } from '@mui/icons-material';

export default class DMA {
    active          : boolean
    slaveDMA        : Slave
    masterDMA       : Master

    Start_addr      : number
    Des_addr        : number
    NumTransaction  : number
    CountTransaction: number
    SendAddrM       : number 
    BufferLen       : number
    SendAddrP       : number
    Databuffer      : { [key: string]: string }

    bufferPointerW  : number
    bufferPointerR  : number

    Addrbuffer      : string[]
    ReceiveAddr     : number

    constructor(active: boolean) {
        this.active             = active
        this.Des_addr           = 0
        this.Start_addr         = 0

        this.SendAddrP          = 0
        this.SendAddrM          = 0
        this.CountTransaction   = 0

        this.NumTransaction     = 0

        this.slaveDMA           = new Slave('DMA Slave', active)
        this.masterDMA          = new Master('DMA Master', active, '01')

        this.BufferLen          = 0
        this.Databuffer         = {}
        this.bufferPointerW     = 0
        this.bufferPointerR     = 0
        this.Addrbuffer         = []
        this.ReceiveAddr        = 0
    }

    public config (Des_addr: number, Start_addr: number,
                   BufferLen: number, NumTransaction: number
    ) {
        this.Des_addr           = Des_addr
        this.Start_addr         = Start_addr
        this.BufferLen          = BufferLen
        this.NumTransaction     = NumTransaction
        for (let i = 0; i < this.BufferLen * 4; i+=4) {
            this.Databuffer[i.toString(2).padStart(32, '0')] = '0'.padStart(32, '0');
        }
    }
    
    public Send2Memory (): string {
        let mstmess = ''
        //console.log("this.SendAddrM",this.SendAddrM)
        this.CountTransaction += 1
        mstmess = this.masterDMA.send('GET', this.SendAddrM.toString(2), '_', 0, '_')
        if (this.CountTransaction == this.NumTransaction) {
            this.SendAddrM        = 0
            this.CountTransaction = 0
        }
        else this.SendAddrM += this.Start_addr + 4
        return mstmess
    }

    public ReceivefMemory (memoryMesseage: string) {
        const prefix = '0010010'; 
        const suffix = '1110';
        const postfix = '00'; 

        const prefixLength = prefix.length;
        const sourceEndIndex = memoryMesseage.indexOf(suffix, prefixLength); 
        
        if (sourceEndIndex === -1) {
            throw new Error("Invalid memoryMesseage format: Unable to find suffix.");
        }
    
        const dataStartIndex = sourceEndIndex + suffix.length;
        const dataEndIndex   = memoryMesseage.length - postfix.length;
        this.Databuffer[this.bufferPointerW.toString(2).padStart(32, '0')] = memoryMesseage.slice(dataStartIndex, dataEndIndex);
        this.ReceiveAddr     = this.ReceiveAddr + 1
        if (this.bufferPointerW <= this.BufferLen) this.bufferPointerW += 4
        else this.bufferPointerW = 0
    }

    public Send2Peri (): string {
        let mstmess = ''
        //this.CountTransaction += 1
        const data = this.Databuffer[this.bufferPointerR.toString(2).padStart(32, '0')] 
        //console.log("this.Addrbuffer[this.SendAddrP]", this.Databuffer[this.SendAddrP.toString(2).padStart(32, '0')])
        mstmess = this.masterDMA.send('PUT', this.bufferPointerR.toString(2), '_', 0, data)
        if (this.bufferPointerR == this.BufferLen) {
            this.bufferPointerR        = 0
        }
        else this.bufferPointerR += this.Des_addr + 4
        return mstmess
    }
    
    
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
}
