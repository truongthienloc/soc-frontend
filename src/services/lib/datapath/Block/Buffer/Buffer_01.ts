import Buffer from './Buffer'
import Scene from '../../Scene'
// import Port from "../../Port";

// type BlockPort = 'input-Add' | 'input-PC'

export default class Buffer_01 extends Buffer {
    constructor(context: CanvasRenderingContext2D, x: number, y: number, name: string) {
        super(context, x, y, name)
        const section = this.createSection(55)

        section.createPort(0, 22, 'input', Scene.BORDER_COLOR, 'input-Add')
        section.createPort(0, 33.5, 'input', Scene.BORDER_COLOR, 'input-PC')
        section.createPort(0, 39, 'input', Scene.BORDER_COLOR, 'input-Instruction')

        section.addText('PC + 4', this.width / 2, 22, false, 'center', 'middle', Scene.BUFFER_COLOR)
        section.addText('PC', this.width / 2, 33.5, false, 'center', 'middle', Scene.BUFFER_COLOR)
        section.addText(
            'Instruction',
            this.width / 2,
            39,
            false,
            'center',
            'middle',
            Scene.BUFFER_COLOR,
        )

        section.createPort(this.width, 22, 'output', Scene.BORDER_COLOR, 'output-Add')
        section.createPort(this.width, 33.5, 'output', Scene.BORDER_COLOR, 'output-PC')
        section.createPort(this.width, 39, 'output', Scene.BORDER_COLOR, 'output-Instruction')
    }

    // public getPort(id: BlockPort): Port {
    //     return super.getPort(id) as Port
    // }
}
