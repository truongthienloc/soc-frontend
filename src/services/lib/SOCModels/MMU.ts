// TypeScript
import Master from './Master'
import Slave from './Slave'
import { dec } from './convert'
export default class MMU {
    constructor() {}
    public Dmem(virtual_address: any) {
        let physical_address
        physical_address = virtual_address
        return physical_address
    }
    public InMem(virtual_address: any) {
        let physical_address
        physical_address = virtual_address
        return physical_address
    }
    public OutMem(virtual_address: any) {
        let physical_address
        physical_address = (dec('0' + virtual_address) + 100).toString(2)
        return physical_address
    }
}

// export default class MMU {
//     DataMemory: { [key: string]: string }
//     IOMemory: { [key: string]: string }
//     DataMemory_size= 400
//     IOMemory_size  = 100
//     slaveDataMemory: Slave
//     slaveIOMemory: Slave
//     MasterMMU: Master

//     constructor() {
//         this.DataMemory = {}
//         this.IOMemory = {}
//         this.slaveDataMemory = new Slave('DataMemory', true)
//         this.slaveIOMemory   = new Slave('DataMemory', true)
//         this.MasterMMU       = new Master("MMU", true, "00")
//     }
//     public Dmem (virtual_address: any) {
//         let physical_address
//         physical_address= virtual_address
//         return physical_address
//     }
//     public InMem (virtual_address: any) {
//         let physical_address
//         physical_address= virtual_address
//         return physical_address
//     }
//     public OutMem (virtual_address: any) {
//         let physical_address
//         physical_address= virtual_address + 100
//         return physical_address
//     }
// }
