import React from 'react'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'
import { cn } from '~/helpers/cn'
import { MemoryMapHookReturn } from '~/hooks/memory/useMemoryMap'
import { toast } from 'react-toastify'

type Props = {
  className?: string
  memoryMap: MemoryMapHookReturn
  disabled?: boolean
}

export default function MemoryMap({ className, memoryMap, disabled = false }: Props) {
  const {
    lmPoint,
    ioPoint,
    iMemPoint,
    dMemPoint,
    stackPoint,
    isModified,
    setLmPoint,
    setIOPoint,
    setIMemPoint,
    setDMemPoint,
    setStackPoint,
    reset,
    save,
  } = memoryMap

  const onChangeLmPoint = (value: string) => {
    setLmPoint(value)
  }

  const onChangeIOPoint = (value: string) => {
    setIOPoint(value)
  }

  const onChangeIMemPoint = (value: string) => {
    setIMemPoint(value)
  }

  const onChangeDMemPoint = (value: string) => {
    setDMemPoint(value)
  }

  const onChangeStackPoint = (value: string) => {
    setStackPoint(value)
  }

  const onResetDefault = () => {
    reset()
  }

  const handleSave = () => {
    save()
    toast.success('Save memory point successfully')
  }

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
      <div className="grid grid-cols-2 gap-2">
        <Button
          variant="contained"
          color="primary"
          disabled={disabled || !isModified}
          onClick={handleSave}
        >
          Save
        </Button>
        <Button variant="contained" color="error" disabled={disabled} onClick={onResetDefault}>
          Reset
        </Button>
      </div>
    </div>
  )
}
