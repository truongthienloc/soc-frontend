import MMU from './MMU'
import { dec, handleRegister } from './sub_function'
import { mux } from './sub_function'
import Master from './Master'
import {Logger } from './soc.d'
import Ecall from './Ecall/Ecall'

import ChannelD from './ChannelD'
import { measureMemory } from 'vm'
import { symlink, write } from 'fs'

export default class RiscVProcessor {
    name                        : string
    active                      : boolean
    master                      : Master
    register                    : { [key: string]: string }
    Data_memory                 : { [key: string]: string }
    Instruction_memory          : { [key: string]: string }
    MMU                         : MMU
    lineColor                   : { [key: string]: string }
    colorCode                   : { [key: string]: string }
    writeReg                    : string
    Processor_messeage          : string
    SendAddress                 : string
    SendData                    : string
    instruction                 : string
    state                       = 0
    pre_pc                      = 0
    pc                          = 0
    Ecall                       : Ecall

    ALUOp                       : any
    zero                        : any
    ALUSrc                      : any
    operation                   : any
    jal                         : any
    jalr                        : any
    branch                      : any
    memRead                     : any
    memWrite                    : any
    unsigned                    : any
    memToReg                    : any
    jump                        : any
    regWrite                    : any
    pcSrc1                      : any
    pcSrc2                      : any
    signBit                     : any
    slt                         : any
    auiOrLui                    : any
    wb                          : any
    imm                         : any
    stalled                     : any
    logger?: Logger

    public println(...args: string[]) {
        if (!this.logger) {
            return
        }
        this.logger.println(...args)
        //console.log(...args)
    }

    public setLogger(logger: Logger) {
        this.logger = logger
    }
    

    constructor(name: string, source: string, active: boolean) {
        this.name                       = name
        this.active                     = active
        this.master                     = new Master(name, true, source)
        this.MMU                        = new MMU   (active)
        this.writeReg                   = ''
        this.Processor_messeage         = ''
        this.SendAddress                = ''
        this.SendData                   = ''
        this.instruction                = ''

        this.Ecall                      = new Ecall

        this.colorCode = {
        'orange'  : 'FF8000',
        'red'     : 'FF0000',
        'yellow'  : 'FFFF00',
        'green'   : '00CC00',
        'pink'    : 'FF33FF',
        'blue'    : '3333FF',
        'purple'  : '6600CC',
        'brown'   : '994C00',
        }
        this.lineColor = {
        '0'         : this.colorCode['orange'], 
        '1'         : this.colorCode['red']   , 
        '2'         : this.colorCode['yellow'], 
        '3'         : ''      , 
        '4'         : this.colorCode['green'] , 
        '5'         : this.colorCode['pink']  , 
        '6'         : ''      , 
        '7'         : this.colorCode['green'] , 
        '8'         : this.colorCode['blue']  ,
        '9'         : ''      , 
        '10'        : ''      , 
        '11'        : ''      , 
        '12'        : ''      , 
        '13'        : this.colorCode['brown'] , 
        '14'        : this.colorCode['purple'], 
        '15'        : ''      , 
        '16'        : ''      , 
        '17'        : ''      ,
        'ALUOp'     : ''      ,
        'zero'      : ''      ,
        'ALUSrc'    : ''      ,   
        'operation' : ''      ,   
        'jal'       : ''      ,   
        'jalr'      : ''      ,   
        'branch'    : ''      ,   
        'memRead'   : ''      ,   
        'memWrite'  : ''      ,   
        'unsigned'  : ''      ,   
        'memToReg'  : ''      ,   
        'jump'      : ''      ,   
        'regWrite'  : ''      ,   
        'pcSrc1'    : ''      ,   
        'pcSrc2'    : ''      ,   
        'signBit'   : ''      ,   
        'slt'       : ''      ,   
        'auiOrLui'  : ''      ,   
        'wb'        : ''      ,   
        'imm'       : ''      ,   
        };  
        this.register = {
        '00000': '00000000000000000000000000000000',
        '00001': '00000000000000000000000000000000',
        '00010': '00000000000000000000000000000000',
        '00011': '00000000000000000000000000000000',
        '00100': '00000000000000000000000000000000',
        '00101': '00000000000000000000000000000000',
        '00110': '00000000000000000000000000000000',
        '00111': '00000000000000000000000000000000',
        '01000': '00000000000000000000000000000000',
        '01001': '00000000000000000000000000000000',
        '01010': '00000000000000000000000000000000',
        '01011': '00000000000000000000000000000000',
        '01100': '00000000000000000000000000000000',
        '01101': '00000000000000000000000000000000',
        '01110': '00000000000000000000000000000000',
        '01111': '00000000000000000000000000000000',
        '10000': '00000000000000000000000000000000',
        '10001': '00000000000000000000000000000000',
        '10010': '00000000000000000000000000000000',
        '10011': '00000000000000000000000000000000',
        '10100': '00000000000000000000000000000000',
        '10101': '00000000000000000000000000000000',
        '10110': '00000000000000000000000000000000',
        '10111': '00000000000000000000000000000000',
        '11000': '00000000000000000000000000000000',
        '11001': '00000000000000000000000000000000',
        '11010': '00000000000000000000000000000000',
        '11011': '00000000000000000000000000000000',
        '11100': '00000000000000000000000000000000',
        '11101': '00000000000000000000000000000000',
        '11110': '00000000000000000000000000000000',
        '11111': '00000000000000000000000000000000',
        }
        this.jal = 0
        this.jalr = 0
        this.branch = '000'
        this.auiOrLui = 0
        this.wb = 0
        this.memToReg = 0
        this.unsigned = 0
        this.memRead = '000'
        this.memWrite = '000'
        this.ALUSrc = 0
        this.regWrite = 0
        this.ALUOp = 'z'
        this.slt = 0
        this.Data_memory = {}
        this.Instruction_memory = {}
        this.pc = 0
        this.stalled = false
    }

