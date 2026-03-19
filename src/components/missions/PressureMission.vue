<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useAudio } from '@/composables/useAudio'

const { playTick } = useAudio()

const emit = defineEmits<{
  tap: [correct: boolean]
}>()

const containerEl = ref<HTMLElement | null>(null)
const leftGauge = ref(60)
const rightGauge = ref(60)

const DRAIN_RATE = 15 // % per second
const PUMP_AMOUNT = 25 // % per tap
const DANGER_ZONE = 20 // %
const SURVIVE_TIME = 2000 // ms
const MAX_GAUGE = 100

let resolved = false
let lastTime = 0
let surviveStart = 0
let bothAboveSince = 0
let raf = 0

function animate(now: number) {
  if (resolved) return

  if (lastTime === 0) {
    lastTime = now
    bothAboveSince = now
    surviveStart = now
  }

  const dt = (now - lastTime) / 1000 // seconds
  lastTime = now

  // Drain both gauges
  leftGauge.value = Math.max(0, leftGauge.value - DRAIN_RATE * dt)
  rightGauge.value = Math.max(0, rightGauge.value - DRAIN_RATE * dt)

  // Check danger
  const bothAbove = leftGauge.value > DANGER_ZONE && rightGauge.value > DANGER_ZONE

  if (!bothAbove) {
    if (leftGauge.value <= 0 || rightGauge.value <= 0) {
      // Gauge fully depleted - fail
      resolved = true
      emit('tap', false)
      return
    }
    bothAboveSince = now
  }

  // Check if both have been above danger for SURVIVE_TIME
  if (bothAbove && now - bothAboveSince >= SURVIVE_TIME) {
    resolved = true
    playTick()
    emit('tap', true)
    return
  }

  raf = requestAnimationFrame(animate)
}

function onTap(e: TouchEvent | MouseEvent) {
  e.stopPropagation()
  if (e.cancelable) e.preventDefault()
  if (resolved) return

  // Determine tap position (left or right half)
  if (!containerEl.value) return
  const rect = containerEl.value.getBoundingClientRect()
  const clientX = 'touches' in e ? (e.touches[0]?.clientX ?? 0) : e.clientX
  const midX = rect.left + rect.width / 2

  if (clientX < midX) {
    leftGauge.value = Math.min(MAX_GAUGE, leftGauge.value + PUMP_AMOUNT)
  } else {
    rightGauge.value = Math.min(MAX_GAUGE, rightGauge.value + PUMP_AMOUNT)
  }
}

onMounted(() => {
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
  <div ref="containerEl" class="pressure-mission">
    <div class="pressure-label">MAINTAIN PRESSURE</div>

    <div class="gauges">
      <!-- Left gauge -->
      <div class="gauge-container">
        <div class="gauge-label">L</div>
        <div class="gauge-track">
          <div class="danger-zone" />
          <div class="danger-line" />
          <div
            class="gauge-fill left-fill"
            :class="{ danger: leftGauge <= DANGER_ZONE }"
            :style="{ height: `${leftGauge}%` }"
          />
          <div class="gauge-ticks">
            <div v-for="i in 5" :key="i" class="tick" :style="{ bottom: `${i * 20}%` }" />
          </div>
        </div>
        <div class="gauge-value" :class="{ danger: leftGauge <= DANGER_ZONE }">
          {{ Math.round(leftGauge) }}
        </div>
      </div>

      <!-- Right gauge -->
      <div class="gauge-container">
        <div class="gauge-label">R</div>
        <div class="gauge-track">
          <div class="danger-zone" />
          <div class="danger-line" />
          <div
            class="gauge-fill right-fill"
            :class="{ danger: rightGauge <= DANGER_ZONE }"
            :style="{ height: `${rightGauge}%` }"
          />
          <div class="gauge-ticks">
            <div v-for="i in 5" :key="i" class="tick" :style="{ bottom: `${i * 20}%` }" />
          </div>
        </div>
        <div class="gauge-value" :class="{ danger: rightGauge <= DANGER_ZONE }">
          {{ Math.round(rightGauge) }}
        </div>
      </div>
    </div>

    <div class="pressure-hint">TAP LEFT / RIGHT</div>
  </div>
</template>

<style scoped>
.pressure-mission {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px 24px;
  gap: 10px;
  touch-action: none;
  min-height: 200px;
  user-select: none;
}

.pressure-label {
  font-size: 13px;
  font-weight: 700;
  color: var(--px-green-bright);
  text-shadow: 0 0 8px var(--px-green-glow);
  font-family: monospace;
  letter-spacing: 2px;
}

.gauges {
  display: flex;
  gap: 40px;
  align-items: flex-end;
}

.gauge-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.gauge-label {
  font-size: 16px;
  font-weight: 700;
  color: var(--px-green-bright);
  text-shadow: 0 0 6px var(--px-green-glow);
  font-family: monospace;
}

.gauge-track {
  position: relative;
  width: 36px;
  height: 120px;
  border: 2px solid var(--px-green-border);
  background: #060e06;
  box-shadow:
    0 0 0 2px var(--px-green-frame),
    inset 0 0 8px rgba(0, 0, 0, 0.5);
  overflow: hidden;
}

.danger-zone {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 20%;
  background: rgba(255, 60, 60, 0.08);
}

.danger-line {
  position: absolute;
  bottom: 20%;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--arc-danger);
  box-shadow: 0 0 6px var(--arc-danger-glow);
  opacity: 0.7;
  z-index: 2;
}

.gauge-fill {
  position: absolute;
  bottom: 0;
  left: 2px;
  right: 2px;
  background: var(--px-green-bright);
  box-shadow:
    0 0 8px var(--px-green-glow),
    inset 0 0 4px rgba(140, 200, 144, 0.3);
  transition: height 0.05s linear;
}

.gauge-fill.danger {
  background: var(--arc-danger);
  box-shadow:
    0 0 12px var(--arc-danger-glow),
    inset 0 0 4px rgba(255, 60, 60, 0.3);
  animation: danger-pulse 0.3s ease-in-out infinite alternate;
}

.gauge-ticks {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.tick {
  position: absolute;
  left: 0;
  width: 8px;
  height: 1px;
  background: var(--px-green-dim);
}

.gauge-value {
  font-size: 14px;
  font-weight: 700;
  color: var(--px-green-bright);
  font-family: monospace;
  text-shadow: 0 0 6px var(--px-green-glow);
  min-width: 28px;
  text-align: center;
}

.gauge-value.danger {
  color: var(--arc-danger);
  text-shadow: 0 0 8px var(--arc-danger-glow);
}

.pressure-hint {
  font-size: 14px;
  color: var(--arc-muted);
  font-family: monospace;
}

@keyframes danger-pulse {
  0% { opacity: 0.7; }
  100% { opacity: 1; }
}
</style>
