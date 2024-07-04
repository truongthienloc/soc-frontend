import Slave from './Slave'
export default class DMA {
    active: boolean
    slaveDMA: Slave
    constructor() {
        this.active= false
        this.slaveDMA = new Slave('DMA Slave', true)
    }

    public setActive () {
        this.active =true
    }
    
    public Direct_acces(){

    }

}