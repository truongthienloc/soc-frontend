import Scene from '../../Scene'
import Block from '..'
import Port from '../../Port'

type BlockPort =
    | 'input-Instruction'
    | 'input-Wb'
    | 'input-Jump'
    | 'input-Slt'
    | 'input-MemToReg'
    | 'input-Jal'
    | 'input-Branch'
    | 'input-Jalr'
    | 'input-Bot-0'
    | 'input-Bot-1'
    | 'input-Bot-2'
    | 'input-Bot-3'
    | 'input-Bot-4'
    | 'input-Bot-5'
    | 'input-Bot-6'
    | 'input-Bot-7'
    | 'input-Bot-8'
    | 'output-PcSrc2'
    | 'output-PcSrc1'

export default class BranchUnit extends Block {
    constructor(
        context: CanvasRenderingContext2D,
        x: number,
        y: number,
        w: number = 8,
        h: number = 4,
    ) {
        super(context, x, y, w, h)

        this.createPort(0, 1, 'input', Scene.BORDER_COLOR, 'input-Instruction')

        this.createPort(1, 0, 'input', Scene.CONTROL_COLOR, 'input-Wb')
        this.createPort(2, 0, 'input', Scene.CONTROL_COLOR, 'input-Jump')
        this.createPort(3, 0, 'input', Scene.CONTROL_COLOR, 'input-Slt')
        this.createPort(4, 0, 'input', Scene.CONTROL_COLOR, 'input-MemToReg')
        this.createPort(5, 0, 'input', Scene.CONTROL_COLOR, 'input-Jal')
        this.createPort(6, 0, 'input', Scene.CONTROL_COLOR, 'input-Branch')
        this.createPort(7, 0, 'input', Scene.CONTROL_COLOR, 'input-Jalr')

        this.createPort(0, this.height, 'input', Scene.BORDER_COLOR, 'input-Bot-0')
        this.createPort(1, this.height, 'input', Scene.BORDER_COLOR, 'input-Bot-1')
        this.createPort(2, this.height, 'input', Scene.BORDER_COLOR, 'input-Bot-2')
        this.createPort(3, this.height, 'input', Scene.BORDER_COLOR, 'input-Bot-3')
        this.createPort(4, this.height, 'input', Scene.BORDER_COLOR, 'input-Bot-4')
        this.createPort(5, this.height, 'input', Scene.BORDER_COLOR, 'input-Bot-5')
        this.createPort(6, this.height, 'input', Scene.BORDER_COLOR, 'input-Bot-6')
        this.createPort(7, this.height, 'input', Scene.BORDER_COLOR, 'input-Bot-7')
        this.createPort(8, this.height, 'input', Scene.BORDER_COLOR, 'input-Bot-8')

        this.createPort(this.width, 1, 'output', Scene.CONTROL_COLOR, 'output-PcSrc2')
        this.createPort(this.width, 2, 'output', Scene.CONTROL_COLOR, 'output-PcSrc1')
    }

    public render(dt: number): void {
        super.render(dt)
        this.createText('BRANCH', this.width / 2, this.height / 2 - 0.5, false, 'center', 'middle')
        this.createText('UNIT', this.width / 2, this.height / 2 + 0.5, false, 'center', 'middle')
    }

    public getPort(id: BlockPort): Port {
        return super.getPort(id) as Port
    }
}
