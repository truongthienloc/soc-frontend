import { Register } from '~/types/register'
import { createRangeDmemData, LENGTH_OF_DMEM } from './dMemRange.generate'

const NUMBER_OF_DMEM = 4
export const LENGTH_OF_MULTIPLE_DMEM = LENGTH_OF_DMEM * NUMBER_OF_DMEM

export type TDmemRange = {
    key: string
    data: Register[]
}

export function generateMultipleDmemRange(
    data: Register[],
    start: string,
    end?: string,
): TDmemRange[] {
    const res: TDmemRange[] = []
    let startDec = parseInt(start, 16)
    const finalEndDec = end ? parseInt(end, 16) : startDec + LENGTH_OF_MULTIPLE_DMEM * 4

    for (let i = 0; i < NUMBER_OF_DMEM; i++) {
        const endDec = Math.min(startDec + LENGTH_OF_DMEM * 4, finalEndDec)
        const key = `DMem-${startDec}-${endDec}`
        const dmemData = createRangeDmemData(data, startDec.toString(16), endDec.toString(16))
        res.push({
            key,
            data: dmemData,
        })
        startDec = endDec
    }
    return res
}
