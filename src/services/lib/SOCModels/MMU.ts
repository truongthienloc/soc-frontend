import { dec, BinToHex } from './convert'
export default class MMU {
    active: boolean
    constructor() {
        this.active= false
    }

    public setActive () {
        this.active =true
    }
    
    public Dmem(virtual_address: any) {
        let physical_address
        physical_address = virtual_address
        return BinToHex (physical_address)
    }
    public InMem(virtual_address: any) {
        let physical_address
        physical_address = virtual_address
        return BinToHex (physical_address)
    }
    public OutMem(virtual_address: any) {
        let physical_address
        physical_address = (dec('0' + virtual_address) + 100).toString(2)
        return BinToHex (physical_address)
    }
}

