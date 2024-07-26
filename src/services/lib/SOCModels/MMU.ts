import { Tune } from '@mui/icons-material'
import { dec, BinToHex } from './convert'
export default class MMU {
    active: boolean
    physical_address: any
    constructor(active: boolean) {
        this.active = active
        this.physical_address = 0
    }

    public Run (logic_address: any, Imem_point: number, IO_point: number, Dmem_point: number) {
        let message
        console.log(Imem_point, IO_point, Dmem_point)
        if (this.active == false) {
            message= 'WARNING: MMU has not been actived!!!'
        }
        // ABSOLUTE ADDRESS
        if (dec ('0'+logic_address) >=0 && dec ('0'+logic_address) <=IO_point+4) {
            this.physical_address= logic_address
            message= 'MMU is passed!'
        }
        // UNABSOLUTE ADDRESS
        if (dec ('0'+logic_address) >IO_point+4 && dec ('0'+logic_address) <Dmem_point - (Imem_point-IO_point) 
            && this.active == true) {
            this.physical_address= (dec('0' + logic_address) + (Imem_point-IO_point)).toString(2)
            message= 'MMU is running' 
        }
        return [this.physical_address, message]
    }
}
