import React, { useCallback, useEffect, useState } from 'react'
import short from 'short-uuid'

export type TLBEntry = {
    id: string
    VPN: string,
    PPN: string,
    E: string,
    R: string,
    W: string,
    valid: string,
    timestamp: string,
}

export type UseTLBReturn = ReturnType<typeof useTLB>

const defaultDecTLBData = [
     [0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0],
     [0, 0, 0, 0, 0, 0, 0],
]

const defaultTLBData = defaultDecTLBData.map(
    ([VPN, PPN, E, R, W, valid, timestamp]) => ({
        id: short.generate(),
        VPN: VPN.toString(16),
        PPN: PPN.toString(16).padStart(8, '0'),
        E: E.toString(),
        R: R.toString(),
        W: W.toString(),
        valid: valid.toString(),
        timestamp: timestamp.toString(),
    }),
)

export default function useTLB(_length?: number) {
    const [length, setLength] = useState(_length ?? 8)
    const [tlbData, setTlbData] = useState<TLBEntry[]>(defaultTLBData)

    const [pointer, setPointer] = useState('00000000')

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
                        VPN: '0'.padStart(8, '0'),
                        PPN: '0'.padStart(8, '0'),
                        E: '0',
                        R: '0',
                        W: '0',
                        valid: '0',
                        timestamp: '0',
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
