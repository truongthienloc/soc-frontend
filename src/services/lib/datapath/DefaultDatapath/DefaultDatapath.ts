import ADD from '../Block/ADD'
import ALU from '../Block/ALU'
import ALUControl from '../Block/ALUControl'
import { Branch } from '../Block/Branch'
import Constant from '../Block/Constant'
import { Control } from '../Block/Control'
import DMemory from '../Block/DMemory'
import DataGen from '../Block/DataGen'
import IMemory from '../Block/IMemory'
import ImmGen from '../Block/ImmGen'
import JumpControl from '../Block/JumpControl'
import Mux from '../Block/Mux'
import Mux3 from '../Block/Mux3'
import PC from '../Block/PC/PC'
import Register from '../Block/Register'
import ShiftLeft, { ShiftLeft12 } from '../Block/ShiftLeft'
import BranchingLink from '../BranchingLink'
import { LinkOptions } from '../Link'
import Port from '../Port'
import Scene from '../Scene'

import { HEAVY_LINE_COLOR, LINE_COLOR } from '../constants'
import { InputData, InputValue } from '../types'

export default class DefaultDatapath {
    private scene: Scene

    private adds: ADD[] = []
    private branch!: Branch
    private alu!: ALU
    private aluControl!: ALUControl
    private control!: Control
    private dMem!: DMemory
    private iMem!: IMemory
    private immGen!: ImmGen
    private dataGen!: DataGen
    private jumpControl!: JumpControl
    private muxs: Mux[] = []
    private mux3!: Mux3
    private pc!: PC
    private register!: Register
    private shiftLeft!: ShiftLeft
    private shiftLeft12!: ShiftLeft12
    private constants: Constant[] = []

    private links!: BranchingLink

    private readonly X: number = 0
    private readonly Y: number = 0

    /**
     * isEnds[0]: PC
     * isEnds[1]: Registers
     */
    private isEnds: boolean[] = [true, true]

    constructor(containerId: string, width: number, height: number, bgColor?: string) {
        this.scene = new Scene(containerId, width, height, bgColor)

        this.createBlocks()

        this.links = this.scene.createBranchingLink()

        this.createLinks()

        // this.scene.useGridMode()
        this.scene.render(0)

        // const port = this.iMem.getPort('output-Instruction')

        // port.load({type: 'once', srcId: 'developer', value: 'Hello'});

        // this.scene.start();
    }

    public loadInstruction(data: InputValue[]): void {
        // const testData = [...data]
        // testData[13] = {name: '13', value: 'brown'}
        this.isEnds[0] = false
        this.isEnds[1] = false
        this.pc.connectFinishSignal(this.handlePCEnd.bind(this))
        this.register.connectFinishSignal(this.handleRegisterEnd.bind(this))
        const loadingData = {
            type: 'once',
            srcId: this.pc.id,
            value: data,
        } as InputData
        const startPort = this.pc.getPort('output')
        startPort.load(loadingData)
        for (const constant of this.constants) {
            const port = constant.getPort('output')
            port.load(loadingData)
        }
        this.scene.start()
    }

    public resetState(): void {
        this.scene.stop()
        this.scene.destroy()
        this.links.clearAll()
        this.adds = []
        this.muxs = []
        this.constants = []
        this.createBlocks()
        this.createLinks()
        this.scene.render(0)
        this.isEnds[0] = true
        this.isEnds[1] = true
    }

    private handlePCEnd(): void {
        this.isEnds[0] = true
        if (this.isEnds[1]) {
            this.scene.stop()
        }
    }

    private handleRegisterEnd(): void {
        this.isEnds[1] = true
        if (this.isEnds[0]) {
            this.scene.stop()
        }
    }

