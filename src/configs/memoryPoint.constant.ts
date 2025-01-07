export const LMPOINT = '0'
export const IOPOINT = '480'
export const IMEMPOINT = '4C0'
export const DMEMPOINT = '14C0'
export const STACKPOINT = '114C0'

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
