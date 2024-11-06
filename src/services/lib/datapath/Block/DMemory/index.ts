import Block from '..'
import Port from '../../Port'

type BlockPort =
    | 'input-Address'
    | 'input-WriteData'
    | 'output-ReadData'
    | 'input-ControlSizeData'
    | 'input-ControlMemWrite'
    | 'input-ControlMemRead'

export default class DMemory extends Block {
    constructor(context: CanvasRenderingContext2D, x: number, y: number) {
        super(context, x, y, 6, 8, 'white')

        this.createPort(0, 2, 'input', this.borderColor, 'input-Address')
        this.createPort(0, 6.5, 'input', this.borderColor, 'input-WriteData')

        this.createPort(this.width, 2, 'output', this.borderColor, 'output-ReadData')

        // this.createPort(this.width / 2 - 1, 0, 'input', 'aqua', 'input-ControlSizeData');
        this.createPort(this.width / 2 + 1, 0, 'input', 'aqua', 'input-ControlMemWrite')
        this.createPort(this.width / 2 + 1, this.height, 'input', 'aqua', 'input-ControlMemRead')
    }

    public render(dt: number): void {
        super.render(dt)

        this.renderText()
    }

    private renderText(): void {
        this.createText('Address', 0, 1.5)

        this.createText('Read', this.width, 1, false, 'right')
        this.createText('data', this.width, 2, false, 'right')

        this.createText('Write', 0, 5.5)
        this.createText('data', 0, 6.5)

        this.createText('Data', this.width, 5, true, 'right', 'top')
        this.createText('memory', this.width, 6, true, 'right', 'top')
    }

    public getPort(id: BlockPort): Port {
        return super.getPort(id) as Port
    }
}
