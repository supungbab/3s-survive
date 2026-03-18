import { ref, readonly } from 'vue'

type Phase = 'idle' | 'out' | 'in'

const phase = ref<Phase>('idle')
const transitioning = ref(false)

const OUT_DURATION = 400
const IN_DURATION = 350

let resolveReady: (() => void) | null = null

function sleep(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms))
}

export function useSceneTransition() {
  async function transition(callback: () => void | Promise<void>) {
    if (transitioning.value) return

    transitioning.value = true

    // Phase 1: CRT power-off
    phase.value = 'out'
    await sleep(OUT_DURATION)

    // Create ready promise before callback so mounted components can await it
    const readyPromise = new Promise<void>((resolve) => {
      resolveReady = resolve
    })

    // Execute callback (route change)
    await callback()

    // Phase 2: CRT power-on
    phase.value = 'in'
    await sleep(IN_DURATION)

    // Done
    phase.value = 'idle'
    transitioning.value = false
    resolveReady?.()
    resolveReady = null
  }

  /** Resolves when the current transition finishes. Resolves immediately if no transition is active. */
  function afterTransition(): Promise<void> {
    if (!transitioning.value) return Promise.resolve()
    return new Promise<void>((resolve) => {
      const prev = resolveReady
      resolveReady = () => {
        prev?.()
        resolve()
      }
    })
  }

  return {
    phase: readonly(phase),
    transitioning: readonly(transitioning),
    transition,
    afterTransition,
  }
}
