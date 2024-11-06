import Block from '..'
import Port from '../../Port'
import Scene from '../../Scene'
import { InputData } from '../../types'

type BlockText = {
    text: string
    x: number
    y: number
    bold: boolean
    textAlign: CanvasTextAlign
    textBaseline: CanvasTextBaseline
    textColor: string
}

export default class BSection extends Block {
    private texts: BlockText[] = []
    protected finishSignalCallbacks: Function[] = []

    constructor(
        context: CanvasRenderingContext2D,
        x: number,
        y: number,
        w: number = 4.5,
        h: number = 10,
    ) {
        super(context, x, y, w, h)
    }

    public render(dt: number): void {
        super.render(dt)

        if (!this.texts) {
            return
        }
        for (const _text of this.texts) {
            this.createText(
                _text.text,
                _text.x,
                _text.y,
                _text.bold,
                _text.textAlign,
                _text.textBaseline,
                _text.textColor,
            )
        }
    }

    public addText(
        text: string,
        x: number,
        y: number,
        bold: boolean = true,
        textAlign: CanvasTextAlign = 'left',
        textBaseline: CanvasTextBaseline = 'top',
        textColor: string = Scene.BORDER_COLOR,
    ): void {
        this.texts.push({ text, x, y, bold, textAlign, textBaseline, textColor })
    }

    public destroy(): void {
        this.texts = []
        this.finishSignalCallbacks = []
    }

    public getPort(id: string): Port {
        return super.getPort(id) as Port
    }

    public connectFinishSignal(callback: () => void): void {
        this.finishSignalCallbacks.push(callback)
    }

    public load({ type, srcId, value }: InputData, callback?: (() => void) | undefined): void {
        const data = { type, value, srcId }
        this.inputs.set(srcId, data)
        if (this.inputs.size === this.countInputPorts) {
            this.finishSignalCallbacks.forEach((callback) => callback())
        }
    }

    public loadFromBuffer(input: InputData): void {
        super.loadout(input)
    }
}
