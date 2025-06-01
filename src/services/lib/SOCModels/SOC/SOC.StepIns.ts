import Soc from "../SOC/SoC"

export async function StepIns(this: Soc) {
    // CHECK PROCESSOR IS ACTIVED OR NOT

    this.Assembler.break_point_text.sort((a, b) => a - b);

    this.Processor.InsLength = this.Memory.Ins_pointer
    console.log ('this.Memory.Ins_pointer', this.Memory.Ins_pointer)
    console.log ( this.Processor.stepDone == 2 ||  this.Processor.stepDone == 0)
    while (
        (this.Processor.stepDone == 2 ||  this.Processor.stepDone == 0)
        && (this.Processor.pc <= this.Processor.InsLength)
    ) {
            await this.Step()
    }
    this.Processor.stepDone = 2

    this.event.emit(Soc.SOCEVENT.DONE_ALL)
}