import React from 'react'

type Props = {
  rowCount?: number
  colCount?: number
}

export default function LedMatrix({ rowCount = 96, colCount = 96 }: Props) {
  // const array = Array.from(Array(10).keys())
  // console.log('array: ', array);

  return (
    <div
      className="led-matrix mt-4 grid grid-cols-[repeat(var(--col-count),_0.25rem)] justify-center gap-[1px]"
      style={{ '--col-count': colCount } as React.CSSProperties}
    >
      {Array.from(Array(colCount).keys()).map((row) =>
        Array.from(Array(rowCount).keys()).map((col) => (
          <div
            key={`${row}-${col}`}
            className="led-matrix__led h-1 w-1"
            id={`led-${row}-${col}`}
            style={{ backgroundColor: 'gray' }}
          ></div>
        )),
      )}
    </div>
  )
}
