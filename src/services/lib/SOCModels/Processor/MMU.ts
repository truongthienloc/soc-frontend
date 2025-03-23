import Cycle from "../Compile/cycle"

export default class MMU {
    active              : boolean
    physical_address    : string
    TLB                 : [ number, number, number, number][]
    stap                : number
    start_addr          : number
    end_addr            : number
    user_point          : number
    kernel_point        : number
    IO_point            : number
    MMU_message         : string
    step                : number
    done                : boolean


    constructor(active: boolean) {
        this.active             = active
        this.start_addr         = 0
        this.end_addr           = 0
        this.user_point         = 0
        this.kernel_point       = 0
        this.IO_point           = 0

        this.physical_address   = '' // Initialized with a number
        this.stap               = 0
        this.TLB                = new Array(8).fill([0, 0, 0, 0]) // Initialized as 8 rows of [0, 0, 0, 0]
        this.MMU_message        = ''
        this.step               = 0
        this.done               = false
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

    public Set(
        P: [number, number, number, number][]
        , stap       : number
        , end_addr      : number
        , start_addr    : number
        , user_point    : number
        , kernel_point  : number
        , IO_point      : number
    ){
        this.TLB               = P
        this.stap              = stap
        this.user_point        = user_point
        this.end_addr          = end_addr
        this.start_addr        = start_addr 
        this.kernel_point      = kernel_point
        this.IO_point          = IO_point
    }

    public search_in_TLB(logic_address: string) {
        let message: string;
        
        const VPN               = logic_address.slice(0, 20)// 10 bit đầu tiên
        const OFFSET            = logic_address.slice(20, 32) // 12 bit cuối cùng
        const vpn_dec           = parseInt(VPN, 2) & 0b1111
        const offset_dec        = parseInt(OFFSET, 2);
        const logic_address_dec = parseInt(logic_address, 2);

        // if ( (logic_address_dec >= 0 && logic_address_dec <= this.kernel_point) || 
        //      (logic_address_dec >= this.user_point && logic_address_dec <= this.IO_point)){
        //     this.physical_address = logic_address_dec;
        //     message = 'MMU is passed!';
        // } else {
            // Kiểm tra trong TLB xem có VPN1 hay không và giá trị cột thứ 2 có bằng 1 không
            const check_pagenum = this.TLB.map(
                (tlbEntry) => vpn_dec === tlbEntry[0] && tlbEntry[2] === 1 
            );
    
            const exist = check_pagenum.some(Boolean);
            
            const physical_addresses = this.TLB.map(
                (tlbEntry) => offset_dec + tlbEntry[1]
            );
    
            if (exist) {
                this.MMU_message = " TLB: VPN is caught.";
                this.physical_address = (physical_addresses[check_pagenum.indexOf(true)]).toString(2).padStart(17, '0')
            } else {
                this.MMU_message = " TLB: VPN is missed.";
                this.physical_address = (this.stap + vpn_dec*4).toString(2).padStart(17, '0')
            }

    }


    public run (
        logic_address   : string
    ) 
    {

        if (parseInt(logic_address, 2) < 0X04000) {
            this.MMU_message = ' MMU is bypassed'
            return
        } else {
            this.search_in_TLB(logic_address)
        }

        // if (parseInt( this.physical_address,2) > this.end_addr) {
        //     this.MMU_message = 'Page fault!!!!'
        //     return
        // }

        // return this.physical_address
        
        // console.log('stap', this.stap)
        // console.log  ('Cycle ', cycle.toString()+' : ' + this.MMU_message)
        //this.println ('Cycle ', this.cycle.toString()+' : ' + MMU_message)

        // if (this.MMU_message == ' TLB: VPN is missed.') {
        //     const VPN       = logic_address.slice(0, 20)  // 10 bit đầu tiên
        //     const stap      = this.stap
  
        //     const PTE       = stap + (parseInt(VPN , 2) & 0xf)* 4
        //     return this.physical_address
        // } else {
        //     if (parseInt(physical_address,2) > this.end_addr) {
        //         this.MMU_message = 'Page fault!!!!'
        //     }
        //     return physical_address
        // }
    }
}

