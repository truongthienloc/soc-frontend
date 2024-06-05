import Konva from 'konva'
import { SceneChildOptions } from '../../types/options'
import { Agent } from '../Agent'
import { Scene } from '../Scene'
import Interface from './Interface'

type InterfaceOptions = {} & SceneChildOptions

export default class DiskInterface extends Interface {
    constructor(
        agent: Agent,
        x: number,
        y: number,
        w: number = 3,
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
            // offsetX: toPixel(this.w / 2),
            // offsetY: toPixel(this.h / 2),
        })

        // const rect = new Konva.Rect({
        //     width: toPixel(this.w),
        //     height: toPixel(this.h),
        //     fill: 'white',
        //     stroke: 'black',
        // })

        // this.shape.add(rect)
        this.shape.id(this.id)
    }
}
