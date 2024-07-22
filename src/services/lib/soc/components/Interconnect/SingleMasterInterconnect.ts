import Interconnect from './Interconnect'

export default class SingleMasterInterconnect extends Interconnect {
    protected initAdapter(): void {
        this.createAdapter('t001', 5.75, 0)
        this.createAdapter('t002', 11.5, 0)
        this.createAdapter('t003', 17.25, 0)
        // this.createAdapter('t002', 8.5, 0)
        // this.createAdapter('t003', 14.5, 0)
        // this.createAdapter('t004', 20.5, 0)
        // this.createAdapter('b001', 2.5, this.h)
        // this.createAdapter('b002', 8.5, this.h)
        // this.createAdapter('b003', 14.5, this.h)
        // this.createAdapter('b004', 20.5, this.h)
        this.createAdapter('b001', 5.75, this.h)
        this.createAdapter('b002', 11.5, this.h)
        this.createAdapter('b003', 17.25, this.h)
    }
}
