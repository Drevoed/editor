import type { BaseRange, BaseText } from 'slate'
import type { SolidEditor } from './plugin/solid-editor'

declare module 'slate' {
  interface CustomTypes {
    Editor: SolidEditor
    Text: BaseText & {
      placeholder: string
    }
    Range: BaseRange & {
      placeholder?: string
    }
  }
}
