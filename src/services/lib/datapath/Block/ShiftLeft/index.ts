import Block from '..'
import Scene from '../../Scene'
import Port from '../../Port'

type BlockPort = 'input' | 'output'

export default class ShiftLeft extends Block {
    constructor(
        context: CanvasRenderingContext2D,
        x: number,
        y: number,
        rx: number = 1.5,
        ry: number = 2,
    ) {
        super(context, x, y, rx, ry, 'white')
        this.enableRenderDefault = false
        this.createPort(-this.width, 0, 'input', this.borderColor, 'input')
        this.createPort(this.width, 0, 'output', this.borderColor, 'output')
    }

    public render(dt: number): void {
        this.drawEllipse()
        super.render(dt)

        this.createText('Shift', 0, -0.3, true, 'center', 'middle')
        this.createText('left 1', 0, 0.65, true, 'center', 'middle')
    }

    protected drawEllipse() {
        const x = this.x * Scene.CELL
        const y = this.y * Scene.CELL
        const radiusX = this.width * Scene.CELL
        const radiusY = this.height * Scene.CELL

        this.context.beginPath()
        this.context.ellipse(x, y, radiusX, radiusY, 0, 0, 2 * Math.PI)
        this.context.fillStyle = this.color
        this.context.fill()
        this.context.strokeStyle = this.borderColor
        this.context.stroke()
        this.context.closePath()
    }

    public getPort(id: BlockPort): Port {
        return super.getPort(id) as Port
    }
}

export class ShiftLeft12 extends Block {
    constructor(
        context: CanvasRenderingContext2D,
        x: number,
        y: number,
        rx: number = 1.5,
        ry: number = 2,
    ) {
        super(context, x, y, rx, ry, 'white')
        this.enableRenderDefault = false
        this.createPort(-this.width, 0, 'input', this.borderColor, 'input')
        this.createPort(this.width, 0, 'output', this.borderColor, 'output')
    }

    public render(dt: number): void {
        this.drawEllipse()
        super.render(dt)

        this.createText('Shift', 0, -0.3, true, 'center', 'middle')
        this.createText('left 12', 0, 0.65, true, 'center', 'middle')
    }

    protected drawEllipse() {
        const x = this.x * Scene.CELL
        const y = this.y * Scene.CELL
        const radiusX = this.width * Scene.CELL
        const radiusY = this.height * Scene.CELL

        this.context.beginPath()
        this.context.ellipse(x, y, radiusX, radiusY, 0, 0, 2 * Math.PI)
        this.context.fillStyle = this.color
        this.context.fill()
        this.context.strokeStyle = this.borderColor
        this.context.stroke()
        this.context.closePath()
    }

    public getPort(id: BlockPort): Port {
        return super.getPort(id) as Port
    }
}
