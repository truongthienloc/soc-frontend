type OpType = { [key: string]: string };

// InstructionSet Class
class InstructionSet {
    static readonly R_TYPE: OpType = {
        '001': 'sll', '011': 'sltu', '110': 'or',
        '010': 'slt', '100': 'xor', '111': 'and',
    };

    static readonly LOAD_TYPE: OpType = {
        '000': 'lb', '001': 'lh', '010': 'lw', '011': 'ld',
        '100': 'lbu', '101': 'lhu', '110': 'lwu'
    };

    static readonly I_TYPE: OpType = {
        '000': 'addi', '001': 'slli', '010': 'slti', '011': 'sltiu',
        '100': 'xori', '110': 'ori', '111': 'andi'
    };

    static readonly STORE_TYPE: OpType = {
        '000': 'sb', '001': 'sh', '010': 'sw', '011': 'sd'
    };

    static readonly SBRANCH_TYPE: OpType = {
        '000': 'beq', '001': 'bne', '100': 'blt', '101': 'bge',
        '110': 'bltu', '111': 'bgeu'
    };
}

// BinaryUtils Class
class BinaryUtils {
    static convertBinToDec(temp: string): string {
        let s = 0;
        temp = temp.padStart(32, temp[0]).split('').reverse().join('');
        
        for (let i = 0; i < temp.length; i++) {
            if (temp[i] === '1') {
                s += Math.pow(2, i);
            }
        }
        if (temp[temp.length - 1] === '1') {
            s -= 4294967296;
            //console.log('temp ->', temp, s, 1 << 21)
        }
        return s.toString();
    }

    static convertHexToBin(string: string): string {
        string = string.slice(2).toUpperCase();
        let temp = "";
        for (let char of string) {
            temp += parseInt(char, 16).toString(2).padStart(4, '0');
        }
        return temp;
    }

    static formatInstruction(instr: string, ...args: string[]): string {
        return `${instr.padEnd(7, ' ')}${args.join(', ')}`;
    }
}

// Instruction Base Class
class Instruction {
    protected bcode: string;

    constructor(bcode: string) {
        this.bcode = bcode;
    }

    static decodeBinaryString(binaryString: string): string {
        binaryString = binaryString.replace(/ /g, '');
        if (binaryString.startsWith('0x')) {
            return BinaryUtils.convertHexToBin(binaryString).padStart(32, '0');
        }
        return binaryString.padStart(32, '0');
    }
}

// RType Class
class RType extends Instruction {
    decode(): string {
        const func3 = this.bcode.slice(17, 20);
        let instr = func3 === '000'
            ? (this.bcode.slice(0, 7) === '0000000' ? 'add' : 'sub')
            : (func3 === '101' ? (this.bcode.slice(0, 7) === '0000000' ? 'srl' : 'sra') : InstructionSet.R_TYPE[func3]);

        const rd = `x${BinaryUtils.convertBinToDec('0' + this.bcode.slice(20, 25)).padEnd(3, ' ')}`;
        const rs1 = `x${BinaryUtils.convertBinToDec('0' + this.bcode.slice(12, 17)).padEnd(3, ' ')}`;
        const rs2 = `x${BinaryUtils.convertBinToDec('0' + this.bcode.slice(7, 12))}`;

        return BinaryUtils.formatInstruction(instr, rd, rs1, rs2);
    }
}

// IType Class
class IType extends Instruction {
    decode(): string {
        let instr = '';

        if (this.bcode.slice(25) === '0000011') {
            instr = InstructionSet.LOAD_TYPE[this.bcode.slice(17, 20)];
        } else if (this.bcode.slice(25) === '0010011') {
            instr = this.bcode.slice(17, 20) === '101'
                ? (this.bcode.slice(0, 7) === '0000000' ? 'srli' : 'srai')
                : InstructionSet.I_TYPE[this.bcode.slice(17, 20)];
        } else if (this.bcode.slice(25) === '1100111') {
            instr = 'jalr';
        }

        const rd = `x${BinaryUtils.convertBinToDec('0' + this.bcode.slice(20, 25)).padEnd(3, ' ')}`;
        const imm = BinaryUtils.convertBinToDec(this.bcode.slice(0, 4) + this.bcode.slice(4, 8) + this.bcode.slice(8, 12));
        const rs1 = `x${BinaryUtils.convertBinToDec('0' + this.bcode.slice(12, 17))}`;

        return (instr === 'jalr' || Object.values(InstructionSet.LOAD_TYPE).includes(instr))
            ? BinaryUtils.formatInstruction(instr, rd, `${imm} (${rs1})`)
            : BinaryUtils.formatInstruction(instr, rd, rs1, imm);
    }
}

