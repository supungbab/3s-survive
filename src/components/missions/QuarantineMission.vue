<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useAudio } from '@/composables/useAudio'
import { useI18n } from '@/composables/useI18n'

const { playTick } = useAudio()
const { t } = useI18n()

const emit = defineEmits<{
  tap: [correct: boolean]
}>()

const GRID = 4

type CellState = 'empty' | 'infected' | 'walled'

const cells = ref<CellState[]>(new Array(GRID * GRID).fill('empty'))
const infectedIndex = ref(-1)
let resolved = false

function getAdjacentIndices(idx: number): number[] {
  const row = Math.floor(idx / GRID)
  const col = idx % GRID
  const adj: number[] = []
  if (row > 0) adj.push((row - 1) * GRID + col)
  if (row < GRID - 1) adj.push((row + 1) * GRID + col)
  if (col > 0) adj.push(row * GRID + (col - 1))
  if (col < GRID - 1) adj.push(row * GRID + (col + 1))
  return adj
}

const adjacentToInfected = computed(() => {
  if (infectedIndex.value < 0) return []
  return getAdjacentIndices(infectedIndex.value)
})

function checkWin() {
  if (resolved) return
  const adj = adjacentToInfected.value
  const allWalled = adj.every((i) => cells.value[i] === 'walled')
  if (allWalled) {
    resolved = true
    playTick()
    emit('tap', true)
  }
}

function handleCellTap(index: number) {
  if (resolved) return
  const state = cells.value[index]
  if (state !== 'empty') return
  // Only allow walling adjacent cells
  if (!adjacentToInfected.value.includes(index)) return
  cells.value[index] = 'walled'
  checkWin()
}

onMounted(() => {
  const idx = Math.floor(Math.random() * GRID * GRID)
  infectedIndex.value = idx
  cells.value[idx] = 'infected'
})
</script>

<template>
  <div class="quarantine-mission">
    <div class="quarantine-grid">
      <button
        v-for="(state, i) in cells"
        :key="i"
        class="qcell"
        :class="{
          infected: state === 'infected',
          walled: state === 'walled',
          adjacent: state === 'empty' && adjacentToInfected.includes(i),
        }"
        @pointerdown="handleCellTap(i)"
      >
        <span v-if="state === 'infected'" class="biohazard">☣</span>
        <span v-else-if="state === 'walled'" class="wall-icon">▓</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.quarantine-mission {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px 24px;
  gap: 12px;
  min-height: 200px;
}

.quarantine-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6px;
  width: fit-content;
}

.qcell {
  width: 52px;
  height: 52px;
  background: var(--px-green-bg);
  border: 2px solid var(--px-green-border);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-family: monospace;
  color: var(--px-green-bright);
  transition: all 0.15s;
  box-shadow:
    0 0 0 2px var(--px-green-frame),
    inset 1px 1px 0 var(--px-green-bevel-light),
    inset -1px -1px 0 var(--px-green-bevel-dark);
}

.qcell.adjacent {
  border-color: var(--px-green-bright);
  background: rgba(140, 200, 144, 0.06);
}

.qcell.infected {
  background: rgba(255, 59, 92, 0.15);
  border-color: var(--arc-danger);
  box-shadow:
    0 0 0 2px var(--px-green-frame),
    0 0 16px rgba(255, 59, 92, 0.4);
  animation: pulse-infected 0.6s ease-in-out infinite;
}

.qcell.walled {
  background: rgba(140, 200, 144, 0.12);
  border-color: var(--px-green-bright);
  box-shadow:
    0 0 0 2px var(--px-green-frame),
    0 0 10px var(--px-green-glow);
}

.biohazard {
  font-size: 22px;
  color: var(--arc-danger);
  text-shadow: 0 0 12px rgba(255, 59, 92, 0.6);
}

.wall-icon {
  font-size: 18px;
  color: var(--px-green-bright);
  text-shadow: 0 0 8px var(--px-green-glow);
}

.qcell:active {
  transform: scale(0.9);
}

@keyframes pulse-infected {
  0%, 100% { box-shadow: 0 0 0 2px var(--px-green-frame), 0 0 10px rgba(255, 59, 92, 0.3); }
  50% { box-shadow: 0 0 0 2px var(--px-green-frame), 0 0 24px rgba(255, 59, 92, 0.6); }
}
</style>
