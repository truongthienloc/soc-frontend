// TypeScript

import { dec, handleRegister } from './sub_function';
import { mux } from './sub_function';
import Master from './Master';
import {assemblerFromIns}   from './assembler';
import { Logger } from './soc.d';

export default class RiscVProcessor {
    name: string;
    active: boolean;
    master: Master;
    register: { [key: string]: string };
    Data_memory: { [key: string]: string };
    Instruction_memory: { [key: string]: string };
    pc= 0;
    logger?: Logger
    

    ALUOp: any;
    zero : any;
    ALUSrc: any;
    operation: any;
    jal: any;
    jalr: any
    branch: any
    memRead: any
    memWrite: any
    unsigned: any
    memToReg: any
    jump: any
    regWrite: any
    pcSrc1: any
    pcSrc2: any
    signBit: any
    slt: any
    auiOrLui: any
    wb: any
    imm: any

    public getRegisters() {
        return handleRegister(this.register)
    }

    public setLogger(logger: Logger) {
        this.logger = logger
    }

    public println(...args: string[]) {
        if (!this.logger) {
            return
        }
        this.logger.println(...args)
    }

    public setImen (code: string) {
        
        let pc0 = 0;
        let binary_code: string[] = [];
        binary_code = assemblerFromIns(code);
        let instruction_memory0: { [key: string]: string } = {};
        for (let i of binary_code) {
            instruction_memory0[pc0.toString(2)] = i;
            pc0 += 4;
        }
        pc0 = 0;
        this.Instruction_memory = instruction_memory0;
    }
    constructor(name: string, source: string, active: boolean) {
        this.name = name;
        this.active= active;
        this.master = new Master(name, true, source);
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
            '11111': '00000000000000000000000000000000'
        };
        this.Data_memory = {};
        this.Instruction_memory = {};
        this.pc = 0;
    }

    RunAll () {
        while (this.pc> Object.values(this.Instruction_memory).length * 4) {
            const element = this.Instruction_memory[this.pc]
            this.println('CPU is running')
            this.run(element, this.pc)
        }
    }

    dataMemory (address: string, memRead: string, memWrite: string, writeData: string): string {
        
        console.log('memRead',memRead)
        console.log('check address', !(address in this.Data_memory))
        if (memRead[0] === '1') {
            if (!(address in this.Data_memory)) {
                return '00000000000000000000000000000000';
            }
            if (memRead === '100') {
                return this.Data_memory[address].slice(-8);
            }
            if (memRead === '101') {
                return this.Data_memory[address].slice(-16);
            }
            if (memRead === '110') {
                return this.Data_memory[address];
            }
        }

        if (memWrite[0] === '1') {
            if (!(address in this.Data_memory)) {
                this.Data_memory[address] = '00000000000000000000000000000000';
            }
            if (memWrite === '100') {
                this.Data_memory[address] = this.Data_memory[address].slice(8) + writeData.slice(-8);
            }
            if (memWrite === '101') {
                this.Data_memory[address] = this.Data_memory[address].slice(16) + writeData.slice(-16);
            }
            if (memWrite === '110') {
                this.Data_memory[address] = writeData;
            }
        }
        return '00000000000000000000000000000000';
    }

    ALU(operand1: any, operand2: any, operation: string): string {
        this.zero = 0;
        let signBit = 0;
        let ALUResult: string | number = '0';

        console.log('operand: ', operand1, operand2, operation);
        

        operand1 = dec(operand1);
        operand2 = dec(operand2);

        if (operation[0] === '1' && this.ALUOp === '11') {
            operand1 = Math.abs(operand1);
        }

        if (operation[0] === '1' && this.ALUOp !== '11') {
            operand1 = Math.abs(operand1);
            operand2 = Math.abs(operand2);
        }
        const signOperand1 = operand1 < 0 ? 1 : 0;

        switch (operation.slice(1)) {
            case '000':
                ALUResult = operand1 & operand2;
                break;
            case '001':
                ALUResult = operand1 | operand2;
                break;
            case '010':
                ALUResult = operand1 ^ operand2;
                break;
            case '011':
                ALUResult = operand1 + operand2;
                break;
            case '100':
                ALUResult = operand1 - operand2;
                break;
            case '101':
                operand2 = operand2 & 31;
                ALUResult = operand1 << operand2;
                break;
            case '110':
                ALUResult = operand1 >> operand2;
                break;
            case '111':
                ALUResult = signOperand1
                    ? dec((operand1 >> operand2).toString(2).padStart(32, '1'))
                    : dec((operand1 >> operand2).toString(2).padStart(32, '0'));
                break;
        }

        if (ALUResult === 0) this.zero = 1;
        if (dec(ALUResult.toString()) < 0) {
            signBit = 1;
            ALUResult = (1 << 32) + dec(ALUResult.toString());
        }
        ALUResult = ALUResult.toString(2);

        if (ALUResult[0] === '-') ALUResult = ALUResult.slice(3).padStart(32, '1');
        if (ALUResult[0] === '0') ALUResult = ALUResult.slice(2).padStart(32, '0');

        return ALUResult;
    }

    dataGen(readData: string, unsigned: number): string {
        if (unsigned === 0 && readData !== '') {
            readData = readData.padStart(32, readData[0]);
        }
        if (unsigned === 1 && readData !== '') {
            readData = readData.padStart(32, '0');
        }
        return readData;
    }

    immGen(instruction: string): string {
        // let imm = '';
        //("instruction: ", instruction);
        
        if (instruction.slice(-7) === '0110011') { // R-type
            return '0';
        }
        if (['0010011', '0000011', '1100111'].includes(instruction.slice(-7))) { // I-TYPE
            this.imm = instruction.slice(0, 12);
            if (instruction.slice(-15, -12) === '011') return this.imm.padStart(32, '0');
        }
        if (instruction.slice(-7) === '0100011') { // S-TYPE
            this.imm = instruction.slice(0, 7) + instruction.slice(20, 25);
        }
        if (instruction.slice(-7) === '1100011') { // B-TYPE
            this.imm = instruction[0] + instruction[24] + instruction.slice(1, 7) + instruction.slice(20, 24);
        }
        if (instruction.slice(-7) === '1101111') { // J-TYPE
            this.imm = instruction[0] + instruction.slice(12, 20) + instruction[11] + instruction.slice(1, 11);
        }
        if (['0110111', '0010111'].includes(instruction.slice(-7))) { // U-TYPE
            this.imm = instruction.slice(0, 20);
        }
        if (['0110111', '0010111'].includes(instruction.slice(-7))) {
            return this.imm.padStart(32, '0');
        } else {
            return this.imm.padStart(32, this.imm[0]);
        }
    }

    control(opcode: string, funct3: string): void {
        

        switch (opcode) {
            case '0110011': // R-type
                this.jal = 0; this.jalr = 0; this.branch = '000'; this.auiOrLui = 0; this.wb = 0;
                this.memToReg = 0; this.unsigned = 0; this.memRead = '000'; this.memWrite = '000';
                this.ALUSrc = 0; this.regWrite = 1; this.ALUOp = '10';
                if (funct3 === '010' || funct3 === '011') this.slt = 1;
                break;
            case '1100011': // BEQ
                this.jal = 0; this.jalr = 0; this.auiOrLui = 0; this.wb = 0;
                this.memToReg = 0; this.unsigned = 0; this.memRead = '000'; this.memWrite = '000';
                this.ALUSrc = 0; this.regWrite = 0; this.ALUOp = '01'; this.slt = 0;
                switch (funct3) {
                    case '000':
                        this.branch = '100'; // BEQ
                        break;
                    case '001':
                        this.branch = '101'; // BNE
                        break;
                    case '100':
                        this.branch = '110'; // BLT
                        break;
                    case '101':
                        this.branch = '111'; // BGE
                        break;
                    case '110':
                        this.branch = '110'; // BLTU
                        break;
                    case '111':
                        this.branch = '111'; // BGEU
                        break;
                }
                break;
            case '0000011': // LOAD
                this.jal = 0; this.jalr = 0; this.branch = '000'; this.auiOrLui = 0;
                this.wb = 0; this.memToReg = 1; this.unsigned = +funct3[0]; this.memRead = '1' + funct3.slice(1);
                this.memWrite = '000'; this.ALUSrc = 1; this.regWrite = 1; this.ALUOp = '00'; this.slt = 0;
                break;
            case '0100011': // STORE
                this.jal = 0; this.jalr = 0; this.branch = '000'; this.auiOrLui = 0;
                this.wb = 0; this.memToReg = 0; this.unsigned = +funct3[0]; this.memRead = '000';
                this.memWrite = '1' + funct3.slice(1); this.ALUSrc = 1; this.regWrite = 0; this.ALUOp = '00'; this.slt = 0;
                break;
            case '0010011': // I-FORMAT
                this.jal = 0; this.jalr = 0; this.branch = '000'; this.auiOrLui = 0; this.wb = 0;
                this.memToReg = 0; this.unsigned = 0; this.memRead = '000'; this.memWrite = '000';
                this.ALUSrc = 1; this.regWrite = 1; this.ALUOp = '11';
                if (funct3 === '010' || funct3 === '011') this.slt = 1;
                else this.slt= 0;
                break;
            case '1100111': // this.JALR
                this.jal = 0; this.jalr = 1; this.branch = '000'; this.auiOrLui = 0; this.wb = 0;
                this.memToReg = 0; this.unsigned = 0; this.memRead = '000'; this.memWrite = '000';
                this.ALUSrc = 1; this.regWrite = 1; this.ALUOp = '00'; this.slt = 0;
                break;
            case '1101111': // this.JAL
                this.jal = 1; this.jalr = 0; this.branch = '000'; this.auiOrLui = 0; this.wb = 0;
                this.memToReg = 0; this.unsigned = 0; this.memRead = '000'; this.memWrite = '000';
                this.ALUSrc = 0; this.regWrite = 1; this.ALUOp = 'z'; this.slt = 0;
                break;
            case '0110111': // LUI
                this.jal = 0; this.jalr = 0; this.branch = '000'; this.auiOrLui = 1; this.wb = 1;
                this.memToReg = 0; this.unsigned = 0; this.memRead = '000'; this.memWrite = '000';
                this.ALUSrc = 0; this.regWrite = 1; this.ALUOp = 'z'; this.slt = 0;
                break;
            case '0010111': // AUIPC
                this.jal = 0; this.jalr = 0; this.branch = '000'; this.auiOrLui = 0; this.wb = 1;
                this.memToReg = 0; this.unsigned = 0; this.memRead = '000'; this.memWrite = '000';
                this.ALUSrc = 0; this.regWrite = 1; this.ALUOp = 'z'; this.slt = 0;
                break;
        }
    }

    aluControl(ALUOp: string, funct3: string, funct7: string): void {
        
        switch (ALUOp) {
            case '00': // LOAD and STORE and JALR
                this.operation = '0011';
                break;
            case '01': // BRANCH
                if (['000', '001', '100', '101'].includes(funct3)) {
                    this.operation = '0100';
                } else if (['110', '111'].includes(funct3)) {
                    this.operation = '1100';
                }
                break;
            case '10': // R-TYPE
                switch (funct3) {
                    case '000':
                        this.operation = funct7 === '0' ? '0011' : '0100';
                        break;
                    case '001':
                        this.operation = '0105';
                        break;
                    case '010':
                        this.operation = '0100';
                        break;
                    case '011':
                        this.operation = '1100';
                        break;
                    case '100':
                        this.operation = '0010';
                        break;
                    case '101':
                        this.operation = funct7 === '0' ? '0110' : '0111';
                        break;
                    case '110':
                        this.operation = '0001';
                        break;
                    case '111':
                        this.operation = '0000';
                        break;
                }
                break;
            case '11': // I-TYPE
                switch (funct3) {
                    case '000':
                        this.operation = '0011'; // ADDI
                        break;
                    case '001':
                        this.operation = '0105'; // SLLI
                        break;
                    case '010':
                        this.operation = '0100'; // SLTI
                        break;
                    case '011':
                        this.operation = '1100'; // SLTIU
                        break;
                    case '100':
                        this.operation = '0010'; // XORI
                        break;
                    case '101': // SRLI OR SRAI
                        this.operation = funct7 === '0' ? '0110' : '0111';
                        break;
                    case '110':
                        this.operation = '0001'; // ORI
                        break;
                    case '111':
                        this.operation = '0000'; // ANDI
                        break;
                }
                break;
            case 'z':
                this.operation = 'z';
                break;
        }
    }

    branchControl(jal: number, jalr: number, branch: string): void {
        // let pcSrc1 = 0;
        // let pcSrc2 = 0;
        // let jump = 0;

        if (jal === 1) {
            this.jump = 1;
            this.pcSrc1 = 1;
            this.pcSrc2 = 0;
            return;
        }
        if (jalr === 1) {
            this.jump = 1;
            this.pcSrc1 = 0;
            this.pcSrc2 = 1;
            return;
        }
        if (branch === '000') {
            this.pcSrc1 = 0;
            this.pcSrc2 = 0;
            this.jump = 0;
            return;
        }

        if (branch[0] === '1') {
            switch (branch) {
                case '100': // beq
                    if (this.zero === 1) {
                        this.pcSrc1 = 1;
                        this.pcSrc2 = 0;
                        this.jump = 0;
                    } else {
                        this.pcSrc1 = 0;
                        this.pcSrc2 = 0;
                        this.jump = 0;
                    }
                    break;
                case '101': // bne
                    if (this.zero === 0) {
                        this.pcSrc1 = 1;
                        this.pcSrc2 = 0;
                        this.jump = 0;
                    } else {
                        this.pcSrc1 = 0;
                        this.pcSrc2 = 0;
                        this.jump = 0;
                    }
                    break;
                case '110': // blt
                    if (this.signBit === 1) {
                        this.pcSrc1 = 1;
                        this.pcSrc2 = 0;
                        this.jump = 0;
                    } else {
                        this.pcSrc1 = 0;
                        this.pcSrc2 = 0;
                        this.jump = 0;
                    }
                    break;
                case '111': // bge
                    if (this.signBit === 0) {
                        this.pcSrc1 = 1;
                        this.pcSrc2 = 0;
                        this.jump = 0;
                    } else {
                        this.pcSrc1 = 0;
                        this.pcSrc2 = 0;
                        this.jump = 0;
                    }
                    break;
            }
        }
    }

    run(instruction: string, pc: number): [string, string, string, string] {
        //('instruction from run: ', instruction);
        
        // let this.zero = 0;
        let signBit = 0;
        let readData = '';
        console.log("Instruction",instruction)

        //(`RISC-V ${this.name} processor is processing`);

        this.control(instruction.slice(25, 32), instruction.slice(17, 20));

        const readRegister1 = instruction.slice(12, 17);
        const readRegister2 = instruction.slice(7, 12);
        const writeRegister = instruction.slice(20, 25);
        const readData1 = this.register[readRegister1];
        const readData2 = this.register[readRegister2];

        const imm = this.immGen(instruction);
        this.aluControl(this.ALUOp, instruction.slice(17, 20), instruction.slice(1));
        //('mux: ', readData2, imm, this.ALUSrc);
        
        const ALUResult = this.ALU(readData1, mux(readData2, imm, this.ALUSrc), this.operation);
        this.branchControl(this.jal, this.jalr, this.branch);

        let message = 'None';
        let data = '0';
        let address = '';
        if (instruction.slice(25, 32) === '0100011') { // SW
            message = 'PUT';
            data = readData2;
            address = ALUResult;
        }
        if (instruction.slice(25, 32) === '0000011') { // LW
            message = 'GET';
            data = '';
            address = ALUResult;
        }

        
        readData = this.dataMemory(ALUResult, this.memRead, this.memWrite, readData2);
        
        readData = this.dataGen(readData, this.unsigned);
        
        let writeDataR = mux(mux(mux(mux(ALUResult, readData, this.memToReg), pc.toString(2).padStart(32, '0'), this.jump), mux('00000000000000000000000000000000', '00000000000000000000000000000001', signBit), this.slt), mux((dec(imm) << 12).toString(2).padStart(32, '0') + pc.toString(2).padStart(32, '0'), (dec(imm) << 12).toString(2).padStart(32, '0'), this.auiOrLui), this.wb);
        console.log(writeDataR)
        console.log(this.slt)
        //console.log(ALUResult, readData, this.memToReg, pc.toString(2).padStart(32, '0'), this.jump,'00000000000000000000000000000000', '00000000000000000000000000000001', signBit, this.slt, (dec(imm) << 12).toString(2).padStart(32, '0') + pc.toString(2).padStart(32, '0'), (dec(imm) << 12).toString(2).padStart(32, '0'), this.auiOrLui, this.wb)
        // if (this.jump === 1) {
        //     writeDataR = writeDataR.padStart(32, '0');
        // } else writeDataR = writeDataR.padStart(32, writeDataR[0]);
        writeDataR = writeDataR.padStart(32, '0');
        if (this.regWrite === 1) {
            this.register[writeRegister] = writeDataR;
        }

        this.register['00000'] = '00000000000000000000000000000000';
        this.pc = mux(mux(pc + 4, (dec(imm) << 1) + pc, this.pcSrc1), ALUResult, this.pcSrc2);
        return [message, data, address, writeRegister];
    }
}
