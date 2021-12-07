// Components
// Environment-dependent Editable
import { Editable as DefaultEditable } from './components/editable'
import { AndroidEditable } from './components/android/android-editable'
import { IS_ANDROID } from './utils/environment'

export const Editable = IS_ANDROID ? AndroidEditable : DefaultEditable
export {
  Editable as DefaultEditable,
  RenderElementProps,
  RenderLeafProps,
  RenderPlaceholderProps,
  DefaultPlaceholder,
} from './components/editable'
export { AndroidEditable } from './components/android/android-editable'
export { DefaultElement } from './components/element'
export { DefaultLeaf } from './components/leaf'
export { Slate, useSlate as useSlateStatic } from './components/slate'

// Plugin
export { SolidEditor } from './plugin/solid-editor'
export { withSolid } from './plugin/with-solid'
