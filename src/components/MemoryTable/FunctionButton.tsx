import React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MoreVertIcon from '@mui/icons-material/MoreVert'

type Props = {
  onImportClick?: () => void
  onExportClick?: () => void
  disabled?: boolean
}

export default function FunctionButton({ onImportClick, onExportClick, disabled = true }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = !!anchorEl
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleImportClick = () => {
    onImportClick?.()
    handleClose()
  }

  const handleExportClick = () => {
    onExportClick?.()
    handleClose()
  }

  return (
    <>
      <Button className="w-fit text-black" onClick={handleClick}>
        <MoreVertIcon />
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleImportClick} disabled={disabled}>
          Import
        </MenuItem>
        <MenuItem onClick={handleExportClick} disabled={disabled}>
          Export
        </MenuItem>
      </Menu>
    </>
  )
}
