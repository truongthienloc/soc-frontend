import Module from './Module'
import type { ModuleOptions } from './Module'
import type { SceneChildOptions } from '../../types/options'
import Konva from 'konva'
import { AgentType } from '../../types/agent.type'

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
}