    public getRegisters() {
        return handleRegister(this.register)
    }

    public setImem(binary_code: string[] = []) {
        if (this.active == true) {
            let pc_addr = 0
            for (let i of binary_code) {
                this.Instruction_memory[pc_addr.toString(2)] = i
                pc_addr += 4
            }
        }
    }

    public reset(): void {
        this.register = {
            '00000': '00000000000000000000000000000000',
            '00001': '00000000000000000000000000000000',
            '00010': '00000000000000000000000000000000',
            '00011': '00000000000000000000000000000000',
            '00100': '00000000000000000000000000000000',
            '00101': '00000000000000000000000000000000',
            '00110': '00000000000000000000000000000000',
            '00111': '00000000000000000000000000000000',
            '01000': '00000000000000000000000000000000',
            '01001': '00000000000000000000000000000000',
            '01010': '00000000000000000000000000000000',
            '01011': '00000000000000000000000000000000',
            '01100': '00000000000000000000000000000000',
            '01101': '00000000000000000000000000000000',
            '01110': '00000000000000000000000000000000',
            '01111': '00000000000000000000000000000000',
            '10000': '00000000000000000000000000000000',
            '10001': '00000000000000000000000000000000',
            '10010': '00000000000000000000000000000000',
            '10011': '00000000000000000000000000000000',
            '10100': '00000000000000000000000000000000',
            '10101': '00000000000000000000000000000000',
            '10110': '00000000000000000000000000000000',
            '10111': '00000000000000000000000000000000',
            '11000': '00000000000000000000000000000000',
            '11001': '00000000000000000000000000000000',
            '11010': '00000000000000000000000000000000',
            '11011': '00000000000000000000000000000000',
            '11100': '00000000000000000000000000000000',
            '11101': '00000000000000000000000000000000',
            '11110': '00000000000000000000000000000000',
            '11111': '00000000000000000000000000000000',
        }
        this.Data_memory = {}
        this.Instruction_memory = {}
        this.pc = 0
    }

    // RunAll(fileName: string, stalled: boolean) {
    //     this.pc = 0
    //     let count= 0
    //     if (this.active == true) {
    //         while (this.pc < Object.values(this.Instruction_memory).length * 4 - 4) {
    //             const element = this.Instruction_memory[this.pc.toString(2)]
    //             this.run(element, this.pc, false)
    //             // if (count > 300) {
    //             //     console.log(fileName, 'problem!!!!')
    //             //     break
    //             // }
    //             // count++
    //         }
    //     }
    // }

