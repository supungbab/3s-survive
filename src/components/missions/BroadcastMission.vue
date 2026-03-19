<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useAudio } from '@/composables/useAudio'

const { playTick } = useAudio()

const emit = defineEmits<{
  tap: [correct: boolean]
}>()

const containerEl = ref<HTMLElement | null>(null)
const signalStrength = ref(0) // 0~1
const isHolding = ref(false)
const phase = ref<'idle' | 'charging' | 'done'>('idle')
let raf = 0
let startTime = 0
let resolved = false
const PEAK_THRESHOLD = 0.85
const SPEED = 2.5 // cycles per second

function animate(now: number) {
  if (!isHolding.value || resolved) return
  const elapsed = (now - startTime) / 1000
  // Sine wave oscillation: 0 to 1 to 0...
  signalStrength.value = Math.abs(Math.sin(elapsed * SPEED * Math.PI))
  raf = requestAnimationFrame(animate)
}

function onStart(e: TouchEvent | MouseEvent) {
  e.stopPropagation()
  if (e.cancelable) e.preventDefault()
  if (resolved || phase.value === 'done') return
  isHolding.value = true
  phase.value = 'charging'
  startTime = performance.now()
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

  if (signalStrength.value >= PEAK_THRESHOLD) {
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
  <div ref="containerEl" class="broadcast-mission">
    <div class="signal-meter">
      <div class="meter-bg">
        <div class="meter-fill" :style="{ height: `${signalStrength * 100}%` }" />
        <div class="peak-zone" />
      </div>
      <div class="meter-label">{{ Math.round(signalStrength * 100) }}%</div>
    </div>

    <div class="broadcast-btn" :class="{ active: isHolding }">
      {{ phase === 'idle' ? '꾹 눌러' : isHolding ? '피크에서 떼!' : '···' }}
    </div>
  </div>
</template>

<style scoped>
.broadcast-mission {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px 24px;
  gap: 16px;
  touch-action: none;
  min-height: 200px;
}

.signal-meter {
  display: flex;
  align-items: flex-end;
  gap: 8px;
}

.meter-bg {
  position: relative;
  width: 40px;
  height: 120px;
  border: 2px solid var(--px-green-border);
  background: #0c140c;
  box-shadow: 0 0 0 2px var(--px-green-frame);
  overflow: hidden;
}

.meter-fill {
  position: absolute;
  bottom: 0;
  width: 100%;
  background: var(--px-green-bright);
  box-shadow: 0 0 12px var(--px-green-glow-strong);
  transition: height 0.05s linear;
}

.peak-zone {
  position: absolute;
  top: 0;
  width: 100%;
  height: 15%;
  border-bottom: 2px dashed var(--px-green-dim);
  background: rgba(140, 200, 144, 0.08);
}

.meter-label {
  font-size: 16px;
  color: var(--px-green-bright);
  font-family: monospace;
  min-width: 40px;
}

.broadcast-btn {
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

.broadcast-btn.active {
  color: var(--px-green-bright);
  border-color: var(--px-green-bright);
  box-shadow:
    0 0 0 2px var(--px-green-frame),
    0 0 20px var(--px-green-glow-strong);
}
</style>
