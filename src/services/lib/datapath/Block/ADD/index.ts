import Block from '..'
import Scene from '../../Scene'
import Port from '../../Port'

type BlockPort = 'input-Top' | 'input-Bottom' | 'output'

export default class ADD extends Block {
    private paddingLeft: number
    private lineRight: number
    private lineLeft: number
    private type: 'sm' | 'lg'

    constructor(context: CanvasRenderingContext2D, x: number, y: number, type?: 'sm' | 'lg') {
        const w = type === 'lg' ? 5 : 3

        super(context, x, y, w, 7, 'white')
        this.type = type ?? 'sm'
        this.enableRenderDefault = false
        this.paddingLeft = 0.9
        this.lineRight = 3
        this.lineLeft = 2

        this.createPort(0, 1, 'input', this.borderColor, 'input-Top')
        this.createPort(0, this.height - 1, 'input', this.borderColor, 'input-Bottom')

        this.createPort(this.width, this.height / 2, 'output', this.borderColor, 'output')
    }

    public render(dt: number): void {
        this.draw()
        super.render(dt)

        this.createText('Add', 1, this.height / 2, true, 'left', 'middle')

        if (this.type === 'lg') {
            this.createText('Sum', this.width, this.height / 2, false, 'right', 'middle')
        }
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
