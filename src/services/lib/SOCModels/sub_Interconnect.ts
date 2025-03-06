import ChannalA from "./ChannelA"
import ChannalD from "./ChannelD"
import { dec, BinToHex } from './convert' 

export default class sub_InterConnect {
    active                  : boolean                       
    Pin                     : any    
    Pout                    : any   
    Pactived                : boolean[]   
    Monitor_point           : number
    Keyboard_point          : number
    Led_matrix_point        : number
             
    constructor(active: boolean) {
        this.active                 = active    
        this.Monitor_point          = 0 
        this.Keyboard_point         = 0
        this.Led_matrix_point       = 0
        // Initialize arrays
        this.Pin        = [];
        this.Pout       = [];
        this.Pactived   = Array(8).fill(false) ; // Initialize with 12 false values

        // Initialize Pin array
        this.Pin[0] = new ChannalA( '000'   ,                   //opcode 
                                    '000'   ,                   //para
                                    '10'    ,                   //size
                                    '00'    ,                   //source
                                    '0'.padStart(17, '0'),      //address
                                    '0000'  ,                   //mask
                                    '0'.padStart(32, '0'),      //data
                                    '0'                         //corrupt
        );
        
        this.Pin[1] = new ChannalD('000',                       //opcode
                                    '00',                       //param
                                    '10',                       //size
                                    '00',                       //source
                                    '0'.padStart(21, '0') ,     //sink
                                    '0' ,                       //denied
                                    '0'.padStart(32, '0'),      //data
                                    '0'                         //corrupt
        );

        this.Pin[2] = new ChannalD('000',                       //opcode
                                    '00',                       //param
                                    '10',                       //size
                                    '00',                       //source
                                    '0'.padStart(21, '0') ,     //sink
                                    '0' ,                       //denied
                                    '0'.padStart(32, '0'),      //data
                                    '0'                         //corrupt
        );

        this.Pin[3] = new ChannalD( '000',                       //opcode
                                    '00',                       //param
                                    '10',                       //size
                                    '00',                       //source
                                    '0'.padStart(21, '0') ,     //sink
                                    '0' ,                       //denied
                                    '0'.padStart(32, '0'),      //data
                                    '0'                         //corrupt
        );
        
        // Initialize Pout array
        this.Pout[0] = new ChannalD('000',                       //opcode
                                    '00',                       //param
                                    '10',                       //size
                                    '00',                       //source
                                    '0'.padStart(21, '0') ,     //sink
                                    '0' ,                       //denied
                                    '0'.padStart(32, '0'),      //data
                                    '0'                         //corrupt
        );
        this.Pout[1] = new ChannalD('000',                       //opcode
                                    '00',                       //param
                                    '10',                       //size
                                    '00',                       //source
                                    '0'.padStart(21, '0') ,     //sink
                                    '0' ,                       //denied
                                    '0'.padStart(32, '0'),      //data
                                    '0'                         //corrupt
        );
        this.Pout[2] =  new ChannalA('000'   ,                   //opcode 
                                    '000'   ,                   //para
                                    '10'    ,                   //size
                                    '00'    ,                   //source
                                    '0'.padStart(17, '0'),      //address
                                    '0000'  ,                   //mask
                                    '0'.padStart(32, '0'),      //data
                                    '0'                         //corrupt
        );
        this.Pout[3] =  new ChannalA('000'   ,                   //opcode 
                                    '000'   ,                   //para
                                    '10'    ,                   //size
                                    '00'    ,                   //source
                                    '0'.padStart(17, '0'),      //address
                                    '0000'  ,                   //mask
                                    '0'.padStart(32, '0'),      //data
                                    '0'                         //corrupt
        );
       
    }
    setaddress (Monitor_point  : number, Keyboard_point : number, Led_matrix_point: number) {
        this.Monitor_point          = Monitor_point
        this.Keyboard_point         = Keyboard_point
        this.Led_matrix_point       = Led_matrix_point
    }

    Port_in(data: any, index: number): void {
        if (this.active == true) {
            this.Pin[index]      = data
            this.Pactived[index] = true
        }
    }

    Port_out(index: number): any {
        if (this.active == true) {
            const data = this.Pout[index]
            return data
        }
    }

    Transmit(): void {
        if (this.Pactived[0]==true) {
            const data          = this.Pin[0].data
            const address       = this.Pin[0].address
            if ( 0x1fff < (dec ('0' + address)) && (dec ('0' + address)) < this.Led_matrix_point) { //led_matrix
                this.Pout[3].data   = data.padStart(32, '0') 
                this.Pout[3].source = '01'
                this.Pout[3].address= address
                this.Pout[3].opcode = '000' //PUT 
            }
            if ( this.Led_matrix_point + 1 < (dec ('0' + address)) && (dec ('0' + address)) < this.Monitor_point) {
                this.Pout[2].data   = data.padStart(32, '0') 
                this.Pout[2].source = '01'
                this.Pout[2].address= address
                this.Pout[2].opcode = '000' //PUT
            }
            if (this.Monitor_point + 1 < (dec ('0' + address)) && (dec ('0' + address)) < this.Keyboard_point) {
                this.Pout[1].data   = data.padStart(32, '0') 
                this.Pout[1].source = '01'
                this.Pout[1].address= address
                this.Pout[1].opcode = '100' //GET
            }
        }
        if (this.Pactived[1]==true) {
            const opcode         = this.Pin[1].opcode
            const address        = this.Pin[1].address
            const data           = this.Pin[1].data
            this.Pout[0].data    = '0'.padStart(32, '0') //MATRIX RESPONSE PUT
            this.Pout[0].address = address

        }
        if (this.Pactived[2]==true) {
            const opcode        = this.Pin[1].opcode
            const address       = this.Pin[1].address
            const data          = this.Pin[1].data
            this.Pout[0].data   = data.padStart(32, '0') //DISPLAY RESPONSE PUT
            this.Pout[0].source = '00'
            this.Pout[0].address= address
        }
        if (this.Pactived[2]==true) {
            const opcode        = this.Pin[1].opcode
            const address       = this.Pin[1].address
            const data          = this.Pin[1].data
            this.Pout[3].data   = data.padStart(32, '0') //KEYBOARD RESPONSE PUT
            this.Pout[3].source = '00'
            this.Pout[3].address= address
                
        }
    }
}

