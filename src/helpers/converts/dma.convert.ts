import { Register } from '~/types/register'
import { binaryToHex } from './Hextobin'

export function convertToDMAStandard(_start: string, pure: string[]): Register[] {
    const result: Register[] = []
    let name = parseInt(_start, 16)

    for (const element of pure) {
        result.push({
            name: '0x' + name.toString(16).padStart(8, '0'),
            value: binaryToHex(element),
        })
        name += 4
    }

    return result
}
