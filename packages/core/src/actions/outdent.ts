import type {
  ActionBaseParams,
  KeyboardEventLike,
} from "../lib/action-controller"

export const outdent = <
  TEvent extends KeyboardEventLike = KeyboardEvent,
  TParams extends ActionBaseParams<TEvent> = ActionBaseParams<TEvent>
>({
  event,
}: TParams) => {
  event.preventDefault()
}
