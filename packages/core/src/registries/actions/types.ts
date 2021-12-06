import type { ActionBaseParams } from '../../lib/action-controller/types'
import type { BaseRange, Editor } from 'slate'
import type { CodeModification } from '../../shared/types'

export type PublicAction =
  | 'make-bold'
  | 'make-italic'
  | 'make-underlined'
  | 'make-inline-code'
  | 'set-link-for-text'

export type PrivateAction =
  | 'delete-backward'
  | 'insert-soft-break'
  | 'insert-exit-break'
  | 'indent'
  | 'outdent'
  | 'get-out-the-leaf'
  | 'copy'
  | 'copy-all'
  | 'paste'
  | 'exit-block'

export type WithCode = {
  [Modification in CodeModification]?: string
}

export interface UI {
  toolbar: { update: () => void; hide: () => void }
  linkPopup: {
    show: ({
      selection,
      href,
    }: {
      selection: BaseRange & WithCode
      href?: string | undefined
    }) => void
    hide: () => void
    reset: () => void
    focus: () => void
    update: () => void
  }
}

export type Action = PublicAction | PrivateAction

export type ActionKeybinds<TAction extends string> = {
  [KAction in TAction]: string | string[]
}

export type OptionalActionKeybinds<TAction extends string> = {
  [KAction in TAction]?: string | string[]
}

export interface ActionParams extends ActionBaseParams {
  editor: Editor
  ui: UI
}
