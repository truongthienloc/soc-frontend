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

export function convertMemoryTableToText(memory: Register[]) {
    const _memory = [...memory]
    _memory.sort((a, b) => parseInt(a.name, 16) - parseInt(b.name, 16))

    let prevAddress: number | undefined = undefined
    const result: string[] = []
    for (const { name, value } of _memory) {
        const address = parseInt(name, 16)
        if (prevAddress === undefined || address - prevAddress > 4) {
            if (result.length > 0) result.push('')
            result.push(`${name}:`)
        }

        result.push(`${value}`)
        prevAddress = address
    }
    return result.join('\n')
}
