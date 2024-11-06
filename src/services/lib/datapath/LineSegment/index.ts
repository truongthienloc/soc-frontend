import short from 'short-uuid'
import Scene from '../Scene'
import { Vector } from '../Helpers'
import { IGraphObject, InputData, Point } from '../types'

export interface LineSegmentOptions {
    color?: string
    width?: number
    speed?: number
}

export default class LineSegment implements IGraphObject {
    private _id: string
    private fx: number
    private fy: number
    private lx: number
    private ly: number
    private context: CanvasRenderingContext2D
    private options?: LineSegmentOptions

    private activeColor: string = 'red'
    private loadingLength: number = 0
    private loadingSpeed: number = 0.01
    private isLoading: boolean = false
    private finish?: () => void

    public index: number

    constructor(
        context: CanvasRenderingContext2D,
        fx: number,
        fy: number,
        lx: number,
        ly: number,
        index: number = -1,
        options?: LineSegmentOptions,
    ) {
        this._id = short.generate()
        this.fx = fx
        this.fy = fy
        this.lx = lx
        this.ly = ly
        this.index = index
        this.options = options

        this.loadingSpeed = options?.speed || 0.02

        this.context = context

        this.render(0)
    }

    get id(): string {
        return this._id
    }

    get sPoint(): Point {
        return { x: this.fx, y: this.fy }
    }

    get dPoint(): Point {
        return { x: this.lx, y: this.ly }
    }

    public destroy(): void {}

    public render(dt: number): void {
        const fx = this.fx * Scene.CELL
        const fy = this.fy * Scene.CELL
        const lx = this.lx * Scene.CELL
        const ly = this.ly * Scene.CELL

        // Base render
        this.context.beginPath()
        this.context.moveTo(fx, fy)
        this.context.lineTo(lx, ly)
        this.context.strokeStyle = this.options?.color ?? 'black'
        this.context.lineWidth = this.options?.width ?? 2
        this.context.stroke()
        this.context.closePath()

        // Loading render
        if (this.isLoading) {
            const v = this.loadingSpeed / 1000
            const ds = v * dt

            this.loadingLength = Math.min(this.loadingLength + ds, this.getLength())

            if (this.loadingLength === this.getLength()) {
                this.isLoading = false
                this.finish?.()
            }
        }

        const loadingLength = this.loadingLength * Scene.CELL

        const vector = Vector.fromXY(fx, fy, lx, ly).normalize().multiply(loadingLength)
        this.context.beginPath()
        this.context.moveTo(fx, fy)
        this.context.lineTo(fx + vector.x, fy + vector.y)
        this.context.strokeStyle = this.activeColor
        this.context.lineWidth = 2
        this.context.stroke()
        this.context.closePath()

        this.context.restore()
    }

    public getLength(): number {
        const { fx, fy, lx, ly } = this
        return Math.sqrt((lx - fx) ** 2 + (ly - fy) ** 2)
    }

    public load(data: InputData, finish: () => void): void {
        if (data.color) {
            this.activeColor = data.color
        }
        this.isLoading = true
        this.loadingLength = 0
        this.finish = finish
    }

    public clearLoading(): void {
        this.loadingLength = 0
    }
}
