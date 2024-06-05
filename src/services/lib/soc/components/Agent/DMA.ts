import Konva from 'konva'
import { Agent } from '.'
import { AgentOptions } from './Agent'

export default class DMA extends Agent {
    constructor(
        layer: Konva.Layer,
        x: number,
        y: number,
        w: number = 10,
        h: number = 5,
        options: AgentOptions,
    ) {
        super(layer, x, y, 5, 5, { ...options, color: '#0d9488', text: 'DMA', textColor: 'white' })
        this.type = 'Memory'
    }
}
