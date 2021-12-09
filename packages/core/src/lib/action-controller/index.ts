import type {
  ActionBaseParams,
  ActionCallbackResult,
  ListenerConfig,
} from './types';

export * from './types';

interface KeyboardEventLike {
  key: string;
  which: number;
  altKey: boolean;
  ctrlKey: boolean;
  metaKey: boolean;
  shiftKey: boolean;
  stopPropagation: () => void;
  preventDefault: () => void;
}

export function createActionController<
  TAction extends string = string,
  TEvent extends KeyboardEventLike = KeyboardEvent,
  TParams extends ActionBaseParams<TEvent> = ActionBaseParams<TEvent>,
>() {
  type LocalListenerConfig = ListenerConfig<TEvent, TParams>;

  const listeners: Map<TAction, LocalListenerConfig[]> = new Map();

  const register = (
    action: TAction,
    callback: LocalListenerConfig['callback'],
  ) => {
    listeners.set(action, [
      {
        priority: 1,
        callback,
        match: () => true,
      },
    ]);
  };

  const override = (
    action: TAction,
    callback: LocalListenerConfig['callback'],
    {
      match = () => true,
      priority = 2,
    }: {
      match?: LocalListenerConfig['match'];
      priority?: LocalListenerConfig['priority'];
    } = {},
  ) => {
    const listenerArray = listeners.get(action);

    if (listenerArray !== undefined) {
      listenerArray.push({
        priority,
        callback,
        match,
      });
    }
  };

  const execute = (action: TAction, params: TParams) => {
    const configs = listeners.get(action);
    if (!configs) return;
    const sortedByPriority = configs.sort((a, b) => b.priority - a.priority);

    for (const config of sortedByPriority) {
      const match = config.match(params);
      if (!match) continue;

      const result: ActionCallbackResult = config.callback(params) || {};
      const { skipped = false } = result;

      if (skipped) continue;
      else break;
    }
  };

  const curryExecute = (action: TAction) => (params: TParams) => {
    execute(action, params);
  };

  return {
    register,
    override,
    execute,
    curryExecute,
  };
}
