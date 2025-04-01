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
        this.Memory.Ins_pointer || this.Processor.state != 0 || this.DMA.state !=0
    ) {
        await this.Step()
        // if (bre > 145) break
        // bre ++ 
    }

    // console.log (this.Bridge.fifo_from_Interconnect, this.Bridge.state)
    // console.log (this.Bus1.Pout[0])
    // console.log (this.Led_matrix.state, this.Led_matrix.Matrix_Slave.ChannelD)
    // console.log(
    //     this.DMA
    // )
    // console.log(this.DMA.DMA_Master.ChannelA)
    console.log(this.Bus1.Pin[2])
    // console.log(this.Bus0.Pout[1])
    // console.log(this.Bridge.fifo_from_subInterconnect)
    // console.log (this.Processor.getRegisters())
   this.event.emit(Soc.SOCEVENT.DONE_ALL)
}