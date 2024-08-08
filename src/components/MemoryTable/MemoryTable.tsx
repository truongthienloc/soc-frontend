import { useEffect, useState } from 'react'
import { createRangeDmemData } from '~/helpers/generates/dMemRange.generate'
import { Register } from '~/types/register'
import { styled } from '@mui/material/styles'
import OutlinedInput from '@mui/material/OutlinedInput'
import Input from '@mui/material/Input'
import Button from '@mui/material/Button'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import type { SxProps, Theme } from '@mui/material/styles'
import EditIcon from '@mui/icons-material/Edit'
import DoneIcon from '@mui/icons-material/Done'

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
  onChangeData?: (address: string, value: string) => void
  // prev?: Register[]
}

export default function MemoryTable({ data, onChangeData }: DisplayDataTableProps) {
  const [input, setInput] = useState('0x00000000')
  const [start, setStart] = useState(input)
  const [displayedData, setDisplayedData] = useState(createRangeDmemData(data || [], start))
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }
  const [modifiedName, setModifiedName] = useState<string>()
  const [modifiedValue, setModifiedValue] = useState<string>()

  useEffect(() => {
    // calculate start address
    const dec = parseInt(start, 16)
    const startDec = Math.floor(dec / 40) * 40
    const startHex = startDec.toString(16)

    const dMemData = createRangeDmemData(data || [], startHex)

    setDisplayedData(dMemData)
  }, [start, data])

  const handleButtonClick = () => {
    if (input.startsWith('0x')) {
      setStart(input)
    }
  }

  const handleEditClick = (address: string, value: string) => {
    setModifiedName(address)
    setModifiedValue(value)
  }

  const handleDoneClick = () => {
    if (!modifiedName || !modifiedValue) {
      return
    }
    onChangeData?.(modifiedName, modifiedValue)
    setModifiedName(undefined)
    setModifiedValue(undefined)
  }

  console.log('displayedData: ', displayedData)

  return (
    <>
      <div className="mb-3 mt-1 flex flex-row justify-center gap-2">
        <p className="flex items-center font-bold">Memory Address</p>
        <InputAddress placeholder="0x00000000" value={input} onChange={handleChangeInput} />
        <Button
          sx={{ gap: '0.25rem' }}
          variant="contained"
          onClick={handleButtonClick}
          disabled={!!modifiedName}
        >
          {/* <SearchIcon /> */}
          Go
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table sx={styles.table} stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="center" className="max-w-1">
                Memory Address
              </TableCell>
              {/* <TableCell align="center">Dec</TableCell> */}
              <TableCell align="center" className="max-w-2">
                Hex
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedData &&
              displayedData.map((value) => (
                <TableRow
                  key={value.name}
                  sx={value.value !== '0x00000000' ? { backgroundColor: '#fff177' } : {}}
                >
                  <TableCell className="max-w-1">{value.name}</TableCell>
                  {/* <TableCell>{parseInt(value.value, 16)}</TableCell> */}
                  <TableCell className="max-w-2">
                    <div className="flex items-center">
                      {value.name === modifiedName ? (
                        <>
                          <Input
                            className="max-w-28 px-1"
                            value={modifiedValue}
                            onChange={(e) => setModifiedValue(e.target.value)}
                          />
                          <Button
                            className="ml-auto bg-white"
                            variant="outlined"
                            color="success"
                            onClick={handleDoneClick}
                          >
                            <DoneIcon />
                          </Button>
                        </>
                      ) : (
                        <>
                          <span>{value.value}</span>
                          <Button
                            className="ml-auto bg-white"
                            variant="outlined"
                            color="warning"
                            onClick={() => handleEditClick(value.name, value.value)}
                          >
                            <EditIcon />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
