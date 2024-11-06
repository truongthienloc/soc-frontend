import Block from '..'
import Scene from '../../Scene'
import Port from '../../Port'
import { Vector } from '../../Helpers'

type BlockPort = 'input-0' | 'input-1' | 'input-control' | 'output'

export default class Mux extends Block {
    private portBottom: boolean
    private flipPort: boolean
    private rightHeight: number = 3
    constructor(
        context: CanvasRenderingContext2D,
        x: number,
        y: number,
        portBottom: boolean = false,
        flipPort: boolean = false,
        w: number = 2,
        h: number = 5,
    ) {
        super(context, x, y, w, h, 'white')
        this.enableRenderDefault = false
        this.portBottom = portBottom
        this.flipPort = flipPort

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

        if (this.checkType()) {
            this.createPort(0, 1, 'input', this.borderColor, 'input-0')
            this.createPort(0, this.height - 1, 'input', this.borderColor, 'input-1')
        } else {
            this.createPort(0, 1, 'input', this.borderColor, 'input-1')
            this.createPort(0, this.height - 1, 'input', this.borderColor, 'input-0')
        }

        this.createPort(this.width, this.height / 2, 'output', this.borderColor, 'output')
    }

    private checkType(): boolean {
        return (this.portBottom && !this.flipPort) || (!this.portBottom && this.flipPort)
    }

    public render(dt: number): void {
        this.draw()
        super.render(dt)

        this.createText(this.checkType() ? '0' : '1', 0.2, 1, false, 'left', 'middle')
        this.createText('M', this.width - 0.55, 1.25, true, 'center', 'top')
        this.createText('u', this.width - 0.55, 2, true, 'center', 'top')
        this.createText('x', this.width - 0.55, 2.75, true, 'center', 'top')
        this.createText(this.checkType() ? '1' : '0', 0.2, this.height - 1, false, 'left', 'middle')
    }

    private draw() {
        const x = this.x * Scene.CELL
        const y = this.y * Scene.CELL
        const w = this.width * Scene.CELL
        const h = this.height * Scene.CELL
        const rh = this.rightHeight * Scene.CELL
        const trh = (h - rh) / 2

        // this.context.beginPath();
        // this.context.arc(x + w / 2, y, w / 2, 1 * Math.PI, 0 * Math.PI);
        // this.context.lineTo(x + w, y + h);
        // this.context.arc(x + w / 2, y + h, w / 2, 0 * Math.PI, 1 * Math.PI);
        // this.context.lineTo(x, y);
        // this.context.closePath();

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
