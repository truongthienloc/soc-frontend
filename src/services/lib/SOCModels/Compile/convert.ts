// TypeScript

export function BinToHex(binaryStr: string): string {
    binaryStr = binaryStr.padStart(32, '0')
    const decimal = parseInt(binaryStr, 2)
    const hexadecimal = '0x' + decimal.toString(16).toUpperCase()
    return hexadecimal
}

export function BinToHex_without0x(binaryStr: string): string {
    binaryStr = binaryStr.padStart(32, '0')
    const decimal = parseInt(binaryStr, 2)
    const hexadecimal =  decimal.toString(16).toUpperCase()
    return hexadecimal
}

export function DecToHex(decimalNum: number): string {
    const hexChars = '0123456789ABCDEF'
    let hexResult = ''

    while (decimalNum > 0) {
        const remainder = decimalNum % 16
        hexResult = hexChars[remainder] + hexResult
        decimalNum = Math.floor(decimalNum / 16)
    }

    return '0x' + hexResult.padStart(8, '0')
}

export function dec(temp: string): number {
    let s = 0
    temp = temp.padStart(32, temp[0])
    temp = temp.split('').reverse().join('')

    for (let i = 0; i < temp.length; i++) {
        if (temp[i] === '1') {
            s += 2 ** i
        }
    }
    if (temp[temp.length - 1] === '1') {
        s -= 1 << 32
    }
    return s
}

export function convertHexToDec(hexStr: string): number {
    hexStr = hexStr.substring(2).toUpperCase()
    let binaryStr = ''

    for (let i = 0; i < hexStr.length; i++) {
        switch (hexStr[i]) {
            case '0':
                binaryStr += '0000'
                break
            case '1':
                binaryStr += '0001'
                break
            case '2':
                binaryStr += '0010'
                break
            case '3':
                binaryStr += '0011'
                break
            case '4':
                binaryStr += '0100'
                break
            case '5':
                binaryStr += '0101'
                break
            case '6':
                binaryStr += '0110'
                break
            case '7':
                binaryStr += '0111'
                break
            case '8':
                binaryStr += '1000'
                break
            case '9':
                binaryStr += '1001'
                break
            case 'A':
                binaryStr += '1010'
                break
            case 'B':
                binaryStr += '1011'
                break
            case 'C':
                binaryStr += '1100'
                break
            case 'D':
                binaryStr += '1101'
                break
            case 'E':
                binaryStr += '1110'
                break
            case 'F':
                binaryStr += '1111'
                break
        }
    }

    let s = 0
    binaryStr = binaryStr.split('').reverse().join('')
    for (let i = 0; i < binaryStr.length; i++) {
        if (binaryStr[i] === '1') {
            s += 2 ** i
        }
    }
    return s
}

export function convertBinToHex(binaryCode: string): string {
    switch (binaryCode) {
        case '0000':
            return '0'
        case '0001':
            return '1'
        case '0010':
            return '2'
        case '0011':
            return '3'
        case '0100':
            return '4'
        case '0101':
            return '5'
        case '0110':
            return '6'
        case '0111':
            return '7'
        case '1000':
            return '8'
        case '1001':
            return '9'
        case '1010':
            return 'A'
        case '1011':
            return 'B'
        case '1100':
            return 'C'
        case '1101':
            return 'D'
        case '1110':
            return 'E'
        case '1111':
            return 'F'
        default:
            return ''
    }
}

