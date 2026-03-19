<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import type { PinchDirection } from '@/types/mission'
import { useAudio } from '@/composables/useAudio'

const { playTick } = useAudio()

const props = defineProps<{
  pinchDirection: PinchDirection
}>()

const emit = defineEmits<{
  tap: [correct: boolean]
}>()

const progress = ref(0) // 0~1
const containerEl = ref<HTMLElement | null>(null)
let initialDist = 0
let resolved = false

function getDist(t1: Touch, t2: Touch): number {
  const dx = t1.clientX - t2.clientX
  const dy = t1.clientY - t2.clientY
  return Math.sqrt(dx * dx + dy * dy)
}

function onTouchStart(e: TouchEvent) {
  e.stopPropagation()
  if (e.cancelable) e.preventDefault()
  if (e.touches.length >= 2) {
    initialDist = getDist(e.touches[0], e.touches[1])
  }
}

function onTouchMove(e: TouchEvent) {
  e.stopPropagation()
  if (e.cancelable) e.preventDefault()
  if (resolved || e.touches.length < 2 || initialDist === 0) return

  const dist = getDist(e.touches[0], e.touches[1])
  const ratio = dist / initialDist

  if (props.pinchDirection === 'IN') {
    // 오므리기: ratio < 1 → progress 증가
    progress.value = Math.min(1, Math.max(0, (1 - ratio) / 0.4))
    if (ratio < 0.6) {
      resolved = true
      playTick()
      emit('tap', true)
    }
  } else {
    // 벌리기: ratio > 1 → progress 증가
    progress.value = Math.min(1, Math.max(0, (ratio - 1) / 0.5))
    if (ratio > 1.5) {
      resolved = true
      playTick()
      emit('tap', true)
    }
  }
}

function onTouchEnd(e: TouchEvent) {
  e.stopPropagation()
  if (e.cancelable) e.preventDefault()
}

onMounted(() => {
  if (!containerEl.value) return
  const el = containerEl.value
  el.addEventListener('touchstart', onTouchStart, { passive: false })
  el.addEventListener('touchmove', onTouchMove, { passive: false })
  el.addEventListener('touchend', onTouchEnd, { passive: false })
})

onUnmounted(() => {
  if (!containerEl.value) return
  const el = containerEl.value
  el.removeEventListener('touchstart', onTouchStart)
  el.removeEventListener('touchmove', onTouchMove)
  el.removeEventListener('touchend', onTouchEnd)
})
</script>

<template>
  <div ref="containerEl" class="pinch-mission">
    <div class="pinch-guide" :class="pinchDirection">
      <div class="pinch-finger left" :style="{ transform: `translateX(${pinchDirection === 'IN' ? progress * 30 : -progress * 30}px)` }">
        ◉
      </div>
      <div class="pinch-icon">
        {{ pinchDirection === 'IN' ? '→ ←' : '← →' }}
      </div>
      <div class="pinch-finger right" :style="{ transform: `translateX(${pinchDirection === 'IN' ? -progress * 30 : progress * 30}px)` }">
        ◉
      </div>
    </div>
    <div class="pinch-progress-bar">
      <div class="pinch-progress-fill" :style="{ width: `${progress * 100}%` }" />
    </div>
    <div class="pinch-hint">두 손가락</div>
  </div>
</template>

<style scoped>
.pinch-mission {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  gap: 16px;
  touch-action: none;
  min-height: 180px;
}

.pinch-guide {
  display: flex;
  align-items: center;
  gap: 24px;
}

.pinch-finger {
  font-size: 36px;
  color: var(--px-green-bright);
  text-shadow: 0 0 16px var(--px-green-glow);
  transition: transform 0.05s linear;
}

.pinch-icon {
  font-size: 24px;
  color: var(--arc-muted);
  letter-spacing: 4px;
}

.pinch-progress-bar {
  width: 160px;
  height: 8px;
  background: #0c140c;
  border-radius: 0;
  overflow: hidden;
  border: 2px solid #3a4a38;
  box-shadow: 0 0 0 2px #111311, inset 1px 1px 0 #2a322a;
}

.pinch-progress-fill {
  height: 100%;
  background: var(--px-green-bright);
  border-radius: 0;
  transition: width 0.05s linear;
  box-shadow: 0 0 8px var(--px-green-glow);
}

.pinch-hint {
  font-size: 14px;
  color: var(--arc-muted);
}
</style>
