import { useState } from 'react'
import { IMEMPOINT, LMPOINT } from '~/configs/memoryPoint.constant'

export type ReturnUseDMAConfig = ReturnType<typeof useDMAConfig>

export default function useDMAConfig() {
    const [src, setSrc] = useState(LMPOINT)
    const [des, setDes] = useState(IMEMPOINT)
    const [len, setLen] = useState('0')

    return {
        src,
        setSrc,
        des,
        setDes,
        len,
        setLen,
    }
}
