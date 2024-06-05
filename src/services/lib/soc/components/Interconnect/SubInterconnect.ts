import Konva from 'konva'
import Interconnect from './Interconnect'
import type { InterconnectOptions } from './Interconnect'
import { Scene } from '../Scene'

export default class SubInterconnect extends Interconnect {
    constructor(
        layer: Konva.Layer,
        x: number,
        y: number,
        w: number = 23,
        h: number = 2,
        options: InterconnectOptions,
    ) {
        super(layer, x, y, w, h, options)
    }

    protected initText(): void {
        const { w, h } = this
        const toPixel = Scene.toPixel
        const text = new Konva.Text({
            width: toPixel(w),
            height: toPixel(h),
            text: 'Sub-Interconnect',
            verticalAlign: 'middle',
            align: 'center',
        })

        this.shape.add(text)
    }

    protected initAdapter(): void {
        // this.createAdapter('t001', this.w / 2, -0.5, 'top')
        // this.createAdapter('b001', 2.5, this.h + 0.5, 'bottom')
        // this.createAdapter('b002', this.w - 2.5, this.h + 0.5, 'bottom')
        this.createAdapter('t001', 8.5, 0)
        this.createAdapter('b001', 2.5, this.h)
        this.createAdapter('b002', 8.5, this.h)
        this.createAdapter('b003', 14.5, this.h)
        this.createAdapter('b004', 20.5, this.h)
    }
}
