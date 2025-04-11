import { startTransition, useEffect, useState } from 'react'
import {
    PERIPHERAL_POINT,
    DATA_POINT,
    PAGE_TABLE_POINT,
    INSTRUCTION_POINT,
} from '~/configs/memoryPoint.constant'

export type MemoryMapHookReturn = ReturnType<typeof useMemoryMap>

export default function useMemoryMap() {
    /** Memory Map state */
    const [instructionPoint, setInstructionPoint] = useState(INSTRUCTION_POINT)
    const [pageTablePoint, setPageTablePoint] = useState(PAGE_TABLE_POINT)
    const [dataPoint, setDataPoint] = useState(DATA_POINT)
    const [peripheralPoint, setPeripheralPoint] = useState(PERIPHERAL_POINT)

    const [savedPoints, setSavedPoints] = useState({
        instructionPoint: INSTRUCTION_POINT,
        pageTablePoint: PAGE_TABLE_POINT,
        dataPoint: DATA_POINT,
        peripheralPoint: PERIPHERAL_POINT,
    })

    const [isModified, setIsModified] = useState(false)

    function reset() {
        setInstructionPoint(INSTRUCTION_POINT)
        setPageTablePoint(PAGE_TABLE_POINT)
        setDataPoint(DATA_POINT)
        setPeripheralPoint(PERIPHERAL_POINT)
        setSavedPoints({
            instructionPoint: INSTRUCTION_POINT,
            pageTablePoint: PAGE_TABLE_POINT,
            dataPoint: DATA_POINT,
            peripheralPoint: PERIPHERAL_POINT,
        })
    }

    function save() {
        setSavedPoints({
            instructionPoint: instructionPoint,
            pageTablePoint: pageTablePoint,
            dataPoint: dataPoint,
            peripheralPoint: peripheralPoint,
        })
    }

    useEffect(() => {
        startTransition(() => {
            setIsModified(
                instructionPoint !== savedPoints.instructionPoint ||
                    pageTablePoint !== savedPoints.pageTablePoint ||
                    dataPoint !== savedPoints.dataPoint ||
                    peripheralPoint !== savedPoints.peripheralPoint,
            )
        })
    }, [instructionPoint, pageTablePoint, dataPoint, peripheralPoint, savedPoints])

    return {
        instructionPoint,
        pageTablePoint,
        dataPoint,
        peripheralPoint,
        savedPoints,
        isModified,
        reset,
        save,
        setInstructionPoint,
        setPageTablePoint,
        setDataPoint,
        setPeripheralPoint,
    }
}
