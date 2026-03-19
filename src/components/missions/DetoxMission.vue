<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useAudio } from '@/composables/useAudio'

const { playTick } = useAudio()

const props = defineProps<{
  detoxColor: string
  detoxChoices: string[]
}>()

const emit = defineEmits<{
  tap: [correct: boolean]
}>()

const COLOR_MAP: Record<string, string> = {
  red: '#ff3b5c',
  blue: '#4a9eff',
  yellow: '#ffd644',
  green: '#8cc890',
  purple: '#b07aff',
}

const DURATION = 2500 // ms
const toxinProgress = ref(0)
let startTime = 0
let raf = 0
let resolved = false

function tick() {
  if (resolved) return
  const elapsed = Date.now() - startTime
  toxinProgress.value = Math.min(1, elapsed / DURATION)

  if (toxinProgress.value >= 1) {
    resolved = true
    emit('tap', false)
    return
  }

  raf = requestAnimationFrame(tick)
}

function handleTap(color: string) {
  if (resolved) return
  resolved = true
  cancelAnimationFrame(raf)

  if (color === props.detoxColor) {
    playTick()
    emit('tap', true)
  } else {
    emit('tap', false)
  }
}

onMounted(() => {
  startTime = Date.now()
  raf = requestAnimationFrame(tick)
})

onUnmounted(() => {
  cancelAnimationFrame(raf)
})
</script>

<template>
  <div class="detox-mission">
    <div class="toxin-label">☣ {{ detoxColor.toUpperCase() }} DETOX</div>

    <div class="toxin-bar">
      <div
        class="toxin-fill"
        :class="{ critical: toxinProgress > 0.7 }"
        :style="{ width: `${toxinProgress * 100}%` }"
      />
    </div>

    <div class="antidote-choices">
      <button
        v-for="(color, i) in detoxChoices"
        :key="i"
        class="antidote-btn"
        :style="{
          '--btn-color': COLOR_MAP[color] ?? '#888',
        }"
        @pointerdown="handleTap(color)"
      >
        <span class="bottle">⚗</span>
        <span class="color-tag">{{ color.toUpperCase() }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.detox-mission {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px 24px;
  gap: 16px;
  min-height: 200px;
}

.toxin-label {
  font-size: 20px;
  font-weight: 700;
  font-family: monospace;
  color: var(--arc-danger);
  text-shadow: 0 0 12px var(--arc-danger);
  letter-spacing: 3px;
  animation: label-pulse 0.6s ease-in-out infinite alternate;
}

.toxin-bar {
  width: 85%;
  height: 14px;
  background: #0c140c;
  border: 2px solid var(--px-green-border);
  box-shadow: 0 0 0 2px var(--px-green-frame);
  overflow: hidden;
}

.toxin-fill {
  height: 100%;
  background: var(--arc-danger);
  box-shadow: 0 0 8px var(--arc-danger);
  transition: width 0.05s linear;
}

.toxin-fill.critical {
  animation: toxin-flash 0.25s steps(2) infinite;
}

.antidote-choices {
  display: flex;
  gap: 16px;
  justify-content: center;
}

.antidote-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  gap: 4px;
  background: var(--px-green-bg);
  border: 3px solid var(--btn-color);
  border-radius: 0;
  cursor: pointer;
  transition: transform 0.1s;
  box-shadow:
    0 0 0 2px var(--px-green-frame),
    0 0 10px color-mix(in srgb, var(--btn-color) 30%, transparent);
}

.antidote-btn:active {
  transform: scale(0.88);
  box-shadow:
    0 0 0 2px var(--px-green-frame),
    0 0 20px var(--btn-color);
}

.bottle {
  font-size: 28px;
  color: var(--btn-color);
  filter: drop-shadow(0 0 6px var(--btn-color));
}

.color-tag {
  font-size: 11px;
  font-weight: 700;
  font-family: monospace;
  color: var(--btn-color);
  letter-spacing: 1px;
  text-shadow: 0 0 6px var(--btn-color);
}

@keyframes label-pulse {
  from { opacity: 0.7; }
  to { opacity: 1; }
}

@keyframes toxin-flash {
  0% { opacity: 1; }
  50% { opacity: 0.6; }
  100% { opacity: 1; }
}
</style>
