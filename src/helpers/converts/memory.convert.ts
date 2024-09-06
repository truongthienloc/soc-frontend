import { Register } from '~/types/register'
import { convertBinary2Hex } from '../generates/dMemRange.generate'

export function convertMemoryCoreToRegisterType(memory: { [key: string]: string }) {
    const result: Register[] = []

    for (const [key, value] of Object.entries(memory)) {
        if (parseInt(value, 2) === 0) {
            continue
        }

        const name = convertBinary2Hex(key)
        const newValue = convertBinary2Hex(value)

        result.push({ name, value: newValue })
    }

    return result
}
