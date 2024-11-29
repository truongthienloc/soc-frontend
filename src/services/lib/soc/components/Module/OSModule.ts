import Konva from 'konva'
import Module from './Module'
import type { Options } from './Module'
import { AgentType } from '../../types/agent.type'

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
}
