'use client'

import { startTransition, useEffect, useRef, useState } from 'react'
import { hexToBinary } from '~/helpers/converts/Hextobin'
/** import MUI */
import Button from '@mui/material/Button'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { CodeEditor, Disassembly } from '~/components/CodeEditor'
import { DisplayStepCode } from '~/components/DisplayStepCode'
import { Keyboard } from '~/components/Keyboard'
import { LedMatrix } from '~/components/LedMatrix'
import { MemoryMap } from '~/components/MemoryMap'
import { MemoryTable } from '~/components/MemoryTable'
import { Tab, TabContext, TabPanel, Tabs } from '~/components/Tabs'
import { cn } from '~/helpers/cn'
import Logs from '~/services/lib/Logs/Logs'
import Soc from '~/services/lib/SOCModels/SoC'
import '~/styles/soc.scss'
import { Register } from '~/types/register'
import { SimulatorType } from '~/types/simulator'

import CloseIcon from '@mui/icons-material/Close'
import { useResizable } from 'react-resizable-layout'
import {
  convertMemoryCoreToRegisterType,
  convertMemoryTableToText,
} from '~/helpers/converts/memory.convert'
import useMemoryMap from '~/hooks/memory/useMemoryMap'
import useTLB from '~/hooks/tlb/useTLB'
import { TLBTable } from '~/components/TLBTable'
import { array2TLB, tlb2Array, tlbEntries2TLB } from '~/helpers/converts/tlb.convert'
import Draggable from 'react-draggable'
import PageTable from '~/components/TLBTable/PageTable'
import { Datapath } from '~/components/Datapath'
import RegisterTable from '~/components/RegisterTable/RegisterTable'
import { DMATable } from '~/components/DMATable'
import { modelColors2ViewColors } from '~/helpers/converts/color.convert'

type Props = {}

