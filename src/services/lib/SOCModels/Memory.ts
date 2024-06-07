// TypeScript

import Slave from './Slave';

export default class Memory {
    DataMemory: { [key: string]: string };
    slave: Slave;

    constructor() {
        this.DataMemory = {};
        this.slave = new Slave('DataMemory', true);
    }
}
