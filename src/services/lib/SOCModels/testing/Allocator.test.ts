import BuddyAllocator from '../BuddyAllocator'

class TestBuddyAllocator {
    private allocator: BuddyAllocator

    constructor() {
        this.allocator = new BuddyAllocator(1024) // Initialize with 1024 bytes
    }

    runTests() {
        console.log('Running Buddy Allocator Tests...')

        this.testBasicAllocation()
        this.testMultipleAllocations()
        this.testFullMemoryAllocation()
        this.testDeallocationAndReuse()
        this.testBuddyMerge()
        this.testEdgeCases()

        console.log('All tests completed.')
    }

    private assertEqual(actual: any, expected: any, message: string) {
        if (actual !== expected) {
            console.error(`❌ Test failed: ${message}`)
            console.error(`   Expected: ${expected}, Got: ${actual}`)
        } else {
            console.log(`✅ ${message}`)
        }
    }

    private testBasicAllocation() {
        const block = this.allocator.allocate(64)
        this.assertEqual(block !== null, true, 'Basic allocation should succeed.')
        this.allocator.print()
    }

    private testMultipleAllocations() {
        this.allocator = new BuddyAllocator(1024) // Reset allocator
        const block1 = this.allocator.allocate(64)
        const block2 = this.allocator.allocate(128)
        const block3 = this.allocator.allocate(256)

        this.assertEqual(block1 !== null, true, 'First allocation should succeed.')
        this.assertEqual(block2 !== null, true, 'Second allocation should succeed.')
        this.assertEqual(block3 !== null, true, 'Third allocation should succeed.')

        this.allocator.print()
    }

    private testFullMemoryAllocation() {
        this.allocator = new BuddyAllocator(1024) // Reset allocator
        this.allocator.allocate(512)
        this.allocator.allocate(512)

        const block = this.allocator.allocate(128)

        this.assertEqual(block, null, 'Allocation should fail when memory is full.')
    }

    private testDeallocationAndReuse() {
        this.allocator = new BuddyAllocator(1024) // Reset allocator
        const block = this.allocator.allocate(128)
        this.allocator.free(block!, 128)
        const newBlock = this.allocator.allocate(128)

        this.assertEqual(block, newBlock, 'Freed block should be reused.')
    }

    private testBuddyMerge() {
        this.allocator = new BuddyAllocator(1024) // Reset allocator
        const block1 = this.allocator.allocate(128)
        const block2 = this.allocator.allocate(128)
        this.allocator.free(block1!, 128)
        this.allocator.free(block2!, 128)

        this.allocator.print()
        // Expectation: The two blocks merge into a single block of size 256
    }

    private testEdgeCases() {
        this.allocator = new BuddyAllocator(1024) // Reset allocator
        const blockZero = this.allocator.allocate(0)
        this.assertEqual(blockZero, null, 'Allocation of size 0 should fail.')

        const blockLarge = this.allocator.allocate(2048)
        this.assertEqual(blockLarge, null, 'Allocation larger than memory should fail.')
    }
}

// Example usage
const tests = new TestBuddyAllocator()
tests.runTests()

// const allocator = new BuddyAllocator(1024) // Reset allocator
// allocator.print()
// const block1 = allocator.allocate(128)
// allocator.print()
// const block2 = allocator.allocate(128)
// allocator.print()
// allocator.free(block1, 128)
// allocator.print()

// console.log('free block 2');
// allocator.free(block2, 128)

// allocator.print()
