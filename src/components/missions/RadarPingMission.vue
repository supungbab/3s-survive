<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useAudio } from '@/composables/useAudio'

const { playTick } = useAudio()

const emit = defineEmits<{
  tap: [correct: boolean]
}>()

const containerEl = ref<HTMLElement | null>(null)
const sweepAngle = ref(0) // degrees
const blipAngle = ref(0)
const blipRadius = ref(0) // 0~1 fraction of radar radius
const blipVisible = ref(false)
let resolved = false
let raf = 0
let startTime = 0

const ROTATION_SPEED = 180 // degrees per second (~2s per full rotation)
const BLIP_APPEAR_ANGLE = 380 // appear after ~1 rotation (380 deg = 1.06 rotations)
const TOLERANCE = 30 // degrees tolerance for sweep-over-blip

function normalizeAngle(a: number): number {
  return ((a % 360) + 360) % 360
}

function angleDiff(a: number, b: number): number {
  const d = normalizeAngle(a - b)
  return d > 180 ? 360 - d : d
}

function animate(now: number) {
  if (resolved) return
  if (startTime === 0) startTime = now
  const elapsed = (now - startTime) / 1000
  sweepAngle.value = (elapsed * ROTATION_SPEED) % 360

  // Show blip after ~1 rotation
  if (!blipVisible.value && elapsed * ROTATION_SPEED >= BLIP_APPEAR_ANGLE) {
    blipVisible.value = true
    blipAngle.value = Math.random() * 360
    blipRadius.value = 0.35 + Math.random() * 0.45 // 35%~80% from center
  }

  raf = requestAnimationFrame(animate)
}

function onTap(e: TouchEvent | MouseEvent) {
  e.stopPropagation()
  if (e.cancelable) e.preventDefault()
  if (resolved) return
  if (!blipVisible.value) return // ignore taps before blip appears

  resolved = true
  const diff = angleDiff(sweepAngle.value, blipAngle.value)

  if (diff <= TOLERANCE) {
    playTick()
    emit('tap', true)
  } else {
    emit('tap', false)
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
  <div ref="containerEl" class="radar-ping-mission">
    <div class="radar-container">
      <svg viewBox="0 0 200 200" class="radar-svg">
        <!-- Background -->
        <circle cx="100" cy="100" r="95" class="radar-bg" />

        <!-- Concentric circles -->
        <circle cx="100" cy="100" r="30" class="radar-ring" />
        <circle cx="100" cy="100" r="60" class="radar-ring" />
        <circle cx="100" cy="100" r="90" class="radar-ring" />

        <!-- Grid crosshair -->
        <line x1="5" y1="100" x2="195" y2="100" class="radar-grid" />
        <line x1="100" y1="5" x2="100" y2="195" class="radar-grid" />

        <!-- Sweep trail (cone gradient) -->
        <defs>
          <linearGradient :id="'sweep-fade'" gradientUnits="userSpaceOnUse"
            :x1="100 + 90 * Math.cos((sweepAngle - 40) * Math.PI / 180)"
            :y1="100 + 90 * Math.sin((sweepAngle - 40) * Math.PI / 180)"
            :x2="100 + 90 * Math.cos(sweepAngle * Math.PI / 180)"
            :y2="100 + 90 * Math.sin(sweepAngle * Math.PI / 180)"
          >
            <stop offset="0%" stop-color="rgba(140,200,144,0)" />
            <stop offset="100%" stop-color="rgba(140,200,144,0.15)" />
          </linearGradient>
        </defs>
        <path
          :d="`M100,100 L${100 + 95 * Math.cos((sweepAngle - 35) * Math.PI / 180)},${100 + 95 * Math.sin((sweepAngle - 35) * Math.PI / 180)} A95,95 0 0,1 ${100 + 95 * Math.cos(sweepAngle * Math.PI / 180)},${100 + 95 * Math.sin(sweepAngle * Math.PI / 180)} Z`"
          fill="rgba(140,200,144,0.1)"
        />

        <!-- Sweep line -->
        <line
          x1="100"
          y1="100"
          :x2="100 + 92 * Math.cos(sweepAngle * Math.PI / 180)"
          :y2="100 + 92 * Math.sin(sweepAngle * Math.PI / 180)"
          class="sweep-line"
        />

        <!-- Blip -->
        <circle
          v-if="blipVisible"
          :cx="100 + blipRadius * 90 * Math.cos(blipAngle * Math.PI / 180)"
          :cy="100 + blipRadius * 90 * Math.sin(blipAngle * Math.PI / 180)"
          r="5"
          class="blip"
        />

        <!-- Center dot -->
        <circle cx="100" cy="100" r="3" class="center-dot" />
      </svg>
    </div>

    <div class="radar-hint">
      {{ blipVisible ? 'TAP WHEN SWEEP HITS BLIP' : 'SCANNING...' }}
    </div>
  </div>
</template>

<style scoped>
.radar-ping-mission {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px 24px;
  gap: 12px;
  touch-action: none;
  min-height: 200px;
}

.radar-container {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  border: 3px solid var(--px-green-border);
  box-shadow:
    0 0 0 3px var(--px-green-frame),
    0 0 20px rgba(140, 200, 144, 0.1),
    inset 0 0 30px rgba(0, 0, 0, 0.5);
  overflow: hidden;
}

.radar-svg {
  width: 100%;
  height: 100%;
  display: block;
}

.radar-bg {
  fill: #060e06;
}

.radar-ring {
  fill: none;
  stroke: var(--px-green-dim);
  stroke-width: 0.5;
  opacity: 0.4;
}

.radar-grid {
  stroke: var(--px-green-dim);
  stroke-width: 0.5;
  opacity: 0.25;
}

.sweep-line {
  stroke: var(--px-green-bright);
  stroke-width: 1.5;
  filter: drop-shadow(0 0 4px var(--px-green-glow-strong));
}

.blip {
  fill: var(--px-green-bright);
  filter: drop-shadow(0 0 6px var(--px-green-glow-strong));
  animation: blip-pulse 0.8s ease-in-out infinite alternate;
}

.center-dot {
  fill: var(--px-green-bright);
  filter: drop-shadow(0 0 3px var(--px-green-glow));
}

.radar-hint {
  font-size: 14px;
  color: var(--arc-muted);
  font-family: monospace;
  letter-spacing: 1px;
}

@keyframes blip-pulse {
  0% { opacity: 0.6; r: 4; }
  100% { opacity: 1; r: 6; }
}
</style>
