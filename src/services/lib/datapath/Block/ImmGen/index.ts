import Block from '..'
import Port from '../../Port'
import Scene from '../../Scene'

type BlockPort = 'input' | 'output'

export default class ImmGen extends Block {
    constructor(
        context: CanvasRenderingContext2D,
        x: number,
        y: number,
        rx: number = 2,
        ry: number = 3,
    ) {
        super(context, x, y, rx, ry, 'white')
        this.enableRenderDefault = false
        this.createPort(-2, 0, 'input', this.borderColor, 'input')
        this.createPort(2, 0, 'output', this.borderColor, 'output')
    }

    public render(dt: number): void {
        this.drawEllipse()
        super.render(dt)

        this.createText('Imm', 0, -0.3, true, 'center', 'middle')
        this.createText('Gen', 0, 0.65, true, 'center', 'middle')
    }

    private drawEllipse() {
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
