import Konva from 'konva'
import Module from './Module'
import type { Options } from './Module'
import { AgentType } from '../../types/agent.type'
import { Scene } from '../Scene'

export default class OSModule extends Module {
    protected acceptedAgents: AgentType[] = ['OS']

    constructor(
        layer: Konva.Layer,
        x: number,
        y: number,
        w: number = 5,
        h: number = 5,
        options: Options,
    ) {
        super(layer, x, y, w, h, { ...options, color: '#3399ff80' })
    }

    protected initAdapter(): void {
        super.initAdapter()
        const toPixel = Scene.toPixel
        this.adapters.get('root')?.shape.setPosition({
            x: toPixel(0),
            y: toPixel(this.h / 2),
        })
    }
}
