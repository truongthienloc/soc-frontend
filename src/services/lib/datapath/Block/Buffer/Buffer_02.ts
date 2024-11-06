import Buffer from './Buffer'
import Scene from '../../Scene'

export default class Buffer_02 extends Buffer {
    constructor(context: CanvasRenderingContext2D, x: number, y: number, name: string) {
        super(context, x, y, name)

        const section_0 = this.createSection(6)
        const section_1 = this.createSection(6)
        const section_2 = this.createSection(9)
        const section_3 = this.createSection(34)
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
            section_1.height / 2,
            'output',
            Scene.CONTROL_COLOR,
            'output-MEM',
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
        section_2.createPort(0, section_2.height / 2, 'input', Scene.CONTROL_COLOR, 'input-EX')
        section_2.createPort(
            section_2.width,
            section_2.height / 2 - 2,
            'output',
            Scene.CONTROL_COLOR,
            'output-AuiOrLui',
        )
        section_2.createPort(
            section_2.width,
            section_2.height / 2,
            'output',
            Scene.CONTROL_COLOR,
            'output-ALUSrc',
        )
        section_2.createPort(
            section_2.width,
            section_2.height / 2 + 2,
            'output',
            Scene.CONTROL_COLOR,
            'output-ALUOp',
        )
        section_2.addText(
            'EX',
            section_2.width / 2,
            section_2.height / 2,
            false,
            'center',
            'middle',
            Scene.BUFFER_COLOR,
        )

        section_3.createPort(0, 1, 'input', Scene.BORDER_COLOR, 'input-PC4')
        section_3.createPort(section_3.width, 1, 'output', Scene.BORDER_COLOR, 'output-PC4')
        section_3.addText(
            'PC + 4',
            section_3.width / 2,
            1,
            false,
            'center',
            'middle',
            Scene.BUFFER_COLOR,
        )
        section_3.createPort(0, 12.5, 'input', Scene.BORDER_COLOR, 'input-PC')
        section_3.createPort(section_3.width, 12.5, 'output', Scene.BORDER_COLOR, 'output-PC')
        section_3.addText(
            'PC',
            section_3.width / 2,
            12.5,
            false,
            'center',
            'middle',
            Scene.BUFFER_COLOR,
        )
        section_3.createPort(0, 16, 'input', Scene.BORDER_COLOR, 'input-ReadData1')
        section_3.createPort(section_3.width, 16, 'output', Scene.BORDER_COLOR, 'output-ReadData1')
        section_3.addText(
            'Read',
            section_3.width / 2,
            15,
            false,
            'center',
            'middle',
            Scene.BUFFER_COLOR,
        )
        section_3.addText(
            'data 1',
            section_3.width / 2,
            16,
            false,
            'center',
            'middle',
            Scene.BUFFER_COLOR,
        )
        section_3.createPort(0, 19.5, 'input', Scene.BORDER_COLOR, 'input-ReadData2')
        section_3.createPort(
            section_3.width,
            19.5,
            'output',
            Scene.BORDER_COLOR,
            'output-ReadData2',
        )
        section_3.addText(
            'Read',
            section_3.width / 2,
            18.5,
            false,
            'center',
            'middle',
            Scene.BUFFER_COLOR,
        )
        section_3.addText(
            'data 2',
            section_3.width / 2,
            19.5,
            false,
            'center',
            'middle',
            Scene.BUFFER_COLOR,
        )
        section_3.createPort(0, 26.5, 'input', Scene.BORDER_COLOR, 'input-ImmGen')
        section_3.createPort(section_3.width, 26.5, 'output', Scene.BORDER_COLOR, 'output-ImmGen')
        section_3.addText(
            'Imm',
            section_3.width / 2,
            25.5,
            false,
            'center',
            'middle',
            Scene.BUFFER_COLOR,
        )
        section_3.addText(
            'Gen',
            section_3.width / 2,
            26.5,
            false,
            'center',
            'middle',
            Scene.BUFFER_COLOR,
        )
        section_3.createPort(0, 28.5, 'input', Scene.BORDER_COLOR, 'input-Funct3_7')
        section_3.createPort(section_3.width, 28.5, 'output', Scene.BORDER_COLOR, 'output-Funct3_7')
        section_3.addText(
            'funct 3_7',
            section_3.width / 2,
            28.5,
            false,
            'center',
            'middle',
            Scene.BUFFER_COLOR,
        )

        section_3.createPort(section_3.width, 31.5, 'output', Scene.BORDER_COLOR, 'output-W_reg')
        section_3.addText(
            'w_reg',
            section_3.width / 2,
            31.5,
            false,
            'center',
            'middle',
            Scene.BUFFER_COLOR,
        )
        section_3.createPort(section_3.width, 32.5, 'output', Scene.BORDER_COLOR, 'output-RS1')
        section_3.addText(
            'rs1',
            section_3.width / 2,
            32.5,
            false,
            'center',
            'middle',
            Scene.BUFFER_COLOR,
        )
        section_3.createPort(section_3.width, 33.5, 'output', Scene.BORDER_COLOR, 'output-RS2')
        section_3.addText(
            'rs2',
            section_3.width / 2,
            33.5,
            false,
            'center',
            'middle',
            Scene.BUFFER_COLOR,
        )
    }
}
