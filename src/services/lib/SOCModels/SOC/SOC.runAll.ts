import Soc from "../SOC/SoC"

export function RunAll(this: Soc) {
    // CHECK PROCESSOR IS ACTIVED OR NOT
    if (this.Processor.active == false) {
        console.log('CPU has not been actived!!!')
        this.println('CPU has not been actived!!!')
        return
    }
    while (
        this.Processor.pc <
        this.Memory.Ins_pointer || this.Processor.state != 0
    ) {
        this.Step()
    }

   this.event.emit(Soc.SOCEVENT.DONE_ALL)
}