// TypeScript

type Register = {
    name: string
    value: string
}

export function dec(temp: string): number {
    //('temp: ', temp);

    let s = 0
    temp = temp.padStart(32, temp[0])
    temp = temp.split('').reverse().join('')

    for (let i = 0; i < temp.length; i++) {
        if (temp[i] === '1') {
            s += 2 ** i
        }
    }
    if (temp[temp.length - 1] === '1') {
        s = s- 4294967296 // 1<<32
        
    }
    return s
}

export function mux(input1: any, input2: any, sel: number): any {
    if (sel === 0) {
        return input1
    }
    if (sel === 1) {
        return input2
    }
}

export function handleRegister(register: { [key: string]: string }): Register[] {
    // prettier-ignore
    const re = [
        'zero', 'ra', 'sp', 'gp', 'tp', 't0', 't1',
        't2', 's0/fp', 's1', 'a0', 'a1', 'a2', 'a3',
        'a4', 'a5', 'a6', 'a7', 's2', 's3', 's4',
        's5', 's6', 's7', 's8', 's9', 's10', 's11',
        't3', 't4', 't5', 't6',
    ]
    const mdic: { [key: string]: string } = {}
    let count = 0
    const registers: Register[] = []

    for (const i in register) {
        const value = dec(register[i])
        count = dec('0' + i)
        const hexValue =
            '0x' + (value < 0 ? (1 << 32) + value : value).toString(16).padStart(8, '0')
        const registerName = `x${count} (${re[count]})`.padEnd(count < 10 ? 10 : 9, ' ')

        registers.push({ name: registerName, value: hexValue })
        // mdic[`${registerName}:`] = `0x${hexValue}  ${value}`
    }
    // console.log(registers)
    return registers.sort((a, b) => {
        const numA = parseInt(a.name.match(/\d+/)?.[0] || '0', 10)
        const numB = parseInt(b.name.match(/\d+/)?.[0] || '0', 10)
        return numA - numB
    })
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

export function handleImem(instructionMemory: { [key: string]: string }): string[] {
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
        instructionArr[dec('0' + i)] = '0x' + instructions
    }

    const instructionMemoryArray: string[] = []
    for (const i in instructionArr) {
        instructionMemoryArray.push(`${i}:\t${instructionArr[i]}`)
    }
    return instructionMemoryArray
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

export function handleDmem(dataMemory: { [key: string]: string }): string[] {
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

    const dataMemoryArray: string[] = []
    for (const key in memDic) {
        dataMemoryArray.push(`${key}\t${memDic[key]}`)
    }
    return dataMemoryArray
}
