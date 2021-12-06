import { createContext } from 'react'
import type { Editor } from 'slate'

// it's supposed to be used only with hook, so cast is ok
export const EditorContext = createContext<Editor>({} as Editor)
