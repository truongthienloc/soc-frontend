import short from 'short-uuid'
import { IGraphObject } from '../types'
import Link, { LinkOptions } from '../Link'
import Port from '../Port'
import VPort, { PortOptions } from '../Port/VPort'

export default class BranchingLink implements IGraphObject {
    // private srcPort: Port;
    // private desPorts: Port[];
    private _id: string
    private context: CanvasRenderingContext2D

    private VPorts: Map<string, VPort> = new Map()
    private subLinks: Map<string, Link> = new Map()

    public speed: number = 0.02

    constructor(context: CanvasRenderingContext2D) {
        // super(context, srcPort, desPorts[0]);
        this._id = short.generate()
        this.context = context
        // this.srcPort = srcPort;
        // this.desPorts = desPorts;
    }

    public get id(): string {
        return this._id
    }

    public render(dt: number): void {
        for (const [, vport] of this.VPorts.entries()) {
            vport.render(dt)
        }
        for (const [, subLink] of this.subLinks.entries()) {
            subLink.render(dt)
        }
    }

    public createPort(x: number, y: number, options?: PortOptions): VPort {
        const _port = new VPort(this.context, x, y, options)
        this.VPorts.set(_port.id, _port)
        return _port
    }

    public createLink(srcPort: Port, desPorts: Port, options?: LinkOptions): Link {
        let newOptions = { ...options }
        if (!newOptions?.speed) {
            newOptions = { ...newOptions, speed: this.speed }
        }
        const _link = new Link(this.context, srcPort, desPorts, newOptions)
        this.subLinks.set(_link.id, _link)
        return _link
    }

    public createLinks(srcPort: Port, desPorts: Port[]): Link[] {
        const _links = []
        for (const desPort of desPorts) {
            const link = this.createLink(srcPort, desPort)
            _links.push(link)
        }

        return _links
    }

    public clearAll(): void {
        this.clearSubLinks()
        this.clearVPorts()
    }

    private clearVPorts(): void {
        this.VPorts.clear()
    }

    private clearSubLinks(): void {
        this.subLinks.clear()
    }
}
