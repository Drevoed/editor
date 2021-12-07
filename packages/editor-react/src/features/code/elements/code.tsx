import React from 'react'
import type { RenderElementProps } from 'slate-react'
import { CODE_MODIFICATION, createCodeElement } from '@cardbox-editor/core'
import { SettingsRegistry } from '../../../registries/settings'

export const CodeComponent = ({
  element,
  attributes,
  children,
}: RenderElementProps) => {
  if (element.type !== 'code') return <></>

  return (
    <pre data-language={element.language} spellCheck={false} {...attributes}>
      {children}
    </pre>
  )
}

// TODO: move registry init to core
SettingsRegistry.set('code', {
  type: 'code',
  name: 'Code',
  code: 'code',
  aliases: ['pre'],
  allowedModifications: [CODE_MODIFICATION],
  allowedTransformations: [],
  create: createCodeElement,
})
