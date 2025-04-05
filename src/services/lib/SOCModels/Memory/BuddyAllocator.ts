
export default class BuddyAllocator {
    private startAddress: number = 0
    private totalSize: number = 0

    constructor(totalSize: number, start: number = 0) {
        this.startAddress = start
        this.totalSize  = totalSize
    }
    
    allocate (required_size : number) {
        let buddy = 1
        while (required_size > buddy) buddy *= 2
        this.startAddress += buddy
        this.totalSize    -= buddy
        return this.startAddress
    }

}