    dataMemory(address: string, memRead: string, memWrite: string, writeData: string) {
        if (dec('0' + address) % 4 != 0) {
            return '00000000000000000000000000000000'
        }
        if (memRead[0] === '1') {
            if (!(address in this.Data_memory)) {
                return '00000000000000000000000000000000'
            }
            if (memRead === '100') {
                return this.Data_memory[address].slice(-8)
            }
            if (memRead === '101') {
                return this.Data_memory[address].slice(-16)
            }
            if (memRead === '110') {
                return this.Data_memory[address]
            }
        }

        if (memWrite[0] === '1') {
            if (!(address in this.Data_memory)) {
                this.Data_memory[address] = '00000000000000000000000000000000'
            }
            if (memWrite === '100') {
                this.Data_memory[address] = this.Data_memory[address].slice(8) + writeData.slice(-8)
            }
            if (memWrite === '101') {
                this.Data_memory[address] =
                    this.Data_memory[address].slice(16) + writeData.slice(-16)
            }
            if (memWrite === '110') {
                this.Data_memory[address] = writeData
            }
        }
        return '00000000000000000000000000000000'
    }

    ALU(operand1: any, operand2: any, operation: string): string {
        this.zero = 0
        this.signBit = 0
        let ALUResult: any 
        if (operation == 'z') { 
            return '0'
        }

        operand1 = dec(operand1)
        operand2 = dec(operand2)

        if (operation[0] === '1' && this.ALUOp === '11') {
            operand1 = Math.abs(operand1)
        }

        if (operation[0] === '1' && this.ALUOp !== '11') {
            operand1 = Math.abs(operand1)
            operand2 = Math.abs(operand2)
        }
        const signOperand1 = operand1 < 0 ? 1 : 0
        // console.log(' operation',operation.slice(1))
        switch (operation.slice(1)) {
            case '000':
                ALUResult = operand1 & operand2
                break
            case '001':
                ALUResult = operand1 | operand2
                break
            case '010':
                ALUResult = operand1 ^ operand2
                break
            case '011':
                ALUResult = operand1 + operand2
                break
            case '100':
                ALUResult = operand1 - operand2
                break
            case '101':
                operand2 = operand2 & 31
                ALUResult = operand1 << operand2
                break
            case '110':
                ALUResult = operand1 >> operand2
                break
            case '111':
                ALUResult = signOperand1
                    ? dec((operand1 >> operand2).toString(2).padStart(32, '1'))
                    : dec((operand1 >> operand2).toString(2).padStart(32, '0'))
                break
        }

        if (ALUResult === 0) this.zero = 1



        if (ALUResult< 0) {
            this.signBit = 1
            ALUResult = (4294967296) + ALUResult
        } 


        ALUResult = ALUResult.toString(2)

        
        if (ALUResult[0] === '-') ALUResult = ALUResult.slice(3).padStart(32, '1')
        if (ALUResult[0] === '0') ALUResult = ALUResult.slice(2).padStart(32, '0')
        //console.log('operand: ', operand1, operand2, dec('0'+ALUResult), operation, operation.slice(1))

        return ALUResult
    }

    dataGen(readData: string, unsigned: number): string {
        if (unsigned === 0 && readData !== '') {
            readData = readData.padStart(32, readData[0])
        }
        if (unsigned === 1 && readData !== '') {
            readData = readData.padStart(32, '0')
        }
        return readData
    }

    immGen(instruction: string): string {
        // let imm = '';
        //console.log("instruction: ", instruction);

        if (instruction.slice(-7) === '0110011') {
            // R-type
            return '0'
        }
        if (['0010011', '0000011', '1100111'].includes(instruction.slice(-7))) {
            // I-TYPE
            this.imm = instruction.slice(0, 12)
            if (instruction.slice(-15, -12) === '011') return this.imm.padStart(32, '0')
        }
        if (instruction.slice(-7) === '0100011') {
            // S-TYPE
            this.imm = instruction.slice(0, 7) + instruction.slice(20, 25)
        }
        if (instruction.slice(-7) === '1100011') {
            // B-TYPE
            this.imm =
                instruction[0] +
                instruction[24] +
                instruction.slice(1, 7) +
                instruction.slice(20, 24)
        }
        if (instruction.slice(-7) === '1101111') {
            // J-TYPE
            this.imm =
                instruction[0] +
                instruction.slice(12, 20) +
                instruction[11] +
                instruction.slice(1, 11)
        }
        if (['0110111', '0010111'].includes(instruction.slice(-7))) {
            // U-TYPE
            this.imm = instruction.slice(0, 20)
        }
        // console.log('imm', this.imm)
        if (['0110111', '0010111'].includes(instruction.slice(-7))) {
            return this.imm.padStart(32, '0')
        } else {
            return this.imm.padStart(32, this.imm[0])
        }
        
    }

