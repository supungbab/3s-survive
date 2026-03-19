<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useAudio } from '@/composables/useAudio'

const { playTick } = useAudio()

const emit = defineEmits<{
  tap: [correct: boolean]
}>()

const containerEl = ref<HTMLElement | null>(null)
const fuelLevel = ref(0) // 0~1
const isHolding = ref(false)
const phase = ref<'idle' | 'filling' | 'done'>('idle')
let raf = 0
let lastTime = 0
let resolved = false

// Target zone: random between 70~80%
const targetCenter = 0.70 + Math.random() * 0.10
const ZONE_HALF = 0.05
const targetMin = targetCenter - ZONE_HALF
const targetMax = targetCenter + ZONE_HALF
const FILL_SPEED = 0.45 // per second

function animate(now: number) {
  if (!isHolding.value || resolved) return
  const dt = lastTime ? (now - lastTime) / 1000 : 0
  lastTime = now
  fuelLevel.value = Math.min(fuelLevel.value + FILL_SPEED * dt, 1.01)

  if (fuelLevel.value > 1) {
    // Overflow — auto-fail
    resolved = true
    phase.value = 'done'
    cancelAnimationFrame(raf)
    fuelLevel.value = 1
    emit('tap', false)
    return
  }

  raf = requestAnimationFrame(animate)
}

function onStart(e: TouchEvent | MouseEvent) {
  e.stopPropagation()
  if (e.cancelable) e.preventDefault()
  if (resolved || phase.value === 'done') return
  isHolding.value = true
  phase.value = 'filling'
  lastTime = 0
  raf = requestAnimationFrame(animate)
}

function onEnd(e: TouchEvent | MouseEvent) {
  e.stopPropagation()
  if (e.cancelable) e.preventDefault()
  if (resolved || !isHolding.value) return
  isHolding.value = false
  cancelAnimationFrame(raf)
  resolved = true
  phase.value = 'done'

  if (fuelLevel.value >= targetMin && fuelLevel.value <= targetMax) {
    playTick()
    emit('tap', true)
  } else {
    emit('tap', false)
  }
}

onMounted(() => {
  if (!containerEl.value) return
  const el = containerEl.value
  el.addEventListener('touchstart', onStart, { passive: false })
  el.addEventListener('touchend', onEnd, { passive: false })
  el.addEventListener('mousedown', onStart)
  el.addEventListener('mouseup', onEnd)
})

onUnmounted(() => {
  cancelAnimationFrame(raf)
  if (!containerEl.value) return
  const el = containerEl.value
  el.removeEventListener('touchstart', onStart)
  el.removeEventListener('touchend', onEnd)
  el.removeEventListener('mousedown', onStart)
  el.removeEventListener('mouseup', onEnd)
})
</script>

<template>
  <div ref="containerEl" class="siphon-mission">
    <div class="fuel-gauge">
      <div class="gauge-body">
        <div class="gauge-fill" :style="{ height: `${Math.min(fuelLevel, 1) * 100}%` }" />
        <div
          class="target-zone"
          :style="{
            bottom: `${targetMin * 100}%`,
            height: `${(targetMax - targetMin) * 100}%`,
          }"
        />
        <div class="target-line" :style="{ bottom: `${targetCenter * 100}%` }" />
      </div>
      <div class="gauge-labels">
        <span class="gauge-pct">{{ Math.round(Math.min(fuelLevel, 1) * 100) }}%</span>
        <span class="gauge-target">▸ {{ Math.round(targetCenter * 100) }}%</span>
      </div>
    </div>

    <div class="siphon-btn" :class="{ active: isHolding }">
      {{ phase === 'idle' ? 'HOLD TO FILL' : isHolding ? 'RELEASE AT LINE' : '···' }}
    </div>
  </div>
</template>

<style scoped>
.siphon-mission {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px 24px;
  gap: 16px;
  touch-action: none;
  min-height: 200px;
}

.fuel-gauge {
  display: flex;
  align-items: flex-end;
  gap: 10px;
}

.gauge-body {
  position: relative;
  width: 44px;
  height: 140px;
  border: 2px solid var(--px-green-border);
  background: #0c0c0c;
  box-shadow: 0 0 0 2px var(--px-green-frame);
  overflow: hidden;
}

.gauge-fill {
  position: absolute;
  bottom: 0;
  width: 100%;
  background: #ffd644;
  box-shadow: 0 0 14px rgba(255, 214, 68, 0.5);
  transition: height 0.05s linear;
}

.target-zone {
  position: absolute;
  left: 0;
  width: 100%;
  background: rgba(140, 200, 144, 0.1);
  border-top: 2px dashed var(--px-green-dim);
  border-bottom: 2px dashed var(--px-green-dim);
  pointer-events: none;
}

.target-line {
  position: absolute;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--px-green-bright);
  box-shadow: 0 0 8px var(--px-green-glow-strong);
  pointer-events: none;
}

.gauge-labels {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-family: monospace;
  font-size: 15px;
}

.gauge-pct {
  color: #ffd644;
  text-shadow: 0 0 8px rgba(255, 214, 68, 0.5);
}

.gauge-target {
  color: var(--px-green-bright);
  text-shadow: 0 0 6px var(--px-green-glow);
  font-size: 13px;
}

.siphon-btn {
  font-size: 18px;
  font-weight: 700;
  color: var(--arc-muted);
  padding: 12px 24px;
  border: 2px solid var(--px-green-border);
  background: var(--px-green-bg);
  box-shadow:
    0 0 0 2px var(--px-green-frame),
    inset 1px 1px 0 var(--px-green-bevel-light),
    inset -1px -1px 0 var(--px-green-bevel-dark);
  transition: all 0.15s;
}

.siphon-btn.active {
  color: #ffd644;
  border-color: #ffd644;
  box-shadow:
    0 0 0 2px var(--px-green-frame),
    0 0 20px rgba(255, 214, 68, 0.4);
}
</style>
