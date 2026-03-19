<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useAudio } from '@/composables/useAudio'

const { playTick } = useAudio()

const props = defineProps<{
  lockpickSteps: number
}>()

const emit = defineEmits<{
  tap: [correct: boolean]
}>()

const containerEl = ref<HTMLElement | null>(null)
const angle = ref(0) // current indicator angle in degrees
const currentStep = ref(0)
let resolved = false
let raf = 0
let startTime = 0

// Sweet spot: center angle and half-width in degrees
const SWEET_SPOT_SIZE = 36 // degrees wide
const SPEED = 240 // degrees per second

// Generate random sweet spot position for each step
const sweetSpots = ref<number[]>([])

function generateSpots() {
  const spots: number[] = []
  for (let i = 0; i < props.lockpickSteps; i++) {
    spots.push(Math.floor(Math.random() * 360))
  }
  sweetSpots.value = spots
}

const currentSpot = computed(() => sweetSpots.value[currentStep.value] ?? 0)
const progress = computed(() => `${currentStep.value}/${props.lockpickSteps}`)

// Check if angle is within sweet spot
function isInZone(): boolean {
  const spot = currentSpot.value
  const half = SWEET_SPOT_SIZE / 2
  let diff = Math.abs(angle.value - spot)
  if (diff > 180) diff = 360 - diff
  return diff <= half
}

// SVG arc path helper
function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number): string {
  const startRad = ((startAngle - 90) * Math.PI) / 180
  const endRad = ((endAngle - 90) * Math.PI) / 180
  const x1 = cx + r * Math.cos(startRad)
  const y1 = cy + r * Math.sin(startRad)
  const x2 = cx + r * Math.cos(endRad)
  const y2 = cy + r * Math.sin(endRad)
  const largeArc = endAngle - startAngle > 180 ? 1 : 0
  return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`
}

const sweetSpotPath = computed(() => {
  const spot = currentSpot.value
  const half = SWEET_SPOT_SIZE / 2
  let start = spot - half
  let end = spot + half
  if (start < 0) start += 360
  if (end >= 360) end -= 360
  // Handle wrap-around: always draw short arc
  if (start > end) {
    return describeArc(60, 60, 46, start, end + 360)
  }
  return describeArc(60, 60, 46, start, end)
})

// Indicator tip position
const indicatorX = computed(() => {
  const rad = ((angle.value - 90) * Math.PI) / 180
  return 60 + 42 * Math.cos(rad)
})
const indicatorY = computed(() => {
  const rad = ((angle.value - 90) * Math.PI) / 180
  return 60 + 42 * Math.sin(rad)
})

function animate(now: number) {
  if (resolved) return
  const elapsed = (now - startTime) / 1000
  angle.value = (elapsed * SPEED) % 360
  raf = requestAnimationFrame(animate)
}

function onTap(e: TouchEvent | MouseEvent) {
  e.stopPropagation()
  if (e.cancelable) e.preventDefault()
  if (resolved) return

  if (isInZone()) {
    currentStep.value++
    playTick()
    if (currentStep.value >= props.lockpickSteps) {
      resolved = true
      cancelAnimationFrame(raf)
      emit('tap', true)
    }
    // Sweet spot moves on next step (already pre-generated)
  } else {
    resolved = true
    cancelAnimationFrame(raf)
    emit('tap', false)
  }
}

onMounted(() => {
  generateSpots()
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
  <div ref="containerEl" class="lockpick-mission">
    <div class="dial-container">
      <svg viewBox="0 0 120 120" class="dial-svg">
        <!-- Dial ring -->
        <circle cx="60" cy="60" r="46" fill="none" stroke="var(--px-green-border)" stroke-width="2" />
        <circle cx="60" cy="60" r="46" fill="none" stroke="var(--px-green-frame)" stroke-width="6" opacity="0.15" />

        <!-- Tick marks -->
        <line
          v-for="n in 12"
          :key="n"
          :x1="60 + 40 * Math.cos(((n * 30 - 90) * Math.PI) / 180)"
          :y1="60 + 40 * Math.sin(((n * 30 - 90) * Math.PI) / 180)"
          :x2="60 + 46 * Math.cos(((n * 30 - 90) * Math.PI) / 180)"
          :y2="60 + 46 * Math.sin(((n * 30 - 90) * Math.PI) / 180)"
          stroke="var(--px-green-border)"
          stroke-width="1.5"
        />

        <!-- Sweet spot arc -->
        <path
          :d="sweetSpotPath"
          fill="none"
          stroke="var(--px-green-bright)"
          stroke-width="6"
          opacity="0.6"
          stroke-linecap="round"
        />

        <!-- Indicator line from center -->
        <line
          x1="60" y1="60"
          :x2="indicatorX"
          :y2="indicatorY"
          stroke="var(--px-green-bright)"
          stroke-width="2"
        />

        <!-- Indicator tip -->
        <circle
          :cx="indicatorX"
          :cy="indicatorY"
          r="4"
          fill="var(--px-green-bright)"
          class="indicator-dot"
        />

        <!-- Center dot -->
        <circle cx="60" cy="60" r="3" fill="var(--px-green-border)" />
      </svg>
    </div>

    <div class="lockpick-progress">{{ progress }}</div>
    <div class="lockpick-hint">TAP IN ZONE</div>
  </div>
</template>

<style scoped>
.lockpick-mission {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px 24px;
  gap: 12px;
  touch-action: none;
  min-height: 200px;
}

.dial-container {
  width: 160px;
  height: 160px;
  border: 2px solid var(--px-green-border);
  background: #060e06;
  box-shadow:
    0 0 0 2px var(--px-green-frame),
    inset 0 0 30px rgba(140, 200, 144, 0.04);
  padding: 8px;
}

.dial-svg {
  width: 100%;
  height: 100%;
}

.indicator-dot {
  filter: drop-shadow(0 0 6px var(--px-green-glow-strong));
}

.lockpick-progress {
  font-family: monospace;
  font-size: 22px;
  font-weight: 700;
  color: var(--px-green-bright);
  text-shadow: 0 0 10px var(--px-green-glow);
}

.lockpick-hint {
  font-family: monospace;
  font-size: 14px;
  color: var(--arc-muted);
}
</style>
