import Block from '..'
import Scene from '../../Scene'
import Port from '../../Port'

type BlockPort = 'input-ALUOp' | 'input-Instruction' | 'output'

export default class ALUControl extends Block {
    constructor(
        context: CanvasRenderingContext2D,
        x: number,
        y: number,
        rx: number = 2,
        ry: number = 3,
    ) {
        super(context, x, y, rx, ry, 'white', 'aqua')
        this.enableRenderDefault = false
        // this.createPort(0, -this.height, 'input', this.borderColor, 'input-control');
        this.createPort(-this.calXPosition(-1), -1, 'input', this.borderColor, 'input-ALUOp')
        this.createPort(-this.calXPosition(1), 1, 'input', 'black', 'input-Instruction')
        this.createPort(2, 0, 'output', this.borderColor, 'output')
    }

    public render(dt: number): void {
        this.drawEllipse()
        super.render(dt)

        this.createText('ALU', 0, -0.3, true, 'center', 'middle')
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

    public getPort(id: BlockPort): Port {
        return super.getPort(id) as Port
    }

    private calXPosition(y: number): number {
        return this.width * Math.sqrt(1 - y ** 2 / this.height ** 2)
    }
}
