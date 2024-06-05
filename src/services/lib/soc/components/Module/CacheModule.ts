import Konva from 'konva'
import Module from './Module'
import type { Options } from './Module'
import { Scene } from '../Scene'
import Adapter from '../Adapter/Adapter'
import { AgentType } from '../../types/agent.type'

export default class CacheModule extends Module {
    protected acceptedAgents: AgentType[] = ['Cache', 'MMU']

    constructor(
        layer: Konva.Layer,
        x: number,
        y: number,
        w: number = 5,
        h: number = 2,
        options: Options,
    ) {
        super(layer, x, y, w, h, { ...options, color: '#decb0280' })
    }

    protected initAdapter(): void {
        const toPixel = Scene.toPixel
        const aW = 4
        const aH = 1
        const bottomAdapterShape = new Konva.Line({
            x: toPixel(this.w / 2),
            y: toPixel(this.h),
            // width: toPixel(aW),
            // height: toPixel(aH),
            // stroke: Scene.BORDER_COLOR,
            // fill: Scene.FILL_COLOR,
            // offsetX: toPixel(aW / 2),
            // offsetY: toPixel(aH),
            // points: [
            //     0, 0,
            //     toPixel(0.5), 0,
            //     toPixel(0.5), toPixel(0.5),
            //     toPixel(aW - 0.5), toPixel(0.5),
            //     toPixel(aW - 0.5), toPixel(0),
            //     toPixel(aW), toPixel(0),
            //     toPixel(aW), toPixel(aH),
            //     toPixel(0), toPixel(aH),
            // ],
            // closed: true
        })
        const topAdapterShape = new Konva.Line({
            x: toPixel(this.w / 2),
            y: toPixel(0),
            // width: toPixel(aW),
            // height: toPixel(aH),
            // stroke: Scene.BORDER_COLOR,
            // fill: Scene.FILL_COLOR,
            // offsetX: toPixel(aW / 2),
            // offsetY: toPixel(aH),
            // rotation: 180,
            // points: [
            //     0, 0,
            //     toPixel(0.5), 0,
            //     toPixel(0.5), toPixel(0.5),
            //     toPixel(aW - 0.5), toPixel(0.5),
            //     toPixel(aW - 0.5), toPixel(0),
            //     toPixel(aW), toPixel(0),
            //     toPixel(aW), toPixel(aH),
            //     toPixel(0), toPixel(aH),
            // ],
            // closed: true
        })

        const bottomAdapter = new Adapter(this, bottomAdapterShape)
        const topAdapter = new Adapter(this, topAdapterShape)
        this.adapters.set('t001', topAdapter)
        this.adapters.set('b001', bottomAdapter)
        this.shape.add(topAdapterShape)
        this.shape.add(bottomAdapterShape)
    }

    public getAdapter(id?: string): Adapter {
        if (!id) {
            return this.adapters.get('t001') as Adapter
        }
        const adapter = this.adapters.get(id)
        if (!adapter) {
            return this.adapters.get('t001') as Adapter
        }
        return adapter
    }
}
