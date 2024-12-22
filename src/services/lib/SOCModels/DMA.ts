import Slave from './Slave';
import Master from './Master';
import { buffer } from 'stream/consumers';
import { BusAlert, TramSharp } from '@mui/icons-material';

export default class DMA {
    active          : boolean
    slaveDMA        : Slave
    masterDMA       : Master
    Start_addr      : number
    NumTransaction  : number
    CountTransaction: number
    SendAddr        : number 
    Databuffer      : string[]
    Addrbuffer      : string[]
    ReceiveAddr     : number

    constructor(active: boolean) {
        this.active             = active
        this.CountTransaction   = 0
        this.Start_addr         = 0
        this.NumTransaction     = 0
        this.SendAddr           = 0
        this.slaveDMA           = new Slave('DMA Slave', active)
        this.masterDMA          = new Master('DMA Master', active, '01')
        this.Databuffer         = []
        this.Addrbuffer         = []
        this.ReceiveAddr        = 0

    }
    
    public config (Start_addr: number, NumTransaction: number) {
        let addr                = Start_addr
        this.Start_addr         = Start_addr
        this.NumTransaction     = NumTransaction
        this.masterDMA.active   = this.active
        for (let i = 0; i < NumTransaction; i++) {
            this.Databuffer.push('0'.padStart(32, '0'));
            addr += 4; 
        }
    }

    public Send (): string {
        let mstmess = ''
        //console.log("this.SendAddr",this.SendAddr)
        this.CountTransaction += 1
        mstmess = this.masterDMA.send('GET', this.SendAddr.toString(2), '_', 0, '_')
        if (this.CountTransaction == this.NumTransaction) {
            this.SendAddr         = 0
            this.CountTransaction = 0
        }
        else this.SendAddr += this.Start_addr + 4
        return mstmess
    }

    public Receive (memoryMesseage: string) {
        const prefix = '0010010'; 
        const suffix = '1110';
        const postfix = '00'; 

        const prefixLength = prefix.length;
        const sourceEndIndex = memoryMesseage.indexOf(suffix, prefixLength); 
        
        if (sourceEndIndex === -1) {
            throw new Error("Invalid memoryMesseage format: Unable to find suffix.");
        }
    
        const dataStartIndex = sourceEndIndex + suffix.length;
        const dataEndIndex = memoryMesseage.length - postfix.length;
        this.Databuffer[this.ReceiveAddr] = memoryMesseage.slice(dataStartIndex, dataEndIndex);
        this.ReceiveAddr = this.ReceiveAddr + 1
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
