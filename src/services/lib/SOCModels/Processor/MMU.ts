import Cycle                                        from "../Compile/cycle"
import {Logger }                                    from '../Compile/soc.d'
import { dec, stringToAsciiAndBinary, BinToHex }    from '../Compile/convert'

export default class MMU {
    active              : boolean
    physical_address    : string
    TLB                 : [ number, number, number, number, number, number, number][] 
    // VA, PA, excute, read, write, valid, timetime 
    satp                : number
    MMU_message         : string

    step                : number
    done                : boolean
    logger             ?: Logger
    active_println      = true


    constructor(active: boolean) {
        this.active             = active

        this.physical_address   = '' // Initialized with a number
        this.satp               = 0
        this.TLB                = new Array(8).fill([0, 0, 0, 0, 0, 0, 0]) // Initialized as 8 rows of [0, 0, 0, 0]
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
        , Processor_action: string
    ) 
    {
        
        if (this.satp < 0x80000000 
            // || parseInt ('0'+logic_address,2) >= 0X1FFFF + 1
            // || parseInt ('0'+logic_address,2) >= 0X1C000
        ) { //1000 0000 0000 0000 0000 0000 0000 0000
            this.MMU_message = ' MMU is bypassed'
            this.physical_address = logic_address.slice(-18)
        } else {
            this.search_in_TLB(logic_address, Processor_action)
        }

        // if (this.MMU_message == " TLB: VPN is caught.") {
        //     if (parseInt ('0'+this.physical_address,2)> this.endAddress) {
        //         this.MMU_message = ' ERROR: Page fault!!!!'
        //     }
        // }

        return
    }
        // VA, PA, excute, read, write, valid, timetime 
    public pageReplace(Replacement_page: [ number, number, number, number, number, number, number]) {
        let minValue = Infinity;
        let minIndex = 0;

        for (let i = 0; i < this.TLB.length; i++) {
            if (this.TLB[i][6] < minValue) {  // Access the fourth element (index 3)
            minValue = this.TLB[i][6]
                minIndex = i
            }
        }
        if (Replacement_page[5] == 1) {
            this.TLB[minIndex] = Replacement_page
        } else {
            this.MMU_message = ' ERROR: Page fault!!!!'
        }

    }

    public Set(
        P            : [ number, number, number, number, number, number, number][]

    ){
        this.TLB               = P
    }

    public search_in_TLB(
        logic_address: string
        , Processor_action: string
    ) {
        const VPN               = logic_address.slice(0, 20)// 10 bit đầu tiên
        const OFFSET            = logic_address.slice(20, 32) // 12 bit cuối cùng
        const vpn_dec           = parseInt(VPN, 2) & 0b11111 
        const offset_dec        = parseInt(OFFSET, 2) & 0xfff 
        let check_pagenum       = [false]
        let check_func          = [false]

        if (Processor_action == 'PUT') {
            check_pagenum = this.TLB.map(
                (tlbEntry) => vpn_dec === tlbEntry[0] && tlbEntry[5] === 1
            )

            check_func  = this.TLB.map(
                (tlbEntry) => tlbEntry[4] === 1
            )
        }

        if (Processor_action == 'GET') {
            check_pagenum = this.TLB.map(
                (tlbEntry) => vpn_dec === tlbEntry[0] && tlbEntry[5] === 1
            )

            check_func  = this.TLB.map(
                (tlbEntry) => tlbEntry[3] === 1
            )
        } 

        if (Processor_action == 'FETCH') {
            check_pagenum = this.TLB.map(
                (tlbEntry) => vpn_dec === tlbEntry[0] && tlbEntry[5] === 1
            )

            check_func  = this.TLB.map(
                (tlbEntry) => tlbEntry[2] === 1
            )
        } 
        

        const exist = check_pagenum.some(Boolean)
        const valid = check_func .some(Boolean)
        
        const physical_addresses = this.TLB.map(
            (tlbEntry) => offset_dec + tlbEntry[1]
        );
        // console.log ('offset_dec', offset_dec)
        // console.log ('tlb', this.TLB)
        // console.log ((this.satp & 0xFFFF) + vpn_dec*4, vpn_dec)

        // console.log ('exist check_func ', exist, valid)

        if (exist) {
            if (valid) {
                this.MMU_message = " TLB: VPN is caught."
                this.physical_address = (physical_addresses[check_pagenum.indexOf(true)]).toString(2).padStart(17, '0')
            }
            else {
                this.MMU_message = ' ERROR: Page fault!!!!'
            }
            
        } else {
            this.MMU_message = " TLB: VPN is missed."
            this.physical_address = ((this.satp & 0xFFFF) + vpn_dec*4).toString(2).padStart(17, '0')
        }

    }
}

