import React, { useState } from 'react'
import { Story, Meta } from '@storybook/react'
import { CodeMirrorLite } from '.'

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
      <div style={{ height: 400, display: 'flex' }}>
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
