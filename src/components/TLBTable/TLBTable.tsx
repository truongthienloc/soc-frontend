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
}

export default function TLBTable({ tlb }: Props) {
  const { tlbData, pointer, setTLBEntry, setPointer } = tlb
  const [editingTLB, setEditingTLB] = useState<TLBEntry | null>(null)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)

  const handleSave = () => {
    if (editingIndex !== null) {
      setTLBEntry(editingIndex, editingTLB!)
      setEditingIndex(null)
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <TableContainer component={Paper}>
        <Table sx={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell align="center">Page Number</TableCell>
              <TableCell align="center">Physical Address</TableCell>
              <TableCell align="center">Valid</TableCell>
              <TableCell align="center">Shamtime</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tlbData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Input
                    className="px-2"
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
                    startAdornment="0x"
                    disabled={editingIndex !== index}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    className="w-10 px-1 text-center"
                    value={editingIndex === index ? editingTLB?.valid : row.valid}
                    onChange={(e) =>
                      setEditingTLB({
                        ...editingTLB!,
                        valid: e.target.value,
                      })
                    }
                    startAdornment="0x"
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
                    startAdornment="0x"
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

      <div className="flex flex-row items-center gap-1">
        <TextField
          value={pointer}
          onChange={(e) => setPointer(e.target.value)}
          label="Page Number Pointer"
          InputProps={{
            startAdornment: '0x',
          }}
        />
        <Button variant="contained" className="h-fit w-fit min-w-0 px-2" onClick={handleSave}>
          <RestartAltIcon />
        </Button>
      </div>
    </div>
  )
}
