'use client'

import { useRef, useEffect, useCallback } from 'react'
import useBreakpointManagement, {
  applyBreakpointsToEditor,
} from '~/hooks/code-editor/useBreakpointManagement'
import { defineMode } from '~/services/codemirror'

interface CodeEditorProps {
  value?: string
  onChange?: (value: string) => void
  disable?: boolean
  hidden?: boolean
  breakpoints?: number[]
  setBreakpoints?: React.Dispatch<React.SetStateAction<number[]>>
}

function CodeEditor({
  value = '',
  onChange,
  disable = false,
  hidden,
  breakpoints,
  setBreakpoints,
}: CodeEditorProps) {
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

    const editor = CodeMirror.fromTextArea(textareaRef.current, {
      mode: 'risc-v',
      theme: 'codewars',
      lineNumbers: true,
      gutters: ['breakpoints'],
    })
    codeRef.current = editor

    /** Breakpoint Listener */
    editor.on('gutterClick', function (instance, line) {
      const info = instance.lineInfo(line)
      const hasBreakpoint = info.gutterMarkers && info.gutterMarkers.breakpoints
      if (hasBreakpoint) {
        setBreakpoints?.((prev) => prev.filter((l) => l !== line))
      } else {
        setBreakpoints?.((prev) => [...prev, line])
      }
    })

    /** Initialize breakpoints */
    if (breakpoints) {
      applyBreakpointsToEditor(editor, breakpoints)
    }

    editor.setSize('100%', '100%')

    editor.on('change', (ins) => {
      onChange?.(ins.getValue())
    })
  }, [value, breakpoints])

  useBreakpointManagement({ breakpoints, editor: codeRef.current, hidden })

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
      console.log('codeRef.current.refresh: ', codeRef.current)
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
