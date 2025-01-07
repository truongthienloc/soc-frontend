import Module from './Module'
import type { ModuleOptions } from './Module'
import type { SceneChildOptions } from '../../types/options'
import Konva from 'konva'
import { Scene } from '../Scene'
import Adapter from '../Adapter/Adapter'
import { AgentType } from '../../types/agent.type'

export type CPUModuleOptions = ModuleOptions & {}

type Options = CPUModuleOptions & SceneChildOptions

export default class MemoryModule extends Module {
    protected acceptedAgents: AgentType[] = ['Memory', 'Disk']
    constructor(
        layer: Konva.Layer,
        x: number,
        y: number,
        w: number = 10,
        h: number = 5,
        options: Options,
    ) {
        // super(layer, x, y, 10, 5, options)
        super(layer, x, y, 5, 5, { ...options, color: '#99f6e485' })
    }

    protected initAdapter(): void {
        const toPixel = Scene.toPixel
        const aW = 6
        const aH = 1
        const aW1 = 2.5
        const adapterGroup = new Konva.Group({
            x: toPixel(this.w / 2),
            y: toPixel(this.h / 2),
            offsetX: toPixel(this.w / 2),
            offsetY: toPixel(this.h / 2),
        })
        const adapter = new Konva.Line({
            x: toPixel(this.w / 2),
            // y: toPixel(0),
            y: toPixel(this.h),
            // stroke: Scene.BORDER_COLOR,
            // fill: Scene.FILL_COLOR,
            // offsetX: toPixel(aW / 2),
            // offsetY: toPixel(aH),
            // rotation: 180,
            // points: [
            //     0,
            //     toPixel(aH),
            //     0,
            //     0,
            //     toPixel(0.5),
            //     0,
            //     toPixel(0.5),
            //     toPixel(aH / 2),
            //     toPixel(aW1),
            //     toPixel(aH / 2),
            //     toPixel(aW1),
            //     toPixel(0),
            //     toPixel(aW1 + 1),
            //     toPixel(0),
            //     toPixel(aW1 + 1),
            //     toPixel(aH / 2),
            //     toPixel(aW - 0.5),
            //     toPixel(aH / 2),
            //     toPixel(aW - 0.5),
            //     toPixel(0),
            //     toPixel(aW),
            //     toPixel(0),
            //     toPixel(aW),
            //     toPixel(aH),
            // ],
            // closed: true,
        })

        this.adapters.set('root', new Adapter(this, adapter))
        adapterGroup.name('adapters')
        adapterGroup.add(adapter)
        this.shape.add(adapterGroup)
    }
}
