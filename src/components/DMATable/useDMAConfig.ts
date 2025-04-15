import { useState } from 'react'
import { DATA_POINT, INSTRUCTION_POINT } from '~/configs/memoryPoint.constant'

export type ReturnUseDMAConfig = ReturnType<typeof useDMAConfig>

export default function useDMAConfig() {
    const [src, setSrc] = useState('0')
    const [des, setDes] = useState('0')
    const [len, setLen] = useState('0')
    const [control, setCtrl] = useState('0')
    const [status, setSta] = useState('0')
    const [led_control, setLedCtrl] = useState('0')

    return {
        src,
        setSrc,
        des,
        setDes,
        len,
        setLen,
        control,
        setCtrl,
        status, 
        setSta,
        led_control,
        setLedCtrl,
    }
}
