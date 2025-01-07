import Konva from 'konva'
import { TileLinkObject } from '../TileLinkObject'
import { Scene } from '../Scene'
import { SceneChildOptions } from '../../types/options'
import Adapter from '../Adapter/Adapter'
import EventEmitter from '../../../EventEmitter/EventEmitter'

export type InterconnectOptions = {} & SceneChildOptions

export default class Interconnect extends TileLinkObject {
    protected layer: Konva.Layer
    protected options: InterconnectOptions

    protected shape!: Konva.Group
    protected adapters: Map<string, Adapter> = new Map()
    protected switch!: Konva.Group

    protected activated: boolean
    private event = new EventEmitter()
    public static EVENT = {
        ACTIVATE: 'activate',
        INACTIVATE: 'inactivate',
    }

    // animation
    protected animLines: Konva.Line[] = []
    protected animTweens: Konva.Tween[] = []

    public getEvent(): EventEmitter {
        return this.event
    }

    public getActivated(): boolean {
        return this.activated
    }

    constructor(
        layer: Konva.Layer,
        x: number,
        y: number,
        w: number = 23,
        h: number = 2,
        options: InterconnectOptions,
    ) {
        super()
        this.activated = true
        this.layer = layer
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.options = options

        this.initShape()
        this.initText()
        this.initAdapter()
        this.initSwitch()
    }

    protected initShape(): void {
        const { x, y, w, h } = this
        const toPixel = Scene.toPixel
        this.shape = new Konva.Group({
            x: toPixel(x),
            y: toPixel(y),
        })

        const bodyShape = new Konva.Rect({
            x: 0,
            y: 0,
            width: toPixel(w),
            height: toPixel(h),
            fill: '#2d99dd',
            stroke: Scene.BORDER_COLOR,
        })

        this.shape.add(bodyShape)
        this.layer.add(this.shape)
    }

    protected initText(): void {
        const { w, h } = this
        const toPixel = Scene.toPixel
        const text = new Konva.Text({
            width: toPixel(w),
            height: toPixel(h),
            text: 'Interconnect',
            verticalAlign: 'middle',
            align: 'center',
            fill: 'white',
            fontVariant: 'bold',
        })

        this.shape.add(text)
    }

    protected initAdapter(): void {
        // this.createAdapter('a001', 2.5, -0.5, 'top')
        // this.createAdapter('a002', 8.5, -0.5, 'top')
        // this.createAdapter('a003', 14.5, -0.5, 'top')
        // this.createAdapter('a004', 20.5, -0.5, 'top')
        // this.createAdapter('a005', 2.5, this.h + 0.5, 'bottom')
        // this.createAdapter('a006', 11, this.h + 0.5, 'bottom')
        // this.createAdapter('a007', 20.5, this.h + 0.5, 'bottom')

        this.createAdapter('t001', 2.5, 0)
        this.createAdapter('t002', 8.5, 0)
        this.createAdapter('t003', 14.5, 0)
        this.createAdapter('t004', 20.5, 0)
        this.createAdapter('b001', 2.5, this.h)
        this.createAdapter('b002', 8.5, this.h)
        this.createAdapter('b003', 14.5, this.h)
        this.createAdapter('b004', 20.5, this.h)
    }

    protected initSwitch(): void {
        const toPixel = Scene.toPixel
        this.switch = new Konva.Group({})

        const w = 1
        const h = 1

        const circle = new Konva.Circle({
            radius: toPixel(w / 2),
            stroke: Scene.BORDER_COLOR,
            fill: this.activated ? Scene.ACTIVATE_COLOR : Scene.DEACTIVATE_COLOR,
        })

        circle.on('click', () => {
            this.setActivated(!this.activated)
        })

        circle.on('mouseover', function () {
            document.body.style.cursor = 'pointer'
        })
        circle.on('mouseout', function () {
            document.body.style.cursor = 'default'
        })

        this.switch.add(circle)
        this.shape.add(this.switch)
    }

