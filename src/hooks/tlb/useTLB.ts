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

export default function useTLB(_length?: number) {
    const [length, setLength] = useState(_length ?? 8)
    const [tlbData, setTlbData] = useState<TLBEntry[]>(
        Array.from({ length: length }).map((_, i) => ({
            id: short.generate(),
            pageNumber: '0',
            physicalAddress: '0'.padStart(8, '0'),
            timestamp: '0'.padStart(8, '0'),
            valid: '0',
        })),
    )

    const [pointer, setPointer] = useState(''.padStart(8, '0'))

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
