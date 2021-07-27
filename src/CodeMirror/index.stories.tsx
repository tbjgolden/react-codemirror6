import React, { useState } from 'react'
import { Story, Meta } from '@storybook/react'
import { CodeMirror } from '.'

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
      <div style={{ height: 400, display: 'flex' }}>
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
