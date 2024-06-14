
import Slave from './Slave'

export default class Memory {
    Memory: { [key: string]: string }
    slaveMemory: Slave
    constructor() {
        this.Memory = {}
        this.slaveMemory = new Slave('DataMemory', true)
    }
    // public store (size: string, data: string, address: string){
    //     if (size === 'sb') {
    //         this.Data_memory[address] = this.Data_memory[address].slice(8) + writeData.slice(-8)
    //     }
    //     if (size === 'sh') {
    //         this.Data_memory[address] = this.Data_memory[address].slice(16) + writeData.slice(-16)
    //     }
    //     if (size === 'sw') {
    //         this.Data_memory[address] = writeData
    //     }
    // }
}