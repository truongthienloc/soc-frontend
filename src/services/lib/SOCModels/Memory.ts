// TypeScript

import Slave from './Slave';

export default class Memory {
    DataMemory: { [key: string]: string };
    IOMemory: { [key: string]: string };
    
    slaveDataMemory: Slave;
    slaveIOMemory: Slave;

    constructor() {
        this.DataMemory = {};
        this.IOMemory = {};
        this.slaveDataMemory = new Slave('DataMemory', true);
        this.slaveIOMemory = new Slave('DataMemory', true);
    }
}
