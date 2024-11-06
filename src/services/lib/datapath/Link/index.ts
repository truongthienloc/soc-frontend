import short from 'short-uuid'
import Port from '../Port'
import VPort from '../Port/VPort'
import { IGraphObject, Point, ILoader, InputData } from '../types'
import LineSegment, { LineSegmentOptions } from '../LineSegment'
import Scene from '../Scene'

import { Vector } from '../Helpers'

interface TextProps {
    text: string
    color?: string
    fontSize?: number
    spacingX?: number
    spacingY?: number
}

export interface LinkOptions {
    color?: string
    width?: number
    noArrow?: boolean
    firstText?: TextProps
    speed?: number
}

export default class Link implements IGraphObject, ILoader {
    private _id: string
    private srcPort: Port
    private desPort: Port

    private context: CanvasRenderingContext2D

    private lineSegments: Map<number, LineSegment> = new Map()
    private breakpoints: Point[] = []

    private active: boolean = false
    private activeColor: string = 'red'
    private indexLineLoading: number = 0
    private data: any

    private options: LinkOptions

    constructor(
        context: CanvasRenderingContext2D,
        srcPort: Port,
        desPort: Port,
        options: LinkOptions = { color: 'black', width: 2, noArrow: undefined },
    ) {
        this._id = short.generate()
        this.srcPort = srcPort
        this.desPort = desPort
        this.options = options

        this.srcPort.addOutput(this)

        this.context = context
        this.init()
        this.render(0)
    }

    get id(): string {
        return this._id
    }

    private init(): void {
        const startPoint = this.getStartPoint()
        const endPoint = this.getEndPoint()

        this.addLineSegment(startPoint.x, startPoint.y, endPoint.x, endPoint.y, undefined, {
            ...this.options,
        })
    }

    public render(dt: number): void {
        let ls: LineSegment | undefined
        for (const [, lineSegment] of this.lineSegments.entries()) {
            lineSegment.render(dt)
            ls = lineSegment
        }

        const lineSegment = ls as LineSegment
        const vector = Vector.fromPoints(lineSegment.sPoint, lineSegment.dPoint)
        if (!(this.desPort instanceof VPort) && !this.options?.noArrow) {
            this.drawArrow(vector.angle())
        }

        this.renderText()
    }

    public addBreakpoint(x: number, y: number): void {
        this.breakpoints.push({ x, y })
        this.clearAllLineSegments()

        let startPoint = this.getStartPoint()
        // const desPoint = this.desPort.getXY();
        let index = 0
        for (const breakpoint of this.breakpoints) {
            index++
            this.addLineSegment(startPoint.x, startPoint.y, breakpoint.x, breakpoint.y, index, {
                ...this.options,
            })
            startPoint = breakpoint
        }

        const endPoint = this.getEndPoint()

        this.addLineSegment(startPoint.x, startPoint.y, endPoint.x, endPoint.y, index + 1, {
            ...this.options,
        })
    }

    public load(data: InputData, callback?: () => void): void {
        this.data = data
        this.indexLineLoading = 1
        if (data.color) {
            this.activeColor = data.color
        }
        this.active = false
        const firstLine = this.lineSegments.get(1)
        firstLine?.load(data, this.lsFinishedLoading.bind(this))
        if (callback) {
            callback()
        }
    }

    private lsFinishedLoading() {
        this.indexLineLoading++

        if (this.indexLineLoading > this.lineSegments.size) {
            this.indexLineLoading = 0
            this.active = true
            this.desPort.load(this.data)
            return
        }

        const lineSegment = this.lineSegments.get(this.indexLineLoading)

        lineSegment?.load(this.data, this.lsFinishedLoading.bind(this))
    }

    private clearAllLineSegments(): void {
        for (const [, lineSegment] of this.lineSegments.entries()) {
            lineSegment.destroy()
        }

        this.lineSegments.clear()
    }

