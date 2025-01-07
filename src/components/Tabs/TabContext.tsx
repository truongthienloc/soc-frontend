import React, { createContext, useCallback, useState } from 'react'

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
  index?: number
  setIndex?: (index: number) => void
}

export default function TabProvider({ children, index, setIndex }: Props) {
  const [_index, _setIndex] = useState(0)

  const changeIndex = useCallback((index: number) => {
    _setIndex(index)
    setIndex?.(index)
  }, [])

  return (
    <tabContext.Provider value={{ index: index ?? _index, changeIndex }}>
      {children}
    </tabContext.Provider>
  )
}
