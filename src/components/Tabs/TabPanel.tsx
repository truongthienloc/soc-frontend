import React from 'react'
import useTab from './useTab'
import { cn } from '~/helpers/cn'

type Props = {
  index: number
  children?: React.ReactNode
  className?: string
}

export default function TabPanel({ children, index, className }: Props) {
  const { index: tabIndex } = useTab()
  return <div className={cn(className, { hidden: tabIndex !== index })}>{children}</div>
}
