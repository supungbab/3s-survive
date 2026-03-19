<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAudio } from '@/composables/useAudio'

const { playTick } = useAudio()

const props = defineProps<{
  gridSwitchCount: number
}>()

const emit = defineEmits<{
  tap: [correct: boolean]
}>()

const switchStates = ref<boolean[]>([])
const activationOrder = ref<number[]>([])
const currentStep = ref(0)

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

onMounted(() => {
  const count = props.gridSwitchCount
  switchStates.value = new Array(count).fill(false)
  // activationOrder[i] = which step (1-based) switch i should be activated at
  const indices = Array.from({ length: count }, (_, i) => i)
  const shuffled = shuffle(indices)
  const order = new Array(count).fill(0)
  shuffled.forEach((switchIdx, step) => {
    order[switchIdx] = step + 1
  })
  activationOrder.value = order
})

function handleSwitch(index: number) {
  if (switchStates.value[index]) return

  const expected = currentStep.value + 1
  if (activationOrder.value[index] === expected) {
    switchStates.value[index] = true
    currentStep.value++
    playTick()

    if (currentStep.value >= props.gridSwitchCount) {
      emit('tap', true)
    }
  } else {
    emit('tap', false)
  }
}
</script>

<template>
  <div class="power-grid-mission">
    <div class="grid-header">
      <span class="grid-title">GRID CONTROL</span>
      <span class="grid-status">{{ currentStep }}/{{ gridSwitchCount }}</span>
    </div>

    <div class="switches">
      <button
        v-for="(state, i) in switchStates"
        :key="i"
        class="switch-unit"
        :class="{ on: state, next: activationOrder[i] === currentStep + 1 }"
        @pointerdown="handleSwitch(i)"
      >
        <div class="switch-body">
          <div class="switch-handle" :class="{ flipped: state }" />
        </div>
        <span class="switch-order">{{ activationOrder[i] }}</span>
        <span class="switch-label">{{ state ? 'ON' : 'OFF' }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.power-grid-mission {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px 24px;
  gap: 16px;
  min-height: 200px;
}

.grid-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.grid-title {
  font-size: 14px;
  font-weight: 700;
  font-family: monospace;
  color: var(--px-green-bright);
  text-shadow: 0 0 8px var(--px-green-glow);
  letter-spacing: 2px;
}

.grid-status {
  font-size: 14px;
  font-family: monospace;
  color: var(--arc-muted);
}

.switches {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
}

.switch-unit {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 12px 10px;
  border: 2px solid var(--px-green-border);
  background: #0c140c;
  cursor: pointer;
  transition: all 0.15s;
  box-shadow:
    0 0 0 2px var(--px-green-frame),
    inset 1px 1px 0 var(--px-green-bevel-light),
    inset -1px -1px 0 var(--px-green-bevel-dark);
  min-width: 64px;
}

.switch-unit.next {
  border-color: var(--px-green-bright);
  animation: grid-pulse 0.8s ease-in-out infinite;
}

.switch-unit.on {
  border-color: var(--px-green-bright);
  background: rgba(140, 200, 144, 0.08);
  box-shadow:
    0 0 0 2px var(--px-green-frame),
    0 0 16px var(--px-green-glow-strong),
    inset 0 0 12px rgba(140, 200, 144, 0.1);
}

.switch-unit:active {
  transform: scale(0.92);
}

.switch-body {
  width: 28px;
  height: 48px;
  border: 2px solid #3a4a38;
  background: #111a11;
  position: relative;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
}

.switch-handle {
  position: absolute;
  left: 2px;
  right: 2px;
  height: 20px;
  background: #3a4a38;
  transition: all 0.15s;
  bottom: 2px;
  box-shadow: 0 -1px 3px rgba(0, 0, 0, 0.4);
}

.switch-handle.flipped {
  bottom: auto;
  top: 2px;
  background: var(--px-green-bright);
  box-shadow: 0 0 10px var(--px-green-glow);
}

.switch-order {
  font-size: 16px;
  font-weight: 700;
  font-family: monospace;
  color: var(--px-green-bright);
  text-shadow: 0 0 6px var(--px-green-glow);
}

.switch-label {
  font-size: 11px;
  font-family: monospace;
  color: var(--arc-muted);
  letter-spacing: 1px;
}

.switch-unit.on .switch-label {
  color: var(--px-green-bright);
  text-shadow: 0 0 6px var(--px-green-glow);
}

@keyframes grid-pulse {
  0%, 100% { box-shadow: 0 0 0 2px var(--px-green-frame), inset 1px 1px 0 var(--px-green-bevel-light), inset -1px -1px 0 var(--px-green-bevel-dark); }
  50% { box-shadow: 0 0 0 2px var(--px-green-frame), 0 0 20px var(--px-green-glow-strong); }
}
</style>
