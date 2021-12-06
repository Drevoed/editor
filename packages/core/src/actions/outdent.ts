import type { ActionCallback } from '../lib/action-controller/types'
import type { ActionParams } from '../registries/actions'

export const outdent: ActionCallback<ActionParams> = ({ event }) => {
  event.preventDefault()
}
