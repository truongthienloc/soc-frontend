'use client'

import dynamic from 'next/dynamic'
import { useRef, useEffect, useCallback, useLayoutEffect } from 'react'
import { defineMode } from '~/services/codemirror'
// import CodeMirror from 'codemirror'
// import 'codemirror/addon/mode/simple'

interface CodeEditorProps {
  value?: string
  onChange?: (value: string) => void
  disable?: boolean
  hidden?: boolean
}

function CodeEditor({ value = '', onChange, disable = false, hidden }: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const codeRef = useRef<CodeMirror.EditorFromTextArea>()
  const isStart = useRef<boolean>(true)

  const createCodeEditor = useCallback(async () => {
    await import('codemirror/addon/mode/simple')
    if (codeRef.current) {
      return
    }

    const CodeMirror = (await import('codemirror')).default

    defineMode(CodeMirror)

    if (!textareaRef.current || !containerRef.current) {
      return
    }

    const code = CodeMirror.fromTextArea(textareaRef.current, {
      mode: 'risc-v',
      theme: 'codewars',
      lineNumbers: true,
    })
    codeRef.current = code

    code.setSize('100%', '100%')

    code.on('change', (ins) => {
      onChange?.(ins.getValue())
    })
  }, [value])

  useEffect(() => {
    if (isStart.current && !hidden) {
      isStart.current = false
      createCodeEditor()
    }
  }, [createCodeEditor, hidden])

  useEffect(() => {
    if (!codeRef.current) {
      return
    }

    if (disable || hidden) {
      if (textareaRef.current?.style.display === 'none') {
        codeRef.current.setValue(value)
      }
    } else {
      codeRef.current.refresh()
    }
  }, [value, disable, hidden])

  return (
    <div ref={containerRef} className="h-full min-h-[300px] min-w-[250px] flex-1 text-base">
      <textarea
        ref={textareaRef}
        name="code-editor"
        id="code-editor"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disable}
      ></textarea>
    </div>
  )
}

export default CodeEditor
