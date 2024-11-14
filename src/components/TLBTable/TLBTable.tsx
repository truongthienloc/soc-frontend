import EditIcon from '@mui/icons-material/Edit'
import SaveIcon from '@mui/icons-material/Save'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import Button from '@mui/material/Button'
import Input from '@mui/material/Input'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TextField from '@mui/material/TextField'
import type { SxProps, Theme } from '@mui/material/styles'
import { useState } from 'react'
import { TLBEntry, UseTLBReturn } from '~/hooks/tlb/useTLB'
import { toast } from 'react-toastify'
import { cn } from '~/helpers/cn'

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

type Props = {
  tlb: UseTLBReturn
  disabled?: boolean
}

export default function TLBTable({ tlb, disabled = false }: Props) {
  const { tlbData, pointer, setTLBEntry, setPointer, length, setLength } = tlb
  const [editingLength, setEditingLength] = useState(length.toString())
  const [editingTLB, setEditingTLB] = useState<TLBEntry | null>(null)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editingPointer, setEditingPointer] = useState<string | null>(null)

  const handleSave = () => {
    if (editingIndex !== null) {
      setTLBEntry(editingIndex, editingTLB!)
      setEditingIndex(null)
    }
  }

  const handleReset = () => {}

  const handleLengthSave = () => {
    if (isNaN(parseInt(editingLength))) {
      toast.warn("'Number of TLB row' must be a number")
      return
    }
    setLength(parseInt(editingLength))
    setEditingIndex(null)
  }

  const handlePointerSave = () => {
    setPointer(editingPointer!)
    setEditingPointer(null)
  }

  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-xl font-bold">TLB:</h2>
      <div className="flex w-[263px] flex-row items-center gap-1">
        <TextField
          value={editingPointer ? editingPointer : pointer}
          onChange={(e) => setEditingPointer(e.target.value)}
          label="Page Number Pointer"
          InputProps={{
            startAdornment: '0x',
          }}
          disabled={!editingPointer}
        />
        {editingPointer ? (
          <Button
            variant="contained"
            className="h-fit w-fit min-w-0 px-2"
            onClick={handlePointerSave}
          >
            <SaveIcon />
          </Button>
        ) : (
          <Button
            variant="contained"
            className="h-fit w-fit min-w-0 px-2"
            onClick={() => setEditingPointer(pointer)}
            disabled={disabled}
          >
            <EditIcon />
          </Button>
        )}
        {/* <Button variant="contained" className="h-fit w-fit min-w-0 px-2" onClick={handleReset}>
          <RestartAltIcon />
        </Button> */}
      </div>
      <div className="flex w-[263px] flex-row items-center gap-1">
        <TextField
          value={editingLength}
          onChange={(e) => setEditingLength(e.target.value)}
          label="Number of TLB entries"
          disabled={editingIndex !== -1}
        />
        {editingIndex !== -1 ? (
          <Button
            variant="contained"
            className="h-fit w-fit min-w-0 px-2"
            onClick={() => setEditingIndex(-1)}
            disabled={disabled}
          >
            <EditIcon />
          </Button>
        ) : (
          <Button
            variant="contained"
            className="h-fit w-fit min-w-0 px-2"
            onClick={handleLengthSave}
          >
            <SaveIcon />
          </Button>
        )}
      </div>

      <TableContainer component={Paper}>
        <Table sx={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell align="center">VPN</TableCell>
              <TableCell align="center">PPN</TableCell>
              <TableCell align="center">Valid</TableCell>
              <TableCell align="center">Timestamp</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tlbData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Input
                    className={cn('px-2', {})}
                    value={editingIndex === index ? editingTLB?.pageNumber : row.pageNumber}
                    onChange={(e) =>
                      setEditingTLB({
                        ...editingTLB!,
                        pageNumber: e.target.value,
                      })
                    }
                    startAdornment="0x"
                    disabled={editingIndex !== index}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={
                      editingIndex === index ? editingTLB?.physicalAddress : row.physicalAddress
                    }
                    onChange={(e) =>
                      setEditingTLB({
                        ...editingTLB!,
                        physicalAddress: e.target.value,
                      })
                    }
                    className={cn({})}
                    startAdornment="0x"
                    disabled={editingIndex !== index}
                  />
                </TableCell>
                <TableCell className="text-center">
                  <Input
                    className={cn('w-10 px-1 [&>input]:inline-block [&>input]:text-center', {})}
                    value={editingIndex === index ? editingTLB?.valid : row.valid}
                    onChange={(e) =>
                      setEditingTLB({
                        ...editingTLB!,
                        valid: e.target.value,
                      })
                    }
                    disabled={editingIndex !== index}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={editingIndex === index ? editingTLB?.timestamp : row.timestamp}
                    onChange={(e) =>
                      setEditingTLB({
                        ...editingTLB!,
                        timestamp: e.target.value,
                      })
                    }
                    className={cn({})}
                    disabled={editingIndex !== index}
                  />
                </TableCell>
                <TableCell align="right">
                  {editingIndex !== index ? (
                    <Button
                      variant="outlined"
                      className="h-fit w-fit min-w-0 px-2"
                      onClick={() => {
                        setEditingTLB({ ...row })
                        setEditingIndex(index)
                      }}
                      disabled={disabled}
                    >
                      <EditIcon />
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      className="h-fit w-fit min-w-0 px-2"
                      onClick={handleSave}
                    >
                      <SaveIcon />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
