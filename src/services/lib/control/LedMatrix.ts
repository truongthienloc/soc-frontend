export default class LedMatrix {
    private container: HTMLDivElement | null

    public static COLOR = {
        GREEN: '#4ade80',
        INACTIVE: 'gray',
        ACTIVE: '#4ade80',
    }

    constructor(containerQuery: string) {
        this.container = document.querySelector(containerQuery)
    }

    /**
     * ```tsx
     * const ledMatrix = new LedMatrix('#led-matrix-container')
     * ledMatrix.setColor(1, 1, LedMatrix.COLOR.GREEN)
     * ```
     */
    public setColor(row: number, column: number, color: string) {
        if (!this.container) return

        const led = this.container?.querySelector(`#led-${row}-${column}`) as HTMLDivElement | null

        if (!led) {
            return
        }

        led.style.backgroundColor = color
    }

    public turnOn(row: number, column: number) {
        if (!this.container) return

        const led = this.container?.querySelector(`#led-${row}-${column}`) as HTMLDivElement | null

        if (!led) {
            return
        }

        led.style.backgroundColor = LedMatrix.COLOR.ACTIVE
    }

    public turnOff(row: number, column: number) {
        if (!this.container) return

        const led = this.container?.querySelector(`#led-${row}-${column}`) as HTMLDivElement | null

        if (!led) {
            return
        }

        led.style.backgroundColor = LedMatrix.COLOR.INACTIVE
    }

    public clear(): void {
        if (!this.container) return
        const leds = this.container?.querySelectorAll(
            '.led-matrix__led',
        ) as NodeListOf<HTMLDivElement>
        leds.forEach((led) => (led.style.backgroundColor = LedMatrix.COLOR.INACTIVE))
    }
}
