import Soc from "../SOC/SoC"

export async function RunAll(this: Soc) {
    // CHECK PROCESSOR IS ACTIVED OR NOT
    if (this.Processor.active == false) {
        console.log('CPU has not been actived!!!')
        this.println('CPU has not been actived!!!')
        return
    }
    let bre = 0
    while (
        this.Processor.pc <
        this.Memory.Ins_pointer || this.Processor.state != 0 || this.DMA.state !=5
    ) {
        // if (bre == 3276) break
        // // // if (bre == 600 + 5 + 1) break
        // bre++
        // console.log(bre,'bre')
        await this.Step_()
    }
    console.log ( this.Processor.pc ,
        this.Memory.Ins_pointer , this.Processor.state != 0 , this.DMA.state !=5)
    console.log(this.Memory.Memory['00000000101000000'])    
    // console.log (this.Bus0.Timing)
    // console.log (this.Bus0.Pin[2])
    // console.log (this.Bus0)
    // console.log (this.Bus0.Pin[0])
    // console.log (this.Bridge)
    // console.log (this.Bus0.Pin)
    // console.log (this.cycle.cycle)
    // console.log (this.Bus1.Pin[0])
    // console.log (this.DMA.fifo_to_subInterconnect)
    // console.log (this.Processor.MMU.TLB)
    // console.log (this.Memory.getPageNumber())
    // console.log (this.DMA)
    // console.log (this.Processor.state)
    // console.log (this.Processor.pc ,
    //     this.Memory.Ins_pointer)
    // console.log (this.Processor.master.ChannelA)
    // console.log ('this.DMA.state', this.DMA)
    // console.log (this.MMU.endAddress)
    // console.log (this.Memory.Memory['00100000000001100'])
    // console.log (this.Memory.state)
    // console.log (this.Memory.Memory['10001000000010010'])
    // console.log (this.Memory.Memory['10001000000010001'])
    // console.log (this.Memory.Memory['10001000000010000'])
    // console.log (this.Bridge.state)
    // console.log (this.Bus1.Pin[2])
    // console.log (this.cycle)
    // console.log (this.Memory.slaveMemory.ChannelD)
    // console.log (this.Bus1)
    // console.log(this.Bus1.Pin[0])
    console.log (this.Led_matrix.state, this.Led_matrix.dataRegisters)
    // console.log(
    //     this.DMA
    // )
    // console.log (
    //     this.Processor.pc <
    //     this.Memory.Ins_pointer, this.Processor.state != 0, this.DMA.state !=0
    // )
    // console.log (this.Memory.Memory['00011000000000000'])    
    // console.log (this.Memory.Memory['00000000000000000'])
    // console.log (this.Memory.GetMemory()['00011000000000000'])
    // console.log (this.Memory.GetMemory()['00000000000000000'])
    // console.log(this.DMA.DMA_Master.ChannelA)
    // console.log(this.Bus1.Pin[0])
    // console.log(this.Bus1)
    // console.log(this.Bus0.Pin[1])
    // console.log (this.Bridge.state)
    // console.log (this.Bridge)
    // console.log(this.Bridge.fifo_from_subInterconnect)
    // console.log (this.Memory.getPageNumber())
    // console.log ('SOC.Memory.GetMemory()',this.Memory.GetMemory())
    // console.log (this.Processor.getRegisters())
    // console.log (this.Processor.MMU.satp)
   this.event.emit(Soc.SOCEVENT.DONE_ALL)
}