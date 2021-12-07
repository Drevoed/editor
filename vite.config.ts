/* eslint-disable import/no-anonymous-default-export */
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/editor-react/',
  plugins: [],
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
  },
})
