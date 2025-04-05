import Adapter from '../../components/Adapter/Adapter'
import { CPU, DMA, LedMatrix, MMU, Memory } from '../../components/Agent'
import Bridge from '../../components/Agent/Bridge'
import {
    Interconnect,
    SingleMasterInterconnect,
    SubInterconnect,
} from '../../components/Interconnect'
import { CPUModule, IOModule, MMUModule, MemoryModule, Module } from '../../components/Module'
import { Scene } from '../../components/Scene'

export default class NCKHBoard {
    private X: number = -2
    private Y: number = 0

    public cpuModule: Module
    public memoryModule: Module
    public dmaModule: Module
    public mmuModule: Module
    public bridgeModule: Module
    public cpu: CPU
    public mmu: MMU
    public memory: Memory
    public dma: DMA
    public interconnect: Interconnect
    public matrixModule: IOModule
    public ledMatrix: LedMatrix
    public bridge: Bridge

    constructor(containerId: string) {
        Scene.CELL = 13
        const scene = new Scene(containerId, 30, 30)
        const { X, Y } = this

        const cpuModule1 = scene.createModuleWithC(CPUModule, X + 9.25, Y + 3)

        const mmuModule1 = scene.createModuleWithC(MMUModule, cpuModule1.x, cpuModule1.y + 5.5)

        const interconnect = scene.createInterconnectWithC(
            SingleMasterInterconnect,
            X + 3.5,
            mmuModule1.y + 3,
        )

        const interTopAdapter1 = interconnect.getAdapter('t001') as Adapter
        const interTopAdapter3 = interconnect.getAdapter('t003') as Adapter
        const interBottomAdapter1 = interconnect.getAdapter('b001') as Adapter
        const interBottomAdapter3 = interconnect.getAdapter('b003') as Adapter

        const memoryModule2 = scene.createModuleWithC(
            MemoryModule,
            cpuModule1.x + 5.75 * 2,
            mmuModule1.y - 1.75,
        )

        const memoryModule1 = scene.createModuleWithC(
            MemoryModule,
            interconnect.x + 5.75,
            interconnect.y + 6.5,
        )

        const mmuModule2 = scene.createModuleWithC(
            MMUModule,
            memoryModule1.x + 11.5,
            interconnect.y + 5,
        )

        const subInterconnect = scene.createInterconnectWithC(
            SubInterconnect,
            memoryModule1.x + 3.25,
            mmuModule2.y + 3,
        )

        const subInterTopAdapter2 = subInterconnect.getAdapter('t002') as Adapter
        const subInterBottomAdapter2 = subInterconnect.getAdapter('b002') as Adapter

        const ioModule3 = scene.createModuleWithC(
            IOModule,
            interconnect.x + 5.75 + 5.75 + 5.75,
            subInterconnect.y + 6.5,
        )

        memoryModule1
            .getShape()
            .getChildren()
            .find((child) => child.name() === 'adapters')
            ?.rotate(180)

        const cpu1 = scene.createAgentWithC(CPU, X + 10, Y + 5)
        const mmu1 = scene.createAgentWithC(MMU, X + 10, Y + 5)
        const ledMatrix = scene.createAgentWithC(LedMatrix, X + 10, Y + 5)
        const memory = scene.createAgentWithC(Memory, X + 10, Y + 5)
        const dma = scene.createAgentWithC(DMA, X + 10, Y + 5)
        const bridge1 = scene.createAgentWithC(Bridge, X + 10, Y + 5)

        // Agent -> Module
        cpuModule1.setAgent(cpu1)
        mmuModule1.setAgent(mmu1)
        ioModule3.setAgent(ledMatrix)
        memoryModule1.setAgent(memory)
        memoryModule2.setAgent(dma)
        mmuModule2.setAgent(bridge1)

        // Get Interconnect Adapters

        // Create Links
        scene.createLink(cpuModule1.getAdapter('b001').shape, mmuModule1.getAdapter('t001').shape)
        scene.createLink(mmuModule1.getAdapter('b001').shape, interTopAdapter1.shape)

        scene.createLink(interBottomAdapter1.shape, memoryModule1.getAdapter().shape)
        scene.createLink(interBottomAdapter3.shape, mmuModule2.getAdapter('t001').shape)
        scene.createLink(mmuModule2.getAdapter('b001').shape, subInterTopAdapter2.shape)
        scene.createLink(subInterBottomAdapter2.shape, ioModule3.getAdapter().shape)
        scene.createLink(interTopAdapter3.shape, memoryModule2.getAdapter().shape)

        this.cpuModule = cpuModule1
        this.mmuModule = mmuModule1
        this.memoryModule = memoryModule1
        this.dmaModule = memoryModule2
        this.matrixModule = ioModule3
        this.bridgeModule = mmuModule2

        this.cpu = cpu1
        this.mmu = mmu1
        this.memory = memory
        this.dma = dma
        this.interconnect = interconnect
        this.ledMatrix = ledMatrix
        this.bridge = bridge1
    }

    public destroy() {}
}
