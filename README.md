# `react-codemirror6`

[![npm version](https://img.shields.io/npm/v/react-codemirror6.svg?style=flat-square)](https://www.npmjs.com/package/react-codemirror6)
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/tbjgolden/react-codemirror6/Release?style=flat-square)](https://github.com/tbjgolden/react-codemirror6/actions?query=workflow%3ARelease)

> **A wrapper around CodeMirror 6 so it behaves like a controlled input**

## Demo

https://tbjgolden.github.io/react-codemirror6/

## Installation

```sh
npm install react-codemirror6 --save
# yarn add react-codemirror6
```

This library also contains [web builds](#browser).

## Usage

```tsx
import ReactDOM from 'react-dom'
import React, { useState, useEffect } from 'react'

import { CodeMirror } from 'react-codemirror6'

const App = () => {
  const [value, setValue] = useState('')

  useEffect(() => {
    console.log({ value })
  }, [value])

  return (
    <div style={{ height: 400, display: 'flex' }}>
      <CodeMirror
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: '1 0 auto'
        }}
        value={value}
        onChange={setValue}
        extensions={
          [
            // theme, language, ...
          ]
        }
      />
    </div>
  )
}

ReactDOM.render(<App />, document.querySelector('#root'))
```

## Lite Version

There is a 'lite' version without the (useful!) stuff added from
@codemirror/basic-setup.

```tsx
// esm (webpack)
import { CodeMirrorLite as CodeMirror } from 'react-codemirror6/dist/lite.esm'
// cjs (old-style node)
import { CodeMirrorLite as CodeMirror } from 'react-codemirror6/dist/lite'
// web
// <script src="https://unpkg.com/react-codemirror6/dist/lite.umd.js"></script>
```

## Browser Usage

```html
<!DOCTYPE html>
<html>
  <body>
    <div id="root"></div>
    <script src="https://unpkg.com/react/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/react-codemirror6/dist/index.umd.js"></script>
    <script>
      const App = () => {
        const [value, setValue] = React.useState('')

        React.useEffect(() => {
          console.log({ value })
        }, [value])

        return React.createElement(
          'div',
          {
            style: { height: 400, display: 'flex' }
          },
          React.createElement(ReactCodeMirror.CodeMirror, {
            style: {
              display: 'flex',
              flexDirection: 'column',
              flex: '1 0 auto'
            },
            value,
            onChange: setValue,
            extensions: [
              // theme, language, ...
            ]
          })
        )
      }

      ReactDOM.render(React.createElement(App), document.querySelector('#root'))
    </script>
  </body>
</html>
```

## Extending functionality

CodeMirror 6 is very powerful, but it exposes a granular API (but a powerful
one!).

For many, the configuration is likely to be a barrier to entry, which is why
this library exists.

You can extend functionality with extensions and keymaps, which in theory allows
total flexibility, but this library does not allow you to imperatively access
the view or state.

## Tips

A dynamic set of extensions is beyond the scope of this project. The component
does not track changes to the extensions or keymap properties. If you'd like to
change these dynamically, you will want to unmount and remount the component.

## License

MIT

<!-- Original starter readme: https://github.com/tbjgolden/create-typescript-react-library -->