    public setActivated(activated: boolean): void {
        // if (activated && !this.agent) {
        //     return
        // }
        this.activated = activated
        if (activated) {
            this.event.emit(Interconnect.EVENT.ACTIVATE)
        } else {
            this.event.emit(Interconnect.EVENT.INACTIVATE)
        }
        const circle = this.switch.children[0] as Konva.Circle
        if (this.activated) {
            circle.fill(Scene.ACTIVATE_COLOR)
        } else {
            circle.fill(Scene.DEACTIVATE_COLOR)
        }
    }

    protected createAdapter(
        name: string,
        x: number,
        y: number,
        // dir: 'top' | 'bottom',
    ): void {
        const toPixel = Scene.toPixel
        // const w = 2
        // const h = 1
        // const oy = dir === 'top' ? 0 : h

        const shape1 = new Konva.Rect({
            x: toPixel(x),
            y: toPixel(y),
            // width: toPixel(w),
            // height: toPixel(h),
            // fill: 'white',
            // stroke: 'black',
            // offsetX: toPixel(w / 2),
            // offsetY: toPixel(oy),
        })

        const adapter1 = new Adapter(this, shape1)
        adapter1.name = name

        this.shape.add(shape1)

        this.adapters.set(name, adapter1)
    }

    public getAdapter(name: string) {
        return this.adapters.get(name)
    }

    public setIsRunning(isRunning: boolean): void {
        if (isRunning && this.animTweens.length === 0) {
            const toPixel = Scene.toPixel
            const LINE_SIZE = 1.2
            const DURATION = 0.3
            const COLOR = Scene.ACTIVATE_COLOR
            // this.tween.play()
            const line1 = new Konva.Line({
                x: 0,
                y: 0,
                points: [0, 0, toPixel(LINE_SIZE), 0],
                stroke: COLOR,
            })

            const line2 = new Konva.Line({
                x: toPixel(this.w),
                y: 0,
                points: [0, 0, 0, toPixel(LINE_SIZE)],
                stroke: COLOR,
            })

            const line3 = new Konva.Line({
                x: toPixel(this.w),
                y: toPixel(this.h),
                points: [0, 0, -toPixel(LINE_SIZE), 0],
                stroke: COLOR,
            })

            const line4 = new Konva.Line({
                x: 0,
                y: toPixel(this.h),
                points: [0, 0, 0, -toPixel(LINE_SIZE)],
                stroke: COLOR,
            })

            const tweenLine1 = new Konva.Tween({
                node: line1,
                x: toPixel(this.w - LINE_SIZE),
                y: 0,
                duration: DURATION,
                //easing: Konva.Easings.EaseInOut,
                onFinish: () => {
                    tweenLine1.reset()
                    tweenLine1.play()
                },
            })

            const tweenLine2 = new Konva.Tween({
                node: line2,
                x: toPixel(this.w),
                y: toPixel(this.h - LINE_SIZE),
                duration: DURATION,
                //easing: Konva.Easings.EaseInOut,
                onFinish: () => {
                    tweenLine2.reset()
                    tweenLine2.play()
                },
            })

            const tweenLine3 = new Konva.Tween({
                node: line3,
                x: toPixel(LINE_SIZE),
                y: toPixel(this.h),
                duration: DURATION,
                //easing: Konva.Easings.EaseInOut,
                onFinish: () => {
                    tweenLine3.reset()
                    tweenLine3.play()
                },
            })

            const tweenLine4 = new Konva.Tween({
                node: line4,
                x: 0,
                y: toPixel(LINE_SIZE),
                duration: DURATION,
                //easing: Konva.Easings.EaseInOut,
                onFinish: () => {
                    tweenLine4.reset()
                    tweenLine4.play()
                },
            })
            tweenLine1.play()
            tweenLine2.play()
            tweenLine3.play()
            tweenLine4.play()

            this.shape.add(line1)
            this.shape.add(line2)
            this.shape.add(line3)
            this.shape.add(line4)

            this.animLines.push(line1)
            this.animLines.push(line2)
            this.animLines.push(line3)
            this.animLines.push(line4)

            this.animTweens.push(tweenLine1)
            this.animTweens.push(tweenLine2)
            this.animTweens.push(tweenLine3)
            this.animTweens.push(tweenLine4)
        } else if (!isRunning) {
            this.animTweens.forEach((tween) => tween.destroy())
            this.animLines.forEach((line) => line.destroy())
            this.animTweens = []
            this.animLines = []
        }
    }
}
