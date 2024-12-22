import Soc from "../SoC"

export function RunAll(this: Soc) {
    // CHECK PROCESSOR IS ACTIVED OR NOT
    if (this.Processor.active == false) {
        console.log('CPU has not been actived!!!')
        this.println('CPU has not been actived!!!')
        return
    }

    while (
        this.Processor.pc <
        (Object.values(this.Processor.Instruction_memory).length - 1) * 4
    ) {
        this.Step()
    }

   this.event.emit(Soc.SOCEVENT.DONE_ALL)
}