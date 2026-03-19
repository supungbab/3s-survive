<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useAudio } from '@/composables/useAudio'

const { playTick } = useAudio()

const emit = defineEmits<{
  tap: [correct: boolean]
}>()

const containerEl = ref<HTMLElement | null>(null)
const barA = ref(0.3)
const barB = ref(0.7)
const isHolding = ref(false)
let raf = 0
let resolved = false
let startTime = 0

const SPEED_A = 1.8
const SPEED_B = 2.7
const SYNC_THRESHOLD = 0.10
const CONVERGE_SPEED = 0.012

function animate(now: number) {
  if (resolved) return
  const elapsed = (now - startTime) / 1000

  if (isHolding.value) {
    // While holding, bars converge toward 0.5
    const mid = (barA.value + barB.value) / 2
    barA.value += (mid - barA.value) * CONVERGE_SPEED * 3
    barB.value += (mid - barB.value) * CONVERGE_SPEED * 3
  } else {
    // Free oscillation at different speeds
    barA.value = 0.5 + 0.4 * Math.sin(elapsed * SPEED_A * Math.PI)
    barB.value = 0.5 + 0.4 * Math.sin(elapsed * SPEED_B * Math.PI)
  }

  raf = requestAnimationFrame(animate)
}

function onStart(e: TouchEvent | MouseEvent) {
  e.stopPropagation()
  if (e.cancelable) e.preventDefault()
  if (resolved) return
  isHolding.value = true
}

function onEnd(e: TouchEvent | MouseEvent) {
  e.stopPropagation()
  if (e.cancelable) e.preventDefault()
  if (resolved || !isHolding.value) return
  isHolding.value = false
  resolved = true

  const diff = Math.abs(barA.value - barB.value)
  if (diff <= SYNC_THRESHOLD) {
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
  <div ref="containerEl" class="freq-jam-mission">
    <div class="freq-display">
      <div class="freq-bar-wrap">
        <div class="freq-label">A</div>
        <div class="freq-track">
          <div class="freq-fill" :style="{ height: `${barA * 100}%` }" />
        </div>
      </div>

      <div class="sync-indicator" :class="{ synced: Math.abs(barA - barB) <= 0.10 }">
        {{ Math.abs(barA - barB) <= 0.10 ? 'SYNC' : '···' }}
      </div>

      <div class="freq-bar-wrap">
        <div class="freq-label">B</div>
        <div class="freq-track">
          <div class="freq-fill" :style="{ height: `${barB * 100}%` }" />
        </div>
      </div>
    </div>

    <div class="jam-hint" :class="{ active: isHolding }">
      {{ isHolding ? 'RELEASE WHEN SYNCED' : 'HOLD TO JAM' }}
    </div>
  </div>
</template>

<style scoped>
.freq-jam-mission {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px 24px;
  gap: 16px;
  touch-action: none;
  min-height: 200px;
}

.freq-display {
  display: flex;
  align-items: flex-end;
  gap: 20px;
}

.freq-bar-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.freq-label {
  font-size: 14px;
  font-weight: 700;
  font-family: monospace;
  color: var(--px-green-bright);
  text-shadow: 0 0 8px var(--px-green-glow);
}

.freq-track {
  position: relative;
  width: 36px;
  height: 120px;
  border: 2px solid var(--px-green-border);
  background: #0c140c;
  box-shadow: 0 0 0 2px var(--px-green-frame);
  overflow: hidden;
}

.freq-fill {
  position: absolute;
  bottom: 0;
  width: 100%;
  background: var(--px-green-bright);
  box-shadow: 0 0 12px var(--px-green-glow-strong);
  transition: height 0.05s linear;
}

.sync-indicator {
  font-size: 14px;
  font-weight: 700;
  font-family: monospace;
  color: var(--arc-muted);
  text-align: center;
  min-width: 40px;
  transition: color 0.15s;
}

.sync-indicator.synced {
  color: var(--px-green-bright);
  text-shadow: 0 0 12px var(--px-green-glow-strong);
}

.jam-hint {
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

.jam-hint.active {
  color: var(--px-green-bright);
  border-color: var(--px-green-bright);
  box-shadow:
    0 0 0 2px var(--px-green-frame),
    0 0 20px var(--px-green-glow-strong);
}
</style>
