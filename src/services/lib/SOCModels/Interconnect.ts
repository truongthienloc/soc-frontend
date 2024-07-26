export default class InterConnect {
    active: boolean
    Pin: string[]
    Pout: string[]
    Pactived: boolean[]
    numPin: number
    numPout: number

    constructor(
        numPin: number,
        numPout: number,
        active: boolean,
    ) {
        this.active = active
        this.Pactived= []
        for (let i = 0; i < numPin + numPout ; i++) {
            this.Pactived[i] = false;
        }
        this.numPin = numPin
        this.numPout = numPout
        this.Pin = []
        this.Pout = []
        for (let i=0; i< numPin ;i++) this.Pin[i] = ''
        for (let i=0; i< numPout ;i++) this.Pout[i] = ''
    }

    Port_in(data: string, index: number): void {
        if (this.active == true) 
            {
                this.Pin[index] = data
                this.Pactived[index] = true
            }

    }

    Port_out(index: number): any {
        if (this.active == true) {
            const data = this.Pout[index]
            return data
        }
    }

    Transmit(): void {
        if (this.Pactived[0]==true) {
            this.Pout[1] = this.Pin[0]
            this.Pout[2] = this.Pin[0]
            this.Pactived[0] = false
        }
        if (this.Pactived[1]==true) {
            this.Pout[0] = this.Pin[1]
            this.Pactived[1] = false
        }
        if (this.Pactived[2]==true) {
            this.Pout[3] = this.Pin[2]
            this.Pout[4] = this.Pin[2]
            this.Pout[5] = this.Pin[2]
            this.Pactived[2] = false
        }
    }
}

