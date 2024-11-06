import Block from '..'
import Scene from '../../Scene'

export default class Mux3 extends Block {
    constructor(
        context: CanvasRenderingContext2D,
        x: number,
        y: number,
        portBottom: boolean = false,
        w: number = 1.2,
        h: number = 5,
    ) {
        super(context, x, y, w, h, 'white')
        this.enableRenderDefault = false
        this.createPort(0, 0, 'input', this.borderColor, 'input-2')
        this.createPort(0, this.height / 2, 'input', this.borderColor, 'input-1')
        this.createPort(0, this.height, 'input', this.borderColor, 'input-0')

        if (portBottom) {
            this.createPort(
                this.width / 2,
                this.height + this.width / 2,
                'input',
                'aqua',
                'input-control',
            )
        } else {
            this.createPort(this.width / 2, -this.width / 2, 'input', 'aqua', 'input-control')
        }

        this.createPort(this.width, this.height / 2, 'output', this.borderColor, 'output')
    }

    public render(dt: number): void {
        this.draw()
        super.render(dt)

        this.createText('2', 0.1, -0.45)
        this.createText('1', 0.1, this.height / 2, false, 'left', 'middle')
        this.createText('M', this.width, this.height / 2 + 0.3, true, 'right', 'top')
        this.createText('u', this.width, this.height / 2 + 1.0, true, 'right', 'top')
        this.createText('x', this.width, this.height / 2 + 1.6, true, 'right', 'top')
        this.createText('0', 0.1, this.height, false, 'left', 'middle')
    }

    private draw() {
        const x = this.x * Scene.CELL
        const y = this.y * Scene.CELL
        const w = this.width * Scene.CELL
        const h = this.height * Scene.CELL

        this.context.beginPath()
        this.context.arc(x + w / 2, y, w / 2, 1 * Math.PI, 0 * Math.PI)
        this.context.lineTo(x + w, y + h)
        this.context.arc(x + w / 2, y + h, w / 2, 0 * Math.PI, 1 * Math.PI)
        this.context.lineTo(x, y)
        this.context.closePath()

        this.context.fillStyle = this.color
        this.context.fill()
        this.context.strokeStyle = this.borderColor
        this.context.stroke()
    }
}
