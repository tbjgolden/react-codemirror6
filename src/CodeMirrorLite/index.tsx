import React, { useEffect, useRef } from 'react'
import { EditorView } from '@codemirror/view'
import { Extension, EditorState } from '@codemirror/state'

export const CodeMirrorLite = ({
  value: valueProp,
  onChange,
  extensions = [],
  ...props
}: Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'value' | 'onChange' | 'extensions'
> & {
  value: string
  onChange?: (value: string) => void
  extensions?: Extension
}): JSX.Element => {
  const valueRef = useRef(valueProp)
  valueRef.current = valueProp

  const extensionsRef = useRef<Extension>(extensions)
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
