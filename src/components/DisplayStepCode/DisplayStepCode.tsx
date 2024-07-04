import React from 'react'
import clsx from 'clsx'

interface DisplayStepCodeProps {
	code?: string[]
	pc?: number
}

export default function DisplayStepCode({ code = [], pc = -1 }: DisplayStepCodeProps) {
	// console.log('length: ', code.length);
	// console.log('pc: ', pc)

	return (
		<div className='flex-1 min-w-[250px] max-h-[450px] text-base flex flex-col overflow-auto py-2 px-4 gap-2 font-mono'>
			{code &&
				code.map((value, index) => (
					<p
						className={clsx({
							'bg-highlight': index * 4 === pc,
						})}
						key={index}>
						[{index * 4}] {value}
					</p>
				))}
			<p
				className={clsx({
					'bg-highlight': code.length * 4 < pc,
				})}>
				[End]
			</p>
		</div>
	)
}