'use client'

import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import type { SxProps, Theme } from '@mui/material/styles'
import React, { useState } from 'react'
import { createRangeDmemData } from '~/helpers/generates/dMemRange.generate'
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

export default function DMATable({ data }: Props) {
  const [input, setInput] = useState('0x00000000')
  const [start, setStart] = useState(input)
  const [displayedData, setDisplayedData] = useState(createRangeDmemData(data || [], start))
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex flex-col gap-4">
        <TextField label="SRC" autoComplete="off" />
        <TextField label="DES" autoComplete="off" />
        <TextField label="LEN" autoComplete="off" />
      </div>
      <div className="">
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
                    <TableCell className="max-w-2">{value.value}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}
