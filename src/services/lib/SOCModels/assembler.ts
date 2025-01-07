// import fs from 'fs'

interface Registers {
    [key: string]: string
}

interface Opcodes {
    [key: string]: string
}

interface Funct3 {
    [key: string]: string
}

interface Funct7 {
    [key: string]: string
}

let address: { [key: string]: number } = {}
let local = 0

const register: Registers = {
    x0: '00000',
    zero: '00000',
    x1: '00001',
    ra: '00001',
    x2: '00010',
    sp: '00010',
    x3: '00011',
    gp: '00011',
    x4: '00100',
    tp: '00100',
    x5: '00101',
    t0: '00101',
    x6: '00110',
    t1: '00110',
    x7: '00111',
    t2: '00111',
    x8: '01000',
    s0: '01000',
    fp: '01000',
    x9: '01001',
    s1: '01001',
    x10: '01010',
    a0: '01010',
    x11: '01011',
    a1: '01011',
    x12: '01100',
    a2: '01100',
    x13: '01101',
    a3: '01101',
    x14: '01110',
    a4: '01110',
    x15: '01111',
    a5: '01111',
    x16: '10000',
    a6: '10000',
    x17: '10001',
    a7: '10001',
    x18: '10010',
    s2: '10010',
    x19: '10011',
    s3: '10011',
    x20: '10100',
    s4: '10100',
    x21: '10101',
    s5: '10101',
    x22: '10110',
    s6: '10110',
    x23: '10111',
    s7: '10111',
    x24: '11000',
    s8: '11000',
    x25: '11001',
    s9: '11001',
    x26: '11010',
    s10: '11010',
    x27: '11011',
    s11: '11011',
    x28: '11100',
    t3: '11100',
    x29: '11101',
    t4: '11101',
    x30: '11110',
    t5: '11110',
    x31: '11111',
    t6: '11111',
}

const FMT: Registers = {
    lb: 'I',
    auipc: 'U',
    addw: 'R',
    ecall: 'I',
    lh: 'I',
    addiw: 'I',
    subw: 'R',
    ebreak: 'I',
    lw: 'I',
    slliw: 'I',
    sllw: 'R',
    CSRRW: 'I',
    ld: 'I',
    srliw: 'I',
    srlw: 'R',
    CSRRC: 'I',
    lbu: 'I',
    sraiw: 'I',
    sraw: 'R',
    CSRRWI: 'I',
    lhu: 'I',
    CSRRSI: 'I',
    lwu: 'I',
    sb: 'S',
    beq: 'SB',
    CSRRCI: 'I',
    sh: 'S',
    bne: 'SB',
    fence: 'I',
    sw: 'S',
    blt: 'SB',
    'fence.i': 'I',
    sd: 'S',
    bge: 'SB',
    bltu: 'SB',
    addi: 'I',
    add: 'R',
    bgeu: 'SB',
    slli: 'I',
    sub: 'R',
    slti: 'I',
    sll: 'R',
    jalr: 'I',
    sltiu: 'I',
    slt: 'R',
    jal: 'UJ',
    xori: 'I',
    sltu: 'R',
    srli: 'I',
    xor: 'R',
    srai: 'I',
    srl: 'R',
    ori: 'I',
    sra: 'R',
    andi: 'I',
    or: 'R',
    lui: 'U',
    and: 'R',
}

