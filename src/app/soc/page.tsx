'use client'

import React, { useEffect, useRef, useState } from 'react'
import { hexToBinary } from '~/helpers/converts/Hextobin'
/** import MUI */
import Button from '@mui/material/Button'
import { cn } from '~/helpers/cn'
import Logs from '~/services/lib/Logs/Logs'
// import { Agent, NCKHBoard } from '~/services/lib/soc'
import '~/styles/soc.scss'
// import RiscVProcessor from '~/services/lib/SOCModels/RiscV_processor'
// import RegisterTable from '~/components/RegisterTable/RegisterTable'
// import { Registers, TwinRegister } from '~/types/register'
// import { convertRegisters2TwinRegisters } from '~/helpers/converts/register.convert'
import { CodeEditor } from '~/components/CodeEditor'
import Soc from '~/services/lib/SOCModels/SoC'
// import { GuideModal } from '~/components/GuideModal'
import { toast } from 'react-toastify'
import { DisplayStepCode } from '~/components/DisplayStepCode'
import { Keyboard } from '~/components/Keyboard'
import { LedMatrix } from '~/components/LedMatrix'
import { isValidHexString } from '~/helpers/validates/hex.validate'
import { SimulatorType } from '~/types/simulator'
import Link from 'next/link'
import { MemoryMap } from '~/components/MemoryMap'
import { TabContext, Tabs, Tab, TabPanel } from '~/components/Tabs'
import { MemoryTable } from '~/components/MemoryTable'
import { Register } from '~/types/register'

import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

type Props = {}

const LMPOINT = '0'
const IOPOINT = '180'
const IMEMPOINT = '1C0'
const DMEMPOINT = '11C0'
const STACMEMPOINT = '2DC0'

