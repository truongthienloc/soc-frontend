import Port from '..'
import { InputData } from '../../types'

export interface PortOptions {
    color?: string
    radius?: number
}

export default class VPort extends Port {
    private active: boolean = false
    private options: PortOptions
    private activeColor: string = 'red'
    constructor(
        context: CanvasRenderingContext2D,
        x: number,
        y: number,
        options: PortOptions = {},
    ) {
        super(context, x, y, options.color)
        this.options = options
    }

    public render(dt: number): void {
        super.render(dt)
        this.context.fillStyle = this.active ? this.activeColor : this.options?.color ?? 'black'
        this.context.fill()
        this.context.restore()
    }

    public load(data: InputData, callback?: (() => void) | undefined): void {
        super.load(data, callback)
        this.active = true

        if (!data.color) {
            return
        }

        this.activeColor = data.color
    }
}
