import Konva from 'konva'
import { SceneChildOptions } from '../../types/options'
import { Agent } from '../Agent'
import { Scene } from '../Scene'
import Interface from './Interface'

type InterfaceOptions = {} & SceneChildOptions

export default class MemoryInterface extends Interface {
    constructor(
        agent: Agent,
        x: number,
        y: number,
        w: number = 5,
        h: number = 1,
        options: InterfaceOptions,
    ) {
        super(agent, x, y, w, h, options)
    }

    protected initShape(): void {
        const toPixel = Scene.toPixel
        this.shape = new Konva.Group({
            x: toPixel(this.x),
            y: toPixel(this.y),
            offsetX: toPixel(this.w / 2),
            offsetY: toPixel(this.h / 2),
        })

        // const w1 = Math.floor(this.w / 2)

        // const rect = new Konva.Line({
        //     points: [
        //         0,
        //         toPixel(this.h),
        //         0,
        //         0,
        //         toPixel(w1),
        //         0,
        //         toPixel(w1),
        //         toPixel(this.h / 2),
        //         toPixel(w1 + 1),
        //         toPixel(this.h / 2),
        //         toPixel(w1 + 1),
        //         toPixel(0),
        //         toPixel(this.w),
        //         toPixel(0),
        //         toPixel(this.w),
        //         toPixel(this.h),
        //     ],
        //     fill: 'white',
        //     stroke: 'black',
        //     closed: true,
        // })

        // this.shape.add(rect)
        this.shape.id(this.id)
    }
}
