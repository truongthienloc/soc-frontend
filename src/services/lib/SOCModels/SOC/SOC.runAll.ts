import Soc from "../SOC/SoC"

export function RunAll(this: Soc) {
    // CHECK PROCESSOR IS ACTIVED OR NOT
    if (this.Processor.active == false) {
        console.log('CPU has not been actived!!!')
        this.println('CPU has not been actived!!!')
        return
    }
    let c = 0 
    while (
        this.Processor.pc <
        this.Memory.Ins_pointer || this.Processor.state != 0
    ) {
        c++ 
        this.Step()
        if (c>100) break
    }
    console.log(this.Processor.pc,  this.Memory.Ins_pointer, c)
   this.event.emit(Soc.SOCEVENT.DONE_ALL)
}