export function isValidHexString(hex: string): boolean {
    if (hex === '') {
        return true
    }
    const hexRegex = /^(0x|#)?[0-9A-Fa-f]+$/
    return hexRegex.test(hex)
}
