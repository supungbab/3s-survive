<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useAudio } from '@/composables/useAudio'

const { playTick } = useAudio()

const emit = defineEmits<{
  tap: [correct: boolean]
}>()

const containerEl = ref<HTMLElement | null>(null)
const dotOpacity = ref(0)
const dotScale = ref(0.5)

// Beep timing state
const TOTAL_DURATION = 2400 // ms total sequence
const PEAK_START = 1300 // ms when peak window begins
const PEAK_END = 1800 // ms when peak window ends
const START_INTERVAL = 600 // ms initial gap
const MIN_INTERVAL = 80 // ms fastest gap

let startTime = 0
let resolved = false
let raf = 0

function getInterval(elapsed: number): number {
  // Exponential decrease from START_INTERVAL to MIN_INTERVAL
  const progress = Math.min(1, elapsed / PEAK_START)
  const eased = progress * progress // accelerating curve
  const interval = START_INTERVAL - (START_INTERVAL - MIN_INTERVAL) * eased

  // After peak, interval increases again
  if (elapsed > PEAK_END) {
    const fadeProgress = Math.min(1, (elapsed - PEAK_END) / (TOTAL_DURATION - PEAK_END))
    return MIN_INTERVAL + (START_INTERVAL - MIN_INTERVAL) * fadeProgress
  }

  return interval
}

function isInPeakWindow(elapsed: number): boolean {
  return elapsed >= PEAK_START && elapsed <= PEAK_END
}

function animate() {
  if (resolved) return
  const elapsed = performance.now() - startTime
  const interval = getInterval(elapsed)

  // Calculate dot brightness based on interval (smaller interval = brighter)
  const normalizedSpeed = 1 - (interval - MIN_INTERVAL) / (START_INTERVAL - MIN_INTERVAL)
  // Base opacity very dim, gets brighter at peak
  dotOpacity.value = 0.03 + normalizedSpeed * 0.7
  dotScale.value = 0.5 + normalizedSpeed * 0.8

  // Pulse effect: flicker the dot
  const pulsePhase = (elapsed % interval) / interval
  const pulseMod = pulsePhase < 0.3 ? 1 : 0.15
  dotOpacity.value *= pulseMod

  if (elapsed > TOTAL_DURATION && !resolved) {
    resolved = true
    emit('tap', false)
    return
  }

  raf = requestAnimationFrame(animate)
}

function onTap(e: TouchEvent | MouseEvent) {
  e.stopPropagation()
  if (e.cancelable) e.preventDefault()
  if (resolved) return

  resolved = true
  const elapsed = performance.now() - startTime

  if (isInPeakWindow(elapsed)) {
    playTick()
    emit('tap', true)
  } else {
    emit('tap', false)
  }
}

onMounted(() => {
  startTime = performance.now()
  raf = requestAnimationFrame(animate)
  if (!containerEl.value) return
  const el = containerEl.value
  el.addEventListener('touchstart', onTap, { passive: false })
  el.addEventListener('mousedown', onTap)
})

onUnmounted(() => {
  cancelAnimationFrame(raf)
  if (!containerEl.value) return
  const el = containerEl.value
  el.removeEventListener('touchstart', onTap)
  el.removeEventListener('mousedown', onTap)
})
</script>

<template>
  <div ref="containerEl" class="blackout-mission">
    <div class="blackout-void">
      <div
        class="beep-dot"
        :style="{
          opacity: dotOpacity,
          transform: `scale(${dotScale})`,
        }"
      />
    </div>
    <div class="blackout-hint">LISTEN...</div>
  </div>
</template>

<style scoped>
.blackout-mission {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px 24px;
  gap: 12px;
  touch-action: none;
  min-height: 200px;
  background: #010101;
}

.blackout-void {
  position: relative;
  width: 100%;
  height: 140px;
  background: #010101;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.beep-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--px-green-bright);
  box-shadow: 0 0 12px var(--px-green-glow), 0 0 24px var(--px-green-glow-strong);
  transition: none;
  will-change: opacity, transform;
}

.blackout-hint {
  font-size: 13px;
  color: var(--px-green-dim);
  font-family: monospace;
  letter-spacing: 4px;
  opacity: 0.25;
}
</style>
