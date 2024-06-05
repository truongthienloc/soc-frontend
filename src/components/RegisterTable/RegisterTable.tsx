import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Paper from '@mui/material/Paper'
import React from 'react'
import clsx from 'clsx'
import { Registers } from '~/types/register'
import { cn } from '~/helpers/cn'

type Props = {
    isShown: boolean
    data: Registers
}

export default function RegisterTable({ data, isShown }: Props) {
    return (
        <TableContainer component={Paper} className={cn({ hidden: !isShown })}>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Register</TableCell>
                        <TableCell align="center">Hex</TableCell>
                        {/* <TableCell align='center'>Register</TableCell>
						<TableCell align='center'>Hex</TableCell> */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data &&
                        data.length > 0 &&
                        data.map((value, index) => (
                            <TableCell>
                                <TableCell>{value.name}</TableCell>
                                <TableCell>{value.value}</TableCell>
                            </TableCell>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
