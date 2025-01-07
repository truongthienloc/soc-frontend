import ChannalA from "./ChannelA"
import ChannalD from "./ChannelD"
import { dec, BinToHex } from './convert' 

export default class InterConnect {
    active      : boolean                       ;
    Pin         : any    ;
    Pout        : any   ;
    Pactived    : boolean[]                     ;
    constructor(active: boolean) {
        this.active     = active    ;
        // Initialize arrays
        this.Pin        = [];
        this.Pout       = [];
        this.Pactived   = Array(12).fill(false) ; // Initialize with 12 false values
        // Initialize Pin array
        this.Pin[0] = new ChannalA('000', '000', '10', '00', '0'.padStart(32, '0'), '0000', '0'.padStart(32, '0'), '0');
        this.Pin[1] = new ChannalA('000', '000', '10', '01', '0'.padStart(32, '0'), '0000', '0'.padStart(32, '0'), '0');
        this.Pin[2] = new ChannalD('000', '00', '10', '00', '0', '0', '0'.padStart(32, '0'), '0');
        this.Pin[3] = new ChannalD('000', '00', '10', '00', '0', '0', '0'.padStart(32, '0'), '0');
        this.Pin[4] = new ChannalD('000', '00', '10', '00', '0', '0', '0'.padStart(32, '0'), '0');
        this.Pin[5] = new ChannalD('000', '00', '10', '00', '0', '0', '0'.padStart(32, '0'), '0');
        // Initialize Pout array
        this.Pout[0] = new ChannalD('000', '00', '10', '00', '0', '0', '0'.padStart(32, '0'), '0');
        this.Pout[1] = new ChannalD('000', '00', '10', '00', '0', '0', '0'.padStart(32, '0'), '0');
        this.Pout[2] = new ChannalA('000', '000', '10', '00', '0'.padStart(32, '0'), '0000', '0'.padStart(32, '0'), '0');
        this.Pout[3] = new ChannalA('000', '000', '10', '00', '0'.padStart(32, '0'), '0000', '0'.padStart(32, '0'), '0');
        this.Pout[4] = new ChannalA('000', '000', '10', '00', '0'.padStart(32, '0'), '0000', '0'.padStart(32, '0'), '0');
        this.Pout[5] = new ChannalA('000', '000', '10', '00', '0'.padStart(32, '0'), '0000', '0'.padStart(32, '0'), '0');
    }

    Port_in(data: any, index: number): void {
        if (this.active == true) {
            this.Pin[index]      = data
            this.Pactived[index] = true
        }
    }

    Port_out(index: number): any {
        if (this.active == true) {
            const data = this.Pout[index]
            return data
        }
    }

    Transmit(): void {
        if (this.Pactived[0]==true) {
            const data          = this.Pin[0].data
            const address       = this.Pin[0].address
            this.Pout[2].data   = data.padStart(32, '0') 
            this.Pout[2].source = '00'
            this.Pout[2].address= address
        }
        if (this.Pactived[1]==true) {
            const opcode        = this.Pin[1].opcode
            const address       = this.Pin[1].address
            const data          = this.Pin[1].data
            this.Pout[2].source = '01'
            if (opcode == '100') { // GET
                this.Pout[2].data    = '0'.padStart(32, '0')
                this.Pout[2].address = address
            }
            if (opcode == '000') { //PUT
                
                if ( (dec(address) >= 0) && (dec(address) < 96 * 3 * 4)) {
                    this.Pout[3].data    = data
                }
                if ( (dec(address) > 0) && (dec(address) < (96 * 3 + 16) * 4)) {
                    this.Pout[4].data    = data
                }

            }
        }
        if (this.Pactived[2]==true) {
            const source = this.Pin[2].source
            const opcode = this.Pin[2].opcode
            const data   = this.Pin[2].data
            if (source == '00') {
                if (opcode == '000') {// AccessAck
                    this.Pout[0].data   = '0'.padStart(32, '0')
                    this.Pout[0].source = source
                }
                if (opcode == '001') {// AccessAckData
                    this.Pout[0].data   = data
                    this.Pout[0].source = source
                }
            }
            if (source == '01') {
                if (opcode == '000') {// AccessAck
                    this.Pout[1].data   = '0'.padStart(32, '0')
                    this.Pout[1].source = source
                }
                if (opcode == '001') {// AccessAckData
                    this.Pout[1].data   = data
                    this.Pout[1].source = source
                }
            }
                
        }
        
        if (this.Pactived[3]==true) {

        }
        if (this.Pactived[4]==true) {

        }
        if (this.Pactived[5]==true) {

        }
    }
}

