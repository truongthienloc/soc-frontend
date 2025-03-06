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
import { ReturnUseDMAConfig } from './useDMAConfig'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

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
  configs?: ReturnUseDMAConfig
}

export default function DMATable({ data, configs }: Props) {
  const [input, setInput] = useState('0x00000000')
  const [start, setStart] = useState(input)
  const [displayedData, setDisplayedData] = useState()

  /** Add hex and dec. Output is hex */
  function add(a: string, b: number) {
    const dec = parseInt(a, 16) + b
    if (dec < 0) return a
    if (dec > 16) return a
    return dec.toString(16).toUpperCase()
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex flex-col gap-4">
        <h2 className="font-bold">DMA Config-Registers</h2>
        <TextField
          label="SRC"
          autoComplete="off"
          value={configs?.src}
          onChange={(e) => configs?.setSrc(e.target.value)}
          InputProps={{
            startAdornment: '0x',
          }}
        />
        <TextField
          label="DES"
          autoComplete="off"
          value={configs?.des}
          onChange={(e) => configs?.setDes(e.target.value)}
          InputProps={{
            startAdornment: '0x',
          }}
        />
        <div className="relative flex flex-col">
          <TextField
            label="LEN"
            autoComplete="off"
            value={configs?.len}
            onChange={(e) => configs?.setLen(e.target.value)}
            InputProps={{
              startAdornment: '0x',
              readOnly: true,
            }}
          />
          <div className="absolute right-1 flex flex-col gap-1 p-1">
            <button
              className="flex h-[22px] w-[22px] justify-center rounded bg-gray-50 shadow transition-colors hover:bg-gray-200"
              onClick={() => configs?.setLen(add(configs?.len, 1))}
            >
              <ArrowDropUpIcon />
            </button>
            <button
              className="flex h-[22px] w-[22px] justify-center rounded bg-gray-50 shadow transition-colors hover:bg-gray-200"
              onClick={() => configs?.setLen(add(configs?.len, -1))}
            >
              <ArrowDropDownIcon />
            </button>
          </div>
        </div>
      </div>
      <div className="h-[calc(100vh-60px)] overflow-auto">
        <h2 className="font-bold">DMA Buffer</h2>
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
              {data &&
                data.map((value) => (
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
