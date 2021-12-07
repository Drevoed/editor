import React from 'react'
import type { Editor } from 'slate'
import { LinkPopupContext, useNewLinkPopupState } from '../features/link'
import { ToolbarContext, useNewToolbarState } from '../features/toolbar'
import { EditorContext } from '../lib/editor-context'
import type { ReactEditor } from 'slate-react'

export const RootProvider = ({
  children,
  editor,
}: {
  children: JSX.Element | JSX.Element[]
  editor: Editor & ReactEditor
}) => {
  const toolbarState = useNewToolbarState()
  const linkPopupState = useNewLinkPopupState()

  return (
    <EditorContext.Provider value={editor}>
      <ToolbarContext.Provider value={toolbarState}>
        <LinkPopupContext.Provider value={linkPopupState}>
          {children}
        </LinkPopupContext.Provider>
      </ToolbarContext.Provider>
    </EditorContext.Provider>
  )
}
