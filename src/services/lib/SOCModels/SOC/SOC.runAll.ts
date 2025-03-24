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
        // if (bre > 50) break
        // bre ++ 
    }
    // console.log(this.Processor.getRegisters(), this.Processor.state)
    // // console.log(this.Bridge)
    // console.log(this.Bus1.Pout[1].dequeue())
    console.log(this.Bus1.Pout[0])
   this.event.emit(Soc.SOCEVENT.DONE_ALL)
}