    private createBlocks(): void {
        this.constants.push(this.scene.createConstant(this.X + 8, this.Y + 10, 4))
        this.adds.push(this.scene.createADD(this.X + 10, this.Y + 4))
        this.shiftLeft = this.scene.createShiftLeft(this.X + 34, this.Y + 10)
        this.adds.push(this.scene.createADD(this.X + 38, this.Y + 4, 'lg'))
        this.muxs.push(this.scene.createMux(this.X + 48, this.Y + 3.5, true))
        this.muxs.push(this.scene.createMux(this.X + 52, this.Y + 5, true))

        this.pc = this.scene.createPC(this.X + 2, this.Y + 29.5)
        this.iMem = this.scene.createIMemory(this.X + 7, this.Y + 31)
        this.control = this.scene.createControl(this.X + 19.5, this.Y + 23)
        this.shiftLeft12 = this.scene.createShiftLeft12(this.X + 56, this.Y + 15)
        this.adds.push(this.scene.createADD(this.X + 63, this.Y + 9))
        this.muxs.push(this.scene.createMux(this.X + 68, this.Y + 11.5, true))

        this.register = this.scene.createRegister(this.X + 20, this.Y + 31)
        this.immGen = this.scene.createImmGen(this.X + 24, this.Y + 46)

        this.muxs.push(this.scene.createMux(this.X + 32, this.Y + 35.5, false, true))
        this.aluControl = this.scene.createALUControl(this.X + 33.5, this.Y + 49)
        this.alu = this.scene.createALU(this.X + 36, this.Y + 32)
        this.dMem = this.scene.createDMemory(this.X + 46, this.Y + 34)
        this.dataGen = this.scene.createDataGen(this.X + 56, this.Y + 36)
        this.muxs.push(this.scene.createMux(this.X + 60, this.Y + 35))
        this.muxs.push(this.scene.createMux(this.X + 64, this.Y + 33.5))
        this.muxs.push(this.scene.createMux(this.X + 68, this.Y + 28))
        this.constants.push(
            this.scene.createConstant(this.X + this.muxs[6].getXY().x - 2, this.Y + 29, 1),
        )
        this.constants.push(
            this.scene.createConstant(this.X + this.muxs[6].getXY().x - 2, this.Y + 32, 0),
        )
        this.muxs.push(this.scene.createMux(this.X + 72, this.Y + 29.5))
        this.muxs.push(this.scene.createMux(this.X + 76, this.Y + 28))

        this.branch = this.scene.createBranch(
            this.X + this.alu.getXY().x + 7.5,
            this.control.getXY().y - 5,
        )
    }

