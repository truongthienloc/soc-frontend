'use client'

import React, { useEffect, useRef, useState } from 'react'
import Button from '@mui/material/Button'
import RegisterTable from '~/components/RegisterTable/RegisterTable'
import { cn } from '~/helpers/cn'
import Logs from '~/services/lib/Logs/Logs'
// import { Agent, NCKHBoard } from '~/services/lib/soc'
import '~/styles/soc.scss'
import RiscVProcessor from '~/services/lib/SOCModels/RiscV_processor'
import { Registers, TwinRegister } from '~/types/register'
import { CodeEditor } from '~/components/CodeEditor'
import { convertRegisters2TwinRegisters } from '~/helpers/converts/register.convert'
import Soc from '~/services/lib/SOCModels/SoC'
import { GuideModal } from '~/components/GuideModal'
import { toast } from 'react-toastify'
import { DisplayStepCode } from '~/components/DisplayStepCode'
import { Keyboard } from '~/components/Keyboard'
import { LedMatrix } from '~/components/LedMatrix'

type Props = {}

export default function SocPage({}: Props) {
    const isStart = useRef(true)
    const socModelRef = useRef<Soc>()
    const logRef = useRef<Logs>()
    const [showCodeEditor, setShowCodeEditor] = useState(false)
    const [disableCodeEditor, setDisableCodeEditor] = useState(false)
    const [registersData, setRegistersData] = useState<TwinRegister[]>([])
    const [code, setCode] = useState('')
    const [isOpenGuideModal, setIsOpenGuideModal] = useState(false)
    const [allowRun, setAllowRun] = useState(false)

    const [stepCode, setStepCode] = useState<string[]>([])
    const [isStepping, setIsStepping] = useState(false)
    const [pc, setPc] = useState<number | undefined>(undefined)

    const handleGuideModalClose = () => setIsOpenGuideModal(false)

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
                    setShowCodeEditor(true)
                }

                const cpu = soc.cpu
                cpu.getEvent().on(Agent.Event.CLICK, handleCPUClick)

                const socModel = new Soc('abc')
                socModelRef.current = socModel
                logRef.current = logs
                socModel.setLogger(logs)
                socModel.setView(soc)
                socModel.setKeyboard(keyboard)
                socModel.setMonitor(monitor)
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

    const handleRunAllClick = () => {
        // console.log('running')
        if (!socModelRef.current) {
            return
        }

        // socModelRef.current.setImen(code)
        // setTimeout(() => socModelRef.current?.Run(code), 1000)
        logRef.current?.clear()
        socModelRef.current.RunAll()
        setShowCodeEditor(false)
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
        // setIsOpenGuideModal(true)
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
            setStepCode(socModelRef.current.Processor.Assembly_code)
            setPc(socModelRef.current.Processor.pc)
            setShowCodeEditor(true)
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
        if (!socModelRef.current?.assemble(code)) {
            toast.error('Syntax error')
        } else {
            toast.success('Ready to run')
            setAllowRun(true)
            localStorage.setItem('soc_code', code)
            console.log('step code: ', socModelRef.current.Processor.Assembly_code)
        }
    }

    return (
        <div className="container h-dvh">
            <div className="grid h-full grid-cols-[2fr_1fr]">
                <div className="grid grid-rows-[9fr_1fr]">
                    <div className="grid grid-cols-2 gap-2">
                        <div className={cn({ hidden: !showCodeEditor })}>
                            <div className="flex flex-row gap-2 py-1">
                                <Button onClick={() => setShowCodeEditor(false)}>Back</Button>
                                <Button
                                    className="ml-auto"
                                    variant="outlined"
                                    color="error"
                                    onClick={handleGuideClick}
                                >
                                    Guide
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={handleImportClick}
                                >
                                    Import
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
                                        hidden={!showCodeEditor}
                                    />
                                )}
                            </div>

                            {/* <RegisterTable data={registersData} isShown={true} /> */}
                        </div>
                        <div
                            id="simulation"
                            className={cn('flex h-full items-center justify-center', {
                                hidden: showCodeEditor,
                            })}
                        ></div>

                        <div className="flex max-h-[90dvh] flex-col pr-1">
                            <p className="text-xl font-bold">Logs:</p>
                            <div
                                id="logs"
                                className="mt-2 h-full space-y-1 overflow-y-auto rounded-lg border border-black p-2 text-sm [&_pre]:whitespace-pre-wrap"
                            ></div>
                        </div>
                    </div>
                    <div className="flex flex-row gap-2">
                        {/* <Button className="h-fit" variant="outlined" onClick={() => {}}>
                            Run
                        </Button> */}
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
                    </div>
                </div>
                <div className="border-l-2 border-black px-2">
                    <div className="monitor" id="monitor" tabIndex={0}></div>
                    <Keyboard />
                    <LedMatrix />
                </div>
            </div>
            {/* <GuideModal isOpen={isOpenGuideModal} onClose={handleGuideModalClose} /> */}
        </div>
    )
}
