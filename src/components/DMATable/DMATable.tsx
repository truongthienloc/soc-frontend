'use client'

import TextField from '@mui/material/TextField'
import type { SxProps, Theme } from '@mui/material/styles'
import { useState } from 'react'
import { Register } from '~/types/register'
import { ReturnUseDMAConfig } from './useDMAConfig'

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
          disabled
        />
        <TextField
          label="DES"
          autoComplete="off"
          value={configs?.des}
          onChange={(e) => configs?.setDes(e.target.value)}
          InputProps={{
            startAdornment: '0x',
          }}
          disabled
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
            disabled
          />
          {/* <div className="absolute right-1 flex flex-col gap-1 p-1">
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
          </div> */}
        </div>
        <TextField
          label="CONTROL"
          autoComplete="off"
          value={configs?.control}
          InputProps={{
            startAdornment: '0x',
          }}
          disabled
        />
        <TextField
          label="STATUS"
          autoComplete="off"
          value={configs?.status}
          InputProps={{
            startAdornment: '0x',
          }}
          disabled
        />
      </div>
    </div>
  )
}
