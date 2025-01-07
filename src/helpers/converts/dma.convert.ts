import { Register } from '~/types/register'
import { binaryToHex } from './Hextobin'

export function convertToDMAStandard(pure: Record<string, string>): Register[] {
    const result: Register[] = []

    for (const key in pure) {
        if (Object.prototype.hasOwnProperty.call(pure, key)) {
            const element = pure[key]

            if (!element) {
                continue
            }

            result.push({
                name: binaryToHex(key),
                value: binaryToHex(element),
            })
        }
    }

    return result
}
