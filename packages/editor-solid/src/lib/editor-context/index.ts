import { createContext } from 'solid-js'
import type { Editor } from 'slate'
import type { SolidEditor } from 'slate-solid'

// it's supposed to be used only with hook, so cast is ok
export const EditorContext = createContext<Editor & SolidEditor>(
  {} as Editor & SolidEditor
)
