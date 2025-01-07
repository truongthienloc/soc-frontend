import Block from '..'
import Scene from '../../Scene'
import Port from '../../Port'

type BlockPort =
    | 'input-rs1'
    | 'input-rs2'
    | 'input-w_reg1'
    | 'input-w_reg2'
    | 'input-control'
    | 'output-0'
    | 'output-1'

export default class Forwarding extends Block {
    constructor(
        context: CanvasRenderingContext2D,
        x: number,
        y: number,
        w: number = 4,
        h: number = 2.5,
    ) {
        super(context, x, y, w, h)
        this.enableRenderDefault = false

        this.createPort(-this.calXPosition(-1.5), -1.5, 'output', Scene.BORDER_COLOR, 'input-rs1')
        this.createPort(-this.calXPosition(-0.5), -0.5, 'output', Scene.BORDER_COLOR, 'input-rs2')
        this.createPort(this.calXPosition(-1.5), -1.5, 'output', Scene.BORDER_COLOR, 'input-w_reg1')
        this.createPort(this.calXPosition(-0.5), -0.5, 'output', Scene.BORDER_COLOR, 'input-w_reg2')

        this.createPort(this.calXPosition(0.5), 0.5, 'input', Scene.CONTROL_COLOR, 'input-control')

        this.createPort(-this.calXPosition(0.5), 0.5, 'output', Scene.CONTROL_COLOR, 'output-0')
        this.createPort(-this.calXPosition(1.5), 1.5, 'output', Scene.CONTROL_COLOR, 'output-1')
    }

    public render(dt: number): void {
        this.drawEllipse()
        super.render(dt)

        this.createText('FORWARDING', 0, -0.5, true, 'center', 'middle')
        this.createText('UNIT', 0, 0.5, false, 'center', 'middle', Scene.BORDER_COLOR)
    }

    private calXPosition(y: number): number {
        return this.width * Math.sqrt(1 - y ** 2 / this.height ** 2)
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
        this.context.strokeStyle = Scene.CONTROL_COLOR
        this.context.stroke()
        this.context.closePath()
    }

    public getPort(id: BlockPort): Port {
        return super.getPort(id) as Port
    }
}
