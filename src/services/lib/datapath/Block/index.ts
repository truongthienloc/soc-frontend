import short from 'short-uuid'
import Scene from '../Scene'
import Port from '../Port'
import { PortType, ILoader, IGraphObject, Point, InputData } from '../types'

export default class Block implements IGraphObject, ILoader {
    private _id: string
    public readonly width: number
    public readonly height: number
    public readonly x: number
    public readonly y: number
    protected color: string
    protected borderColor: string

    protected context: CanvasRenderingContext2D

    protected enableRenderDefault: boolean = true

    protected ports: Map<string, Port> = new Map()
    protected inputs: Map<string, InputData> = new Map()
    protected countInputPorts: number = 0
    protected outputs: Map<string, Port> = new Map()

    constructor(
        context: CanvasRenderingContext2D,
        x: number,
        y: number,
        width: number,
        height: number,
        color?: string,
        borderColor?: string,
    ) {
        this._id = short.generate()
        this.height = height
        this.width = width
        this.x = x
        this.y = y
        this.color = color || 'white'
        this.borderColor = borderColor || 'black'

        this.context = context

        this.render(0)
    }

    get id(): string {
        return this._id
    }

    public render(dt: number): void {
        if (this.enableRenderDefault) {
            this.context.fillStyle = this.color
            const x = this.x * Scene.CELL
            const y = this.y * Scene.CELL
            const w = this.width * Scene.CELL
            const h = this.height * Scene.CELL
            this.context.fillRect(x, y, w, h)

            this.context.beginPath()
            this.context.rect(x, y, w, h)
            this.context.lineWidth = 2 // Kích thước đường viền là 1px
            this.context.strokeStyle = this.borderColor // Màu sắc đường viền là màu đen
            this.context.stroke()
            this.context.closePath()
        }

        for (const [, port] of this.ports.entries()) {
            port.render(dt)
        }
    }

    public destroy(): void {
        for (const [, port] of this.ports.entries()) {
            port.destroy()
        }
        for (const [, output] of this.outputs.entries()) {
            output.destroy()
        }

        this.ports.clear()
        this.outputs.clear()
        this.inputs.clear()
    }

    public load(
        { type = 'once', srcId, value }: InputData,
        callback?: (() => void) | undefined,
    ): void {
        const data = { type, value, srcId }
        this.inputs.set(srcId, data)

        if (this.inputs.size === this.countInputPorts) {
            const outputs = this.outputs.entries()
            for (const [, output] of outputs) {
                output.load(data)
            }
            this.inputs.clear()
        }

        if (callback) {
            callback()
        }
    }

    public loadout(
        { type = 'once', srcId, value }: InputData,
        callback?: (() => void) | undefined,
    ): void {
        const data = { type, srcId, value }
        const outputs = this.outputs.entries()
        for (const [, output] of outputs) {
            output.load(data)
        }

        if (callback) {
            callback()
        }
    }

    public createPort(
        xt: number,
        yt: number,
        type: PortType,
        color?: string,
        id?: string,
        name?: string,
    ): Port {
        const _port = new Port(this.context, this.x + xt, this.y + yt, color, id, name)
        this.ports.set(_port.id, _port)
        if (type === 'input') {
            this.countInputPorts++
            _port.addOutput(this)
        } else if (type === 'output') {
            this.outputs.set(_port.id, _port)
        }
        return _port
    }

    public getPort(id: string) {
        return this.ports.get(id)
    }

    public getXY(): Point {
        return { x: this.x, y: this.y }
    }

    protected createText(
        text: string,
        x: number,
        y: number,
        bold: boolean = false,
        textAlign: CanvasTextAlign = 'left',
        textBaseline: CanvasTextBaseline = 'top',
        textColor: string = this.borderColor,
    ): void {
        const spacing = 0.1
        let spacingX = 0
        let spacingY = 0
        if (textAlign === 'left') {
            spacingX = spacing
        } else if (textAlign === 'right') {
            spacingX = -spacing
        }

        if (textBaseline === 'top') {
            spacingY = spacing
        } else if (textBaseline === 'bottom') {
            spacingY = -spacing
        }

        const textX = (this.x + x + spacingX) * Scene.CELL
        const textY = (this.y + y + spacingY) * Scene.CELL
        this.context.font = `${bold ? 'bold ' : ''}${Scene.FONT_SIZE}px Arial`
        this.context.fillStyle = textColor
        this.context.textAlign = textAlign
        this.context.textBaseline = textBaseline
        this.context.fillText(text, textX, textY)
    }
}
