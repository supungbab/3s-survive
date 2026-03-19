<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useAudio } from '@/composables/useAudio'

const { playTick } = useAudio()

const emit = defineEmits<{
  tap: [correct: boolean]
}>()

const containerEl = ref<HTMLElement | null>(null)
const level = ref(0) // 0~100
const phase = ref<'rising' | 'peak' | 'falling'>('rising')
let raf = 0
let startTime = 0
let resolved = false

const RISE_DURATION = 1500 // ms to reach peak
const PEAK_DURATION = 500 // ms at peak
const FALL_SPEED = 80 // % per second after peak

// Tick dots: visual representation of geiger clicks
const tickCount = ref(0)

function animate(now: number) {
  if (resolved) return
  const elapsed = now - startTime

  if (elapsed < RISE_DURATION) {
    // Rising phase: accelerating curve
    phase.value = 'rising'
    const t = elapsed / RISE_DURATION
    // Ease-in: slow start, fast finish
    level.value = Math.min(100, t * t * 100)
    // Tick count accelerates with level
    tickCount.value = Math.floor(t * t * 20)
  } else if (elapsed < RISE_DURATION + PEAK_DURATION) {
    // Peak phase
    phase.value = 'peak'
    level.value = 100
    tickCount.value = 20
  } else {
    // Falling phase
    phase.value = 'falling'
    const fallElapsed = (elapsed - RISE_DURATION - PEAK_DURATION) / 1000
    level.value = Math.max(0, 100 - fallElapsed * FALL_SPEED)
    tickCount.value = Math.max(0, Math.floor(level.value / 5))
    if (level.value <= 0) {
      resolved = true
      emit('tap', false)
      return
    }
  }

  raf = requestAnimationFrame(animate)
}

function onTap(e: TouchEvent | MouseEvent) {
  e.stopPropagation()
  if (e.cancelable) e.preventDefault()
  if (resolved) return
  resolved = true
  cancelAnimationFrame(raf)

  if (level.value >= 90) {
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
  <div ref="containerEl" class="geiger-mission">
    <div class="gauge-container">
      <div class="gauge-bg">
        <div class="gauge-fill" :style="{ height: `${level}%` }" :class="{ peak: level >= 90 }" />
        <div class="peak-zone" />
        <div class="gauge-ticks">
          <div
            v-for="n in 10"
            :key="n"
            class="gauge-tick"
            :style="{ bottom: `${n * 10}%` }"
          />
        </div>
      </div>
      <div class="gauge-percent" :class="{ peak: level >= 90 }">
        {{ Math.round(level) }}%
      </div>
    </div>

    <div class="tick-dots">
      <span
        v-for="n in 20"
        :key="n"
        class="tick-dot"
        :class="{ active: n <= tickCount }"
      />
    </div>

    <div class="geiger-hint">
      {{ phase === 'peak' ? 'TAP NOW!' : 'WAIT...' }}
    </div>
  </div>
</template>

<style scoped>
.geiger-mission {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px 24px;
  gap: 14px;
  touch-action: none;
  min-height: 200px;
}

.gauge-container {
  display: flex;
  align-items: flex-end;
  gap: 10px;
}

.gauge-bg {
  position: relative;
  width: 44px;
  height: 130px;
  border: 2px solid var(--px-green-border);
  background: #0c140c;
  box-shadow: 0 0 0 2px var(--px-green-frame);
  overflow: hidden;
}

.gauge-fill {
  position: absolute;
  bottom: 0;
  width: 100%;
  background: var(--px-green-bright);
  box-shadow: 0 0 10px var(--px-green-glow);
  transition: height 0.06s linear;
}

.gauge-fill.peak {
  background: var(--arc-danger);
  box-shadow: 0 0 16px var(--arc-danger), 0 0 32px rgba(255, 59, 92, 0.3);
  animation: peak-pulse 0.2s ease-in-out infinite alternate;
}

@keyframes peak-pulse {
  from { box-shadow: 0 0 16px var(--arc-danger); }
  to { box-shadow: 0 0 28px var(--arc-danger), 0 0 48px rgba(255, 59, 92, 0.4); }
}

.peak-zone {
  position: absolute;
  top: 0;
  width: 100%;
  height: 10%;
  border-bottom: 2px dashed rgba(255, 59, 92, 0.5);
  background: rgba(255, 59, 92, 0.06);
}

.gauge-ticks {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.gauge-tick {
  position: absolute;
  right: 0;
  width: 8px;
  height: 1px;
  background: var(--px-green-border);
}

.gauge-percent {
  font-family: monospace;
  font-size: 18px;
  font-weight: 700;
  color: var(--px-green-bright);
  text-shadow: 0 0 8px var(--px-green-glow);
  min-width: 48px;
}

.gauge-percent.peak {
  color: var(--arc-danger);
  text-shadow: 0 0 12px var(--arc-danger);
  animation: text-blink 0.15s steps(2) infinite;
}

@keyframes text-blink {
  0% { opacity: 1; }
  50% { opacity: 0.6; }
}

.tick-dots {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 200px;
}

.tick-dot {
  width: 6px;
  height: 6px;
  background: #1a2a1a;
  border: 1px solid var(--px-green-border);
  transition: background 0.08s;
}

.tick-dot.active {
  background: var(--px-green-bright);
  box-shadow: 0 0 6px var(--px-green-glow);
}

.geiger-hint {
  font-family: monospace;
  font-size: 16px;
  font-weight: 700;
  color: var(--arc-muted);
  transition: color 0.1s;
}

.geiger-mission:has(.gauge-fill.peak) .geiger-hint {
  color: var(--arc-danger);
  text-shadow: 0 0 8px var(--arc-danger);
}
</style>
