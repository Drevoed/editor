import type { ControlsState } from './types'
import { createContext, useContext } from 'solid-js'

const ControlsContext = createContext<ControlsState>({} as ControlsState)

export const ControlsProvider = ControlsContext.Provider

export function useControlsState() {
  return useContext(ControlsContext)
}
