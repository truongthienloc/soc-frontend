import { IOModule, Module } from '../soc'

export default class Monitor {
    protected containerQuery: string
    private monitorIO: IOModule

    public getContainerQuery(): string {
        return this.containerQuery
    }

    constructor(containerQuery: string, monitorIO: IOModule) {
        this.containerQuery = containerQuery
        this.monitorIO = monitorIO
        this.openMonitorBehavior()
        this.initIOEvent()
    }

    private initIOEvent() {
        this.monitorIO.getEvent().on(Module.EVENT.ACTIVATE, this.openMonitorBehavior)
        this.monitorIO.getEvent().on(Module.EVENT.INACTIVATE, this.closeMonitorBehavior)
    }

    private openMonitorBehavior = () => {
        this.closeMonitorBehavior()

        const monitor = document.querySelector(this.containerQuery) as HTMLDivElement
        let currentLine = document.createElement('div')
        currentLine.classList.add('line')
        let userSpan = document.createElement('span')
        let writeSpan = document.createElement('pre')
        const pointerSpan = document.createElement('span')

        userSpan.textContent = '@User>'
        pointerSpan.classList.add('pointer')
        currentLine.appendChild(userSpan)
        currentLine.appendChild(writeSpan)
        currentLine.appendChild(pointerSpan)
        monitor.appendChild(currentLine)
    }

    private closeMonitorBehavior = () => {
        const monitor = document.querySelector(this.containerQuery) as HTMLDivElement
        monitor.replaceChildren()
    }

    public print(key: string): void {
        if (!this.monitorIO.getActivated()) {
            return
        }

        const monitor = document.querySelector(this.containerQuery) as HTMLDivElement

        const line = monitor.getElementsByClassName('line')
        let currentLine = line[line.length - 1]
        let userSpan = currentLine.getElementsByTagName('span')[0]
        let writeSpan = currentLine.getElementsByTagName('pre')[0]
        const pointerSpan = currentLine.getElementsByClassName('pointer')[0]

        const handleKeyClick = (key: string) => {
            writeSpan.textContent += key
            // chars = writeSpan.textContent?.split('') ?? []
        }

        const handleDeleteClick = () => {
            const chars = writeSpan.textContent?.split('')
            chars?.pop()
            writeSpan.textContent = chars?.join('') ?? ''
        }

        const handleEnterClick = () => {
            currentLine = document.createElement('div')
            currentLine.classList.add('line')
            userSpan = document.createElement('span')
            writeSpan = document.createElement('pre')
            userSpan.textContent = '@User>'
            currentLine.appendChild(userSpan)
            currentLine.appendChild(writeSpan)
            currentLine.appendChild(pointerSpan)

            monitor.appendChild(currentLine)
        }

        if (key.length === 1) {
            if (key >= 'a' && key <= 'z') {
                handleKeyClick(key)
            } else if (key >= 'A' && key <= 'Z') {
                handleKeyClick(key)
            } else if (key >= '0' && key <= '9') {
                handleKeyClick(key)
            } else if (key === ' ') {
                handleKeyClick(key)
            }
        } else {
            if (key === 'Backspace') {
                handleDeleteClick()
            } else if (key === 'Enter') {
                handleEnterClick()
            }
        }
    }

    public println(...args: string[]): void {
        const monitor = document.querySelector(this.containerQuery) as HTMLDivElement

        const line = monitor.getElementsByClassName('line')
        let currentLine = line[line.length - 1]
        let userSpan = currentLine.getElementsByTagName('span')[0]
        let writeSpan = currentLine.getElementsByTagName('pre')[0]
        const pointerSpan = currentLine.getElementsByClassName('pointer')[0]

        writeSpan.textContent = args.join('')

        currentLine = document.createElement('div')
        currentLine.classList.add('line')
        userSpan = document.createElement('span')
        writeSpan = document.createElement('pre')
        userSpan.textContent = '@User>'
        currentLine.appendChild(userSpan)
        currentLine.appendChild(writeSpan)
        currentLine.appendChild(pointerSpan)

        monitor.appendChild(currentLine)
    }

    public clear() {
        this.closeMonitorBehavior()
        this.openMonitorBehavior()
    }

    public destroy() {
        console.log('Monitor destroy')

        this.closeMonitorBehavior()
        this.monitorIO.getEvent().off(Module.EVENT.ACTIVATE, this.openMonitorBehavior)
        this.monitorIO.getEvent().off(Module.EVENT.INACTIVATE, this.closeMonitorBehavior)
    }
}
