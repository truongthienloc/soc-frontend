import { Tune } from '@mui/icons-material'
import { dec, BinToHex } from './convert'
import { off } from 'process'
export default class MMU {
    active: boolean
    physical_address: any
    TLB: number[][];  // Define as a 2D array of numbers
    pageNumberPointer: number
    constructor(active: boolean) {
        this.active = active;
        this.physical_address = 0;  // Initialize with a number
        this.pageNumberPointer = 0xffffff * 4095
        this.TLB = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
        ];
    }
            // '000' : (96 + 16 + 1024) , // P0 Led_matrix + Monitor&KeyBoard + I-Mem
            // '001' : (96 + 16 + 1024) + 256, // P1
            // '010' : (96 + 16 + 1024) + 256 + 256, // P2
            // '011' : (96 + 16 + 1024) + 256 + 256 + 256, //P3
            // '100' : (96 + 16 + 1024) + 256 + 256 + 256 + 256, // P4
            // '101' : (96 + 16 + 1024) + 256 + 256 + 256 + 256 + 256, // P5
            // '110' : (96 + 16 + 1024) + 256 + 256 + 256 + 256 + 256 + 256, // P6
            // '111' : (96 + 16 + 1024) + 256 + 256 + 256 + 256 + 256 + 256 + 256, //P3
        
    public pageReplace (Replacement_page: [number, number, number, number]) {
        let minValue = Infinity;
        let minIndex = -1;

        for (let i = 0; i < this.TLB .length; i++) 
            if (this.TLB [i][3] < minValue) { // Check the fifth column (index 3)
                minValue = this.TLB [i][3];
                minIndex = i;
            }
        if (minIndex !== -1) this.TLB [minIndex] = Replacement_page; // Replace with new row values
    }
    public SetTLB ( P0: [number, number, number, number], 
                    P1: [number, number, number, number], 
                    P2: [number, number, number, number], 
                    P3: [number, number, number, number], 
                    P4: [number, number, number, number],  
                    P5: [number, number, number, number], 
                    P6: [number, number, number, number], 
                    P7: [number, number, number, number], 
    ) {
        this.TLB [0] = P0
        this.TLB [1] = P1
        this.TLB [2] = P2
        this.TLB [3] = P3
        this.TLB [4] = P4
        this.TLB [5] = P5
        this.TLB [6] = P6
        this.TLB [7] = P7
    }

    public Run (logic_address: any) {
        let message
        const page_num        = dec ('0'+logic_address.slice(0,24))
        const offset          = dec ('0'+logic_address.slice(24))

        // ABSOLUTE ADDRESS
        if (dec ('0'+logic_address) >=0 && dec ('0'+logic_address) <= (96 + 16 + 1024)) {
            this.physical_address= logic_address
            message= 'MMU is passed!'
        } else {
            const check_pagenum0 = (page_num === this.TLB[0][0]) && (this.TLB[0][2]=== 1);
            const check_pagenum1 = (page_num === this.TLB[1][0]) && (this.TLB[1][2]=== 1);
            const check_pagenum2 = (page_num === this.TLB[2][0]) && (this.TLB[2][2]=== 1);
            const check_pagenum3 = (page_num === this.TLB[3][0]) && (this.TLB[3][2]=== 1);
            const check_pagenum4 = (page_num === this.TLB[4][0]) && (this.TLB[4][2]=== 1);
            const check_pagenum5 = (page_num === this.TLB[5][0]) && (this.TLB[5][2]=== 1);
            const check_pagenum6 = (page_num === this.TLB[6][0]) && (this.TLB[6][2]=== 1);
            const check_pagenum7 = (page_num === this.TLB[7][0]) && (this.TLB[7][2]=== 1);
            
            const exist = (check_pagenum0 || check_pagenum1 || check_pagenum2 || check_pagenum3 ||
                           check_pagenum4 || check_pagenum5 || check_pagenum6 || check_pagenum7);            

            const physical_address0 = (offset + this.TLB[0][1])
            const physical_address1 = (offset + this.TLB[1][1])
            const physical_address2 = (offset + this.TLB[2][1])
            const physical_address3 = (offset + this.TLB[3][1])
            const physical_address4 = (offset + this.TLB[4][1])
            const physical_address5 = (offset + this.TLB[5][1])
            const physical_address6 = (offset + this.TLB[6][1])
            const physical_address7 = (offset + this.TLB[7][1])
            
            if  (exist) {
                message = "TLB: PPN is caught."
                if      (check_pagenum0) this.physical_address = physical_address0
                else if (check_pagenum1) this.physical_address = physical_address1 
                else if (check_pagenum2) this.physical_address = physical_address2 
                else if (check_pagenum3) this.physical_address = physical_address3 
                else if (check_pagenum4) this.physical_address = physical_address4 
                else if (check_pagenum5) this.physical_address = physical_address5 
                else if (check_pagenum6) this.physical_address = physical_address6 
                else if (check_pagenum7) this.physical_address = physical_address7 
            }
            else {
                message = "TLB: PPN is missed."
                this.physical_address = page_num + this.pageNumberPointer
            }
        }

        return [(this.physical_address).toString(2).padStart(32, '0'), message]
    }
}
