import Soc from "../SOC/SoC"

export async function RunAll(this: Soc) {
    // CHECK PROCESSOR IS ACTIVED OR NOT
    if (this.Processor.active == false) {
        console.log('CPU has not been actived!!!')
        this.println('CPU has not been actived!!!')
        return
    }
    let bre = 0
    console.log ('this.Assembler.break_point_text.length', this.Assembler.break_point_text.length)
    if (this.Assembler.break_point_text.length > 0) {
        let break_point = this.Assembler.break_point_text.pop()
        if (break_point != undefined) this.Processor.InsLength = break_point*4
        else this.Processor.InsLength = 0
        console.log ('this.Processor.InsLength', this.Processor.InsLength)
        while (
            this.Processor.pc <
            this.Processor.InsLength || this.Processor.Controller.state != 0 
            || 
            !(
                this.DMA.controlRegister == '00000000000000000000000000000000' || 
                (this.DMA.controlRegister != '00000000000000000000000000000000' 
                && this.DMA.statusRegister == '00000000000000000000000000000001')
            )
        ) {
            await this.Step()
            
        }
        this.Processor.InsLength = this.Memory.Ins_pointer       
    }
    else {
        this.Processor.InsLength = this.Memory.Ins_pointer
        console.log ('this.Memory.Ins_pointer', this.Memory.Ins_pointer)
        while (
            this.Processor.pc <
            this.Memory.Ins_pointer || this.Processor.Controller.state != 0 
            || 
            !(
                this.DMA.controlRegister == '00000000000000000000000000000000' || 
                (this.DMA.controlRegister != '00000000000000000000000000000000' 
                && this.DMA.statusRegister == '00000000000000000000000000000001')
            )
        ) {
                await this.Step()
                // bre++ 
                // if (bre > 9856 + 30) break
            }
    }

    // console.log(this.Processor.getRegisters())
    // console.log(this.Led_matrix.dataRegisters)
    // console.log (this.DMA.RX_FIFO.size())
    console.log (this.cycle.cycle)
    console.log (this.Bus1)
    console.log (this.DMA)

   this.event.emit(Soc.SOCEVENT.DONE_ALL)
}