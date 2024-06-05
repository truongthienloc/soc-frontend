import Konva from 'konva'
import { Scene } from '../Scene'
import Module from './Module'

export default class NewModule extends Module {
    protected initShape(): void {
        const toPixel = Scene.toPixel
        this.shape = new Konva.Group({
            x: toPixel(this.x),
            y: toPixel(this.y),
            offsetX: toPixel(this.w / 2),
            offsetY: toPixel(this.h / 2),
        })

        const rect = new Konva.Rect({
            x: 0,
            y: 0,
            width: toPixel(this.w),
            height: toPixel(this.h),
            stroke: Scene.BORDER_COLOR,
            fill: Scene.FILL_COLOR,
        })

        this.shape.add(rect)
        this.layer.add(this.shape)
    }
}
