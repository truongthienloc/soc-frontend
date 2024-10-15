import short from 'short-uuid';
import { TLBEntry } from '~/hooks/tlb/useTLB'

/** pageNumber, physicalAddress, timestamp, valid */
type TLBEntries = [number, number, number, number]

type TLB = {
    p0: TLBEntries
    p1: TLBEntries
    p2: TLBEntries
    p3: TLBEntries
    p4: TLBEntries
    p5: TLBEntries
    p6: TLBEntries
    p7: TLBEntries
}

/**
 * Converts an array of TLBEntry objects to an array of [pageNumber, physicalAddress, timestamp, valid] arrays.
 * This function is used to convert the TLB data from the UI format to the format used in the MMU.
 * @param tlb The array of TLBEntry objects to convert.
 * @returns An array of [pageNumber, physicalAddress, valid, timestamp] arrays.
 */
export function tlb2Array(tlb: TLBEntry[]): TLBEntries[] {
    const array: TLBEntries[] = []
    for (const entry of tlb) {
        array.push([
            parseInt(entry.pageNumber, 16),
            parseInt(entry.physicalAddress, 16),
            parseInt(entry.valid, 16),
            parseInt(entry.timestamp, 16),
        ])
    }
    return array
}

export function array2TLB(array: TLBEntries[]): TLBEntry[] {
    const tlb: TLBEntry[] = []
    for (const entry of array) {
        tlb.push({
            id: short.generate(),
            pageNumber: entry[0].toString(16),
            physicalAddress: entry[1].toString(16),
            valid: entry[2].toString(16),
            timestamp: entry[3].toString(16),
        })
    }
    return tlb
}

export function tlbEntries2TLB(tlbEntries: TLBEntries[]): TLB {
    const tlb: TLB = {
        p0: tlbEntries[0],
        p1: tlbEntries[1],
        p2: tlbEntries[2],
        p3: tlbEntries[3],
        p4: tlbEntries[4],
        p5: tlbEntries[5],
        p6: tlbEntries[6],
        p7: tlbEntries[7],
    }
    return tlb
}
