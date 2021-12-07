import isHotkey from 'is-hotkey'

interface KeyboardEventLike {
  key: string
  which: number
  altKey: boolean
  ctrlKey: boolean
  metaKey: boolean
  shiftKey: boolean
  stopPropagation: () => void
}

type EventListener<
  TContext = void,
  TEvent extends KeyboardEventLike = KeyboardEvent
> = (event: TEvent, context: TContext) => void

type KeybindCallback<
  TContext = void,
  TEvent extends KeyboardEventLike = KeyboardEvent
> = (context: TContext, event: TEvent) => void

interface KeybindListener<
  TContext = void,
  TEvent extends KeyboardEventLike = KeyboardEvent
> {
  keybind: string
  is: (event: TEvent) => boolean
  callback: KeybindCallback<TContext, TEvent>
}

type KeybindListeners<
  TContext = void,
  TEvent extends KeyboardEventLike = KeyboardEvent
> = {
  [Scope in string]?: KeybindListener<TContext, TEvent>[]
}

const listeners: KeybindListeners<unknown, any> = {}

interface Params {
  scope?: string
  stopAllEvents?: boolean
}

export function createKeybindController<
  TContext = void,
  TEvent extends KeyboardEventLike = KeyboardEvent
>({ scope = 'global', stopAllEvents = true }: Params = {}) {
  if (!listeners[scope]) {
    listeners[scope] = []
  }

  const scopeListeners = listeners[scope] as KeybindListener<TContext, TEvent>[]

  const register = (
    keybind: string,
    callback: KeybindCallback<TContext, TEvent>
  ) => {
    scopeListeners.push({
      keybind,
      callback,
      is: isHotkey(keybind, { byKey: true }),
    })
  }

  const unregister = (keybind: string) => {
    const index = scopeListeners.findIndex((item) => item.keybind === keybind)
    if (index === -1) return
    scopeListeners.splice(index, 1)
  }

  const unregisterAll = () => {
    scopeListeners.splice(0, scopeListeners.length)
  }

  const keyDown: EventListener<TContext, TEvent> = (event, context) => {
    if (stopAllEvents) event.stopPropagation()

    for (const listener of scopeListeners) {
      const match = listener.is(event)
      if (!match) continue
      if (!stopAllEvents) event.stopPropagation()
      listener.callback(context, event)
      break
    }
  }

  return {
    register,
    unregister,
    unregisterAll,
    keyDown,
  }
}
