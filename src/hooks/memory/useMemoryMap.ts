import { startTransition, useEffect, useState } from 'react'
import { DMEMPOINT, IMEMPOINT, IOPOINT, LMPOINT, STACKPOINT } from '~/configs/memoryPoint.constant'

export type MemoryMapHookReturn = ReturnType<typeof useMemoryMap>

export default function useMemoryMap() {
    /** Memory Map state */
    const [lmPoint, setLmPoint] = useState(LMPOINT)
    const [ioPoint, setIOPoint] = useState(IOPOINT)
    const [iMemPoint, setIMemPoint] = useState(IMEMPOINT)
    const [dMemPoint, setDMemPoint] = useState(DMEMPOINT)
    const [stackPoint, setStackPoint] = useState(STACKPOINT)

    const [savedPoints, setSavedPoints] = useState({
        lmPoint: LMPOINT,
        ioPoint: IOPOINT,
        iMemPoint: IMEMPOINT,
        dMemPoint: DMEMPOINT,
        stackPoint: STACKPOINT,
    })

    const [isModified, setIsModified] = useState(false)

    function reset() {
        setLmPoint(LMPOINT)
        setIOPoint(IOPOINT)
        setIMemPoint(IMEMPOINT)
        setDMemPoint(DMEMPOINT)
        setStackPoint(STACKPOINT)
        setSavedPoints({
            lmPoint: LMPOINT,
            ioPoint: IOPOINT,
            iMemPoint: IMEMPOINT,
            dMemPoint: DMEMPOINT,
            stackPoint: STACKPOINT,
        })
    }

    function save() {
        setSavedPoints({
            lmPoint: lmPoint,
            ioPoint: ioPoint,
            iMemPoint: iMemPoint,
            dMemPoint: dMemPoint,
            stackPoint: stackPoint,
        })
    }

    useEffect(() => {
        startTransition(() => {
            setIsModified(
                lmPoint !== savedPoints.lmPoint ||
                    ioPoint !== savedPoints.ioPoint ||
                    iMemPoint !== savedPoints.iMemPoint ||
                    dMemPoint !== savedPoints.dMemPoint ||
                    stackPoint !== savedPoints.stackPoint,
            )
        })
    }, [lmPoint, ioPoint, iMemPoint, dMemPoint, stackPoint, savedPoints])

    return {
        lmPoint,
        ioPoint,
        iMemPoint,
        dMemPoint,
        stackPoint,
        savedPoints,
        isModified,
        reset,
        save,
        setLmPoint,
        setIOPoint,
        setIMemPoint,
        setDMemPoint,
        setStackPoint,
    }
}
