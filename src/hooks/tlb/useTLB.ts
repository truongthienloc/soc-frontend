import React, { useState } from 'react'
import short from 'short-uuid'

export type TLBEntry = {
    id: string
    pageNumber: string
    physicalAddress: string
    timestamp: string
    valid: string
    editable: boolean
}

export type UseTLBReturn = ReturnType<typeof useTLB>

export default function useTLB() {
    const [tlbData, setTlbData] = useState<TLBEntry[]>(
        Array.from({ length: 8 }).map((_, i) => ({
            id: short.generate(),
            pageNumber: i.toString(),
            physicalAddress: '0'.padStart(8, '0'),
            timestamp: '0'.padStart(8, '0'),
            valid: '0',
            editable: false,
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
        if (key === 'editable') {
            newTlbData[index][key] = !!value
            return
        }
        newTlbData[index][key] = value.toString()
        setTlbData(newTlbData)
    }

    const setTLBEntry = (index: number, value: TLBEntry) => {
        const newTlbData = [...tlbData]
        newTlbData[index] = value
        setTlbData(newTlbData)
    }

    return {
        tlbData,
        handleTLBDataChange,
        setTLBEntry,
        pointer,
        setPointer,
    }
}