// SType Class
class SType extends Instruction {
    decode(): string {
        const instr = InstructionSet.STORE_TYPE[this.bcode.slice(17, 20)];
        const rs2 = `x${BinaryUtils.convertBinToDec('0' + this.bcode.slice(7, 12)).padEnd(3, ' ')}`;
        const imm = this.bcode.slice(0, 7) + this.bcode.slice(20, 25);
        const offset = BinaryUtils.convertBinToDec(imm.slice(0, 4) + imm.slice(4, 8) + imm.slice(8, 12));
        const rs1 = `x${BinaryUtils.convertBinToDec('0' + this.bcode.slice(12, 17))}`;

        return BinaryUtils.formatInstruction(instr, rs2, `${offset}(${rs1})`);
    }
}

// SBType Class
class SBType extends Instruction {
    decode(): string {
        const instr = InstructionSet.SBRANCH_TYPE[this.bcode.slice(17, 20)];
        const rs1 = `x${BinaryUtils.convertBinToDec('0' + this.bcode.slice(12, 17)).padEnd(3, ' ')}`;
        const rs2 = `x${BinaryUtils.convertBinToDec('0' + this.bcode.slice(7, 12)).padEnd(3, ' ')}`;
        const imm = this.bcode[0] + this.bcode[24] + this.bcode.slice(1, 7) + this.bcode.slice(20, 24) + '0';
        const offset = BinaryUtils.convertBinToDec(imm[0].padStart(4, imm[0]) + imm.slice(1, 5) + imm.slice(5, 9) + imm.slice(9));
        console.log('-> ', imm[0].padStart(4, imm[0]) + imm.slice(1, 5) + imm.slice(5, 9) + imm.slice(9))
        return BinaryUtils.formatInstruction(instr, rs1, rs2, offset);
    }
}

// UType Class
class UType extends Instruction {
    decode(): string {
        const instr = this.bcode.slice(25) === '0010111' ? 'auipc' : 'lui';
        const rd = `x${BinaryUtils.convertBinToDec('0' + this.bcode.slice(20, 25)).padEnd(3, ' ')}`;
        const imm = BinaryUtils.convertBinToDec(this.bcode.slice(0, 4) + this.bcode.slice(4, 8) + this.bcode.slice(8, 12) + this.bcode.slice(12, 16) + this.bcode.slice(16, 20));

        return BinaryUtils.formatInstruction(instr, rd, imm);
    }
}

// UJType Class
class UJType extends Instruction {
    decode(): string {
        const instr = 'jal';
        const rd = `x${BinaryUtils.convertBinToDec('0' + this.bcode.slice(20, 25)).padEnd(3, ' ')}`;
        const imm = this.bcode[0] + this.bcode.slice(12, 20) + this.bcode[11] + this.bcode.slice(1, 10) + this.bcode[10] + '0';
        const offset = BinaryUtils.convertBinToDec(imm[0].padStart(4, imm[0]) + imm.slice(1, 5) + imm.slice(5, 9) + imm.slice(9, 13) + imm.slice(13, 17) + imm.slice(17));

        return BinaryUtils.formatInstruction(instr, rd, offset);
    }
}

// InstructionProcessor Class
export default class DisAssembly {
    private binaryCode: string;
    private instructionResult: { [key: number]: string } = {};

    constructor(binaryCode: string) {
        this.binaryCode = binaryCode;
    }

    public setBinaryCode(binaryCode: string) {
        this.binaryCode = binaryCode;
        return this
    }

    process(): string[] {
        let PC = 0;
        this.binaryCode.split('\n').forEach(line => {
            if (line.trim()) {
                const bcode = Instruction.decodeBinaryString(line);
                const type = bcode.slice(25);
                let instruction: string;

                if (type === '0110011') { // R-TYPE
                    instruction = new RType(bcode).decode();
                } else if (['0000011', '0010011', '1100111'].includes(type)) { // I-TYPE
                    instruction = new IType(bcode).decode();
                } else if (type === '0100011') { // S-TYPE
                    instruction = new SType(bcode).decode();
                } else if (type === '1100011') { // SB-TYPE
                    instruction = new SBType(bcode).decode();
                } else if (['0010111', '0110111'].includes(type)) { // U-TYPE
                    instruction = new UType(bcode).decode();
                } else if (type === '1101111') { // UJ-TYPE
                    instruction = new UJType(bcode).decode();
                } else {
                    instruction = 'Invalid Instruction';
                }

                this.instructionResult[PC] = instruction;
                PC += 4;
            }
        });

        return Object.entries(this.instructionResult).map(
            ([pc, instr]) => `${pc}:\t${instr}`
        );
    }
}
