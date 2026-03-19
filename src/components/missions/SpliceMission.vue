<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAudio } from '@/composables/useAudio'

const { playTick } = useAudio()

const props = defineProps<{
  spliceColors: string[]
}>()

const emit = defineEmits<{
  tap: [correct: boolean]
}>()

const COLOR_CSS: Record<string, string> = {
  red: '#ff3b5c',
  blue: '#4a9eff',
  yellow: '#ffd644',
  green: '#8cc890',
  purple: '#b07aff',
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const leftColors = ref<string[]>([])
const rightColors = ref<string[]>([])
const selectedLeft = ref<number | null>(null)
const connections = ref<Set<number>>(new Set())
const rightConnected = ref<Set<number>>(new Set())
let resolved = false

onMounted(() => {
  leftColors.value = [...props.spliceColors]
  rightColors.value = shuffle([...props.spliceColors])
})

function handleLeftTap(index: number) {
  if (resolved) return
  if (connections.value.has(index)) return
  selectedLeft.value = index
}

function handleRightTap(index: number) {
  if (resolved) return
  if (selectedLeft.value === null) return
  if (rightConnected.value.has(index)) return

  const leftColor = leftColors.value[selectedLeft.value]
  const rightColor = rightColors.value[index]

  if (leftColor === rightColor) {
    connections.value.add(selectedLeft.value)
    rightConnected.value.add(index)
    playTick()
    selectedLeft.value = null
    if (connections.value.size >= 3) {
      resolved = true
      emit('tap', true)
    }
  } else {
    resolved = true
    emit('tap', false)
  }
}

function cssColor(name: string): string {
  return COLOR_CSS[name] ?? '#8cc890'
}
</script>

<template>
  <div class="splice-mission">
    <div class="splice-label">SPLICE CABLES</div>

    <div class="splice-board">
      <div class="cable-column left-column">
        <button
          v-for="(color, i) in leftColors"
          :key="'l' + i"
          class="cable-end left-end"
          :class="{ selected: selectedLeft === i, connected: connections.has(i) }"
          :style="{ '--cable-color': cssColor(color) }"
          @pointerdown="handleLeftTap(i)"
        >
          <div class="cable-stub" />
          <div class="cable-dot" />
        </button>
      </div>

      <div class="cable-middle">
        <svg class="cable-lines" viewBox="0 0 100 150" preserveAspectRatio="none">
          <template v-for="(li, i) in leftColors" :key="'line' + i">
            <line
              v-if="connections.has(i)"
              :x1="0"
              :y1="25 + i * 50"
              :x2="100"
              :y2="25 + rightColors.indexOf(li) * 50"
              :stroke="cssColor(li)"
              stroke-width="3"
              stroke-linecap="round"
              class="connected-line"
            />
          </template>
        </svg>
      </div>

      <div class="cable-column right-column">
        <button
          v-for="(color, i) in rightColors"
          :key="'r' + i"
          class="cable-end right-end"
          :class="{ connected: rightConnected.has(i) }"
          :style="{ '--cable-color': cssColor(color) }"
          @pointerdown="handleRightTap(i)"
        >
          <div class="cable-dot" />
          <div class="cable-stub" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.splice-mission {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 24px;
  gap: 16px;
  min-height: 200px;
}

.splice-label {
  font-size: 14px;
  font-family: monospace;
  color: var(--px-green-bright);
  text-shadow: 0 0 8px var(--px-green-glow);
  letter-spacing: 2px;
}

.splice-board {
  display: flex;
  align-items: stretch;
  gap: 0;
  width: 100%;
  max-width: 320px;
}

.cable-column {
  display: flex;
  flex-direction: column;
  gap: 16px;
  z-index: 1;
}

.cable-middle {
  flex: 1;
  position: relative;
  min-width: 60px;
}

.cable-lines {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.connected-line {
  filter: drop-shadow(0 0 6px currentColor);
  animation: line-draw 0.2s ease-out;
}

@keyframes line-draw {
  from { opacity: 0; }
  to { opacity: 1; }
}

.cable-end {
  display: flex;
  align-items: center;
  gap: 6px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px 4px;
  transition: all 0.15s;
}

.cable-stub {
  width: 28px;
  height: 6px;
  background: var(--cable-color);
  box-shadow: 0 0 8px var(--cable-color);
  border-radius: 0;
}

.cable-dot {
  width: 18px;
  height: 18px;
  border: 2px solid var(--px-green-border);
  background: var(--cable-color);
  box-shadow:
    0 0 8px var(--cable-color),
    0 0 0 2px var(--px-green-frame);
  transition: all 0.15s;
}

.cable-end.selected .cable-dot {
  box-shadow:
    0 0 16px var(--cable-color),
    0 0 0 2px var(--px-green-frame),
    0 0 24px var(--px-green-glow-strong);
  transform: scale(1.2);
}

.cable-end.connected {
  opacity: 0.5;
  pointer-events: none;
}

.cable-end.connected .cable-dot {
  box-shadow:
    0 0 4px var(--cable-color),
    0 0 0 2px var(--px-green-frame);
}

.left-end {
  flex-direction: row;
}

.right-end {
  flex-direction: row;
}

.cable-end:active .cable-dot {
  filter: brightness(1.3);
}
</style>
