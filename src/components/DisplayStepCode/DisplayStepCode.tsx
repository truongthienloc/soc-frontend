import React from 'react'
import clsx from 'clsx'

interface DisplayStepCodeProps {
    code?: string[]
    pc?: number
}

export default function DisplayStepCode({ code = [], pc = -1 }: DisplayStepCodeProps) {
    // console.log('length: ', code.length);
    console.log('pc: ', pc)

    return (
        <div className="flex max-h-[450px] min-w-[250px] flex-1 flex-col gap-2 overflow-auto px-4 py-2 font-mono text-base">
            {code &&
                code.map((value, index) => (
                    <p
                        className={clsx({
                            'bg-yellow-500': index * 4 === pc,
                        })}
                        key={index}
                    >
                        [{index * 4}] {value}
                    </p>
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
