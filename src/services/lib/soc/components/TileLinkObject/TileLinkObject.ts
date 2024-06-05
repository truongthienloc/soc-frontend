import short from 'short-uuid'

export default class TileLinkObject {
    private _id!: string
    public x: number = 0
    public y: number = 0
    public w: number = 0
    public h: number = 0

    constructor() {
        this._id = short.generate()
    }

    public get id(): string {
        return this._id
    }

    public onReady(): void {}
}
