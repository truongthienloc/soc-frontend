import Block from '..'
import Port from '../../Port'
import { InputData } from '../../types'

export default class Constant extends Block {
    private value: number

    constructor(context: CanvasRenderingContext2D, x: number, y: number, value: number) {
        super(context, x, y, 0, 0, 'white')
        this.value = value
        this.createPort(0, 0, 'output', 'black', 'output')
    }

    public render(dt: number): void {
        super.render(dt)
        this.createText(`${this.value}`, 0, -0.2, true, 'center', 'bottom')
    }

    public getPort(id: 'output'): Port {
        return super.getPort(id) as Port
    }
}
