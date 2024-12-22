import { BinToHex, stringToAsciiAndBinary } from "../convert"
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
        let [CPU_message, CPU_data, logical_address, rd] = this.Processor.run(element, this.Processor.pc)
        //console.log("CPU messeage: ", CPU_message)
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
        console.log ('Cycle ', this.cycle.toString() +' : '+ MMU_message)
        this.println ('Cycle ', this.cycle.toString()+' : '+ MMU_message)

        //console.log(this.MMU.TLB)

        if (MMU_message == 'TLB: PPN is missed.') {
            // MISSED
            // CALCULATE physical_address
            // this.Memory.IOpoint
            this.cycle+=1
            
            const VPN = dec('0' + logical_address.slice(18).slice(0, 4));

            console.log('Cycle ', this.cycle.toString()+' : '+ 
            'MMU want to GET data at address '+
            BinToHex((VPN*4 + this.MMU.pageNumberPointer).toString(2).padStart(32,'0'))+' from MEMORY')
            this.println('Cycle ', this.cycle.toString()+' : '+ 
            'MMU want to GET data at address '+
            BinToHex((VPN*4 + this.MMU.pageNumberPointer).toString(2).padStart(32,'0'))+' from MEMORY')
            
            const MMU2Memory = this.MMU.master.send('GET', 
            (VPN*4 + this.MMU.pageNumberPointer).toString(2).padStart(32,'0'),
            '0', this.cycle, '0')
            console.log  ('Cycle ', this.cycle.toString()+' : '+'MMU is sending message GET to MEMORY')
            this.println ('Cycle ', this.cycle.toString()+' : '+'MMU is sending message GET to MEMORY')

            this.cycle = this.cycle + 1
            const [, ai2s]  = this.Memory.slaveMemory.receive (MMU2Memory)
            console.log  ('Cycle ', this.cycle.toString()+' : '+'MEMORY is receiving message from MMU')
            this.println ('Cycle ', this.cycle.toString()+' : '+'MEMORY is receiving message from MMU')

            this.cycle = this.cycle + 1
            const dfm2mmu   = this.Memory.slaveMemory.send('AccessAckData', this.Memory.Memory[ai2s])
            console.log  ('Cycle ', this.cycle.toString()+' : '+'MEMORY is sending message to MMU')
            this.println ('Cycle ', this.cycle.toString()+' : '+'MEMORY is sending message to MMU')

            this.cycle = this.cycle + 1
            const ammurfm   = this.MMU.master.receive ('MEMORY', 
                this.cycle, 
                'bn',
                {opcode: '001', payload: ''+this.Memory.Memory[ai2s]},
            )
            console.log  ('Cycle ', this.cycle.toString()+' : '+'MMU is receiving message from MEMORY')
            this.println ('Cycle ', this.cycle.toString()+' : '+'MMU is receiving message from MEMORY')

            this.cycle+=1
            const PPN = dec ('0'+ammurfm)
            console.log(VPN)
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
            this.println('Cycle ', this.cycle.toString(), ': CPU is sending PUT message to MEMORY')
            console.log('Cycle ', this.cycle.toString(), ': CPU is sending PUT message to MEMORY')
            // PROCESSOT is sending PUT
            const dm2i = this.Processor.master.send(
                CPU_message,
                physical_address,
                '0',
                this.cycle,
                CPU_data,
            )

            this.println(
                'Cycle ',
                this.cycle.toString(),
                ': INTERCONNECT is receiving message from CPU',
            )
            console.log(
                'Cycle ',
                this.cycle.toString(),
                ': INTERCONNECT is receiving message from CPU',
            )
            //INTERCONNCET RUN
           
            this.cycle += 1

            this.view?.interconnect.setIsRunning(this.Bus.active)
            this.Bus.Port_in(dm2i, 1) // CPU IS LOADING DATA INTO PORT[1]
            this.Bus.Transmit() // INTERCONNECT IS TRANSMITTING
            this.println(
                'Cycle ',
                this.cycle.toString(),
                ': INTERCONNECT is sending message to MEMORY',
            )
            console.log(
                'Cycle ',
                this.cycle.toString(),
                ': INTERCONNECT is sending message to MEMORY',
            )
            const doutChA = this.Bus.Port_out(0) // GET DATA FROM POUT[0], POUT[0] IS POUT FOR MEMORY
            
            //MEMORY RUN
            
            this.cycle += 1

            this.view?.memory.setIsRunning(this.Memory.active)
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
            const [di2s, ai2s] = this.Memory.slaveMemory.receive(doutChA)
            //console.log ('data and address', di2s, ai2s)
            this.Memory.Memory[ai2s] = di2s
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

            const doutChD = this.Memory.slaveMemory.send('AccessAck','',)

            this.println(
                'Cycle ',
                this.cycle.toString(),
                ': INTERCONNECT is receiving message from MEMORY',
            )
            console.log(
                'Cycle ',
                this.cycle.toString(),
                ': INTERCONNECT is receiving message from MEMORY',
            )

            this.Bus.Port_in(doutChD, 0)
            this.Bus.Transmit()
            this.Bus.Port_out(1)
            
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
            this.println(
                'Cycle ',
                this.cycle.toString(),
                ': CPU is receiving ACCESS_ACK message from INTERCONNECT',
            )
            console.log(
                'Cycle ',
                this.cycle.toString(),
                ': CPU is receiving ACCESS_ACK message from INTERCONNECT',
            )
        }

        // IF MESSAGE IS GET (LOAD): 
        if (CPU_message == 'GET') {
        this.println('Cycle ', this.cycle.toString(), ': CPU is sending GET message to MEMORY')
        console.log('Cycle ', this.cycle.toString(), ': CPU is sending GET message to MEMORY')
        // PROCESSOT is sending GET
        const dm2i = this.Processor.master.send(
            CPU_message,
            physical_address,
            '0',
            this.cycle,
            CPU_data,
        )

        this.println(
            'Cycle ',
            this.cycle.toString(),
            ': INTERCONNECT is receiving message from CPU',
        )
        console.log(
            'Cycle ',
            this.cycle.toString(),
            ': INTERCONNECT is receiving message from CPU',
        )
        //INTERCONNCET RUN
        
        this.cycle += 1
        this.view?.interconnect.setIsRunning(this.Bus.active)

//******************************************************************** */
        this.Bus.Port_in(dm2i, 1) // CPU IS LOADING DATA INTO PORT[1]
//******************************************************************** */

        this.Bus.Transmit() // INTERCONNECT IS TRANSMITTING
        this.println(
            'Cycle ',
            this.cycle.toString(),
            ': INTERCONNECT is sending message to MEMORY',
        )
        console.log(
            'Cycle ',
            this.cycle.toString(),
            ': INTERCONNECT is sending message to MEMORY',
        )
        const doutChA = this.Bus.Port_out(0) // GET DATA FROM POUT[0], POUT[0] IS POUT FOR MEMORY
        
        //MEMORY RUN
       
        this.cycle += 1

        this.view?.memory.setIsRunning(this.Memory.active)
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
        const [, ai2s] = this.Memory.slaveMemory.receive(doutChA)
        let di2s= this.Memory.Memory[ai2s] 
        
        // KEYBOARD
        // console.log("address keyboard", dec ('0'+ai2s), this.Memory.IO_point + 4)
        if (dec ('0'+ai2s)== this.Memory.IO_point + 4) {
            this.println('Cycle ', this.cycle.toString(), ': KEYBOARD is waiting')
            console.log('Cycle ', this.cycle.toString(), ': KEYBOARD is waiting')
            this.view?.keyboard.setIsRunning(this.active_keyboard)
            this.keyboard?.getEvent().once('line-down', (text: string) => {di2s = stringToAsciiAndBinary(text).binary.join('')})
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

        const doutChD = this.Memory.slaveMemory.send('AccessAckData',di2s)

        this.println(
            'Cycle ',
            this.cycle.toString(),
            ': INTERCONNECT is receiving message from MEMORY',
        )
        console.log(
            'Cycle ',
            this.cycle.toString(),
            ': INTERCONNECT is receiving message from MEMORY',
        )

        this.Bus.Port_in(doutChD, 1) //FIX ME
        this.Bus.Transmit()
        
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
        this.println(
            'Cycle ',
            this.cycle.toString(),
            ': CPU is receiving ACCESS_ACK DATA message from INTERCONNECT',
        )
        console.log(
            'Cycle ',
            this.cycle.toString(),
            ': CPU is receiving ACCESS_ACK DATA message from INTERCONNECT',
        )

        const di2m = this.Bus.Port_out(0)
        if (di2m === 'undefined' || di2m === undefined) this.Processor.register[rd] = '0'.padStart(32, '0')
        if (di2m !== 'undefined' && di2m !== undefined) this.Processor.register[rd] = (di2m.slice(-34)).slice(0,32)
        }

        this.DMA_operate()
    }