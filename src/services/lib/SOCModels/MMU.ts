import { dec, BinToHex } from './convert'  // Cleaned up unnecessary imports
import Master from './Master'
export default class MMU {
    active: boolean;
    master: Master;
    physical_address: number;  // Explicitly typed as number
    TLB: [number, number, number, number][];  // Define TLB as 2D array of tuples with 4 numbers
    pageNumberPointer: number;
    static readonly BASE_ADDRESS = (96 * 3 + 16) * 4;  // Replace magic numbers with constants
    static readonly PAGE_SIZE = 256;

    constructor(active: boolean) {
        this.active = active;
        this.master = new Master('MMU', true, '0')
        this.physical_address = 0;  // Initialized with a number
        this.pageNumberPointer = 0xffffff;
        this.TLB = new Array(8).fill([0, 0, 0, 0]);  // Initialized as 8 rows of [0, 0, 0, 0]
    }

    public pageReplace(Replacement_page: [number, number, number, number]) {
        let minValue = Infinity;
        let minIndex = -1;

        for (let i = 0; i < this.TLB.length; i++) {
            if (this.TLB[i][3] < minValue) {  // Access the fourth element (index 3)
                minValue = this.TLB[i][3];
                minIndex = i;
            }
        }
        if (minIndex !== -1) this.TLB[minIndex] = Replacement_page;  // Replace with new row values
    }

    public SetTLB(P: [number, number, number, number][], pointer: number) {
        this.TLB = P;
        this.pageNumberPointer = pointer
    }

    public Run(logic_address: string): [string, string] {
        let message: string;
        const page_num = dec('0' + logic_address.slice(18).slice(0, 4));  // Slice first 24 bits for page number
        const offset   = dec('0' + logic_address.slice(18).slice(4));  // Slice the rest for the offset
        if (dec('0' + logic_address) >= 0 && dec('0' + logic_address) <= MMU.BASE_ADDRESS) {
            this.physical_address = dec('0' + logic_address);  // Casting logic_address to number
            message = 'MMU is passed!';
        } else {
            const check_pagenum = this.TLB.map(
                (tlbEntry) => page_num === tlbEntry[0] && tlbEntry[2] === 1
            );

            const exist = check_pagenum.some(Boolean);  // Check if any of the pages exist

            const physical_addresses = this.TLB.map(
                (tlbEntry) => offset + tlbEntry[1]
            );

            if (exist) {
                message = "TLB: PPN is caught.";
                this.physical_address = physical_addresses[check_pagenum.indexOf(true)];
            } else {
                message = "TLB: PPN is missed.";
                this.physical_address = 0;
            }
        }

        return [this.physical_address.toString(2).padStart(32, '0'), message];  // Return binary address
    }
}
