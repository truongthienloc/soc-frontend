import { Tune } from '@mui/icons-material'
import { dec, BinToHex } from './convert'
import { off } from 'process'
export default class MMU {
    active: boolean
    physical_address: any
    page_table : { [key: string]: number }
    constructor(active: boolean) {
        this.active = active
        this.physical_address = 0
        this.page_table = {
            '000' : (96 + 16 + 1024) , // P0 Led_matrix + Monitor&KeyBoard + I-Mem
            '001' : (96 + 16 + 1024) + 256, // P1
            '010' : (96 + 16 + 1024) + 256 + 256, // P2
            '011' : (96 + 16 + 1024) + 256 + 256 + 256, //P3
            '100' : (96 + 16 + 1024) + 256 + 256 + 256 + 256, // P4
            '101' : (96 + 16 + 1024) + 256 + 256 + 256 + 256 + 256, // P5
            '110' : (96 + 16 + 1024) + 256 + 256 + 256 + 256 + 256 + 256, // P6
            '111' : (96 + 16 + 1024) + 256 + 256 + 256 + 256 + 256 + 256 + 256, //P3
        }
    }

    public Run (logic_address: any, IO_point: number) {
        let message
        const page_num        = logic_address.slice(0,3)
        const offset          = logic_address.slice(3)
        const frame_num       = this.page_table[page_num] * 4
        this.physical_address = (frame_num + dec('0'+offset)).toString(2)

        console.log ('MMU', dec ('0'+this.physical_address), frame_num, )

        //console.log(Imem_point, IO_point, Dmem_point)
        if (this.active == false) {
            message= 'WARNING: MMU has not been actived!!!'
        }
        // ABSOLUTE ADDRESS
        if (dec ('0'+logic_address) >=0 && dec ('0'+logic_address) <=IO_point+4) {
            this.physical_address= logic_address
            message= 'MMU is passed!'
        }
        // // UNABSOLUTE ADDRESS
        // if (dec ('0'+logic_address) >IO_point+4 && dec ('0'+logic_address) <Dmem_point - (Imem_point-IO_point) 
        //     && this.active == true) {
        //     this.physical_address= (dec('0' + logic_address) + (Imem_point-IO_point)).toString(2)
        //     message= 'MMU is running' 
        // }
        return [this.physical_address, message]
    }
}
