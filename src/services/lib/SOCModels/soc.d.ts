import EventEmitter from '../EventEmitter/EventEmitter'

export type Logger = {
    println: (...args: string[]) => void
    clear: () => void
}

export type Keyboard = {
    getEvent(): EventEmitter
}

export type Monitor = {
    println: (...args: string[]) => void
    clear: () => void
}

type TLBEntries = [number, number, number, number]

type TLB = {
    p0: TLBEntries,
    p1: TLBEntries,
    p2: TLBEntries,
    p3: TLBEntries,
    p4: TLBEntries,
    p5: TLBEntries,
    p6: TLBEntries,
    p7: TLBEntries
}
