<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useAudio } from '@/composables/useAudio'

const { playTick } = useAudio()

const props = defineProps<{
  distressPattern: number[]
}>()

const emit = defineEmits<{
  tap: [correct: boolean]
}>()

type Phase = 'WATCH' | 'REPEAT'

const phase = ref<Phase>('WATCH')
const beaconOn = ref(false)
const containerEl = ref<HTMLElement | null>(null)

const TOLERANCE = 150
let timers: ReturnType<typeof setTimeout>[] = []
let resolved = false

// Player input tracking
const tapTimes = ref<number[]>([])
const currentTapIndex = ref(0)
const totalTapsNeeded = ref(0)

onMounted(() => {
  // Number of taps = intervals + 1, so intervals = taps - 1
  // distressPattern is the array of intervals between flashes
  totalTapsNeeded.value = props.distressPattern.length + 1
  playPattern()

  if (containerEl.value) {
    const el = containerEl.value
    el.addEventListener('touchstart', onTouch, { passive: false })
    el.addEventListener('mousedown', onMouse)
  }
})

onUnmounted(() => {
  timers.forEach(t => clearTimeout(t))
  if (containerEl.value) {
    containerEl.value.removeEventListener('touchstart', onTouch)
    containerEl.value.removeEventListener('mousedown', onMouse)
  }
})

function playPattern() {
  phase.value = 'WATCH'
  const intervals = props.distressPattern
  let elapsed = 300 // initial delay before first flash

  // Flash at each beat
  for (let i = 0; i <= intervals.length; i++) {
    const showTime = elapsed
    const t1 = setTimeout(() => {
      if (resolved) return
      beaconOn.value = true
    }, showTime)
    const t2 = setTimeout(() => {
      if (resolved) return
      beaconOn.value = false
    }, showTime + 200) // flash duration 200ms
    timers.push(t1, t2)

    if (i < intervals.length) {
      elapsed += intervals[i]
    }
  }

  // Switch to REPEAT phase after pattern finishes
  const switchTime = elapsed + 500
  const t3 = setTimeout(() => {
    if (resolved) return
    phase.value = 'REPEAT'
  }, switchTime)
  timers.push(t3)
}

function handleTap() {
  if (resolved) return
  if (phase.value !== 'REPEAT') return

  const now = performance.now()
  tapTimes.value.push(now)
  currentTapIndex.value = tapTimes.value.length

  // Flash beacon on tap
  beaconOn.value = true
  const t = setTimeout(() => { beaconOn.value = false }, 150)
  timers.push(t)

  // Need at least 2 taps to check an interval
  if (tapTimes.value.length >= 2) {
    const idx = tapTimes.value.length - 2 // interval index
    const actual = tapTimes.value[tapTimes.value.length - 1] - tapTimes.value[tapTimes.value.length - 2]
    const expected = props.distressPattern[idx]
    const diff = Math.abs(actual - expected)

    if (diff > TOLERANCE) {
      resolved = true
      emit('tap', false)
      return
    }
  }

  // All taps completed
  if (tapTimes.value.length >= totalTapsNeeded.value) {
    resolved = true
    playTick()
    emit('tap', true)
  }
}

function onTouch(e: TouchEvent) {
  e.stopPropagation()
  if (e.cancelable) e.preventDefault()
  handleTap()
}

function onMouse(e: MouseEvent) {
  e.stopPropagation()
  handleTap()
}
</script>

<template>
  <div ref="containerEl" class="distress-mission">
    <div class="phase-label">{{ phase === 'WATCH' ? 'OBSERVE' : 'REPEAT' }}</div>

    <div class="beacon-container">
      <div class="beacon" :class="{ on: beaconOn }" />
      <div class="beacon-base" />
    </div>

    <div class="tap-progress">
      <span
        v-for="i in totalTapsNeeded"
        :key="i"
        class="tap-dot"
        :class="{ filled: i <= currentTapIndex }"
      />
    </div>

    <div class="distress-hint">
      {{ phase === 'WATCH' ? 'INCOMING SIGNAL' : 'TAP TO TRANSMIT' }}
    </div>
  </div>
</template>

<style scoped>
.distress-mission {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px 24px;
  gap: 16px;
  touch-action: none;
  min-height: 220px;
}

.phase-label {
  font-size: 18px;
  font-family: monospace;
  font-weight: 700;
  letter-spacing: 4px;
  color: var(--px-green-bright);
  text-shadow: 0 0 12px var(--px-green-glow);
}

.beacon-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
}

.beacon {
  width: 60px;
  height: 60px;
  border: 3px solid var(--px-green-border);
  background: var(--px-green-bg);
  box-shadow:
    0 0 0 2px var(--px-green-frame),
    inset 0 0 8px rgba(0, 0, 0, 0.5);
  transition: all 0.08s;
}

.beacon.on {
  background: #ff6b35;
  border-color: #ff3b5c;
  box-shadow:
    0 0 0 2px var(--px-green-frame),
    0 0 32px #ff6b35,
    0 0 64px rgba(255, 59, 92, 0.4),
    inset 0 0 16px rgba(255, 255, 255, 0.3);
}

.beacon-base {
  width: 80px;
  height: 8px;
  background: var(--px-green-dim);
  border: 2px solid var(--px-green-border);
  border-top: none;
  box-shadow: 0 0 0 1px var(--px-green-frame);
}

.tap-progress {
  display: flex;
  gap: 10px;
  align-items: center;
}

.tap-dot {
  width: 12px;
  height: 12px;
  border: 2px solid var(--px-green-border);
  background: var(--px-green-bg);
  box-shadow: 0 0 0 1px var(--px-green-frame);
  transition: all 0.15s;
}

.tap-dot.filled {
  background: var(--px-green-bright);
  border-color: var(--px-green-bright);
  box-shadow:
    0 0 0 1px var(--px-green-frame),
    0 0 8px var(--px-green-glow);
}

.distress-hint {
  font-size: 12px;
  font-family: monospace;
  color: var(--arc-muted);
  letter-spacing: 1px;
}
</style>
