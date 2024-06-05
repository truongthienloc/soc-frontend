// import { ModuleOptions } from './Module';
import Konva from 'konva'
import { Scene } from '../Scene'
import { Agent } from '../Agent'
import { TileLinkObject } from '../TileLinkObject'
import { SceneChildOptions } from '../../types/options'
import Adapter from '../Adapter/Adapter'
import type { AgentType } from '../../types/agent.type'
import EventEmitter from '../../../EventEmitter/EventEmitter'

export type ModuleOptions = {
    rotate?: number
    color?: string
}

export type Options = ModuleOptions & SceneChildOptions

export default class Module extends TileLinkObject {
    protected options: Options
    protected shape!: Konva.Group
    protected layer!: Konva.Layer
    protected adapters: Map<string, Adapter> = new Map()
    protected switch!: Konva.Group

    protected scene!: Scene
    protected agent?: Agent

    protected acceptedAgents: AgentType[] = []
    protected activated: boolean
    private event = new EventEmitter()
    public static EVENT = {
        ACTIVATE: 'activate',
        INACTIVATE: 'inactivate',
    }
    // protected switchButton!: Konva.Node

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
        w: number = 5,
        h: number = 5,
        options: Options,
    ) {
        super()
        this.activated = false
        this.scene = options.scene
        this.layer = layer
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.options = options
    }

    public onReady(): void {
        this.initShape()
        this.initAdapter()
        this.initSwitch()
        this.handleDrop()
        this.handleOptions()
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
            x: 0,
            y: 0,
            width: toPixel(this.w),
            height: toPixel(this.h),
            stroke: Scene.BORDER_COLOR,
            fill: this.options.color ?? Scene.FILL_COLOR,
        })

        this.shape.add(rect)
        this.layer.add(this.shape)
    }

    protected initAdapter(): void {
        const toPixel = Scene.toPixel
        const aW = 3
        const aH = 1
        const adapterGroup = new Konva.Group({
            x: toPixel(this.w / 2),
            y: toPixel(this.h / 2),
            offsetX: toPixel(this.w / 2),
            offsetY: toPixel(this.h / 2),
        })
        const adapter = new Konva.Line({
            x: toPixel(this.w / 2),
            y: toPixel(this.h),
        })

        this.adapters.set('root', new Adapter(this, adapter))
        adapterGroup.name('adapters')
        adapterGroup.add(adapter)
        this.shape.add(adapterGroup)
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

    protected handleOptions(): void {
        if (this.options.rotate) {
            const adapters = this.shape
                .getChildren()
                .find((child) => child.name() === 'adapters') as Konva.Group | undefined
            if (!adapters) {
                return
            }
            adapters.rotate(this.options.rotate)
        }
    }

    protected handleDrop() {
        const scene = this.scene

        const setAgent = this.setAgent.bind(this)
        this.shape.on('drop', (e: any) => {
            const object = e.object as Konva.Group

            const id = object.id()
            const agent = scene.getAgentById(id)
            if (!agent) {
                return
            }
            setAgent(agent)
        })
    }

    public setAgent(agent?: Agent): void {
        if (!agent) {
            this.agent = agent
            this.setActivated(false)
            return
        }
        if (this.agent || !this.acceptedAgents.includes(agent.getType())) {
            return
        }
        this.agent = agent
        this.setActivated(true)
        agent.setModule(this)
        const toPixel = Scene.toPixel
        this.shape.add(this.agent.getShape())
        this.agent.getShape().position({
            x: toPixel(this.w / 2),
            y: toPixel(this.h / 2),
        })
        this.switch.moveToTop()
    }

    public getAgent(): Agent | undefined {
        return this.agent
    }

    public getShape(): Konva.Group {
        return this.shape
    }
    public getAdapter(id?: string): Adapter {
        if (!id) {
            return this.adapters.get('root') as Adapter
        }
        const adapter = this.adapters.get(id)
        if (!adapter) {
            return this.adapters.get('root') as Adapter
        }
        return adapter
    }
    public setActivated(activated: boolean): void {
        if (activated && !this.agent) {
            return
        }
        this.activated = activated
        if (activated) {
            this.event.emit(Module.EVENT.ACTIVATE)
        } else {
            this.event.emit(Module.EVENT.INACTIVATE)
        }
        const circle = this.switch.children[0] as Konva.Circle
        if (this.activated) {
            circle.fill(Scene.ACTIVATE_COLOR)
        } else {
            circle.fill(Scene.DEACTIVATE_COLOR)
        }
    }

    public destroy() {
        this.event.clearAll()
    }
}
