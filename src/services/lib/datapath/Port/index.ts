import short from 'short-uuid'
import { IGraphObject, Point, ILoader, InputData } from '../types'
import Scene from '../Scene'

// export interface PortOptions {
//     color?: string;
//     radius?: number;
// }

export default class Port implements IGraphObject {
    private _id: string
    public readonly x: number
    public readonly y: number
    protected color: string
    public name?: string

    protected context: CanvasRenderingContext2D

    protected outputs: Map<string, ILoader> = new Map()

    static R = 0.25

    constructor(
        context: CanvasRenderingContext2D,
        x: number,
        y: number,
        color?: string,
        id?: string,
        name?: string,
    ) {
        this._id = id ?? short.generate()
        this.name = name
        this.x = x
        this.y = y
        this.color = color || 'black'

        this.context = context

        this.render(0)
    }

    get id(): string {
        return this._id
    }

    public getXY(): Point {
        return { x: this.x, y: this.y }
    }

    public addOutput(output: ILoader): void {
        this.outputs.set(output.id, output)
    }

    public render(dt: number): void {
        const x = this.x * Scene.CELL
        const y = this.y * Scene.CELL
        const r = Port.R * Scene.CELL

        this.context.beginPath()
        this.context.arc(x, y, r, 0, 2 * Math.PI)
        this.context.fillStyle = 'white'
        this.context.fill()
        this.context.lineWidth = 2
        this.context.strokeStyle = this.color
        this.context.stroke()
        this.context.closePath()

        this.context.restore()
    }

    public load(data: InputData, callback?: () => void): void {
        const newData = { ...data, srcId: this.id }
        if (this.name) {
            newData.srcName = this.name
            const findedData = data.value.find((value) => value.name === this.name)
            if (findedData) {
                newData.color = findedData.value
            } else if (this.name === 'control') {
                newData.color = 'blue'
            } else {
                newData.color = Scene.NULL_COLOR
            }
            // console.log('Color: ', this.name, newData.color);
        }
        const outputs = this.outputs.entries()
        for (const [, output] of outputs) {
            output.load(newData)
        }

        if (callback) {
            callback()
        }
    }

    public destroy(): void {
        this.outputs.clear()
    }
}
