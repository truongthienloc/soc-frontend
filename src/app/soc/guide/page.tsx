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
                <h1 className="text-center text-4xl">Hướng dẫn</h1>
                <div className="">
                    <p>Các lệnh hỗ trợ:</p>
                    <ul className="list-disc px-4">
                        <li>addi</li>
                        <li>add</li>
                        <li>li</li>
                    </ul>
                </div>

                <div className="">
                    <p>Cách sử dụng bàn phím/màn hình:</p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit eveniet autem
                        consequuntur amet eius eum consectetur nesciunt, incidunt aperiam, vel
                        obcaecati ipsa quam corporis dicta provident magni aliquid quos mollitia?
                    </p>
                </div>
            </div>
        </div>
    )
}
