// Core plugins
import { babel } from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'

// 3rd party plugins
import { terser } from 'rollup-plugin-terser'

// Helpers
import dedent from 'dedent'
import pkg from '../package.json'
import { hasAddedReact } from './state.json'

const browserGlobals = {
  'react-dom': 'ReactDOM',
  'react': 'React',
  'lodash': '_',
  'underscore': '_',
  'jquery': '$'
}

const getExternal = (bundleType, isLite = false) => {
  const peerDependencies = Object.keys(pkg.peerDependencies || {})
  const dependencies = Object.keys(pkg.dependencies)

  const makeExternalPredicate = (externals) => {
    if (externals.length === 0) {
      return () => false
    } else {
      const pattern = new RegExp(`^(${externals.join('|')})($|/)`)
      return (id) => pattern.test(id)
    }
  }

  switch (bundleType) {
    case 'CJS_DEV':
    case 'CJS_PROD':
    case 'ES':
      return makeExternalPredicate([
        ...peerDependencies,
        ...(isLite
          ? ['@babel/runtime', '@codemirror/state', '@codemirror/view']
          : dependencies)
      ])
    default:
      return makeExternalPredicate(peerDependencies)
  }
}

const getPlugins = (bundleType) => [
  nodeResolve(),
  commonjs({
    include: 'node_modules/**'
  }),
  babel({
    babelrc: false,
    exclude: 'node_modules/**',
    presets: [
      ['@babel/env', { loose: true, modules: false }],
      ...(hasAddedReact ? ['@babel/react'] : [])
    ],
    plugins: ['@babel/transform-runtime'],
    babelHelpers: 'runtime'
  }),
  json(),
  bundleType === 'UMD_PROD' &&
    terser({
      output: { comments: false },
      compress: {
        keep_infinity: true,
        pure_getters: true
      },
      warnings: true,
      ecma: 5,
      toplevel: false
    })
]

const license =
  dedent(`
    /*! @license ReactCodeMirror - MIT License - Tom Golden (8162045+tbjgolden@users.noreply.github.com) */
  `) + '\n'

export default [
  {
    input: './compiled/index.js',
    external: getExternal('CJS_DEV'),
    output: {
      banner: license,
      file: pkg.main,
      format: 'cjs',
      sourcemap: true
    },
    plugins: getPlugins('CJS_DEV')
  },
  {
    input: './compiled/index.js',
    external: getExternal('ES'),
    output: {
      banner: license,
      file: pkg.module,
      format: 'es',
      sourcemap: true
    },
    plugins: getPlugins('ES')
  },
  {
    input: './compiled/index.js',
    external: getExternal('UMD_PROD'),
    output: {
      banner: license,
      file: pkg.umd,
      format: 'umd',
      globals: Object.keys(pkg.peerDependencies || {}).reduce(
        (dependencyNameMap, npmDependency) => ({
          ...dependencyNameMap,
          [npmDependency]:
            browserGlobals[npmDependency] ||
            ((npmDependency) => {
              const pascal = npmDependency
                .split('-')
                .map((str) =>
                  str.length > 0 ? str[0].toUpperCase() + str.slice(1) : ''
                )
                .join('')
              console.warn(
                dedent(`
                  Blindly guessing that the browser global (i.e. window.<NAME>) for npm package...
                    "${npmDependency}"
                  ...is...
                    "${pascal}"

                  To fix this message
                    '${npmDependency}': '<NAME>',
                  to 'browserGlobals' in rollup.config.js
                `)
              )
              return pascal
            })()
        }),
        {}
      ),
      name: 'ReactCodeMirror',
      sourcemap: true
    },
    plugins: getPlugins('UMD_PROD')
  },
  {
    input: './compiled/lite.js',
    external: getExternal('CJS_DEV'),
    output: {
      banner: license,
      file: pkg.main.replace('index', 'lite'),
      format: 'cjs',
      sourcemap: true
    },
    plugins: getPlugins('CJS_DEV')
  },
  {
    input: './compiled/lite.js',
    external: getExternal('ES'),
    output: {
      banner: license,
      file: pkg.module.replace('index', 'lite'),
      format: 'es',
      sourcemap: true
    },
    plugins: getPlugins('ES')
  },
  {
    input: './compiled/lite.js',
    external: getExternal('UMD_PROD'),
    output: {
      banner: license,
      file: pkg.umd.replace('index', 'lite'),
      format: 'umd',
      globals: Object.keys(pkg.peerDependencies || {}).reduce(
        (dependencyNameMap, npmDependency) => ({
          ...dependencyNameMap,
          [npmDependency]:
            browserGlobals[npmDependency] ||
            ((npmDependency) => {
              const pascal = npmDependency
                .split('-')
                .map((str) =>
                  str.length > 0 ? str[0].toUpperCase() + str.slice(1) : ''
                )
                .join('')
              console.warn(
                dedent(`
                  Blindly guessing that the browser global (i.e. window.<NAME>) for npm package...
                    "${npmDependency}"
                  ...is...
                    "${pascal}"

                  To fix this message
                    '${npmDependency}': '<NAME>',
                  to 'browserGlobals' in rollup.config.js
                `)
              )
              return pascal
            })()
        }),
        {}
      ),
      name: 'ReactCodeMirror',
      sourcemap: true
    },
    plugins: getPlugins('UMD_PROD')
  }
]
