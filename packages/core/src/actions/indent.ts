import type {
  ActionBaseParams,
  ActionCallback,
  ActionCallbackResult,
  ActionParams,
  KeyboardEventLike,
} from '../lib/action-controller'

export const indent = <
  TEvent extends KeyboardEventLike = KeyboardEvent,
  TParams extends ActionBaseParams<TEvent> = ActionBaseParams<TEvent>
>({
  event,
}: TParams): void | ActionCallbackResult => {
  event.preventDefault()
}
