import Keyboard from "../../control/Keyboard"
import LedMatrix from "../../control/LedMatrix"
import Monitor from "../../control/Monitor"
import { CALL_NUMBER } from "./callNumber.constant"

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

    public async execute(registers: Record<string, string>) {
        /** Get type (call number) .
         * type = register a7
        */
        const type = parseInt(registers['a7'], 2)

        if (type === CALL_NUMBER.PRINT_INT) {
            const value = parseInt(registers['a0'], 2)
            return this.monitor?.println(value.toString())
        }
        if (type === CALL_NUMBER.PRINT_STRING) {
            const address = registers['a0']
            // TODO: GET string from address
            // TODO: Print string to monitor
        }
        if (type === CALL_NUMBER.READ_INT) {
            return new Promise((resolve) => {
                this.keyboard?.getEvent().on(Keyboard.EVENT.LINE_DOWN, (line: string) => {
                    resolve(parseInt(line))
                    // TODO: Store number to register
                })
            })
        }
        if (type === CALL_NUMBER.READ_STRING) {
            // TODO: GET address
            // TODO: GET limit
            // TODO: GET string
            // TODO: Store string to memory
        }
    }
}