export function hexToBinary(hex: string): string {
    // Chuyển đổi chuỗi hex thành số nguyên
    const decimal = parseInt(hex, 16)

    // Chuyển số nguyên sang chuỗi nhị phân
    let binary = decimal.toString(2)

    binary = binary.padStart(32, '0')

    return binary
}
