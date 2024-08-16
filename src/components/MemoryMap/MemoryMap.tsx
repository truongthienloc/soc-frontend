import React from 'react'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'
import { cn } from '~/helpers/cn'

type Props = {
  className?: string
  lmPoint: string
  onChangeLmPoint: (value: string) => void
  ioPoint: string
  onChangeIOPoint: (value: string) => void
  iMemPoint: string
  onChangeIMemPoint: (value: string) => void
  dMemPoint: string
  onChangeDMemPoint: (value: string) => void
  stackPoint: string
  onChangeStackPoint: (value: string) => void
  onResetDefault: () => void
  disabled?: boolean
}

export default function MemoryMap({
  className,
  lmPoint,
  onChangeLmPoint,
  ioPoint,
  onChangeIOPoint,
  iMemPoint,
  onChangeIMemPoint,
  dMemPoint,
  onChangeDMemPoint,
  stackPoint,
  onChangeStackPoint,
  onResetDefault,
  disabled = false,
}: Props) {
  return (
    <div className={cn('grid grid-cols-[auto_auto] gap-2', className)}>
      <TextField
        label="LM_point"
        value={lmPoint}
        onChange={(e) => onChangeLmPoint(e.target.value)}
        InputProps={{
          startAdornment: <InputAdornment position="start">0x</InputAdornment>,
        }}
        disabled={disabled}
      />
      <TextField
        label="IO_point"
        value={ioPoint}
        onChange={(e) => onChangeIOPoint(e.target.value)}
        InputProps={{
          startAdornment: <InputAdornment position="start">0x</InputAdornment>,
        }}
        disabled={disabled}
      />
      <TextField
        label="Imem_point"
        value={iMemPoint}
        onChange={(e) => onChangeIMemPoint(e.target.value)}
        InputProps={{
          startAdornment: <InputAdornment position="start">0x</InputAdornment>,
        }}
        disabled={disabled}
      />
      <TextField
        label="Dmem_point"
        value={dMemPoint}
        onChange={(e) => onChangeDMemPoint(e.target.value)}
        InputProps={{
          startAdornment: <InputAdornment position="start">0x</InputAdornment>,
        }}
        disabled={disabled}
      />
      <TextField
        label="Stack_point"
        value={stackPoint}
        onChange={(e) => onChangeStackPoint(e.target.value)}
        InputProps={{
          startAdornment: <InputAdornment position="start">0x</InputAdornment>,
        }}
        disabled={disabled}
      />
      <Button variant="contained" color="error" disabled={disabled} onClick={onResetDefault}>
        Reset Default
      </Button>
    </div>
  )
}
