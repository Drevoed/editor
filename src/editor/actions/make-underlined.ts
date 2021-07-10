import { ActionParams } from '../actions-registry'
import { ActionCallback } from '../lib/action-controller/types'
import { GlobalTransforms } from '../lib/global-transforms'

export const makeUnderlined: ActionCallback<ActionParams> = ({
  editor,
  event,
}) => {
  event.preventDefault()
  GlobalTransforms.toggleTextModification(editor, 'underlined')
}
