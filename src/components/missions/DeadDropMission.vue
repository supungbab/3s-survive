<script setup lang="ts">
import { useAudio } from '@/composables/useAudio'

const { playTick } = useAudio()

const props = defineProps<{
  deadDropCoord: [number, number]
  deadDropGridSize: number
}>()

const emit = defineEmits<{
  tap: [correct: boolean]
}>()

let resolved = false

function handleCellTap(col: number, row: number) {
  if (resolved) return
  resolved = true
  const [targetCol, targetRow] = props.deadDropCoord
  if (col === targetCol && row === targetRow) {
    playTick()
    emit('tap', true)
  } else {
    emit('tap', false)
  }
}
</script>

<template>
  <div class="dead-drop-mission">
    <div class="grid-container">
      <!-- Column labels -->
      <div class="grid-header">
        <div class="label-corner" />
        <div v-for="c in deadDropGridSize" :key="'col-' + c" class="col-label">
          {{ c }}
        </div>
      </div>

      <!-- Rows -->
      <div v-for="r in deadDropGridSize" :key="'row-' + r" class="grid-row">
        <div class="row-label">{{ r }}</div>
        <button
          v-for="c in deadDropGridSize"
          :key="'cell-' + c + '-' + r"
          class="dd-cell"
          @pointerdown="handleCellTap(c, r)"
        >
          <span class="cell-dot">·</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dead-drop-mission {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px 24px;
  gap: 12px;
  min-height: 200px;
}

.grid-container {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.grid-header {
  display: flex;
  gap: 4px;
}

.label-corner {
  width: 28px;
  height: 28px;
}

.col-label {
  width: 56px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 700;
  font-family: monospace;
  color: var(--px-green-bright);
  text-shadow: 0 0 8px var(--px-green-glow);
}

.grid-row {
  display: flex;
  gap: 4px;
  align-items: center;
}

.row-label {
  width: 28px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 700;
  font-family: monospace;
  color: var(--px-green-bright);
  text-shadow: 0 0 8px var(--px-green-glow);
}

.dd-cell {
  width: 56px;
  height: 56px;
  background: var(--px-green-bg);
  border: 2px solid var(--px-green-border);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;
  box-shadow:
    0 0 0 2px var(--px-green-frame),
    inset 1px 1px 0 var(--px-green-bevel-light),
    inset -1px -1px 0 var(--px-green-bevel-dark);
}

.dd-cell:active {
  transform: scale(0.9);
  border-color: var(--px-green-bright);
  box-shadow:
    0 0 0 2px var(--px-green-frame),
    0 0 12px var(--px-green-glow-strong);
}

.cell-dot {
  font-size: 20px;
  font-family: monospace;
  color: var(--arc-muted);
}
</style>
