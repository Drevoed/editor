import { Editor, Transforms } from 'slate'
import {
  ActionCallback,
  ActionParams,
  GlobalMatchers,
  GlobalQueries,
} from '@cardbox-editor/core'
import type React from 'react'

export const copyAll: ActionCallback<
  React.KeyboardEvent,
  ActionParams<Editor, React.KeyboardEvent>
> = ({ editor, event }) => {
  const code = GlobalQueries.getAbove(editor, {
    type: 'block',
    match: GlobalMatchers.block(editor, 'code'),
  })

  if (!code) {
    return { skipped: true }
  }

  const [, codePath] = code

  event.preventDefault()
  Transforms.select(editor, codePath)
}
