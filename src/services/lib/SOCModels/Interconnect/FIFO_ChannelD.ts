import ChannelD from "./ChannelD";
export class FIFO_ChannelD {
    private queue: ChannelD[];
    
    constructor() {
        this.queue = [];
    }
    
    enqueue(item: ChannelD): void {
        this.queue.push(item);
    }
    
    dequeue(): any{
        if (this.queue.length === 0) {
                // Trả về một đối tượng mới của ChannelA với các giá trị mặc định khi hàng đợi rỗng
                return new ChannelD ( '000'                 // opcode
                                    , '00'                  // param
                                    , '10'                  // size
                                    , '00'                  // source
                                    , '0'                   // sink
                                    , '0'                   // denied
                                    , '0'.padStart(32, '0') // data
                                    , '0'                   // corrupt
                                    , '0'
                                    , '0'
                                )
            }
        return this.queue.shift();
    }
    
    peek(): any {
        return this.queue[0];
    }
    
    isEmpty(): boolean {
        return this.queue.length === 0;
    }

    size(): number {
        return this.queue.length;
    }
}