import Adapter from '../../components/Adapter/Adapter'
import {
    CPU,
    Cache,
    DMA,
    Keyboard,
    LedMatrix,
    MMU,
    Memory,
    MemoryAllocator,
    Monitor,
} from '../../components/Agent'
import {
    Interconnect,
    SingleMasterInterconnect,
    SubInterconnect,
} from '../../components/Interconnect'
import {
    CPUModule,
    CacheModule,
    IOModule,
    MMUModule,
    MemoryModule,
    Module,
    OSModule,
} from '../../components/Module'
import { Scene } from '../../components/Scene'

export default class NCKHBoard {
    private X: number = -2
    private Y: number = 1

    public cpuModule: Module
    public memoryModule: Module
    public dmaModule: Module
    public mmuModule: Module
    // public monitorModule: IOModule
    // public keyboardModule: IOModule
    public osModule: Module
    public cpu: CPU
    public mmu: MMU
    public memory: Memory
    public dma: DMA
    // public monitor: Monitor
    // public keyboard: Keyboard
    public interconnect: Interconnect
    public matrixModule: IOModule
    public ledMatrix: LedMatrix
    public memoryAllocator: MemoryAllocator

    constructor(containerId: string) {
        Scene.CELL = 13
        const scene = new Scene(containerId, 30, 30)
        const { X, Y } = this

        const cpuModule1 = scene.createModuleWithC(CPUModule, X + 9.25, Y + 3)
        const osModule1 = scene.createModuleWithC(OSModule, cpuModule1.x + 5.75 * 2, cpuModule1.y)
        // const cpuModule2 = scene.createModuleWithC(CPUModule, X + 12, Y + 5)

        const mmuModule1 = scene.createModuleWithC(MMUModule, cpuModule1.x, cpuModule1.y + 8)
        // const cacheModule1 = scene.createModuleWithC(
        //     CacheModule,
        //     mmuModule1.x,
        //     mmuModule1.y + 3,
        // )

        // const mmuModule2 = scene.createModuleWithC(
        //     MMUModule,
        //     cpuModule2.x,
        //     cpuModule2.y + 6,
        // )
        // const cacheModule2 = scene.createModuleWithC(
        //     CacheModule,
        //     mmuModule2.x,
        //     mmuModule2.y + 3,
        // )

        const interconnect = scene.createInterconnectWithC(
            SingleMasterInterconnect,
            X + 3.5,
            mmuModule1.y + 3,
        )

        const interTopAdapter1 = interconnect.getAdapter('t001') as Adapter
        const interTopAdapter2 = interconnect.getAdapter('t002') as Adapter
        const interTopAdapter3 = interconnect.getAdapter('t003') as Adapter
        const interBottomAdapter1 = interconnect.getAdapter('b001') as Adapter
        const interBottomAdapter2 = interconnect.getAdapter('b002') as Adapter
        const interBottomAdapter3 = interconnect.getAdapter('b003') as Adapter
        // const interBottomAdapter4 = interconnect.getAdapter('b004') as Adapter'

        const memoryModule2 = scene.createModuleWithC(
            MemoryModule,
            cpuModule1.x + 5.75 * 2,
            mmuModule1.y - 1.75,
        )

        // const memoryModule1 = scene.createModuleWithC(
        //     MemoryModule,
        //     cpuModule1.x + 5.75 * 2,
        //     mmuModule1.y - 1.75,
        // )

        // const ioModule1 = scene.createModuleWithC(IOModule, X + 6, interconnect.y + 6.5)
        // const ioModule2 = scene.createModuleWithC(IOModule, ioModule1.x + 6, interconnect.y + 6.5)

        const memoryModule1 = scene.createModuleWithC(
            MemoryModule,
            interconnect.x + 5.75,
            interconnect.y + 6.5,
        )

        const subInterconnect = scene.createInterconnectWithC(
            SubInterconnect,
            memoryModule1.x + 3.25,
            interconnect.y + 4,
        )
        const subInterTopAdapter1 = subInterconnect.getAdapter('t001') as Adapter
        const subInterTopAdapter2 = subInterconnect.getAdapter('t002') as Adapter
        const subInterBottomAdapter1 = subInterconnect.getAdapter('b001') as Adapter
        const subInterBottomAdapter2 = subInterconnect.getAdapter('b002') as Adapter
        const subInterBottomAdapter3 = subInterconnect.getAdapter('b003') as Adapter

        // const ioModule2 = scene.createModuleWithC(
        //     IOModule,
        //     subInterconnect.x + 2.5,
        //     subInterconnect.y + 6.5,
        // )

        const ioModule3 = scene.createModuleWithC(
            IOModule,
            subInterconnect.x + 5.75 + 2.5,
            subInterconnect.y + 6.5,
        )

        // const ioModule1 = scene.createModuleWithC(
        //     IOModule,
        //     ioModule3.x + 5.75,
        //     subInterconnect.y + 6.5,
        // )

        // const memoryModule2 = scene.createModuleWithC(
        //     MemoryModule,
        //     ioModule3.x + 5.75,
        //     subInterconnect.y + 6.5,
        // )

        memoryModule1
            .getShape()
            .getChildren()
            .find((child) => child.name() === 'adapters')
            ?.rotate(180)

        const cpu1 = scene.createAgentWithC(CPU, X + 10, Y + 5)
        const mmu1 = scene.createAgentWithC(MMU, X + 10, Y + 5)
        // const monitor = scene.createAgentWithC(Monitor, X + 10, Y + 5)
        // const keyboard = scene.createAgentWithC(Keyboard, X + 10, Y + 5)
        const ledMatrix = scene.createAgentWithC(LedMatrix, X + 10, Y + 5)
        const memory = scene.createAgentWithC(Memory, X + 10, Y + 5)
        const dma = scene.createAgentWithC(DMA, X + 10, Y + 5)
        const memoryAllocator = scene.createAgentWithC(MemoryAllocator, X + 10, Y + 5)

        // Agent -> Module
        cpuModule1.setAgent(cpu1)
        // cpuModule2.setAgent(cpu2)
        mmuModule1.setAgent(mmu1)
        // mmuModule2.setAgent(mmu2)
        // cacheModule1.setAgent(cache1)
        // cacheModule2.setAgent(cache2)
        // ioModule1.setAgent(monitor)
        // ioModule2.setAgent(keyboard)
        ioModule3.setAgent(ledMatrix)
        memoryModule1.setAgent(memory)
        memoryModule2.setAgent(dma)
        osModule1.setAgent(memoryAllocator)

        // Get Interconnect Adapters

        // Create Links
        scene.createLink(osModule1.getAdapter().shape, cpuModule1.getAdapter('t001').shape)
        scene.createLink(cpuModule1.getAdapter('b001').shape, mmuModule1.getAdapter('t001').shape)
        scene.createLink(mmuModule1.getAdapter('b001').shape, interTopAdapter1.shape)

        // scene.createLink(
        //     cpuModule2.getAdapter().shape,
        //     mmuModule2.getAdapter('t001').shape,
        // )
        // scene.createLink(mmuModule2.getAdapter('b001').shape, interTopAdapter2.shape)

        scene.createLink(interBottomAdapter3.shape, subInterTopAdapter2.shape)

        scene.createLink(interBottomAdapter1.shape, memoryModule1.getAdapter().shape)
        // scene.createLink(interBottomAdapter2.shape, ioModule2.getAdapter().shape)
        // scene.createLink(subInterBottomAdapter1.shape, ioModule2.getAdapter().shape)
        scene.createLink(subInterBottomAdapter2.shape, ioModule3.getAdapter().shape)
        // scene.createLink(subInterBottomAdapter3.shape, ioModule1.getAdapter().shape)
        scene.createLink(interTopAdapter3.shape, memoryModule2.getAdapter().shape)
        // scene.createLink(interTopAdapter3.shape, memoryModule2.getAdapter().shape)

        // mmuModule1.setActivated(false)
        // mmuModule2.setActivated(false)

        this.cpuModule = cpuModule1
        this.mmuModule = mmuModule1
        this.memoryModule = memoryModule1
        this.dmaModule = memoryModule2
        // this.monitorModule = ioModule1
        // this.keyboardModule = ioModule2
        this.matrixModule = ioModule3
        this.osModule = osModule1

        this.cpu = cpu1
        this.mmu = mmu1
        this.memory = memory
        this.dma = dma
        // this.keyboard = keyboard
        // this.monitor = monitor
        this.interconnect = interconnect
        this.ledMatrix = ledMatrix
        this.memoryAllocator = memoryAllocator

        // interconnect.setIsRunning(true)
        // cpu1.setIsRunning(true)
        // setTimeout(() => cpu1.setIsRunning(false), 5000)
        // memory.setIsRunning(true)
    }

    public destroy() {}
}