const OPCODE: Opcodes = {
    lb: '0000011',
    auipc: '0010111',
    addw: '0111011',
    ecall: '1110011',
    lh: '0000011',
    addiw: '0011011',
    subw: '0111011',
    ebreak: '1110011',
    lw: '0000011',
    slliw: '0011011',
    sllw: '0111011',
    CSRRW: '1110011',
    ld: '0000011',
    srliw: '0011011',
    srlw: '0111011',
    CSRRC: '1110011',
    lbu: '0000011',
    sraiw: '0011011',
    sraw: '0111011',
    CSRRWI: '1110011',
    lhu: '0000011',
    CSRRSI: '1110011',
    lwu: '0000011',
    sb: '0100011',
    beq: '1100011',
    CSRRCI: '1110011',
    sh: '0100011',
    bne: '1100011',
    fence: '0001111',
    sw: '0100011',
    blt: '1100011',
    'fence.i': '0001111',
    sd: '0100011',
    bge: '1100011',
    bltu: '1100011',
    addi: '0010011',
    add: '0110011',
    bgeu: '1100011',
    slli: '0010011',
    sub: '0110011',
    slti: '0010011',
    sll: '0110011',
    jalr: '1100111',
    sltiu: '0010011',
    slt: '0110011',
    jal: '1101111',
    xori: '0010011',
    sltu: '0110011',
    srli: '0010011',
    xor: '0110011',
    srai: '0010011',
    srl: '0110011',
    ori: '0010011',
    sra: '0110011',
    andi: '0010011',
    or: '0110011',
    lui: '0110111',
    and: '0110011',
}

const FUNCT3: Funct3 = {
    lb: '000',
    addw: '000',
    ecall: '000',
    lh: '001',
    addiw: '000',
    subw: '000',
    ebreak: '000',
    lw: '010',
    slliw: '001',
    sllw: '001',
    CSRRW: '001',
    ld: '011',
    srliw: '101',
    srlw: '101',
    CSRRC: '010',
    lbu: '100',
    sraiw: '101',
    sraw: '101',
    CSRRWI: '101',
    lhu: '101',
    CSRRSI: '110',
    lwu: '110',
    sb: '000',
    beq: '000',
    CSRRCI: '111',
    sh: '001',
    bne: '001',
    fence: '000',
    sw: '010',
    blt: '100',
    'fence.i': '001',
    sd: '011',
    bge: '101',
    bltu: '110',
    addi: '000',
    add: '000',
    bgeu: '111',
    slli: '001',
    sub: '000',
    slti: '010',
    sll: '001',
    jalr: '000',
    sltiu: '011',
    slt: '010',
    xori: '100',
    sltu: '011',
    srli: '101',
    xor: '100',
    srai: '101',
    srl: '101',
    ori: '110',
    sra: '101',
    andi: '111',
    or: '110',
    and: '111',
}

const FUNCT7: Funct7 = {
    addw: '0000000',
    ecall: '000000000000',
    subw: '0100000',
    ebreak: '000000000001',
    slliw: '0000000',
    sllw: '000000000000',
    srliw: '0000000',
    srlw: '0000000',
    sraiw: '0100000',
    sraw: '0100000',
    add: '0000000',
    slli: '0000000',
    sub: '0100000',
    sll: '0000000',
    slt: '0000000',
    sltu: '0000000',
    srli: '0000000',
    xor: '0000000',
    srai: '0100000',
    srl: '0000000',
    sra: '0100000',
    or: '0000000',
    and: '0000000',
}

function handler_string(input: string): string {
    let string = input
    if (string.includes('//')) {
        string = string.split('//')[0]
    }
    if (string.includes('#')) {
        string = string.split('#')[0]
    }

    string = string
        .replace(/\(|\)|,/g, ' ')
        .trim()
        .replace(/\s+/g, ' ')
        .trim()
    return string
}

function convert_hextodec(input: string): number {
    let string = input.slice(2).toUpperCase()
    let temp = ''
    for (let i = 0; i < string.length; i++) {
        switch (string[i]) {
            case '0':
                temp += '0000'
                break
            case '1':
                temp += '0001'
                break
            case '2':
                temp += '0010'
                break
            case '3':
                temp += '0011'
                break
            case '4':
                temp += '0100'
                break
            case '5':
                temp += '0101'
                break
            case '6':
                temp += '0110'
                break
            case '7':
                temp += '0111'
                break
            case '8':
                temp += '1000'
                break
            case '9':
                temp += '1001'
                break
            case 'A':
                temp += '1010'
                break
            case 'B':
                temp += '1011'
                break
            case 'C':
                temp += '1100'
                break
            case 'D':
                temp += '1101'
                break
            case 'E':
                temp += '1110'
                break
            case 'F':
                temp += '1111'
                break
        }
    }
    let s = 0
    temp = temp.split('').reverse().join('')
    for (let i = 0; i < temp.length; i++) {
        if (temp[i] === '1') {
            s += 2 ** i
        }
    }
    return s
}

