import React, { useEffect, useRef } from 'react'

import {
  keymap,
  highlightSpecialChars,
  drawSelection,
  highlightActiveLine,
  EditorView,
  KeyBinding
} from '@codemirror/view'
import { Extension, EditorState } from '@codemirror/state'
import { history, historyKeymap } from '@codemirror/history'
import { foldGutter, foldKeymap } from '@codemirror/fold'
import { indentOnInput } from '@codemirror/language'
import { lineNumbers, highlightActiveLineGutter } from '@codemirror/gutter'
import { defaultKeymap } from '@codemirror/commands'
import { bracketMatching } from '@codemirror/matchbrackets'
import { closeBrackets, closeBracketsKeymap } from '@codemirror/closebrackets'
import { searchKeymap, highlightSelectionMatches } from '@codemirror/search'
import { autocompletion, completionKeymap } from '@codemirror/autocomplete'
import { commentKeymap } from '@codemirror/comment'
import { rectangularSelection } from '@codemirror/rectangular-selection'
import { defaultHighlightStyle } from '@codemirror/highlight'
import { lintKeymap } from '@codemirror/lint'

export const CodeMirror = ({
  value: valueProp,
  onChange,
  extensions = [],
  keymap: extraKeymap = [],
  ...props
}: Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'value' | 'onChange' | 'extensions'
> & {
  value: string
  onChange?: (value: string) => void
  extensions?: Extension
  keymap?: readonly KeyBinding[]
}): JSX.Element => {
  const valueRef = useRef(valueProp)
  valueRef.current = valueProp

  const extensionsRef = useRef<Extension>(extensions)
  const extraKeymapRef = useRef<readonly KeyBinding[]>(extraKeymap)
  const animationFrameRef = useRef<number>(-1)
  const editorParentElRef = useRef<HTMLDivElement | null>(null)
  const editorRef = useRef<null | {
    view: EditorView
  }>(null)

  useEffect(() => {
    if (editorParentElRef.current !== null) {
      const editorView = new EditorView({
        state: EditorState.create({
          doc: valueRef.current,
          extensions: [
            lineNumbers(),
            highlightActiveLineGutter(),
            highlightSpecialChars(),
            history(),
            foldGutter(),
            drawSelection(),
            EditorState.allowMultipleSelections.of(true),
            indentOnInput(),
            defaultHighlightStyle.fallback,
            bracketMatching(),
            closeBrackets(),
            autocompletion(),
            rectangularSelection(),
            highlightActiveLine(),
            highlightSelectionMatches(),
            keymap.of([
              ...closeBracketsKeymap,
              ...defaultKeymap,
              ...searchKeymap,
              ...historyKeymap,
              ...foldKeymap,
              ...commentKeymap,
              ...completionKeymap,
              ...lintKeymap,
              ...extraKeymapRef.current
            ]),
            EditorView.theme({
              '&': { alignSelf: 'stretch', flex: '1 0 auto' }
            }),
            extensionsRef.current,
            EditorState.transactionExtender.of(({ newDoc }) => {
              const newValue = newDoc.toString()
              if (newValue !== valueRef.current) {
                onChange?.(newValue)
              }
              return null
            })
          ]
        }),
        parent: editorParentElRef.current
      })
      editorRef.current = {
        view: editorView
      }
    }

    return () => {
      cancelAnimationFrame(animationFrameRef.current)
      if (editorRef.current !== null) {
        editorRef.current.view.destroy()
        editorRef.current = null
      }
    }
  }, [editorParentElRef])

  return <div {...props} ref={editorParentElRef} />
}
