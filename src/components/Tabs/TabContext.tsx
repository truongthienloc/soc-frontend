import React, { createContext, useState } from 'react'

type TabContextProps = {
  index: number
  changeIndex: (index: number) => void
}

export const tabContext = createContext<TabContextProps>({
  index: 0,
  changeIndex() {},
})

type Props = {
  children?: React.ReactNode
}

export default function TabProvider({ children }: Props) {
  const [index, setIndex] = useState(0)

  const changeIndex = (index: number) => {
    setIndex(index)
  }

  return <tabContext.Provider value={{ index, changeIndex }}>{children}</tabContext.Provider>
}
