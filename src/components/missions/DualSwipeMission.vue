<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import type { SwipeDirection } from '@/types/game'
import { useAudio } from '@/composables/useAudio'

const { playTick } = useAudio()

const props = defineProps<{
  dualSwipeDirections: [SwipeDirection, SwipeDirection]
}>()

const emit = defineEmits<{
  tap: [correct: boolean]
}>()

const containerEl = ref<HTMLElement | null>(null)
let resolved = false
const touchStarts: Map<number, { x: number; y: number }> = new Map()

const ARROWS: Record<SwipeDirection, string> = {
  UP: '↑', DOWN: '↓', LEFT: '←', RIGHT: '→',
}

const SWIPE_THRESHOLD = 40

function getSwipeDir(dx: number, dy: number): SwipeDirection | null {
  const dist = Math.sqrt(dx * dx + dy * dy)
  if (dist < SWIPE_THRESHOLD) return null
  if (Math.abs(dx) > Math.abs(dy)) {
    return dx > 0 ? 'RIGHT' : 'LEFT'
  }
  return dy > 0 ? 'DOWN' : 'UP'
}

function onTouchStart(e: TouchEvent) {
  e.stopPropagation()
  if (e.cancelable) e.preventDefault()
  for (let i = 0; i < e.changedTouches.length; i++) {
    const t = e.changedTouches[i]
    touchStarts.set(t.identifier, { x: t.clientX, y: t.clientY })
  }
}

function onTouchEnd(e: TouchEvent) {
  e.stopPropagation()
  if (e.cancelable) e.preventDefault()
  if (resolved) return

  const swipeDirs: SwipeDirection[] = []
  for (let i = 0; i < e.changedTouches.length; i++) {
    const t = e.changedTouches[i]
    const start = touchStarts.get(t.identifier)
    if (start) {
      const dir = getSwipeDir(t.clientX - start.x, t.clientY - start.y)
      if (dir) swipeDirs.push(dir)
      touchStarts.delete(t.identifier)
    }
  }

  // 두 스와이프가 모두 감지되었는지 확인
  if (swipeDirs.length >= 2) {
    const [expected1, expected2] = props.dualSwipeDirections
    const match =
      (swipeDirs.includes(expected1) && swipeDirs.includes(expected2))
    resolved = true
    playTick()
    emit('tap', match)
  }
}

function onTouchMove(e: TouchEvent) {
  e.stopPropagation()
  if (e.cancelable) e.preventDefault()
}

onMounted(() => {
  if (!containerEl.value) return
  const el = containerEl.value
  el.addEventListener('touchstart', onTouchStart, { passive: false })
  el.addEventListener('touchend', onTouchEnd, { passive: false })
  el.addEventListener('touchmove', onTouchMove, { passive: false })
})

onUnmounted(() => {
  if (!containerEl.value) return
  const el = containerEl.value
  el.removeEventListener('touchstart', onTouchStart)
  el.removeEventListener('touchend', onTouchEnd)
  el.removeEventListener('touchmove', onTouchMove)
})
</script>

<template>
  <div ref="containerEl" class="dual-swipe-mission">
    <div class="dual-arrows">
      <div class="dual-arrow left">
        <span class="arrow-icon">{{ ARROWS[dualSwipeDirections[0]] }}</span>
        <span class="arrow-label">왼손</span>
      </div>
      <div class="dual-separator">+</div>
      <div class="dual-arrow right">
        <span class="arrow-icon">{{ ARROWS[dualSwipeDirections[1]] }}</span>
        <span class="arrow-label">오른손</span>
      </div>
    </div>
    <div class="dual-hint">양손으로 동시 스와이프</div>
  </div>
</template>

<style scoped>
.dual-swipe-mission {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  gap: 16px;
  touch-action: none;
  min-height: 180px;
}

.dual-arrows {
  display: flex;
  align-items: center;
  gap: 20px;
}

.dual-arrow {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.arrow-icon {
  font-size: 64px;
  color: var(--px-green-bright);
  text-shadow:
    0 0 20px var(--px-green-glow),
    0 0 60px rgba(140, 200, 144, 0.15);
}

.arrow-label {
  font-size: 14px;
  color: var(--arc-muted);
}

.dual-separator {
  font-size: 32px;
  color: var(--arc-muted);
}

.dual-hint {
  font-size: 14px;
  color: var(--arc-muted);
}
</style>
