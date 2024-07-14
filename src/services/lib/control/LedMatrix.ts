export default class LedMatrix {
    private container: HTMLDivElement | null

    public static COLOR = {
        GREEN: '#4ade80',
        INACTIVE: 'gray',
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

    public clear(): void {
        if (!this.container) return
        const leds = this.container?.querySelectorAll(
            '.led-matrix__led',
        ) as NodeListOf<HTMLDivElement>
        leds.forEach((led) => (led.style.backgroundColor = LedMatrix.COLOR.INACTIVE))
    }
}
