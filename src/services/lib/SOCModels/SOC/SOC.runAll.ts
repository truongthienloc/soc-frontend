import Soc from "../SoC"

export function RunAll(this: Soc) {
    // CHECK PROCESSOR IS ACTIVED OR NOT
    if (this.Processor.active == false) {
        console.log('CPU has not been actived!!!')
        this.println('CPU has not been actived!!!')
        return
    }
    console.log ('this.Processor.pc: ', this.Processor.pc)
    console.log ('this.Processor.pc: ', this.Memory.Ins_pointer)
    while (
        this.Processor.pc <
        this.Memory.Ins_pointer
    ) {

        this.Step()
    }

   this.event.emit(Soc.SOCEVENT.DONE_ALL)
}