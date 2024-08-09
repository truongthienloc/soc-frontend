import React, { useContext } from 'react'
import { tabContext } from './TabContext'

export default function useTab() {
    return useContext(tabContext)
}
