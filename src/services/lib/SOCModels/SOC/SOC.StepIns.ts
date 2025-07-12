import Soc from "../SOC/SoC"

export async function StepIns(this: Soc) {
    // CHECK PROCESSOR IS ACTIVED OR NOT

    this.Assembler.break_point_text.sort((a, b) => a - b);
    console.log (this.Processor.stepDone
        , this.Processor.pc
        , this.Processor.InsLength
        , this.Processor.state
    )

    // console.log (
    //     this.TL_UH.st
    // )
    this.Processor.InsLength = this.Memory.Ins_pointer
    this.Processor.stepDone = 2
    while (
        (this.Processor.stepDone == 2 ||  this.Processor.stepDone == 0)
        && (this.Processor.pc <= this.Processor.InsLength)
        && this.Processor.state != this.Processor.OUT_WORK
    ) {
            await this.Step()
    }


    this.event.emit(Soc.SOCEVENT.DONE_ALL)
}