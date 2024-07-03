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
}
