import React from 'react'
import clsx from 'clsx'
import { cn } from '~/helpers/cn'

interface DisplayStepCodeProps {
  code?: string[]
  pc?: number
  breakpoints?: number[]
}

export default function DisplayStepCode({
  code = [],
  pc = -1,
  breakpoints = [],
}: DisplayStepCodeProps) {
  // console.log('length: ', code.length);
  console.log('pc: ', pc)

  return (
    <div className="flex max-h-[450px] min-w-[250px] flex-1 flex-col gap-2 overflow-auto px-4 py-2 font-mono text-base">
      {code &&
        code.map((value, index) => (
          <div className="flex flex-row items-center gap-1">
            <span
              className={cn('h-2 w-2 rounded-full', {
                'bg-red-500': breakpoints.includes(index + 1),
              })}
            ></span>
            <p
              className={clsx('flex-1', {
                'bg-yellow-500': index * 4 === pc,
              })}
              key={index}
            >
              [{index * 4}] {value}
            </p>
          </div>
        ))}
      <p
        className={clsx({
          'bg-yellow-500': code.length * 4 <= pc,
        })}
      >
        [End]
      </p>
    </div>
  )
}
