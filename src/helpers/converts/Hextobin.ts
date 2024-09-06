export function hexToBinary(hex: string): string {
    // Chuyển đổi chuỗi hex thành số nguyên
    const decimal = parseInt(hex, 16)

    // Chuyển số nguyên sang chuỗi nhị phân
    let binary = decimal.toString(2)

    binary = binary.padStart(32, '0')

    return binary
}

export function binaryToHex(binary: string): string {
    // Validate the input to ensure it is a binary string
    if (!/^[01]+$/.test(binary)) {
        throw new Error('Invalid binary string')
    }

    // Convert binary string to a decimal integer
    const decimalValue = parseInt(binary, 2)

    // Convert decimal integer to hexadecimal string
    const hexString = '0x' + decimalValue.toString(16).padStart(8, '0')

    return hexString
}
