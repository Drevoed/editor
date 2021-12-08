import type { SetStoreFunction } from 'solid-js/store'
import type { EditableState } from '../components/editable'
import type { SolidEditor } from '..'

export interface EventProps {
  editableState: EditableState
  setEditableState: SetStoreFunction<EditableState>
  editor: SolidEditor
  eventHandlers: {
    onClick?: any
    onKeyDown?: any
    onCompositionStart?: any
    onCompositionUpdate?: any
    onCompositionEnd?: any
    onBeforeInput?: any
  }
}
