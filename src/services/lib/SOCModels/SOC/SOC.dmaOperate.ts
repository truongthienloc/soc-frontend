import Soc from "../SoC"

export function handleCpuOperation(this: Soc) {
    if (this.Processor.pc >= (Object.values(this.Processor.Instruction_memory).length - 1) * 4) {
        if (this.Processor.active) {
            this.Processor.active = false;
            this.println('THE PROGRAM COUNTER IS OUT OF THE INSTRUCTION MEMORY RANGE.');
            console.log('THE PROGRAM COUNTER IS OUT OF THE INSTRUCTION MEMORY RANGE.');
        }
    } else {
        let element = this.Processor.Instruction_memory[this.Processor.pc.toString(2)];
        this.view?.cpu.setIsRunning(this.Processor.active);
        this.Processor.run(element, this.Processor.pc, true);
        if (this.Processor.stalled) {
            this.println('Cycle ', this.cycle.toString(), ': CPU is stalled');
            console.log('Cycle ', this.cycle.toString(), ': CPU is stalled');
        } else {
                this.println('Cycle ', this.cycle.toString(), ': CPU is processing');
                console.log('Cycle ', this.cycle.toString(), ': CPU is processing ');
            } 
    }
}

export function DMA_operate (this: Soc) {
    console.log(        
    ' Destination Address: ', this.DMA.Des_addr, '\n',
    'Start address: ',this.DMA.Start_addr      ,'\n',
    'Number of Transaction: ',this.DMA.NumTransaction     ,'\n',
    
    'Length of internal Buffer: ',this.DMA.BufferLen          ,'\n',
    'Internal buffer: ',this.DMA.Databuffer         , 
  
    )
    const dma2i = this.DMA.Send2Memory()
    this.println('Cycle ', this.cycle.toString(), ': DMA is sending GET message to MEMORY')
    console.log('Cycle ', this.cycle.toString(), ': DMA is sending GET message to MEMORY')
//****************************CPU OPERATION**************************** */
    //handleCpuOperation.call(this);

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
    //handleCpuOperation.call(this);
    
    this.cycle += 1
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
    //handleCpuOperation.call(this);

    this.cycle += 1
    this.println(
        'Cycle ',
        this.cycle.toString(),
        ': MEMORY is sending ACCESS_ACK_DATA message to DMA',
    )
    console.log(
        'Cycle ',
        this.cycle.toString(),
        ': MEMORY is sending ACCESS_ACK_DATA message to DMA',
    )
    const i2memory = this.Bus.Port_out(3)
    const [, ai2s] = this.Memory.slaveMemory.receive(i2memory)
    //let di2s= this.Memory.Memory[ai2s] '1'.padStart(32, '1')
    let di2s=  '1'.padStart(32, '1')
    // console.log("di2s: ", di2s)
    // console.log("ai2s: ", ai2s)
    //handleCpuOperation.call(this);

    this.cycle += 1
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
    //handleCpuOperation.call(this);
    
    this.cycle += 1
    this.println(
        'Cycle ',
        this.cycle.toString(),
        ': INTERCONNECT is sending message to DMA',
    )
    console.log(
        'Cycle ',
        this.cycle.toString(),
        ': INTERCONNECT is sending message to DMA',
    )
    //handleCpuOperation.call(this);

    this.cycle += 1
    this.println(
        'Cycle ',
        this.cycle.toString(),
        ': DMA is receiving ACCESS_ACK_DATA message from INTERCONNECT',
    )
    console.log(
        'Cycle ',
        this.cycle.toString(),
        ': DMA is receiving ACCESS_ACK_DATA message from INTERCONNECT',
    )
    
    //handleCpuOperation.call(this);
    this.DMA.ReceivefMemory(this.Memory.slaveMemory.send('AccessAckData',di2s))
    console.log("DMA_buffer: ", this.DMA.Databuffer)

    this.cycle +=1
    this.println('Cycle ', this.cycle.toString(), ': DMA is sending PUT message to PERIPHERAL')
    console.log('Cycle ', this.cycle.toString(), ': DMA is sending PUT message to PERIPHERAL')

    const dma2p= this.DMA.Send2Peri()
    this.cycle += 1
    this.Bus.Port_in(dma2p, 2)
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

    this.cycle += 1
    this.view?.interconnect.setIsRunning(this.Bus.active)
    this.Bus.Transmit()
    this.println(
        'Cycle ',
        this.cycle.toString(),
        ': INTERCONNECT is sending message to PERIPHERAL',
    )
    console.log(
        'Cycle ',
        this.cycle.toString(),
        ': INTERCONNECT is sending message to PERIPHERAL',
    )

    this.cycle += 1

    this.println(
        'Cycle ',
        this.cycle.toString(),
        ': PERIPHERAL is sending ACCESS_ACK message to CPU',
    )
    console.log(
        'Cycle ',
        this.cycle.toString(),
        ': PERIPHERAL is sending ACCESS_ACK message to CPU',
    )

    // const doutChD = this.Memory.slaveMemory.send('AccessAck','',)

    this.println(
        'Cycle ',
        this.cycle.toString(),
        ': INTERCONNECT is receiving message from PERIPHERAL',
    )
    console.log(
        'Cycle ',
        this.cycle.toString(),
        ': INTERCONNECT is receiving message from PERIPHERAL',
    )

    // this.Bus.Port_in(doutChD, 0)
    this.Bus.Transmit()
    this.Bus.Port_out(1)
    
    this.cycle += 1

    this.println(
        'Cycle ',
        this.cycle.toString(),
        ': INTERCONNECT is sending message to DMA',
    )
    console.log(
        'Cycle ',
        this.cycle.toString(),
        ': INTERCONNECT is sending message to DMA',
    )

    this.cycle += 1
    this.println(
        'Cycle ',
        this.cycle.toString(),
        ': DMA is receiving ACCESS_ACK message from INTERCONNECT',
    )
    console.log(
        'Cycle ',
        this.cycle.toString(),
        ': DMA is receiving ACCESS_ACK message from INTERCONNECT',
    )
    // this.Processor.active = true
    // this.Processor.stalled = false
}
