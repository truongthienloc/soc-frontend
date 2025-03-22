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
        // if (bre > 100) break
        // bre ++ 
    }

   this.event.emit(Soc.SOCEVENT.DONE_ALL)
}