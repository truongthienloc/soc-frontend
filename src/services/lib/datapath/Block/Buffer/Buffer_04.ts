import Buffer from './Buffer'
import Scene from '../../Scene'

export default class Buffer_02 extends Buffer {
    constructor(context: CanvasRenderingContext2D, x: number, y: number, name: string) {
        super(context, x, y, name)

        const section_0 = this.createSection(6)
        const section_1 = this.createSection(49)
        section_0.createPort(0, section_0.height / 2, 'input', Scene.CONTROL_COLOR, 'input-WB')
        section_0.createPort(
            section_0.width,
            section_0.height / 2 - 2,
            'output',
            Scene.CONTROL_COLOR,
            'output-RegWrite',
        )
        section_0.createPort(
            section_0.width,
            section_0.height / 2 - 1,
            'output',
            Scene.CONTROL_COLOR,
            'output-Wb',
        )
        section_0.createPort(
            section_0.width,
            section_0.height / 2,
            'output',
            Scene.CONTROL_COLOR,
            'output-Slt',
        )
        section_0.createPort(
            section_0.width,
            section_0.height / 2 + 1,
            'output',
            Scene.CONTROL_COLOR,
            'output-Jump',
        )
        section_0.createPort(
            section_0.width,
            section_0.height / 2 + 2,
            'output',
            Scene.CONTROL_COLOR,
            'output-MemtoReg',
        )
        section_0.addText(
            'WB',
            section_0.width / 2,
            section_0.height / 2,
            false,
            'center',
            'middle',
            Scene.BUFFER_COLOR,
        )

        section_1.createPort(0, 16, 'input', Scene.BORDER_COLOR, 'input-PC4')
        section_1.createPort(section_1.width, 16, 'output', Scene.BORDER_COLOR, 'output-PC4')
        section_1.addText(
            'PC + 4',
            section_1.width / 2,
            16,
            false,
            'center',
            'middle',
            Scene.BUFFER_COLOR,
        )
        section_1.createPort(0, 22, 'input', Scene.BORDER_COLOR, 'input-AuiOrLui')
        section_1.createPort(section_1.width, 22, 'output', Scene.BORDER_COLOR, 'output-AuiOrLui')
        section_1.addText(
            'AuiOrLui',
            section_1.width / 2,
            22,
            false,
            'center',
            'middle',
            Scene.BUFFER_COLOR,
        )
        section_1.createPort(0, 28, 'input', Scene.BORDER_COLOR, 'input-Slt')
        section_1.createPort(section_1.width, 28, 'output', Scene.BORDER_COLOR, 'output-Slt')
        section_1.addText(
            'Slt',
            section_1.width / 2,
            28,
            false,
            'center',
            'middle',
            Scene.BUFFER_COLOR,
        )
        section_1.createPort(0, 33.5, 'input', Scene.BORDER_COLOR, 'input-Data')
        section_1.createPort(section_1.width, 33.5, 'output', Scene.BORDER_COLOR, 'output-Data')
        section_1.addText(
            'Data',
            section_1.width / 2,
            33.5,
            false,
            'center',
            'middle',
            Scene.BUFFER_COLOR,
        )
        section_1.createPort(0, 41.5, 'input', Scene.BORDER_COLOR, 'input-ALUResult')
        section_1.createPort(
            section_1.width,
            41.5,
            'output',
            Scene.BORDER_COLOR,
            'output-ALUResult',
        )
        section_1.addText(
            'ALU',
            section_1.width / 2,
            40.5,
            false,
            'center',
            'middle',
            Scene.BUFFER_COLOR,
        )
        section_1.addText(
            'result',
            section_1.width / 2,
            41.5,
            false,
            'center',
            'middle',
            Scene.BUFFER_COLOR,
        )

        section_1.createPort(0, 46.5, 'input', Scene.BORDER_COLOR, 'input-W_reg')
        section_1.createPort(section_1.width, 46.5, 'output', Scene.BORDER_COLOR, 'output-W_reg')
        section_1.addText(
            'w_reg',
            section_1.width / 2,
            46.5,
            false,
            'center',
            'middle',
            Scene.BUFFER_COLOR,
        )
    }
}
