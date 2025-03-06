import { Block } from "@mui/icons-material"
import { Allocator } from "./Allocator"


export default class BuddyAllocator {
    private startAddress: number = 0
    private totalSize: number = 0
    private freeBlocks: Record<number, number[]> = {}

    constructor(totalSize: number, start: number = 0) {
        this.startAddress = start
        this.totalSize  = totalSize
        this.freeBlocks[this.totalSize] = [0] // init with free block
    }
    
    allocate (required_size : number) {
        let buddy = 1
        while (required_size > buddy) buddy *= 2
        this.startAddress += buddy
        this.totalSize    -= buddy
        return this.startAddress
    }
    // }
    // allocate(size: number) {
    //     if (size <= 0 || size > this.totalSize) {
    //         return null
    //     }

    //     let blockSize = 1
    //     while (blockSize < size) { // tim co so 2 gan voi gia tri size (chan tren)
    //         blockSize *= 2
    //     }
    //     console.log ('blockSize: ', blockSize)

    //     for (const [key, freeBlocks] of Object.entries(this.freeBlocks)) {
    //         console.log ('key, freeBlocks: ', key, freeBlocks)
    //         let availableSize = parseInt(key)
    //         if (availableSize >= blockSize && freeBlocks.length > 0) { // availble block > req block && toatal block > 0
    //             const blockStart = freeBlocks.shift() as number // freeBlocks[8]= [0] -> 0
    //             console.log ('blockStart: ', blockStart)
    //             while (availableSize > blockSize) {
    //                 availableSize /= 2 // 4 // 2
    //                 let buddy = blockStart + availableSize // 4 // 
    //                 if (!this.freeBlocks[availableSize]) { 
    //                     this.freeBlocks[availableSize] = [] // freeBlocks[4]= []
    //                 }
    //                 this.freeBlocks[availableSize].push(buddy) //freeBlocks[4]= [4]
    //             }
    //             return this.startAddress + blockStart // 0
    //         }
    //     }

    //     return null
    // }

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