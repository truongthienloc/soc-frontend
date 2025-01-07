import { BinToHex, stringToAsciiAndBinary } from "../convert"
import ChannalA from "../ChannelA"
import ChannalD from "../ChannelD"
import Soc from "../SoC"
import { dec } from "../sub_function"

export async function Step(this: Soc) {   
//---------------------------------------------------------------------------------------------------------\\
        // ****************CHECK CONDITION TO RUN SYSTEM ****************
        // CHECK PROCESSOR IS ACTIVED
        if (this.Processor.active == false) {
            console.log('CPU HAS NOT BEEN ACTIVED!!!')
            this.println('CPU HAS NOT BEEN ACTIVED!!!')
            return
        }
        // CHECK THE PROGRAM COUNTER IS OUT OF THE INSTRUCTION MEMORY RANGE
        if (
            this.Processor.pc >=
            (Object.values(this.Processor.Instruction_memory).length - 1) * 4
        ) {
            this.println('THE PROGRAM COUNTER IS OUT OF THE INSTRUCTION MEMORY RANGE.')
            console.log('THE PROGRAM COUNTER IS OUT OF THE INSTRUCTION MEMORY RANGE.')
            return
        }
        // CHECK SYNTAX ERROR
        if (this.Assembler.syntax_error) return

//---------------------------------------------------------------------------------------------------------\\
        // ****************RUN SYSTEM ****************
        this.println('Cycle ', this.cycle.toString(), ': CPU is processing')
        console.log('Cycle ', this.cycle.toString(), ': CPU is processing')
        
        this.cycle += 1
        
        const element = this.Processor.Instruction_memory[this.Processor.pc.toString(2)]
        //console.log("this.Processor.pre_pc, this.Processor.pc", this.Processor.pre_pc, this.Processor.pc)
        this.view?.cpu.setIsRunning(this.Processor.active)
        // CPU RUN
        let [CPU_message, CPU_data, logical_address, rd] = this.Processor.run(element, this.Processor.pc, false)
        this.IO_operate ()
        if (CPU_message!= 'PUT' && CPU_message != 'GET') {
            this.DMA_operate()
            return 
        }// CHECK message is PUT or GET
        // ****************IF message is PUT OR GET****************
        // CHECK ADDRESS
        if (dec('0' + logical_address) % 4 != 0) {
            console.log('ERORR: Invaild Address!!!')
            this.println('ERORR: Invaild Address!!!')
            return
        }
        // CHECK INTERCONNET 
        if (this.Bus.active == false) {
            console.log('ERORR: INTERCONNECT has not been actived!!!')
            this.println('ERORR: INTERCONNECT has not been actived!!!')
            return
        }
        // CHECK MEMORY 
        if (this.Memory.active == false) {
            console.log('ERORR: MEMORY has not been actived!!!')
            this.println('ERORR: MEMORY has not been actived!!!')
            return
        }
        if (this.DMA.active == false) {
            console.log('WARNING: DMA has not been actived!!!')
            this.println('WARNING: DMA has not been actived!!!')
        }
        // RUN MMU
        this.view?.mmu.setIsRunning(this.MMU.active)
        let [physical_address, MMU_message] = this.MMU.Run(logical_address)
        console.log  ('Cycle ', this.cycle.toString() +' : '+ MMU_message)
        this.println ('Cycle ', this.cycle.toString()+' : '+ MMU_message)

        //console.log(this.MMU.TLB)

        if (MMU_message == 'TLB: PPN is missed.') {
            // MISSED
            // CALCULATE physical_address
            // this.Memory.IOpoint
            this.cycle+=1
            
            const VPN = dec('0' + logical_address.slice(18).slice(0, 4));

            console.log('Cycle ', this.cycle.toString()+' : '+ 
            'The MMU want to GET data at address '+
            BinToHex((VPN*4 + this.MMU.pageNumberPointer).toString(2).padStart(32,'0'))+' from MEMORY')
            this.println('Cycle ', this.cycle.toString()+' : '+ 
            'The MMU want to GET data at address '+
            BinToHex((VPN*4 + this.MMU.pageNumberPointer).toString(2).padStart(32,'0'))+' from MEMORY')
            
            this.MMU.master.send('GET', (VPN*4 + this.MMU.pageNumberPointer).toString(2).padStart(32,'0'), '0')
            console.log  ('Cycle ', this.cycle.toString()+': The MMU is sending a GET message to MEMORY through the INTERCONNECT.')
            this.println ('Cycle ', this.cycle.toString()+': The MMU is sending a GET message to MEMORY through the INTERCONNECT.')

            this.cycle = this.cycle + 1
            console.log  ('Cycle ', this.cycle.toString()+': The INTERCONNECT is forwarding the message to MEMORY.')
            this.println ('Cycle ', this.cycle.toString()+': The INTERCONNECT is forwarding the message to MEMORY.')
            this.Bus.Port_in(this.MMU.master.ChannelA, 0)
            this.Bus.Transmit()

            this.cycle = this.cycle + 1
            const MMU2Memory = this.Bus.Port_out(2) // channelD
            const [, ai2s]  = this.Memory.slaveMemory.receive (MMU2Memory)
            console.log  ('Cycle ', this.cycle.toString()+': The MEMORY is receiving a GET message from the INTERCONNECT.')
            this.println ('Cycle ', this.cycle.toString()+': The MEMORY is receiving a GET message from the INTERCONNECT.')

            this.cycle = this.cycle + 1
            this.Memory.slaveMemory.send('AccessAckData','00', this.Memory.Memory[ai2s])
            this.Bus.Port_in(this.Memory.slaveMemory.ChannelD, 2)
            console.log  ('Cycle ', this.cycle.toString()+': The MEMORY is sending an AccessAckData message to the INTERCONNECT.')
            this.println ('Cycle ', this.cycle.toString()+': The MEMORY is sending an AccessAckData message to the INTERCONNECT.')

            this.cycle = this.cycle + 1
            this.Bus.Transmit()
            console.log  ('Cycle ', this.cycle.toString()+': The INTERCONNECT is forwarding the message to MMU.')
            this.println ('Cycle ', this.cycle.toString()+': The INTERCONNECT is forwarding the message to MMU.')

            this.cycle       = this.cycle + 1
            const Memory2MMU = this.Bus.Port_out(2) // channelD
            const ammurfm    = this.MMU.master.receive ('AccessAckData', Memory2MMU)
            console.log  ('Cycle ', this.cycle.toString()+': The MMU is receiving an AccessAckData message from the INTERCONNECT.')
            this.println ('Cycle ', this.cycle.toString()+': The MMU is receiving an AccessAckData message from the INTERCONNECT.')

            this.cycle+=1
            const PPN = dec ('0'+ammurfm)
            //console.log(VPN)
            this.MMU.pageReplace([VPN, PPN, 1, this.cycle])
            console.log ('Cycle ', this.cycle.toString()+' : ' + 'TLB: Page Number is replaced')
            this.println('Cycle ', this.cycle.toString()+' : ' + 'TLB: Page Number is replaced')

            this.cycle+=1
            let [nphysical_address, MMU_message] = this.MMU.Run(logical_address)
            console.log ('Cycle ', this.cycle.toString()+' : '+ MMU_message)
            this.println('Cycle ', this.cycle.toString()+' : '+ MMU_message)

            console.log(this.MMU.TLB)
            physical_address = nphysical_address

        } 
        
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
                ': The MEMORY is sending an AccessAckData message to the CPU.',
            )
            console.log(
                'Cycle ',
                this.cycle.toString(),
                ': The MEMORY is sending an AccessAckData message to the CPU.',
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
                ': The CPU is receiving an AccessAckData message from the INTERCONNECT.',
            )
            console.log(
                'Cycle ',
                this.cycle.toString(),
                ': The CPU is receiving an AccessAckData message from the INTERCONNECT.',
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
        
        // KEYBOARD
        if (dec ('0'+ai2mem)== this.Memory.IO_point + 4) {
            this.println('Cycle ', this.cycle.toString(), ': KEYBOARD is waiting')
            console.log('Cycle ', this.cycle.toString(), ': KEYBOARD is waiting')
            this.view?.keyboard.setIsRunning(this.active_keyboard)
            this.keyboard?.getEvent().once('line-down', (text: string) => {di2mem = stringToAsciiAndBinary(text).binary.join('')})
            await this.delay()
        }

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
        this.DMA_operate()
}