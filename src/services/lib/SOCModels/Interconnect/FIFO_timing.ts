export class FIFO_timing {
    private queue: number[];

    constructor() {
        this.queue = [];
    }

    // Thêm phần tử vào cuối hàng đợi
    enqueue(item: number): void {
        this.queue.push(item);
    }

    // Lấy phần tử đầu tiên ra khỏi hàng đợi
    dequeue(): number | undefined {
        return this.queue.length > 0 ? this.queue.shift() : undefined;
    }

    // Kiểm tra phần tử đầu tiên mà không xóa nó khỏi hàng đợi
    peek(): number  {
        return this.queue.length > 0 ? this.queue[0] : Infinity  

    }

    // Kiểm tra xem hàng đợi có rỗng không
    isEmpty(): boolean {
        return this.queue.length === 0;
    }

    // Lấy kích thước hàng đợi
    size(): number {
        return this.queue.length;
    }
}
