'use client'

import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import RegisterTable from '~/components/RegisterTable/RegisterTable'
import { cn } from '~/helpers/cn'
import Keyboard from '~/services/lib/control/Keyboard'
import Monitor from '~/services/lib/control/Monitor'
import { Agent, NCKHBoard } from '~/services/lib/soc'
import '~/styles/soc.scss'

type Props = {}

export default function SocPage({}: Props) {
    const [showRegister, setShowRegister] = useState(false)

    useEffect(() => {
        const soc = new NCKHBoard('simulation')
        const monitor = new Monitor('#monitor', soc.monitorModule)
        const keyboard = new Keyboard('#keyboard', soc.keyboardModule, monitor)

        const handleCPUClick = () => {
            setShowRegister(true)
        }

        const cpu = soc.cpu
        cpu.getEvent().on(Agent.Event.CLICK, handleCPUClick)

        return () => {
            cpu.getEvent().off(Agent.Event.CLICK, handleCPUClick)
            keyboard.destroy()
            monitor.destroy()
            soc.destroy()
        }
    }, [])

    return (
        <div className="container h-dvh">
            <div className="grid h-full grid-cols-2">
                <div className="grid grid-rows-[2fr_1fr]">
                    <div id="simulation" className={cn({ hidden: showRegister })}></div>
                    <div className={cn({ hidden: !showRegister })}>
                        <Button onClick={() => setShowRegister(false)}>Back</Button>
                        <RegisterTable data={[]} isShown={true} />
                    </div>
                    <div id="logs"></div>
                </div>
                <div className="">
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
                            <button className="delete">Delete</button>
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
        </div>
    )
}
