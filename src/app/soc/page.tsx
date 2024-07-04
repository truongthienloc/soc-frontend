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

                const soc = new NCKHBoard('simulation')
                const monitor = new Monitor('#monitor', soc.monitorModule)
                const keyboard = new Keyboard('#keyboard', soc.keyboardModule, monitor)
                const logs = new Logs('#logs')

                const handleCPUClick = () => {
                    setShowCodeEditor(true)
                }

                const cpu = soc.cpu
                cpu.getEvent().on(Agent.Event.CLICK, handleCPUClick)
                // cpu.setIsRunning(true)

                const socModel = new Soc('abc')
                socModelRef.current = socModel
                logRef.current = logs
                socModel.setLogger(logs)
                socModel.setView(soc)
                socModel.setKeyboard(keyboard)
                socModel.setMonitor(monitor)
                // socModel.setImen('.text\nlui      x25 , 9\nlui      x23 , 9')
                // socModel.Run()
                // setRegistersData(convertRegisters2TwinRegisters(socModel.getRegisters()))
                // keyboard.getEvent().on(Keyboard.EVENT.LINE_DOWN, (text: string) => {
                //     console.log('text: ', text);

                // })
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
        setIsOpenGuideModal(true)
    }

    const handleStepClick = () => {
        // logRef.current?.clear()
        if (!socModelRef.current) {
            return
        }

        if (pc === undefined) {
            setIsStepping(true)
            console.log('step code: ', socModelRef.current.Processor.Assembly_code);
            
            setStepCode(socModelRef.current.Processor.Assembly_code)
            socModelRef.current.Step()
            setPc(socModelRef.current.Processor.pc)
            return
        }

        socModelRef.current.Step()
        setPc(socModelRef.current.Processor.pc)
        if (socModelRef.current.Processor.pc > stepCode.length * 4) {
            setAllowRun(false)
            setPc(undefined)
            setIsStepping(false)
        }
    }

    const handleAssembleClick = () => {
        // console.log('Assemble: ', socModelRef.current?.assemble(code));
        setIsStepping(false)
        if (!socModelRef.current?.assemble(code)) {
            toast.error('Syntax error')
        } else {
            toast.success('Ready to run')
            setAllowRun(true)
            localStorage.setItem('soc_code', code)
            console.log('step code: ', socModelRef.current.Processor.Assembly_code);
            
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
                                className="mt-2 h-full space-y-1 overflow-y-auto rounded-lg border border-black p-2 [&_pre]:whitespace-pre-wrap"
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
                    <div className="keyboard" id="keyboard">
                        <div className="row">
                            <button className="btn">1</button>
                            <button className="btn">2</button>
                            <button className="btn">3</button>
                            <button className="btn">4</button>
                            <button className="btn">5</button>
                            <button className="btn">6</button>
                            <button className="btn">7</button>
                            <button className="btn">8</button>
                            <button className="btn">9</button>
                            <button className="btn">0</button>
                            <button className="delete">Del</button>
                        </div>
                        <div className="row">
                            <button className="btn">q</button>
                            <button className="btn">w</button>
                            <button className="btn">e</button>
                            <button className="btn">r</button>
                            <button className="btn">t</button>
                            <button className="btn">y</button>
                            <button className="btn">u</button>
                            <button className="btn">i</button>
                            <button className="btn">o</button>
                            <button className="btn">p</button>
                        </div>
                        <div className="row">
                            <button className="btn">a</button>
                            <button className="btn">s</button>
                            <button className="btn">d</button>
                            <button className="btn">f</button>
                            <button className="btn">g</button>
                            <button className="btn">h</button>
                            <button className="btn">j</button>
                            <button className="btn">k</button>
                            <button className="btn">l</button>
                            <button className="enter">Enter</button>
                        </div>
                        <div className="row">
                            <button className="btn">z</button>
                            <button className="btn">x</button>
                            <button className="btn">c</button>
                            <button className="btn">v</button>
                            <button className="btn">b</button>
                            <button className="btn">n</button>
                            <button className="btn">m</button>
                            <button className="shift">Shift</button>
                        </div>
                        <div className="row">
                            <button className="space">Space</button>
                        </div>
                    </div>
                </div>
            </div>
            <GuideModal isOpen={isOpenGuideModal} onClose={handleGuideModalClose} />
        </div>
    )
}
