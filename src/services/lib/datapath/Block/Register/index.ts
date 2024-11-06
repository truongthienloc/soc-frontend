import Block from '..'
import Port from '../../Port'
import { InputData } from '../../types'

type BlockPort =
    | 'input-ReadReg-1'
    | 'input-ReadReg-2'
    | 'input-WriteReg'
    | 'input-WriteData'
    | 'output-ReadData-1'
    | 'output-ReadData-2'
    | 'input-control-Write'

export default class Register extends Block {
    private finishSignalCallbacks: Function[] = []

    constructor(context: CanvasRenderingContext2D, x: number, y: number) {
        super(context, x, y, 8, 11, 'white')

        this.createPort(0, 1, 'input', this.borderColor, 'input-ReadReg-1')
        this.createPort(0, 4, 'input', this.borderColor, 'input-ReadReg-2')
        this.createPort(0, 7, 'input', this.borderColor, 'input-WriteReg')
        this.createPort(0, 10, 'input', this.borderColor, 'input-WriteData')

        this.createPort(this.width, 2, 'output', this.borderColor, 'output-ReadData-1')
        this.createPort(this.width, 5.5, 'output', this.borderColor, 'output-ReadData-2')

        this.createPort(this.width / 2, 0, 'input', 'aqua', 'input-control-Write')
    }

    public render(dt: number): void {
        super.render(dt)

        this.renderText()
    }

    private renderText(): void {
        this.createText('Read', 0, 0)
        this.createText('register 1', 0, 1)

        this.createText('Read', 0, 3)
        this.createText('register 2', 0, 4)

        this.createText('Write', 0, 6)
        this.createText('register', 0, 7)

        this.createText('Write', 0, 9)
        this.createText('data', 0, 10)

        this.createText('Read', this.width, 1, false, 'right')
        this.createText('data 1', this.width, 2, false, 'right')

        this.createText('Read', this.width, 4.5, false, 'right')
        this.createText('data 2', this.width, 5.5, false, 'right')

        this.createText('Registers', this.width, 10, true, 'right')
    }

    public getPort(id: BlockPort): Port {
        return super.getPort(id) as Port
    }

    public connectFinishSignal(callback: () => void): void {
        this.finishSignalCallbacks.push(callback)
    }

    public load(data: InputData): void {
        const portName = data.srcId

        if (this.inputs.has(portName)) {
            return
        }

        this.inputs.set(portName, data)

        if (this.inputs.size === 4) {
            const outputs = this.outputs.entries()
            for (const [, output] of outputs) {
                output.load(data)
            }
        } else if (this.inputs.size === 5) {
            // Finish
            this.inputs.clear()
            this.finishSignalCallbacks.forEach((callback) => callback())
        }
    }

    public destroy(): void {
        super.destroy()
        this.finishSignalCallbacks = []
    }
}