    control(opcode: string, funct3: string): void {
        switch (opcode) {
            case '0110011': // R-type
                this.jal = 0
                this.jalr = 0
                this.branch = '000'
                this.auiOrLui = 0
                this.wb = 0
                this.memToReg = 0
                this.unsigned = 0
                this.memRead = '000'
                this.memWrite = '000'
                this.ALUSrc = 0
                this.regWrite = 1
                this.ALUOp = '10'
                if (funct3 === '010' || funct3 === '011') this.slt = 1
                break
            case '1100011': // BEQ
                this.jal = 0
                this.jalr = 0
                this.auiOrLui = 0
                this.wb = 0
                this.memToReg = 0
                this.unsigned = 0
                this.memRead = '000'
                this.memWrite = '000'
                this.ALUSrc = 0
                this.regWrite = 0
                this.ALUOp = '01'
                this.slt = 0
                switch (funct3) {
                    case '000':
                        this.branch = '100' // BEQ
                        break
                    case '001':
                        this.branch = '101' // BNE
                        break
                    case '100':
                        this.branch = '110' // BLT
                        break
                    case '101':
                        this.branch = '111' // BGE
                        break
                    case '110':
                        this.branch = '110' // BLTU
                        break
                    case '111':
                        this.branch = '111' // BGEU
                        break
                }
                break
            case '0000011': // LOAD
                this.jal = 0
                this.jalr = 0
                this.branch = '000'
                this.auiOrLui = 0
                this.wb = 0
                this.memToReg = 1
                this.unsigned = +funct3[0]
                this.memRead = '1' + funct3.slice(1)
                this.memWrite = '000'
                this.ALUSrc = 1
                this.regWrite = 1
                this.ALUOp = '00'
                this.slt = 0
                break
            case '0100011': // STORE
                this.jal = 0
                this.jalr = 0
                this.branch = '000'
                this.auiOrLui = 0
                this.wb = 0
                this.memToReg = 0
                this.unsigned = +funct3[0]
                this.memRead = '000'
                this.memWrite = '1' + funct3.slice(1)
                this.ALUSrc = 1
                this.regWrite = 0
                this.ALUOp = '00'
                this.slt = 0
                break
            case '0010011': // I-FORMAT
                this.jal = 0
                this.jalr = 0
                this.branch = '000'
                this.auiOrLui = 0
                this.wb = 0
                this.memToReg = 0
                this.unsigned = 0
                this.memRead = '000'
                this.memWrite = '000'
                this.ALUSrc = 1
                this.regWrite = 1
                this.ALUOp = '11'
                if (funct3 === '010' || funct3 === '011') this.slt = 1
                else this.slt = 0
                break
            case '1100111': // this.JALR
                this.jal = 0
                this.jalr = 1
                this.branch = '000'
                this.auiOrLui = 0
                this.wb = 0
                this.memToReg = 0
                this.unsigned = 0
                this.memRead = '000'
                this.memWrite = '000'
                this.ALUSrc = 1
                this.regWrite = 1
                this.ALUOp = '00'
                this.slt = 0
                break
            case '1101111': // this.JAL
                this.jal = 1
                this.jalr = 0
                this.branch = '000'
                this.auiOrLui = 0
                this.wb = 0
                this.memToReg = 0
                this.unsigned = 0
                this.memRead = '000'
                this.memWrite = '000'
                this.ALUSrc = 0
                this.regWrite = 1
                this.ALUOp = 'z'
                this.slt = 0
                break
            case '0110111': // LUI
                this.jal = 0
                this.jalr = 0
                this.branch = '000'
                this.auiOrLui = 1
                this.wb = 1
                this.memToReg = 0
                this.unsigned = 0
                this.memRead = '000'
                this.memWrite = '000'
                this.ALUSrc = 0
                this.regWrite = 1
                this.ALUOp = 'z'
                this.slt = 0
                break
            case '0010111': // AUIPC
                this.jal = 0
                this.jalr = 0
                this.branch = '000'
                this.auiOrLui = 0
                this.wb = 1
                this.memToReg = 0
                this.unsigned = 0
                this.memRead = '000'
                this.memWrite = '000'
                this.ALUSrc = 0
                this.regWrite = 1
                this.ALUOp = 'z'
                this.slt = 0
                break
        }
    }