    private createLinks(): void {
        // PC and Imem
        const inPC = this.pc.getPort('input')
        const outPC = this.pc.getPort('output')
        const inImem = this.iMem.getPort('input-ReadAddress')
        const outImem = this.iMem.getPort('output-Instruction')

        outPC.name = '0'
        outImem.name = '1'

        // Register
        const inReg1 = this.register.getPort('input-ReadReg-1')
        const inReg2 = this.register.getPort('input-ReadReg-2')
        const inReg3 = this.register.getPort('input-WriteReg')
        const inReg4 = this.register.getPort('input-WriteData')
        const inReg_control = this.register.getPort('input-control-Write')
        const outReg1 = this.register.getPort('output-ReadData-1')
        const outReg2 = this.register.getPort('output-ReadData-2')

        outReg1.name = '2'
        outReg2.name = '2'

        // Control
        const inControl = this.control.getPort('input')
        const outConJal = this.control.getPort('output-Jal')
        const outConJalr = this.control.getPort('output-Jalr')
        const outConBranch = this.control.getPort('output-Branch')
        const outConAuipcOrLui = this.control.getPort('output-AuipcOrLui')
        const outConWb = this.control.getPort('output-Wb')
        const outConSlt = this.control.getPort('output-Slt')
        const outConMemtoRegister = this.control.getPort('output-MemtoRegister')
        const outConALUOp = this.control.getPort('output-ALUOp')
        const outConUnsigned = this.control.getPort('output-Unsigned')
        const outConMemRead = this.control.getPort('output-MemRead')
        const outConMemWrite = this.control.getPort('output-MemWrite')
        const outConALUSrc = this.control.getPort('output-ALUSrc')
        const outConRegWrite = this.control.getPort('output-RegWrite')

        outConJal.name = 'jal'
        outConJalr.name = 'jalr'
        outConBranch.name = 'branch'
        outConAuipcOrLui.name = 'auiOrLui'
        outConWb.name = 'wb'
        outConSlt.name = 'slt'
        outConMemtoRegister.name = 'memToReg'
        outConALUOp.name = 'ALUOp'
        outConUnsigned.name = 'unsigned'
        outConMemRead.name = 'memRead'
        outConMemWrite.name = 'memWrite'
        outConALUSrc.name = 'ALUSrc'
        outConRegWrite.name = 'regWrite'

        // ImmGen
        const inImmGen = this.immGen.getPort('input')
        const outImmGen = this.immGen.getPort('output')

        outImmGen.name = '1'

        // DataGen
        const inDataGen = this.dataGen.getPort('input')
        const outDataGen = this.dataGen.getPort('output')
        const inDataGenUnsigned = this.dataGen.getPort('input-Unsigned')

        outDataGen.name = '8'

        // ALU Control
        const inAluCon1 = this.aluControl.getPort('input-Instruction')
        const inALUCon2 = this.aluControl.getPort('input-ALUOp')
        const outALUCon = this.aluControl.getPort('output')

        // ALU
        const inALU1 = this.alu.getPort('input-Top')
        const inALU2 = this.alu.getPort('input-Bottom')
        const inALU_control = this.alu.getPort('input-Control')
        const outALUResult = this.alu.getPort('output-Result')
        const outALUZero = this.alu.getPort('output-Zero')
        const outALUSignBit = this.alu.getPort('output-SignBit')

        outALUResult.name = '5'
        outALUZero.name = 'zero'
        outALUSignBit.name = 'signBit'

        // Dmem
        const inDMem1 = this.dMem.getPort('input-Address')
        const inDMem2 = this.dMem.getPort('input-WriteData')
        const inDmem_sizeData = this.dMem.getPort('input-ControlSizeData')
        const inDmem_MemRead = this.dMem.getPort('input-ControlMemRead')
        const inDmem_MemWrite = this.dMem.getPort('input-ControlMemWrite')
        const outDmem = this.dMem.getPort('output-ReadData')

        outDmem.name = '8'

        // Muxs
        const inMux0_0 = this.muxs[0].getPort('input-0')
        const inMux0_1 = this.muxs[0].getPort('input-1')
        const inMux0_control = this.muxs[0].getPort('input-control')
        const outMux0 = this.muxs[0].getPort('output')
        outMux0.name = '6'
        const inMux1_0 = this.muxs[1].getPort('input-0')
        const inMux1_1 = this.muxs[1].getPort('input-1')
        const inMux1_control = this.muxs[1].getPort('input-control')
        const outMux1 = this.muxs[1].getPort('output')
        outMux1.name = '9'
        const inMux2_0 = this.muxs[2].getPort('input-0')
        const inMux2_1 = this.muxs[2].getPort('input-1')
        const inMux2_control = this.muxs[2].getPort('input-control')
        const outMux2 = this.muxs[2].getPort('output')
        outMux2.name = '16'
        const inMux3_0 = this.muxs[3].getPort('input-0')
        const inMux3_1 = this.muxs[3].getPort('input-1')
        const inMux3_control = this.muxs[3].getPort('input-control')
        const outMux3 = this.muxs[3].getPort('output')
        outMux3.name = '3'
        const inMux4_0 = this.muxs[4].getPort('input-0')
        const inMux4_1 = this.muxs[4].getPort('input-1')
        const inMux4_control = this.muxs[4].getPort('input-control')
        const outMux4 = this.muxs[4].getPort('output')
        outMux4.name = '10'
        const inMux5_0 = this.muxs[5].getPort('input-0')
        const inMux5_1 = this.muxs[5].getPort('input-1')
        const inMux5_control = this.muxs[5].getPort('input-control')
        const outMux5 = this.muxs[5].getPort('output')
        outMux5.name = '11'
        const inMux6_0 = this.muxs[6].getPort('input-0')
        const inMux6_1 = this.muxs[6].getPort('input-1')
        const inMux6_control = this.muxs[6].getPort('input-control')
        const outMux6 = this.muxs[6].getPort('output')
        outMux6.name = '12'
        const inMux7_0 = this.muxs[7].getPort('input-0')
        const inMux7_1 = this.muxs[7].getPort('input-1')
        const inMux7_control = this.muxs[7].getPort('input-control')
        const outMux7 = this.muxs[7].getPort('output')
        outMux7.name = '15'
        const inMux8_0 = this.muxs[8].getPort('input-0')
        const inMux8_1 = this.muxs[8].getPort('input-1')
        const inMux8_control = this.muxs[8].getPort('input-control')
        const outMux8 = this.muxs[8].getPort('output')
        outMux8.name = '17'

        // Constants
        const con4 = this.constants[0].getPort('output')
        const con0 = this.constants[2].getPort('output')
        const con1 = this.constants[1].getPort('output')

        con4.name = '4'
        con0.name = '13'
        con1.name = '14'

        // Branch
        const inBraJal = this.branch.getPort('input-Jal')
        const inBraJalr = this.branch.getPort('input-Jalr')
        const inBraBranch = this.branch.getPort('input-Branch')
        const inBraZero = this.branch.getPort('input-Zero')
        const inBraSignBit = this.branch.getPort('input-Sign-bit')
        const outBraPcSrc1 = this.branch.getPort('output-PcSrc1')
        const outBraPcSrc2 = this.branch.getPort('output-PcSrc2')
        const outBraJump = this.branch.getPort('output-Jump')

        outBraPcSrc1.name = 'pcSrc1'
        outBraPcSrc2.name = 'pcSrc2'
        outBraJump.name = 'jump'

        // ShiftLeft 12
        const inShiftLeft12 = this.shiftLeft12.getPort('input')
        const outShiftLeft12 = this.shiftLeft12.getPort('output')
        outShiftLeft12.name = '1'

        // ShiftLeft 1
        const inShiftLeft1 = this.shiftLeft.getPort('input')
        const outShiftLeft1 = this.shiftLeft.getPort('output')
        outShiftLeft1.name = '1'

        // Add
        const inAdd0_0 = this.adds[0].getPort('input-Top')
        const inAdd0_1 = this.adds[0].getPort('input-Bottom')
        const outAdd0 = this.adds[0].getPort('output')
        outAdd0.name = '0'
        const inAdd1_0 = this.adds[1].getPort('input-Top')
        const inAdd1_1 = this.adds[1].getPort('input-Bottom')
        const outAdd1 = this.adds[1].getPort('output')
        outAdd1.name = '4'
        const inAdd2_0 = this.adds[2].getPort('input-Top')
        const inAdd2_1 = this.adds[2].getPort('input-Bottom')
        const outAdd2 = this.adds[2].getPort('output')
        outAdd2.name = '7'

        const pcPort1 = this.links.createPort(outPC.getXY().x + 1, outPC.getXY().y)
        const pcPort2 = this.links.createPort(
            pcPort1.getXY().x,
            this.shiftLeft.getXY().y + this.shiftLeft.height + 0.5,
        )
        const pcPort3 = this.links.createPort(
            this.control.getXY().x,
            this.shiftLeft.getXY().y + this.shiftLeft.height + 0.5,
        )

        const instrucPort = this.links.createPort(outImem.getXY().x + 1, outImem.getXY().y)
        const instrucPort1 = this.links.createPort(instrucPort.getXY().x, inReg1.getXY().y)
        // const instrucPort2 = this.links.createPort(instrucPort.getXY().x, inReg2.getXY().y);
        const instrucPort3 = this.links.createPort(instrucPort.getXY().x, inReg3.getXY().y)
        // const instrucPort4 = this.links.createPort(instrucPort.getXY().x, inControl.getXY().y);
        const instrucPort5 = this.links.createPort(instrucPort.getXY().x + 3, inImmGen.getXY().y)

        const regPort = this.links.createPort(outReg2.getXY().x + 1, outReg2.getXY().y)

        const immGenPort1 = this.links.createPort(regPort.getXY().x + 1, inMux3_1.getXY().y)
        const immGenPort2 = this.links.createPort(immGenPort1.getXY().x, inShiftLeft12.getXY().y)

        const aluPort = this.links.createPort(outALUResult.getXY().x + 2.5, outALUResult.getXY().y)

        const signbitPort = this.links.createPort(
            inBraSignBit.getXY().x,
            outConSlt.getXY().y + 0.5,
            { color: LINE_COLOR },
        )

        const addPort0 = this.links.createPort(outAdd0.getXY().x + 3, this.adds[0].getXY().y - 1)

        const shiftLeft12Port = this.links.createPort(
            outShiftLeft12.getXY().x + 1.5,
            outShiftLeft12.getXY().y,
        )

        this.createLink(outPC, pcPort1)
        this.createLink(pcPort1, inImem)

        this.createLink(outImem, instrucPort)
        // this.createLink(instrucPort, instrucPort2);
        this.createLink(instrucPort, instrucPort3)
        this.createLink(instrucPort, instrucPort1)
        this.createLink(instrucPort1, inControl, [[instrucPort.getXY().x, inControl.getXY().y]])
        this.createLink(instrucPort3, instrucPort5, [
            [instrucPort3.getXY().x, instrucPort5.getXY().y],
        ])

        this.createLink(instrucPort5, inAluCon1, [[instrucPort5.getXY().x, inAluCon1.getXY().y]])

        this.createLink(instrucPort1, inReg1)
        this.createLink(instrucPort, inReg2)
        this.createLink(instrucPort3, inReg3)
        // this.createLink(instrucPort4, inControl);
        this.createLink(instrucPort5, inImmGen)

        this.createLink(outReg1, inALU1)
        this.createLink(outReg2, regPort)
        this.createLink(regPort, inMux3_0)
        this.createLink(outMux3, inALU2)
        this.createLink(outALUResult, aluPort)
        this.createLink(aluPort, inMux4_0, [
            [aluPort.getXY().x, this.dMem.getXY().y + this.dMem.height + 2],
            [inMux4_0.getXY().x - 1, this.dMem.getXY().y + this.dMem.height + 2],
            [inMux4_0.getXY().x - 1, inMux4_0.getXY().y],
        ])

        this.createLink(outImmGen, immGenPort1, [[immGenPort1.getXY().x, outImmGen.getXY().y]])
        this.createLink(immGenPort1, inMux3_1)

        this.createLink(aluPort, inDMem1)
        this.createLink(regPort, inDMem2, [[regPort.getXY().x, inDMem2.getXY().y]])

        this.createLink(outDmem, inDataGen)
        this.createLink(outDataGen, inMux4_1)
        this.createLink(outMux4, inMux5_0)
        this.createLink(con1, inMux6_1)
        this.createLink(con0, inMux6_0)
        this.createLink(outMux5, inMux7_0, [
            [outMux5.getXY().x + 2, outMux5.getXY().y],
            [outMux5.getXY().x + 2, inMux7_0.getXY().y],
        ])
        this.createLink(outMux6, inMux7_1)
        this.createLink(outMux7, inMux8_0)
        this.createLink(outMux8, inReg4, [
            [outMux8.getXY().x + 2, outMux8.getXY().y],
            [outMux8.getXY().x + 2, this.aluControl.getXY().y + this.aluControl.height + 1],
            [inReg4.getXY().x - 2, this.aluControl.getXY().y + this.aluControl.height + 1],
            [inReg4.getXY().x - 2, inReg4.getXY().y],
        ])

        this.createLink(outConJal, inBraJal, [], {
            color: LINE_COLOR,
            firstText: { text: 'Jal', color: LINE_COLOR, spacingX: 1 },
        })
        this.createLink(outConJalr, inBraJalr, [], {
            color: LINE_COLOR,
            firstText: { text: 'Jalr', color: LINE_COLOR, spacingX: 1 },
        })
        this.createLink(outConBranch, inBraBranch, [], {
            color: LINE_COLOR,
            firstText: { text: 'Branch', color: LINE_COLOR, spacingX: 1 },
        })
        this.createLink(outALUZero, inBraZero, [[inBraZero.getXY().x, outALUZero.getXY().y]], {
            color: LINE_COLOR,
        })
        this.createLink(
            outALUSignBit,
            signbitPort,
            [[inBraSignBit.getXY().x, outALUSignBit.getXY().y]],
            { color: LINE_COLOR },
        )
        this.createLink(signbitPort, inBraSignBit, [], { color: LINE_COLOR })
        this.createLink(
            outConAuipcOrLui,
            inMux2_control,
            [[inMux2_control.getXY().x, outConAuipcOrLui.getXY().y]],
            {
                color: LINE_COLOR,
                firstText: { text: 'AuipcOrLui', color: LINE_COLOR, spacingX: 1 },
            },
        )
        this.createLink(
            outConWb,
            inMux8_control,
            [[inMux8_control.getXY().x, outConWb.getXY().y]],
            {
                color: LINE_COLOR,
                firstText: { text: 'Wb', color: LINE_COLOR, spacingX: 1 },
            },
        )
        this.createLink(
            outConSlt,
            inMux7_control,
            [[inMux7_control.getXY().x, outConSlt.getXY().y]],
            {
                color: LINE_COLOR,
                firstText: { text: 'Slt', color: LINE_COLOR, spacingX: 1 },
            },
        )
        this.createLink(
            outConMemtoRegister,
            inMux4_control,
            [[inMux4_control.getXY().x, outConMemtoRegister.getXY().y]],
            {
                color: LINE_COLOR,
                firstText: { text: 'MemtoRegister', color: LINE_COLOR, spacingX: 1 },
            },
        )
        this.createLink(
            outConALUOp,
            inALUCon2,
            [
                [inALUCon2.getXY().x - 1, outConALUOp.getXY().y],
                [inALUCon2.getXY().x - 1, inALUCon2.getXY().y],
            ],
            {
                color: LINE_COLOR,
                firstText: { text: 'ALUOp', color: LINE_COLOR, spacingX: 1 },
            },
        )
        this.createLink(
            outConUnsigned,
            inDataGenUnsigned,
            [[inDataGenUnsigned.getXY().x, outConUnsigned.getXY().y]],
            {
                color: LINE_COLOR,
                firstText: { text: 'Unsigned', color: LINE_COLOR, spacingX: 1 },
            },
        )
        this.createLink(
            outConMemRead,
            inDmem_MemRead,
            [
                [this.dMem.getXY().x + this.dMem.width + 0.5, outConMemRead.getXY().y],
                [this.dMem.getXY().x + this.dMem.width + 0.5, inDmem_MemRead.getXY().y + 1],
                [inDmem_MemRead.getXY().x, inDmem_MemRead.getXY().y + 1],
            ],
            {
                color: LINE_COLOR,
                firstText: { text: 'MemRead', color: LINE_COLOR, spacingX: 1 },
            },
        )
        this.createLink(
            outConMemWrite,
            inDmem_MemWrite,
            [[inDmem_MemWrite.getXY().x, outConMemWrite.getXY().y]],
            {
                color: LINE_COLOR,
                firstText: { text: 'MemWrite', color: LINE_COLOR, spacingX: 1 },
            },
        )
        this.createLink(
            outConALUSrc,
            inMux3_control,
            [[inMux3_control.getXY().x, outConALUSrc.getXY().y]],
            {
                color: LINE_COLOR,
                firstText: { text: 'ALUSrc', color: LINE_COLOR, spacingX: 1 },
            },
        )
        this.createLink(
            outConRegWrite,
            inReg_control,
            [[inReg_control.getXY().x, outConRegWrite.getXY().y]],
            {
                color: LINE_COLOR,
                firstText: { text: 'RegWrite', color: LINE_COLOR, spacingX: 1 },
            },
        )
        this.createLink(
            outALUCon,
            inALU_control,
            [[inALU_control.getXY().x, outALUCon.getXY().y]],
            { color: LINE_COLOR },
        )
        this.createLink(
            outBraPcSrc1,
            inMux0_control,
            [[inMux0_control.getXY().x, outBraPcSrc1.getXY().y]],
            {
                color: LINE_COLOR,
                firstText: { text: 'PcSrc1', color: LINE_COLOR, spacingX: 0.5 },
            },
        )
        this.createLink(
            outBraPcSrc2,
            inMux1_control,
            [[inMux1_control.getXY().x, outBraPcSrc2.getXY().y]],
            {
                color: LINE_COLOR,
                firstText: { text: 'PcSrc2', color: LINE_COLOR, spacingX: 0.5 },
            },
        )
        this.createLink(
            outBraJump,
            inMux5_control,
            [[inMux5_control.getXY().x, outBraJump.getXY().y]],
            {
                color: LINE_COLOR,
                firstText: { text: 'Jump', color: LINE_COLOR, spacingX: 0.5 },
            },
        )
        this.createLink(
            signbitPort,
            inMux6_control,
            [[inMux6_control.getXY().x, signbitPort.getXY().y]],
            { color: LINE_COLOR },
        )

        this.createLink(aluPort, inMux1_1, [
            [aluPort.getXY().x, this.branch.getXY().y + this.branch.height],
            [inMux0_control.getXY().x + 1, this.branch.getXY().y + this.branch.height],
            [inMux0_control.getXY().x + 1, inMux1_1.getXY().y],
        ])
        this.createLink(immGenPort1, immGenPort2)
        this.createLink(immGenPort2, inShiftLeft12)
        this.createLink(immGenPort2, inShiftLeft1, [
            [immGenPort2.getXY().x, inShiftLeft1.getXY().y],
        ])
        this.createLink(outShiftLeft12, shiftLeft12Port)
        this.createLink(shiftLeft12Port, inAdd2_1)
        this.createLink(outAdd2, inMux2_0)
        this.createLink(shiftLeft12Port, inMux2_1, [
            [shiftLeft12Port.getXY().x, shiftLeft12Port.getXY().y + 2],
            [inMux2_1.getXY().x - 2, shiftLeft12Port.getXY().y + 2],
            [inMux2_1.getXY().x - 2, inMux2_1.getXY().y],
        ])
        this.createLink(outMux2, inMux8_1, [
            [inMux8_1.getXY().x - 2, outMux2.getXY().y],
            // [outMux2.getXY().x + 2, outMux2.getXY().y + 5],
            // [inMux8_1.getXY().x - 2, outMux2.getXY().y + 5],
            [inMux8_1.getXY().x - 2, inMux8_1.getXY().y],
        ])

        this.createLink(outShiftLeft1, inAdd1_1)
        this.createLink(outAdd1, inMux0_1)
        this.createLink(outMux0, inMux1_0)
        this.createLink(outMux1, inPC, [
            [outMux1.getXY().x + 3, outMux1.getXY().y],
            [outMux1.getXY().x + 3, this.adds[1].getXY().y - 2],
            [inPC.getXY().x - 1, this.adds[1].getXY().y - 2],
            [inPC.getXY().x - 1, inPC.getXY().y],
        ])
        this.createLink(outAdd0, addPort0, [[addPort0.getXY().x, outAdd0.getXY().y]])
        this.createLink(addPort0, inMux0_0, [
            [inMux0_0.getXY().x - 2, addPort0.getXY().y],
            [inMux0_0.getXY().x - 2, inMux0_0.getXY().y],
        ])
        this.createLink(addPort0, inMux5_1, [
            [addPort0.getXY().x, addPort0.getXY().y - 2],
            [inMux5_1.getXY().x - 2.5, addPort0.getXY().y - 2],
            [inMux5_1.getXY().x - 2.5, inMux5_1.getXY().y],
        ])

        this.createLink(con4, inAdd0_1)
        this.createLink(pcPort1, pcPort2)
        this.createLink(pcPort2, inAdd0_0, [[pcPort2.getXY().x, inAdd0_0.getXY().y]])
        this.createLink(pcPort2, pcPort3)
        this.createLink(pcPort3, inAdd1_0, [[pcPort3.getXY().x, inAdd1_0.getXY().y]])
        this.createLink(pcPort3, inAdd2_0, [
            [inAdd2_0.getXY().x - 3, pcPort3.getXY().y],
            [inAdd2_0.getXY().x - 3, inAdd2_0.getXY().y],
        ])
    }

    private createLink(
        src: Port,
        des: Port,
        breakpoints?: [number, number][],
        options?: LinkOptions,
    ): void {
        const link = this.links.createLink(src, des, options)
        if (breakpoints) {
            for (const breakpoint of breakpoints) {
                link.addBreakpoint(breakpoint[0], breakpoint[1])
            }
        }
    }
}
