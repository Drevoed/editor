import type { BaseEditor, BaseRange, Editor } from 'slate'
import type { WithCode } from '../../features'

export interface KeyboardEventLike {
  key: string
  which: number
  altKey: boolean
  ctrlKey: boolean
  metaKey: boolean
  shiftKey: boolean
  stopPropagation: () => void
  preventDefault: () => void
}

export interface ActionBaseParams<
  TEvent extends KeyboardEventLike = KeyboardEvent
> {
  event: TEvent
}

export interface ActionCallbackResult {
  // continue to other actions with lower priority
  skipped?: boolean
}

export type ActionCallback<
  TEvent extends KeyboardEventLike = KeyboardEvent,
  TParams extends ActionBaseParams<TEvent> = ActionBaseParams<TEvent>
> = (params: TParams) => void | ActionCallbackResult

export interface ListenerConfig<
  TEvent extends KeyboardEventLike = KeyboardEvent,
  TParams extends ActionBaseParams<TEvent> = ActionBaseParams<TEvent>
> {
  priority: number
  callback: ActionCallback<TEvent, TParams>
  match: (params: TParams) => boolean
}

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

export type Action = PublicAction | PrivateAction

export type ActionKeybinds<TAction extends string> = {
  [KAction in TAction]: string | string[]
}

export type OptionalActionKeybinds<TAction extends string> = {
  [KAction in TAction]?: string | string[]
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

export interface ActionParams<
  T extends import('slate').BaseEditor = Editor,
  TEvent extends KeyboardEventLike = KeyboardEvent
> extends ActionBaseParams<TEvent> {
  editor: T
  ui: UI
}
