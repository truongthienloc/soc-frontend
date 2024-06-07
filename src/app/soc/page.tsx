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

type Props = {}

export default function SocPage({}: Props) {
    const isStart = useRef(true)
    const socModelRef = useRef<RiscVProcessor>()
    const [showRegister, setShowRegister] = useState(false)
    const [registersData, setRegistersData] = useState<TwinRegister[]>([])
    const [code, setCode] = useState('')

    useEffect(() => {
        if (isStart.current) {
            isStart.current = false
            // setTimeout(() => setShowRegister(false), 1000)

            async function firstLoad() {
                const { Agent, NCKHBoard } = await import('~/services/lib/soc')
                const Keyboard = (await import('~/services/lib/control/Keyboard')).default
                const Monitor = (await import('~/services/lib/control/Monitor')).default

                const soc = new NCKHBoard('simulation')
                const monitor = new Monitor('#monitor', soc.monitorModule)
                const keyboard = new Keyboard('#keyboard', soc.keyboardModule, monitor)
                const logs = new Logs('#logs')

                const handleCPUClick = () => {
                    setShowRegister(true)
                }

                const cpu = soc.cpu
                cpu.getEvent().on(Agent.Event.CLICK, handleCPUClick)
                // cpu.setIsRunning(true)

                const cpuModel = new RiscVProcessor('cpu', '00', true)
                socModelRef.current = cpuModel
                cpuModel.setLogger(logs)
                // cpuModel.setImen('.text\nlui      x25 , 9\nlui      x23 , 9')
                cpuModel.RunAll()
                setRegistersData(convertRegisters2TwinRegisters(cpuModel.getRegisters()))
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

    const handleRunAllClick = () => {
        console.log('running')
        if (!socModelRef.current) {
            return
        }

        socModelRef.current.setImen(code)
        socModelRef.current.RunAll()
        setRegistersData(convertRegisters2TwinRegisters(socModelRef.current.getRegisters()))
    }

    return (
        <div className="container h-dvh">
            <div className="grid h-full grid-cols-[2fr_1fr]">
                <div className="grid grid-rows-[9fr_1fr]">
                    <div
                        id="simulation"
                        className={cn('flex h-full items-center justify-center', {
                            hidden: showRegister,
                        })}
                    ></div>
                    <div className={cn({ hidden: !showRegister })}>
                        <Button onClick={() => setShowRegister(false)}>Back</Button>
                        <div className="grid grid-cols-2">
                            <div className="flex flex-col border border-black">
                                <CodeEditor
                                    value={code}
                                    onChange={(value) => setCode(value)}
                                    hidden={!showRegister}
                                />
                            </div>
                            <RegisterTable data={registersData} isShown={true} />
                        </div>
                    </div>
                    <div className="flex flex-row gap-2">
                        {/* <Button className="h-fit" variant="outlined" onClick={() => {}}>
                            Run
                        </Button> */}
                        <Button
                            className="h-fit"
                            variant="outlined"
                            // disabled
                            onClick={handleRunAllClick}
                        >
                            Run All
                        </Button>
                        {/* <Button className='h-fit' variant='outlined' onClick={() => {}}>
                            Step
                        </Button> */}
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
                    <div className="flex flex-col">
                        <p className="text-xl font-bold">Logs:</p>
                        <div
                            id="logs"
                            className="mt-2 h-[200px] overflow-auto rounded-lg border border-black p-2"
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
