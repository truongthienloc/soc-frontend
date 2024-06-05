import Konva from 'konva'
import { Agent } from '.'
import { AgentOptions } from './Agent'
import { AgentType } from '../../types/agent.type'

export default class Monitor extends Agent {
    protected type: AgentType = 'Output'
    constructor(
        layer: Konva.Layer,
        x: number,
        y: number,
        w: number = 5,
        h: number = 5,
        options: AgentOptions,
    ) {
        super(layer, x, y, 5, 5, {
            ...options,
            color: '#fc5151',
            text: 'Monitor',
            textColor: 'white',
        })
    }
}
