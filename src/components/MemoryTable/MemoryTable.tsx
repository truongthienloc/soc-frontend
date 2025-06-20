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
import { useEffect, useState, Fragment } from 'react'
import { MEMORY_SECTION } from '~/configs/memoryPoint.constant'
import { createRangeDmemData, LENGTH_OF_DMEM } from '~/helpers/generates/dMemRange.generate'
import { MemoryMapHookReturn } from '~/hooks/memory/useMemoryMap'
import { Register } from '~/types/register'
import FunctionButton from './FunctionButton'
import { generateMultipleDmemRange } from '~/helpers/generates/multiple-dmem-range.generate'

const styles: { [key: string]: SxProps<Theme> } = {
  table: {
    // minWidth: 350,
    // maxWidth: 650,
    '& .MuiTableCell-root': {
      height: '2.5rem',
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
  const [displayedData, setDisplayedData] = useState(generateMultipleDmemRange(data || [], start))
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
        { min: memoryMap.instructionPoint, max: memoryMap.pageTablePoint },
        { min: memoryMap.pageTablePoint, max: memoryMap.dataPoint },
        { min: memoryMap.dataPoint, max: memoryMap.peripheralPoint },
        { min: memoryMap.peripheralPoint, max: undefined },
      ]

      const { min, max } = memoryRanges[tabIndex - 1]
      range = calculateMemoryRange(min, max || 'ffffffff')
    }

    const dMemData = generateMultipleDmemRange(data || [], range.startHex, range.endHex)
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
        {/* <Tab label="INS" />
        <Tab label="PAGE" />
        <Tab label="DATA" />
        <Tab label="PERI" /> */}
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
      <div className="grid w-full grid-cols-1 gap-x-2">
        <TableContainer component={Paper}>
          <Table sx={styles.table} stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell align="center" className="font-bold">
                  Memory Address
                </TableCell>
                <TableCell align="center" className="font-bold">
                  Value
                </TableCell>
                <TableCell align="center" className="font-bold">
                  Memory Address
                </TableCell>
                <TableCell align="center" className="font-bold">
                  Value
                </TableCell>
                <TableCell align="center" className="font-bold">
                  Memory Address
                </TableCell>
                <TableCell align="center" className="font-bold">
                  Value
                </TableCell>
                <TableCell align="center" className="font-bold">
                  Memory Address
                </TableCell>
                <TableCell align="center" className="font-bold">
                  Value
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(() => {
                // Flatten all data into a single array
                const allData = displayedData.flatMap((tableData) => tableData.data)

                // Group data into chunks of 4 items (for 4 columns)
                const rows = []
                for (let i = 0; i < allData.length; i += 4) {
                  const rowData = allData.slice(i, i + 4)
                  rows.push(
                    <TableRow key={`row-${i}`}>
                      {rowData.map((value) => (
                        <Fragment key={value.name}>
                          <TableCell
                            sx={value.value !== '0x00000000' ? { backgroundColor: '#fff177' } : {}}
                          >
                            {value.name}
                          </TableCell>
                          <TableCell
                            sx={value.value !== '0x00000000' ? { backgroundColor: '#fff177' } : {}}
                          >
                            <div className="flex items-center">
                              <span className="py-2">{value.value}</span>
                            </div>
                          </TableCell>
                        </Fragment>
                      ))}
                      {/* Add empty cells if the row is not complete */}
                      {Array.from({ length: 4 - rowData.length }).map((_, idx) => (
                        <Fragment key={`empty-${i}-${idx}`}>
                          <TableCell />
                          <TableCell />
                        </Fragment>
                      ))}
                    </TableRow>,
                  )
                }
                return rows
              })()}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}
