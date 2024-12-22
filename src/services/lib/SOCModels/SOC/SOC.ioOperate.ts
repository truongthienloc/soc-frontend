import { BinToHex } from "../convert"
import Soc from "../SoC"

export function IO_operate (this: Soc) {
    const DMA_buffer = this.DMA.Databuffer
    //MONITOR MATRIX OPERATE
    const monitor_address = this.Memory.IO_point.toString(2).padStart(32,'0')
    //console.log('monitor: ', BinToHex(this.Memory.Memory[monitor_address]))
    if (this.active_monitor == true) {
        this.monitor?.println(BinToHex(this.Memory.Memory[monitor_address]))
        this.view?.monitor.setIsRunning(this.active_monitor)
    }
    else {
        this.println('MONITOR has not actived!!!')
        console.log('MONITOR has not actived!!!')
    }

    //LED MATRIX OPERATE
    let addr_buffer  = 0 
    if (this.view) 
        this.view?.ledMatrix.setIsRunning(this.view.matrixModule.getActivated())
    for (let i = 0; i < 96; i++) {
        let lineOfLed = DMA_buffer[addr_buffer] + DMA_buffer[addr_buffer + 1] + DMA_buffer[addr_buffer + 2]
        addr_buffer = addr_buffer + 3
        for (let j = 0; j < 96; j++) {
            if (lineOfLed[j] == '0' || lineOfLed[j] == undefined) 
                this.Led_matrix[i][j]= false
            if (lineOfLed[j] == '1')
                this.Led_matrix[i][j]= true
            }
    }

    this.LedMatrix?.clear()
    for (let i = 0; i < 96; i++) {
        for (let j = 0; j < 96; j++) {
            if (this.Led_matrix[i][j]) {
                this.LedMatrix?.turnOn(i, j)
            }
            else {
                this.LedMatrix?.turnOff(i, j)
            }
        }
    }
}