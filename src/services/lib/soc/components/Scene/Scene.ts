import Konva from 'konva'
import { Module } from '../Module'
import { Vector2d } from 'konva/lib/types'
import { Agent } from '../Agent'
import { ModuleOptions } from '../Module/Module'
import { Link } from '../Link'
import { Interconnect } from '../Interconnect'
import { Constructor } from '../../types/constructor.type'
import { AgentsBuilder } from '../AgentsBuilder'

export default class Scene {
    static CELL = 12
    static BORDER_COLOR = 'black'
    static FILL_COLOR = 'white'
    static ACTIVATE_COLOR = '#34eb58'
    static DEACTIVATE_COLOR = 'gray'

    static toPixel(length: number): number {
        return length * Scene.CELL
    }

    private stage!: Konva.Stage
    private layer0!: Konva.Layer // static
    private layer1!: Konva.Layer // enable to change
    private layer2!: Konva.Layer // dynamic

    private modules: Map<string, Module> = new Map()
    private agents: Map<string, Agent> = new Map()
    private links: Map<string, Link> = new Map()
    private agentsBuilders: Map<string, AgentsBuilder> = new Map()
    private interconnects: Map<string, Interconnect> = new Map()

    constructor(containerId: string, w: number = 100, h: number = 100, options?: {}) {
        this.stage = new Konva.Stage({
            container: containerId,
            width: w * Scene.CELL,
            height: h * Scene.CELL,
        })

        this.layer0 = new Konva.Layer()
        this.layer1 = new Konva.Layer()
        this.layer2 = new Konva.Layer()

        this.stage.add(this.layer0)
        this.stage.add(this.layer1)
        this.stage.add(this.layer2)

        this.stage.on('drop', (e) => {
            console.log('Stage e: ', e)
        })

        this.initDragDrop()
    }

    public createModule(
        x: number,
        y: number,
        w?: number,
        h?: number,
        options?: ModuleOptions,
    ): Module {
        const module = new Module(this.layer0, x, y, w, h, { ...options, scene: this })
        module.onReady()
        const id = module.id
        this.modules.set(id, module)
        return module
    }

    public createModuleWithC<T extends Module>(
        Constructor: Constructor<T>,
        x: number,
        y: number,
        w?: number,
        h?: number,
        options?: any,
    ): T {
        const module = new Constructor(this.layer0, x, y, w, h, {
            ...options,
            scene: this,
        })
        module.onReady()
        const id = module.id
        this.modules.set(id, module)
        return module
    }

    public createAgent(x: number, y: number, w?: number, h?: number): Agent {
        const agent = new Agent(this.layer0, x, y, w, h, { scene: this })
        agent.onReady()
        const id = agent.id
        this.agents.set(id, agent)
        return agent
    }

    public createAgentWithC<T extends Agent>(
        Constructor: Constructor<T>,
        x: number,
        y: number,
        w?: number,
        h?: number,
    ): T {
        const agent = new Constructor(this.layer0, x, y, w, h, { scene: this })
        agent.onReady()
        const id = agent.id
        this.agents.set(id, agent)
        return agent
    }

    public createLink(src: Konva.Node, dst: Konva.Node): Link {
        const link = new Link(this.layer0, src, dst, { scene: this })
        link.onReady()
        const id = link.id
        this.links.set(id, link)
        return link
    }
    public createInterconnect(x: number, y: number, w?: number, h?: number): Interconnect {
        const interconnect = new Interconnect(this.layer0, x, y, w, h, { scene: this })
        interconnect.onReady()
        const id = interconnect.id
        this.interconnects.set(id, interconnect)
        return interconnect
    }
    public createInterconnectWithC<T extends Interconnect>(
        Constructor: Constructor<T>,
        x: number,
        y: number,
        w?: number,
        h?: number,
    ): T {
        const interconnect = new Constructor(this.layer0, x, y, w, h, { scene: this })
        interconnect.onReady()
        const id = interconnect.id
        this.interconnects.set(id, interconnect)
        return interconnect
    }

    public createAgentsBuilderWithC<T extends AgentsBuilder>(
        Constructor: Constructor<T>,
        x: number,
        y: number,
        options?: any,
    ): T {
        const agentsBuilder = new Constructor(this.layer0, x, y, {
            ...options,
            scene: this,
        })
        agentsBuilder.onReady()
        const id = agentsBuilder.id
        this.agentsBuilders.set(id, agentsBuilder)
        return agentsBuilder
    }

    private initDragDrop() {
        let previousShape: Konva.Shape | undefined
        const stage = this.stage
        const layer0 = this.layer0
        const layer2 = this.layer2

        stage.on('dragstart', function (e) {
            e.target.moveTo(layer2)
            layer0.draw()
        })

        stage.on('dragmove', function (evt) {
            const pos = stage.getPointerPosition() as Vector2d
            const shape = layer0.getIntersection(pos)

            if (previousShape && shape && previousShape !== shape) {
                previousShape.fire('dragleave', { evt: evt.evt }, true)
                shape.fire('dragenter', { evt: evt.evt }, true)
                previousShape = shape
            } else if (!previousShape && shape) {
                previousShape = shape
                shape.fire('dragenter', { evt: evt.evt }, true)
            } else if (previousShape && !shape) {
                previousShape.fire('dragleave', { evt: evt.evt }, true)
                previousShape = undefined
            }
        })

        stage.on('dragend', function (e) {
            const pos = stage.getPointerPosition() as Vector2d
            const shape = layer0.getIntersection(pos)

            if (shape && previousShape) {
                console.log('evt: ', e)

                previousShape.fire('drop', { evt: e.evt, object: e.target }, true)
            }
            previousShape = undefined
            // e.target.moveTo(layer0)
        })
    }

    public getModuleById(id: string): Module | undefined {
        return this.modules.get(id)
    }

    public getAgentById(id: string): Agent | undefined {
        return this.agents.get(id)
    }

    public getStage() {
        return this.stage
    }

    public destroy() {
        // this.modules.forEach(m => )
    }
}
