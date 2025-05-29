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
import Soc from '~/services/lib/SOCModels/SOC/SoC'
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
import useDMAConfig from '~/components/DMATable/useDMAConfig'
import { convertToDMAStandard } from '~/helpers/converts/dma.convert'
import { TopFunctionButton } from './_components/CodeEditorSection'
import { BinToHex, BinToHex_without0x, DecToHex } from '~/services/lib/SOCModels/Compile/convert'
import TextField from '@mui/material/TextField'
import { Separator } from '~/components/Separator'
import RiscVProcessor from '~/services/lib/SOCModels/Processor/RiscV_processor'

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
    initial: 430,
    // initial: window ? window.innerWidth / 3 - 10 : 455,
  })

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
  const [assembledBreakpoints, setAssembledBreakpoints] = useState<number[]>([])
  const [isStepping, setIsStepping] = useState(false)
  const [pc, setPc] = useState<number | undefined>(undefined)
  const [stepColors, setStepColors] = useState<Register[]>([])

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

  /** DMA Table */
  const dmaConfigs = useDMAConfig()
  const [dmaData, setDmaData] = useState<Register[]>([])

  /** Keyboard */
  const [isKeyboardWaiting, setIsKeyboardWaiting] = useState(false)

  /** Breakpoint */
  const [breakpoints, setBreakpoints] = useState<number[]>([])

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
        const monitor = new Monitor('#monitor')
        const keyboard = new Keyboard('#keyboard', monitor)
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
          setShowSimulatorType('CODE_EDITOR')
          setTabIndex(1)
        }

        const handleIOClick = () => {
          setShowSimulatorType('PERIPHERALS')
          setTabIndex(0)
        }

        const handleLedMatrixClick = () => {
          setShowSimulatorType('DMA')
          setTabIndex(1)
        }

        const handleDMAClick = () => {
          setShowSimulatorType('DMA')
          setTabIndex(0)
        }

        const {
          cpu,
          memory,
          mmu,
          dma,
          // monitor: viewMonitor,
          // keyboard: viewKeyboard,
          ledMatrix: viewLedMatrix,
        } = soc
        cpu.getEvent().on(Agent.Event.CLICK, handleCPUClick)
        memory.getEvent().on(Agent.Event.CLICK, handleMemoryClick)
        mmu.getEvent().on(Agent.Event.CLICK, handleMMUClick)
        dma.getEvent().on(Agent.Event.CLICK, handleDMAClick)
        // viewMonitor.getEvent().on(Agent.Event.CLICK, handleIOClick)
        // viewKeyboard.getEvent().on(Agent.Event.CLICK, handleIOClick)
        viewLedMatrix.getEvent().on(Agent.Event.CLICK, handleLedMatrixClick)

        const socModel = new Soc('abc')
        socModelRef.current = socModel
        logRef.current = logs
        socModel.setLogger(logs)
        socModel.setView(soc)
        socModel.setKeyboard(keyboard)
        socModel.setMonitor(monitor)
        // TODO: fix this error
        // socModel.setLedMatrix(ledMatrix)

        setPosition1(430)
        setRegisters([
          ...socModel.Processor.getRegisters(),
          {
            name: 'pc',
            value: DecToHex(socModel.Processor.pc),
          },
        ])
        // setPosition2(window.innerWidth / 3 - 10)

        setSocModel(socModel)
        setPageTable(socModel.Memory.getPageNumber())

        /** Keyboard Listener */
        socModelRef.current.Processor.event.on(RiscVProcessor.PROCESSOR_EVENT.KEY_WAITING, () => {
          console.log('keyboard is waiting')
          setShowSimulatorType('CODE_EDITOR')
          setTabIndex(3)
          setIsKeyboardWaiting(true)
        })

        socModelRef.current.Processor.event.on(RiscVProcessor.PROCESSOR_EVENT.KEY_FREE, () => {
          console.log('keyboard is free')
          setIsKeyboardWaiting(false)
        })
      }

      firstLoad()
    }
  }, [setPosition1])

  useEffect(() => {
    if (isStepping) {
      return
    }
    startTransition(() => {
      setAllowRun(false)
    })
  }, [savedPoints, isStepping])

  function handleChangeCode(code: string) {
    startTransition(() => {
      setCode(code)
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

  function updateCoreDataAfterRun() {
    if (!socModelRef.current) {
      return
    }

    /** Memory */
    const newMemoryTable = convertMemoryCoreToRegisterType(socModelRef.current.Memory.GetMemory())
    setMemoryData(newMemoryTable)
    setPageTable(socModelRef.current.Memory.getPageNumber())
    /** MMU */
    const newTLB = array2TLB(socModelRef.current.Processor.MMU.TLB)
    tlb.setTLBEntries(newTLB)
    tlb.setPointer(socModelRef.current.Processor.MMU.satp.toString(16))
    /** Processor */

    setRegisters([
      ...socModelRef.current.Processor.getRegisters(),
      {
        name: 'pc',
        value: DecToHex(socModelRef.current.Processor.pc),
      },
    ])
    setStepColors(modelColors2ViewColors(socModelRef.current.Processor.lineColor))
    /** DMA */
    dmaConfigs.setDes(BinToHex_without0x(socModelRef.current.DMA.destRegister))
    dmaConfigs.setSrc(BinToHex_without0x(socModelRef.current.DMA.sourceRegister))
    dmaConfigs.setLen(BinToHex_without0x(socModelRef.current.DMA.lengthRegister))
    dmaConfigs.setCtrl(BinToHex_without0x(socModelRef.current.DMA.controlRegister))
    dmaConfigs.setSta(BinToHex_without0x(socModelRef.current.DMA.statusRegister))
    /** Led Matrix */
    dmaConfigs.setLedCtrl(BinToHex_without0x(socModelRef.current.Led_matrix.controlRegister))
    // setDmaData(convertToDMAStandard(socModelRef.current.DMA.Databuffer))
  }

  const handleRunAllClick = () => {
    if (!socModelRef.current) {
      return
    }

    logRef.current?.clear()
    socModelRef.current.event.once(Soc.SOCEVENT.DONE_ALL, () => {
      updateCoreDataAfterRun()
      handleStepClick()
    })

    socModelRef.current.RunAll()
    // setAllowRun(false)
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
        console.log('text', text)
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
        updateCoreDataAfterRun()
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
    if (socModelRef.current.Processor.pc == stepCode.length * 4) {
      step()
      return
    }

    // End Stepping
    if (socModelRef.current.Processor.pc > stepCode.length * 4) {
      setAllowRun(false)
      setPc(undefined)
      setIsStepping(false)
      return
    }

    // Normal step
    step()
  }

  const handleRestartClick = () => {
    socModelRef.current?.Assembler.reset()
    socModelRef.current?.Memory.reset()
    socModelRef.current?.Processor.reset()
    socModelRef.current?.DMA.reset()

    updateCoreDataAfterRun()

    setIsStepping(false)
    setPc(undefined)
    setAllowRun(false)
  }

  const handleAssembleClick = () => {
    setPc(undefined)

    const { instructionPoint, pageTablePoint, dataPoint, peripheralPoint } = memoryMap

    const decIO_point = parseInt(pageTablePoint, 16)

    const tlbEntries = tlb2Array(tlb.tlbData)
    const requirementMem = decIO_point

    socModelRef.current?.Assembler.reset()
    socModelRef.current?.Memory.reset()
    socModelRef.current?.Processor.reset()
    socModelRef.current?.DMA.reset()

    if (!socModelRef.current?.assemble(code, breakpoints)) {
      toast.error('Syntax error')
    } else {
      toast.success('Ready to run')
      setAllowRun(true)
      updateCoreDataAfterRun()
      setIsKeyboardWaiting(false)
      setIsStepping(true)
      setStepCode(
        socModelRef.current.Assembly_code.map((value: string) => {
          const split = value.split(' ')
          return split.slice(0, split.length - 1).join(' ')
        }),
      )
      setAssembledBreakpoints(socModelRef.current.Assembler.break_point_text)
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
        // TODO: Fix this error
        // socModelRef.current.Memory.setMemoryFromString(text)
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
              <div className="flex flex-col items-center [&_a]:text-blue-500 hover:[&_a]:underline">
                <p className="font-semibold">SOC - Simulator</p>
                <p className="text-sm">
                  <strong>INSTRUCTOR:</strong>{' '}
                  <a target="_blank" href="https://www.linkedin.com/in/duong-tran-3a650a113/">
                    Trần Đại Dương
                  </a>
                </p>
                <p className="text-sm">
                  <strong>AUTHORS:</strong>{' '}
                  <a target="_blank" href="https://www.linkedin.com/in/ngbn111723/">
                    Nguyễn Gia Bảo Ngọc
                  </a>{' '}
                  &{' '}
                  <a target="_blank" href="https://www.linkedin.com/in/truongthienloc/">
                    Trương Thiên Lộc
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
                <Tab label="MMU" />
                <Tab label="Console" />
                <Tab label="Disassembly" />
                <Tab label="Schematic simulate" />
              </Tabs>
              {/* Tab index = 0: Coding View and Registers table */}
              <TabPanel
                index={0}
                className="min-w-[460px] pt-4 max-sm:-ml-14 max-sm:-mt-14 max-sm:mb-14 max-sm:scale-75"
              >
                <TopFunctionButton
                  onImportClick={handleImportClick}
                  onExportClick={handleExportCodeClick}
                  onClose={() => setShowSimulatorType('SOC')}
                />
                <div className="grid grid-cols-[6fr_4fr]">
                  <div className="flex h-[calc(100dvh-151px)] flex-col overflow-auto border border-black">
                    {isStepping ? (
                      <DisplayStepCode code={stepCode} pc={pc} breakpoints={assembledBreakpoints} />
                    ) : (
                      <CodeEditor
                        value={code}
                        onChange={handleChangeCode}
                        disable={disableCodeEditor}
                        hidden={showSimulatorType !== 'CODE_EDITOR' || tabIndex !== 0}
                        breakpoints={breakpoints}
                        setBreakpoints={setBreakpoints}
                      />
                    )}
                  </div>
                  <RegisterTable isShown data={registers} />
                </div>
              </TabPanel>
              {/* Tab index = 1: Schematic View */}
              <TabPanel
                index={4}
                className="flex flex-1 flex-col pt-4 max-sm:mb-20 max-sm:w-dvw max-sm:overflow-auto max-sm:px-1"
              >
                <TopFunctionButton
                  onImportClick={handleMemoryTableImport}
                  onExportClick={handleMemoryTableExport}
                  onClose={() => setShowSimulatorType('SOC')}
                />

                <div className="grid grid-cols-[4fr_6fr]">
                  <div className="flex h-[calc(100dvh-151px)] flex-col overflow-auto border border-black">
                    {isStepping ? (
                      <DisplayStepCode code={stepCode} pc={pc} breakpoints={assembledBreakpoints} />
                    ) : (
                      <CodeEditor
                        value={code}
                        onChange={handleChangeCode}
                        disable={disableCodeEditor}
                        hidden={showSimulatorType !== 'CODE_EDITOR' || tabIndex !== 4}
                        breakpoints={breakpoints}
                        setBreakpoints={setBreakpoints}
                      />
                    )}
                  </div>
                  <div className="flex justify-center">
                    <Datapath data={stepColors} />
                  </div>
                </div>
                <div className="relative">
                  {' '}
                  {/* hoặc div bọc toàn bộ vùng panel */}
                  {/* Các nội dung khác: code editor, hình vẽ datapath, v.v. */}
                  <div className="absolute bottom-2 right-4 z-10 flex flex-col items-end text-xs text-red-500">
                    <span className="mb-1 font-semibold">
                      ⓘ This is ONLY a reference function and may NOT be accurate.
                    </span>
                    <span className="mb-1 font-semibold">
                      It is intended to illustrate how RV32I instructions can be executed,
                    </span>
                    <span className="mb-1 font-semibold">
                      but does NOT reflect the actual schematic of the system.
                    </span>
                  </div>
                </div>
              </TabPanel>
              <TabPanel
                index={3}
                className="flex flex-1 flex-col gap-4 pt-8 max-sm:mb-20 max-sm:w-dvw max-sm:overflow-auto max-sm:px-1"
              >
                <Disassembly socModel={socModel} />
              </TabPanel>
              <TabPanel index={2} className="grid grid-cols-[4fr_6fr] pt-8">
                <div className="flex h-[calc(100dvh-151px)] flex-col overflow-auto border border-black">
                  {isStepping ? (
                    <DisplayStepCode code={stepCode} pc={pc} breakpoints={assembledBreakpoints} />
                  ) : (
                    <CodeEditor
                      value={code}
                      onChange={handleChangeCode}
                      disable={disableCodeEditor}
                      hidden={showSimulatorType !== 'CODE_EDITOR' || tabIndex !== 2}
                      breakpoints={breakpoints}
                      setBreakpoints={setBreakpoints}
                    />
                  )}
                </div>
                <div className="mt-8 min-w-[460px] max-sm:-ml-14 max-sm:-mt-14 max-sm:mb-14 max-sm:scale-75">
                  <div
                    className={cn('monitor', {
                      'animate-pulse': isKeyboardWaiting,
                    })}
                    id="monitor"
                    tabIndex={0}
                  ></div>
                  <Keyboard />
                </div>
              </TabPanel>
              <TabPanel index={1} className="pt-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex h-[calc(100dvh-151px)] flex-col overflow-auto border border-black">
                    {isStepping ? (
                      <DisplayStepCode code={stepCode} pc={pc} breakpoints={assembledBreakpoints} />
                    ) : (
                      <CodeEditor
                        value={code}
                        onChange={handleChangeCode}
                        disable={disableCodeEditor}
                        hidden={showSimulatorType !== 'CODE_EDITOR' || tabIndex !== 1}
                        breakpoints={breakpoints}
                        setBreakpoints={setBreakpoints}
                      />
                    )}
                  </div>
                  <TLBTable tlb={tlb} disabled={isStepping} />
                  {/* <PageTable data={pageTable} /> */}
                </div>
              </TabPanel>
            </TabContext>
          </div>

          {/* MEMORY MAP SECTION */}
          <div className={cn({ hidden: showSimulatorType !== 'MEMORY' })}>
            <div className="mb-4 flex flex-row items-center justify-between gap-2 py-1">
              <h2 className="text-xl font-bold">Range 0x00000 - 0x1ffff</h2>
              <Button onClick={() => setShowSimulatorType('SOC')}>
                <CloseIcon />
              </Button>
            </div>
            <div className="grid grid-cols-1 gap-2 pr-4">
              {/* <div className="flex justify-center">
                <MemoryMap className="" memoryMap={memoryMap} disabled={isStepping} />
              </div> */}
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
              {/* <PageTable data={pageTable} /> */}
            </div>
          </div>

          {/* DMA SECTION */}
          <div
            className={cn('relative flex h-full flex-col', {
              hidden: showSimulatorType !== 'DMA',
            })}
          >
            <div className="flex flex-1 gap-4 pr-4">
              <div className="pt-8">
                <DMATable configs={dmaConfigs} data={dmaData} />
              </div>
              <div className="h-full w-1 bg-gray-400"></div>
              <div className="flex flex-1 flex-col gap-2 pt-8">
                <h2 className="text-lg font-bold">Led Matrix</h2>
                <div className="flex flex-col gap-4">
                  <div className="flex justify-center">
                    <LedMatrix />
                  </div>
                  <TextField
                    label="Control"
                    autoComplete="off"
                    value={dmaConfigs?.led_control}
                    InputProps={{
                      startAdornment: '0x',
                    }}
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Peripherals Section */}
          <div
            className={cn('flex flex-col sm:min-w-[460px] sm:px-2', {
              hidden: showSimulatorType !== 'PERIPHERALS',
            })}
          >
            <h2 className="text-xl font-bold">Peripherals:</h2>
            {/* Tab Bar */}
            {/* <TabContext index={tabIndex} setIndex={setTabIndex}>
              <Tabs>
                <Tab label="Led Matrix" />
              </Tabs>
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
              </TabPanel> */}
            {/* Tab index = 1 */}
            {/* <TabPanel index={0} className="grid grid-cols-[4fr_6fr]">
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
                {showSimulatorType === 'PERIPHERALS' && <LedMatrix />}
              </TabPanel>
            </TabContext> */}
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
          <Button className="h-fit capitalize" variant="outlined" onClick={handleRestartClick}>
            Restart
          </Button>
          <Button className="h-fit capitalize" variant="outlined" onClick={handleAssembleClick}>
            Assemble
          </Button>
          <Button
            className="h-fit normal-case"
            variant="outlined"
            disabled={!allowRun}
            onClick={handleRunAllClick}
          >
            Run
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
