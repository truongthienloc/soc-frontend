'use client'
import { Button } from '@mui/material'
import { Roboto } from 'next/font/google'
import { ChangeEvent, useState } from 'react'
import { cn } from '~/helpers/cn'
import Soc from '~/services/lib/SOCModels/SOC/SoC'
import CodeEditor from './CodeEditor'

const roboto = Roboto({ weight: '400', subsets: ['latin'] })

type Props = {
  socModel?: Soc
}

function DisassemblyPage({ socModel }: Props) {
  const [code, setCode] = useState('')
  const [result, setResult] = useState('')
  const handleChangeCode = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value

    const formatText = (inputValue: string) => {
      // Insert a line break after every 32 characters
      const filteredText = inputValue.replace(/[^01\n]/g, '')
      const formattedText = filteredText.replace(/(.{32})/g, '$1\n')
      return formattedText
    }
    // Split the input into words
    const formattedText = formatText(inputValue)

    const preFormattedText = formattedText.split(/\s+/).join('\n')

    setCode(preFormattedText)
    // setCode(inputValue)
  }

  const handleDisassembleClick = async () => {
    if (!socModel) return
    try {
      const data = socModel?.Disassembly.setBinaryCode(code).process()
      setResult(data.map((value) => value.split('\t')[1]).join('\n'))
    } catch (error) {
      // toast.error('Chuyển đổi thất bại')
    }
  }

  const handleCopyClick = () => {
    navigator.clipboard.writeText(result)
  }

  return (
    <div className="flex h-full w-full flex-1 flex-col gap-4 p-1 px-4">
      <div className="flex flex-1 flex-row gap-2">
        <div className="flex min-w-[300px] flex-1 flex-col">
          <div className="flex flex-row justify-between p-4">
            <h2 className="text-left text-xl">Input your binary machine code:</h2>
            <Button className="h-fit" variant="outlined" onClick={handleDisassembleClick}>
              Disassemble
            </Button>
          </div>
          <div className="flex h-full flex-col border border-black">
            <textarea
              className={cn('flex-1 resize-none p-4', roboto.className)}
              value={code}
              onChange={handleChangeCode}
            ></textarea>
          </div>
        </div>
        <div className="flex flex-1 flex-col">
          <div className="flex flex-row gap-4 p-4">
            <h2 className="text-left text-xl">Your code:</h2>
            <Button
              className="rounded border border-black px-3 py-1"
              variant="outlined"
              onClick={handleCopyClick}
            >
              Copy
            </Button>
          </div>
          <div className="flex h-full flex-col border border-black">
            <CodeEditor value={result} disable={true} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DisassemblyPage
