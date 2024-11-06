import Block from '..'
import Scene from '../../Scene'
import Port from '../../Port'

type BlockPort = 'output' | 'input-0' | 'input-1' | 'input-2' | 'input-control'

export default class Detection extends Block {
    constructor(
        context: CanvasRenderingContext2D,
        x: number,
        y: number,
        w: number = 6,
        h: number = 4,
    ) {
        super(context, x, y, w, h)

        // TODO: Create ports
        this.createPort(0, 0.5, 'output', Scene.CONTROL_COLOR, 'output')
        this.createPort(0, 1.5, 'input', Scene.BORDER_COLOR, 'input-0')
        this.createPort(0, 2.5, 'input', Scene.BORDER_COLOR, 'input-1')
        this.createPort(0, 3.5, 'input', Scene.BORDER_COLOR, 'input-2')
        this.createPort(this.width, 1, 'input', Scene.CONTROL_COLOR, 'input-control')
    }

    public render(dt: number): void {
        // TODO: Draw shape
        super.render(dt)

        // TODO: Write text
        this.renderText()
    }

    private renderText(): void {
        const w = this.width
        this.createText('HAZARD', w / 2, 1, false, 'center', 'middle', this.borderColor)
        this.createText('DETECTION', w / 2, 2, false, 'center', 'middle', this.borderColor)
        this.createText('UNIT', w / 2, 3, false, 'center', 'middle', this.borderColor)
    }

    public getPort(id: BlockPort): Port {
        return super.getPort(id) as Port
    }
}