    private renderText(): void {
        if (!this.options?.firstText) {
            return
        }
        // console.log(this.options.firstText);

        const { text, color, spacingX, spacingY } = this.options.firstText
        const position = this.getStartPoint()
        const textX = (position.x + (spacingX ?? 0)) * Scene.CELL
        const textY = (position.y + (spacingY ?? 0)) * Scene.CELL
        this.context.font = `${Scene.FONT_SIZE}px Arial`
        this.context.fillStyle = color || 'black'
        this.context.textAlign = 'left'
        this.context.textBaseline = 'bottom'
        this.context.fillText(text, textX, textY)
    }

    private addLineSegment(
        fx: number,
        fy: number,
        lx: number,
        ly: number,
        index: number = 1,
        options?: LineSegmentOptions,
    ): LineSegment {
        const _lineSegment = new LineSegment(this.context, fx, fy, lx, ly, index, options)
        this.lineSegments.set(_lineSegment.index, _lineSegment)
        return _lineSegment
    }

    private drawArrow(angle: number = 0): void {
        const endPoint = this.getEndPoint()

        const { x: xt, y: yt } = endPoint
        const x = xt * Scene.CELL
        const y = yt * Scene.CELL
        const size = 0.65 * Scene.CELL // Độ dài một cạnh của tam giác
        const height = (Math.sqrt(3) / 2) * size // Chiều cao của tam giác

        // Di chuyển tọa độ gốc về tâm của tam giác
        this.context.translate(x, y)

        // Xoay theo góc truyền vào
        this.context.rotate((angle * Math.PI) / 180)

        // Di chuyển tọa độ về lại đỉnh của tam giác
        this.context.translate(-x, -y)

        this.context.beginPath()
        this.context.moveTo(x, y - height / 2)
        this.context.lineTo(x - size / 2, y + height / 2)
        this.context.lineTo(x + size / 2, y + height / 2)
        this.context.closePath()
        this.context.fillStyle = this.active ? this.activeColor : this.options.color || 'black'
        this.context.fill()

        this.context.resetTransform()
        this.context.restore()
    }

    private getStartPoint(): Point {
        if (!(this.srcPort instanceof VPort)) {
            const srcPoint = this.srcPort.getXY()

            let endPoint = this.desPort.getXY()
            if (this.breakpoints.length > 0) {
                endPoint = this.breakpoints[0]
            }

            const vt = Vector.fromPoints(srcPoint, endPoint).normalize()

            return {
                x: srcPoint.x + vt.x * Port.R,
                y: srcPoint.y + vt.y * Port.R,
            }
        }

        return this.srcPort.getXY()
    }

    private getEndPoint(): Point {
        if (
            !(this.desPort instanceof VPort) &&
            (this.options.noArrow === undefined || this.options.noArrow === false)
        ) {
            const desPoint = this.desPort.getXY()

            let startPoint = this.srcPort.getXY()
            if (this.breakpoints.length > 0) {
                startPoint = this.breakpoints[this.breakpoints.length - 1]
            }

            const vt = Vector.fromPoints(startPoint, desPoint).normalize()

            return {
                x: desPoint.x - vt.x * 2 * Port.R,
                y: desPoint.y - vt.y * 2 * Port.R,
            }
        } else {
            const desPoint = this.desPort.getXY()

            let startPoint = this.srcPort.getXY()
            if (this.breakpoints.length > 0) {
                startPoint = this.breakpoints[this.breakpoints.length - 1]
            }

            let vt = Vector.fromPoints(startPoint, desPoint).normalize()
            if (Number.isNaN(vt.x) || Number.isNaN(vt.y)) {
                vt = { x: 0, y: 0 } as Vector
            }

            return {
                x: desPoint.x - vt.x * Port.R,
                y: desPoint.y - vt.y * Port.R,
            }
        }

        // return this.desPort.getXY() - Port.R;
    }
}
