'use client'

import React from 'react'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import CloseIcon from '@mui/icons-material/Close'

type Props = {}

export default function GuidePage({}: Props) {
    const handleClose = () => {
        window.close()
    }

    return (
        <div className="container">
            {/* <div className="flex flex-row justify-end bg-blue-50 shadow shadow-blue-200">
                <Button variant="contained" color="error" onClick={handleClose}>
                    <CloseIcon />
                </Button>
            </div> */}
            <div className="max-h-[85dvh] space-y-4 overflow-auto px-4 py-4">
                <h1 className="text-center text-4xl">Guidelines</h1>
                
                <div className="">
                    <p>INSTRUCTIONS SUPPORTED: </p>
                    <ul className="list-disc px-4">
                        <li>ADD SUB SLLSLT SLTU XOR SRL SRA OR AND </li>
                        <li>ADDI SLTI SLTIU XORI ORI ANDI SLLI SRLI SRAI</li>
                        <li>SW SH SB</li>
                        <li>LW LH LHU LB LBU</li>
                        <li>BEQ BNE BLT BGE BLTU BGEU</li>
                        <li>JAL LUI AUIPC</li>

                    </ul>
                </div>

                <div className="">
                    <p>ADDRESS DECODING: </p>
                    <ul className="list-disc px-4">
                    <li>MEMORY:     0 - 399 </li>
                    <li>KEYBOARD:   400 - 499 </li>
                    <li>MONITOR:    500 - 599 </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
