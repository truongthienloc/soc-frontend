import Slave from './Slave';
import Master from './Master';
import { buffer } from 'stream/consumers';
import { BusAlert, TramSharp } from '@mui/icons-material';

export default class DMA {
    active: boolean;
    slaveDMA: Slave;
    masterDMA: Master;
    Start_addr: number;
    End_addr: number;

    constructor(active: boolean) {
        this.active = active;
        this.Start_addr = 0;
        this.End_addr = 0;
        this.slaveDMA = new Slave('DMA Slave', active);
        this.masterDMA = new Master('DMA Master', active, '01');
    }
    public config (LM_point: number, Imem_point: number) {
        this.Start_addr = LM_point
        this.End_addr   = Imem_point
        this.masterDMA.active = this.active
    }

    public ScanData() {
        let addr = this.Start_addr;
        let trans_buffer: string[] = []; 

        while (addr < this.End_addr) {
            trans_buffer.push(this.masterDMA.send('GET', addr.toString(2), '_', 0, '_').slice(10, 42));
            addr+= 4;
        }
        return trans_buffer
    }
}
