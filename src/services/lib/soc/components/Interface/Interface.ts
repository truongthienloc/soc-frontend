import Konva from 'konva'
import { TileLinkObject } from '../TileLinkObject'
import { SceneChildOptions } from '../../types/options'
import { Scene } from '../Scene'
import { Agent } from '../Agent'
import { Link } from '../Link'

type InterfaceOptions = {} & SceneChildOptions

export default class Interface extends TileLinkObject {
    protected shape!: Konva.Group
    protected agent: Agent

    protected link?: Link

    constructor(
        agent: Agent,
        x: number,
        y: number,
        w: number = 2,
        h: number = 1,
        options: InterfaceOptions,
    ) {
        super()
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.agent = agent

        this.onReady()
    }

    public onReady(): void {
        this.initShape()
    }

    protected initShape(): void {
        const toPixel = Scene.toPixel
        this.shape = new Konva.Group({
            x: toPixel(this.x),
            y: toPixel(this.y),
            offsetX: toPixel(this.w / 2),
            offsetY: toPixel(this.h / 2),
        })
        const rect = new Konva.Rect({
            width: toPixel(this.w),
            height: toPixel(this.h),
            fill: 'white',
            stroke: 'black',
        })

        this.shape.add(rect)
        this.shape.id(this.id)
    }

    public getShape(): Konva.Group {
        return this.shape
    }

    public setLink(link?: Link) {
        this.link = link
    }

    public getLink(): Link | undefined {
        return this.link
    }

    public destroy(): void {
        this.shape.destroy()
    }
}
