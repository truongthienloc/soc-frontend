import Konva from 'konva'
import { Agent } from '.'
import { AgentOptions } from './Agent'
import { Scene } from '../Scene'
import { Interface, MemoryInterface } from '../Interface'

export default class Memory extends Agent {
    constructor(
        layer: Konva.Layer,
        x: number,
        y: number,
        w: number = 10,
        h: number = 5,
        options: AgentOptions,
    ) {
        // super(layer, x, y, 10, 5, options)
        super(layer, x, y, 5, 5, {
            ...options,
            color: '#0d9488',
            text: 'Memory Allocator',
            textColor: 'white',
        })
        this.type = 'OS'
    }
}
