export const INSTRUCTION_POINT = '0'
export const PAGE_TABLE_POINT = '3000'
export const DATA_POINT = '4000'
export const PERIPHERAL_POINT = '1C000'

export const MEMORY_SECTION = [
    {
        name: 'Memory Address',
        start: INSTRUCTION_POINT,
        end: undefined,
    },
    {
        name: 'INSTRUCTION',
        start: INSTRUCTION_POINT,
        end: PAGE_TABLE_POINT,
    },
    {
        name: 'PAGE_TABLE',
        start: PAGE_TABLE_POINT,
        end: DATA_POINT,
    },
    {
        name: 'DATA',
        start: DATA_POINT,
        end: PERIPHERAL_POINT,
    },
    {
        name: 'PERIPHERAL',
        start: PERIPHERAL_POINT,
        end: undefined,
    },
]
