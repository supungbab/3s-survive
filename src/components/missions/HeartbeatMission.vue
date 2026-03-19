<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useAudio } from '@/composables/useAudio'

const { playTick } = useAudio()

const emit = defineEmits<{
  tap: [correct: boolean]
}>()

const phase = ref<'beating' | 'flatline' | 'revived' | 'lost'>('beating')
const pathOffset = ref(0)
let raf = 0
let flatlineTimer: ReturnType<typeof setTimeout> | null = null
let lostTimer: ReturnType<typeof setTimeout> | null = null
let startTime = 0
let resolved = false

// Heartbeat SVG waveform: normal sinus rhythm pattern
const BEAT_PATH = 'M 0,50 L 30,50 L 35,50 L 38,20 L 42,80 L 46,35 L 50,50 L 80,50 L 85,50 L 88,20 L 92,80 L 96,35 L 100,50 L 130,50 L 135,50 L 138,20 L 142,80 L 146,35 L 150,50 L 180,50 L 185,50 L 188,20 L 192,80 L 196,35 L 200,50'
const FLAT_PATH = 'M 0,50 L 200,50'

function animate() {
  const elapsed = performance.now() - startTime
  pathOffset.value = (elapsed * 0.08) % 200
  raf = requestAnimationFrame(animate)
}

function handleRevive() {
  if (resolved) return
  resolved = true
  playTick()
  phase.value = 'revived'
  emit('tap', true)
}

onMounted(() => {
  startTime = performance.now()
  raf = requestAnimationFrame(animate)

  flatlineTimer = setTimeout(() => {
    phase.value = 'flatline'

    lostTimer = setTimeout(() => {
      if (!resolved) {
        phase.value = 'lost'
      }
    }, 1500)
  }, 1200)
})

onUnmounted(() => {
  cancelAnimationFrame(raf)
  if (flatlineTimer) clearTimeout(flatlineTimer)
  if (lostTimer) clearTimeout(lostTimer)
})
</script>

<template>
  <div class="heartbeat-mission">
    <div class="monitor-screen">
      <svg
        class="ecg-svg"
        viewBox="0 0 200 100"
        preserveAspectRatio="none"
      >
        <path
          v-if="phase === 'beating' || phase === 'revived'"
          class="ecg-line beating"
          :d="BEAT_PATH"
          :style="{ strokeDashoffset: -pathOffset }"
        />
        <path
          v-else
          class="ecg-line flat"
          :d="FLAT_PATH"
        />
      </svg>

      <div class="monitor-label">
        {{ phase === 'beating' ? 'VITALS' : phase === 'flatline' ? 'FLATLINE' : phase === 'revived' ? 'REVIVED' : 'SIGNAL LOST' }}
      </div>
    </div>

    <button
      v-if="phase === 'flatline'"
      class="revive-btn"
      @pointerdown="handleRevive"
    >
      REVIVE
    </button>

    <div v-else-if="phase === 'lost'" class="lost-hint">
      NO PULSE
    </div>
  </div>
</template>

<style scoped>
.heartbeat-mission {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px 24px;
  gap: 16px;
  min-height: 200px;
}

.monitor-screen {
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

.ecg-svg {
  width: 100%;
  height: 100%;
}

.ecg-line {
  fill: none;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  vector-effect: non-scaling-stroke;
}

.ecg-line.beating {
  stroke: var(--px-green-bright);
  filter: drop-shadow(0 0 6px var(--px-green-glow));
  stroke-dasharray: 200;
  transition: stroke-dashoffset 0.05s linear;
}

.ecg-line.flat {
  stroke: var(--arc-danger);
  filter: drop-shadow(0 0 8px rgba(255, 59, 92, 0.6));
  animation: flat-pulse 0.6s ease-in-out infinite alternate;
}

.monitor-label {
  position: absolute;
  top: 8px;
  right: 12px;
  font-size: 12px;
  font-family: monospace;
  color: var(--px-green-dim);
  text-shadow: 0 0 6px var(--px-green-glow);
  letter-spacing: 2px;
}

.revive-btn {
  width: 140px;
  height: 56px;
  background: var(--px-green-bg);
  border: 3px solid var(--arc-danger);
  border-radius: 0;
  color: var(--arc-danger);
  font-size: 20px;
  font-weight: 700;
  font-family: monospace;
  cursor: pointer;
  letter-spacing: 3px;
  animation: revive-pulse 0.4s ease-in-out infinite alternate;
  box-shadow:
    0 0 0 2px var(--px-green-frame),
    0 0 24px rgba(255, 59, 92, 0.3),
    inset 1px 1px 0 var(--px-green-bevel-light),
    inset -1px -1px 0 var(--px-green-bevel-dark);
}

.revive-btn:active {
  transform: scale(0.9);
}

.lost-hint {
  font-size: 14px;
  font-family: monospace;
  color: var(--arc-muted);
  letter-spacing: 3px;
}

@keyframes revive-pulse {
  from {
    box-shadow:
      0 0 0 2px var(--px-green-frame),
      0 0 12px rgba(255, 59, 92, 0.2),
      inset 1px 1px 0 var(--px-green-bevel-light),
      inset -1px -1px 0 var(--px-green-bevel-dark);
  }
  to {
    box-shadow:
      0 0 0 2px var(--px-green-frame),
      0 0 32px rgba(255, 59, 92, 0.5),
      inset 1px 1px 0 var(--px-green-bevel-light),
      inset -1px -1px 0 var(--px-green-bevel-dark);
  }
}

@keyframes flat-pulse {
  from { opacity: 0.6; }
  to { opacity: 1; }
}
</style>
