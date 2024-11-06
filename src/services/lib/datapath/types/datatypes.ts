export type Point = {
    x: number
    y: number
}

export type PortType = 'input' | 'output'
export type SceneMode = 'normal' | 'grid'

export type InputValue = { name: string; value: string }
export interface InputData {
    type: 'always' | 'once'
    value: InputValue[]
    srcId: string
    srcName?: string
    color?: string
}
