import Konva from 'konva'
import { SceneChildOptions } from '../../types/options'
import { Agent } from '../Agent'
import { Scene } from '../Scene'
import Interface from './Interface'

type InterfaceOptions = {} & SceneChildOptions

export default class MMUInterface extends Interface {
    constructor(
        agent: Agent,
        x: number,
        y: number,
        w: number = 0,
        h: number = 0,
        options: InterfaceOptions,
    ) {
        super(agent, x, y, w, h, options)
    }

    protected initShape(): void {}
}
