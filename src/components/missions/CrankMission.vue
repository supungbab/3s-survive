<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useAudio } from '@/composables/useAudio'

const { playTick } = useAudio()

const props = defineProps<{
  crankRotations: number
}>()

const emit = defineEmits<{
  tap: [correct: boolean]
}>()

const containerEl = ref<HTMLElement | null>(null)
const completedRotations = ref(0)
const handleAngle = ref(0)

let centerX = 0
let centerY = 0
let lastAngle = 0
let cumulative = 0
let tracking = false
let resolved = false

function getAngleFromCenter(clientX: number, clientY: number): number {
  return Math.atan2(clientY - centerY, clientX - centerX)
}

function onStart(e: TouchEvent | MouseEvent) {
  e.stopPropagation()
  if (e.cancelable) e.preventDefault()
  if (resolved) return

  const el = containerEl.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  centerX = rect.left + rect.width / 2
  centerY = rect.top + rect.height / 2

  const clientX = 'touches' in e ? (e.touches[0]?.clientX ?? 0) : e.clientX
  const clientY = 'touches' in e ? (e.touches[0]?.clientY ?? 0) : e.clientY
  lastAngle = getAngleFromCenter(clientX, clientY)
  tracking = true
}

function onMove(e: TouchEvent | MouseEvent) {
  e.stopPropagation()
  if (e.cancelable) e.preventDefault()
  if (!tracking || resolved) return

  const clientX = 'touches' in e ? (e.touches[0]?.clientX ?? 0) : e.clientX
  const clientY = 'touches' in e ? (e.touches[0]?.clientY ?? 0) : e.clientY
  const angle = getAngleFromCenter(clientX, clientY)

  let diff = angle - lastAngle
  // Normalize to [-PI, PI]
  while (diff > Math.PI) diff -= 2 * Math.PI
  while (diff < -Math.PI) diff += 2 * Math.PI

  cumulative += diff
  lastAngle = angle
  handleAngle.value += diff * (180 / Math.PI)

  const newRotations = Math.floor(Math.abs(cumulative) / (2 * Math.PI))
  if (newRotations > completedRotations.value) {
    completedRotations.value = newRotations
    playTick()
    if (completedRotations.value >= props.crankRotations) {
      resolved = true
      emit('tap', true)
    }
  }
}

function onEnd(e: TouchEvent | MouseEvent) {
  e.stopPropagation()
  if (e.cancelable) e.preventDefault()
  tracking = false
}

onMounted(() => {
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
  <div ref="containerEl" class="crank-mission">
    <div class="crank-visual">
      <svg viewBox="0 0 160 160" class="crank-svg">
        <!-- Outer ring -->
        <circle
          cx="80" cy="80" r="60"
          fill="none"
          stroke="var(--px-green-border)"
          stroke-width="4"
        />
        <!-- Inner ring -->
        <circle
          cx="80" cy="80" r="20"
          fill="var(--px-green-bg)"
          stroke="var(--px-green-dim)"
          stroke-width="2"
        />
        <!-- Arm -->
        <line
          x1="80" y1="80"
          :x2="80 + 60 * Math.cos(handleAngle * Math.PI / 180)"
          :y2="80 + 60 * Math.sin(handleAngle * Math.PI / 180)"
          stroke="var(--px-green-bright)"
          stroke-width="4"
          stroke-linecap="round"
          class="crank-arm"
        />
        <!-- Handle dot -->
        <circle
          :cx="80 + 60 * Math.cos(handleAngle * Math.PI / 180)"
          :cy="80 + 60 * Math.sin(handleAngle * Math.PI / 180)"
          r="10"
          fill="var(--px-green-bright)"
          class="crank-handle"
        />
        <!-- Center bolt -->
        <circle cx="80" cy="80" r="6" fill="var(--px-green-dim)" />
      </svg>
    </div>

    <div class="crank-progress">
      {{ completedRotations }}/{{ crankRotations }} ROTATIONS
    </div>

    <div class="crank-hint">CRANK</div>
  </div>
</template>

<style scoped>
.crank-mission {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px 24px;
  gap: 12px;
  touch-action: none;
  min-height: 220px;
}

.crank-visual {
  position: relative;
  width: 160px;
  height: 160px;
  filter: drop-shadow(0 0 12px var(--px-green-glow));
}

.crank-svg {
  width: 100%;
  height: 100%;
}

.crank-arm {
  filter: drop-shadow(0 0 4px var(--px-green-glow));
}

.crank-handle {
  filter: drop-shadow(0 0 8px var(--px-green-glow-strong));
}

.crank-progress {
  font-size: 20px;
  font-weight: 700;
  font-family: monospace;
  color: var(--px-green-bright);
  text-shadow: 0 0 12px var(--px-green-glow);
  letter-spacing: 2px;
}

.crank-hint {
  font-size: 12px;
  font-family: monospace;
  color: var(--arc-muted);
  letter-spacing: 3px;
}
</style>
