import Konva from 'konva'
import Module, { ModuleOptions } from './Module'
import { SceneChildOptions } from '../../types/options'
import { Agent } from '../Agent'
import { Scene } from '../Scene'
import Adapter from '../Adapter/Adapter'
import { AgentType } from '../../types/agent.type'

type Options = ModuleOptions & SceneChildOptions

export default class DiskModule extends Module {
    protected acceptedAgents: AgentType[] = ['Disk', 'Memory']
    constructor(
        layer: Konva.Layer,
        x: number,
        y: number,
        w: number = 5,
        // h: number = 7,
        h: number = 5,
        options: Options,
    ) {
        super(layer, x, y, w, h, { ...options, color: '#99f6e485' })
    }

    // public setAgent(agent?: Agent | undefined): void {
    //     if (!agent) {
    //         this.agent = agent
    //         return
    //     }
    //     if (this.agent || !this.acceptedAgents.includes(agent.getType())) {
    //         return
    //     }
    //     this.agent = agent
    //     agent.setModule(this)
    //     const toPixel = Scene.toPixel
    //     this.shape.add(this.agent.getShape())
    //     this.agent.getShape().position({
    //         x: toPixel(this.w / 2),
    //         y: toPixel(this.h / 2),
    //     })
    // }

    protected initAdapter(): void {
        const toPixel = Scene.toPixel
        const aW = 4
        const aH = 1
        const adapter = new Konva.Line({
            x: toPixel(this.w / 2),
            y: toPixel(0),
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
        this.shape.add(adapter)
    }
}