export function handleInstructionMemory(instructionMemory: { [key: string]: string }): {
    [key: string]: string
} {
    const instructionArr: { [key: string]: string } = {}

    for (const i in instructionMemory) {
        let instructions = ''
        instructions += convertBinToHex(instructionMemory[i].substring(0, 4))
        instructions += convertBinToHex(instructionMemory[i].substring(4, 8))
        instructions += convertBinToHex(instructionMemory[i].substring(8, 12))
        instructions += convertBinToHex(instructionMemory[i].substring(12, 16))
        instructions += convertBinToHex(instructionMemory[i].substring(16, 20))
        instructions += convertBinToHex(instructionMemory[i].substring(20, 24))
        instructions += convertBinToHex(instructionMemory[i].substring(24, 28))
        instructions += convertBinToHex(instructionMemory[i].substring(28, 32))
        instructionArr[
            '0x' +
                dec('0' + i)
                    .toString(16)
                    .padStart(8, '0')
        ] = '0x' + instructions
    }

    return instructionArr
}

export function handleRegister(register: { [key: string]: string }): { [key: string]: string } {
    const re = [
        'zero',
        'ra',
        'sp',
        'gp',
        'tp',
        't0',
        't1',
        't2',
        's0/fp',
        's1',
        'a0',
        'a1',
        'a2',
        'a3',
        'a4',
        'a5',
        'a6',
        'a7',
        's2',
        's3',
        's4',
        's5',
        's6',
        's7',
        's8',
        's9',
        's10',
        's11',
        't3',
        't4',
        't5',
        't6',
        '0',
    ]
    const mdic: { [key: string]: string } = {}

    let count = 0
    for (const i in register) {
        const value = dec(register[i])
        const hexValue = (value < 0 ? (1 << 32) + value : value).toString(16).padStart(8, '0')
        if (count < 10) {
            mdic[`x${count} (${re[count]})`.padEnd(10, ' ')] = `0x${hexValue}`
        } else {
            mdic[`x${count} (${re[count]})`.padEnd(9, ' ')] = `0x${hexValue}`
        }
        count++
    }
    return mdic
}

export function handleDataMemory(dataMemory: { [key: string]: string }): string[] {
    const dataList: number[] = []

    for (const i in dataMemory) {
        dataList.push(
            convertHexToDec(
                '0x' +
                    dec('0' + i)
                        .toString(16)
                        .padStart(8, '0'),
            ),
        )
    }
    dataList.sort((a, b) => a - b)

    const memDic: { [key: string]: string } = {}
    for (let i = 0; i < dataList.length; i++) {
        const key = dataList[i].toString(2).padStart(32, '0')
        const value = dec(dataMemory[key])
        const hexKey = dec('0' + key)
            .toString(16)
            .padStart(8, '0')
        const hexValue = (value < 0 ? (1 << 32) + value : value).toString(16).padStart(8, '0')
        memDic[`0x${hexKey}:`] = `0x${hexValue} ${value}`
    }

    const result: string[] = []
    for (const key in memDic) {
        result.push(`${key}\t${memDic[key]}`)
    }
    return result
}

export function rd(instruction: string): string {
    const opcode = instruction.substring(25)
    if (
        ['0110011', '0010011', '0000011', '0110111', '0010111', '1101111', '1100111'].includes(
            opcode,
        )
    ) {
        return instruction.substring(20, 25)
    }
    return '-1'
}

export function rs1(instruction: string): string {
    const opcode = instruction.substring(25)
    if (['0110011', '0010011', '0000011', '1100111', '0100011', '1100011'].includes(opcode)) {
        return instruction.substring(12, 17)
    }
    return '-2'
}

export function rs2(instruction: string): string {
    const opcode = instruction.substring(25)
    if (['0110011', '0100011', '1100011'].includes(opcode)) {
        return instruction.substring(7, 12)
    }
    return '-3'
}

export function stringToAsciiAndBinary(input: string): { binary: string[] } {
    // const asciiNumbers: number[] = [];
    const binaryNumbers: string[] = []

    for (let i = 0; i < input.length; i++) {
        const ascii = input.charCodeAt(i)
        // asciiNumbers.push(ascii);
        binaryNumbers.push(ascii.toString(2).padStart(8, '0')) // Convert to binary and pad with zeros
    }

    return { binary: binaryNumbers }
}
