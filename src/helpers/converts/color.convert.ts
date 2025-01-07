import { Register } from '~/types/register'

export function modelColors2ViewColors(pure: { [key: string]: string }): Register[] {
    const graphic = []

    for (const key in pure) {
        if (Object.prototype.hasOwnProperty.call(pure, key)) {
            const element = pure[key]

            if (!element) {
                continue
            }

            if (element.length === 6) {
                graphic.push({
                    name: key,
                    value: `#${element}`,
                })
            } else if (element.includes('1')) {
                graphic.push({
                    name: key,
                    value: 'blue',
                })
            }
        }
    }

    return graphic
}

// export function modelColors2ViewColors(colors: { [key: string]: string }): Register[] {
//     const result: Register[] = []
//     for (const [key, value] of Object.entries(colors)) {
//         result.push({ name: key, value })
//     }
//     return result
// }
