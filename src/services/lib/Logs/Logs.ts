export default class Logs {
    protected container: HTMLDivElement
    protected currentLine?: HTMLPreElement

    constructor(containerQuery?: string) {
        const container = document.querySelector(containerQuery ?? '#logs')
        if (container === null) {
            throw new Error('Container query not exists')
        }
        this.container = container as HTMLDivElement
        this.onReady()
    }

    protected onReady() {}

    public print(...args: string[]): void {
        if (!this.currentLine) {
            this.currentLine = document.createElement('pre')
            this.container.appendChild(this.currentLine)
        }

        this.currentLine.textContent += args.join()
    }

    public println(...args: string[]): void {
        if (!this.currentLine) {
            this.currentLine = document.createElement('pre')
            this.container.appendChild(this.currentLine)
        }

        this.currentLine.textContent += args.join('')

        this.currentLine = document.createElement('pre')
        this.container.appendChild(this.currentLine)
    }

    public clear(): void {
        this.container.replaceChildren()
        this.currentLine = undefined
    }

    public getText(): string {
        const pres = this.container.querySelectorAll('pre')

        return Array.from(pres)
            .map((pre) => pre.textContent)
            .join('\n')
    }
}
