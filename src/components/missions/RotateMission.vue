<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import type { RotateDirection } from '@/types/mission'
import { useAudio } from '@/composables/useAudio'

const { playTick } = useAudio()

const props = defineProps<{
  rotateDirection: RotateDirection
}>()

const emit = defineEmits<{
  tap: [correct: boolean]
}>()

const rotation = ref(0) // 현재 회전 각도 (deg)
const progress = ref(0)
const containerEl = ref<HTMLElement | null>(null)
let initialAngle = 0
let resolved = false

function getAngle(t1: Touch, t2: Touch): number {
  return Math.atan2(t2.clientY - t1.clientY, t2.clientX - t1.clientX) * (180 / Math.PI)
}

function onTouchStart(e: TouchEvent) {
  e.stopPropagation()
  if (e.cancelable) e.preventDefault()
  if (e.touches.length >= 2) {
    initialAngle = getAngle(e.touches[0], e.touches[1])
  }
}

function onTouchMove(e: TouchEvent) {
  e.stopPropagation()
  if (e.cancelable) e.preventDefault()
  if (resolved || e.touches.length < 2) return

  const angle = getAngle(e.touches[0], e.touches[1])
  let diff = angle - initialAngle

  // Normalize to -180~180
  while (diff > 180) diff -= 360
  while (diff < -180) diff += 360

  rotation.value = diff

  const TARGET_ANGLE = 60 // 60도 회전 시 성공
  if (props.rotateDirection === 'CW') {
    progress.value = Math.min(1, Math.max(0, diff / TARGET_ANGLE))
    if (diff >= TARGET_ANGLE) {
      resolved = true
      playTick()
      emit('tap', true)
    }
  } else {
    progress.value = Math.min(1, Math.max(0, -diff / TARGET_ANGLE))
    if (diff <= -TARGET_ANGLE) {
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
  <div ref="containerEl" class="rotate-mission">
    <div class="rotate-dial" :style="{ transform: `rotate(${rotation}deg)` }">
      <div class="dial-mark top">▲</div>
      <div class="dial-center">
        {{ rotateDirection === 'CW' ? '↻' : '↺' }}
      </div>
    </div>
    <div class="rotate-progress-bar">
      <div class="rotate-progress-fill" :style="{ width: `${progress * 100}%` }" />
    </div>
    <div class="rotate-hint">두 손가락으로 돌려</div>
  </div>
</template>

<style scoped>
.rotate-mission {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  gap: 16px;
  touch-action: none;
  min-height: 180px;
}

.rotate-dial {
  width: 120px;
  height: 120px;
  border: 3px solid var(--px-green-border);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: border-color 0.1s;
  box-shadow:
    0 0 0 2px var(--px-green-frame),
    0 0 16px var(--px-green-glow),
    inset 0 0 20px rgba(0, 0, 0, 0.3);
}

.dial-mark {
  position: absolute;
  font-size: 16px;
  color: var(--px-green-bright);
}

.dial-mark.top {
  top: 4px;
}

.dial-center {
  font-size: 48px;
  color: var(--px-green-bright);
  text-shadow: 0 0 16px var(--px-green-glow);
}

.rotate-progress-bar {
  width: 160px;
  height: 8px;
  background: #0c140c;
  border-radius: 0;
  overflow: hidden;
  border: 2px solid #3a4a38;
  box-shadow: 0 0 0 2px #111311, inset 1px 1px 0 #2a322a;
}

.rotate-progress-fill {
  height: 100%;
  background: var(--px-green-bright);
  border-radius: 0;
  transition: width 0.05s linear;
  box-shadow: 0 0 8px var(--px-green-glow);
}

.rotate-hint {
  font-size: 14px;
  color: var(--arc-muted);
}
</style>
