import Soc from "../SOC/SoC"

export async function RunAll(this: Soc) {
    // CHECK PROCESSOR IS ACTIVED OR NOT
    if (this.Processor.active == false) {
        console.log('CPU has not been actived!!!')
        this.println('CPU has not been actived!!!')
        return
    }
    let bre = 0
    console.log ('this.Processor.InsLength', this.Processor.InsLength)
    if (this.Assembler.break_point_text.length > 0) {
        for (let i =0; i < this.Assembler.break_point_text.length; i++) {
            while (
            this.Processor.pc <
            this.Assembler.break_point_text[i]*4 || this.Processor.state != 0 
            || 
            !(
                this.DMA.controlRegister == '00000000000000000000000000000000' || 
                (this.DMA.controlRegister != '00000000000000000000000000000000' 
                && this.DMA.statusRegister == '00000000000000000000000000000001')
            )
            ) {
                await this.Step_()
            }
        }
    }
    else {
        while (
            this.Processor.pc <
            this.Memory.Ins_pointer || this.Processor.state != 0 
            || 
            !(
                this.DMA.controlRegister == '00000000000000000000000000000000' || 
                (this.DMA.controlRegister != '00000000000000000000000000000000' 
                && this.DMA.statusRegister == '00000000000000000000000000000001')
            )
        ) {
                await this.Step_()
            }
    }

    console.log(this.Memory.GetMemory()['00011000000000000'])
    console.log(this.Processor.getRegisters())

   this.event.emit(Soc.SOCEVENT.DONE_ALL)
}