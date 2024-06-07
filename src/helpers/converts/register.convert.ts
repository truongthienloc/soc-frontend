import { TwinRegister, Register } from "~/types/register"

export function convertRegisters2TwinRegisters(registers: Register[]): TwinRegister[] {
	const res: TwinRegister[] = []

	for (let index = 0; index < registers.length; index += 2) {
		const element1 = registers[index]
		const element2 = registers[index + 1]

		res.push({
			register1: { ...element1 },
			register2: { ...element2 },
		})
	}

	return res
}