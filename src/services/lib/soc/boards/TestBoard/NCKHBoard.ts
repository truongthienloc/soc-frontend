import Adapter from '../../components/Adapter/Adapter'
import { CPU, Cache, DMA, Keyboard, MMU, Memory, Monitor } from '../../components/Agent'
import { SingleMasterInterconnect } from '../../components/Interconnect'
import { CPUModule, CacheModule, IOModule, MMUModule, MemoryModule } from '../../components/Module'
import { Scene } from '../../components/Scene'

export default class NCKHBoard {
    private X: number = 0
    private Y: number = 0

    public monitorModule: IOModule
    public keyboardModule: IOModule
    public cpu: CPU

    constructor(containerId: string) {
        Scene.CELL = 25
        const scene = new Scene(containerId, 30, 25)
        const { X, Y } = this

        const cpuModule1 = scene.createModuleWithC(CPUModule, X + 15, Y + 5)
        // const cpuModule2 = scene.createModuleWithC(CPUModule, X + 12, Y + 5)

        const mmuModule1 = scene.createModuleWithC(MMUModule, cpuModule1.x, cpuModule1.y + 6)
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

        const ioModule1 = scene.createModuleWithC(IOModule, X + 6, interconnect.y + 6.5)
        const ioModule2 = scene.createModuleWithC(IOModule, ioModule1.x + 6, interconnect.y + 6.5)
        const memoryModule1 = scene.createModuleWithC(
            MemoryModule,
            ioModule2.x + 6,
            interconnect.y + 6.5,
        )
        const memoryModule2 = scene.createModuleWithC(
            MemoryModule,
            memoryModule1.x + 6,
            interconnect.y + 6.5,
        )

        const cpu1 = scene.createAgentWithC(CPU, X + 10, Y + 5)
        const mmu1 = scene.createAgentWithC(MMU, X + 10, Y + 5)
        const monitor = scene.createAgentWithC(Monitor, X + 10, Y + 5)
        const keyboard = scene.createAgentWithC(Keyboard, X + 10, Y + 5)
        const memory = scene.createAgentWithC(Memory, X + 10, Y + 5)
        const dma = scene.createAgentWithC(DMA, X + 10, Y + 5)

        // Agent -> Module
        cpuModule1.setAgent(cpu1)
        // cpuModule2.setAgent(cpu2)
        mmuModule1.setAgent(mmu1)
        // mmuModule2.setAgent(mmu2)
        // cacheModule1.setAgent(cache1)
        // cacheModule2.setAgent(cache2)
        ioModule1.setAgent(monitor)
        ioModule2.setAgent(keyboard)
        memoryModule1.setAgent(memory)
        memoryModule2.setAgent(dma)

        // Get Interconnect Adapters
        const interTopAdapter1 = interconnect.getAdapter('t001') as Adapter
        const interBottomAdapter1 = interconnect.getAdapter('b001') as Adapter
        const interBottomAdapter2 = interconnect.getAdapter('b002') as Adapter
        const interBottomAdapter3 = interconnect.getAdapter('b003') as Adapter
        const interBottomAdapter4 = interconnect.getAdapter('b004') as Adapter

        // Create Links
        scene.createLink(cpuModule1.getAdapter().shape, mmuModule1.getAdapter('t001').shape)
        scene.createLink(mmuModule1.getAdapter('b001').shape, interTopAdapter1.shape)

        // scene.createLink(
        //     cpuModule2.getAdapter().shape,
        //     mmuModule2.getAdapter('t001').shape,
        // )
        // scene.createLink(mmuModule2.getAdapter('b001').shape, interTopAdapter2.shape)

        scene.createLink(interBottomAdapter1.shape, ioModule1.getAdapter().shape)
        scene.createLink(interBottomAdapter2.shape, ioModule2.getAdapter().shape)
        scene.createLink(interBottomAdapter3.shape, memoryModule1.getAdapter().shape)
        scene.createLink(interBottomAdapter4.shape, memoryModule2.getAdapter().shape)

        mmuModule1.setActivated(false)
        // mmuModule2.setActivated(false)

        this.monitorModule = ioModule1
        this.keyboardModule = ioModule2
        this.cpu = cpu1
    }

    public destroy() {}
}
