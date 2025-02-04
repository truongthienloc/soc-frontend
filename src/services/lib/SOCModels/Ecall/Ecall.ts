import Keyboard from "../../control/Keyboard"
import LedMatrix from "../../control/LedMatrix"
import Monitor from "../../control/Monitor"

export default class Ecall {
    /** Property */
    private _monitor?: Monitor | undefined
    private _keyboard?: Keyboard | undefined
    private _ledMatrix?: LedMatrix | undefined

    /** Getter and Setter */
    public get monitor(): Monitor | undefined {
        return this._monitor
    }
    public set monitor(value: Monitor | undefined) {
        this._monitor = value
    }
    public get keyboard(): Keyboard | undefined {
        return this._keyboard
    }
    public set keyboard(value: Keyboard | undefined) {
        this._keyboard = value
    }
    public get ledMatrix(): LedMatrix | undefined {
        return this._ledMatrix
    }
    public set ledMatrix(value: LedMatrix | undefined) {
        this._ledMatrix = value
    }

    constructor() {

    }

    public async execute(type: number, registers: Record<string, string>) {
        if (type === 1) {
            return this.monitor?.println(registers['a0'])
        }
        if (type === 5) {
            return new Promise((resolve) => {
                this.keyboard?.getEvent().on(Keyboard.EVENT.LINE_DOWN, (line: string) => {
                    resolve(parseInt(line))
                })
            })
        }
    }
}