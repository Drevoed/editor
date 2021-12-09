import { swc, defineRollupSwcOption } from 'rollup-plugin-swc3';
import { defineConfig } from 'rollup';
import resolve from '@rollup/plugin-node-resolve';
import dts from 'rollup-plugin-dts';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json';

const extensions = ['.ts', '.tsx', '.js'];

const resolverPlugin = resolve({ extensions });

// eslint-disable-next-line import/no-anonymous-default-export
export default defineConfig([
  {
    input: 'src/index.ts',
    external: Object.keys(pkg.peerDependencies),
    output: [
      {
        file: pkg.main,
        format: 'cjs',
      },
      {
        file: pkg.module,
        format: 'es',
      },
    ],
    plugins: [
      resolverPlugin,
      commonjs(),
      swc(
        defineRollupSwcOption({
          jsc: {
            parser: {
              syntax: 'typescript',
              jsx: true,
            },
            transform: {
              react: {
                runtime: 'automatic',
              },
            },
          },
        }),
      ),
    ],
  },
  {
    input: 'src/index.ts',
    output: {
      file: pkg.types,
      format: 'es',
    },
    plugins: [dts()],
  },
]);
