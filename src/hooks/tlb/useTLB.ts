import React, { useCallback, useEffect, useState } from 'react'
import short from 'short-uuid'

export type TLBEntry = {
    id: string
    pageNumber0: string
    // pageNumber1: string
    physicalAddress0: string
    // physicalAddress1: string
    timestamp: string
    valid: string
}

export type UseTLBReturn = ReturnType<typeof useTLB>

const defaultDecTLBData = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
]

const defaultTLBData = defaultDecTLBData.map(
    ([pageNumber0, , physicalAddress0, , timestamp, valid]) => ({
        id: short.generate(),
        pageNumber0: pageNumber0.toString(16),
        pageNumber1: pageNumber0.toString(16),
        physicalAddress0: physicalAddress0.toString(16).padStart(8, '0'),
        physicalAddress1: physicalAddress0.toString(16).padStart(8, '0'),
        timestamp: timestamp.toString(),
        valid: valid.toString(),
    }),
)

export default function useTLB(_length?: number) {
    const [length, setLength] = useState(_length ?? 8)
    const [tlbData, setTlbData] = useState<TLBEntry[]>(defaultTLBData)

    const [pointer, setPointer] = useState('80003000')

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
