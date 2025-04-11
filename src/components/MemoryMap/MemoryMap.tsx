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
    instructionPoint,
    pageTablePoint,
    dataPoint,
    peripheralPoint,
    isModified,
    setInstructionPoint,
    setPageTablePoint,
    setDataPoint,
    setPeripheralPoint,
    reset,
    save,
  } = memoryMap

  const onChangeLmPoint = (value: string) => {
    setInstructionPoint(value)
  }

  const onChangeIOPoint = (value: string) => {
    setPageTablePoint(value)
  }

  const onChangeIMemPoint = (value: string) => {
    setDataPoint(value)
  }

  const onChangeDMemPoint = (value: string) => {
    setPeripheralPoint(value)
  }

  const onResetDefault = () => {
    reset()
  }

  const handleSave = () => {
    save()
    toast.success('Save memory point successfully')
  }

  return (
    <div className={cn('grid grid-cols-2 gap-2', className)}>
      {/* <TextField
        label="LED_base_address"
        value={instructionPoint}
        onChange={(e) => onChangeLmPoint(e.target.value)}
        InputProps={{
          startAdornment: <InputAdornment position="start">0x</InputAdornment>,
        }}
        disabled={disabled}
      /> */}
      <TextField
        label="Memory Requirement"
        // label="I/O_base_address"
        value={pageTablePoint}
        onChange={(e) => onChangeIOPoint(e.target.value)}
        InputProps={{
          startAdornment: <InputAdornment position="start">0x</InputAdornment>,
        }}
        disabled={disabled}
      />
      {/* <TextField
        label="I-Mem_base_address"
        value={dataPoint}
        onChange={(e) => onChangeIMemPoint(e.target.value)}
        InputProps={{
          startAdornment: <InputAdornment position="start">0x</InputAdornment>,
        }}
        disabled={disabled}
      />
      <TextField
        label="D-Mem_base_address"
        value={peripheralPoint}
        onChange={(e) => onChangeDMemPoint(e.target.value)}
        InputProps={{
          startAdornment: <InputAdornment position="start">0x</InputAdornment>,
        }}
        disabled={disabled}
      />
      <TextField
        label="Stack_base_address"
        value={stackPoint}
        onChange={(e) => onChangeStackPoint(e.target.value)}
        InputProps={{
          startAdornment: <InputAdornment position="start">0x</InputAdornment>,
        }}
        disabled={disabled}
      /> */}
      <div className="flex justify-center gap-2">
        <Button
          className="h-fit w-fit px-3 py-2"
          variant="contained"
          color="primary"
          disabled={disabled || !isModified}
          onClick={handleSave}
        >
          Save
        </Button>
        <Button
          className="h-fit w-fit px-3 py-2"
          variant="contained"
          color="error"
          disabled={disabled}
          onClick={onResetDefault}
        >
          Reset
        </Button>
      </div>
    </div>
  )
}
