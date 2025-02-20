import React, { useCallback, useEffect, useState } from 'react'
import short from 'short-uuid'

export type TLBEntry = {
    id: string
    pageNumber0: string
    pageNumber1: string
    physicalAddress0: string
    physicalAddress1: string
    timestamp: string
    valid: string
}

export type UseTLBReturn = ReturnType<typeof useTLB>

const defaultDecTLBData = [
    [0, 0, 4544, 0, 0, 0],
    [1, 0, 5567, 0, 0, 0],
    [2, 0, 6590, 0, 0, 0],
    [3, 0, 7613, 0, 0, 0],
    [4, 0, 8636, 0, 0, 0],
    [5, 0, 9659, 0, 0, 0],
    [6, 0, 10682, 0, 0, 0],
    [7, 0, 11705, 0, 0, 0],
]

const defaultTLBData = defaultDecTLBData.map(([pageNumber0, pageNumber1, physicalAddress0, physicalAddress1, timestamp, valid]) => ({
    id: short.generate(),
    pageNumber0: pageNumber0.toString(16),
    pageNumber1: pageNumber1.toString(16),
    physicalAddress0: physicalAddress0.toString(16).padStart(8, '0'),
    physicalAddress1: physicalAddress1.toString(16).padStart(8, '0'),
    timestamp: timestamp.toString(),
    valid: valid.toString(),
}))

export default function useTLB(_length?: number) {
    const [length, setLength] = useState(_length ?? 8)
    const [tlbData, setTlbData] = useState<TLBEntry[]>(defaultTLBData)

    const [pointer, setPointer] = useState('11240')

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
                        pageNumber0: '0',
                        pageNumber1: '0',
                        physicalAddress0: '0'.padStart(8, '0'),
                        physicalAddress1: '0'.padStart(8, '0'),
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
