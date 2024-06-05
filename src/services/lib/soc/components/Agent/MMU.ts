import Konva from 'konva'
import Agent, { AgentOptions } from './Agent'
import { Scene } from '../Scene'
import { Interface } from '../Interface'
import { AgentType } from '../../types/agent.type'

export default class MMU extends Agent {
    protected type: AgentType = 'MMU'

    constructor(
        layer: Konva.Layer,
        x: number,
        y: number,
        w: number = 5,
        h: number = 2,
        options: AgentOptions,
    ) {
        super(layer, x, y, w, h, { ...options, color: '#decb02', text: 'MMU', textColor: 'white' })
    }

    protected initInterface(): void {
        const topInterface = new Interface(this, this.w / 2, 0, 0, 0, { scene: this.scene })
        const bottomInterface = new Interface(this, this.w / 2, this.h, 0, 0, { scene: this.scene })

        this.interfaces.set('t001', topInterface)
        this.interfaces.set('b001', bottomInterface)

        this.shape.add(topInterface.getShape())
        this.shape.add(bottomInterface.getShape())
    }

    // protected initText(): void {
    //     const toPixel = Scene.toPixel
    //     const text = new Konva.Text({
    //         width: toPixel(this.w),
    //         height: toPixel(this.h),
    //         align: 'center',
    //         verticalAlign: 'middle',
    //         text: 'MMU',
    //     })

    //     this.shape.add(text)
    // }
}
