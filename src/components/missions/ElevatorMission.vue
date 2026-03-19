<script setup lang="ts">
import { ref } from 'vue'
import { useAudio } from '@/composables/useAudio'

const { playTick } = useAudio()

const props = defineProps<{
  elevatorCurrent: number
  elevatorTarget: number
}>()

const emit = defineEmits<{
  tap: [correct: boolean]
}>()

const currentFloor = ref(props.elevatorCurrent)
let resolved = false

function handleUp() {
  if (resolved) return
  if (currentFloor.value >= 5) return

  if (props.elevatorTarget > currentFloor.value) {
    currentFloor.value++
    playTick()
    if (currentFloor.value === props.elevatorTarget) {
      resolved = true
      emit('tap', true)
    }
  } else {
    resolved = true
    emit('tap', false)
  }
}

function handleDown() {
  if (resolved) return
  if (currentFloor.value <= 1) return

  if (props.elevatorTarget < currentFloor.value) {
    currentFloor.value--
    playTick()
    if (currentFloor.value === props.elevatorTarget) {
      resolved = true
      emit('tap', true)
    }
  } else {
    resolved = true
    emit('tap', false)
  }
}
</script>

<template>
  <div class="elevator-mission">
    <div class="elevator-panel">
      <div class="target-display">
        TARGET: <span class="target-floor">{{ props.elevatorTarget }}F</span>
      </div>

      <div class="floor-display">
        <div class="floor-number">{{ currentFloor }}</div>
        <div class="floor-suffix">F</div>
      </div>

      <div class="elevator-controls">
        <button class="elevator-btn up-btn" @pointerdown="handleUp">
          <span class="btn-arrow">▲</span>
        </button>
        <button class="elevator-btn down-btn" @pointerdown="handleDown">
          <span class="btn-arrow">▼</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.elevator-mission {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px 24px;
  gap: 16px;
  min-height: 220px;
}

.elevator-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 20px 32px;
  border: 3px solid var(--px-green-border);
  background: var(--px-green-bg);
  box-shadow:
    0 0 0 2px var(--px-green-frame),
    inset 1px 1px 0 rgba(140, 200, 144, 0.05),
    inset -1px -1px 0 rgba(0, 0, 0, 0.3);
}

.target-display {
  font-size: 13px;
  font-family: monospace;
  color: var(--arc-muted);
  letter-spacing: 1px;
}

.target-floor {
  color: var(--px-green-bright);
  text-shadow: 0 0 8px var(--px-green-glow);
  font-weight: 700;
}

.floor-display {
  display: flex;
  align-items: baseline;
  gap: 4px;
  padding: 8px 20px;
  border: 2px solid var(--px-green-border);
  background: rgba(0, 0, 0, 0.6);
  box-shadow:
    inset 0 0 12px rgba(0, 0, 0, 0.8),
    0 0 8px var(--px-green-glow);
}

.floor-number {
  font-size: 48px;
  font-weight: 700;
  font-family: monospace;
  color: var(--px-green-bright);
  text-shadow: 0 0 16px var(--px-green-glow-strong);
  line-height: 1;
  transition: all 0.15s;
}

.floor-suffix {
  font-size: 20px;
  font-family: monospace;
  color: var(--px-green-dim);
}

.elevator-controls {
  display: flex;
  gap: 16px;
}

.elevator-btn {
  width: 56px;
  height: 56px;
  border: 3px solid var(--px-green-border);
  background: var(--px-green-bg);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow:
    0 0 0 2px var(--px-green-frame),
    inset 1px 1px 0 rgba(140, 200, 144, 0.08),
    inset -1px -1px 0 rgba(0, 0, 0, 0.3);
  transition: all 0.1s;
}

.elevator-btn:active {
  transform: scale(0.92);
  border-color: var(--px-green-bright);
  box-shadow:
    0 0 0 2px var(--px-green-frame),
    0 0 16px var(--px-green-glow-strong);
}

.btn-arrow {
  font-size: 22px;
  color: var(--px-green-bright);
  text-shadow: 0 0 8px var(--px-green-glow);
}

.up-btn .btn-arrow {
  color: var(--px-green-bright);
}

.down-btn .btn-arrow {
  color: var(--px-green-bright);
}
</style>
