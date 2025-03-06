import { BinToHex, stringToAsciiAndBinary } from "../convert"
import ChannalA from "../ChannelA"
import ChannalD from "../ChannelD"
import Soc from "../SoC"
import { dec } from "../sub_function"

export async function Step(this: Soc) {   
//---------------------------------------------------------------------------------------------------------\\
        this.Check_Processor ()
//---------------------------------------------------------------------------------------------------------\\
        // ****************RUN SYSTEM ****************
        let  [CPU_message, CPU_data, logical_address, rd, size] = this.Processor_run ()
        this.Ecall(CPU_message)
        this.Check_otherComponents ()
        // CHECK ADDRESS
        if (dec('0' + logical_address) % 4 != 0) {
            console.log('ERORR: Invaild Address!!!')
            this.println('ERORR: Invaild Address!!!')
            return
        }
        const physical_address = this.MMU_run (logical_address)

        this.cycle += 1
        this.println(
            'Cycle ',
            this.cycle.toString(),
            ': Logical_address: ',
            BinToHex(logical_address),
            ' Physical address: ',
            BinToHex(physical_address),
        )
        console.log(
            'Cycle ',
            this.cycle.toString(),
            ': Virtual address: ',
            BinToHex(logical_address),
            ' Physical address: ',
            BinToHex(physical_address)
        )
        
        // IF MESSAGE IS PUT (STORE): 
        if (CPU_message == 'PUT') {
            this.println('Cycle '       , 
                this.cycle.toString()   , 
                ': The CPU is sending a PUT message to MEMORY through the INTERCONNECT.'
            )
            console.log ('Cycle '       , 
                this.cycle.toString()   , 
                ': The CPU is sending a PUT message to MEMORY through the INTERCONNECT.'
            )
                
            // PROCESSOT is sending PUT
            this.Processor.master.send(
                CPU_message         ,
                physical_address    ,
                CPU_data            ,
            )
            const dm2i = this.Processor.master.ChannelA
            this.Bus.Port_in(dm2i, 0) // CPU IS LOADING DATA INTO PORT[1]

            //INTERCONNCET RUN
            this.cycle += 1
            this.view?.interconnect.setIsRunning(this.Bus.active)
            this.Bus.Transmit() // INTERCONNECT IS TRANSMITTING
            this.println(
                'Cycle ',
                this.cycle.toString(),
                ': The INTERCONNECT is forwarding the message to MEMORY.',
            )
            console.log(
                'Cycle ',
                this.cycle.toString(),
                ': The INTERCONNECT is forwarding the message to MEMORY.',
            )
            
            //MEMORY RUN
            this.cycle      += 1
            const cpu2mem    = this.Bus.Port_out(2) // GET DATA FROM POUT[0], POUT[0] IS POUT FOR MEMORY
            this.view?.memory.setIsRunning(this.Memory.active)
            this.println(
                'Cycle ',
                this.cycle.toString(),
               ': The MEMORY is receiving a PUT message from the INTERCONNECT.',
            )
            console.log(
                'Cycle ',
                this.cycle.toString(),
                ': The MEMORY is receiving a PUT message from the INTERCONNECT.',
            )
            const [di2s, ai2s] = this.Memory.slaveMemory.receive(cpu2mem)
            // console.log ('data and address', di2s, ai2s)
            this.Memory.Memory[ai2s] = di2s
            //console.log(" this.Memory.Memory[ai2s]: ",  this.Memory.Memory[ai2s])

            // MEMORY RESPONSE
            this.cycle += 1
            const mem2cpu = this.Memory.slaveMemory.ChannelD
            this.Bus.Port_in(mem2cpu, 0)
            this.Memory.slaveMemory.send('AccessAck','00', '')
            this.println(
                'Cycle ',
                this.cycle.toString(),
                ': The MEMORY is sending an AccessAck message to the CPU.',
            )
            console.log(
                'Cycle ',
                this.cycle.toString(),
                ': The MEMORY is sending an AccessAck message to the CPU.',
            )

            this.cycle += 1
            this.Bus.Transmit()
            this.println(
                'Cycle ',
                this.cycle.toString(),
               ': The INTERCONNECT is forwarding the message to CPU.',
            )
            console.log(
                'Cycle ',
                this.cycle.toString(),
                ': The INTERCONNECT is forwarding the message to CPU.',
            )

            this.cycle += 1
            this.Bus.Port_out(1)
            this.println(
                'Cycle ',
                this.cycle.toString(),
                ': The CPU is receiving an AccessAck message from the INTERCONNECT.',
            )
            console.log(
                'Cycle ',
                this.cycle.toString(),
                ': The CPU is receiving an AccessAck message from the INTERCONNECT.',
            )
        }

        // IF MESSAGE IS GET (LOAD): 
        if (CPU_message == 'GET') {
        this.println(
            'Cycle ', 
            this.cycle.toString(), 
            ': The CPU is sending a GET message to MEMORY through the INTERCONNECT.'
        )
        console.log (
            'Cycle ', 
            this.cycle.toString(), 
            ': The CPU is sending a GET message to MEMORY through the INTERCONNECT.'
        )
        // PROCESSOT is sending GET
        this.Processor.master.send(
            CPU_message,
            physical_address,
            CPU_data,
        )
        const dm2i =  this.Processor.master.ChannelA
        this.Bus.Port_in(dm2i, 0)
        //INTERCONNCET RUN
        
        this.cycle += 1
        this.println(
            'Cycle ',
            this.cycle.toString(),
            ': The INTERCONNECT is forwarding the message to MEMORY.',
        )
        console.log(
            'Cycle ',
            this.cycle.toString(),
            ': The INTERCONNECT is forwarding the message to MEMORY.',
        )
        this.view?.interconnect.setIsRunning(this.Bus.active)
        this.Bus.Transmit() // INTERCONNECT IS TRANSMITTING

        //MEMORY RUN
        this.cycle += 1
        this.println(
            'Cycle ',
            this.cycle.toString(),
            ': MEMORY is receiving message from INTERCONNECT',
        )
        console.log(
            'Cycle ',
            this.cycle.toString(),
            ': MEMORY is receiving message from INTERCONNECT',
        )
        const cpu2mem = this.Bus.Port_out(2) // GET DATA FROM POUT[0], POUT[0] IS POUT FOR MEMORY
        this.view?.memory.setIsRunning(this.Memory.active)
        const [, ai2mem] = this.Memory.slaveMemory.receive(cpu2mem)
        let di2mem= this.Memory.Memory[ai2mem] 
        
        // // KEYBOARD
        // if (dec ('0'+ai2mem)== this.Memory.IO_point + 4) {
        //     this.println('Cycle ', this.cycle.toString(), ': KEYBOARD is waiting')
        //     console.log('Cycle ', this.cycle.toString(), ': KEYBOARD is waiting')
        //     this.view?.keyboard.setIsRunning(this.active_keyboard)
        //     this.keyboard?.getEvent().once('line-down', (text: string) => {di2mem = stringToAsciiAndBinary(text).binary.join('')})
        //     await this.delay()
        // }

        // MEMORY RESPONSE
        this.cycle += 1
        this.println(
            'Cycle ',
            this.cycle.toString(),
            ': MEMORY is sending ACCESS_ACK message to CPU',
        )
        console.log(
            'Cycle ',
            this.cycle.toString(),
            ': MEMORY is sending ACCESS_ACK message to CPU',
        )
        this.Memory.slaveMemory.send('AccessAckData','00', di2mem)
        const mem2cpu = this.Memory.slaveMemory.ChannelD
        this.Bus.Port_in(mem2cpu, 2) //FIX ME

        this.cycle += 1
        this.println(
            'Cycle ',
            this.cycle.toString(),
            ': INTERCONNECT is sending message to CPU',
        )
        console.log(
            'Cycle ',
            this.cycle.toString(),
            ': INTERCONNECT is sending message to CPU',
        )
        this.Bus.Transmit()

        this.cycle += 1
        const di2m = this.Bus.Port_out(0).data
        if (di2m === 'undefined' || di2m === undefined) this.Processor.register[rd] = '0'.padStart(32, '0')
        if (di2m !== 'undefined' && di2m !== undefined) this.Processor.register[rd] = (di2m.slice(-34)).slice(0,32)
        this.println(
            'Cycle ',
            this.cycle.toString(),
            ': CPU is receiving ACCESS_ACK_DATA message from INTERCONNECT',
        )
        console.log(
            'Cycle ',
            this.cycle.toString(),
            ': CPU is receiving ACCESS_ACK_DATA message from INTERCONNECT',
        )
    }
        this.cycle = this.cycle + 1

        if (this.DMA.active) this.DMA_operate()
            
}