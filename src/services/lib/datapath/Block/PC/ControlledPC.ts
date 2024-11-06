import Port from '../../Port'
import { InputData } from '../../types'
import PC from './PC'

type BlockPort = 'input' | 'output' | 'input-control'

export default class ControlledPC extends PC {
    constructor(context: CanvasRenderingContext2D, x: number, y: number) {
        super(context, x, y)

        this.createPort(1, 0, 'input', 'aqua', 'input-control')
    }

    public getPort(id: BlockPort): Port {
        return super.getPort(id as any) as Port
    }

    public load(data: InputData): void {
        this.inputs.set(data.srcId, data)
        if (this.inputs.size === 1) {
            super.loadout(data)
        } else if (this.inputs.size === this.countInputPorts) {
            super.load(data)
        }
    }
}
