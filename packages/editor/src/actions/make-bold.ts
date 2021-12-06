import type { ActionCallback } from '../lib/action-controller/types'
import { GlobalTransforms } from '../lib/global-transforms'
import type { ActionParams } from '../registries/actions'

export const makeBold: ActionCallback<ActionParams> = ({ editor, event }) => {
  event.preventDefault()
  GlobalTransforms.toggleTextModification(editor, 'bold')
}
