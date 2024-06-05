export default class EventEmitter {
    private events: { [eventName: string]: Function[] }

    constructor() {
        this.events = {}
    }

    // Register an event listener
    on(eventName: string, listener: Function): void {
        if (!this.events[eventName]) {
            this.events[eventName] = []
        }
        this.events[eventName].push(listener)
    }

    // Emit an event
    emit(eventName: string, ...args: any[]): void {
        if (this.events[eventName]) {
            this.events[eventName].forEach((listener) => {
                listener(...args)
            })
        }
    }

    // Remove a specific event listener
    off(eventName: string, listener: Function): void {
        if (!this.events[eventName]) return

        this.events[eventName] = this.events[eventName].filter((l) => l !== listener)

        if (this.events[eventName].length === 0) {
            delete this.events[eventName]
        }
    }

    // Clear all listeners for a specific event
    clear(eventName: string): void {
        if (this.events[eventName]) {
            delete this.events[eventName]
        }
    }

    clearAll(): void {
        this.events = {}
    }
}
