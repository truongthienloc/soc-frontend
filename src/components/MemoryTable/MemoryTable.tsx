import DoneIcon from '@mui/icons-material/Done'
import EditIcon from '@mui/icons-material/Edit'
import Button from '@mui/material/Button'
import Input from '@mui/material/Input'
import OutlinedInput from '@mui/material/OutlinedInput'
import Paper from '@mui/material/Paper'
import Tab from '@mui/material/Tab'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Tabs from '@mui/material/Tabs'
import Tooltip from '@mui/material/Tooltip'
import type { SxProps, Theme } from '@mui/material/styles'
import { styled } from '@mui/material/styles'
import { useEffect, useState } from 'react'
import { MEMORY_SECTION } from '~/configs/memoryPoint.constant'
import { createRangeDmemData, LENGTH_OF_DMEM } from '~/helpers/generates/dMemRange.generate'
import { MemoryMapHookReturn } from '~/hooks/memory/useMemoryMap'
import { Register } from '~/types/register'
import FunctionButton from './FunctionButton'

const styles: { [key: string]: SxProps<Theme> } = {
  table: {
    minWidth: 350,
    // maxWidth: 650,
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
  onResetData?: () => void
  disabled?: boolean
  memoryMap?: MemoryMapHookReturn
  onImportClick?: () => void
  onExportClick?: () => void
  // prev?: Register[]
}

export default function MemoryTable({
  data,
  onChangeData,
  onResetData,
  disabled,
  memoryMap,
  onImportClick,
  onExportClick,
}: DisplayDataTableProps) {
  const [input, setInput] = useState('0x00000000')
  const [start, setStart] = useState(input)
  const [displayedData, setDisplayedData] = useState(createRangeDmemData(data || [], start))
  const [tabIndex, setTabIndex] = useState(0)
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }
  const [modifiedName, setModifiedName] = useState<string>()
  const [modifiedValue, setModifiedValue] = useState<string>()

  useEffect(() => {
    const BASE = LENGTH_OF_DMEM * 4
    let dec = parseInt(start, 16)

    function calculateMemoryRange(minPoint: string, maxPoint: string) {
      const minDec = parseInt(minPoint, 16)
      const maxDec = parseInt(maxPoint, 16) - 1
      dec = Math.max(Math.min(dec, maxDec), minDec)
      const startDec = Math.floor((dec - minDec) / BASE) * BASE + minDec
      const startHex = startDec.toString(16)
      const endHex = maxDec.toString(16)
      return { startHex, endHex }
    }

    let range: { startHex: string; endHex?: string }

    if (tabIndex === 0 || !memoryMap) {
      const startDec = Math.floor(dec / BASE) * BASE
      range = { startHex: startDec.toString(16) }
    } else {
      const memoryRanges = [
        { min: memoryMap.lmPoint, max: memoryMap.ioPoint },
        { min: memoryMap.ioPoint, max: memoryMap.iMemPoint },
        { min: memoryMap.iMemPoint, max: memoryMap.dMemPoint },
        { min: memoryMap.dMemPoint, max: memoryMap.stackPoint },
        { min: memoryMap.stackPoint, max: undefined },
      ]

      const { min, max } = memoryRanges[tabIndex - 1]
      range = calculateMemoryRange(min, max || 'ffffffff')
    }

    const dMemData = createRangeDmemData(data || [], range.startHex, range.endHex)
    setDisplayedData(dMemData)
  }, [start, data, memoryMap?.savedPoints, tabIndex])

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

  return (
    <div className="flex flex-col items-center">
      <Tabs
        value={tabIndex}
        onChange={(_, value) => setTabIndex(value)}
        aria-label="Memory Table Tabs"
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        className="max-sm:w-screen"
      >
        <Tab label="ALL" />
        <Tab label="LED" />
        <Tab label="IO" />
        <Tab label="IMEM" />
        <Tab label="DMEM" />
        <Tab label="STACK" />
      </Tabs>
      <div className="mb-3 mt-1 flex justify-center gap-2 max-sm:flex-col">
        <div className="flex gap-2">
          <p className="flex items-center font-bold">{MEMORY_SECTION[tabIndex].name}</p>
          <InputAddress placeholder="0x00000000" value={input} onChange={handleChangeInput} />
        </div>
        <div className="flex gap-2">
          <Tooltip title="Move to the segment containing the address">
            <Button
              sx={{ gap: '0.25rem' }}
              variant="contained"
              onClick={handleButtonClick}
              disabled={!!modifiedName}
            >
              {/* <SearchIcon /> */}
              Go
            </Button>
          </Tooltip>
          {/* Button to reset memory table */}
          <Tooltip title="Reset memory table to zero data">
            <Button
              variant="contained"
              color="error"
              onClick={onResetData}
              disabled={!!modifiedName}
              className="text-nowrap"
            >
              Init Zero
            </Button>
          </Tooltip>
          {tabIndex === 0 && (
            <FunctionButton
              onImportClick={onImportClick}
              onExportClick={onExportClick}
              disabled={disabled}
            />
          )}
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table sx={styles.table} stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="center" className="max-w-1 font-bold">
                Memory Address
              </TableCell>
              {/* <TableCell align="center">Dec</TableCell> */}
              <TableCell align="center" className="max-w-2 font-bold">
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
                            className="ml-auto h-fit w-fit min-w-0 bg-white px-2"
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
                            className="ml-auto h-fit w-fit min-w-0 bg-white px-2"
                            variant="outlined"
                            color="warning"
                            onClick={() => handleEditClick(value.name, value.value)}
                            disabled={disabled}
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
    </div>
  )
}
