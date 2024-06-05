import Konva from 'konva'
import { Module } from '../Module'
import { Interconnect } from '../Interconnect'
import { Link } from '../Link'
import { Interface } from '../Interface'

type AdapterType = 'none' | 'master' | 'slave'

export default class Adapter {
    public shape: Konva.Node
    public type: AdapterType = 'none'
    public name?: string
    public link?: Link
    public interface?: Interface

    private parent: Module | Interconnect

    constructor(parent: Module | Interconnect, shape: Konva.Node) {
        this.parent = parent
        this.shape = shape
    }

    // public send(data: any): void {
    //     if (!this.link) {
    //         return
    //     }

    //     this.link.send(data)
    // }

    // public receive(data: any): void {
    //     if (!this.interface) {
    //         return
    //     }

    //     this.interface.receive(data)
    // }
}
