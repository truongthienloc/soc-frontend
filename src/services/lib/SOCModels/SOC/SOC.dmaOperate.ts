import Soc from "../SoC"
import ChannalA from "../ChannelA"
// import ChannalD from "./ChannelD"

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
    // console.log(        
    // ' Destination Address:  ', this.DMA.Des_addr, '\n',
    // 'Start address:         ',this.DMA.Start_addr      ,'\n',
    // 'Number of Transaction: ',this.DMA.NumTransaction     ,'\n',
    // 'Length of internal Buffer: ',this.DMA.BufferLen          ,'\n',
    // 'Internal buffer: ',this.DMA.Databuffer         , 
    // )
    this.DMA.Send2Memory()
    const dma2i = this.DMA.masterDMA.ChannelA
    this.println('Cycle ', this.cycle.toString(), ': The DMA is sending a GET message to MEMORY through the INTERCONNECT.')
    console.log('Cycle ', this.cycle.toString(),  ': The DMA is sending a GET message to MEMORY through the INTERCONNECT')
    this.Bus.Port_in(dma2i, 1)

    this.cycle += 1
    handleCpuOperation.call(this);
    this.view?.interconnect.setIsRunning(this.Bus.active)
    this.println('Cycle ', this.cycle.toString(), ': The INTERCONNECT is forwarding the message to MEMORY.')
    console.log('Cycle ', this.cycle.toString(),  ': The INTERCONNECT is forwarding the message to MEMORY.')
    this.Bus.Transmit()

    this.cycle += 1
    handleCpuOperation.call(this);
    this.println('Cycle ', this.cycle.toString(), ': The MEMORY is receiving a GET message from the INTERCONNECT.')
    console.log('Cycle ', this.cycle.toString(),  ': The MEMORY is receiving a GET message from the INTERCONNECT.')
    const i2memory = this.Bus.Port_out(2)
    const [, ai2s] = this.Memory.slaveMemory.receive(i2memory)

    this.cycle += 1
    handleCpuOperation.call(this);
    this.println('Cycle ', this.cycle.toString(), ': The MEMORY is sending an AccessAckData message to the DMA.')
    console.log('Cycle ', this.cycle.toString(),  ': The MEMORY is sending an AccessAckData message to the DMA.')
    // this.Memory.Memory[ai2s] = '1'.padStart(32, '1')
    this.Memory.slaveMemory.send('AccessAckData','01', this.Memory.Memory[ai2s])
    const m2dma =   this.Memory.slaveMemory.ChannelD
    this.Bus.Port_in(m2dma, 2)

    this.cycle = this.cycle + 1
    handleCpuOperation.call(this);
    this.Bus.Transmit()
    this.println('Cycle ', this.cycle.toString(),': The INTERCONNECT is forwarding the message to DMA.')
    console.log('Cycle ', this.cycle.toString(), ': The INTERCONNECT is forwarding the message to DMA.')

    this.cycle += 1
    handleCpuOperation.call(this);
    const i2dma = this.Bus.Port_out(1)
    this.println('Cycle ', this.cycle.toString(), ': The DMA is receiving an AccessAckData message from the INTERCONNECT.')
    console.log('Cycle ', this.cycle.toString(),  ': The DMA is receiving an AccessAckData message from the INTERCONNECT.')
    this.DMA.ReceivefMemory(i2dma.data)

    this.cycle +=1
    handleCpuOperation.call(this);
    this.println('Cycle ', this.cycle.toString(), ': The DMA is sending a PUT message to MEMORY through the INTERCONNECT.')
    console.log('Cycle ', this.cycle.toString(),  ': The DMA is sending a PUT message to MEMORY through the INTERCONNECT.')
    this.DMA.Send2Peri()
    const dma2p= this.DMA.masterDMA.ChannelA
    this.view?.interconnect.setIsRunning(this.Bus.active)

    this.cycle += 1
    handleCpuOperation.call(this);
    this.Bus.Port_in(dma2p, 1)

    this.Bus.Transmit()
    this.println('Cycle ', this.cycle.toString(),': The INTERCONNECT is forwarding the message to the PERIPHERAL.')
    console.log('Cycle ', this.cycle.toString(), ': The INTERCONNECT is forwarding the message to the PERIPHERAL.')

    this.cycle += 1
    handleCpuOperation.call(this);
    this.println('Cycle ', this.cycle.toString(), ': The PERIPHERAL is receiving a PUT message from the INTERCONNECT.')
    console.log('Cycle ', this.cycle.toString(),  ': The PERIPHERAL is receiving a PUT message from the INTERCONNECT.')

    this.cycle += 1
    handleCpuOperation.call(this);
    this.println('Cycle ', this.cycle.toString(), ': The PERIPHERAL is sending an AccessAck message to the DMA.')
    console.log('Cycle ', this.cycle.toString(),  ': The PERIPHERAL is sending an AccessAck message to the DMA.')

    this.cycle += 1
    handleCpuOperation.call(this);
    this.println('Cycle ', this.cycle.toString(),': The INTERCONNECT is forwarding the message to the DMA.')
    console.log('Cycle ', this.cycle.toString(), ': The INTERCONNECT is forwarding the message to the DMA.')

    this.cycle += 1
    handleCpuOperation.call(this);
    this.println('Cycle ', this.cycle.toString(), ': The DMA is receiving an AccessAck message from the INTERCONNECT.')
    console.log('Cycle ', this.cycle.toString(),  ': The DMA is receiving an AccessAck message from the INTERCONNECT.')
    //this.DMA.masterDMA.ChannelA = new ChannalA('000', '000', '10', '00', '0'.padStart(32, '0'), '0000', '0'.padStart(32, '0'), '0')
    // this.Bus.Port_in(doutChD, 0)
    // this.Bus.Transmit()
    // this.Bus.Port_out(1)
    
    // this.cycle += 1

    // this.println(
    //     'Cycle ',
    //     this.cycle.toString(),
    //     ': INTERCONNECT is sending message to DMA',
    // )
    // console.log(
    //     'Cycle ',
    //     this.cycle.toString(),
    //     ': INTERCONNECT is sending message to DMA',
    // )

    // this.cycle += 1
    // this.println(
    //     'Cycle ',
    //     this.cycle.toString(),
    //     ': DMA is receiving ACCESS_ACK message from INTERCONNECT',
    // )
    // console.log(
    //     'Cycle ',
    //     this.cycle.toString(),
    //     ': DMA is receiving ACCESS_ACK message from INTERCONNECT',
    // )
    // this.Processor.active = true
    // this.Processor.stalled = false
}
