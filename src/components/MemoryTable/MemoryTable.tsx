import { useEffect, useState } from "react"
import { createRangeDmemData } from "~/helpers/generates/dMemRange.generate"
import { Register } from "~/types/register"
import { styled } from '@mui/material/styles';
import OutlinedInput from "@mui/material/OutlinedInput"
import Button from "@mui/material/Button"
import TableContainer from "@mui/material/TableContainer"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableHead from "@mui/material/TableHead"
import TableBody from "@mui/material/TableBody"
import TableRow from "@mui/material/TableRow"
import TableCell from "@mui/material/TableCell"
import type { SxProps, Theme } from "@mui/material/styles";

const styles: { [key: string]: SxProps<Theme> } = {
	table: {
		minWidth: 350,
		maxWidth: 650,
		'& .MuiTableCell-root': {
			// height: '2.5rem',
			padding: '0.15rem',
			border: '1px solid black',
			width: 'min-content',
		},
	},
}

const InputAddress = styled(OutlinedInput)`
	.MuiOutlinedInput-input {
		padding: 0.5rem 1rem;
	}
`

interface DisplayDataTableProps {
	data?: Register[]
	// prev?: Register[]
}

export default function MemoryTable({ data }: DisplayDataTableProps) {
	// console.log('data: ', data);

	const [input, setInput] = useState('0x00000000')
	const [start, setStart] = useState(input)
	const [displayedData, setDisplayedData] = useState(
		createRangeDmemData(data || [], start)
	)
	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInput(e.target.value)
	}

	const handleButtonClick = () => {
		if (input.startsWith('0x')) {
			setStart(input)
		}
	}

	useEffect(() => {
		// calculate start address
		const dec = parseInt(start, 16)
		const startDec = Math.floor(dec / 40) * 40
		const startHex = startDec.toString(16)

		const dMemData = createRangeDmemData(data || [], startHex)

		setDisplayedData(dMemData)
	}, [start, data])

	console.log('displayedData: ', displayedData)

	return (
		<>
			<div className='flex flex-row justify-center gap-2 mt-1 mb-3'>
				<p className='flex items-center font-bold'>Memory Address</p>
				<InputAddress
					placeholder='0x00000000'
					value={input}
					onChange={handleChangeInput}
				/>
				<Button
					sx={{ gap: '0.25rem' }}
					variant='contained'
					onClick={handleButtonClick}>
					{/* <SearchIcon /> */}
					Go
				</Button>
			</div>
			<TableContainer component={Paper}>
				<Table sx={styles.table} stickyHeader>
					<TableHead>
						<TableRow>
							<TableCell align='center'>Memory Address</TableCell>
							<TableCell align='center'>Dec</TableCell>
							<TableCell align='center'>Hex</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{displayedData &&
							displayedData.length > 0 &&
							displayedData.map((value) => (
								<TableRow
									key={value.name}
									sx={
										value.value !== '0x00000000'
											? { backgroundColor: '#fff177' }
											: {}
									}>
									<TableCell>{value.name}</TableCell>
									<TableCell>
										{parseInt(value.value, 16)}
									</TableCell>
									<TableCell>{value.value}</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	)
}