export default function SocPage({}: Props) {
  const isStart = useRef(true)
  const socModelRef = useRef<Soc>()
  const logRef = useRef<Logs>()
  const [showSimulatorType, setShowSimulatorType] = useState<SimulatorType>('SOC')
  const [disableCodeEditor, setDisableCodeEditor] = useState(false)
  // const [registersData, setRegistersData] = useState<TwinRegister[]>([])
  const [code, setCode] = useState('')
  const [allowRun, setAllowRun] = useState(false)

  const [stepCode, setStepCode] = useState<string[]>([])
  const [isStepping, setIsStepping] = useState(false)
  const [pc, setPc] = useState<number | undefined>(undefined)

  const [controlTabIndex, setControlTabIndex] = useState(0)

  /** Memory Map state */
  const [lmPoint, setLmPoint] = useState(LMPOINT)
  const [ioPoint, setIOPoint] = useState(IOPOINT)
  const [iMemPoint, setIMemPoint] = useState(IMEMPOINT)
  const [dMemPoint, setDMemPoint] = useState(DMEMPOINT)
  const [stackPoint, setStackPoint] = useState(STACMEMPOINT)
  /** Memory Data */
  const [memoryData, setMemoryData] = useState<Register[]>([])

  useEffect(() => {
    const socCode = localStorage.getItem('soc_code') ?? ''
    setCode(socCode)

    if (isStart.current) {

      isStart.current = false
      // setTimeout(() => setShowCodeEditor(false), 1000)

      async function firstLoad() {
        const { Agent, NCKHBoard } = await import('~/services/lib/soc')
        const Keyboard = (await import('~/services/lib/control/Keyboard')).default
        const Monitor = (await import('~/services/lib/control/Monitor')).default
        const LedMatrix = (await import('~/services/lib/control/LedMatrix')).default

        const soc = new NCKHBoard('simulation')
        const monitor = new Monitor('#monitor', soc.monitorModule)
        const keyboard = new Keyboard('#keyboard', soc.keyboardModule, monitor)
        const ledMatrix = new LedMatrix('.led-matrix')
        const logs = new Logs('#logs')

        const handleCPUClick = () => {
          setShowSimulatorType('CODE_EDITOR')
        }
        const handleMemoryClick = () => {
          setShowSimulatorType('MEMORY')
        }

        const cpu = soc.cpu
        const memory = soc.memory
        cpu.getEvent().on(Agent.Event.CLICK, handleCPUClick)
        memory.getEvent().on(Agent.Event.CLICK, handleMemoryClick)

        const socModel = new Soc('abc')
        socModel.event.on(Soc.SOCEVENT.DONE_ALL, () => {console.log ('OK')})
        socModelRef.current = socModel
        logRef.current = logs
        socModel.setLogger(logs)
        socModel.setView(soc)
        socModel.setKeyboard(keyboard)
        socModel.setMonitor(monitor)
        socModel.setLedMatrix(ledMatrix)
      }

      firstLoad()

      return () => {
        // cpu.getEvent().off(Agent.Event.CLICK, handleCPUClick)
        // keyboard.destroy()
        // monitor.destroy()
        // soc.destroy()
      }
    }
  }, [])

  const handleChangeCode = (code: string) => {
    setCode(code)
    setAllowRun(false)
  }

  const handleChangeMemoryMap = (
    setMemoryMap: React.Dispatch<React.SetStateAction<string>>,
    value: string,
  ) => {
    if (isValidHexString(value)) {
      setMemoryMap(value)
      setAllowRun(false)
    }
  }

  const handleChangeMemoryData = (address: string, data: string) => {
    const findMemory = memoryData.find((value) => value.name === address)
    if (!findMemory) {
      memoryData.push({
        name: address,
        value: data,
      })
    } else {
      findMemory.value = data
    }
    setMemoryData([...memoryData])
  }

  const handleRunAllClick = () => {
    // console.log('running')
    if (!socModelRef.current) {
      return
    }

    // socModelRef.current.setImen(code)
    // setTimeout(() => socModelRef.current?.Run(code), 1000)
    logRef.current?.clear()
    socModelRef.current.RunAll()
    setShowSimulatorType('SOC')
    setAllowRun(false)
    // setRegistersData(convertRegisters2TwinRegisters(socModelRef.current.getRegisters()))
  }

  const handleImportClick = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.s,.S'

    input.addEventListener('change', async (e) => {
      const files = input.files
      // console.log('files:', files)

      if (files?.length && files.length > 0) {
        const file = files.item(0)
        if (!file || file.type === 'image/*') {
          return
        }
        const text = await file.text()
        setDisableCodeEditor(true)
        setCode(text)

        setTimeout(() => {
          setDisableCodeEditor(false)
        }, 1000)
      }
      input.remove()
    })

    input.click()
  }

  const handleGuideClick = () => {
    const x = window.innerWidth / 3
    window.open('/soc/guide', 'soc__guide', `width=500, height=500, left=${x}`)
  }

  const handleStepClick = () => {
    if (!socModelRef.current) {
      return
    }

    // Start Stepping
    if (pc === undefined) {
      setIsStepping(true)
      setStepCode(socModelRef.current.Assembly_code)
      setPc(socModelRef.current.Processor.pc)
      setShowSimulatorType('CODE_EDITOR')
      socModelRef.current.Step()
      return
    }

    // End Stepping
    if (socModelRef.current.Processor.pc >= stepCode.length * 4) {
      setAllowRun(false)
      setPc(undefined)
      setIsStepping(false)
      return
    }

    setPc(socModelRef.current.Processor.pc)
    socModelRef.current.Step()
  }

  const handleAssembleClick = () => {
    // console.log('Assemble: ', socModelRef.current?.assemble(code));
    setIsStepping(false)
    setPc(undefined)

    const decLM_point = parseInt(lmPoint, 16)
    const decIO_point = parseInt(ioPoint, 16)
    const decImem_point = parseInt(iMemPoint, 16)
    const decDmem_point = parseInt(dMemPoint, 16)
    const decStack_point = parseInt(stackPoint, 16)

    if (
      !socModelRef.current?.assemble(
        code,
        decLM_point,
        decIO_point,
        decImem_point,
        decDmem_point,
        decStack_point,
        memoryData.map((mem) => ({ name: hexToBinary(mem.name), value: hexToBinary(mem.value) })),
      )
    ) {
      toast.error('Syntax error')
    } else {
      toast.success('Ready to run')
      setAllowRun(true)
      localStorage.setItem('soc_code', code)
    }
  }

  const handleResetDefault = () => {
    setLmPoint(LMPOINT)
    setIOPoint(IOPOINT)
    setIMemPoint(IMEMPOINT)
    setDMemPoint(DMEMPOINT)
    setStackPoint(STACMEMPOINT)
  }

  return (
    <div className="container h-dvh">
      <div className="grid h-full grid-cols-3 gap-1">
        {/* CODE EDITOR SECTION */}
        <div className={cn({ hidden: showSimulatorType !== 'CODE_EDITOR' })}>
          <div className="mb-4 flex flex-row items-center justify-between gap-2 py-1">
            <h2 className="text-xl font-bold">Code Editor:</h2>
            <Button onClick={() => setShowSimulatorType('SOC')}>
              <ArrowForwardIcon />
            </Button>
          </div>
          <div className="flex flex-col border border-black">
            {isStepping ? (
              <DisplayStepCode code={stepCode} pc={pc} />
            ) : (
              <CodeEditor
                value={code}
                onChange={handleChangeCode}
                disable={disableCodeEditor}
                hidden={showSimulatorType !== 'CODE_EDITOR'}
              />
            )}
          </div>

          {/* <RegisterTable data={registersData} isShown={true} /> */}
        </div>

        {/* SOC SECTION */}
        <div
          id="simulation"
          className={cn('flex h-full items-center justify-center', {
            hidden: showSimulatorType !== 'SOC',
          })}
        ></div>

        {/* MEMORY MAP SECTION */}
        <div className={cn({ hidden: showSimulatorType !== 'MEMORY' })}>
          <div className="mb-4 flex flex-row items-center justify-between gap-2 py-1">
            <h2 className="text-xl font-bold">Memory Map:</h2>
            <Button onClick={() => setShowSimulatorType('SOC')}>
              <ArrowForwardIcon />
            </Button>
          </div>
          <MemoryMap
            className="mb-4"
            lmPoint={lmPoint}
            ioPoint={ioPoint}
            iMemPoint={iMemPoint}
            dMemPoint={dMemPoint}
            stackPoint={stackPoint}
            onChangeLmPoint={(e) => handleChangeMemoryMap(setLmPoint, e)}
            onChangeIOPoint={(e) => handleChangeMemoryMap(setIOPoint, e)}
            onChangeIMemPoint={(e) => handleChangeMemoryMap(setIMemPoint, e)}
            onChangeDMemPoint={(e) => handleChangeMemoryMap(setDMemPoint, e)}
            onChangeStackPoint={(e) => handleChangeMemoryMap(setStackPoint, e)}
            onResetDefault={handleResetDefault}
            disabled={isStepping}
          />
          <MemoryTable data={memoryData} onChangeData={handleChangeMemoryData} />
        </div>

        <div className="flex h-dvh flex-col border-x-2 border-black px-1">
          <h2 className="text-xl font-bold">Logs:</h2>
          <div className="flex flex-col gap-2 py-1">
            <div className="flex flex-row flex-wrap gap-2">
              <Button className="h-fit" variant="outlined" onClick={handleAssembleClick}>
                Assemble & Restart
              </Button>
              <Button
                className="h-fit"
                variant="outlined"
                disabled={!allowRun}
                onClick={handleRunAllClick}
              >
                Run All
              </Button>
              <Button
                className="h-fit"
                variant="outlined"
                onClick={handleStepClick}
                disabled={!allowRun}
              >
                Step
              </Button>
              <Button className="" variant="outlined" color="secondary" onClick={handleImportClick}>
                Import
              </Button>
            </div>
          </div>
          <div
            id="logs"
            className="my-2 flex-1 space-y-1 overflow-y-auto rounded-lg border border-black p-2 text-sm [&_pre]:whitespace-pre-wrap"
          ></div>
        </div>

        <div className="flex flex-col px-2">
          <h2 className="text-xl font-bold">Peripherals:</h2>
          {/* Tab Bar */}

          <TabContext>
            <Tabs>
              <Tab label="M & K" />
              <Tab label="Led Matrix" />
            </Tabs>
            {/* Tab index = 0 */}
            <TabPanel index={0}>
              <div className="monitor" id="monitor" tabIndex={0}></div>
              <Keyboard />
            </TabPanel>
            {/* Tab index = 1 */}
            <TabPanel index={1} className="flex flex-1 items-center justify-center">
              <LedMatrix />
            </TabPanel>
          </TabContext>
        </div>
      </div>
      {/* Button group place on bottom-left */}
      <div className="absolute bottom-4 right-4 flex gap-2">
        <Button className="h-fit" variant="outlined" color="success" onClick={handleGuideClick}>
          Guide
        </Button>
        <Link href={'https://forms.gle/n9Qd9mrpHgKtRPir9'} target="_blank">
          <Button className="h-fit" variant="outlined" color="error">
            Feedback
          </Button>
        </Link>
      </div>
    </div>
  )
}
