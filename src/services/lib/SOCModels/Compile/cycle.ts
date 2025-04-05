export default class Cycle {

    cycle : number
    constructor (cycle: number) {
        this.cycle = cycle
    }

    public incr () : void {
        this.cycle +=1
    }
    public toString () {
        return this.cycle.toString()
    }
}