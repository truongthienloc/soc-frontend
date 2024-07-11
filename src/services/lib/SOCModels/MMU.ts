import { dec, BinToHex } from './convert'
export default class MMU {
    active: boolean
    constructor(active: boolean) {
        this.active = active
    }

    public setActive() {
        this.active = true
    }

    public Dmem(virtual_address: any) {
        let physical_address
        if (this.active== true) {
            physical_address = virtual_address
            return physical_address
        }
        return ''
        
    }
    public InMem(virtual_address: any) {
        let physical_address
        if (this.active== true) {
            physical_address = virtual_address
            return physical_address
        }
        return ''
        
    }
    public OutMem(virtual_address: any) {
        let physical_address
        if (this.active== true) {
            physical_address = (dec('0' + virtual_address) + 100).toString(2)
            return physical_address
        }
        return ''
        
    }
}
