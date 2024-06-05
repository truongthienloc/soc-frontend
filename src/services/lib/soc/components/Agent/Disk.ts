import Konva from 'konva'
import { Agent } from '.'
import { AgentOptions } from './Agent'
import { Scene } from '../Scene'
import { AgentType } from '../../types/agent.type'
import DiskInterface from '../Interface/DiskInterface'
import { SceneChildOptions } from '../../types/options'

type Options = AgentOptions & SceneChildOptions

export default class Disk extends Agent {
    protected type: AgentType = 'Disk'
    constructor(
        layer: Konva.Layer,
        x: number,
        y: number,
        w: number = 5,
        h: number = 7,
        options: Options,
    ) {
        // super(layer, x, y, 5, 7, options)
        super(layer, x, y, 5, 5, { ...options, color: '#0d9488', text: 'Disk', textColor: 'white' })
    }

    // public onReady(): void {
    //     super.onReady()
    //     this.initText()
    // }

    // protected initText(): void {
    //     const toPixel = Scene.toPixel
    //     const text = new Konva.Text({
    //         width: toPixel(this.w),
    //         height: toPixel(this.h),
    //         align: 'center',
    //         verticalAlign: 'middle',
    //         text: 'Disk',
    //     })

    //     this.shape.add(text)
    // }

    protected initInterface(): void {
        const _interface = new DiskInterface(this, this.w / 2, 1, undefined, undefined, {
            scene: this.scene,
        })
        this.interfaces.set('root', _interface)
        this.shape.add(_interface.getShape())
    }
}
