import Konva from 'konva'
import { TileLinkObject } from '../TileLinkObject'
import { Scene } from '../Scene'
import Agent from '../Agent/Agent'
import { SceneChildOptions } from '../../types/options'
import CPU from '../Agent/CPU'
import Memory from '../Agent/Memory'
import Monitor from '../Agent/Monitor'
import Disk from '../Agent/Disk'

type AgentsBuilderOptions = SceneChildOptions & {}

export default class AgentsBuilder extends TileLinkObject {
    protected layer: Konva.Layer
    public x: number
    public y: number
    public w: number = 6
    public h: number = 24
    protected options: AgentsBuilderOptions

    protected shape!: Konva.Group
    protected agents: Map<string, Agent> = new Map()

    constructor(layer: Konva.Layer, x: number, y: number, options: AgentsBuilderOptions) {
        super()
        this.layer = layer
        this.x = x
        this.y = y
        this.options = options
        this.onReady()
    }

    public onReady(): void {
        this.initShape()
        this.initAgents()
        this.handleDrop()
    }

    protected handleOptions() {}

    protected initShape(): void {
        const toPixel = Scene.toPixel
        this.shape = new Konva.Group({
            x: toPixel(this.x),
            y: toPixel(this.y),
        })

        const rect = new Konva.Rect({
            x: 0,
            y: 0,
            width: toPixel(this.w),
            height: toPixel(this.h),
            fill: Scene.FILL_COLOR,
            stroke: Scene.BORDER_COLOR,
        })

        this.shape.add(rect)
        this.layer.add(this.shape)
    }

    protected initAgents() {
        const scene = this.options.scene
        const cpu = scene.createAgentWithC(CPU, this.w / 2, 3)
        cpu.setBuilder(this)
        this.shape.add(cpu.getShape())
        this.agents.set(cpu.id, cpu)

        const memory = scene.createAgentWithC(Memory, this.w / 2, 9)
        memory.setBuilder(this)
        this.shape.add(memory.getShape())
        this.agents.set(memory.id, memory)

        const disk = scene.createAgentWithC(Disk, this.w / 2, 15)
        disk.setBuilder(this)
        this.shape.add(disk.getShape())
        this.agents.set(disk.id, disk)

        const monitor = scene.createAgentWithC(Monitor, this.w / 2, 21)
        monitor.setBuilder(this)
        this.shape.add(monitor.getShape())
        this.agents.set(monitor.id, monitor)
    }

    protected handleDrop() {
        const scene = this.options.scene

        // const setAgent = this.setAgent.bind(this)
        this.shape.on('drop', (e: any) => {
            const object = e.object as Konva.Group

            const id = object.id()
            const agent = scene.getAgentById(id)
            if (!agent) {
                return
            }
            agent.destroy()
        })
    }

    // public setAgent(agent?: Agent): void {
    //     if (!agent) {
    //         return
    //     }
    //     agent.destroy()
    // }

    public pullAgent(agent: Agent): void {
        const id = agent.id
        if (this.agents.has(id)) {
            this.agents.delete(id)

            const newAgent = Agent.clone(agent)
            newAgent.setBuilder(this)
            this.agents.set(newAgent.id, newAgent)
            this.shape.add(newAgent.getShape())
        }
    }
}
