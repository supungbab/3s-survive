<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useAudio } from '@/composables/useAudio'

const { playTick } = useAudio()

const emit = defineEmits<{
  tap: [correct: boolean]
}>()

const containerEl = ref<HTMLElement | null>(null)
const progress = ref(0) // 0~1
const REQUIRED_DISTANCE = 600 // px total
let totalDist = 0
let lastX = 0
let lastY = 0
let isMoving = false
let resolved = false
let noiseFrame = 0
const noiseOpacity = ref(1)
let raf = 0

function onStart(e: TouchEvent | MouseEvent) {
  e.stopPropagation()
  if (e.cancelable) e.preventDefault()
  const clientX = 'touches' in e ? (e.touches[0]?.clientX ?? 0) : e.clientX
  const clientY = 'touches' in e ? (e.touches[0]?.clientY ?? 0) : e.clientY
  lastX = clientX
  lastY = clientY
  isMoving = true
}

function onMove(e: TouchEvent | MouseEvent) {
  e.stopPropagation()
  if (e.cancelable) e.preventDefault()
  if (!isMoving || resolved) return

  const clientX = 'touches' in e ? (e.touches[0]?.clientX ?? 0) : e.clientX
  const clientY = 'touches' in e ? (e.touches[0]?.clientY ?? 0) : e.clientY
  const dx = clientX - lastX
  const dy = clientY - lastY
  const dist = Math.sqrt(dx * dx + dy * dy)
  totalDist += dist
  lastX = clientX
  lastY = clientY

  progress.value = Math.min(1, totalDist / REQUIRED_DISTANCE)
  noiseOpacity.value = 1 - progress.value

  if (totalDist >= REQUIRED_DISTANCE) {
    resolved = true
    playTick()
    emit('tap', true)
  }
}

function onEnd(e: TouchEvent | MouseEvent) {
  e.stopPropagation()
  if (e.cancelable) e.preventDefault()
  isMoving = false
}

// Animated noise effect
function animateNoise() {
  noiseFrame++
  raf = requestAnimationFrame(animateNoise)
}

onMounted(() => {
  raf = requestAnimationFrame(animateNoise)
  if (!containerEl.value) return
  const el = containerEl.value
  el.addEventListener('touchstart', onStart, { passive: false })
  el.addEventListener('touchmove', onMove, { passive: false })
  el.addEventListener('touchend', onEnd, { passive: false })
  el.addEventListener('mousedown', onStart)
  el.addEventListener('mousemove', onMove)
  el.addEventListener('mouseup', onEnd)
})

onUnmounted(() => {
  cancelAnimationFrame(raf)
  if (!containerEl.value) return
  const el = containerEl.value
  el.removeEventListener('touchstart', onStart)
  el.removeEventListener('touchmove', onMove)
  el.removeEventListener('touchend', onEnd)
  el.removeEventListener('mousedown', onStart)
  el.removeEventListener('mousemove', onMove)
  el.removeEventListener('mouseup', onEnd)
})
</script>

<template>
  <div ref="containerEl" class="static-clear-mission">
    <div class="static-screen">
      <div class="noise-layer" :style="{ opacity: noiseOpacity }" />
      <div class="clear-text" :style="{ opacity: progress }">
        SIGNAL OK
      </div>
    </div>

    <div class="clear-progress">
      <div class="clear-fill" :style="{ width: `${progress * 100}%` }" />
    </div>
    <div class="clear-hint">문질러!</div>
  </div>
</template>

<style scoped>
.static-clear-mission {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px 24px;
  gap: 12px;
  touch-action: none;
  min-height: 200px;
}

.static-screen {
  position: relative;
  width: 100%;
  height: 120px;
  border: 2px solid var(--px-green-border);
  background: #060e06;
  overflow: hidden;
  box-shadow:
    0 0 0 2px var(--px-green-frame),
    inset 0 0 20px rgba(140, 200, 144, 0.05);
}

.noise-layer {
  position: absolute;
  inset: 0;
  background:
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(140, 200, 144, 0.03) 2px,
      rgba(140, 200, 144, 0.03) 4px
    );
  animation: noise-flicker 0.1s steps(3) infinite;
}

.noise-layer::before {
  content: '';
  position: absolute;
  inset: 0;
  background: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E");
  background-size: 128px 128px;
  mix-blend-mode: overlay;
  animation: noise-shift 0.15s steps(5) infinite;
}

.clear-text {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 700;
  color: var(--px-green-bright);
  text-shadow: 0 0 16px var(--px-green-glow);
  font-family: monospace;
  transition: opacity 0.1s;
}

.clear-progress {
  width: 160px;
  height: 8px;
  background: #0c140c;
  border: 2px solid #3a4a38;
  box-shadow: 0 0 0 2px #111311;
  overflow: hidden;
}

.clear-fill {
  height: 100%;
  background: var(--px-green-bright);
  box-shadow: 0 0 8px var(--px-green-glow);
  transition: width 0.05s linear;
}

.clear-hint {
  font-size: 16px;
  color: var(--arc-muted);
}

@keyframes noise-flicker {
  0% { opacity: 1; }
  33% { opacity: 0.85; }
  66% { opacity: 0.95; }
  100% { opacity: 1; }
}

@keyframes noise-shift {
  0% { background-position: 0 0; }
  20% { background-position: -32px -16px; }
  40% { background-position: 16px -48px; }
  60% { background-position: -48px 32px; }
  80% { background-position: 32px 16px; }
  100% { background-position: 0 0; }
}
</style>