    aluControl(ALUOp: string, funct3: string, funct7: string): void {
        switch (ALUOp) {
            case '00': // LOAD and STORE and JALR
                this.operation = '0011'
                break
            case '01': // BRANCH
                if (['000', '001', '100', '101'].includes(funct3)) {
                    this.operation = '0100'
                } else if (['110', '111'].includes(funct3)) {
                    this.operation = '1100'
                }
                break
            case '10': // R-TYPE
                switch (funct3) {
                    case '000':
                        this.operation = funct7 === '0' ? '0011' : '0100'
                        break
                    case '001':
                        this.operation = '0101'
                        break
                    case '010':
                        this.operation = '0100'
                        break
                    case '011':
                        this.operation = '1100'
                        break
                    case '100':
                        this.operation = '0010'
                        break
                    case '101':
                        this.operation = funct7 === '0' ? '0110' : '0111'
                        break
                    case '110':
                        this.operation = '0001'
                        break
                    case '111':
                        this.operation = '0000'
                        break
                }
                break
            case '11': // I-TYPE
                switch (funct3) {
                    case '000':
                        this.operation = '0011' // ADDI
                        break
                    case '001':
                        this.operation = '0101' // SLLI
                        break
                    case '010':
                        this.operation = '0100' // SLTI
                        break
                    case '011':
                        this.operation = '1100' // SLTIU
                        break
                    case '100':
                        this.operation = '0010' // XORI
                        break
                    case '101': // SRLI OR SRAI
                        this.operation = funct7 === '0' ? '0110' : '0111'
                        break
                    case '110':
                        this.operation = '0001' // ORI
                        break
                    case '111':
                        this.operation = '0000' // ANDI
                        break
                }
                break
            case 'z':
                this.operation = 'z'
                break
        }
    }

    branchControl(jal: number, jalr: number, branch: string): void {
        if (jal === 1) {
            this.jump = 1
            this.pcSrc1 = 1
            this.pcSrc2 = 0
            return
        }
        if (jalr === 1) {
            this.jump = 1
            this.pcSrc1 = 0
            this.pcSrc2 = 1
            return
        }
        if (branch === '000') {
            this.pcSrc1 = 0
            this.pcSrc2 = 0
            this.jump = 0
            return
        }

        if (branch[0] === '1') {
            switch (branch) {
                case '100': // beq
                    if (this.zero === 1) {
                        this.pcSrc1 = 1
                        this.pcSrc2 = 0
                        this.jump = 0
                    } else {
                        this.pcSrc1 = 0
                        this.pcSrc2 = 0
                        this.jump = 0
                    }
                    break
                case '101': // bne
                    if (this.zero === 0) {
                        this.pcSrc1 = 1
                        this.pcSrc2 = 0
                        this.jump = 0
                    } else {
                        this.pcSrc1 = 0
                        this.pcSrc2 = 0
                        this.jump = 0
                    }
                    break
                case '110': // blt
                    if (this.signBit === 1) {
                        this.pcSrc1 = 1
                        this.pcSrc2 = 0
                        this.jump = 0
                    } else {
                        this.pcSrc1 = 0
                        this.pcSrc2 = 0
                        this.jump = 0
                    }
                    break
                case '111': // bge
                    if (this.signBit === 0) {
                        this.pcSrc1 = 1
                        this.pcSrc2 = 0
                        this.jump = 0
                    } else {
                        this.pcSrc1 = 0
                        this.pcSrc2 = 0
                        this.jump = 0
                    }
                    break
            }
        }
    }

