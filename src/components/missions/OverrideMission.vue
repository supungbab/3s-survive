<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAudio } from '@/composables/useAudio'

const { playTick } = useAudio()

const props = defineProps<{
  overrideCode: number[]
}>()

const emit = defineEmits<{
  tap: [correct: boolean]
}>()

type Phase = 'SHOW' | 'INPUT'
const phase = ref<Phase>('SHOW')
const enteredDigits = ref<number[]>([])
const confirmedCount = ref(0)
let resolved = false

const SHOW_DURATION = 1200 // ms

const keypadRows = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [null, 0, null],
]

onMounted(() => {
  setTimeout(() => {
    if (!resolved) {
      phase.value = 'INPUT'
    }
  }, SHOW_DURATION)
})

function handleKeyTap(digit: number) {
  if (resolved || phase.value !== 'INPUT') return

  const stepIndex = enteredDigits.value.length
  const expected = props.overrideCode[stepIndex]

  enteredDigits.value.push(digit)

  if (digit === expected) {
    confirmedCount.value++
    playTick()
    if (confirmedCount.value >= props.overrideCode.length) {
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
  <div class="override-mission">
    <!-- SHOW phase: display the code -->
    <template v-if="phase === 'SHOW'">
      <div class="override-label">MEMORIZE CODE</div>
      <div class="code-display show-phase">
        <span
          v-for="(d, i) in props.overrideCode"
          :key="i"
          class="code-digit"
        >
          {{ d }}
        </span>
      </div>
    </template>

    <!-- INPUT phase -->
    <template v-else>
      <div class="override-label">ENTER CODE</div>
      <div class="code-display input-phase">
        <span
          v-for="(_, i) in props.overrideCode"
          :key="i"
          class="code-slot"
          :class="{
            filled: i < enteredDigits.length,
            current: i === enteredDigits.length,
          }"
        >
          {{ i < confirmedCount ? '█' : i === enteredDigits.length ? '_' : '·' }}
        </span>
      </div>

      <div class="keypad">
        <div v-for="(row, ri) in keypadRows" :key="ri" class="keypad-row">
          <button
            v-for="(key, ki) in row"
            :key="ki"
            class="keypad-btn"
            :class="{ invisible: key === null }"
            :disabled="key === null || resolved"
            @pointerdown="key !== null && handleKeyTap(key)"
          >
            {{ key !== null ? key : '' }}
          </button>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.override-mission {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px 24px;
  gap: 14px;
  touch-action: none;
  min-height: 200px;
}

.override-label {
  font-size: 13px;
  font-weight: 700;
  color: var(--px-green-bright);
  text-shadow: 0 0 8px var(--px-green-glow);
  font-family: monospace;
  letter-spacing: 3px;
}

.code-display {
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 8px 16px;
  border: 2px solid var(--px-green-border);
  background: var(--px-green-bg);
  box-shadow:
    0 0 0 2px var(--px-green-frame),
    inset 0 0 12px rgba(140, 200, 144, 0.05);
}

.code-display.show-phase {
  animation: code-pulse 0.4s ease-in-out infinite alternate;
}

.code-digit {
  font-size: 32px;
  font-weight: 700;
  color: var(--px-green-bright);
  text-shadow: 0 0 16px var(--px-green-glow-strong);
  font-family: monospace;
  min-width: 28px;
  text-align: center;
}

.code-slot {
  font-size: 28px;
  font-weight: 700;
  color: var(--px-green-dim);
  font-family: monospace;
  min-width: 28px;
  text-align: center;
  transition: color 0.1s;
}

.code-slot.filled {
  color: var(--px-green-bright);
  text-shadow: 0 0 12px var(--px-green-glow);
}

.code-slot.current {
  color: var(--px-green-bright);
  animation: blink-cursor 0.6s steps(1) infinite;
}

.keypad {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.keypad-row {
  display: flex;
  gap: 6px;
  justify-content: center;
}

.keypad-btn {
  width: 52px;
  height: 44px;
  border: 2px solid var(--px-green-border);
  background: var(--px-green-bg);
  color: var(--px-green-bright);
  font-size: 20px;
  font-weight: 700;
  font-family: monospace;
  cursor: pointer;
  box-shadow:
    0 0 0 1px var(--px-green-frame),
    inset 1px 1px 0 rgba(140, 200, 144, 0.1),
    inset -1px -1px 0 rgba(0, 0, 0, 0.3);
  transition: all 0.08s;
}

.keypad-btn:active:not(:disabled) {
  background: var(--px-green-bright);
  color: #000;
  box-shadow:
    0 0 0 1px var(--px-green-frame),
    0 0 16px var(--px-green-glow-strong);
  transform: scale(0.95);
}

.keypad-btn.invisible {
  visibility: hidden;
}

.keypad-btn:disabled {
  opacity: 0.3;
  cursor: default;
}

@keyframes code-pulse {
  0% { box-shadow: 0 0 0 2px var(--px-green-frame), inset 0 0 12px rgba(140, 200, 144, 0.05); }
  100% { box-shadow: 0 0 0 2px var(--px-green-frame), inset 0 0 20px rgba(140, 200, 144, 0.15), 0 0 12px var(--px-green-glow); }
}

@keyframes blink-cursor {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0.2; }
}
</style>
