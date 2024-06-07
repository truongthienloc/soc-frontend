import RiscVProcessor from "./RiscV_processor";
import InterConnect from "./Interconnect";
import Memory from "./Memory";


export default class Soc {
    name     : string
    Processor: RiscVProcessor
    Bus      : InterConnect
    Memory   : Memory
    cycle    : number

    constructor (name: string){
        this.Processor = new RiscVProcessor('RiscV CPU', '00', true)
        this.Bus       = new InterConnect()
        this.Memory    = new Memory()
        this.cycle     = 0
        this.name      = name
    }

    public Run (){
        //this.Processor.setImen('.text\n lui x25, 9\n lui x23, 9\n lw x1, 0(x0)')
        this.Processor.setImen('.text\n addi x2, x2, 1')
        while (this.Processor.pc< Object.values(this.Processor.Instruction_memory).length * 4) {
            this.cycle+=1
            const element = this.Processor.Instruction_memory[(this.Processor.pc).toString(2)]
            
            this.Processor.println('CPU is running')
            const [message, data, address, rd] = this.Processor.run(element, this.Processor.pc)
            
            if (message== "PUT") {
                const dm2i = this.Processor.master.send(message, address, '0', this.cycle, data)
                this.Bus.Port_in_CA(dm2i, 0, this.cycle)
                this.Bus.TransmitChannelA()
                this.cycle+=1
                const doutChA= this.Bus.Port_out(0)
                const [di2s, ai2s] = this.Memory.slave.receive(this.cycle, 'Port_out[0]', doutChA)
                this.Memory.DataMemory[ai2s]= di2s
                this.cycle+= 1
                const doutChD= this.Memory.slave.send(this.cycle, 'Port_in[1]', 'AccessAck', '')
                this.Bus.Port_in_CD(doutChD, 1, this.cycle)
                this.Bus.TransmitChannelD()
                this.Bus.Port_out(0)
                this.cycle+=1
            }

            if (message== "GET") {
                const dm2i = this.Processor.master.send(message, address, '0', this.cycle, data)
                this.Bus.Port_in_CA(dm2i, 0, this.cycle)
                this.Bus.TransmitChannelA()
                this.cycle+=1
                const doutChA= this.Bus.Port_out(0)
                const [, ai2s] = this.Memory.slave.receive(this.cycle, 'Port_out[0]', doutChA)
                //const di2s= this.Memory.DataMemory[ai2s]
                const di2s= '0000000000000000000000000000'
                this.cycle+= 1
                const doutChD= this.Memory.slave.send(this.cycle, 'Port_in[1]', 'AccessAck', di2s)
                console.log(doutChD)
                this.Bus.Port_in_CD(doutChD, 1, this.cycle)
                this.Bus.TransmitChannelD()
                //console.log('wrietData',this.Bus.Port_out(0).payload)
                this.Processor.register[rd]= this.Bus.Port_out(0).payload
                this.cycle+=1
            }
        }
    }
    
}