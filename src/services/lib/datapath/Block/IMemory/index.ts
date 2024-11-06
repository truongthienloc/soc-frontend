import Block from '..'
import Port from '../../Port'

type blockPort = 'input-ReadAddress' | 'output-Instruction'

export default class IMemory extends Block {
    constructor(context: CanvasRenderingContext2D, x: number, y: number) {
        super(context, x, y, 6, 8, 'white')

        this.createPort(0, 1, 'input', this.borderColor, 'input-ReadAddress')

        this.createPort(this.width, 4, 'output', this.borderColor, 'output-Instruction')
    }

    public render(dt: number): void {
        super.render(dt)

        this.renderText()
    }

    private renderText(): void {
        this.createText('Read', 0, 0)
        this.createText('address', 0, 1)

        this.createText('Instruction', this.width, 3, false, 'right')
        this.createText('[31-0]', this.width, 4, false, 'right')

        this.createText('Instruction', this.width / 2, 6, true, 'center', 'top')
        this.createText('memory', this.width / 2, 7, true, 'center', 'top')
    }

    public getPort(id: blockPort): Port {
        return super.getPort(id) as Port
    }
}