export default function SocPage({}: Props) {
  const {
    position: position1,
    separatorProps: separatorProps1,
    isDragging: isDragging1,
    setPosition: setPosition1,
  } = useResizable({
    axis: 'x',
    min: 50,
    initial: 410,
    // initial: window ? window.innerWidth / 3 - 10 : 455,
  })
  // const {
  //   position: position2,
  //   separatorProps: separatorProps2,
  //   isDragging: isDragging2,
  //   setPosition: setPosition2,
  // } = useResizable({
  //   axis: 'x',
  //   min: 50,
  //   initial: 500,
  //   // initial: window ? window.innerWidth / 3 - 10 : 500,
  //   reverse: true,
  // })
  const isStart = useRef(true)
  const socModelRef = useRef<Soc>()
  const [socModel, setSocModel] = useState<Soc>()
  const logRef = useRef<Logs>()
  const [isOpenLogsModal, setIsOpenLogsModal] = useState(false)
  const [showSimulatorType, setShowSimulatorType] = useState<SimulatorType>('CODE_EDITOR')
  const [disableCodeEditor, setDisableCodeEditor] = useState(true)
  const [code, setCode] = useState('')
  const [allowRun, setAllowRun] = useState(false)

  const [stepCode, setStepCode] = useState<string[]>([])
  const [isStepping, setIsStepping] = useState(false)
  const [pc, setPc] = useState<number | undefined>(undefined)
  const [stepColors, setStepColors] = useState<Register[]>([]);

  /** Memory Map state */
  const memoryMap = useMemoryMap()
  const { savedPoints } = memoryMap

  /** Memory Data */
  const [memoryData, setMemoryData] = useState<Register[]>([])

  /** TLB Data */
  const tlb = useTLB()
  const { tlbData, pointer } = tlb

  /** Page table */
  const [pageTable, setPageTable] = useState<Register[]>([])

  /** Peripherals */
  const [tabIndex, setTabIndex] = useState(0)

  /** Register Table */
  const [registers, setRegisters] = useState<Register[]>([])

  useEffect(() => {
    const socCode = localStorage.getItem('soc_code') ?? ''
    setTimeout(() => {
      setCode(socCode)
      setTimeout(() => {
        setDisableCodeEditor(false)
      }, 250)
    }, 1000)
    // setDisableCodeEditor(false)

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
          setTabIndex(0)
        }
        const handleMemoryClick = () => {
          setShowSimulatorType('MEMORY')
        }

        const handleMMUClick = () => {
          setShowSimulatorType('MMU')
        }

        const handleIOClick = () => {
          setShowSimulatorType('PERIPHERALS')
          setTabIndex(0)
        }

        const handleLedMatrixClick = () => {
          setShowSimulatorType('PERIPHERALS')
          setTabIndex(1)
        }

        const handleDMAClick = () => {
          setShowSimulatorType('DMA')
        }

        const {
          cpu,
          memory,
          mmu,
          dma,
          monitor: viewMonitor,
          keyboard: viewKeyboard,
          ledMatrix: viewLedMatrix,
        } = soc
        cpu.getEvent().on(Agent.Event.CLICK, handleCPUClick)
        memory.getEvent().on(Agent.Event.CLICK, handleMemoryClick)
        mmu.getEvent().on(Agent.Event.CLICK, handleMMUClick)
        dma.getEvent().on(Agent.Event.CLICK, handleDMAClick)
        viewMonitor.getEvent().on(Agent.Event.CLICK, handleIOClick)
        viewKeyboard.getEvent().on(Agent.Event.CLICK, handleIOClick)
        viewLedMatrix.getEvent().on(Agent.Event.CLICK, handleLedMatrixClick)

        const socModel = new Soc('abc')
        socModelRef.current = socModel
        logRef.current = logs
        socModel.setLogger(logs)
        socModel.setView(soc)
        socModel.setKeyboard(keyboard)
        socModel.setMonitor(monitor)
        socModel.setLedMatrix(ledMatrix)

        setPosition1(410)
        setRegisters(socModel.Processor.getRegisters())
        // setPosition2(window.innerWidth / 3 - 10)

        setSocModel(socModel)
      }

      firstLoad()

      return () => {}
    }
  }, [setPosition1])

  useEffect(() => {
    if (isStepping) {
      return
    }
    startTransition(() => {
      setAllowRun(false)
    })
  }, [savedPoints, tlbData, pointer, isStepping])

  const handleChangeCode = (code: string) => {
    setCode(code)
    startTransition(() => {
      setAllowRun(false)
    })
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
    setAllowRun(false)
  }

  const handleRunAllClick = () => {
    if (!socModelRef.current) {
      return
    }

    logRef.current?.clear()
    socModelRef.current.event.once(Soc.SOCEVENT.DONE_ALL, () => {
      if (!socModelRef.current) {
        return
      }

      const newMemoryTable = convertMemoryCoreToRegisterType(socModelRef.current.Memory.Memory)
      const newTLB = array2TLB(socModelRef.current.MMU.TLB)
      setMemoryData(newMemoryTable)
      tlb.setTLBEntries(newTLB)
      setRegisters(socModelRef.current.Processor.getRegisters())
      setPageTable(socModelRef.current.Memory.getPageNumber())
    })
    socModelRef.current.RunAll()
    // setShowSimulatorType('SOC')
    setAllowRun(false)
    // setRegistersData(convertRegisters2TwinRegisters(socModelRef.current.getRegisters()))
  }

  const handleImportClick = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.s,.S'

    input.addEventListener('change', async () => {
      const files = input.files
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

  const handleExportCodeClick = () => {
    const blob = new Blob([code], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'code.s'
    link.click()
    link.remove()
  }

  const handleGuideClick = () => {
    const x = window.innerWidth / 3
    window.open('/soc/guide', 'soc__guide', `width=500, height=500, left=${x}`)
  }

  const handleStepClick = () => {
    if (!socModelRef.current) {
      return
    }

    function step() {
      if (!socModelRef.current) {
        return
      }

      setPc(socModelRef.current.Processor.pc)
      socModelRef.current.event.once(Soc.SOCEVENT.STEP_END, () => {
        if (!socModelRef.current) {
          return
        }

        const newMemoryTable = convertMemoryCoreToRegisterType(socModelRef.current.Memory.Memory)
        const newTLB = array2TLB(socModelRef.current.MMU.TLB)
        setMemoryData(newMemoryTable)
        tlb.setTLBEntries(newTLB)
        setRegisters(socModelRef.current.Processor.getRegisters())
        setPageTable(socModelRef.current.Memory.getPageNumber())
        setStepColors(modelColors2ViewColors(socModelRef.current.Processor.lineColor))
      })
      socModelRef.current.stepWithEvent()
    }

    // Start Stepping
    if (pc === undefined) {
      setIsStepping(true)
      setStepCode(
        socModelRef.current.Assembly_code.map((value: string) => {
          const split = value.split(' ')
          return split.slice(0, split.length - 1).join(' ')
        }),
      )
      setShowSimulatorType('CODE_EDITOR')
      step()
      return
    }

    // End Stepping
    if (socModelRef.current.Processor.pc >= stepCode.length * 4) {
      setAllowRun(false)
      setPc(undefined)
      setIsStepping(false)
      return
    }

    // Normal step
    step()
  }

  const handleAssembleClick = () => {
    setIsStepping(false)
    setPc(undefined)

    const { lmPoint, ioPoint, iMemPoint, dMemPoint, stackPoint } = memoryMap

    const decLM_point = parseInt(lmPoint, 16)
    const decIO_point = parseInt(ioPoint, 16)
    const decImem_point = parseInt(iMemPoint, 16)
    const decDmem_point = parseInt(dMemPoint, 16)
    const decStack_point = parseInt(stackPoint, 16)

    const tlbEntries = tlb2Array(tlb.tlbData)

    if (
      !socModelRef.current?.assemble(
        code,
        decLM_point,
        decIO_point,
        decImem_point,
        decDmem_point,
        decStack_point,
        memoryData.map((mem) => ({ name: hexToBinary(mem.name), value: hexToBinary(mem.value) })),
        tlbEntries,
        parseInt(tlb.pointer, 16),
      )
    ) {
      toast.error('Syntax error')
    } else {
      toast.success('Ready to run')
      setAllowRun(true)
      localStorage.setItem('soc_code', code)
    }
  }

  const handleResetMemoryTable = () => {
    setMemoryData([])
    setAllowRun(false)
  }

  const handleMemoryTableImport = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.mem,.MEM'

    input.addEventListener('change', async () => {
      const files = input.files
      if (files?.length && files.length > 0) {
        const file = files.item(0)
        if (!file || file.type === 'image/*') {
          return
        }
        const text = await file.text()
        if (!socModelRef.current) {
          return
        }
        socModelRef.current.Memory.setMemoryFromString(text)
        setMemoryData(convertMemoryCoreToRegisterType(socModelRef.current.Memory.Memory))
        setAllowRun(false)
        toast.success('Import memory table successfully')
      }
      input.remove()
    })

    input.click()
  }

  const handleMemoryTableExport = () => {
    const text = convertMemoryTableToText(memoryData)
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'memory.mem'
    // document.body.appendChild(link)
    link.click()
    // document.body.removeChild(link)
    link.remove()
  }

  const handleExportLogs = () => {
    if (!logRef.current) {
      return
    }

    const blob = new Blob([logRef.current.getText()], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'log.txt'
    // document.body.appendChild(link)
    link.click()
    // document.body.removeChild(link)
    link.remove()
  }

  return (
    <div className="sm:h-dvh">
      <div className="grid h-full grid-cols-[auto_auto_1fr] gap-1 max-sm:grid-cols-1">
        {/* Section 1 */}
        <div
          className={cn('px-1 pb-1 transition max-sm:w-[100dvw_!important]', {
            // 'blur-sm': isDragging1,
          })}
          style={{ width: position1 }}
        >
          <div className="sm:min-w-[395px]">
            {/* SOC SECTION */}
            <div className={cn('flex h-full flex-col items-center')}>
              <div className="mt-8 flex flex-col items-center">
                <p className="text-nowrap text-center text-lg font-semibold">
                  UNIVERSITY OF INFORMATION TECHNOLOGY
                </p>
                <img className="h-32 w-32" src="/images/logo/LogoUIT.png" alt="UIT's Logo" />
              </div>
              <div className="flex flex-col items-center">
                <p className="font-semibold">SOC - Simulator</p>
                <p className="text-sm">
                  AUTHORS:{' '}
                  <a target="_blank" href="https://www.linkedin.com/in/ngbn111723/">
                    Nguyễn Gia Bảo Ngọc
                  </a>{' '}
                  &{' '}
                  <a target="_blank" href="https://www.linkedin.com/in/truongthienloc/">
                    Thương Thiên Lộc
                  </a>
                </p>
              </div>
              <div id="simulation"></div>
            </div>
          </div>
        </div>
        {/* End Section 1 */}

        <div className="h-full w-1 cursor-col-resize bg-gray-400" {...separatorProps1}></div>

        {/* <div className="h-full w-1 cursor-col-resize bg-gray-400" {...separatorProps2}></div> */}

        {/* Section 3 */}
        <div
          className={cn('overflow-y-auto transition max-sm:w-[100dvw_!important]', {
            // 'blur-sm': isDragging2,
            'blur-sm': isDragging1,
          })}
          // style={{ width: position2 }}
        >
          {/* CODE EDITOR SECTION */}
          <div
            className={cn('flex min-h-dvh flex-col', {
              hidden: showSimulatorType !== 'CODE_EDITOR',
            })}
          >
            <TabContext index={tabIndex} setIndex={setTabIndex}>
              <Tabs>
                <Tab label="Coding View" />
                <Tab label="Schematic View" />
                <Tab label="Disassembly" />
              </Tabs>
              {/* Tab index = 0 */}
              <TabPanel
                index={0}
                className="min-w-[460px] pt-4 max-sm:-ml-14 max-sm:-mt-14 max-sm:mb-14 max-sm:scale-75"
              >
                <div className="mb-4 flex flex-row items-center justify-between gap-2 py-1">
                  <div className="flex items-center gap-2">
                    {/* <h2 className="text-xl font-bold">Code Editor:</h2> */}
                    <Button
                      className=""
                      variant="outlined"
                      color="secondary"
                      onClick={handleImportClick}
                    >
                      Import
                    </Button>
                    <Button
                      className=""
                      variant="outlined"
                      color="secondary"
                      onClick={handleExportCodeClick}
                    >
                      Export
                    </Button>
                  </div>
                  <Button onClick={() => setShowSimulatorType('SOC')}>
                    <CloseIcon />
                  </Button>
                </div>
                <div className="grid grid-cols-[4fr_6fr]">
                  <div className="flex h-[calc(100dvh-151px)] flex-col overflow-auto border border-black">
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
                  <RegisterTable isShown data={registers} />
                </div>
              </TabPanel>
              {/* Tab index = 1 */}
              <TabPanel
                index={1}
                className="flex flex-1 flex-col gap-4 pt-8 max-sm:mb-20 max-sm:w-dvw max-sm:overflow-auto max-sm:px-1"
              >
                {/* <h2 className="text-xl font-bold">Datapath:</h2> */}
                <div className="flex justify-center">
                  <Datapath data={stepColors} />
                </div>
              </TabPanel>
              <TabPanel
                index={2}
                className="flex flex-1 flex-col gap-4 pt-8 max-sm:mb-20 max-sm:w-dvw max-sm:overflow-auto max-sm:px-1"
              >
                <Disassembly socModel={socModel} />
              </TabPanel>
            </TabContext>
          </div>

          {/* MEMORY MAP SECTION */}
          <div className={cn({ hidden: showSimulatorType !== 'MEMORY' })}>
            <div className="mb-4 flex flex-row items-center justify-between gap-2 py-1">
              <h2 className="text-xl font-bold">Memory Map:</h2>
              <Button onClick={() => setShowSimulatorType('SOC')}>
                <CloseIcon />
              </Button>
            </div>
            <MemoryMap className="mb-4" memoryMap={memoryMap} disabled={isStepping} />
            <MemoryTable
              data={memoryData}
              onChangeData={handleChangeMemoryData}
              onResetData={handleResetMemoryTable}
              disabled={isStepping}
              memoryMap={memoryMap}
              onImportClick={handleMemoryTableImport}
              onExportClick={handleMemoryTableExport}
            />
          </div>

          {/* MMU SECTION */}
          <div
            className={cn('flex h-full flex-col', {
              hidden: showSimulatorType !== 'MMU',
            })}
          >
            <div className="mb-4 flex flex-row items-center justify-between gap-2 py-1">
              {/* <h2 className="text-xl font-bold text-red-500">MMU View:</h2> */}
              <Button className="ml-auto" onClick={() => setShowSimulatorType('SOC')}>
                <CloseIcon />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <TLBTable tlb={tlb} disabled={isStepping} />
              <PageTable data={pageTable} />
            </div>
          </div>

          {/* DMA SECTION */}
          <div
            className={cn('flex h-full flex-col', {
              hidden: showSimulatorType !== 'DMA',
            })}
          >
            <div className="mb-4 flex flex-row items-center justify-between gap-2 py-1">
              {/* <h2 className="text-xl font-bold text-red-500">MMU View:</h2> */}
              <Button className="ml-auto" onClick={() => setShowSimulatorType('SOC')}>
                <CloseIcon />
              </Button>
            </div>

            <DMATable />
          </div>

          {/* Peripherals Section */}
          <div
            className={cn('flex flex-col sm:min-w-[460px] sm:px-2', {
              hidden: showSimulatorType !== 'PERIPHERALS',
            })}
          >
            <h2 className="text-xl font-bold">Peripherals:</h2>
            {/* Tab Bar */}
            <TabContext index={tabIndex} setIndex={setTabIndex}>
              <Tabs>
                <Tab label="Monitor & Keyboard" />
                <Tab label="Led Matrix" />
              </Tabs>
              {/* Tab index = 0 */}
              <TabPanel index={0} className="grid grid-cols-[4fr_6fr]">
                <div className="flex h-[calc(100dvh-151px)] flex-col overflow-auto border border-black">
                  {isStepping ? (
                    <DisplayStepCode code={stepCode} pc={pc} />
                  ) : (
                    <CodeEditor
                      value={code}
                      onChange={handleChangeCode}
                      disable={disableCodeEditor}
                      hidden={showSimulatorType !== 'PERIPHERALS' || tabIndex != 0}
                    />
                  )}
                </div>
                <div className="mt-8 min-w-[460px] max-sm:-ml-14 max-sm:-mt-14 max-sm:mb-14 max-sm:scale-75">
                  <div className="monitor" id="monitor" tabIndex={0}></div>
                  <Keyboard />
                </div>
              </TabPanel>
              {/* Tab index = 1 */}
              <TabPanel index={1} className="grid grid-cols-[4fr_6fr]">
                <div className="flex h-[calc(100dvh-151px)] flex-col overflow-auto border border-black">
                  {isStepping ? (
                    <DisplayStepCode code={stepCode} pc={pc} />
                  ) : (
                    <CodeEditor
                      value={code}
                      onChange={handleChangeCode}
                      disable={disableCodeEditor}
                      hidden={showSimulatorType !== 'PERIPHERALS' || tabIndex != 1}
                    />
                  )}
                </div>
                <LedMatrix />
              </TabPanel>
            </TabContext>
          </div>
        </div>
        {/* End Section 3 */}
      </div>

      {/* Section 2 */}

      <Draggable handle=".drag" bounds="body">
        <div
          className={cn(
            'animation-fade-in absolute top-0 z-10 flex h-[500px] w-[500px] flex-col rounded-lg bg-white p-2 shadow-2xl',
            {
              hidden: !isOpenLogsModal,
            },
          )}
        >
          <div className="drag relative flex justify-center">
            <div className="h-[20px] w-2/3 rounded-lg bg-blue-400/50"></div>
          </div>
          <div className="flex flex-col gap-2 py-2">
            <div className="flex flex-row flex-wrap gap-2">
              <h2 className="text-xl font-bold">Logs:</h2>
              <Button className="" variant="outlined" color="secondary" onClick={handleExportLogs}>
                Export
              </Button>
            </div>
          </div>
          <div
            id="logs"
            className="my-2 flex-1 space-y-1 overflow-y-auto rounded-lg border border-black p-2 text-sm [&_pre]:whitespace-pre-wrap"
          ></div>
        </div>
      </Draggable>

      {/* End Section 2 */}

      {/* Button group place on bottom-left */}
      <div className="fixed bottom-4 left-4 space-y-1">
        <p className="bg-white text-sm font-semibold">
          Click on &#39;GUIDE&#39; if this is your first time here.
        </p>
        <div className="flex gap-2">
          <Button
            className="h-fit bg-white capitalize"
            variant="outlined"
            color="success"
            onClick={handleGuideClick}
          >
            Guide
            <div className="absolute h-5 w-5 animate-ping rounded-full bg-gray-500 opacity-75"></div>
          </Button>
          <Link href={'https://forms.gle/n9Qd9mrpHgKtRPir9'} target="_blank">
            <Button className="h-fit bg-white capitalize" variant="outlined" color="secondary">
              Feedback
            </Button>
          </Link>
          <Button
            className="h-fit bg-white capitalize"
            variant="outlined"
            color="primary"
            onClick={() => setIsOpenLogsModal(!isOpenLogsModal)}
          >
            Status
          </Button>
        </div>
        <div className="flex flex-row flex-wrap gap-2">
          <Button className="h-fit capitalize" variant="outlined" onClick={handleAssembleClick}>
            Assemble & Restart
          </Button>
          <Button
            className="h-fit normal-case"
            variant="outlined"
            disabled={!allowRun}
            onClick={handleRunAllClick}
          >
            Run all
          </Button>
          <Button
            className="h-fit capitalize"
            variant="outlined"
            onClick={handleStepClick}
            disabled={!allowRun}
          >
            Step
          </Button>
        </div>
      </div>
    </div>
  )
}
