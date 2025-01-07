import { useEffect, useRef } from 'react'
import { IData } from '~/interfaces/data'
import { PipelineDatapath } from '~/services/lib/datapath'

interface PipelineProps {
  data?: IData[] | null
  step?: string
}

function Pipeline({ data, step }: PipelineProps) {
  const datapathRef = useRef<PipelineDatapath>()
  const isStart = useRef<boolean>(false)

  const createDatapath = () => {
    const datapathDiv = document.querySelector('#datapath') as HTMLDivElement
    datapathRef.current = new PipelineDatapath('datapath')
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

  return <div className="flex h-full w-full flex-col overflow-y-auto text-lg" id="datapath"></div>
}

export default Pipeline
