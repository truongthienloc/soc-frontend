import Slave from './Slave'

export default class Memory {
    Memory: { [key: string]: string }
    active: boolean
    slaveMemory: Slave
    constructor(active: boolean) {
        this.Memory = {}
        this.active = active
        this.slaveMemory = new Slave('DataMemory', active)
    }
}
