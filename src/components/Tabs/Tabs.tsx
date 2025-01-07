import React from 'react'
import MUITabs from '@mui/material/Tabs'
import useTab from './useTab'

type MUITabsProps = Parameters<typeof MUITabs>[0]
type Props = MUITabsProps & {
  children?: React.ReactNode
}

export default function Tabs({ children, ...props }: Props) {
  const { index, changeIndex } = useTab()

  return (
    <MUITabs {...props} value={index} onChange={(_, value) => changeIndex(value)}>
      {children}
    </MUITabs>
  )
}
