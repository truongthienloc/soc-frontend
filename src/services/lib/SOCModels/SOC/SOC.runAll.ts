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
        this.Memory.Ins_pointer || this.Processor.state != 0
    ) {
        await this.Step()
        // if (bre > 60) break
        // bre ++ 
    }
    // console.log(this.Processor.getRegisters(), this.Processor.state)
    // console.log(this.Bridge)
    // console.log(this.Bus0.Pout[0], this.Processor.state)
    // console.log(this.DMA.sourceAddress
    //     , this.DMA.destinationAddress
    //     , this.DMA.length
    //     , this.DMA.control
    //     , this.DMA.state
    //     , this.DMA.DMA_Master
    // )

    // console.log(
    //     this.Processor.state
    // )
    // console.log(this.Bus0.Timming
    //             , this.Bus0.Pin
    // )
   this.event.emit(Soc.SOCEVENT.DONE_ALL)
}