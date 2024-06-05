import {
    Scene,
    CPU,
    CPUModule,
    Memory,
    MemoryModule,
    DiskModule,
    SubInterconnect,
    MMUModule,
    MMU,
    CacheModule,
    Cache,
    IOModule,
    Monitor,
    Keyboard,
    Speaker,
    Mouse,
} from '../..'
import Adapter from '../../components/Adapter/Adapter'
import Disk from '../../components/Agent/Disk'
import { AgentsBuilder } from '../../components/AgentsBuilder'

export default class TestBoard {
    private X: number = 0
    private Y: number = 0
    constructor(containerId: string) {
        const scene = new Scene(containerId, 55, 59)
        const { X, Y } = this

        // CPU Module
        const cpuModule1 = scene.createModuleWithC(CPUModule, X + 6, Y + 5)
        const cpuModule2 = scene.createModuleWithC(CPUModule, X + 12, Y + 5)
        const cpuModule3 = scene.createModuleWithC(CPUModule, X + 18, Y + 5)
        const cpuModule4 = scene.createModuleWithC(CPUModule, X + 24, Y + 5)

        // MMU & Cache Module
        const mmuModule1 = scene.createModuleWithC(MMUModule, cpuModule1.x, cpuModule1.y + 5)
        const cacheModule1 = scene.createModuleWithC(CacheModule, mmuModule1.x, mmuModule1.y + 3)

        const mmuModule2 = scene.createModuleWithC(MMUModule, cpuModule2.x, cpuModule2.y + 5)
        const cacheModule2 = scene.createModuleWithC(CacheModule, mmuModule2.x, mmuModule2.y + 3)

        const mmuModule3 = scene.createModuleWithC(MMUModule, cpuModule3.x, cpuModule3.y + 5)
        const cacheModule3 = scene.createModuleWithC(CacheModule, mmuModule3.x, mmuModule3.y + 3)

        const mmuModule4 = scene.createModuleWithC(MMUModule, cpuModule4.x, cpuModule4.y + 5)
        const cacheModule4 = scene.createModuleWithC(CacheModule, mmuModule4.x, mmuModule4.y + 3)

        const interconnect = scene.createInterconnect(X + 3.5, cacheModule1.y + 3)

        // Bottom Module
        const cacheModule5 = scene.createModuleWithC(CacheModule, mmuModule1.x, interconnect.y + 5)

        const memoryModule1 = scene.createModuleWithC(MemoryModule, X + 6, cacheModule5.y + 5)
        const diskModule1 = scene.createModuleWithC(
            DiskModule,
            memoryModule1.x + 6,
            interconnect.y + 6.5,
        )
        const subInterconnect = scene.createInterconnectWithC(
            SubInterconnect,
            diskModule1.x + 3.5,
            interconnect.y + 4,
        )
        const ioModule1 = scene.createModuleWithC(
            IOModule,
            diskModule1.x + 6,
            subInterconnect.y + 6,
        )
        const ioModule2 = scene.createModuleWithC(IOModule, ioModule1.x + 6, subInterconnect.y + 6)
        const ioModule3 = scene.createModuleWithC(IOModule, ioModule2.x + 6, subInterconnect.y + 6)
        const ioModule4 = scene.createModuleWithC(IOModule, ioModule3.x + 6, subInterconnect.y + 6)

        // Agent
        const cpu1 = scene.createAgentWithC(CPU, X + 10, Y + 5)
        const cpu2 = scene.createAgentWithC(CPU, X + 10, Y + 5)
        const cpu3 = scene.createAgentWithC(CPU, X + 10, Y + 5)
        const cpu4 = scene.createAgentWithC(CPU, X + 10, Y + 5)
        const memory = scene.createAgentWithC(Memory, X + 10, Y + 5)
        const disk = scene.createAgentWithC(Disk, X + 10, Y + 5)
        const mmu1 = scene.createAgentWithC(MMU, X + 10, Y + 5)
        const cache1 = scene.createAgentWithC(Cache, X + 10, Y + 5)
        const mmu2 = scene.createAgentWithC(MMU, X + 10, Y + 5)
        const cache2 = scene.createAgentWithC(Cache, X + 10, Y + 5)
        const mmu3 = scene.createAgentWithC(MMU, X + 10, Y + 5)
        const cache3 = scene.createAgentWithC(Cache, X + 10, Y + 5)
        const mmu4 = scene.createAgentWithC(MMU, X + 10, Y + 5)
        const cache4 = scene.createAgentWithC(Cache, X + 10, Y + 5)
        const cache5 = scene.createAgentWithC(Cache, X + 10, Y + 5)
        const monitor = scene.createAgentWithC(Monitor, X + 10, Y + 5)
        const keyboard = scene.createAgentWithC(Keyboard, X + 10, Y + 5)
        const speaker = scene.createAgentWithC(Speaker, X + 10, Y + 5)
        const mouse = scene.createAgentWithC(Mouse, X + 10, Y + 5)

        // Agent -> Module
        cpuModule1.setAgent(cpu1)
        cpuModule2.setAgent(cpu2)
        cpuModule3.setAgent(cpu3)
        cpuModule4.setAgent(cpu4)
        memoryModule1.setAgent(memory)
        diskModule1.setAgent(disk)
        mmuModule1.setAgent(mmu1)
        mmuModule2.setAgent(mmu2)
        mmuModule3.setAgent(mmu3)
        mmuModule4.setAgent(mmu4)
        cacheModule1.setAgent(cache1)
        cacheModule2.setAgent(cache2)
        cacheModule3.setAgent(cache3)
        cacheModule4.setAgent(cache4)
        cacheModule5.setAgent(cache5)
        ioModule1.setAgent(monitor)
        ioModule2.setAgent(speaker)
        ioModule3.setAgent(keyboard)
        ioModule4.setAgent(mouse)

        // Interconnect Adapters
        const interAdapter1 = interconnect.getAdapter('t001') as Adapter
        const interAdapter2 = interconnect.getAdapter('t002') as Adapter
        const interAdapter3 = interconnect.getAdapter('t003') as Adapter
        const interAdapter4 = interconnect.getAdapter('t004') as Adapter
        const interAdapter5 = interconnect.getAdapter('b001') as Adapter
        const interAdapter6 = interconnect.getAdapter('b002') as Adapter
        const interAdapter7 = interconnect.getAdapter('b003') as Adapter
        const subInterTopAdapter = subInterconnect.getAdapter('t001') as Adapter
        const subInterBottom1Adapter = subInterconnect.getAdapter('b001') as Adapter
        const subInterBottom2Adapter = subInterconnect.getAdapter('b002') as Adapter
        const subInterBottom3Adapter = subInterconnect.getAdapter('b003') as Adapter
        const subInterBottom4Adapter = subInterconnect.getAdapter('b004') as Adapter

        // Links
        scene.createLink(cpuModule1.getAdapter().shape, mmuModule1.getAdapter('t001').shape)
        scene.createLink(mmuModule1.getAdapter('b001').shape, cacheModule1.getAdapter('t001').shape)
        scene.createLink(cacheModule1.getAdapter('b001').shape, interAdapter1.shape)
        scene.createLink(cpuModule2.getAdapter().shape, mmuModule2.getAdapter('t001').shape)
        scene.createLink(mmuModule2.getAdapter('b001').shape, cacheModule2.getAdapter('t001').shape)
        scene.createLink(cacheModule2.getAdapter('b001').shape, interAdapter2.shape)
        scene.createLink(cpuModule3.getAdapter().shape, mmuModule3.getAdapter('t001').shape)
        scene.createLink(mmuModule3.getAdapter('b001').shape, cacheModule3.getAdapter('t001').shape)
        scene.createLink(cacheModule3.getAdapter('b001').shape, interAdapter3.shape)
        scene.createLink(cpuModule4.getAdapter().shape, mmuModule4.getAdapter('t001').shape)
        scene.createLink(mmuModule4.getAdapter('b001').shape, cacheModule4.getAdapter('t001').shape)
        scene.createLink(cacheModule4.getAdapter('b001').shape, interAdapter4.shape)
        scene.createLink(interAdapter5.shape, cacheModule5.getAdapter('t001').shape)
        scene.createLink(cacheModule5.getAdapter('b001').shape, memoryModule1.getAdapter().shape)
        scene.createLink(interAdapter6.shape, diskModule1.getAdapter().shape)
        scene.createLink(interAdapter7.shape, subInterTopAdapter.shape)

        scene.createLink(subInterBottom1Adapter.shape, ioModule1.getAdapter().shape)
        scene.createLink(subInterBottom2Adapter.shape, ioModule2.getAdapter().shape)
        scene.createLink(subInterBottom3Adapter.shape, ioModule3.getAdapter().shape)
        scene.createLink(subInterBottom4Adapter.shape, ioModule4.getAdapter().shape)

        const builder1 = scene.createAgentsBuilderWithC(AgentsBuilder, 45, 1)

        console.log(scene)
    }
}
