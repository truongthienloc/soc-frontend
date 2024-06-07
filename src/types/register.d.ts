export type Register = {
    name: string
    value: string
}

export type Registers = Register[]

export interface TwinRegister {
	register1: Register
	register2: Register
}
