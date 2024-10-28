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
    [0, 4544, 0, 0],
    [1, 5567, 0, 0],
    [2, 6590, 0, 0],
    [3, 7613, 0, 0],
    [4, 8636, 0, 0],
    [5, 9659, 0, 0],
    [6, 10682, 0, 0],
    [7, 11705, 0, 0],
]

const defaultTLBData = defaultDecTLBData.map(([pageNumber, physicalAddress, timestamp, valid]) => ({
    id: short.generate(),
    pageNumber: pageNumber.toString(16),
    physicalAddress: physicalAddress.toString(16).padStart(8, '0'),
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
