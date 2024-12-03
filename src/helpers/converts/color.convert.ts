import { Register } from "~/types/register";

export function modelColors2ViewColors(colors: {[key: string]: string}): Register[] {
    const result: Register[] = []
    for (const [key, value] of Object.entries(colors)) {
        result.push({ name: key, value })
    }
    return result
}