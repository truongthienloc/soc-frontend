import Konva from 'konva'
import { TileLinkObject } from '../TileLinkObject'
import { Scene } from '../Scene'
import { SceneChildOptions } from '../../types/options'
import Adapter from '../Adapter/Adapter'

export type InterconnectOptions = {} & SceneChildOptions

export default class Interconnect extends TileLinkObject {
    protected layer: Konva.Layer
    protected options: InterconnectOptions

    protected shape!: Konva.Group
    protected adapters: Map<string, Adapter> = new Map()

    constructor(
        layer: Konva.Layer,
        x: number,
        y: number,
        w: number = 23,
        h: number = 2,
        options: InterconnectOptions,
    ) {
        super()
        this.layer = layer
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.options = options

        this.initShape()
        this.initText()
        this.initAdapter()
    }

    protected initShape(): void {
        const { x, y, w, h } = this
        const toPixel = Scene.toPixel
        this.shape = new Konva.Group({
            x: toPixel(x),
            y: toPixel(y),
        })

        const bodyShape = new Konva.Rect({
            x: 0,
            y: 0,
            width: toPixel(w),
            height: toPixel(h),
            fill: Scene.FILL_COLOR,
            stroke: Scene.BORDER_COLOR,
        })

        this.shape.add(bodyShape)
        this.layer.add(this.shape)
    }

    protected initText(): void {
        const { w, h } = this
        const toPixel = Scene.toPixel
        const text = new Konva.Text({
            width: toPixel(w),
            height: toPixel(h),
            text: 'Interconnect',
            verticalAlign: 'middle',
            align: 'center',
        })

        this.shape.add(text)
    }

    protected initAdapter(): void {
        // this.createAdapter('a001', 2.5, -0.5, 'top')
        // this.createAdapter('a002', 8.5, -0.5, 'top')
        // this.createAdapter('a003', 14.5, -0.5, 'top')
        // this.createAdapter('a004', 20.5, -0.5, 'top')
        // this.createAdapter('a005', 2.5, this.h + 0.5, 'bottom')
        // this.createAdapter('a006', 11, this.h + 0.5, 'bottom')
        // this.createAdapter('a007', 20.5, this.h + 0.5, 'bottom')

        this.createAdapter('t001', 2.5, 0)
        this.createAdapter('t002', 8.5, 0)
        this.createAdapter('t003', 14.5, 0)
        this.createAdapter('t004', 20.5, 0)
        this.createAdapter('b001', 2.5, this.h)
        this.createAdapter('b002', 8.5, this.h)
        this.createAdapter('b003', 14.5, this.h)
        this.createAdapter('b004', 20.5, this.h)
    }

    protected createAdapter(
        name: string,
        x: number,
        y: number,
        // dir: 'top' | 'bottom',
    ): void {
        const toPixel = Scene.toPixel
        // const w = 2
        // const h = 1
        // const oy = dir === 'top' ? 0 : h

        const shape1 = new Konva.Rect({
            x: toPixel(x),
            y: toPixel(y),
            // width: toPixel(w),
            // height: toPixel(h),
            // fill: 'white',
            // stroke: 'black',
            // offsetX: toPixel(w / 2),
            // offsetY: toPixel(oy),
        })

        const adapter1 = new Adapter(this, shape1)
        adapter1.name = name

        this.shape.add(shape1)

        this.adapters.set(name, adapter1)
    }

    public getAdapter(name: string) {
        return this.adapters.get(name)
    }
}
