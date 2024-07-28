import * as fs from 'fs'
import * as path from 'path'
import Soc from '../SoC'

const FOLDER_INPUT = path.join(__dirname, '/input')
const FOLDER_OUTPUT = path.join(__dirname, '/output')

type RegisterListItem = {
    index: number
    value: string
}

function convertRegisters2String(registers: { [key: string]: string }): string {
    // console.log('registers: ', registers)
    const entries = Object.entries(registers)
    const registerList = entries.map(([key, value]) => {
        const hex = parseInt(value, 2).toString(16).padStart(8, '0').toLocaleLowerCase()
        return {
            index: parseInt(key, 2),
            value: `0x${hex}`,
        } as RegisterListItem
    })

    const sortedList = registerList.sort((a, b) => a.index - b.index)

    let result = 'Register Expected Results\n'
    result += sortedList
        .map((item) => {
            return `## expect[${item.index}] = ${item.value}`
        })
        .join('\n')

    // console.log('result: ', result);

    return result
}

async function writeFile(fileName: string, content: string): Promise<void> {
    try {
        const filePath = path.join(FOLDER_OUTPUT, fileName)
        await fs.promises.writeFile(filePath, content, 'utf8')
        console.log(`File ${fileName} has been written`)
    } catch (err) {
        console.error(`Error writing file ${fileName} to ${FOLDER_OUTPUT}:`, err)
    }
}

async function executeFile(fileName: string): Promise<void> {
    try {
        if (fileName.split('.')[1].toLocaleUpperCase() !== 'S') {
            return
        }

        console.log('Execute file: ', fileName)
        const filePath = path.join(FOLDER_INPUT, fileName)
        const fileContent = await fs.promises.readFile(filePath, 'utf8')

        const SOC = new Soc('super SoC')
        SOC.Processor.active = true
        SOC.assemble(fileContent)
        SOC.Processor.RunAll()

        const result = convertRegisters2String(SOC.Processor.register)

        const fileOutput = fileName.split('.')[0].concat('.txt')
        await writeFile(fileOutput, result)
    } catch (error) {}
}

async function readAllFiles() {
    try {
        const files = await fs.promises.readdir(FOLDER_INPUT)

        // executeFile(files[0])

        files.forEach(async (file) => {
            executeFile(file)
        })
    } catch (err) {
        console.error(err)
    }
}

readAllFiles()
