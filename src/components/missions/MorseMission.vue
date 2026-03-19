<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useAudio } from '@/composables/useAudio'

const { playTick } = useAudio()

type MorseChar = 'DOT' | 'DASH'

const props = defineProps<{
  morsePattern: MorseChar[]
}>()

const emit = defineEmits<{
  tap: [correct: boolean]
}>()

const containerEl = ref<HTMLElement | null>(null)
const LONG_THRESHOLD = 300 // ms: anything >= 300ms is a dash

const pattern = ref<MorseChar[]>([])
const currentStep = ref(0)
const inputStates = ref<('waiting' | 'correct' | 'wrong')[]>([])
let pressStart = 0
let resolved = false
const isPressed = ref(false)

function onStart(e: TouchEvent | MouseEvent) {
  e.stopPropagation()
  if (e.cancelable) e.preventDefault()
  if (resolved) return
  pressStart = performance.now()
  isPressed.value = true
}

function onEnd(e: TouchEvent | MouseEvent) {
  e.stopPropagation()
  if (e.cancelable) e.preventDefault()
  if (resolved || pressStart === 0) return
  isPressed.value = false

  const duration = performance.now() - pressStart
  const input: MorseChar = duration >= LONG_THRESHOLD ? 'DASH' : 'DOT'
  const expected = pattern.value[currentStep.value]

  if (input === expected) {
    inputStates.value[currentStep.value] = 'correct'
    currentStep.value++
    playTick()
    if (currentStep.value >= pattern.value.length) {
      resolved = true
      emit('tap', true)
    }
  } else {
    inputStates.value[currentStep.value] = 'wrong'
    resolved = true
    emit('tap', false)
  }
  pressStart = 0
}

onMounted(() => {
  pattern.value = [...props.morsePattern]
  inputStates.value = pattern.value.map(() => 'waiting')
  if (!containerEl.value) return
  const el = containerEl.value
  el.addEventListener('touchstart', onStart, { passive: false })
  el.addEventListener('touchend', onEnd, { passive: false })
  el.addEventListener('mousedown', onStart)
  el.addEventListener('mouseup', onEnd)
})

onUnmounted(() => {
  if (!containerEl.value) return
  const el = containerEl.value
  el.removeEventListener('touchstart', onStart)
  el.removeEventListener('touchend', onEnd)
  el.removeEventListener('mousedown', onStart)
  el.removeEventListener('mouseup', onEnd)
})
</script>

<template>
  <div ref="containerEl" class="morse-mission">
    <div class="morse-pattern">
      <span
        v-for="(char, i) in pattern"
        :key="i"
        class="morse-char"
        :class="[char.toLowerCase(), inputStates[i]]"
      >
        {{ char === 'DOT' ? '·' : '—' }}
      </span>
    </div>

    <div class="morse-input-area" :class="{ pressed: isPressed }">
      <div class="morse-key">
        {{ isPressed ? '■' : '□' }}
      </div>
    </div>

    <div class="morse-hint">
      짧게=· 길게=—
    </div>
  </div>
</template>

<style scoped>
.morse-mission {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px 24px;
  gap: 16px;
  touch-action: none;
  min-height: 200px;
}

.morse-pattern {
  display: flex;
  gap: 12px;
  align-items: center;
  font-size: 36px;
  font-weight: 700;
}

.morse-char {
  color: var(--px-green-bright);
  text-shadow: 0 0 8px var(--px-green-glow);
  transition: all 0.15s;
  min-width: 28px;
  text-align: center;
}

.morse-char.dash {
  letter-spacing: 2px;
}

.morse-char.correct {
  color: var(--px-green-bright);
  text-shadow: 0 0 16px var(--px-green-glow-strong);
  opacity: 0.4;
}

.morse-char.wrong {
  color: var(--arc-danger);
  text-shadow: 0 0 12px var(--arc-danger-glow);
}

.morse-char.waiting {
  opacity: 1;
}

.morse-input-area {
  width: 80px;
  height: 80px;
  border: 3px solid var(--px-green-border);
  background: var(--px-green-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow:
    0 0 0 2px var(--px-green-frame),
    inset 1px 1px 0 var(--px-green-bevel-light),
    inset -1px -1px 0 var(--px-green-bevel-dark);
  transition: all 0.1s;
}

.morse-input-area.pressed {
  border-color: var(--px-green-bright);
  box-shadow:
    0 0 0 2px var(--px-green-frame),
    0 0 24px var(--px-green-glow-strong);
  transform: scale(0.95);
}

.morse-key {
  font-size: 32px;
  color: var(--px-green-bright);
}

.morse-hint {
  font-size: 14px;
  color: var(--arc-muted);
  font-family: monospace;
}
</style>
