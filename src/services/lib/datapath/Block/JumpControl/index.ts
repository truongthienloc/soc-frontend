import Block from '..'
import Scene from '../../Scene'

export default class JumpControl extends Block {
    constructor(
        context: CanvasRenderingContext2D,
        x: number,
        y: number,
        rx: number = 1.5,
        ry: number = 2.5,
    ) {
        super(context, x, y, rx, ry, 'white', 'aqua')
        this.enableRenderDefault = false
        this.createPort(-1.4, -1, 'input', this.borderColor, 'input-jump')
        this.createPort(-this.width, 0, 'input', this.borderColor, 'input-branchNotZero')
        this.createPort(-1.4, 1, 'input', this.borderColor, 'input-branchZero')
        this.createPort(1.5, 0, 'output', this.borderColor, 'output')
    }

    public render(dt: number): void {
        this.drawEllipse()
        super.render(dt)

        this.createText('Jump', 0, -0.3, true, 'center', 'middle')
        this.createText('control', 0, 0.65, true, 'center', 'middle')
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
}
