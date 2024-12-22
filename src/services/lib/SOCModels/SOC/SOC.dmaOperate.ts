import Soc from "../SoC"

export function DMA_operate (this: Soc) {
    const dma2i = this.DMA.Send()

    this.println('Cycle ', this.cycle.toString(), ': DMA is sending GET message to MEMORY')
    console.log('Cycle ', this.cycle.toString(), ': DMA is sending GET message to MEMORY')
//****************************CPU OPERATION**************************** */
    if (this.Processor.pc < (Object.values(this.Processor.Instruction_memory).length - 1) * 4) 
        this.Processor.active = true
    else {
        this.Processor.active =false
        this.println('THE PROGRAM COUNTER IS OUT OF THE INSTRUCTION MEMORY RANGE.')
        console.log('THE PROGRAM COUNTER IS OUT OF THE INSTRUCTION MEMORY RANGE.')
    }
    if ( this.Processor.active == true) {
        this.println('Cycle ', this.cycle.toString(), ': CPU is processing')
        console.log('Cycle ', this.cycle.toString(), ': CPU is processing')
    } 
    let element             = this.Processor.Instruction_memory[this.Processor.pc.toString(2)]
    let [CPU_message, , , ] = this.Processor.run(element, this.Processor.pc)
    this.view?.cpu.setIsRunning(this.Processor.active)

    this.cycle += 1
    this.Bus.Port_in(dma2i, 2)
    this.println(
        'Cycle ',
        this.cycle.toString(),
        ': INTERCONNECT is receiving message from DMA',
    )
    console.log(
        'Cycle ',
        this.cycle.toString(),
        ': INTERCONNECT is receiving message from DMA',
    )

    if (CPU_message == 'GET' || CPU_message == 'PUT') {
        if (this.Processor.pc < (Object.values(this.Processor.Instruction_memory).length - 1) * 4) {
            this.println('Cycle ', this.cycle.toString(), ': CPU is stalled')
            console.log('Cycle ', this.cycle.toString(), ': CPU is stalled')
            this.Processor.stalled = true
        }
        else {
            if (this.Processor.active) {
                this.Processor.active =false
                this.println('THE PROGRAM COUNTER IS OUT OF THE INSTRUCTION MEMORY RANGE.')
                console.log('THE PROGRAM COUNTER IS OUT OF THE INSTRUCTION MEMORY RANGE.')
            }
        }
        element = this.Processor.Instruction_memory[this.Processor.pre_pc.toString(2)];
        this.view?.cpu.setIsRunning(this.Processor.active);
        [CPU_message, , , ] = this.Processor.run(element, this.Processor.pre_pc)    
    } else {
        if (this.Processor.pc >= (Object.values(this.Processor.Instruction_memory).length - 1) * 4) {
            if (this.Processor.active) {
                this.Processor.active =false
                this.println('THE PROGRAM COUNTER IS OUT OF THE INSTRUCTION MEMORY RANGE.')
                console.log('THE PROGRAM COUNTER IS OUT OF THE INSTRUCTION MEMORY RANGE.')
            }
        }
        if ( this.Processor.active == true) {
            this.println('Cycle ', this.cycle.toString(), ': CPU is processing')
            console.log('Cycle ', this.cycle.toString(), ': CPU is processing')
        } 
        element = this.Processor.Instruction_memory[this.Processor.pc.toString(2)];
        this.view?.cpu.setIsRunning(this.Processor.active);
        [CPU_message, , , ] = this.Processor.run(element, this.Processor.pc)    
    }
    
    this.cycle += 1
    if (CPU_message == 'GET' || CPU_message == 'PUT') {
        if (this.Processor.pc < (Object.values(this.Processor.Instruction_memory).length - 1) * 4) {
            this.println('Cycle ', this.cycle.toString(), ': CPU is stalled')
            console.log('Cycle ', this.cycle.toString(), ': CPU is stalled')
            this.Processor.stalled = true
        }
        else {
            if (this.Processor.active) {
                this.Processor.active =false
                this.println('THE PROGRAM COUNTER IS OUT OF THE INSTRUCTION MEMORY RANGE.')
                console.log('THE PROGRAM COUNTER IS OUT OF THE INSTRUCTION MEMORY RANGE.')
            }
        }
        element = this.Processor.Instruction_memory[this.Processor.pre_pc.toString(2)];
        this.view?.cpu.setIsRunning(this.Processor.active);
        [CPU_message, , , ] = this.Processor.run(element, this.Processor.pre_pc)    
    } else {
        if (this.Processor.pc >= (Object.values(this.Processor.Instruction_memory).length - 1) * 4) {
            if (this.Processor.active) {
                this.Processor.active =false
                this.println('THE PROGRAM COUNTER IS OUT OF THE INSTRUCTION MEMORY RANGE.')
                console.log('THE PROGRAM COUNTER IS OUT OF THE INSTRUCTION MEMORY RANGE.')
            }
        }
        if ( this.Processor.active == true) {
            this.println('Cycle ', this.cycle.toString(), ': CPU is processing')
            console.log('Cycle ', this.cycle.toString(), ': CPU is processing')
        } 
        element = this.Processor.Instruction_memory[this.Processor.pc.toString(2)];
        this.view?.cpu.setIsRunning(this.Processor.active);
        [CPU_message, , , ] = this.Processor.run(element, this.Processor.pc)    
    }

    this.view?.interconnect.setIsRunning(this.Bus.active)
    this.Bus.Transmit()
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

    this.cycle += 1
    if (CPU_message == 'GET' || CPU_message == 'PUT') {
        if (this.Processor.pc < (Object.values(this.Processor.Instruction_memory).length - 1) * 4) {
            this.println('Cycle ', this.cycle.toString(), ': CPU is stalled')
            console.log('Cycle ', this.cycle.toString(), ': CPU is stalled')
            this.Processor.stalled = true
        }
        else {
            if (this.Processor.active) {
                this.Processor.active =false
                this.println('THE PROGRAM COUNTER IS OUT OF THE INSTRUCTION MEMORY RANGE.')
                console.log('THE PROGRAM COUNTER IS OUT OF THE INSTRUCTION MEMORY RANGE.')
            }
        }
        element = this.Processor.Instruction_memory[this.Processor.pre_pc.toString(2)];
        this.view?.cpu.setIsRunning(this.Processor.active);
        [CPU_message, , , ] = this.Processor.run(element, this.Processor.pre_pc)    
    } else {
        if (this.Processor.pc >= (Object.values(this.Processor.Instruction_memory).length - 1) * 4) {
            if (this.Processor.active) {
                this.Processor.active =false
                this.println('THE PROGRAM COUNTER IS OUT OF THE INSTRUCTION MEMORY RANGE.')
                console.log('THE PROGRAM COUNTER IS OUT OF THE INSTRUCTION MEMORY RANGE.')
            }
        }
        if ( this.Processor.active == true) {
            this.println('Cycle ', this.cycle.toString(), ': CPU is processing')
            console.log('Cycle ', this.cycle.toString(), ': CPU is processing')
        } 
        element = this.Processor.Instruction_memory[this.Processor.pc.toString(2)];
        this.view?.cpu.setIsRunning(this.Processor.active);
        [CPU_message, , , ] = this.Processor.run(element, this.Processor.pc)    
    }
    this.println(
        'Cycle ',
        this.cycle.toString(),
        ': MEMORY is sending ACCESS_ACK message to DMA',
    )
    console.log(
        'Cycle ',
        this.cycle.toString(),
        ': MEMORY is sending ACCESS_ACK message to DMA',
    )
    const i2memory = this.Bus.Port_out(3)
    const [, ai2s] = this.Memory.slaveMemory.receive(i2memory)
    let di2s= this.Memory.Memory[ai2s] 
    this.Memory.Memory[ai2s] = di2s

    this.cycle += 1
    if (CPU_message == 'GET' || CPU_message == 'PUT') {
        if (this.Processor.pc < (Object.values(this.Processor.Instruction_memory).length - 1) * 4) {
            this.println('Cycle ', this.cycle.toString(), ': CPU is stalled')
            console.log('Cycle ', this.cycle.toString(), ': CPU is stalled')
            this.Processor.stalled = true
        }
        else {
            if (this.Processor.active) {
                this.Processor.active =false
                this.println('THE PROGRAM COUNTER IS OUT OF THE INSTRUCTION MEMORY RANGE.')
                console.log('THE PROGRAM COUNTER IS OUT OF THE INSTRUCTION MEMORY RANGE.')
            }
        }
        element = this.Processor.Instruction_memory[this.Processor.pre_pc.toString(2)];
        this.view?.cpu.setIsRunning(this.Processor.active);
        [CPU_message, , , ] = this.Processor.run(element, this.Processor.pre_pc)    
    } else {
        if (this.Processor.pc >= (Object.values(this.Processor.Instruction_memory).length - 1) * 4) {
            if (this.Processor.active) {
                this.Processor.active =false
                this.println('THE PROGRAM COUNTER IS OUT OF THE INSTRUCTION MEMORY RANGE.')
                console.log('THE PROGRAM COUNTER IS OUT OF THE INSTRUCTION MEMORY RANGE.')
            }
        }
        if ( this.Processor.active == true) {
            this.println('Cycle ', this.cycle.toString(), ': CPU is processing')
            console.log('Cycle ', this.cycle.toString(), ': CPU is processing')
        } 
        element = this.Processor.Instruction_memory[this.Processor.pc.toString(2)];
        this.view?.cpu.setIsRunning(this.Processor.active);
        [CPU_message, , , ] = this.Processor.run(element, this.Processor.pc)    
    }
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
    
    this.cycle += 1
    if (CPU_message == 'GET' || CPU_message == 'PUT') {
        if (this.Processor.pc < (Object.values(this.Processor.Instruction_memory).length - 1) * 4) {
            this.println('Cycle ', this.cycle.toString(), ': CPU is stalled')
            console.log('Cycle ', this.cycle.toString(), ': CPU is stalled')
            this.Processor.stalled = true
        }
        else {
            if (this.Processor.active) {
                this.Processor.active =false
                this.println('THE PROGRAM COUNTER IS OUT OF THE INSTRUCTION MEMORY RANGE.')
                console.log('THE PROGRAM COUNTER IS OUT OF THE INSTRUCTION MEMORY RANGE.')
            }
        }
        element = this.Processor.Instruction_memory[this.Processor.pre_pc.toString(2)];
        this.view?.cpu.setIsRunning(this.Processor.active);
        [CPU_message, , , ] = this.Processor.run(element, this.Processor.pre_pc)    
    } else {
        if (this.Processor.pc >= (Object.values(this.Processor.Instruction_memory).length - 1) * 4) {
            if (this.Processor.active) {
                this.Processor.active =false
                this.println('THE PROGRAM COUNTER IS OUT OF THE INSTRUCTION MEMORY RANGE.')
                console.log('THE PROGRAM COUNTER IS OUT OF THE INSTRUCTION MEMORY RANGE.')
            }
        }
        if ( this.Processor.active == true) {
            this.println('Cycle ', this.cycle.toString(), ': CPU is processing')
            console.log('Cycle ', this.cycle.toString(), ': CPU is processing')
        } 
        element = this.Processor.Instruction_memory[this.Processor.pc.toString(2)];
        this.view?.cpu.setIsRunning(this.Processor.active);
        [CPU_message, , , ] = this.Processor.run(element, this.Processor.pc)    
    }
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

    this.cycle += 1
    if (CPU_message == 'GET' || CPU_message == 'PUT') {
        if (this.Processor.pc < (Object.values(this.Processor.Instruction_memory).length - 1) * 4) {
            this.println('Cycle ', this.cycle.toString(), ': CPU is stalled')
            console.log('Cycle ', this.cycle.toString(), ': CPU is stalled')
            this.Processor.stalled = true
        }
        else {
            if (this.Processor.active) {
                this.Processor.active =false
                this.println('THE PROGRAM COUNTER IS OUT OF THE INSTRUCTION MEMORY RANGE.')
                console.log('THE PROGRAM COUNTER IS OUT OF THE INSTRUCTION MEMORY RANGE.')
            }
        }
        element = this.Processor.Instruction_memory[this.Processor.pre_pc.toString(2)];
        this.view?.cpu.setIsRunning(this.Processor.active);
        [CPU_message, , , ] = this.Processor.run(element, this.Processor.pre_pc)    
    } else {
        if (this.Processor.pc >= (Object.values(this.Processor.Instruction_memory).length - 1) * 4) {
            if (this.Processor.active) {
                this.Processor.active =false
                this.println('THE PROGRAM COUNTER IS OUT OF THE INSTRUCTION MEMORY RANGE.')
                console.log('THE PROGRAM COUNTER IS OUT OF THE INSTRUCTION MEMORY RANGE.')
            }
        }
        if ( this.Processor.active == true) {
            this.println('Cycle ', this.cycle.toString(), ': CPU is processing')
            console.log('Cycle ', this.cycle.toString(), ': CPU is processing')
        } 
        element = this.Processor.Instruction_memory[this.Processor.pc.toString(2)];
        this.view?.cpu.setIsRunning(this.Processor.active);
        [CPU_message, , , ] = this.Processor.run(element, this.Processor.pc)    
    }
    this.println(
        'Cycle ',
        this.cycle.toString(),
        ': DMA is receiving ACCESS_ACK DATA message from INTERCONNECT',
    )
    console.log(
        'Cycle ',
        this.cycle.toString(),
        ': DMA is receiving ACCESS_ACK DATA message from INTERCONNECT',
    )
    this.DMA.Receive(this.Memory.slaveMemory.send('AccessAckData',di2s))
    this.Processor.active = true
    this.Processor.stalled = false
}