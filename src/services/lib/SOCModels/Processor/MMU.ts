import Cycle                                        from "../Compile/cycle"
import {Logger }                                    from '../Compile/soc.d'
import { dec, stringToAsciiAndBinary, BinToHex }    from '../Compile/convert'

export default class MMU {
    active              : boolean
    physical_address    : string
    TLB                 : [ number, number, number, number][]
    satp                : number
    MMU_message         : string

    step                : number
    endAddress          : number
    done                : boolean
    logger             ?: Logger
    active_println      = true


    constructor(active: boolean) {
        this.active             = active
        this.endAddress         = 0

        this.physical_address   = '' // Initialized with a number
        this.satp               = 0
        this.TLB                = new Array(8).fill([0, 0, 0, 0]) // Initialized as 8 rows of [0, 0, 0, 0]
        this.MMU_message        = ''
        this.step               = 0
        this.done               = false

    }

    public setLogger(logger: Logger) {
        this.logger = logger
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

    public run (
        logic_address   : string
    ) 
    {

        if (this.satp < 0x80000000 || parseInt ('0'+logic_address,2) >= 0X1FFFF + 1) { //1000 0000 0000 0000 0000 0000 0000 0000
            this.MMU_message = ' MMU is bypassed'
            this.physical_address = logic_address.slice(-18)
        } else {
            this.search_in_TLB(logic_address)
        }

        if (this.MMU_message == " TLB: VPN is caught.") {
            if (parseInt ('0'+this.physical_address,2)> this.endAddress) {
                this.MMU_message = ' ERROR: Page fault!!!!'
            }
        }

        return
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
        P            : [
        number
        , number
        , number
        , number
        ][]
        , satp       : number
        , endAddress : number 

    ){
        this.TLB               = P
        this.satp              = satp
        this.endAddress        = endAddress

    
    }

    public search_in_TLB(logic_address: string) {
        const VPN               = logic_address.slice(0, 20)// 10 bit đầu tiên
        const OFFSET            = logic_address.slice(20, 32) // 12 bit cuối cùng
        const vpn_dec           = parseInt(VPN, 2) & 0b11111 
        const offset_dec        = parseInt(OFFSET, 2) & 0xfff 
        const check_pagenum = this.TLB.map(
            (tlbEntry) => vpn_dec === tlbEntry[0] && tlbEntry[2] === 1 
        );

        const exist = check_pagenum.some(Boolean)
        
        const physical_addresses = this.TLB.map(
            (tlbEntry) => offset_dec + tlbEntry[1]
        );

        if (exist) {
            this.MMU_message = " TLB: VPN is caught."
            this.physical_address = (physical_addresses[check_pagenum.indexOf(true)]).toString(2).padStart(17, '0')
        } else {
            this.MMU_message = " TLB: VPN is missed."
            this.physical_address = (this.satp & 0xFFFF + vpn_dec*4).toString(2).padStart(17, '0')
        }

    }
}

