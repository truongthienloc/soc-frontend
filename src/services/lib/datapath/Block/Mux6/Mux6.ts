import Block from '..'
import Scene from '../../Scene'
import Port from '../../Port'
import { Vector } from '../../Helpers'

type BlockPort =
    | 'input-0'
    | 'input-1'
    | 'input-2'
    | 'input-3'
    | 'input-4'
    | 'input-5'
    | 'input-control'
    | 'output'

export default class Mux6 extends Block {
    private rightHeight: number = 3
    constructor(
        context: CanvasRenderingContext2D,
        x: number,
        y: number,
        portBottom: boolean = true,
        w: number = 2,
        h: number = 5,
    ) {
        super(context, x, y, w, h, 'white')
        this.enableRenderDefault = false

        if (portBottom) {
            const e = (this.height - this.rightHeight) / 2
            const vt = Vector.fromPoints(
                { x: 0, y: this.height },
                { x: this.width, y: e + this.rightHeight },
            )
            const vtg = new Vector(0, this.height)

            const lengthVT = vt.length
            const vtn = vt.normalize()
            const point = vtn.multiply(lengthVT / 2).add(vtg)

            this.createPort(point.x, point.y, 'input', 'aqua', 'input-control')
        } else {
            const e = (this.height - this.rightHeight) / 2
            const vt = Vector.fromPoints({ x: 0, y: 0 }, { x: this.width, y: e })
            const vtg = new Vector(0, 0)

            const lengthVT = vt.length
            const vtn = vt.normalize()
            const point = vtn.multiply(lengthVT / 2).add(vtg)

            this.createPort(point.x, point.y, 'input', 'aqua', 'input-control')
        }

        this.createPort(0, 0, 'input', this.borderColor, 'input-0')
        this.createPort(0, 1, 'input', this.borderColor, 'input-1')
        this.createPort(0, 2, 'input', this.borderColor, 'input-2')
        this.createPort(0, 3, 'input', this.borderColor, 'input-3')
        this.createPort(0, 4, 'input', this.borderColor, 'input-4')
        this.createPort(0, 5, 'input', this.borderColor, 'input-5')

        this.createPort(this.width, this.height / 2, 'output', this.borderColor, 'output')
    }

    public render(dt: number): void {
        this.draw()
        super.render(dt)

        this.createText('M', this.width / 2, 1.25, true, 'center', 'top')
        this.createText('u', this.width / 2, 2, true, 'center', 'top')
        this.createText('x', this.width / 2, 2.75, true, 'center', 'top')
    }

    private draw() {
        const x = this.x * Scene.CELL
        const y = this.y * Scene.CELL
        const w = this.width * Scene.CELL
        const h = this.height * Scene.CELL
        const rh = this.rightHeight * Scene.CELL
        const trh = (h - rh) / 2

        this.context.beginPath()
        this.context.moveTo(x, y)
        this.context.lineTo(x + w, y + trh)
        this.context.lineTo(x + w, y + trh + rh)
        this.context.lineTo(x, y + h)
        this.context.closePath()

        this.context.fillStyle = this.color
        this.context.fill()
        this.context.strokeStyle = this.borderColor
        this.context.stroke()
    }

    public getPort(id: BlockPort): Port {
        return super.getPort(id) as Port
    }
}
