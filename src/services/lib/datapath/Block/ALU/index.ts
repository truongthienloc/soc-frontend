import Block from '..'
import Scene from '../../Scene'
import { Vector } from '../../Helpers'
import Port from '../../Port'

type BlockPort =
    | 'input-Top'
    | 'input-Bottom'
    | 'output-Zero'
    | 'output-SignBit'
    | 'output-Result'
    | 'input-Control'

export default class ALU extends Block {
    private paddingLeft: number
    private lineRight: number
    private lineLeft: number

    constructor(context: CanvasRenderingContext2D, x: number, y: number) {
        super(context, x, y, 6, 7, 'white')
        this.enableRenderDefault = false
        this.paddingLeft = 0.9
        this.lineRight = 3
        this.lineLeft = 2

        const e = (this.height - this.lineRight) / 2
        const vt = Vector.fromPoints(
            { x: 0, y: this.height },
            { x: this.width, y: e + this.lineRight },
        )
        const vtg = new Vector(0, this.height)

        const lengthVT = vt.length
        const vtn = vt.normalize()
        const point = vtn.multiply(lengthVT / 2).add(vtg)

        this.createPort(0, 1, 'input', this.borderColor, 'input-Top')
        this.createPort(0, this.height - 1, 'input', this.borderColor, 'input-Bottom')

        this.createPort(this.width, e + 0, 'output', 'aqua', 'output-Zero')
        this.createPort(this.width, e + 1, 'output', 'aqua', 'output-SignBit')
        this.createPort(
            this.width,
            e + this.lineRight - 1,
            'output',
            this.borderColor,
            'output-Result',
        )
        this.createPort(point.x, point.y, 'input', 'aqua', 'input-Control')
    }

    public render(dt: number): void {
        this.draw()
        super.render(dt)

        const lr = this.lineRight

        this.createText('ALU', 1, this.height / 2, true, 'left', 'middle')
        this.createText(
            'Zero',
            this.width,
            (this.height - lr) / 2 + 0.2,
            false,
            'right',
            'middle',
            'aqua',
        )
        this.createText(
            'Sign-bit',
            this.width - 0.1,
            (this.height - lr) / 2 + 1.2,
            false,
            'right',
            'middle',
            'aqua',
        )
        this.createText('ALU', this.width, (this.height - lr) / 2 + 1.4, false, 'right')
        this.createText('Result', this.width, (this.height - lr) / 2 + 2.2, false, 'right')
    }

    private draw() {
        const x = this.x * Scene.CELL
        const y = this.y * Scene.CELL
        const w = this.width * Scene.CELL
        const h = this.height * Scene.CELL
        const pl = this.paddingLeft * Scene.CELL

        const lr = this.lineRight * Scene.CELL
        const ll = this.lineLeft * Scene.CELL

        this.context.beginPath()
        this.context.moveTo(x, y)
        this.context.lineTo(x + w, y + (h - lr) / 2)
        this.context.lineTo(x + w, y + (h - lr) / 2 + lr)
        this.context.lineTo(x, y + h)
        this.context.lineTo(x, y + h / 2 + ll / 2)
        this.context.lineTo(x + pl, y + h / 2)
        this.context.lineTo(x, y + h / 2 - ll / 2)
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
