import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import typescript from "rollup-plugin-typescript2";
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'

import Editor from '../../packages/editor-react/package.json';
import Core from '../../packages/core/package.json';
import { minifyConfig } from '../../build/minification.js'

const extensions = ['.ts', '.tsx', '.js']

const resolverPlugin = resolve({ extensions })

const babelPlugin = babel({
  babelHelpers: 'bundled',
  sourceMaps: true,
  extensions,
  exclude: /node_modules.*/,
})

const createTerser = ({ inline }) =>
  terser(
    minifyConfig({
      beautify: Boolean(process.env.BUILD_PRETTY),
      inline,
    })
  )

function configure(pkg, env, target) {
  const isProd = env === 'production'
  const isUmd = target === 'umd'
  const isModule = target === 'module'
  const isCommonJs = target === 'cjs'
  const pkgName = pkg.name.replace(/@cardbox-editor\//g, '')
  const input = `packages/${pkgName}/src/index.ts`
  const deps = []
    .concat(pkg.dependencies ? Object.keys(pkg.dependencies) : [])
    .concat(pkg.peerDependencies ? Object.keys(pkg.peerDependencies) : [])

  const plugins = [
    typescript({
      tsconfig: `packages/${pkgName}/tsconfig.json`,
      check: false,
    }),
    resolverPlugin,
    babelPlugin,
    commonjs({
      exclude: [`packages/${pkgName}/**`]
    }),
    isUmd && isProd && createTerser({ inline: false })
  ]

  switch (true) {
    case isUmd:
      return {
        plugins,
        input,
        output: {
          name: pkgName,
          file: `packages/${pkgName}/${pkg.unpkg}`,
          exports: 'named',
          format: 'umd',
          globals: pkg.umdGlobals
        },
        external: Object.keys(pkg.umdGlobals || {})
      }
    case isCommonJs:
      return {
        plugins,
        input,
        output: {
          file: `packages/${pkgName}/${pkg.main}`,
          format: 'cjs',
          exports: 'named',
          sourcemap: true
        },
        external: id => {
          return !!deps.find(dep => dep === id || id.startsWith(`${dep}/`))
        },
      }
    case isModule:
      return {
        plugins,
        input,
        output: {
          file: `packages/${pkgName}/${pkg.module}`,
          format: 'es',
          sourcemap: true
        },
        external: id => {
          return !!deps.find(dep => dep === id || id.startsWith(`${dep}/`))
        },
      }
  }
}

function factory(pkg, options = {}) {
  return [
    configure(pkg, 'development', 'cjs'),
    configure(pkg, 'development', 'module'),
    configure(pkg, 'production', 'umd'),
  ].filter(Boolean)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  ...factory(Core),
  ...factory(Editor),
]
