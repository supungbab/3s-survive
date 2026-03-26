<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useAudio } from '@/composables/useAudio'
import { useI18n } from '@/composables/useI18n'

const { playTick } = useAudio()
const { t } = useI18n()

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
const isDot = ref(false)
const isDash = ref(false)
let dashCheckRaf = 0

const DOT_THRESHOLD = 150 // inner square fills at this point

function submitInput(input: MorseChar) {
  if (resolved) return
  const expected = pattern.value[currentStep.value]

  isPressed.value = false
  pressStart = 0

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
}

function startFillCheck() {
  isDot.value = false
  isDash.value = false
  function check() {
    if (!isPressed.value || resolved) return
    const elapsed = performance.now() - pressStart
    if (elapsed >= LONG_THRESHOLD) {
      isDot.value = true
      isDash.value = true
      stopFillCheck()
      submitInput('DASH')
      return
    }
    if (elapsed >= DOT_THRESHOLD) {
      isDot.value = true
    }
    dashCheckRaf = requestAnimationFrame(check)
  }
  dashCheckRaf = requestAnimationFrame(check)
}

function stopFillCheck() {
  if (dashCheckRaf) {
    cancelAnimationFrame(dashCheckRaf)
    dashCheckRaf = 0
  }
  isDot.value = false
  isDash.value = false
}

function onStart(e: TouchEvent | MouseEvent) {
  e.stopPropagation()
  if (e.cancelable) e.preventDefault()
  if (resolved) return
  pressStart = performance.now()
  isPressed.value = true
  startFillCheck()
}

function onEnd(e: TouchEvent | MouseEvent) {
  e.stopPropagation()
  if (e.cancelable) e.preventDefault()
  if (resolved || pressStart === 0) return
  stopFillCheck()
  // Released before DASH threshold → DOT
  submitInput('DOT')
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

    <div class="morse-btn" :class="{ pressed: isPressed, dot: isDot, dash: isDash }" />

    <div class="morse-hint">
      {{ t('짧게=· 길게=—') }}
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

.morse-btn {
  width: 80px;
  height: 80px;
  background: var(--px-green-bg);
  border: 2px solid var(--px-green-border);
  transition: transform 0.1s;
}

.morse-btn.pressed {
  transform: scale(0.92);
  animation: btn-fill 300ms linear forwards;
}

.morse-btn.dot {
  animation: none;
  background: var(--px-green-bright);
  box-shadow: 0 0 20px var(--px-green-glow);
}

.morse-btn.dash {
  animation: none;
  background: #fff;
  border-color: var(--px-green-bright);
  box-shadow: 0 0 40px var(--px-green-glow-strong), 0 0 12px #fff;
}

@keyframes btn-fill {
  0% { background: var(--px-green-bg); }
  50% { background: var(--px-green-bright); }
  100% { background: #fff; }
}

.morse-hint {
  font-size: 14px;
  color: var(--arc-muted);
  font-family: monospace;
}
</style>
