import Konva from 'konva'
import { Scene } from '../Scene'
import { TileLinkObject } from '../TileLinkObject'
import { SceneChildOptions } from '../../types/options'
import { Module } from '../Module'
import { Interface } from '../Interface'
import { AgentType } from '../../types/agent.type'
import { AgentsBuilder } from '../AgentsBuilder'
import EventEmitter from '~/services/lib/EventEmitter/EventEmitter'

export type AgentOptions = {
    name?: string
    color?: string
    text?: string
    textColor?: string
} & SceneChildOptions

export default class Agent extends TileLinkObject {
    protected shape!: Konva.Group
    protected layer!: Konva.Layer
    protected options: AgentOptions
    protected interfaces: Map<string, Interface> = new Map()

    protected scene: Scene
    protected module?: Module
    protected builder?: AgentsBuilder
    protected type: AgentType = 'CPU'

    // animation
    protected animLines: Konva.Line[] = []
    protected animTweens: Konva.Tween[] = []

    // protected tween!: Konva.Tween
    protected event = new EventEmitter()

    public static Event = {
        CLICK: 'click',
    }

    public getType(): AgentType {
        return this.type
    }

    public getEvent(): EventEmitter {
        return this.event
    }

    static clone<T extends Agent>(agent: T): T {
        const Constructor = Object.getPrototypeOf(agent).constructor
        const newAgent = agent.scene.createAgentWithC(
            Constructor,
            agent.x,
            agent.y,
            agent.w,
            agent.h,
        )
        console.log('newAgent', newAgent)
        return newAgent as T
    }

    constructor(
        layer: Konva.Layer,
        x: number,
        y: number,
        w: number = 5,
        h: number = 5,
        options: AgentOptions,
    ) {
        super()
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.scene = options.scene
        this.layer = layer
        this.options = options
    }

    public onReady(): void {
        // debugger;
        this.initShape()
        this.initInterface()
        this.initMouseEvent()
        this.initDragEvent()
        this.initText()
        this.initTween()
        this.handleClick()
        this.setOption(this.options)
    }

    protected initShape(): void {
        const toPixel = Scene.toPixel
        this.shape = new Konva.Group({
            x: toPixel(this.x),
            y: toPixel(this.y),
            offsetX: toPixel(this.w / 2),
            offsetY: toPixel(this.h / 2),
            draggable: true,
        })
        this.shape.id(this.id)

        const rectW = this.w //- 2
        const rectH = this.h //- 2
        const rect = new Konva.Rect({
            x: toPixel(0),
            y: toPixel(0),
            width: toPixel(rectW),
            height: toPixel(rectH),
            stroke: Scene.BORDER_COLOR,
            fill: this.options.color ?? Scene.FILL_COLOR,
        })

        // this.shape.rotate(180)
        this.shape.add(rect)
        this.layer.add(this.shape)
    }

    protected initInterface(): void {
        const _interface = new Interface(this, this.w / 2, this.h - 1, 0, 0, {
            scene: this.scene,
        })
        this.interfaces.set('root', _interface)
        this.shape.add(_interface.getShape())
    }

    protected initText(): void {
        const toPixel = Scene.toPixel
        const text = new Konva.Text({
            width: toPixel(this.w),
            height: toPixel(this.h),
            align: 'center',
            verticalAlign: 'middle',
            text: this.options.text ?? '',
            fill: this.options.textColor ?? Scene.BORDER_COLOR,
            fontStyle: 'bold',
        })

        this.shape.add(text)
    }

    protected initTween(): void {
        
    }

    private setOption(options?: AgentOptions): void {
        if (!options) {
            return
        }
        if (options.name) {
            this.shape.name(options.name)
        }
    }

    private initMouseEvent() {
        this.shape.on('mouseover', function () {
            document.body.style.cursor = 'pointer'
        })
        this.shape.on('mouseout', function () {
            document.body.style.cursor = 'default'
        })
    }

    private initDragEvent() {
        this.shape.on('dragstart', () => {
            if (this.module) {
                this.module.setAgent(undefined)
                this.setModule(undefined)
            }
            if (this.builder) {
                console.log('pull')

                this.builder.pullAgent(this)
                this.setBuilder(undefined)
            }
        })
    }

    protected handleClick() {
        this.shape.on('click', () => {
            this.event.emit(Agent.Event.CLICK)
        })
    }

    public setModule(module?: Module): void {
        this.module = module
    }

    public setBuilder(builder?: AgentsBuilder): void {
        this.builder = builder
    }

    public getModule(): Module | undefined {
        return this.module
    }

    public getShape(): Konva.Group {
        return this.shape
    }

    public destroy(): void {
        this.shape.destroy()
        for (const [, inter] of this.interfaces.entries()) {
            inter.destroy()
        }
    }

    public setIsRunning(isRunning: boolean): void {
        if (isRunning) {
            const toPixel   = Scene.toPixel
            const LINE_SIZE = 2
            const DURATION  = 0.6
            const COLOR     = Scene.ACTIVATE_COLOR
            // this.tween.play()
            const line1 = new Konva.Line({
                x: 0,
                y: 0,
                points: [0, 0, toPixel(LINE_SIZE), 0],
                stroke: COLOR
            })

            const line2 = new Konva.Line({
                x: toPixel(this.w),
                y: 0,
                points: [0, 0, 0, toPixel(LINE_SIZE)],
                stroke: COLOR
            })

            const line3 = new Konva.Line({
                x: toPixel(this.w),
                y: toPixel(this.h),
                points: [0, 0, -toPixel(LINE_SIZE), 0],
                stroke: COLOR
            })

            const line4 = new Konva.Line({
                x: 0,
                y: toPixel(this.h),
                points: [0, 0, 0, -toPixel(LINE_SIZE)],
                stroke: COLOR
            })

            const tweenLine1 = new Konva.Tween({
                node: line1,
                x: toPixel(this.w - LINE_SIZE),
                y: 0,
                duration: DURATION,
                easing: Konva.Easings.EaseInOut,
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
                easing: Konva.Easings.EaseInOut,
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
                easing: Konva.Easings.EaseInOut,
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
                easing: Konva.Easings.EaseInOut,
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
        } else {
            this.animTweens.forEach(tween => tween.destroy())
            this.animLines.forEach(line => line.destroy())
            this.animTweens = []
            this.animLines = []
        }
    }
}
