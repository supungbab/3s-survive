import { ref, onUnmounted } from 'vue'
import type { InputAction, SwipeDirection } from '@/types/game'
import { useAudio } from './useAudio'

const TAP_MAX_DURATION = 200
const TAP_MAX_DISTANCE = 10
const SWIPE_MIN_DISTANCE = 30
const SWIPE_MAX_DURATION = 500
const LONG_PRESS_DURATION = 1000

export function useInputDetector(
  onInput: (action: InputAction) => void,
  isBlocked: () => boolean,
) {
  const { playTick } = useAudio()
  const tapCount = ref(0)
  const isPressed = ref(false)

  let touchStartX = 0
  let touchStartY = 0
  let touchStartTime = 0
  let longPressTimer: ReturnType<typeof setTimeout> | null = null
  let longPressFired = false
  let multiTapTimer: ReturnType<typeof setTimeout> | null = null
  let element: HTMLElement | null = null

  function onStart(e: MouseEvent | TouchEvent) {
    if (e.cancelable) e.preventDefault()
    if (isBlocked()) return

    const pos = getPos(e)
    if (!pos) return

    // Dual tap detection
    if ('touches' in e && e.touches.length >= 2) {
      clearLongPress()
      onInput({ type: 'DUAL_TAP' })
      return
    }

    touchStartX = pos.x
    touchStartY = pos.y
    touchStartTime = performance.now()
    isPressed.value = true
    longPressFired = false

    longPressTimer = setTimeout(() => {
      longPressFired = true
      onInput({ type: 'LONG_PRESS' })
    }, LONG_PRESS_DURATION)
  }

  function onEnd(e: MouseEvent | TouchEvent) {
    isPressed.value = false
    clearLongPress()

    if (e.cancelable) e.preventDefault()
    if (isBlocked()) return
    if (longPressFired) return

    const pos = getEndPos(e)
    if (!pos) return

    const dx = pos.x - touchStartX
    const dy = pos.y - touchStartY
    const dist = Math.sqrt(dx * dx + dy * dy)
    const elapsed = performance.now() - touchStartTime

    // Swipe detection
    if (dist > SWIPE_MIN_DISTANCE && elapsed < SWIPE_MAX_DURATION) {
      const absDx = Math.abs(dx)
      const absDy = Math.abs(dy)
      let direction: SwipeDirection
      if (absDx > absDy) {
        direction = dx > 0 ? 'RIGHT' : 'LEFT'
      } else {
        direction = dy > 0 ? 'DOWN' : 'UP'
      }
      playTick()
      onInput({ type: 'SWIPE', direction })
      return
    }

    // Tap detection
    if (dist < TAP_MAX_DISTANCE && elapsed < TAP_MAX_DURATION) {
      playTick()
      tapCount.value++
      onInput({ type: 'TAP', x: pos.x, y: pos.y })

      if (multiTapTimer) clearTimeout(multiTapTimer)
      multiTapTimer = setTimeout(() => {
        if (tapCount.value > 1) {
          onInput({ type: 'MULTI_TAP', count: tapCount.value })
        }
        tapCount.value = 0
      }, 300)
    }
  }

  function onMove(e: MouseEvent | TouchEvent) {
    if (e.cancelable) e.preventDefault()
    if (isBlocked()) return
    if (longPressTimer) {
      const pos = getPos(e)
      if (!pos) return
      const dist = Math.sqrt(
        (pos.x - touchStartX) ** 2 + (pos.y - touchStartY) ** 2,
      )
      if (dist > TAP_MAX_DISTANCE) {
        clearLongPress()
      }
    }
  }

  // Unified position extraction (the-perfect pattern: feature detection)
  function getPos(e: MouseEvent | TouchEvent): { x: number; y: number } | null {
    if ('touches' in e) {
      const t = e.touches[0]
      return t ? { x: t.clientX, y: t.clientY } : null
    }
    return { x: e.clientX, y: e.clientY }
  }

  function getEndPos(e: MouseEvent | TouchEvent): { x: number; y: number } | null {
    if ('changedTouches' in e) {
      const t = e.changedTouches[0]
      return t ? { x: t.clientX, y: t.clientY } : null
    }
    return { x: e.clientX, y: e.clientY }
  }

  function clearLongPress() {
    if (longPressTimer) {
      clearTimeout(longPressTimer)
      longPressTimer = null
    }
  }

  function bind(el: HTMLElement) {
    element = el
    // Touch events on element
    el.addEventListener('touchstart', onStart, { passive: false })
    el.addEventListener('touchend', onEnd, { passive: false })
    el.addEventListener('touchmove', onMove, { passive: false })
    // Mouse events on element (for desktop testing)
    el.addEventListener('mousedown', onStart)
    el.addEventListener('mouseup', onEnd)
    el.addEventListener('mousemove', onMove)
  }

  function unbind() {
    if (element) {
      element.removeEventListener('touchstart', onStart)
      element.removeEventListener('touchend', onEnd)
      element.removeEventListener('touchmove', onMove)
      element.removeEventListener('mousedown', onStart)
      element.removeEventListener('mouseup', onEnd)
      element.removeEventListener('mousemove', onMove)
      element = null
    }
    clearLongPress()
    if (multiTapTimer) clearTimeout(multiTapTimer)
  }

  function resetTapCount() {
    tapCount.value = 0
    if (multiTapTimer) {
      clearTimeout(multiTapTimer)
      multiTapTimer = null
    }
  }

  onUnmounted(unbind)

  return { tapCount, isPressed, bind, unbind, resetTapCount }
}
