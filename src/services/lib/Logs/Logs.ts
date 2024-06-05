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

    protected print(...args: string[]): void {
        if (!this.currentLine) {
            this.currentLine = document.createElement('pre')
            this.container.appendChild(this.currentLine)
        }

        this.currentLine.textContent += args.join()
    }

    protected println(...args: string[]): void {
        if (!this.currentLine) {
            this.currentLine = document.createElement('pre')
            this.container.appendChild(this.currentLine)
        }

        this.currentLine.textContent += args.join()

        this.currentLine = document.createElement('pre')
        this.container.appendChild(this.currentLine)
    }
}
