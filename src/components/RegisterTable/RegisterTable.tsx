import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Paper from '@mui/material/Paper'
import React from 'react'
import clsx from 'clsx'
import { Registers, TwinRegister } from '~/types/register'
import { cn } from '~/helpers/cn'

type Props = {
    isShown: boolean
    data: TwinRegister[]
}

export default function RegisterTable({ data, isShown }: Props) {
    return (
        <TableContainer component={Paper} className={cn({ hidden: !isShown })}>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Register</TableCell>
                        <TableCell align="center">Value</TableCell>
                        <TableCell align="left">Register</TableCell>
                        <TableCell align="center">Value</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data &&
                        data.length > 0 &&
                        data.map((value, index) => (
                            <TableRow key={value.register1.name}>
                                <TableCell className="h-min" sx={{ paddingY: '0.25rem' }}>
                                    {value.register1.name}
                                </TableCell>
                                <TableCell className="h-min" align="center" sx={{ paddingY: '0.25rem' }}>
                                    {value.register1.value}
                                </TableCell>
                                <TableCell className="h-min" sx={{ paddingY: '0.25rem' }}>
                                    {value.register2.name}
                                </TableCell>
                                <TableCell className="h-min" align="center" sx={{ paddingY: '0.25rem' }}>
                                    {value.register2.value}
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
