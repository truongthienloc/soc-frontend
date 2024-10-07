import React, { useEffect, useState } from 'react'
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

    /**
     * Handles a change in the TLB data. If the key is 'editable', then the value is a boolean
     * indicating whether the row is editable or not. If the key is any other field, then the value
     * is a string representing the value of the field. The function updates the state accordingly.
     * @param index The index of the row in the TLB data.
     * @param key The key of the field that is being changed.
     * @param value The new value of the field.
     */
    const handleTLBDataChange = (index: number, key: keyof TLBEntry, value: string | boolean) => {
        const newTlbData = [...tlbData]

        newTlbData[index][key] = value.toString()
        setTlbData(newTlbData)
    }

    const setTLBEntry = (index: number, value: TLBEntry) => {
        const newTlbData = [...tlbData]
        newTlbData[index] = value
        setTlbData(newTlbData)
    }

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
        handleTLBDataChange,
        setTLBEntry,
        pointer,
        setPointer,
    }
}
