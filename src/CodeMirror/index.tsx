import React from 'react'

import {
  keymap,
  highlightSpecialChars,
  drawSelection,
  highlightActiveLine,
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
import { CodeMirrorLite } from '../CodeMirrorLite'

export const CodeMirror = ({
  value,
  onChange,
  extensions = [],
  keymap: extraKeymap = [],
  ...props
}: Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'value' | 'onChange' | 'extensions' | 'keymap'
> & {
  value: string
  onChange?: (value: string) => void
  extensions?: Extension
  keymap?: readonly KeyBinding[]
}): JSX.Element => {
  return (
    <CodeMirrorLite
      value={value}
      onChange={onChange}
      extensions={[
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
          ...extraKeymap
        ]),
        extensions
      ]}
      {...props}
    />
  )
}
