import { useEffect, useRef } from 'react'
import { DefaultDatapath, Scene } from '~/services/lib/datapath'
import { Register } from '~/types/register'

interface DatapathProps {
  data?: Register[]
  step?: string
}

function Datapath({ data, step }: DatapathProps) {
  const datapathRef = useRef<DefaultDatapath>()
  const isStart = useRef<boolean>(false)

  const createDatapath = () => {
    const datapathDiv = document.querySelector('#datapath') as HTMLDivElement
    datapathRef.current = new DefaultDatapath('datapath', 81, 54)
  }

  useEffect(() => {
    if (isStart.current) {
      return
    }
    isStart.current = true
    createDatapath()
  }, [])

  useEffect(() => {
    if (!datapathRef.current) {
      return
    }

    if (!data || data.length === 0) {
      datapathRef.current.resetState()
      return
    }

    console.log('data: ', data)

    datapathRef.current.resetState()
    datapathRef.current.loadInstruction(data)
  }, [data])

  return (
    <div
      className="flex h-full w-full max-w-[800px] flex-col overflow-y-auto text-lg"
      id="datapath"
    ></div>
  )
}

export default Datapath
