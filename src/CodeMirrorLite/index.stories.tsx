import React, { useState } from 'react'
import { Story, Meta } from '@storybook/react'
import { CodeMirrorLite } from '.'
import { action } from '@storybook/addon-actions'
import { oneDark } from '@codemirror/theme-one-dark'
import { EditorView } from '@codemirror/view'

export default {
  component: CodeMirrorLite,
  title: 'Components/CodeMirrorLite'
} as Meta

const PrimaryWrapper: Story<Parameters<typeof CodeMirrorLite>[0]> = (args) => {
  const [value, setValue] = useState('')

  return (
    <>
      <CodeMirrorLite {...args} value={value} onChange={setValue} />
      input ↑ (invisible without extensions)
      <br />
      <br />
      <button
        onClick={() => {
          setValue(
            new Array(5)
              .fill(0)
              .map(() => Math.random().toString().slice(2))
              .join('\n')
          )
        }}
      >
        change to random value
      </button>
      <br />
      <br />
      value:
      <pre>
        <code>{value}</code>
      </pre>
      <style
        dangerouslySetInnerHTML={{
          __html: 'pre{margin-top:0;background:#eee;padding:16px}'
        }}
      />
    </>
  )
}

export const Primary = PrimaryWrapper.bind({})

const BiggerWrapper: Story<Parameters<typeof CodeMirrorLite>[0]> = (args) => {
  const [value, setValue] = useState('')

  return (
    <>
      <div style={{ height: 200, display: 'flex' }}>
        <CodeMirrorLite
          {...args}
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: '1 0 auto'
          }}
          value={value}
          onChange={setValue}
        />
      </div>
      input ↑ (invisible without extensions)
      <br />
      <br />
      <button
        onClick={() => {
          setValue(
            new Array(5)
              .fill(0)
              .map(() => Math.random().toString().slice(2))
              .join('\n')
          )
        }}
      >
        change to random value
      </button>
      <br />
      <br />
      value:
      <pre>
        <code>{value}</code>
      </pre>
      <style
        dangerouslySetInnerHTML={{
          __html: 'pre{margin-top:0;background:#eee;padding:16px}'
        }}
      />
    </>
  )
}

export const Bigger = BiggerWrapper.bind({})

const ControlledWrapper: Story<Parameters<typeof CodeMirrorLite>[0]> = (
  args
) => {
  const [value, setValue] = useState(
    'This one has no onChange;\nshowing the controlled behavior'
  )

  return (
    <>
      <div style={{ height: 200, display: 'flex' }}>
        <CodeMirrorLite
          {...args}
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: '1 0 auto'
          }}
          value={value}
          onChange={action('onChange')}
        />
      </div>
      input ↑ (invisible without extensions)
      <br />
      <br />
      <button
        onClick={() => {
          setValue(
            new Array(5)
              .fill(0)
              .map(() => Math.random().toString().slice(2))
              .join('\n')
          )
        }}
      >
        change to random value
      </button>
      <br />
      <br />
      value:
      <pre>
        <code>{value}</code>
      </pre>
      <style
        dangerouslySetInnerHTML={{
          __html: 'pre{margin-top:0;background:#eee;padding:16px}'
        }}
      />
    </>
  )
}

export const Controlled = ControlledWrapper.bind({})

const PlusExtensionWrapper: Story<Parameters<typeof CodeMirrorLite>[0]> = (
  args
) => {
  const [value, setValue] = useState(
    'This text editor should use oneDark as its theme'
  )

  return (
    <>
      <div style={{ height: 200, display: 'flex' }}>
        <CodeMirrorLite
          {...args}
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: '1 0 auto'
          }}
          value={value}
          onChange={setValue}
          extensions={[oneDark]}
        />
      </div>
      <br />
      <br />
      <button
        onClick={() => {
          setValue(
            new Array(5)
              .fill(0)
              .map(() => Math.random().toString().slice(2))
              .join('\n')
          )
        }}
      >
        change to random value
      </button>
      <br />
      <br />
      value:
      <pre>
        <code>{value}</code>
      </pre>
      <style
        dangerouslySetInnerHTML={{
          __html: 'pre{margin-top:0;background:#eee;padding:16px}'
        }}
      />
    </>
  )
}

export const PlusExtension = PlusExtensionWrapper.bind({})

const OnViewChangeWrapper: Story<Parameters<typeof CodeMirrorLite>[0]> = (
  args
) => {
  const [editorView, setEditorView] = useState<EditorView | null>(null)
  const [value, setValue] = useState('Lorem ipsum dolor sit amet')

  // Note: cache should not be re-used by repeated calls to JSON.stringify.
  const cache = new Set<unknown>()
  const str =
    editorView === null
      ? 'null'
      : JSON.stringify(
          editorView,
          (_, value) => {
            if (typeof value === 'object' && value !== null) {
              if (cache.has(value)) return
              cache.add(value)
            }
            return value
          },
          2
        )
  cache.clear()

  return (
    <>
      <div style={{ height: 200, display: 'flex' }}>
        <CodeMirrorLite
          {...args}
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: '1 0 auto'
          }}
          value={value}
          onChange={setValue}
          onViewChange={(view) => {
            setEditorView(view)
          }}
        />
      </div>
      input ↑ (invisible without extensions)
      <br />
      <br />
      <button
        onClick={() => {
          setValue(
            new Array(5)
              .fill(0)
              .map(() => Math.random().toString().slice(2))
              .join('\n')
          )
        }}
      >
        change to random value
      </button>
      <br />
      <br />
      value:
      <pre>
        <code>{value}</code>
      </pre>
      editorView:
      <pre>
        <code>{editorView === null ? 'null' : str}</code>
      </pre>
      <style
        dangerouslySetInnerHTML={{
          __html:
            'pre{margin-top:0;background:#eee;padding:16px;overflow-x:auto}'
        }}
      />
    </>
  )
}

export const OnViewChange = OnViewChangeWrapper.bind({})
