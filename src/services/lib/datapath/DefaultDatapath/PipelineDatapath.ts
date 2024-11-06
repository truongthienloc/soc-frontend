import ADD from '../Block/ADD'
import ALU from '../Block/ALU'
import ALUControl from '../Block/ALUControl'
import { Branch, BranchUnit } from '../Block/Branch'
import { Buffer, Buffer_01, Buffer_02, Buffer_03, Buffer_04 } from '../Block/Buffer'
import Constant from '../Block/Constant'
import { SimpleControl } from '../Block/Control'
import DMemory from '../Block/DMemory'
import DataGen from '../Block/DataGen'
import { Detection } from '../Block/Detection'
import Forwarding from '../Block/Forwarding/Forwarding'
import IMemory from '../Block/IMemory'
import ImmGen from '../Block/ImmGen'
import JumpControl from '../Block/JumpControl'
import Mux from '../Block/Mux'
import { Mux6 } from '../Block/Mux6'
import { ControlledPC } from '../Block/PC'
import Register from '../Block/Register'
import ShiftLeft, { ShiftLeft12 } from '../Block/ShiftLeft'
import BranchingLink from '../BranchingLink'
import { LinkOptions } from '../Link'
import Port from '../Port'
import Scene from '../Scene'

import { HEAVY_LINE_COLOR, LINE_COLOR } from '../constants'
import { InputData, InputValue } from '../types'

export default class PipelineDatapath {
    private scene: Scene

    private adds: ADD[] = []
    private branch!: BranchUnit
    private alu!: ALU
    private aluControl!: ALUControl
    private control!: SimpleControl
    private dMem!: DMemory
    private iMem!: IMemory
    private immGen!: ImmGen
    private dataGen!: DataGen
    private jumpControl!: JumpControl
    private muxs: Mux[] = []
    private mux6s: Mux6[] = []
    private pc!: ControlledPC
    private register!: Register
    private shiftLeft!: ShiftLeft
    private shiftLeft12!: ShiftLeft12
    private constants: Constant[] = []
    private buffers: Buffer[] = []
    private detection!: Detection
    private forwarding!: Forwarding

    private links!: BranchingLink

    private readonly X: number = 0
    private readonly Y: number = 0

    /**
     * isEnds[0]: PC
     * isEnds[1]: Registers
     */
    private isEnds: number[] = [0, 0]

    constructor(containerId: string, bgColor?: string) {
        this.scene = new Scene(containerId, 132, 77, bgColor)

        this.createBlocks()

        this.links = this.scene.createBranchingLink()
        this.links.speed = 0.04

        console.log('create datapath')

        this.createLinks()

        this.scene.useGridMode()
        this.scene.render(0)
    }

    public loadInstruction(data: InputValue[]): void {
        // const testData = [...data]
        // testData[13] = {name: '13', value: 'brown'}
        this.isEnds[0] = 0
        this.isEnds[1] = 0
        this.pc.connectFinishSignal(this.handlePCEnd.bind(this))

        const loadingData = {
            type: 'once',
            srcId: this.pc.id,
            value: data,
        } as InputData
        // const startPort = this.pc.getPort('output')
        // startPort.load(loadingData)
        for (const constant of this.constants) {
            const port = constant.getPort('output')
            port.load(loadingData)
        }
        for (const buffer of this.buffers) {
            buffer.connectFinishSignal(this.handleBufferEnd.bind(this))
            buffer.load(loadingData)
        }
        this.scene.start()
    }

    public resetState(): void {
        this.scene.stop()
        this.scene.destroy()
        this.links.clearAll()
        this.adds = []
        this.muxs = []
        this.mux6s = []
        this.constants = []
        this.buffers = []
        this.createBlocks()
        this.createLinks()
        this.scene.render(0)
        this.isEnds[0] = 0
        this.isEnds[1] = 0
    }

    private handlePCEnd(): void {
        this.isEnds[0] = 1
        // console.log('isEnd_00: ', this.isEnds[0]);
        if (this.isEnds[1] === this.buffers.length) {
            this.scene.stop()
        }
    }

    private handleBufferEnd(): void {
        this.isEnds[1]++
        // console.log('isEnd_01: ', this.isEnds[1]);
        if (this.isEnds[1] === this.buffers.length && this.isEnds[0] == 1) {
            this.scene.stop()
        }
    }

    private createBlocks(): void {
        // Section 1
        this.muxs.push(this.scene.createMux(this.X + 2, this.Y + 39.5, false, true)) // 0
        this.muxs.push(this.scene.createMux(this.muxs[0].x + 4, this.muxs[0].y - 1.5)) // 1
        this.pc = this.scene.createControlledPC(this.muxs[1].x + 4, this.muxs[1].y)
        this.iMem = this.scene.createIMemory(this.pc.x + 4.5, this.pc.y + 1.5)
        this.adds.push(this.scene.createADD(this.pc.x + 7, this.pc.y - 15)) // 0
        this.constants.push(this.scene.createConstant(this.adds[0].x - 2, this.adds[0].y + 6, 4))

        this.buffers.push(
            this.scene.addBlock(
                new Buffer_01(this.scene.context, this.iMem.x + 8, this.iMem.y - 35, 'IF'),
            ),
        )

        // Section 2
        this.register = this.scene.createRegister(
            this.iMem.x + this.iMem.width + this.buffers[0].width + 7,
            this.iMem.y,
        )
        this.immGen = this.scene.createImmGen(
            this.register.x + this.register.width / 2,
            this.register.y + this.register.height + 3.5,
        )
        this.adds.push(
            this.scene.createADD(
                this.register.x + this.register.width + 5,
                this.immGen.y + this.immGen.height + 1.5,
            ),
        ) // 1
        this.adds.push(this.scene.createADD(this.adds[1].x, this.adds[1].y + this.adds[1].height)) // 2
        this.shiftLeft = this.scene.createShiftLeft(this.adds[2].x - 3.5, this.adds[2].y + 6)
        this.control = this.scene.createSimpleControl(
            this.register.x + this.register.width / 2 + 3,
            this.register.y - 20,
        )
        this.muxs.push(
            this.scene.createMux(
                this.control.x + this.control.width + 2,
                this.control.y - 1,
                false,
                true,
            ),
        ) // 2
        const inMux2_0 = this.muxs[2].getPort('input-1')
        this.constants.push(this.scene.createConstant(inMux2_0.x - 1.5, inMux2_0.y, 0))
        this.branch = this.scene.createBranchUnit(this.muxs[2].x, this.register.y - 7)
        this.detection = this.scene.createDetection(
            this.control.x - this.control.width,
            this.control.y - this.control.height - 10,
        )

        this.buffers.push(
            this.scene.addBlock(
                new Buffer_02(
                    this.scene.context,
                    this.branch.x + this.branch.width + 3,
                    this.buffers[0].y,
                    'REG',
                ),
            ),
        )

        // Section 3
        this.mux6s.push(
            this.scene.createMux6(
                this.buffers[1].x + this.buffers[1].width + 7.5,
                this.register.y + -1,
            ),
        ) // 0
        this.mux6s.push(
            this.scene.createMux6(
                this.mux6s[0].x - 2,
                this.mux6s[0].y + this.mux6s[0].height + 1.5,
            ),
        ) // 1
        this.muxs.push(
            this.scene.createMux(this.mux6s[1].x + this.mux6s[1].width + 3, this.mux6s[1].y + 1.5),
        ) // 3
        this.alu = this.scene.createALU(
            this.muxs[3].x + this.muxs[3].width + 3,
            this.mux6s[0].y + 1.5,
        )
        this.aluControl = this.scene.createALUControl(this.alu.x, this.alu.y + this.alu.height + 6)
        this.forwarding = this.scene.createForwarding(
            this.aluControl.x,
            this.aluControl.y + this.aluControl.height + 5.5,
        )
        this.muxs.push(
            this.scene.createMux(this.alu.x + this.alu.width + 1, this.alu.y - 4, true, true),
        ) // 4
        this.constants.push(this.scene.createConstant(this.muxs[4].x - 2, this.muxs[4].y + 1, 1))
        this.constants.push(this.scene.createConstant(this.muxs[4].x - 2, this.muxs[4].y + 4, 0))
        this.muxs.push(this.scene.createMux(this.muxs[4].x, this.muxs[4].y - 6, false, true)) // 5
        this.adds.push(this.scene.createADD(this.muxs[5].x - 5, this.muxs[5].y - 2.5)) // 3
        this.shiftLeft12 = this.scene.createShiftLeft12(this.adds[3].x - 3.5, this.adds[3].y + 6)

        this.buffers.push(
            this.scene.addBlock(
                new Buffer_03(
                    this.scene.context,
                    this.muxs[5].x + this.muxs[5].width + 2,
                    this.buffers[0].y,
                    'EX',
                ),
            ),
        ) // 2

        // Section 4
        this.dMem = this.scene.createDMemory(
            this.buffers[2].x + this.buffers[2].width + 6,
            this.alu.y + 2,
        )
        this.dataGen = this.scene.createDataGen(this.dMem.x + this.dMem.width + 4, this.dMem.y + 2)

        this.buffers.push(
            this.scene.addBlock(
                new Buffer_04(
                    this.scene.context,
                    this.dataGen.x + this.dataGen.width + 3.5,
                    this.buffers[0].y,
                    'WB',
                ),
            ),
        ) // 3

        // Section 5
        this.muxs.push(
            this.scene.createMux(this.buffers[3].x + this.buffers[3].width + 2, this.dataGen.y - 1),
        ) // 6
        this.muxs.push(
            this.scene.createMux(this.muxs[6].x + this.muxs[6].width + 2, this.muxs[6].y - 1.5),
        ) // 7
        this.muxs.push(
            this.scene.createMux(this.muxs[7].x + this.muxs[7].width + 2, this.muxs[4].y + 1.5),
        ) // 8
        this.muxs.push(
            this.scene.createMux(this.muxs[8].x + this.muxs[8].width + 2, this.muxs[5].y + 1.5),
        ) // 9
    }

