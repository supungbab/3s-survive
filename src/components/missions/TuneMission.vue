<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useAudio } from '@/composables/useAudio'

const { playTick } = useAudio()

const emit = defineEmits<{
  tap: [correct: boolean]
}>()

const containerEl = ref<HTMLElement | null>(null)
const targetFreq = ref(50) // target position 0-100
const currentFreq = ref(20) // current needle position
const isDragging = ref(false)
let resolved = false

function getProximity(): number {
  const diff = Math.abs(currentFreq.value - targetFreq.value)
  return Math.max(0, 1 - diff / 50)
}

function checkLock() {
  if (resolved) return
  const diff = Math.abs(currentFreq.value - targetFreq.value)
  if (diff < 4) {
    resolved = true
    playTick()
    emit('tap', true)
  }
}

function onStart(e: TouchEvent | MouseEvent) {
  e.stopPropagation()
  if (e.cancelable) e.preventDefault()
  isDragging.value = true
  updateFromEvent(e)
}

function onMove(e: TouchEvent | MouseEvent) {
  e.stopPropagation()
  if (e.cancelable) e.preventDefault()
  if (!isDragging.value || resolved) return
  updateFromEvent(e)
  checkLock()
}

function onEnd(e: TouchEvent | MouseEvent) {
  e.stopPropagation()
  if (e.cancelable) e.preventDefault()
  isDragging.value = false
}

function updateFromEvent(e: TouchEvent | MouseEvent) {
  if (!containerEl.value) return
  const rect = containerEl.value.getBoundingClientRect()
  const clientX = 'touches' in e ? (e.touches[0]?.clientX ?? 0) : e.clientX
  const pct = ((clientX - rect.left) / rect.width) * 100
  currentFreq.value = Math.max(0, Math.min(100, pct))
}

onMounted(() => {
  targetFreq.value = 25 + Math.random() * 50
  currentFreq.value = Math.random() < 0.5 ? 5 + Math.random() * 15 : 85 + Math.random() * 10
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
  <div ref="containerEl" class="tune-mission">
    <div class="oscilloscope">
      <svg class="waveform" viewBox="0 0 200 60" preserveAspectRatio="none">
        <path
          :d="`M0,30 ${Array.from({length: 40}, (_, i) => {
            const x = i * 5
            const noise = (1 - getProximity()) * 12
            const y = 30 + Math.sin(i * 0.8 + currentFreq * 0.1) * (8 + noise) + (Math.random() - 0.5) * noise
            return `L${x},${y}`
          }).join(' ')}`"
          fill="none"
          stroke="var(--px-green-bright)"
          stroke-width="1.5"
          :opacity="0.5 + getProximity() * 0.5"
        />
      </svg>
    </div>

    <!-- Target zone -->
    <div class="freq-bar">
      <div class="target-zone" :style="{ left: `${targetFreq - 4}%`, width: '8%' }" />
      <div class="needle" :class="{ locked: Math.abs(currentFreq - targetFreq) < 4 }" :style="{ left: `${currentFreq}%` }" />
    </div>

    <div class="proximity-label" :style="{ opacity: 0.4 + getProximity() * 0.6 }">
      {{ getProximity() > 0.9 ? '■■■■■' : getProximity() > 0.7 ? '■■■■□' : getProximity() > 0.5 ? '■■■□□' : getProximity() > 0.3 ? '■■□□□' : '■□□□□' }}
    </div>
  </div>
</template>

<style scoped>
.tune-mission {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px 24px;
  gap: 12px;
  touch-action: none;
  min-height: 180px;
}

.oscilloscope {
  width: 100%;
  height: 60px;
  border: 2px solid var(--px-green-border);
  background: #060e06;
  overflow: hidden;
  box-shadow:
    0 0 0 2px var(--px-green-frame),
    inset 0 0 20px rgba(140, 200, 144, 0.05);
}

.waveform {
  width: 100%;
  height: 100%;
}

.freq-bar {
  position: relative;
  width: 100%;
  height: 32px;
  background: #0c140c;
  border: 2px solid #3a4a38;
  box-shadow: 0 0 0 2px #111311;
}

.target-zone {
  position: absolute;
  top: 0;
  height: 100%;
  background: rgba(140, 200, 144, 0.12);
  border-left: 2px dashed var(--px-green-dim);
  border-right: 2px dashed var(--px-green-dim);
}

.needle {
  position: absolute;
  top: -4px;
  width: 3px;
  height: calc(100% + 8px);
  background: var(--px-green-bright);
  transform: translateX(-50%);
  box-shadow: 0 0 8px var(--px-green-glow);
  transition: left 0.05s linear;
}

.needle.locked {
  background: #fff;
  box-shadow: 0 0 16px var(--px-green-glow-strong), 0 0 32px var(--px-green-glow);
}

.proximity-label {
  font-size: 18px;
  color: var(--px-green-bright);
  letter-spacing: 4px;
  font-family: monospace;
}
</style>
