<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useAudio } from '@/composables/useAudio'
import { useI18n } from '@/composables/useI18n'

const { playTick } = useAudio()
const { t } = useI18n()

const emit = defineEmits<{
  tap: [correct: boolean]
}>()

const targetVisible = ref(false)
const noiseChars = ref('')
let flickerTimer: ReturnType<typeof setTimeout> | null = null
let noiseInterval: ReturnType<typeof setInterval> | null = null
let resolved = false

const NOISE_POOL = '█▓▒░▐▌▄▀■□◆◇●○╳╬╫╪┼┤├─│┌┐└┘'
const TARGET_SYMBOL = '◎'

function generateNoise(): string {
  let s = ''
  for (let i = 0; i < 80; i++) {
    if (i > 0 && i % 16 === 0) s += '\n'
    s += NOISE_POOL[Math.floor(Math.random() * NOISE_POOL.length)]
  }
  return s
}

function scheduleFlicker() {
  if (resolved) return

  // Hide phase: ~800ms of noise
  targetVisible.value = false
  flickerTimer = setTimeout(() => {
    if (resolved) return
    // Show phase: ~600ms of target visible
    targetVisible.value = true
    flickerTimer = setTimeout(() => {
      if (resolved) return
      scheduleFlicker()
    }, 600)
  }, 600)
}

function startNoise() {
  noiseChars.value = generateNoise()
  noiseInterval = setInterval(() => {
    noiseChars.value = generateNoise()
  }, 100)
}

function handleTap(e: Event) {
  e.stopPropagation()
  if (resolved) return
  resolved = true

  if (targetVisible.value) {
    playTick()
    emit('tap', true)
  } else {
    emit('tap', false)
  }
}

onMounted(() => {
  startNoise()
  scheduleFlicker()
})

onUnmounted(() => {
  if (noiseInterval) clearInterval(noiseInterval)
  if (flickerTimer) clearTimeout(flickerTimer)
})
</script>

<template>
  <div class="flicker-tap-mission" @pointerdown="handleTap">
    <div class="static-screen">
      <pre class="noise-text">{{ noiseChars }}</pre>
      <div v-if="targetVisible" class="target-overlay">
        <span class="target-char">{{ TARGET_SYMBOL }}</span>
      </div>
    </div>
    <div class="flicker-hint">{{ t('보일 때 탭하세요') }}</div>
  </div>
</template>

<style scoped>
.flicker-tap-mission {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px 24px;
  gap: 12px;
  min-height: 200px;
  cursor: pointer;
  touch-action: none;
}

.static-screen {
  position: relative;
  width: 100%;
  height: 130px;
  border: 2px solid var(--px-green-border);
  background: #060e06;
  overflow: hidden;
  box-shadow:
    0 0 0 2px var(--px-green-frame),
    inset 0 0 20px rgba(140, 200, 144, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
}

.noise-text {
  font-size: 12px;
  line-height: 1.3;
  font-family: monospace;
  color: var(--px-green-dim);
  text-shadow: 0 0 2px var(--px-green-glow);
  opacity: 0.5;
  text-align: center;
  margin: 0;
  pointer-events: none;
  user-select: none;
}

.target-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: target-flash-in 0.08s ease-out;
}

.target-char {
  font-size: 56px;
  font-family: monospace;
  color: var(--px-green-bright);
  text-shadow:
    0 0 20px var(--px-green-glow-strong),
    0 0 60px rgba(140, 200, 144, 0.3);
  animation: target-glow 0.3s ease-in-out;
}

.flicker-hint {
  font-size: 14px;
  font-family: monospace;
  color: var(--arc-muted);
  letter-spacing: 3px;
}

@keyframes target-flash-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes target-glow {
  0% {
    text-shadow:
      0 0 10px var(--px-green-glow),
      0 0 30px rgba(140, 200, 144, 0.1);
  }
  50% {
    text-shadow:
      0 0 30px var(--px-green-glow-strong),
      0 0 80px rgba(140, 200, 144, 0.4);
  }
  100% {
    text-shadow:
      0 0 20px var(--px-green-glow-strong),
      0 0 60px rgba(140, 200, 144, 0.3);
  }
}
</style>