    private createLinks(): void {
        const HIGH_SPEED = (this.links.speed * 5) / 2
        // PC and Imem
        const inPC = this.pc.getPort('input')
        const outPC = this.pc.getPort('output')
        outPC.name = 'IF.2'
        const conPC = this.pc.getPort('input-control')
        const inImem = this.iMem.getPort('input-ReadAddress')
        const outImem = this.iMem.getPort('output-Instruction')
        outImem.name = 'IF.10'

        // Register
        const inReg1 = this.register.getPort('input-ReadReg-1')
        const inReg2 = this.register.getPort('input-ReadReg-2')
        const inReg3 = this.register.getPort('input-WriteReg')
        const inReg4 = this.register.getPort('input-WriteData')
        const inReg_control = this.register.getPort('input-control-Write')
        const outReg1 = this.register.getPort('output-ReadData-1')
        const outReg2 = this.register.getPort('output-ReadData-2')
        outReg1.name = 'REG.12'
        outReg2.name = 'REG.13'

        // Control
        const inControl = this.control.getPort('input')
        const outControl = this.control.getPort('output')
        outControl.name = 'control'

        // ImmGen
        const inImmGen = this.immGen.getPort('input')
        const outImmGen = this.immGen.getPort('output')
        outImmGen.name = 'REG.4'

        // DataGen
        const inDataGen = this.dataGen.getPort('input')
        const outDataGen = this.dataGen.getPort('output')
        outDataGen.name = 'MEM.36'
        const inDataGenUnsigned = this.dataGen.getPort('input-Unsigned')

        // ALU Control
        const inALUCon1 = this.aluControl.getPort('input-Instruction')
        const inALUCon2 = this.aluControl.getPort('input-ALUOp')
        const outALUCon = this.aluControl.getPort('output')
        outALUCon.name = 'EX.ALUControl'

        // ALU
        const inALU1 = this.alu.getPort('input-Top')
        const inALU2 = this.alu.getPort('input-Bottom')
        const inALU_control = this.alu.getPort('input-Control')
        const outALUResult = this.alu.getPort('output-Result')
        const outALUZero = this.alu.getPort('output-Zero')
        const outALUSignBit = this.alu.getPort('output-SignBit')
        outALUResult.name = 'EX.25'
        outALUSignBit.name = 'EX.sign-bit'

        // Dmem
        const inDMem1 = this.dMem.getPort('input-Address')
        const inDMem2 = this.dMem.getPort('input-WriteData')
        const inDmem_sizeData = this.dMem.getPort('input-ControlSizeData')
        const inDmem_MemRead = this.dMem.getPort('input-ControlMemRead')
        const inDmem_MemWrite = this.dMem.getPort('input-ControlMemWrite')
        const outDmem = this.dMem.getPort('output-ReadData')
        outDmem.name = 'MEM.35'

        // Muxs
        const inMux0_0 = this.muxs[0].getPort('input-0')
        const inMux0_1 = this.muxs[0].getPort('input-1')
        const inMux0_control = this.muxs[0].getPort('input-control')
        const outMux0 = this.muxs[0].getPort('output')
        outMux0.name = 'IF.7'
        const inMux1_0 = this.muxs[1].getPort('input-0')
        const inMux1_1 = this.muxs[1].getPort('input-1')
        const inMux1_control = this.muxs[1].getPort('input-control')
        const outMux1 = this.muxs[1].getPort('output')
        outMux1.name = 'IF.8'
        const inMux2_0 = this.muxs[2].getPort('input-0')
        const inMux2_1 = this.muxs[2].getPort('input-1')
        const inMux2_control = this.muxs[2].getPort('input-control')
        const outMux2 = this.muxs[2].getPort('output')
        outMux2.name = 'REG.CONTROL'
        const inMux3_0 = this.muxs[3].getPort('input-0')
        const inMux3_1 = this.muxs[3].getPort('input-1')
        const inMux3_control = this.muxs[3].getPort('input-control')
        const outMux3 = this.muxs[3].getPort('output')
        outMux3.name = 'EX.22'
        const inMux4_0 = this.muxs[4].getPort('input-0')
        const inMux4_1 = this.muxs[4].getPort('input-1')
        const inMux4_control = this.muxs[4].getPort('input-control')
        const outMux4 = this.muxs[4].getPort('output')
        outMux4.name = 'EX.24'
        const inMux5_0 = this.muxs[5].getPort('input-0')
        const inMux5_1 = this.muxs[5].getPort('input-1')
        const inMux5_control = this.muxs[5].getPort('input-control')
        const outMux5 = this.muxs[5].getPort('output')
        outMux5.name = 'EX.23'
        const inMux6_0 = this.muxs[6].getPort('input-0')
        const inMux6_1 = this.muxs[6].getPort('input-1')
        const inMux6_control = this.muxs[6].getPort('input-control')
        const outMux6 = this.muxs[6].getPort('output')
        outMux6.name = 'WB.42'
        const inMux7_0 = this.muxs[7].getPort('input-0')
        const inMux7_1 = this.muxs[7].getPort('input-1')
        const inMux7_control = this.muxs[7].getPort('input-control')
        const outMux7 = this.muxs[7].getPort('output')
        outMux7.name = 'WB.43'
        const inMux8_0 = this.muxs[8].getPort('input-0')
        const inMux8_1 = this.muxs[8].getPort('input-1')
        const inMux8_control = this.muxs[8].getPort('input-control')
        const outMux8 = this.muxs[8].getPort('output')
        outMux8.name = 'WB.44'
        const inMux9_0 = this.muxs[9].getPort('input-0')
        const inMux9_1 = this.muxs[9].getPort('input-1')
        const inMux9_control = this.muxs[9].getPort('input-control')
        const outMux9 = this.muxs[9].getPort('output')
        outMux9.name = 'WB.45'

        // Mux6s
        const inMuxSix0_0 = this.mux6s[0].getPort('input-0')
        const inMuxSix0_1 = this.mux6s[0].getPort('input-1')
        const inMuxSix0_2 = this.mux6s[0].getPort('input-2')
        const inMuxSix0_3 = this.mux6s[0].getPort('input-3')
        const inMuxSix0_4 = this.mux6s[0].getPort('input-4')
        const inMuxSix0_5 = this.mux6s[0].getPort('input-5')
        const inMuxSix0_control = this.mux6s[0].getPort('input-control')
        const outMuxSix0 = this.mux6s[0].getPort('output')
        outMuxSix0.name = 'EX.21'
        const inMuxSix1_0 = this.mux6s[1].getPort('input-0')
        const inMuxSix1_1 = this.mux6s[1].getPort('input-1')
        const inMuxSix1_2 = this.mux6s[1].getPort('input-2')
        const inMuxSix1_3 = this.mux6s[1].getPort('input-3')
        const inMuxSix1_4 = this.mux6s[1].getPort('input-4')
        const inMuxSix1_5 = this.mux6s[1].getPort('input-5')
        const inMuxSix1_control = this.mux6s[1].getPort('input-control')
        const outMuxSix1 = this.mux6s[1].getPort('output')
        outMuxSix1.name = 'EX.20'

        // Constants
        const con4 = this.constants[0].getPort('output')
        con4.name = 'active'
        const conControl = this.constants[1].getPort('output')
        conControl.name = 'null'
        const con1 = this.constants[2].getPort('output')
        con1.name = 'active'
        const con0 = this.constants[3].getPort('output')
        con0.name = 'null'

        // Branch
        const inBranch_Ins = this.branch.getPort('input-Instruction')
        const inBranch_Wb = this.branch.getPort('input-Wb')
        const inBranch_Jump = this.branch.getPort('input-Jump')
        const inBranch_Slt = this.branch.getPort('input-Slt')
        const inBranch_MemToReg = this.branch.getPort('input-MemToReg')
        const inBranch_Jal = this.branch.getPort('input-Jal')
        const inBranch_Branch = this.branch.getPort('input-Branch')
        const inBranch_Jalr = this.branch.getPort('input-Jalr')
        const inBranch_Bot0 = this.branch.getPort('input-Bot-0')
        const inBranch_Bot1 = this.branch.getPort('input-Bot-1')
        const inBranch_Bot2 = this.branch.getPort('input-Bot-2')
        const inBranch_Bot3 = this.branch.getPort('input-Bot-3')
        const inBranch_Bot4 = this.branch.getPort('input-Bot-4')
        const inBranch_Bot5 = this.branch.getPort('input-Bot-5')
        const inBranch_Bot6 = this.branch.getPort('input-Bot-6')
        const inBranch_Bot7 = this.branch.getPort('input-Bot-7')
        const inBranch_Bot8 = this.branch.getPort('input-Bot-8')
        const outBranch_PcSrc2 = this.branch.getPort('output-PcSrc2')
        const outBranch_PcSrc1 = this.branch.getPort('output-PcSrc1')
        outBranch_PcSrc2.name = 'REG.pcsrc2'
        outBranch_PcSrc1.name = 'REG.pcsrc1'

        // ShiftLeft 12
        const inShiftLeft12 = this.shiftLeft12.getPort('input')
        const outShiftLeft12 = this.shiftLeft12.getPort('output')
        outShiftLeft12.name = 'EX.16'

        // ShiftLeft 1
        const inShiftLeft1 = this.shiftLeft.getPort('input')
        const outShiftLeft1 = this.shiftLeft.getPort('output')
        outShiftLeft1.name = 'REG.4'

        // Add
        const inAdd0_0 = this.adds[0].getPort('input-Top')
        const inAdd0_1 = this.adds[0].getPort('input-Bottom')
        const outAdd0 = this.adds[0].getPort('output')
        outAdd0.name = 'IF.1'
        const inAdd1_0 = this.adds[1].getPort('input-Top')
        const inAdd1_1 = this.adds[1].getPort('input-Bottom')
        const outAdd1 = this.adds[1].getPort('output')
        outAdd1.name = 'REG.5'
        const inAdd2_0 = this.adds[2].getPort('input-Top')
        const inAdd2_1 = this.adds[2].getPort('input-Bottom')
        const outAdd2 = this.adds[2].getPort('output')
        outAdd2.name = 'REG.6'
        const inAdd3_0 = this.adds[3].getPort('input-Top')
        const inAdd3_1 = this.adds[3].getPort('input-Bottom')
        const outAdd3 = this.adds[3].getPort('output')
        outAdd3.name = 'EX.26'

        // Detection
        const inDetec_0 = this.detection.getPort('input-0')
        const inDetec_1 = this.detection.getPort('input-1')
        const inDetec_2 = this.detection.getPort('input-2')
        const inDetec_control = this.detection.getPort('input-control')
        const outDetec = this.detection.getPort('output')
        outDetec.name = 'blocking'

        // Forwarding
        const inForward_rs1 = this.forwarding.getPort('input-rs1')
        const inForward_rs2 = this.forwarding.getPort('input-rs2')
        const inForward_control = this.forwarding.getPort('input-control')
        const inForward_w_reg1 = this.forwarding.getPort('input-w_reg1')
        const inForward_w_reg2 = this.forwarding.getPort('input-w_reg2')
        const outForward_0 = this.forwarding.getPort('output-0')
        const outForward_1 = this.forwarding.getPort('output-1')
        outForward_0.name = 'EX.fwd1'
        outForward_1.name = 'EX.fwd2'

        // Section 1
        const buffer0__section0 = this.buffers[0].getSection(0)

        const inBuffer0__section0__add = buffer0__section0.getPort('input-Add')
        const inBuffer0__section0__pc = buffer0__section0.getPort('input-PC')
        const inBuffer0__section0__ins = buffer0__section0.getPort('input-Instruction')
        const outBuffer0__section0__add = buffer0__section0.getPort('output-Add')
        const outBuffer0__section0__pc = buffer0__section0.getPort('output-PC')
        const outBuffer0__section0__ins = buffer0__section0.getPort('output-Instruction')
        outBuffer0__section0__add.name = 'REG.11'
        outBuffer0__section0__pc.name = 'REG.9'
        outBuffer0__section0__ins.name = 'REG.3'

        this.createLink(outMux0, inMux1_0)
        this.createLink(outMux1, inPC)
        const pcPort1 = this.links.createPort(outPC.x + 1, outPC.y)
        const pcPort2 = this.links.createPort(pcPort1.x, this.pc.y)
        this.createLink(outPC, pcPort1)
        this.createLink(pcPort1, inImem)
        this.createLink(pcPort1, pcPort2)
        this.createLink(pcPort2, inAdd0_0, [[pcPort2.x, inAdd0_0.y]])
        this.createLink(pcPort2, inBuffer0__section0__pc)

        const addPort0 = this.links.createPort(outAdd0.x + 1, outAdd0.y)
        this.createLink(con4, inAdd0_1)
        this.createLink(outAdd0, addPort0)
        this.createLink(addPort0, inBuffer0__section0__add)
        this.createLink(addPort0, inMux0_0, [
            [addPort0.x, this.adds[0].y - 1],
            [inMux0_0.x - 1, this.adds[0].y - 1],
            [inMux0_0.x - 1, inMux0_0.y],
        ])
        this.createLink(outImem, inBuffer0__section0__ins)

        // Section 2
        const buffer1__section0 = this.buffers[1].getSection(0)
        const buffer1__section1 = this.buffers[1].getSection(1)
        const buffer1__section2 = this.buffers[1].getSection(2)
        const buffer1__section3 = this.buffers[1].getSection(3)
        const inBuffer1__section0__wb = buffer1__section0.getPort('input-WB')
        const inBuffer1__section1__mem = buffer1__section1.getPort('input-MEM')
        const inBuffer1__section2__ex = buffer1__section2.getPort('input-EX')
        const inBuffer1__section3__pc4 = buffer1__section3.getPort('input-PC4')
        const inBuffer1__section3__pc = buffer1__section3.getPort('input-PC')
        const inBuffer1__section3__readData1 = buffer1__section3.getPort('input-ReadData1')
        const inBuffer1__section3__readData2 = buffer1__section3.getPort('input-ReadData2')
        const inBuffer1__section3__immGen = buffer1__section3.getPort('input-ImmGen')
        const inBuffer1__section3__funct3_7 = buffer1__section3.getPort('input-Funct3_7')

        const detectionPort0 = this.links.createPort(outDetec.x - 3.5, outDetec.y, {
            color: Scene.CONTROL_COLOR,
        })
        this.createLink(outDetec, detectionPort0, [], { color: Scene.CONTROL_COLOR })
        this.createLink(
            detectionPort0,
            inMux2_control,
            [
                [detectionPort0.x, detectionPort0.y - 1],
                [inMux2_control.x, detectionPort0.y - 1],
            ],
            { color: Scene.CONTROL_COLOR, speed: HIGH_SPEED },
        )
        this.createLink(detectionPort0, conPC, [[conPC.x, detectionPort0.y]], {
            color: Scene.CONTROL_COLOR,
            speed: HIGH_SPEED,
        })

        this.createLink(outBuffer0__section0__add, inBuffer1__section3__pc4)

        const pcPort3 = this.links.createPort(
            outBuffer0__section0__pc.x + 1,
            outBuffer0__section0__pc.y,
        )
        this.createLink(outBuffer0__section0__pc, pcPort3)
        this.createLink(pcPort3, inAdd2_0, [[pcPort3.x, inAdd2_0.y]])
        this.createLink(pcPort3, inBuffer1__section3__pc)

        const insPort0 = this.links.createPort(
            outBuffer0__section0__ins.x + 3,
            outBuffer0__section0__ins.y,
        )
        const insPort1 = this.links.createPort(insPort0.x, inReg2.y)
        const insPort2 = this.links.createPort(insPort0.x, inReg1.y)
        const insPort3 = this.links.createPort(insPort0.x, inBranch_Ins.y)
        const insPort4 = this.links.createPort(insPort0.x, inControl.y)
        const insPort5 = this.links.createPort(insPort0.x, inDetec_1.y)
        const insPort6 = this.links.createPort(insPort0.x, inImmGen.y)

        this.createLink(outBuffer0__section0__ins, insPort0)
        this.createLink(insPort0, insPort1)
        this.createLink(insPort1, insPort2)
        this.createLink(insPort2, insPort3)
        this.createLink(insPort3, insPort4)
        this.createLink(insPort4, insPort5)
        this.createLink(insPort0, insPort6)

        this.createLink(insPort1, inReg2)
        this.createLink(insPort2, inReg1)
        this.createLink(insPort3, inBranch_Ins)
        this.createLink(insPort4, inControl)
        this.createLink(insPort5, inDetec_1)
        this.createLink(insPort5, inDetec_0, [[insPort5.x, inDetec_0.y]])
        this.createLink(insPort6, inImmGen)

        this.createLink(outControl, inMux2_0, [], { color: Scene.CONTROL_COLOR })
        this.createLink(conControl, inMux2_1, [], { color: Scene.CONTROL_COLOR })
        const mux2Port0 = this.links.createPort(outMux2.x + 1, outMux2.y, {
            color: Scene.CONTROL_COLOR,
        })
        const mux2Port1 = this.links.createPort(mux2Port0.x, inBuffer1__section1__mem.y, {
            color: Scene.CONTROL_COLOR,
        })
        mux2Port1.name = 'REG.MEM'

        this.createLink(outMux2, mux2Port0, [], { color: Scene.CONTROL_COLOR })
        this.createLink(mux2Port0, mux2Port1, [], { color: Scene.CONTROL_COLOR })
        this.createLink(mux2Port1, inBuffer1__section1__mem, [], {
            color: Scene.CONTROL_COLOR,
        })

        // Create link for control input branch unit block
        const mux2Port3 = this.links.createPort(mux2Port0.x, inBranch_Slt.y - 5.5, {
            color: Scene.CONTROL_COLOR,
        })
        const mux2Port4 = this.links.createPort(inBranch_Jump.x, mux2Port3.y, {
            color: Scene.CONTROL_COLOR,
        })
        mux2Port4.name = 'REG.jump'
        const mux2Port5 = this.links.createPort(inBranch_MemToReg.x, mux2Port3.y, {
            color: Scene.CONTROL_COLOR,
        })
        mux2Port5.name = 'REG.MemtoReg'
        const mux2Port6 = this.links.createPort(inBranch_Jal.x, mux2Port3.y, {
            color: Scene.CONTROL_COLOR,
        })
        mux2Port6.name = 'REG.jal'
        const mux2Port7 = this.links.createPort(inBranch_Branch.x, mux2Port3.y, {
            color: Scene.CONTROL_COLOR,
        })
        mux2Port7.name = 'REG.branch'
        const mux2Port8 = this.links.createPort(mux2Port0.x, inBuffer1__section2__ex.y, {
            color: Scene.CONTROL_COLOR,
        })
        mux2Port8.name = 'REG.EX'
        const mux2Port9 = this.links.createPort(mux2Port0.x, inBuffer1__section0__wb.y, {
            color: Scene.CONTROL_COLOR,
        })
        mux2Port9.name = 'REG.WB'
        const mux2Port10 = this.links.createPort(inBranch_Wb.x, mux2Port3.y, {
            color: Scene.CONTROL_COLOR,
        })
        mux2Port10.name = 'REG.wb'
        const mux2Port11 = this.links.createPort(inBranch_Slt.x, mux2Port3.y, {
            color: Scene.CONTROL_COLOR,
        })
        mux2Port11.name = 'REG.slt'
        const mux2Port12 = this.links.createPort(inBranch_Jalr.x, mux2Port3.y, {
            color: Scene.CONTROL_COLOR,
        })
        mux2Port12.name = 'REG.jalr'

        this.createLink(mux2Port0, mux2Port3, [], { color: Scene.CONTROL_COLOR })
        this.createLink(mux2Port0, mux2Port8, [], { color: Scene.CONTROL_COLOR })
        this.createLink(mux2Port0, mux2Port9, [], { color: Scene.CONTROL_COLOR })
        this.createLink(mux2Port3, mux2Port4, [], { color: Scene.CONTROL_COLOR })
        this.createLink(mux2Port3, mux2Port5, [], { color: Scene.CONTROL_COLOR })
        this.createLink(mux2Port3, mux2Port6, [], { color: Scene.CONTROL_COLOR })
        this.createLink(mux2Port3, mux2Port7, [], { color: Scene.CONTROL_COLOR })
        this.createLink(mux2Port3, mux2Port10, [], { color: Scene.CONTROL_COLOR })
        this.createLink(mux2Port3, mux2Port11, [], { color: Scene.CONTROL_COLOR })
        this.createLink(mux2Port3, mux2Port12, [], { color: Scene.CONTROL_COLOR })

        this.createLink(mux2Port8, inBuffer1__section2__ex, [], {
            color: Scene.CONTROL_COLOR,
        })
        this.createLink(mux2Port9, inBuffer1__section0__wb, [], {
            color: Scene.CONTROL_COLOR,
        })
        this.createLink(mux2Port10, inBranch_Wb, [], { color: Scene.CONTROL_COLOR })
        this.createLink(mux2Port4, inBranch_Jump, [], { color: Scene.CONTROL_COLOR })
        this.createLink(mux2Port11, inBranch_Slt, [], { color: Scene.CONTROL_COLOR })
        this.createLink(mux2Port5, inBranch_MemToReg, [], {
            color: Scene.CONTROL_COLOR,
        })
        this.createLink(mux2Port6, inBranch_Jal, [], { color: Scene.CONTROL_COLOR })
        this.createLink(mux2Port7, inBranch_Branch, [], { color: Scene.CONTROL_COLOR })
        this.createLink(mux2Port12, inBranch_Jalr, [], { color: Scene.CONTROL_COLOR })

        this.createLink(
            outBranch_PcSrc2,
            inMux1_control,
            [
                [outBranch_PcSrc2.x + 1, outBranch_PcSrc2.y],
                [outBranch_PcSrc2.x + 1, this.detection.y - 1],
                [inMux1_control.x, this.detection.y - 1],
            ],
            { color: Scene.CONTROL_COLOR, speed: HIGH_SPEED },
        )
        this.createLink(
            outBranch_PcSrc1,
            inMux0_control,
            [
                [outBranch_PcSrc1.x + 1.5, outBranch_PcSrc1.y],
                [outBranch_PcSrc1.x + 1.5, this.detection.y - 1.5],
                [inMux0_control.x, this.detection.y - 1.5],
            ],
            { color: Scene.CONTROL_COLOR, speed: HIGH_SPEED },
        )

        // Create link from ImmGen
        const immGenPort0 = this.links.createPort(outImmGen.x + 1, outImmGen.y)
        const immGenPort1 = this.links.createPort(immGenPort0.x, inAdd1_1.y)
        this.createLink(outImmGen, immGenPort0)
        this.createLink(immGenPort0, inBuffer1__section3__immGen, [
            [immGenPort0.x, inBuffer1__section3__immGen.y],
        ])
        this.createLink(immGenPort0, immGenPort1)
        this.createLink(immGenPort1, inAdd1_1)
        this.createLink(immGenPort1, inShiftLeft1, [[immGenPort1.x, inShiftLeft1.y]])

        this.createLink(insPort6, inBuffer1__section3__funct3_7, [
            [insPort6.x, this.immGen.y + this.immGen.height + 1],
            [outImmGen.x + 2.5, this.immGen.y + this.immGen.height + 1],
            [outImmGen.x + 2.5, inBuffer1__section3__funct3_7.y],
        ])
        this.createLink(outShiftLeft1, inAdd2_1)

        const readData1Port0 = this.links.createPort(inBranch_Bot0.x, outReg1.y)
        const readData2Port0 = this.links.createPort(inBranch_Bot1.x, outReg2.y)
        this.createLink(outReg1, readData1Port0)
        this.createLink(readData1Port0, inBranch_Bot0)
        this.createLink(readData1Port0, inAdd1_0, [[readData1Port0.x, inAdd1_0.y]])
        this.createLink(readData1Port0, inBuffer1__section3__readData1)
        this.createLink(outReg2, readData2Port0)
        this.createLink(readData2Port0, inBranch_Bot1)
        this.createLink(readData2Port0, inBuffer1__section3__readData2)

        this.createLink(outAdd1, inMux1_1, [
            [outAdd1.x + 1, outAdd1.y],
            [outAdd1.x + 1, this.shiftLeft.y + this.shiftLeft.height + 0.5],
            [inMux1_1.x - 1, this.shiftLeft.y + this.shiftLeft.height + 0.5],
            [inMux1_1.x - 1, inMux1_1.y],
        ])
        this.createLink(outAdd2, inMux0_1, [
            [outAdd2.x + 1.5, outAdd2.y],
            [outAdd2.x + 1.5, this.shiftLeft.y + this.shiftLeft.height + 1],
            [inMux0_1.x - 1, this.shiftLeft.y + this.shiftLeft.height + 1],
            [inMux0_1.x - 1, inMux0_1.y],
        ])

        // Section 3
        // Get port from Buffer 1
        const outBuffer1__section0__wb = buffer1__section0.getPort('output-WB')
        const outBuffer1__section1__mem = buffer1__section1.getPort('output-MEM')
        const outBuffer1__section2__auiOrLui = buffer1__section2.getPort('output-AuiOrLui')
        const outBuffer1__section2__aluSrc = buffer1__section2.getPort('output-ALUSrc')
        const outBuffer1__section2__aluOp = buffer1__section2.getPort('output-ALUOp')
        const outBuffer1__section3__pc4 = buffer1__section3.getPort('output-PC4')
        const outBuffer1__section3__pc = buffer1__section3.getPort('output-PC')
        const outBuffer1__section3__readData1 = buffer1__section3.getPort('output-ReadData1')
        const outBuffer1__section3__readData2 = buffer1__section3.getPort('output-ReadData2')
        const outBuffer1__section3__immGen = buffer1__section3.getPort('output-ImmGen')
        const outBuffer1__section3__funct3_7 = buffer1__section3.getPort('output-Funct3_7')
        const outBuffer1__section3__w_reg = buffer1__section3.getPort('output-W_reg')
        const outBuffer1__section3__rs1 = buffer1__section3.getPort('output-RS1')
        const outBuffer1__section3__rs2 = buffer1__section3.getPort('output-RS2')
        outBuffer1__section0__wb.name = 'EX.WB'
        outBuffer1__section1__mem.name = 'EX.MEM'
        outBuffer1__section2__auiOrLui.name = 'EX.AuiOrLui'
        outBuffer1__section2__aluSrc.name = 'EX.ALUSrc'
        outBuffer1__section2__aluOp.name = 'EX.ALUop'
        outBuffer1__section3__pc4.name = 'EX.14'
        outBuffer1__section3__pc.name = 'EX.15'
        outBuffer1__section3__readData1.name = 'EX.17'
        outBuffer1__section3__readData2.name = 'EX.18'
        outBuffer1__section3__immGen.name = 'EX.16'
        outBuffer1__section3__funct3_7.name = 'EX.19'
        outBuffer1__section3__w_reg.name = 'EX.27'
        outBuffer1__section3__rs1.name = 'EX.28'
        outBuffer1__section3__rs2.name = 'EX.28'

        const buffer2__section0 = this.buffers[2].getSection(0)
        const buffer2__section1 = this.buffers[2].getSection(1)
        const buffer2__section2 = this.buffers[2].getSection(2)
        const inBuffer2__section0__wb = buffer2__section0.getPort('input-WB')
        const inBuffer2__section1__mem = buffer2__section1.getPort('input-MEM')
        const inBuffer2__section2__pc4 = buffer2__section2.getPort('input-PC4')
        const inBuffer2__section2__auiOrLui = buffer2__section2.getPort('input-AuiOrLui')
        const inBuffer2__section2__slt = buffer2__section2.getPort('input-Slt')
        const inBuffer2__section2__aluResult = buffer2__section2.getPort('input-ALUResult')
        const inBuffer2__section2__readData2 = buffer2__section2.getPort('input-ReadData2')
        const inBuffer2__section2__w_reg = buffer2__section2.getPort('input-W_reg')

        this.createLink(outBuffer1__section0__wb, inBuffer2__section0__wb, [], {
            color: Scene.CONTROL_COLOR,
        })
        const bufferMemPort0 = this.links.createPort(
            outBuffer1__section1__mem.x + 4,
            outBuffer1__section1__mem.y,
            { color: Scene.CONTROL_COLOR },
        )
        this.createLink(outBuffer1__section1__mem, bufferMemPort0, [], {
            color: Scene.CONTROL_COLOR,
        })
        this.createLink(bufferMemPort0, inBuffer2__section1__mem, [], {
            color: Scene.CONTROL_COLOR,
        })
        this.createLink(bufferMemPort0, inDetec_control, [[bufferMemPort0.x, inDetec_control.y]], {
            color: Scene.CONTROL_COLOR,
        })

        this.createLink(
            outBuffer1__section2__auiOrLui,
            inMux5_control,
            [[inMux5_control.x, outBuffer1__section2__auiOrLui.y]],
            { color: Scene.CONTROL_COLOR },
        )
        this.createLink(
            outBuffer1__section2__aluSrc,
            inMux3_control,
            [[inMux3_control.x, outBuffer1__section2__aluSrc.y]],
            { color: Scene.CONTROL_COLOR },
        )
        this.createLink(
            outBuffer1__section2__aluOp,
            inALUCon2,
            [
                [outBuffer1__section2__aluOp.x + 1.5, outBuffer1__section2__aluOp.y],
                [outBuffer1__section2__aluOp.x + 1.5, inALUCon2.y],
            ],
            { color: Scene.CONTROL_COLOR },
        )

        this.createLink(outBuffer1__section3__pc4, inBuffer2__section2__pc4)
        this.createLink(outBuffer1__section3__pc, inAdd3_0, [
            [outBuffer1__section3__pc.x + 0.5, outBuffer1__section3__pc.y],
            [outBuffer1__section3__pc.x + 0.5, inAdd3_0.y],
        ])
        this.createLink(outBuffer1__section3__readData1, inMuxSix0_3)
        this.createLink(outBuffer1__section3__readData2, inMuxSix1_0)

        const immGenPort2 = this.links.createPort(outBuffer1__section3__immGen.x + 1, inMux3_0.y)
        this.createLink(outBuffer1__section3__immGen, immGenPort2, [
            [immGenPort2.x, outBuffer1__section3__immGen.y],
        ])
        this.createLink(immGenPort2, inShiftLeft12, [[immGenPort2.x, inShiftLeft12.y]])
        this.createLink(immGenPort2, inMux3_0)

        this.createLink(outBuffer1__section3__funct3_7, inALUCon1)

        const w_regPort0 = this.links.createPort(inMuxSix0_0.x, outBuffer1__section3__w_reg.y)
        this.createLink(outBuffer1__section3__w_reg, w_regPort0)
        this.createLink(w_regPort0, inBuffer2__section2__w_reg)

        this.createLink(outBuffer1__section3__rs1, inForward_rs1, [
            [inMuxSix1_0.x, outBuffer1__section3__rs1.y],
            [inMuxSix1_0.x, inForward_rs1.y],
        ])
        this.createLink(outBuffer1__section3__rs2, inForward_rs2, [
            [inMuxSix1_0.x - 0.5, outBuffer1__section3__rs2.y],
            [inMuxSix1_0.x - 0.5, inForward_rs2.y],
        ])

        // Link Block to Block
        const shiftLeft12Port0 = this.links.createPort(outShiftLeft12.x + 0.75, outShiftLeft12.y)
        this.createLink(outShiftLeft12, shiftLeft12Port0)
        this.createLink(shiftLeft12Port0, inAdd3_1)
        this.createLink(shiftLeft12Port0, inMux5_1, [
            [shiftLeft12Port0.x, shiftLeft12Port0.y + 1.5],
            [inMux5_1.x - 2, shiftLeft12Port0.y + 1.5],
            [inMux5_1.x - 2, inMux5_1.y],
        ])
        this.createLink(outAdd3, inMux5_0)
        this.createLink(outMux5, inBuffer2__section2__auiOrLui)
        this.createLink(con1, inMux4_1)
        this.createLink(con0, inMux4_0)
        this.createLink(outMux4, inBuffer2__section2__slt)
        this.createLink(outMuxSix0, inALU1)
        const muxSix1Port0 = this.links.createPort(outMuxSix1.x + 1.5, outMuxSix1.y)
        this.createLink(outMuxSix1, muxSix1Port0)
        this.createLink(muxSix1Port0, inMux3_1)
        this.createLink(muxSix1Port0, inBuffer2__section2__readData2, [
            [muxSix1Port0.x, this.aluControl.y + this.aluControl.height + 0.5],
            [
                inBuffer2__section2__readData2.x - 4,
                this.aluControl.y + this.aluControl.height + 0.5,
            ],
            [inBuffer2__section2__readData2.x - 4, inBuffer2__section2__readData2.y],
        ])
        this.createLink(outMux3, inALU2, [
            [outMux3.x + 1, outMux3.y],
            [outMux3.x + 1, inALU2.y],
        ])
        this.createLink(outALUCon, inALU_control, [[inALU_control.x, outALUCon.y]], {
            color: Scene.CONTROL_COLOR,
        })
        this.createLink(outALUSignBit, inMux4_control, [[inMux4_control.x, outALUSignBit.y]], {
            color: Scene.CONTROL_COLOR,
        })
        this.createLink(outALUResult, inBuffer2__section2__aluResult)

        this.createLink(outForward_0, inMuxSix0_control, [[inMuxSix0_control.x, outForward_0.y]], {
            color: Scene.CONTROL_COLOR,
        })
        this.createLink(outForward_1, inMuxSix1_control, [[inMuxSix1_control.x, outForward_1.y]], {
            color: Scene.CONTROL_COLOR,
        })

        // Section 4
        // Get output port from Buffer_03
        const outBuffer2__section0__wb = buffer2__section0.getPort('output-WB')
        const outBuffer2__section1__MemWrite = buffer2__section1.getPort('output-MemWrite')
        const outBuffer2__section1__Unsigned = buffer2__section1.getPort('output-Unsigned')
        const outBuffer2__section1__MemRead = buffer2__section1.getPort('output-MemRead')
        const outBuffer2__section2__PC4 = buffer2__section2.getPort('output-PC4')
        const outBuffer2__section2__AuiOrLui = buffer2__section2.getPort('output-AuiOrLui')
        const outBuffer2__section2__Slt = buffer2__section2.getPort('output-Slt')
        const outBuffer2__section2__ALUResult = buffer2__section2.getPort('output-ALUResult')
        const outBuffer2__section2__ReadData2 = buffer2__section2.getPort('output-ReadData2')
        const outBuffer2__section2__W_reg = buffer2__section2.getPort('output-W_reg')
        outBuffer2__section0__wb.name = 'MEM.WB'
        outBuffer2__section1__MemRead.name = 'MEM.MemRead'
        outBuffer2__section1__MemWrite.name = 'MEM.MemWrite'
        outBuffer2__section1__Unsigned.name = 'MEM.Unsigned'
        outBuffer2__section2__PC4.name = 'MEM.34'
        outBuffer2__section2__AuiOrLui.name = 'MEM.33'
        outBuffer2__section2__Slt.name = 'MEM.32'
        outBuffer2__section2__ALUResult.name = 'MEM.31'
        outBuffer2__section2__ReadData2.name = 'MEM.30'
        outBuffer2__section2__W_reg.name = 'MEM.29'

        // Get input port from Buffer_04
        const buffer3__section0 = this.buffers[3].getSection(0)
        const buffer3__section1 = this.buffers[3].getSection(1)
        const inBuffer3__section0__WB = buffer3__section0.getPort('input-WB')
        const inBuffer3__section1__PC4 = buffer3__section1.getPort('input-PC4')
        const inBuffer3__section1__AuiOrLui = buffer3__section1.getPort('input-AuiOrLui')
        const inBuffer3__section1__Slt = buffer3__section1.getPort('input-Slt')
        const inBuffer3__section1__Data = buffer3__section1.getPort('input-Data')
        const inBuffer3__section1__ALUResult = buffer3__section1.getPort('input-ALUResult')
        const inBuffer3__section1__W_reg = buffer3__section1.getPort('input-W_reg')

        const wbPort0 = this.links.createPort(outDataGen.x + 2, outBuffer2__section0__wb.y, {
            color: Scene.CONTROL_COLOR,
        })
        this.createLink(outBuffer2__section0__wb, wbPort0, [], {
            color: Scene.CONTROL_COLOR,
        })
        this.createLink(wbPort0, inBuffer3__section0__WB, [], {
            color: Scene.CONTROL_COLOR,
        })
        this.createLink(
            outBuffer2__section1__MemWrite,
            inDmem_MemWrite,
            [[inDmem_MemWrite.x, outBuffer2__section1__MemWrite.y]],
            {
                color: Scene.CONTROL_COLOR,
            },
        )
        this.createLink(
            outBuffer2__section1__Unsigned,
            inDataGenUnsigned,
            [[inDataGenUnsigned.x, outBuffer2__section1__Unsigned.y]],
            {
                color: Scene.CONTROL_COLOR,
            },
        )
        this.createLink(
            outBuffer2__section1__MemRead,
            inDmem_MemRead,
            [
                [outDmem.x + 1, outBuffer2__section1__MemRead.y],
                [outDmem.x + 1, inDmem_MemRead.y + 1],
                [inDmem_MemRead.x, inDmem_MemRead.y + 1],
            ],
            {
                color: Scene.CONTROL_COLOR,
            },
        )

        const pc4Port0 = this.links.createPort(
            outBuffer2__section2__PC4.x + 5,
            outBuffer2__section2__PC4.y,
        )
        const auiOrLuiPort0 = this.links.createPort(
            outBuffer2__section2__AuiOrLui.x + 4,
            outBuffer2__section2__AuiOrLui.y,
        )
        const sltPort0 = this.links.createPort(
            outBuffer2__section2__Slt.x + 3,
            outBuffer2__section2__Slt.y,
        )
        const aluResultPort0 = this.links.createPort(
            outBuffer2__section2__ALUResult.x + 2,
            outBuffer2__section2__ALUResult.y,
        )
        const aluResultPort1 = this.links.createPort(
            aluResultPort0.x,
            inBuffer3__section1__ALUResult.y,
        )
        const w_regPort1 = this.links.createPort(
            outBuffer2__section2__W_reg.x + 1,
            outBuffer2__section2__W_reg.y,
        )
        const w_regPort2 = this.links.createPort(w_regPort1.x, inForward_w_reg1.y)

        this.createLink(outBuffer2__section2__PC4, pc4Port0)
        this.createLink(pc4Port0, inBuffer3__section1__PC4)
        this.createLink(outBuffer2__section2__AuiOrLui, auiOrLuiPort0)
        this.createLink(auiOrLuiPort0, inBuffer3__section1__AuiOrLui)
        this.createLink(outBuffer2__section2__Slt, sltPort0)
        this.createLink(sltPort0, inBuffer3__section1__Slt)
        this.createLink(outBuffer2__section2__ALUResult, aluResultPort0)
        this.createLink(aluResultPort0, inDMem1)
        this.createLink(aluResultPort0, aluResultPort1)
        this.createLink(aluResultPort1, inBuffer3__section1__ALUResult)
        this.createLink(outBuffer2__section2__ReadData2, inDMem2)
        this.createLink(outBuffer2__section2__W_reg, w_regPort1)
        this.createLink(w_regPort1, inBuffer3__section1__W_reg)

        // Link Blocks
        this.createLink(outDmem, inDataGen)
        const dataGenPort0 = this.links.createPort(outDataGen.x + 1, outDataGen.y)
        this.createLink(outDataGen, dataGenPort0)
        this.createLink(dataGenPort0, inBuffer3__section1__Data)

        // Link to other section
        // Link section 4 to section 3
        this.createLink(wbPort0, inForward_control, [[wbPort0.x, inForward_control.y]], {
            color: Scene.CONTROL_COLOR,
            speed: HIGH_SPEED,
        })

        const pc4Port1 = this.links.createPort(
            outBuffer1__section3__pc.x + 2.5,
            this.forwarding.y + this.forwarding.height + 4,
        )
        const auiOrLuiPort1 = this.links.createPort(pc4Port1.x + 0.5, pc4Port1.y - 0.5)
        const sltPort1 = this.links.createPort(auiOrLuiPort1.x + 0.5, auiOrLuiPort1.y - 0.5)
        const aluResultPort2 = this.links.createPort(sltPort1.x + 0.5, sltPort1.y - 0.5)

        const pc4Port2 = this.links.createPort(pc4Port1.x, inMuxSix1_4.y)
        const auiOrLuiPort2 = this.links.createPort(auiOrLuiPort1.x, inMuxSix1_3.y)
        const sltPort2 = this.links.createPort(sltPort1.x, inMuxSix1_2.y)
        const aluResultPort3 = this.links.createPort(aluResultPort2.x, inMuxSix1_1.y)

        this.createLink(pc4Port0, pc4Port1, [[pc4Port0.x, pc4Port1.y]])
        this.createLink(auiOrLuiPort0, auiOrLuiPort1, [[auiOrLuiPort0.x, auiOrLuiPort1.y]])
        this.createLink(sltPort0, sltPort1, [[sltPort0.x, sltPort1.y]])
        this.createLink(aluResultPort1, aluResultPort2, [[aluResultPort1.x, aluResultPort2.y]])

        this.createLink(pc4Port1, pc4Port2, [[pc4Port1.x, pc4Port2.y]])
        this.createLink(auiOrLuiPort1, auiOrLuiPort2, [[auiOrLuiPort1.x, auiOrLuiPort2.y]])
        this.createLink(sltPort1, sltPort2, [[sltPort1.x, sltPort2.y]])
        this.createLink(aluResultPort2, aluResultPort3, [[aluResultPort2.x, aluResultPort3.y]])

        this.createLink(pc4Port2, inMuxSix1_4)
        this.createLink(auiOrLuiPort2, inMuxSix1_3)
        this.createLink(sltPort2, inMuxSix1_2)
        this.createLink(aluResultPort3, inMuxSix1_1)

        this.createLink(pc4Port2, inMuxSix0_4, [[pc4Port2.x, inMuxSix0_4.y]])
        this.createLink(auiOrLuiPort2, inMuxSix0_2, [[auiOrLuiPort2.x, inMuxSix0_2.y]])
        this.createLink(sltPort2, inMuxSix0_1, [[sltPort2.x, inMuxSix0_1.y]])
        this.createLink(aluResultPort3, inMuxSix0_0, [[aluResultPort3.x, inMuxSix0_0.y]])
        this.createLink(w_regPort1, w_regPort2)
        this.createLink(w_regPort2, inForward_w_reg1)

        // Link section 4 to section 2
        this.createLink(
            pc4Port1,
            inBranch_Bot4,
            [
                [outAdd1.x + 3, pc4Port1.y],
                [outAdd1.x + 3, this.adds[1].y - 1.5],
                [inBranch_Bot4.x, this.adds[1].y - 1.5],
            ],
            { speed: HIGH_SPEED },
        )
        this.createLink(auiOrLuiPort1, inBranch_Bot5, [
            [outAdd1.x + 3.5, auiOrLuiPort1.y],
            [outAdd1.x + 3.5, this.adds[1].y - 2],
            [inBranch_Bot5.x, this.adds[1].y - 2],
        ])
        this.createLink(sltPort1, inBranch_Bot6, [
            [outAdd1.x + 4, sltPort1.y],
            [outAdd1.x + 4, this.adds[1].y - 2.5],
            [inBranch_Bot6.x, this.adds[1].y - 2.5],
        ])
        this.createLink(aluResultPort2, inBranch_Bot7, [
            [outAdd1.x + 4.5, aluResultPort2.y],
            [outAdd1.x + 4.5, this.adds[1].y - 3],
            [inBranch_Bot7.x, this.adds[1].y - 3],
        ])
        this.createLink(w_regPort2, inBranch_Bot8, [
            [w_regPort2.x, aluResultPort2.y - 0.5],
            [outAdd1.x + 5, aluResultPort2.y - 0.5],
            [outAdd1.x + 5, this.adds[1].y - 3.5],
            [inBranch_Bot8.x, this.adds[1].y - 3.5],
        ])
        this.createLink(
            dataGenPort0,
            inBranch_Bot3,
            [
                [dataGenPort0.x, pc4Port1.y + 0.5],
                [outAdd1.x + 2.5, pc4Port1.y + 0.5],
                [outAdd1.x + 2.5, this.adds[1].y - 1],
                [inBranch_Bot3.x, this.adds[1].y - 1],
            ],
            { speed: HIGH_SPEED },
        )
        const w_regPort3 = this.links.createPort(outAdd1.x + 2, pc4Port1.y + 1)
        this.createLink(w_regPort0, w_regPort3, [[w_regPort0.x, w_regPort3.y]])
        this.createLink(w_regPort3, inBranch_Bot2, [
            [w_regPort3.x, this.adds[1].y - 0.5],
            [inBranch_Bot2.x, this.adds[1].y - 0.5],
        ])
        this.createLink(w_regPort3, inDetec_2, [
            [w_regPort3.x, this.shiftLeft.y + this.shiftLeft.height + 1.5],
            [insPort0.x - 1, this.shiftLeft.y + this.shiftLeft.height + 1.5],
            [insPort0.x - 1, inDetec_2.y],
        ])

        // Section 5
        // Get output ports from Buffer_04
        const outBuffer3__section0__RegWrite = buffer3__section0.getPort('output-RegWrite')
        const outBuffer3__section0__Wb = buffer3__section0.getPort('output-Wb')
        const outBuffer3__section0__Slt = buffer3__section0.getPort('output-Slt')
        const outBuffer3__section0__Jump = buffer3__section0.getPort('output-Jump')
        const outBuffer3__section0__MemtoReg = buffer3__section0.getPort('output-MemtoReg')
        const outBuffer3__section1__PC4 = buffer3__section1.getPort('output-PC4')
        const outBuffer3__section1__AuiOrLui = buffer3__section1.getPort('output-AuiOrLui')
        const outBuffer3__section1__Slt = buffer3__section1.getPort('output-Slt')
        const outBuffer3__section1__Data = buffer3__section1.getPort('output-Data')
        const outBuffer3__section1__ALUResult = buffer3__section1.getPort('output-ALUResult')
        const outBuffer3__section1__W_reg = buffer3__section1.getPort('output-W_reg')
        outBuffer3__section0__RegWrite.name = 'WB.RegWrite'
        outBuffer3__section0__Wb.name = 'WB.Wb'
        outBuffer3__section0__Slt.name = 'WB.Slt'
        outBuffer3__section0__Jump.name = 'WB.Jump'
        outBuffer3__section0__MemtoReg.name = 'WB.MemtoReg'
        outBuffer3__section1__PC4.name = 'WB.37'
        outBuffer3__section1__AuiOrLui.name = 'WB.38'
        outBuffer3__section1__Slt.name = 'WB.39'
        outBuffer3__section1__Data.name = 'WB.40'
        outBuffer3__section1__ALUResult.name = 'WB.41'
        outBuffer3__section1__W_reg.name = 'WB.46'

        this.createLink(
            outBuffer3__section0__RegWrite,
            inReg_control,
            [
                [outBuffer3__section0__RegWrite.x + 2, outBuffer3__section0__RegWrite.y],
                [outBuffer3__section0__RegWrite.x + 2, outBuffer3__section0__RegWrite.y - 5],
                [inReg_control.x, outBuffer3__section0__RegWrite.y - 5],
            ],
            { color: Scene.CONTROL_COLOR, speed: HIGH_SPEED },
        )
        this.createLink(
            outBuffer3__section0__Wb,
            inMux9_control,
            [[inMux9_control.x, outBuffer3__section0__Wb.y]],
            { color: Scene.CONTROL_COLOR },
        )
        this.createLink(
            outBuffer3__section0__Slt,
            inMux8_control,
            [[inMux8_control.x, outBuffer3__section0__Slt.y]],
            { color: Scene.CONTROL_COLOR },
        )
        this.createLink(
            outBuffer3__section0__Jump,
            inMux7_control,
            [[inMux7_control.x, outBuffer3__section0__Jump.y]],
            { color: Scene.CONTROL_COLOR },
        )
        this.createLink(
            outBuffer3__section0__MemtoReg,
            inMux6_control,
            [[inMux6_control.x, outBuffer3__section0__MemtoReg.y]],
            { color: Scene.CONTROL_COLOR },
        )

        this.createLink(outBuffer3__section1__PC4, inMux7_1, [
            [inMux7_1.x - 1, outBuffer3__section1__PC4.y],
            [inMux7_1.x - 1, inMux7_1.y],
        ])
        this.createLink(outBuffer3__section1__AuiOrLui, inMux9_1)
        this.createLink(outBuffer3__section1__Slt, inMux8_1)
        this.createLink(outBuffer3__section1__Data, inMux6_1)
        this.createLink(outBuffer3__section1__ALUResult, inMux6_0, [
            [outBuffer3__section1__ALUResult.x + 1, outBuffer3__section1__ALUResult.y],
            [outBuffer3__section1__ALUResult.x + 1, inMux6_0.y],
        ])
        this.createLink(outMux6, inMux7_0)
        this.createLink(outMux7, inMux8_0, [
            [outMux7.x + 1, outMux7.y],
            [outMux7.x + 1, inMux8_0.y],
        ])
        this.createLink(outMux8, inMux9_0, [
            [outMux8.x + 1, outMux8.y],
            [outMux8.x + 1, inMux9_0.y],
        ])

        // Link section 5 to section 3
        const w_regPort4 = this.links.createPort(
            outBuffer3__section1__W_reg.x + 4,
            outBuffer3__section1__W_reg.y,
        )
        this.createLink(outBuffer3__section1__W_reg, w_regPort4)
        this.createLink(w_regPort4, inForward_w_reg2, [[w_regPort4.x, inForward_w_reg2.y]], {
            speed: HIGH_SPEED,
        })
        this.createLink(
            w_regPort4,
            inReg4,
            [
                [w_regPort4.x + 2, w_regPort4.y],
                [w_regPort4.x + 2, this.shiftLeft.y + this.shiftLeft.height + 2],
                [inReg4.x - 1, this.shiftLeft.y + this.shiftLeft.height + 2],
                [inReg4.x - 1, inReg4.y],
            ],
            { speed: HIGH_SPEED },
        )

        const mux9Port0 = this.links.createPort(
            pc4Port1.x - 0.5,
            this.shiftLeft.y + this.shiftLeft.height + 2.5,
        )
        const mux9Port1 = this.links.createPort(mux9Port0.x, inMuxSix1_5.y)
        this.createLink(
            outMux9,
            mux9Port0,
            [
                [outMux9.x + 1, outMux9.y],
                [outMux9.x + 1, mux9Port0.y],
            ],
            { speed: HIGH_SPEED },
        )
        this.createLink(mux9Port0, mux9Port1, [], { speed: 0.03 })
        this.createLink(mux9Port1, inMuxSix1_5)
        this.createLink(mux9Port1, inMuxSix0_5, [[mux9Port1.x, inMuxSix0_5.y]])

        // Link section 5 to section 2
        this.createLink(
            mux9Port0,
            inReg3,
            [
                [inReg3.x - 1.5, mux9Port0.y],
                [inReg3.x - 1.5, inReg3.y],
            ],
            { speed: 0.03 },
        )
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
