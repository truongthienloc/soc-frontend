import { Allocator } from "./Allocator"


export default class BuddyAllocator implements Allocator {
    private startAddress: number = 0
    private totalSize: number = 0
    private freeBlocks: Record<number, number[]> = {}

    constructor(totalSize: number, start: number = 0) {
        this.startAddress = start
        this.totalSize = totalSize
        this.freeBlocks[this.totalSize] = [0] // init with free block
    }

    allocate(size: number) {
        if (size <= 0 || size > this.totalSize) {
            return null
        }

        let blockSize = 1
        while (blockSize < size) {
            blockSize *= 2
        }

        for (const [key, freeBlocks] of Object.entries(this.freeBlocks)) {
            let availableSize = parseInt(key)
            if (availableSize >= blockSize && freeBlocks.length > 0) {
                const blockStart = freeBlocks.shift() as number
                while (availableSize > blockSize) {
                    availableSize /= 2
                    let buddy = blockStart + availableSize
                    if (!this.freeBlocks[buddy]) {
                        this.freeBlocks[buddy] = []
                    }
                    this.freeBlocks[availableSize].push(buddy)
                }
                return this.startAddress + blockStart
            }
        }

        return null
    }

    free(address: number, size: number) {
        let blockStart = address - this.startAddress
        let blockSize = 1
        while (blockSize < size) {
            blockSize *= 2
        }

        let currentSize = blockSize
        while (currentSize <= this.totalSize) {
            
            if (!this.freeBlocks[currentSize]) {
                this.freeBlocks[currentSize] = []
            }

            let buddy = blockStart ^ currentSize
            if (this.freeBlocks[currentSize].includes(buddy)) {
                const index = this.freeBlocks[currentSize].indexOf(buddy)
                if (index > -1) {
                    this.freeBlocks[currentSize].splice(index, 1)
                }
                blockStart = Math.min(blockStart, buddy)
                currentSize *= 2
            }
            else {
                this.freeBlocks[currentSize].push(blockStart)
                return
            }
        }
    }

    print() {
        console.log(this.freeBlocks)
    }
}