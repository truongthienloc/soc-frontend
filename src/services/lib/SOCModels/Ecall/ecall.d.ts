import { Monitor, Keyboard } from './../soc.d';
import LedMatrix from "../../control/LedMatrix"

export interface IEcall {
    monitor?: Monitor
    keyboard?: Keyboard
    ledMatrix?: LedMatrix

    execute(type: number, registers: Record<string, string>): Promise<void>
}