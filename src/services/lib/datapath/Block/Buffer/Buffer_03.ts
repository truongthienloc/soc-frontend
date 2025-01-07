import Buffer from './Buffer'
import Scene from '../../Scene'

export default class Buffer_02 extends Buffer {
    constructor(context: CanvasRenderingContext2D, x: number, y: number, name: string) {
        super(context, x, y, name)

        const section_0 = this.createSection(6)
        const section_1 = this.createSection(6)
        const section_2 = this.createSection(43)
        section_0.createPort(0, section_0.height / 2, 'input', Scene.CONTROL_COLOR, 'input-WB')
        section_0.createPort(
            section_0.width,
            section_0.height / 2,
            'output',
            Scene.CONTROL_COLOR,
            'output-WB',
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
        section_1.createPort(0, section_1.height / 2, 'input', Scene.CONTROL_COLOR, 'input-MEM')
        section_1.createPort(
            section_1.width,
            section_1.height / 2 - 1.5,
            'output',
            Scene.CONTROL_COLOR,
            'output-MemWrite',
        )
        section_1.createPort(
            section_1.width,
            section_1.height / 2,
            'output',
            Scene.CONTROL_COLOR,
            'output-Unsigned',
        )
        section_1.createPort(
            section_1.width,
            section_1.height / 2 + 1.5,
            'output',
            Scene.CONTROL_COLOR,
            'output-MemRead',
        )
        section_1.addText(
            'MEM',
            section_1.width / 2,
            section_1.height / 2,
            false,
            'center',
            'middle',
            Scene.BUFFER_COLOR,
        )

        section_2.createPort(0, 10, 'input', Scene.BORDER_COLOR, 'input-PC4')
        section_2.createPort(section_2.width, 10, 'output', Scene.BORDER_COLOR, 'output-PC4')
        section_2.addText(
            'PC + 4',
            section_2.width / 2,
            10,
            false,
            'center',
            'middle',
            Scene.BUFFER_COLOR,
        )
        section_2.createPort(0, 16, 'input', Scene.BORDER_COLOR, 'input-AuiOrLui')
        section_2.createPort(section_2.width, 16, 'output', Scene.BORDER_COLOR, 'output-AuiOrLui')
        section_2.addText(
            'AuiOrLui',
            section_2.width / 2,
            16,
            false,
            'center',
            'middle',
            Scene.BUFFER_COLOR,
        )
        section_2.createPort(0, 22, 'input', Scene.BORDER_COLOR, 'input-Slt')
        section_2.createPort(section_2.width, 22, 'output', Scene.BORDER_COLOR, 'output-Slt')
        section_2.addText(
            'Slt',
            section_2.width / 2,
            22,
            false,
            'center',
            'middle',
            Scene.BUFFER_COLOR,
        )
        section_2.createPort(0, 27.5, 'input', Scene.BORDER_COLOR, 'input-ALUResult')
        section_2.createPort(
            section_2.width,
            27.5,
            'output',
            Scene.BORDER_COLOR,
            'output-ALUResult',
        )
        section_2.addText(
            'ALU',
            section_2.width / 2,
            26.5,
            false,
            'center',
            'middle',
            Scene.BUFFER_COLOR,
        )
        section_2.addText(
            'result',
            section_2.width / 2,
            27.5,
            false,
            'center',
            'middle',
            Scene.BUFFER_COLOR,
        )
        section_2.createPort(0, 32, 'input', Scene.BORDER_COLOR, 'input-ReadData2')
        section_2.createPort(section_2.width, 32, 'output', Scene.BORDER_COLOR, 'output-ReadData2')
        section_2.addText(
            'Read',
            section_2.width / 2,
            31,
            false,
            'center',
            'middle',
            Scene.BUFFER_COLOR,
        )
        section_2.addText(
            'data 2',
            section_2.width / 2,
            32,
            false,
            'center',
            'middle',
            Scene.BUFFER_COLOR,
        )

        section_2.createPort(0, 40.5, 'input', Scene.BORDER_COLOR, 'input-W_reg')
        section_2.createPort(section_2.width, 40.5, 'output', Scene.BORDER_COLOR, 'output-W_reg')
        section_2.addText(
            'w_reg',
            section_2.width / 2,
            40.5,
            false,
            'center',
            'middle',
            Scene.BUFFER_COLOR,
        )
    }
}