    internalProcessing (instruction: string, pc: number, icBusy: boolean): [string, string, string, string, string] {
        if (this.active == true) {
            this.pre_pc = pc
            this.stalled = false 
            let readData = ''
            if (instruction == '1'.padStart(32,'1')) {
                
                if (icBusy) {
                    this.stalled = true
                    this.pc = this.pc 
                }
                else {
                    this.stalled = false
                    this.pc = this.pc + 4
                }
                    
                return ['ECALL', '', '', '', '']
            }
            this.control(instruction.slice(25, 32), instruction.slice(17, 20))

            let size = 'none'
            if (instruction.slice(25, 32) === '0000011')
                switch (instruction.slice(17, 20)) {
                    case '000':
                        size = 'lb'
                        break
                    case '001':
                        size = 'lh'
                        break
                    case '010':
                        size = 'lw'
                        break
                    case '100':
                        size = 'lbu'
                        break
                    case '101':
                        size = 'lhu'
                        break
                    default:
                        break
                }

            if (instruction.slice(25, 32) === '0100011')
                switch (instruction.slice(17, 20)) {
                    case '000': //Load
                        size = 'sb'
                        break
                    case '001': //Store
                        size = 'sh'
                        break
                    case '010': //Load
                        size = 'sw'
                        break
                    default:
                        break
                }
            const readRegister1 = instruction.slice(12, 17)
            const readRegister2 = instruction.slice(7, 12)
            const writeRegister = instruction.slice(20, 25)
            const readData1 = this.register[readRegister1]
            const readData2 = this.register[readRegister2]
            
            const imm = this.immGen(instruction)
            
            this.aluControl(this.ALUOp, instruction.slice(17, 20), instruction.slice(1,2))
            const ALUResult = this.ALU(readData1, mux(readData2, imm, this.ALUSrc), this.operation)

            this.branchControl(this.jal, this.jalr, this.branch)

            let message = 'None'
            let data = '0'
            let address = ''
            
            if (instruction.slice(25, 32) === '0100011') {
                // SW
                message = 'PUT'
                data = readData2
                address = ALUResult.padStart(32,'0')
                if (icBusy) this.stalled = true
            }
            if (instruction.slice(25, 32) === '0000011') {
                // LW
                message = 'GET'
                data = ''
                address = ALUResult.padStart(32,'0')
                if (icBusy) this.stalled = true
            }

            if (this.stalled == false) {
                readData = this.dataMemory(ALUResult, this.memRead, this.memWrite, readData2)

                readData = this.dataGen(readData, this.unsigned)

                let writeDataR = mux(
                    mux(
                        mux(
                            mux(ALUResult, readData, this.memToReg),
                            pc.toString(2).padStart(32, '0'),
                            this.jump,
                        ),
                        mux(
                            '00000000000000000000000000000000',
                            '00000000000000000000000000000001',
                            this.signBit,
                        ),
                        this.slt,
                    ),
                    mux(
                        (dec(imm) << 12).toString(2).padStart(32, '0') +
                            pc.toString(2).padStart(32, '0'),
                        (dec(imm) << 12).toString(2).padStart(32, '0'),
                        this.auiOrLui,
                    ),
                    this.wb,
                )

                writeDataR = writeDataR.padStart(32, '0')
                if (this.regWrite === 1) {
                    this.register[writeRegister] = writeDataR
                }

                this.register['00000'] = '00000000000000000000000000000000'
            }
            //.log(pc + 4, (dec(imm) << 1) , this.pcSrc1)
            
            if (this.stalled == false) {
                this.pc     = mux(mux(pc + 4, (dec(imm) << 1) + pc, this.pcSrc1), ALUResult, this.pcSrc2)
            } else this.pc = pc

            this.lineColor['3']         = mux(this.lineColor['2'], this.lineColor['1'], this.ALUSrc);
            this.lineColor['6']         = mux(this.lineColor['0'], this.lineColor['4'], this.pcSrc1);
            this.lineColor['9']         = mux(this.lineColor['6'], this.lineColor['5'], this.pcSrc2);
            this.lineColor['10']        = mux(this.lineColor['5'], this.lineColor['8'], this.memToReg);
            this.lineColor['11']        = mux(this.lineColor['10'], this.lineColor['0'], this.jump);
            this.lineColor['12']        = mux(this.lineColor['14'], this.lineColor['13'], this.signBit);
            this.lineColor['15']        = mux(this.lineColor['11'], this.lineColor['12'], this.slt);
            this.lineColor['16']        = mux(this.lineColor['7'], this.lineColor['1'], this.auiOrLui);
            this.lineColor['17']        = mux(this.lineColor['15'], this.lineColor['16'], this.wb);
            this.lineColor['ALUOp'   ]  = this.ALUOp        .toString()   
            this.lineColor['zero'    ]  = this.zero         .toString()      
            this.lineColor['ALUSrc'  ]  = this.ALUSrc       .toString()      
            this.lineColor['operation'] = this.operation    .toString()  
            this.lineColor['jal'     ]  = this.jal          .toString()         
            this.lineColor['jalr'    ]  = this.jalr         .toString()        
            this.lineColor['branch'  ]  = this.branch       .toString()       
            this.lineColor['memRead' ]  = this.memRead      .toString()      
            this.lineColor['memWrite']  = this.memWrite     .toString()     
            this.lineColor['unsigned']  = this.unsigned     .toString()     
            this.lineColor['memToReg']  = this.memToReg     .toString()     
            this.lineColor['jump'    ]  = this.jump         .toString()         
            this.lineColor['regWrite']  = this.regWrite     .toString()    
            this.lineColor['pcSrc1'  ]  = this.pcSrc1       .toString()       
            this.lineColor['pcSrc2'  ]  = this.pcSrc2       .toString()      
            this.lineColor['signBit' ]  = this.signBit      .toString()     
            this.lineColor['slt'     ]  = this.slt          .toString()          
            this.lineColor['auiOrLui']  = this.auiOrLui     .toString()     
            this.lineColor['wb'      ]  = this.wb           .toString()           
            this.lineColor['imm'     ]  = this.imm          .toString()     
            console.log('message: ', message)
            return [message, data, address, writeRegister, size]
        } else return ['', '', '', '', '']
    }

