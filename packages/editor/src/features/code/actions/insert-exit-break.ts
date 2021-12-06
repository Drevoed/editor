import type { ActionCallback } from '../../../lib/action-controller/types'
import type { ActionParams } from '../../../registries/actions'
import { LocalTransforms } from '../transforms'

export const insertExitBreak: ActionCallback<ActionParams> = ({
  editor,
  event,
}) => {
  event.preventDefault()
  LocalTransforms.insertExitBreak(editor)
}
