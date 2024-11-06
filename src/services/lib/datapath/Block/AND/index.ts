import Block from '..'
import Scene from '../../Scene'

export default class AND extends Block {
    constructor(context: CanvasRenderingContext2D, x: number, y: number) {
        super(context, x, y, 2.5, 3, 'white', 'aqua')
        this.enableRenderDefault = false
        this.createPort(0, 1, 'input', this.borderColor, 'input-top')
        this.createPort(0, 2, 'input', this.borderColor, 'input-bottom')

        this.createPort(this.width, this.height / 2, 'output', this.borderColor, 'output')
    }

    public render(dt: number): void {
        this.draw()
        super.render(dt)
    }

    private draw() {
        const x = this.x * Scene.CELL
        const y = this.y * Scene.CELL
        const w = this.width * Scene.CELL
        const h = this.height * Scene.CELL

        const l = w - h / 2

        this.context.beginPath()
        this.context.moveTo(x, y)
        this.context.lineTo(x + l, y)
        this.context.arc(x + l, y + h / 2, h / 2, 1.5 * Math.PI, 0.5 * Math.PI)
        this.context.lineTo(x, y + h)
        this.context.closePath()

        this.context.fillStyle = this.color
        this.context.fill()
        this.context.strokeStyle = this.borderColor
        this.context.stroke()
    }
}