function RType(input: string): string {
    const mlist = input.split(' ')

    const opcode = OPCODE[mlist[0]]
    const funct3 = FUNCT3[mlist[0]]
    const funct7 = FUNCT7[mlist[0]]
    const rd = register[mlist[1]]
    const rs1 = register[mlist[2]]
    const rs2 = register[mlist[3]]
    return funct7 + rs2 + rs1 + funct3 + rd + opcode
}

function IType(input: string): string {
    const mlist = input.split(' ')
    if (['lb', 'lw', 'lh', 'ld', 'lbu', 'lhu', 'lwu'].includes(mlist[0])) {
        const opcode = OPCODE[mlist[0]]
        const funct3 = FUNCT3[mlist[0]]
        const rd = register[mlist[1]]
        if (mlist[2].startsWith('0x')) {
            mlist[2] = convert_hextodec(mlist[2]).toString()
        }
        let imm = parseInt(mlist[2]).toString(2).padStart(12, '0')
        if (parseInt(mlist[2]) < 0) {
            imm = (1 << (12 + parseInt(mlist[2]))).toString(2).slice(-12)
        }
        const rs1 = register[mlist[3]]
        return imm + rs1 + funct3 + rd + opcode
    }

    if (['slli', 'srli', 'srai', 'slliw', 'srliw', 'sraiw'].includes(mlist[0])) {
        const opcode = OPCODE[mlist[0]]
        const funct3 = FUNCT3[mlist[0]]
        const rd = register[mlist[1]]
        const funct7 = FUNCT7[mlist[0]]
        if (mlist[3].startsWith('0x')) {
            mlist[3] = convert_hextodec(mlist[3]).toString()
        }
        let imm = parseInt(mlist[3]).toString(2).padStart(5, '0')
        if (parseInt(mlist[3]) < 0) {
            imm = (1 << (12 + parseInt(mlist[3]))).toString(2).slice(-5)
        }
        const rs1 = register[mlist[2]]
        return funct7 + imm + rs1 + funct3 + rd + opcode
    }

    if (['ecall', 'ebreak'].includes(mlist[0])) {
        const opcode = OPCODE[mlist[0]]
        const funct3 = FUNCT3[mlist[0]]
        const rd = register[mlist[1]]
        const funct7 = FUNCT7[mlist[0]]
        return funct7 + rd + funct3 + rd + opcode
    }

    const opcode = OPCODE[mlist[0]]
    const funct3 = FUNCT3[mlist[0]]
    const rd = register[mlist[1]]
    if (mlist[3].startsWith('0x')) {
        mlist[3] = convert_hextodec(mlist[3]).toString()
    }
    let imm = parseInt(mlist[3]).toString(2).padStart(12, '0')
    if (parseInt(mlist[3]) < 0) {
        imm = (1 << (12 + parseInt(mlist[3]))).toString(2).slice(-12)
    }
    const rs1 = register[mlist[2]]
    return imm + rs1 + funct3 + rd + opcode
}

function UJType(input: string): string {
    const mlist = input.split(' ')
    const opcode = OPCODE[mlist[0]]
    const rd = register[mlist[1]]
    let temp: number
    if (mlist[2].startsWith('0x')) {
        temp = convert_hextodec(mlist[2])
    } else {
        if (!isNaN(Number(mlist[2]))) {
            temp = parseInt(mlist[2])
        } else {
            temp = address[mlist[2]] - address[input]
        }
    }
    let imm = temp.toString(2).padStart(21, '0')
    if (temp < 0) {
        imm = (1 << (21 + temp)).toString(2).slice(-21)
    }
    imm = imm[0] + imm.slice(10, 20) + imm[9] + imm.slice(1, 9)
    return imm + rd + opcode
}

