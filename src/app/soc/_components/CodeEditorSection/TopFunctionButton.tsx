import React from 'react'
import Button from '@mui/material/Button'
import CloseIcon from '@mui/icons-material/Close'
import { cn } from '~/helpers/cn'

type Props = {
  className?: string
  onImportClick?: () => void
  onExportClick?: () => void
  onClose?: () => void
}

export default function TopFunctionButton({
  className,
  onImportClick,
  onExportClick,
  onClose,
}: Props) {
  return (
    <div className={cn('mb-4 flex flex-row items-center justify-between gap-2 py-1', className)}>
      <div className="flex items-center gap-2">
        {/* <h2 className="text-xl font-bold">Code Editor:</h2> */}
        <Button className="" variant="outlined" color="secondary" onClick={onImportClick}>
          Import
        </Button>
        <Button className="" variant="outlined" color="secondary" onClick={onExportClick}>
          Export
        </Button>
      </div>
      <Button onClick={onClose}>
        <CloseIcon />
      </Button>
    </div>
  )
}
