import ChannelA from "./ChannelA";

export class FIFO_ChannelA {
    private queue: ChannelA[];

    constructor() {
        this.queue = [];
    }

    enqueue(item: ChannelA): void {
        this.queue.push(item);
    }

    // Sửa đổi phương thức dequeue để trả về một đối tượng ChannelA mặc định nếu hàng đợi rỗng
    dequeue(): ChannelA {
        if (this.queue.length === 0) {
            // Trả về một đối tượng mới của ChannelA với các giá trị mặc định khi hàng đợi rỗng
            return new ChannelA(
                '000',   // opcode
                '000',   // param
                '10',    // size
                '00',    // source
                '0'.padStart(17, '0'), // address
                '0000',  // mask
                '0'.padStart(32, '0'), // data
                '0',     // corrupt
                '0',     // additional fields (depending on ChannelA constructor requirements)
                '0'
            );
        }
        return this.queue.shift()!;
    }

    peek(): ChannelA | undefined {
        return this.queue[0];
    }

    isEmpty(): boolean {
        return this.queue.length === 0;
    }

    size(): number {
        return this.queue.length;
    }
}
