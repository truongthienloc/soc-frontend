import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import type { SxProps, Theme } from '@mui/material/styles'
import { Register } from '~/types/register'

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
  data?: Register[]
}

export default function PageTable({ data = [] }: Props) {
  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-xl font-bold">Page Table:</h2>
      <TableContainer component={Paper}>
        <Table sx={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell align="center">Address</TableCell>
              <TableCell align="center">Page Number</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="[&>tr>td]:text-gray-500/80">
            {data.map((value) => (
              <TableRow key={value.name}>
                <TableCell align="center">{value.name}</TableCell>
                <TableCell align="center">{value.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
