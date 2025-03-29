'use client'

import dynamic from 'next/dynamic'
import { useRef, useEffect, useCallback } from 'react'
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

  const handleContainerResize = useCallback(() => {
    // console.log('Resizing container');
    if (!containerRef.current || !codeRef.current) {
      return
    }

    // const width = containerRef.current.clientWidth
    // const height = containerRef.current.clientHeight

    // console.log("width=" + width + " height=" + height);

    // codeRef.current.setSize(width, height)
  }, [])

  const createCodeEditor = useCallback(async () => {
    await import('codemirror/addon/mode/simple')
    if (codeRef.current) {
      return
    }

    const CodeMirror = (await import('codemirror')).default
    // console.log(CodeMirror.defineMode);

    defineMode(CodeMirror)

    if (!textareaRef.current || !containerRef.current) {
      return
    }

    // const interval = setInterval(() => {
    //   console.log('textarea display: ', textareaRef.current?.style.display);

    //   if (textareaRef.current?.style.display === 'none') {
    //     // debugger
    //     clearInterval(interval)
    //     codeRef.current?.setValue(value)
    //   }
    // }, 1000)

    const code = CodeMirror.fromTextArea(textareaRef.current, {
      mode: 'risc-v',
      // mode: 'javascript',
      theme: 'codewars',
      lineNumbers: true,
    })
    codeRef.current = code

    // code.setOption('readOnly', disable)

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

    window.addEventListener('resize', handleContainerResize)

    return () => {
      window.removeEventListener('resize', handleContainerResize)
    }
  }, [handleContainerResize, createCodeEditor, hidden])

  // useEffect(() => {
  //   if (codeRef.current) {
  //     codeRef.current.setOption('readOnly', disable)
  //   }
  // }, [disable])

  useEffect(() => {
    if (codeRef.current && disable) {
      if (textareaRef.current?.style.display === 'none') {
        codeRef.current.setValue(value)
      }
    }
  }, [value])

  return (
    <div
      ref={containerRef}
      className="h-full min-h-[300px] min-w-[250px] flex-1 text-base"
      onResize={handleContainerResize}
    >
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
