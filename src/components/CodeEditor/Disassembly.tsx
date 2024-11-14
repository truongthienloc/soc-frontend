import { ChangeEvent, useState } from 'react'
import { Button } from '@mui/material'
import Link from 'next/link'
import CodeEditor from './CodeEditor'
import { toast } from 'react-toastify'

function DisassemblyPage() {
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

  // const handleDisassembleClick = async () => {
  // 	try {
  // 		const data = await toast.promise(codeAPI.disassemble(code), {
  // 			pending: 'Đang chuyển đổi code',
  // 			success: 'Chuyển đổi thành công',
  // 			error: 'Chuyển đổi thất bại',
  // 		})

  // 		console.log('data: ', data)
  // 		setResult(data.join('\n'))
  // 	} catch (error) {
  // 		// toast.error('Chuyển đổi thất bại')
  // 	}
  // }

  const handleCopyClick = () => {
    navigator.clipboard.writeText(result)
  }

  return (
    <div className="flex h-full w-full flex-1 flex-col gap-4 p-1 px-4">
      <div className="flex flex-1 flex-row gap-2">
        <div className="flex min-w-[300px] flex-1 flex-col">
          <div className="flex flex-row justify-between p-4">
            <h2 className="text-left text-xl">Input your binary machine code here:</h2>
            <Button
              className="h-fit"
              variant="outlined"
              // onClick={handleDisassembleClick}
            >
              Disassemble
            </Button>
          </div>
          <div className="flex h-full flex-col border border-black">
            <textarea
              className="flex-1 resize-none p-4"
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
          <div className="flex flex-col border border-black">
            <CodeEditor value={result} disable={true} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DisassemblyPage
