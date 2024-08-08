import React from 'react'
import MUITabs from '@mui/material/Tabs'
import useTab from './useTab'

type Props = {
  children?: React.ReactNode
}

export default function Tabs({ children }: Props) {
  const { index, changeIndex } = useTab()

  return (
    <MUITabs value={index} onChange={(_, value) => changeIndex(value)}>
      {children}
    </MUITabs>
  )
}
