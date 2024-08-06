import { Register } from "~/types/register"

const LENGTH_OF_DMEM = 10

export function convertBinary2Hex(binary: string): string {
	// Validate if the input is a valid binary string
	if (!/^[01]+$/.test(binary)) {
		throw new Error('Invalid binary input')
	}

	// Convert binary to decimal
	const decimalValue = parseInt(binary, 2)

	// Convert decimal to hexadecimal with '0x' prefix and leading zeros
	const hexValue =
		'0x' + decimalValue.toString(16).padStart(Math.ceil(binary.length / 4), '0')

	return hexValue
}

export function createRangeDmemData(data: Register[], start: string): Register[] {
	const startDec = parseInt(start, 16)
	const res = []
	for (let i = 0; i < LENGTH_OF_DMEM; i++) {
		const addressDec = startDec + 4 * i
		const addressHex = '0x' + addressDec.toString(16).padStart(8, '0')

		const DMemData = data.find(
			(value) => convertBinary2Hex(value.name) === addressHex
		)
		let value = '0x00000000'
		if (DMemData) {
			value = convertBinary2Hex(DMemData.value)
		}

		res.push({
			name: addressHex,
			value: value,
		})
	}

	return res
}