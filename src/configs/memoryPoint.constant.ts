export const LMPOINT = '0'
export const IOPOINT = '180'
export const IMEMPOINT = '1C0'
export const DMEMPOINT = '11C0'
export const STACKPOINT = '111C0'

export const MEMORY_SECTION = [
    {
        name: 'Memory Address',
        start: LMPOINT,
        end: undefined,
    },
    {
        name: 'LM',
        start: LMPOINT,
        end: IOPOINT,
    },
    {
        name: 'IO',
        start: IOPOINT,
        end: IMEMPOINT,
    },
    {
        name: 'IMEM',
        start: IMEMPOINT,
        end: DMEMPOINT,
    },
    {
        name: 'DMEM',
        start: DMEMPOINT,
        end: STACKPOINT,
    },
    {
        name: 'STACK',
        start: STACKPOINT,
        end: undefined,
    },
]
