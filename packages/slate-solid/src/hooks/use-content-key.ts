import type { Node as SlateNode } from 'slate'
import { NODE_TO_RESTORE_DOM } from '../utils/weak-maps'
import { Accessor, createEffect, createSignal, onCleanup } from "solid-js";

export function useContentKey(node: Accessor<SlateNode>) {
  let contentKeyRef = 0
  let updateAnimationFrameRef: number | null = null

  const [, setForceRerenderCounter] = createSignal(0)

  createEffect(() => {
    NODE_TO_RESTORE_DOM.set(node(), () => {
      // Update is already queued and node hasn't re-render yet
      if (updateAnimationFrameRef) {
        return
      }

      updateAnimationFrameRef = requestAnimationFrame(() => {
        setForceRerenderCounter((state) => state + 1)
        updateAnimationFrameRef = null
      })

      contentKeyRef++
    })

    onCleanup(() => NODE_TO_RESTORE_DOM.delete(node()))
  })

  // Node was restored => clear scheduled update
  if (updateAnimationFrameRef) {
    cancelAnimationFrame(updateAnimationFrameRef)
    updateAnimationFrameRef = null
  }

  return contentKeyRef
}
