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

type Props = {}

export default function PageTable({}: Props) {
  //   const { tlbData, pointer, setTLBEntry, setPointer, length, setLength } = tlb
  //   const [editingLength, setEditingLength] = useState(length.toString())
  //   const [editingTLB, setEditingTLB] = useState<TLBEntry | null>(null)
  //   const [editingIndex, setEditingIndex] = useState<number | null>(null)
  //   const [editingPointer, setEditingPointer] = useState<string | null>(null)

  //   const handleSave = () => {
  //     if (editingIndex !== null) {
  //       setTLBEntry(editingIndex, editingTLB!)
  //       setEditingIndex(null)
  //     }
  //   }

  //   const handleReset = () => {}

  //   const handleLengthSave = () => {
  //     if (isNaN(parseInt(editingLength))) {
  //       toast.warn("'Number of TLB row' must be a number")
  //       return
  //     }
  //     setLength(parseInt(editingLength))
  //     setEditingIndex(null)
  //   }

  //   const handlePointerSave = () => {
  //     setPointer(editingPointer!)
  //     setEditingPointer(null)
  //   }

  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-xl font-bold">Page Table:</h2>
      {/* <div className="flex flex-row items-center gap-1">
        <TextField
          value={editingLength}
          onChange={(e) => setEditingLength(e.target.value)}
          label="Number of TLB row"
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
      </div> */}

      <TableContainer component={Paper}>
        <Table sx={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell align="center">Address</TableCell>
              <TableCell align="center">Page Number</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="[&>tr>td]:text-gray-500/80">
            <TableRow>
              <TableCell align="center">0x0000</TableCell>
              <TableCell align="center">0x0000</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">0x0000</TableCell>
              <TableCell align="center">0x0000</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">0x0000</TableCell>
              <TableCell align="center">0x0000</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">0x0000</TableCell>
              <TableCell align="center">0x0000</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">0x0000</TableCell>
              <TableCell align="center">0x0000</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">0x0000</TableCell>
              <TableCell align="center">0x0000</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">0x0000</TableCell>
              <TableCell align="center">0x0000</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">0x0000</TableCell>
              <TableCell align="center">0x0000</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">0x0000</TableCell>
              <TableCell align="center">0x0000</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">0x0000</TableCell>
              <TableCell align="center">0x0000</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">0x0000</TableCell>
              <TableCell align="center">0x0000</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">0x0000</TableCell>
              <TableCell align="center">0x0000</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">0x0000</TableCell>
              <TableCell align="center">0x0000</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">0x0000</TableCell>
              <TableCell align="center">0x0000</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">0x0000</TableCell>
              <TableCell align="center">0x0000</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">0x0000</TableCell>
              <TableCell align="center">0x0000</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
