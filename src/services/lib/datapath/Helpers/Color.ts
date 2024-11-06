export default class Color {
    // Một bảng ánh xạ đối tượng với tên màu và giá trị RGB tương ứng
    private static readonly COLOR_MAP: { [name: string]: [number, number, number] } = {
        black: [0, 0, 0],
        white: [255, 255, 255],
        red: [255, 0, 0],
        green: [0, 255, 0],
        blue: [0, 0, 255],
        yellow: [255, 255, 0],
        cyan: [0, 255, 255],
        magenta: [255, 0, 255],
    }

    private readonly r: number
    private readonly g: number
    private readonly b: number
    private readonly a: number

    constructor(r: number, g: number, b: number, a: number = 1) {
        this.r = r
        this.g = g
        this.b = b
        this.a = a
    }

    public getRed(): number {
        return this.r
    }

    public getGreen(): number {
        return this.g
    }

    public getBlue(): number {
        return this.b
    }

    public getRGB(): string {
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`
    }

    public getHex(): string {
        function componentToHex(c: number): string {
            const hex = c.toString(16)
            return hex.length === 1 ? '0' + hex : hex
        }
        return `#${componentToHex(this.r)}${componentToHex(this.g)}${componentToHex(
            this.b,
        )}${componentToHex(Math.round(this.a * 255))}`
    }

    public brighten(amount: number): Color {
        const newRed = this.r + amount
        const newGreen = this.g + amount
        const newBlue = this.b + amount

        return new Color(
            Math.min(255, newRed),
            Math.min(255, newGreen),
            Math.min(255, newBlue),
            this.a,
        )
    }

    public darken(amount: number): Color {
        const newRed = this.r - amount
        const newGreen = this.g - amount
        const newBlue = this.b - amount

        return new Color(Math.max(0, newRed), Math.max(0, newGreen), Math.max(0, newBlue), this.a)
    }

    public static fromString(colorString: string, alpha: number = 1): Color {
        let r = 0,
            g = 0,
            b = 0
        if (colorString.charAt(0) === '#') {
            colorString = colorString.substring(1)
            if (colorString.length === 3) {
                r = parseInt(colorString.charAt(0) + colorString.charAt(0), 16)
                g = parseInt(colorString.charAt(1) + colorString.charAt(1), 16)
                b = parseInt(colorString.charAt(2) + colorString.charAt(2), 16)
            } else {
                r = parseInt(colorString.substring(0, 2), 16)
                g = parseInt(colorString.substring(2, 4), 16)
                b = parseInt(colorString.substring(4, 6), 16)
            }
        } else if (colorString.startsWith('rgb(')) {
            const numbers = colorString
                .replace(/^(rgb\(|\))/g, '')
                .split(',')
                .map((n) => parseInt(n.trim()))
            if (numbers.length === 3) {
                r = numbers[0]
                g = numbers[1]
                b = numbers[2]
            }
        } else {
            const name = colorString.toLowerCase()
            const color = Color.COLOR_MAP[name]
            if (color) {
                r = color[0]
                g = color[1]
                b = color[2]
            }
        }
        return new Color(r, g, b, alpha)
    }
}