function SType(input: string): string {
    const mlist = input.split(' ')
    const opcode = OPCODE[mlist[0]]
    const rs2 = register[mlist[1]]
    if (mlist[2].startsWith('0x')) {
        mlist[2] = convert_hextodec(mlist[2]).toString()
    }
    let imm = parseInt(mlist[2]).toString(2).padStart(12, '0')
    if (parseInt(mlist[2]) < 0) {
        imm = (1 << (12 + parseInt(mlist[2]))).toString(2).slice(-12)
    }
    const rs1 = register[mlist[3]]
    return imm.slice(0, -5) + rs2 + rs1 + FUNCT3[mlist[0]] + imm.slice(-5) + opcode
}

function SBType(input: string): string {
    const mlist = input.split(' ')
    const opcode = OPCODE[mlist[0]]
    const rs1 = register[mlist[1]]
    const rs2 = register[mlist[2]]
    let temp: number
    if (mlist[3].startsWith('0x')) {
        temp = convert_hextodec(mlist[3])
    } else {
        if (!isNaN(Number(mlist[3])) || (mlist[3][1] && mlist[3][0] === '-')) {
            temp = parseInt(mlist[3])
        } else {
            temp = address[mlist[3]] - address[input]
        }
    }
    let imm = temp.toString(2).padStart(13, '0')
    if (temp < 0) {
        imm = (1 << (13 + temp)).toString(2).slice(-13)
    }
    return (
        imm[0] + imm.slice(2, 8) + rs2 + rs1 + FUNCT3[mlist[0]] + imm.slice(8, 12) + imm[1] + opcode
    )
}

function UType(input: string): string {
    const mlist = input.split(' ')
    console.log(input)

    const opcode = OPCODE[mlist[0]]
    // console.log('opcode: ' + opcode);

    const rd = register[mlist[1]]
    console.log('rd: ', rd)
    let temp: number
    if (mlist[2].startsWith('0x')) {
        temp = convert_hextodec(mlist[2])
    } else {
        if (!isNaN(Number(mlist[2]))) {
            temp = parseInt(mlist[2])
        } else {
            temp = address[mlist[2]]
        }
    }
    let imm = temp.toString(2).padStart(20, '0')
    if (temp < 0) {
        imm = (1 << (20 + temp)).toString(2)
    }
    return imm + rd + opcode
}
export function assemblerFromIns(code: string): string[] {
    const string = code
    let check_syntax_error = true

    let result = ''
    const ins = string.split('\n')
    let PC = 0
    let pos = 0
    while (pos < ins.length - 1) {
        ins[pos] = handler_string(ins[pos])
        if (ins[pos] === '.text') {
            break
        }
        pos++
    }

    for (let i = pos + 1; i < ins.length; i++) {
        ins[i] = handler_string(ins[i])
        if (ins[i] === ' ' || ins[i] === '' || ins[i] === '\n') {
            continue
        }

        const li = ins[i].split(' ')
        if (li.length === 1) {
            while (ins[i].includes(':')) {
                address[ins[i].split(':')[0]] = PC
                ins[i] = ins[i].split(':')[1]
            }
        } else {
            if (ins[i].includes(':')) {
                const label = ins[i].split(':')[0].trim()
                const instruction = ins[i].split(':')[1].trim()
                address[label] = PC
                address[instruction] = PC
                ins[i] = instruction
                PC += 4
            } else {
                ins[i] += ' ' + i.toString()
                address[ins[i]] = PC
                PC += 4
            }
        }
    }

    for (let i = pos + 1; i < ins.length; i++) {
        ins[i] = handler_string(ins[i])
        const t = ins[i].split(' ')
        if (t.length < 2) {
            continue
        }
        let string = ''
        console.log ('FMT[t[0]]', FMT[t[0]] )
        if (FMT[t[0]] === 'R') {
            string = RType(ins[i])
        }
        if (FMT[t[0]] === 'I') {
            string = IType(ins[i])
        }
        if (FMT[t[0]] === 'S') {
            string = SType(ins[i])
        }
        if (FMT[t[0]] === 'SB') {
            string = SBType(ins[i])
        }
        if (FMT[t[0]] === 'U') {
            string = UType(ins[i])
        }
        if (FMT[t[0]] === 'UJ') {
            string = UJType(ins[i])
        }

        result += string + '\n'
    }

    const lines = result.split('\n')
    lines.pop() // Remove the last element
    return lines
}
