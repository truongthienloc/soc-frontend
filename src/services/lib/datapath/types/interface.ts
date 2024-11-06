export interface IGraphObject {
    readonly id: string
    name?: string
    render(dt: number): void
    destroy?(): void
}

export interface ILoader {
    readonly id: string
    load(data: any, callback?: () => void): void
}
