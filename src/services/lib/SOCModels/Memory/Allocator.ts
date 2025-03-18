export interface Allocator {
    allocate(size: number): number | null;
    free(address: number, size: number): void;
}