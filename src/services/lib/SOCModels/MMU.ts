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
        this.active             = active;
        this.master             = new Master('MMU', true, '0')
        this.physical_address   = 0;  // Initialized with a number
        this.pageNumberPointer  = 0xffffff;
        this.TLB                = new Array(8).fill([0, 0, 0, 0]);  // Initialized as 8 rows of [0, 0, 0, 0]
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

    public Run(logic_address: string, PageTablePointer1: number): [string, string] {
        let message: string;
        
        // Tách các trường từ địa chỉ logic
        const VPN0      = logic_address.slice(0, 10);  // 10 bit đầu tiên
        const VPN1      = logic_address.slice(10, 20); // 10 bit tiếp theo
        const OFFSET    = logic_address.slice(20, 32); // 12 bit cuối cùng
    
        // Chuyển đổi từ nhị phân sang số nguyên
        const vpn0_dec          = parseInt(VPN0, 2)
        const vpn1_dec          = parseInt(VPN1, 2) ;
        const offset_dec        = parseInt(OFFSET, 2);
        const check_page        = (16 * 4 * vpn0_dec + vpn1_dec * 4)  + PageTablePointer1
        const logic_address_dec = parseInt(logic_address, 2);
        
        if (logic_address_dec >= 0 && logic_address_dec <= MMU.BASE_ADDRESS) {
            this.physical_address = logic_address_dec;
            message = 'MMU is passed!';
        } else {
            // Kiểm tra trong TLB xem có VPN1 hay không và giá trị cột thứ 2 có bằng 1 không
            const check_pagenum = this.TLB.map(
                (tlbEntry) => check_page === tlbEntry[0] && tlbEntry[2] === 1
            );
    
            const exist = check_pagenum.some(Boolean);
            
            const physical_addresses = this.TLB.map(
                (tlbEntry) => offset_dec + tlbEntry[1]
            );
    
            if (exist) {
                message = "TLB: PPN is caught.";
                this.physical_address = physical_addresses[check_pagenum.indexOf(true)];
            } else {
                message = "TLB: PPN is missed.";
                this.physical_address = 0;
            }
        }
        
        return [this.physical_address.toString(2).padStart(32, '0'), message];
    }
}
