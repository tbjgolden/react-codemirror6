import React, { useEffect, useRef } from 'react'
import { EditorView } from '@codemirror/view'
import { Extension, EditorState, Transaction } from '@codemirror/state'

const noop = () => {
  // noop
}

export const CodeMirrorLite = ({
  value: valueProp,
  onChange: onChangeProp,
  extensions = [],
  onViewChange: onViewChangeProp = noop,
  ...props
}: Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'value' | 'onChange' | 'extensions'
> & {
  value: string
  onChange?: (value: string) => void
  onViewChange?: (view: EditorView | null) => void
  extensions?: Extension
}): JSX.Element => {
  // This ref is needed to allow changes to prevent binding the
  // initial value to the EditorView init effect, to allow
  // the new value to be the starting value when reinitialized
  const valueRef = useRef(valueProp)
  valueRef.current = valueProp

  // This ref is needed to allow changes to the onChange prop
  // without reinitializing the EditorView
  const onChangeRef = useRef(onChangeProp)
  onChangeRef.current = onChangeProp

  // This ref is needed to allow changes to the onViewChange prop
  // without reinitializing the EditorView
  const onViewChangeRef = useRef(onViewChangeProp)
  onViewChangeRef.current = onViewChangeProp

  // This ref is to ensure the extensions object is not changed
  // - changing the extensions requires the user to fully unmount
  // this whole component and mount it again with updated values.
  // Handling extension changes is out of scope for this wrapper!
  const extensionsRef = useRef<Extension>(extensions)

  // This ref tracks the parent HTML el
  const editorParentElRef = useRef<HTMLDivElement | null>(null)

  // This ref contains the CodeMirror EditorView instance
  const editorRef = useRef<null | {
    view: EditorView
  }>(null)

  // This ref is used to store pending changes, which enables
  // controlled input behavior.
  const changeHandlerRef = useRef<null | ((newValue: string) => boolean)>(null)

  useEffect(() => {
    if (editorParentElRef.current !== null) {
      let view: EditorView | undefined = undefined
      const state: EditorState = EditorState.create({
        doc: valueRef.current,
        extensions: [
          EditorView.theme({
            '&': { alignSelf: 'stretch', flex: '1 0 auto' }
          }),
          extensionsRef.current,
          EditorState.transactionFilter.of((tr: Transaction) => {
            const editorView = view
            if (editorView !== undefined) {
              const prevDoc = editorView.state.doc.toString()
              const nextDoc = tr.newDoc.toString()
              if (prevDoc === nextDoc) {
                return tr
              } else {
                changeHandlerRef.current = (newValue: string) => {
                  changeHandlerRef.current = null
                  if (newValue === nextDoc) {
                    editorView.dispatch(
                      editorView.state.update({
                        changes: tr.changes,
                        selection: tr.selection,
                        effects: tr.effects,
                        scrollIntoView: tr.scrollIntoView,
                        filter: false
                      })
                    )
                    return true
                  } else {
                    return false
                  }
                }
                onChangeRef.current?.(nextDoc)
                return []
              }
            } else {
              return []
            }
          })
        ]
      })
      view = new EditorView({
        state,
        parent: editorParentElRef.current
      })
      onViewChangeRef.current?.(view)
      editorRef.current = {
        view
      }
    }

    return () => {
      if (editorRef.current !== null) {
        editorRef.current.view.destroy()
        editorRef.current = null
        onViewChangeRef.current?.(null)
      }
    }
  }, [editorParentElRef])

  useEffect(() => {
    const changeHandler = changeHandlerRef.current
    const handledChange = changeHandler?.(valueProp)
    if (handledChange !== true && editorRef.current !== null) {
      editorRef.current.view.dispatch(
        editorRef.current.view.state.update({
          changes: {
            from: 0,
            to: editorRef.current.view.state.doc.toString().length,
            insert: valueProp
          },
          filter: false
        })
      )
    }
  }, [valueProp])

  return <div {...props} ref={editorParentElRef} />
}
