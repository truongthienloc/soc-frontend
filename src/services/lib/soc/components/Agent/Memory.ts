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
            text: 'Memory',
            textColor: 'white',
        })
        this.type = 'Memory'
    }

    // public onReady(): void {
    //     super.onReady()
    //     this.initText()
    // }

    // protected initInterface(): void {
    //     const _interface = new MemoryInterface(this, this.w / 2, 1, undefined, undefined, {
    //         scene: this.scene,
    //     })
    //     this.interfaces.set('root', _interface)
    //     this.shape.add(_interface.getShape())
    // }

    // protected initText(): void {
    //     const toPixel = Scene.toPixel
    //     const text = new Konva.Text({
    //         width: toPixel(this.w),
    //         height: toPixel(this.h),
    //         align: 'center',
    //         verticalAlign: 'middle',
    //         text: 'Memory',
    //     })

    //     this.shape.add(text)
    // }
}
