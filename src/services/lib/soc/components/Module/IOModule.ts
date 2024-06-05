import Konva from 'konva'
import { AgentType } from '../../types/agent.type'
import Module, { Options } from './Module'
import { Scene } from '../Scene'
import Adapter from '../Adapter/Adapter'

export default class IOModule extends Module {
    protected acceptedAgents: AgentType[] = ['Input', 'Output']
    constructor(
        layer: Konva.Layer,
        x: number,
        y: number,
        w: number = 5,
        h: number = 5,
        options: Options,
    ) {
        super(layer, x, y, 5, 5, { ...options, color: '#fc6d6d85' })
    }

    protected initAdapter(): void {
        const toPixel = Scene.toPixel

        const adapter = new Konva.Line({
            x: toPixel(this.w / 2),
            y: toPixel(0),
        })

        this.adapters.set('root', new Adapter(this, adapter))
        this.shape.add(adapter)
    }
}
