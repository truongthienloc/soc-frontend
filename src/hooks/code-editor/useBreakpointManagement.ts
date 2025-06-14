import CodeMirror from 'codemirror'
import { useEffect } from 'react'

type Props = {
    breakpoints?: number[]
    editor?: CodeMirror.EditorFromTextArea
    hidden?: boolean
}

export default function useBreakpointManagement({ breakpoints, editor, hidden }: Props) {
    useEffect(() => {
        if (!breakpoints) {
            return
        }
        if (!editor) {
            return
        }
        if (hidden) {
            return
        }

        applyBreakpointsToEditor(editor, breakpoints)
    }, [breakpoints, editor, hidden])
}

function makeMarker() {
    const marker = document.createElement('div')
    marker.style.color = '#822'
    marker.innerHTML = '●'
    return marker
}

function clearAllBreakpointsInEditor(editor: CodeMirror.EditorFromTextArea) {
    for (let i = 0; i < editor.lineCount(); i++) {
        editor.setGutterMarker(i, 'breakpoints', null)
    }
}

function createBreakpointsInEditor(editor: CodeMirror.EditorFromTextArea, breakpoints: number[]) {
    breakpoints.forEach((line) => {
        editor.setGutterMarker(line, 'breakpoints', makeMarker())
    })
}

export function applyBreakpointsToEditor(
    editor: CodeMirror.EditorFromTextArea,
    breakpoints: number[],
) {
    editor.operation(() => {
        clearAllBreakpointsInEditor(editor)
        createBreakpointsInEditor(editor, breakpoints)
    })
}
