import Module from './Module'
import type { ModuleOptions } from './Module'
import type { SceneChildOptions } from '../../types/options'
import Konva from 'konva'
import { AgentType } from '../../types/agent.type'
import Adapter from '../Adapter/Adapter'
import { Scene } from '../Scene'

export type CPUModuleOptions = ModuleOptions & {}

type Options = CPUModuleOptions & SceneChildOptions

export default class CPUModule extends Module {
    protected acceptedAgents: AgentType[] = ['CPU']
    constructor(
        layer: Konva.Layer,
        x: number,
        y: number,
        w: number = 5,
        h: number = 5,
        options: Options,
    ) {
        super(layer, x, y, w, h, { ...options, color: '#93c5fd80' })
    }

    protected initAdapter(): void {
        const toPixel = Scene.toPixel
        const aW = 4
        const aH = 1
        const bottomAdapterShape = new Konva.Line({
            x: toPixel(this.w / 2),
            y: toPixel(this.h),
        })
        const topAdapterShape = new Konva.Line({
            x: toPixel(this.w / 2),
            y: toPixel(0),
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
