import { SxProps, Theme } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import clsx from 'clsx'
import { useMemo } from 'react'
import { cn } from '~/helpers/cn'
import { convertRegisters2TwinRegisters } from '~/helpers/converts/register.convert'
import { Register, TwinRegister } from '~/types/register'

const styles: { [key: string]: SxProps<Theme> } = {
  table: {
    minWidth: 650,
    maxWidth: 1000,
    '& .MuiTableCell-root': {
      height: '2.125rem',
      padding: '0.15rem',
      border: '1px solid black',
      // width: '50px',
    },
  },
}

type Props = {
  isShown: boolean
  data: Register[]
}

function compareTwinRegister(prev: TwinRegister | null, data: TwinRegister): boolean[] {
  const res = []
  if (!prev) {
    const num1 = parseInt(data.register1.value, 16)
    const num2 = parseInt(data.register2.value, 16)

    res.push(num1 !== 0)
    res.push(num2 !== 0)
    return res
  }

  res.push(prev.register1.value !== data.register1.value)
  res.push(prev.register2.value !== data.register2.value)
  return res
}

export default function RegisterTable({ data, isShown }: Props) {
  const twinData = useMemo(() => {
    return convertRegisters2TwinRegisters(data)
  }, [data])

  return (
    <TableContainer component={Paper} className={cn({ hidden: !isShown })}>
      <Table stickyHeader sx={styles.table}>
        <TableHead>
          <TableRow>
            <TableCell align="left">Register</TableCell>
            <TableCell align="center">Value</TableCell>
            <TableCell align="left">Register</TableCell>
            <TableCell align="center">Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {twinData &&
            twinData.length > 0 &&
            twinData.map((value, index) => {
              const compare = compareTwinRegister(null, value)
              return (
                <TableRow key={value.register1.name}>
                  <TableCell
                    className={clsx('h-min', { 'bg-highlight': compare[0] })}
                    sx={{ paddingY: '0.25rem' }}
                  >
                    {value.register1.name}
                  </TableCell>
                  <TableCell
                    className={clsx('h-min', { 'bg-highlight': compare[0] })}
                    align="center"
                    sx={{ paddingY: '0.25rem' }}
                  >
                    {value.register1.value}
                  </TableCell>
                  <TableCell
                    className={clsx('h-min', { 'bg-highlight': compare[1] })}
                    sx={{ paddingY: '0.25rem' }}
                  >
                    {value.register2.name}
                  </TableCell>
                  <TableCell
                    className={clsx('h-min', { 'bg-highlight': compare[1] })}
                    align="center"
                    sx={{ paddingY: '0.25rem' }}
                  >
                    {value.register2.value}
                  </TableCell>
                </TableRow>
              )
            })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