    Run (
          icBusy            : boolean
        , cycle             : number
        , Memory2CPU        : any
    ) 
    {
        if (this.state == 0) {
            // console.log('this.pc: ', (this.pc).toString(2).padStart(17, '0'))
            this.master.ChannelA.valid = '1'
            this.master.send ('GET',  (this.pc).toString(2).padStart(17, '0'), this.SendData)
            // console.log('cpu: ',this.master.ChannelA, this.pc)
            this.state              += 1
            return
        }
        if (this.state == 1) {
            this.master.ChannelA.valid = '0'
            if (Memory2CPU.valid == '1') {
                this.master.receive (Memory2CPU)
                this.instruction = this.master.ChannelD.data
                this.state +=1
                // this.master.ChannelA.valid = '1'
            }
            return
        }
        if (this.state == 2) {
            let [message, data, logic_address, writeRegister, size] = this.internalProcessing (this.instruction, this.pc, icBusy)
            this.master.ChannelA.valid = '1'
            if (message == 'PUT' || message == 'GET') {
                this.Processor_messeage = message
                this.SendData           = data
                this.SendAddress        = logic_address
                this.writeReg           = writeRegister
                this.state              += 1
            }
            else this.state = 0
            return
        }
        if (this.state == 3) {
            let physical_address = this.MMU.run(cycle, this.SendAddress)
            this.master.send (this.Processor_messeage,  physical_address, this.SendData)
            if (this.MMU.MMU_message == 'TLB: VPN is missed.') this.state = 5
            else this.state = 4
            return
        }
        if (this.state == 4) {
            if (Memory2CPU.valid == '1') {
                this.master.receive (Memory2CPU)
                if (Memory2CPU.opcode == '001') this.register[this.writeReg] =  this.master.ChannelD.data
                this.state = 0
            }
            return
        }
        if (this.state == 5) {
            if (Memory2CPU.valid == '1') {
                const VPN       = this.SendAddress.slice(0, 20)  
                this.master.receive (Memory2CPU)
                const frame     = this.master.ChannelD.data
                this.MMU.pageReplace ([parseInt(VPN , 2) & 0xf,  dec (frame), 1, cycle])
                this.state = 0
            }
            return
        }
    }
}
