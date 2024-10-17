import React, { useCallback, useEffect, useState } from 'react'
import short from 'short-uuid'

export type TLBEntry = {
    id: string
    pageNumber: string
    physicalAddress: string
    timestamp: string
    valid: string
}

export type UseTLBReturn = ReturnType<typeof useTLB>

const defaultDecTLBData = [
    [0, 4544, 1, 0],
    [1, 8639, 1, 1],
    [2, 12734, 1, 1],
    [3, 16829, 1, 1],
    [4, 20924, 1, 1],
    [5, 25019, 1, 1],
    [6, 29114, 1, 1],
    [244, 1003724, 1, 1],
    [245, 1003724, 1, 1],
    [246, 1003724, 1, 1],
]

const defaultTLBData = defaultDecTLBData.map(([pageNumber, physicalAddress, timestamp, valid]) => ({
    id: short.generate(),
    pageNumber: pageNumber.toString(16),
    physicalAddress: physicalAddress.toString(16).padStart(8, '0'),
    timestamp: timestamp.toString(16).padStart(8, '0'),
    valid: valid.toString(16),
}))

export default function useTLB(_length?: number) {
    const [length, setLength] = useState(_length ?? 8)
    const [tlbData, setTlbData] = useState<TLBEntry[]>(defaultTLBData)

    const [pointer, setPointer] = useState('ffffff')

    const setTLBEntry = useCallback(
        (index: number, value: TLBEntry) => {
            const newTlbData = [...tlbData]
            newTlbData[index] = value
            setTlbData(newTlbData)
        },
        [tlbData],
    )

    const setTLBEntries = useCallback(
        (newTlbData: TLBEntry[]) => {
            setTlbData(newTlbData)
        },
        [tlbData],
    )

    useEffect(() => {
        if (length < tlbData.length) {
            setTlbData(tlbData.slice(0, length))
        } else if (length > tlbData.length) {
            setTlbData(
                tlbData.concat(
                    Array.from({ length: length - tlbData.length }).map(() => ({
                        id: short.generate(),
                        pageNumber: '0',
                        physicalAddress: '0'.padStart(8, '0'),
                        timestamp: '0'.padStart(8, '0'),
                        valid: '0',
                    })),
                ),
            )
        }
    }, [length])

    return {
        length,
        setLength,
        tlbData,
        setTLBEntry,
        setTLBEntries,
        pointer,
        setPointer,
    }
}
