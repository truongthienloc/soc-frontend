import Block from '..'
import Scene from '../../Scene'
import { InputData } from '../../types'
import BSection from './BSection'

export default class Buffer extends Block {
    private name: string = ''
    private sections: BSection[] = []
    protected finishSignalCallbacks: Function[] = []

    private countFinishedSections = 0

    constructor(
        context: CanvasRenderingContext2D,
        x: number,
        y: number,
        name: string = '',
        w: number = 4,
        h: number = 10,
    ) {
        super(context, x, y, w, h)
        this.name = name
        this.enableRenderDefault = false
    }

    public render(dt: number): void {
        super.render(dt)

        if (this.name) {
            this.createText(this.name, this.width / 2, -1, true, 'center', 'top')
        }

        if (!this.sections) {
            return
        }
        for (const _section of this.sections) {
            _section.render(dt)
        }
    }

    public createSection(h: number): BSection {
        if (this.sections.length > 0) {
            const lastSection = this.sections[this.sections.length - 1]
            const x = this.x
            const y = lastSection.getXY().y + lastSection.height
            const w = this.width
            const _section = new BSection(this.context, x, y, w, h)
            this.sections.push(_section)
            _section.connectFinishSignal(this.handleFinishSection.bind(this))
            return _section
        }

        const _section = new BSection(this.context, this.x, this.y, this.width, h)
        this.sections.push(_section)
        _section.connectFinishSignal(this.handleFinishSection.bind(this))
        return _section
    }

    public getSection(index: number): BSection {
        return this.sections[index]
    }

    public destroy(): void {
        super.destroy()
        for (const _section of this.sections) {
            _section.destroy()
        }
        this.sections = []
        this.finishSignalCallbacks = []
    }

    public connectFinishSignal(callback: () => void): void {
        this.finishSignalCallbacks.push(callback)
    }

    private handleFinishSection(): void {
        this.countFinishedSections++
        if (this.countFinishedSections === this.sections.length) {
            this.finishSignalCallbacks.forEach((callback) => callback())
        }
    }

    public load({ type, srcId, value }: InputData, callback?: (() => void) | undefined): void {
        for (const section of this.sections) {
            section.loadFromBuffer({ type, srcId, value })
        }
    }
}
