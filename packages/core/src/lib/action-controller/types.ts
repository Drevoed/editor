export type ActionEvent = KeyboardEvent

export interface ActionBaseParams {
  event: ActionEvent
}

export interface ActionCallbackResult {
  // continue to other actions with lower priority
  skipped?: boolean
}

export type ActionCallback<
  TParams extends ActionBaseParams = ActionBaseParams
> = (params: TParams) => void | ActionCallbackResult

export interface ListenerConfig<
  TParams extends ActionBaseParams = ActionBaseParams
> {
  priority: number
  callback: ActionCallback<TParams>
  match: (params: TParams) => boolean
}
