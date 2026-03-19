<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useAudio } from '@/composables/useAudio'

const { playTick } = useAudio()

const emit = defineEmits<{
  tap: [correct: boolean]
}>()

const containerEl = ref<HTMLElement | null>(null)
const safeSize = ref(80) // % of container (shrinks over time)
let raf = 0
let startTime = 0
let resolved = false
const SHRINK_SPEED = 30 // % per second
const MIN_SIZE = 15 // minimum safe zone %

function animate(now: number) {
  if (resolved) return
  const elapsed = (now - startTime) / 1000
  safeSize.value = Math.max(MIN_SIZE, 80 - elapsed * SHRINK_SPEED)
  raf = requestAnimationFrame(animate)
}

function onTap(e: TouchEvent | MouseEvent) {
  e.stopPropagation()
  if (e.cancelable) e.preventDefault()
  if (resolved || !containerEl.value) return

  const rect = containerEl.value.getBoundingClientRect()
  const clientX = 'touches' in e ? (e.touches[0]?.clientX ?? 0) : e.clientX
  const clientY = 'touches' in e ? (e.touches[0]?.clientY ?? 0) : e.clientY

  // Check if tap is within safe zone (centered)
  const relX = ((clientX - rect.left) / rect.width) * 100
  const relY = ((clientY - rect.top) / rect.height) * 100
  const margin = (100 - safeSize.value) / 2
  const inSafe = relX >= margin && relX <= 100 - margin && relY >= margin && relY <= 100 - margin

  resolved = true
  if (inSafe) {
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
  <div ref="containerEl" class="shelter-mission">
    <div class="danger-zone">
      <div class="radiation-overlay" :style="{
        clipPath: `polygon(
          0% 0%, 100% 0%, 100% 100%, 0% 100%,
          0% ${(100 - safeSize) / 2}%,
          ${(100 - safeSize) / 2}% ${(100 - safeSize) / 2}%,
          ${(100 - safeSize) / 2}% ${100 - (100 - safeSize) / 2}%,
          ${100 - (100 - safeSize) / 2}% ${100 - (100 - safeSize) / 2}%,
          ${100 - (100 - safeSize) / 2}% ${(100 - safeSize) / 2}%,
          0% ${(100 - safeSize) / 2}%
        )`
      }" />
      <div class="safe-zone" :style="{
        width: `${safeSize}%`,
        height: `${safeSize}%`,
      }">
        <div class="safe-label">SAFE</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.shelter-mission {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  min-height: 220px;
  touch-action: none;
}

.danger-zone {
  position: relative;
  width: 200px;
  height: 200px;
  border: 2px solid var(--arc-danger);
  background: #0a0610;
  overflow: hidden;
  box-shadow: 0 0 0 2px #111311;
}

.radiation-overlay {
  position: absolute;
  inset: 0;
  background: rgba(255, 59, 92, 0.2);
  animation: radiation-pulse 0.5s ease-in-out infinite alternate;
  transition: clip-path 0.05s linear;
}

.safe-zone {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 2px dashed var(--px-green-bright);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.05s linear;
  box-shadow: 0 0 16px rgba(140, 200, 144, 0.1);
}

.safe-label {
  font-size: 16px;
  font-weight: 700;
  color: var(--px-green-bright);
  text-shadow: 0 0 8px var(--px-green-glow);
  font-family: monospace;
}

@keyframes radiation-pulse {
  from { background: rgba(255, 59, 92, 0.15); }
  to { background: rgba(255, 59, 92, 0.3); }
}
</style>
