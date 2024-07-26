import Slave from './Slave'
export default class DMA {
    active: boolean
    slaveDMA: Slave
    constructor(active: boolean) {
        this.active = active
        this.slaveDMA = new Slave('DMA Slave', active)
    }

    public Monitor() {

    }
    public Led_matrix() {

    }
    public Keyboard() {

    }
}
