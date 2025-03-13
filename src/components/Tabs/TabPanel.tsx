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
  if (index !== tabIndex) {
    return null
  } else {
    return <div className={cn(className)}>{children}</div>
  }
  // return <div className={cn(className, { hidden: tabIndex !== index })}>{children}</div>
}
