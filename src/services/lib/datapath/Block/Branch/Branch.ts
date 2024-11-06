import Block from '..'
import Scene from '../../Scene'
import Port from '../../Port'

type BlockPort =
    | 'input-Jal'
    | 'input-Jalr'
    | 'input-Branch'
    | 'input-Zero'
    | 'input-Sign-bit'
    | 'output-PcSrc1'
    | 'output-PcSrc2'
    | 'output-Jump'

export default class Branch extends Block {
    constructor(
        context: CanvasRenderingContext2D,
        x: number,
        y: number,
        rx: number = 2,
        ry: number = 2.5,
    ) {
        super(context, x, y, rx, ry, 'white', 'aqua')
        this.enableRenderDefault = false
        this.createPort(-this.width + 0.2, -1, 'input', this.borderColor, 'input-Jal')

        this.createPort(-this.width, 0, 'input', this.borderColor, 'input-Jalr')
        this.createPort(-this.width + 0.2, 1, 'input', this.borderColor, 'input-Branch')

        this.createPort(-0.5, this.height - 0.1, 'input', this.borderColor, 'input-Zero')
        this.createPort(0.5, this.height - 0.1, 'input', this.borderColor, 'input-Sign-bit')

        this.createPort(this.width - 0.2, -1, 'output', this.borderColor, 'output-PcSrc1')
        this.createPort(this.width, 0, 'output', this.borderColor, 'output-PcSrc2')
        this.createPort(this.width - 0.2, 1, 'output', this.borderColor, 'output-Jump')
    }

    public render(dt: number): void {
        this.drawEllipse()
        super.render(dt)

        this.createText('Branch', 0, 0, true, 'center', 'middle')
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
