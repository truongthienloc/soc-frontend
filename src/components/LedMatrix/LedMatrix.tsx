import React, { memo } from 'react'

type Props = {
  rowCount?: number
  colCount?: number
}

const LedMatrix = memo(function LedMatrix({ rowCount = 96, colCount = 96 }: Props) {
  return (
    <div
      className="led-matrix grid h-fit grid-cols-[repeat(var(--col-count),_0.25rem)] justify-center gap-[1px]"
      style={{ '--col-count': colCount } as React.CSSProperties}
    >
      {Array.from(Array(colCount).keys()).map((row) =>
        Array.from(Array(rowCount).keys()).map((col) => (
          <div
            key={`${row}-${col}`}
            className="led-matrix__led h-1 w-1"
            id={`led-${row}-${col}`}
            data-coordinates={`(${row}, ${col})`}
            style={{ backgroundColor: 'gray' }}
          ></div>
        )),
      )}
    </div>
  )
})

export default LedMatrix
