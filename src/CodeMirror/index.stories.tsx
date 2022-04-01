import React, { useState } from 'react'
import { Story, Meta } from '@storybook/react'
import { CodeMirror } from '.'
import { action } from '@storybook/addon-actions'
import { oneDark } from '@codemirror/theme-one-dark'
export default {
  component: CodeMirror,
  title: 'Components/CodeMirror'
} as Meta

const PrimaryWrapper: Story<Parameters<typeof CodeMirror>[0]> = (args) => {
  const [value, setValue] = useState('')

  return (
    <>
      <CodeMirror {...args} value={value} onChange={setValue} />
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

const BiggerWrapper: Story<Parameters<typeof CodeMirror>[0]> = (args) => {
  const [value, setValue] = useState('')

  return (
    <>
      <div style={{ height: 200, display: 'flex' }}>
        <CodeMirror
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

const ControlledWrapper: Story<Parameters<typeof CodeMirror>[0]> = (args) => {
  const [value, setValue] = useState(
    'this text should not change itself when typing'
  )

  return (
    <>
      <div style={{ height: 400, display: 'flex' }}>
        <CodeMirror
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: '1 0 auto'
          }}
          value={value}
          onChange={action('onChange')}
          extensions={
            [
              // theme, language, ...
            ]
          }
        />
      </div>
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

const AddExtensionSampleWrapper: Story<Parameters<typeof CodeMirror>[0]> = (
  args
) => {
  const [value, setValue] = useState(
    'This text editor should use oneDark as its theme'
  )

  return (
    <>
      <div style={{ height: 400, display: 'flex' }}>
        <CodeMirror
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

export const AddExtensionSample = AddExtensionSampleWrapper.bind({})