import Konva from 'konva'
import { TileLinkObject } from '../TileLinkObject'
import { Vector2d } from 'konva/lib/types'
import { Scene } from '../Scene'

export default class Link extends TileLinkObject {
    private layer: Konva.Layer
    private src: Konva.Node
    private dst: Konva.Node

    private shape: Konva.Arrow
    private shape2: Konva.Arrow

    constructor(layer: Konva.Layer, src: Konva.Node, dst: Konva.Node, options: {}) {
        super()
        this.layer = layer
        this.src = src
        this.dst = dst

        const pSrc = src.absolutePosition()
        const pDst = dst.absolutePosition()
        this.shape = new Konva.Arrow({
            x: 0,
            y: 0,
            points: [pSrc.x, pSrc.y, pDst.x, pDst.y],
            fill: Scene.BORDER_COLOR,
            stroke: Scene.BORDER_COLOR,
        })

        this.shape2 = new Konva.Arrow({
            x: 0,
            y: 0,
            points: [pDst.x, pDst.y, pSrc.x, pSrc.y],
            fill: Scene.BORDER_COLOR,
            stroke: Scene.BORDER_COLOR,
        })

        this.layer.add(this.shape, this.shape2)
    }

    public send(data: any): void {}
}
