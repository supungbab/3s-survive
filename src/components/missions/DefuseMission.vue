<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useAudio } from '@/composables/useAudio'

const { playTick } = useAudio()

const props = defineProps<{
  wireCount: number
}>()

const emit = defineEmits<{
  tap: [correct: boolean]
}>()

type WireColor = 'red' | 'blue' | 'yellow' | 'green'
const WIRE_COLORS: WireColor[] = ['red', 'blue', 'yellow', 'green']
const WIRE_NAMES: Record<WireColor, string> = {
  red: 'R',
  blue: 'B',
  yellow: 'Y',
  green: 'G',
}
const WIRE_CSS: Record<WireColor, string> = {
  red: '#ff3b5c',
  blue: '#4a9eff',
  yellow: '#ffd644',
  green: '#8cc890',
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const wires = ref<WireColor[]>([])
const cutOrder = ref<WireColor[]>([])
const cutState = ref<boolean[]>([])
const currentStep = ref(0)
const countdown = ref(3.0)
let countdownTimer = 0

onMounted(() => {
  const chosen = shuffle(WIRE_COLORS).slice(0, props.wireCount)
  wires.value = chosen
  cutOrder.value = shuffle([...chosen])
  cutState.value = new Array(props.wireCount).fill(false)

  // Visual countdown (purely cosmetic tension)
  const start = performance.now()
  function tick() {
    const elapsed = (performance.now() - start) / 1000
    countdown.value = Math.max(0, 3.0 - elapsed)
    if (countdown.value > 0) {
      countdownTimer = requestAnimationFrame(tick)
    }
  }
  countdownTimer = requestAnimationFrame(tick)
})

onUnmounted(() => {
  cancelAnimationFrame(countdownTimer)
})

function handleWireTap(index: number) {
  if (cutState.value[index]) return
  const wire = wires.value[index]
  const expected = cutOrder.value[currentStep.value]

  if (wire === expected) {
    cutState.value[index] = true
    currentStep.value++
    playTick()
    if (currentStep.value >= props.wireCount) {
      cancelAnimationFrame(countdownTimer)
      emit('tap', true)
    }
  } else {
    cancelAnimationFrame(countdownTimer)
    emit('tap', false)
  }
}
</script>

<template>
  <div class="defuse-mission">
    <!-- Countdown timer -->
    <div class="countdown" :class="{ urgent: countdown < 1.0 }">
      {{ countdown.toFixed(1) }}s
    </div>

    <!-- Cut order display -->
    <div class="wire-order">
      <span
        v-for="(c, i) in cutOrder"
        :key="i"
        class="order-label"
        :class="{ done: i < currentStep, active: i === currentStep }"
        :style="{ color: WIRE_CSS[c] }"
      >
        {{ i + 1 }}.{{ WIRE_NAMES[c] }}
      </span>
    </div>

    <!-- Wires -->
    <div class="wires">
      <button
        v-for="(wire, i) in wires"
        :key="i"
        class="wire"
        :class="{ cut: cutState[i] }"
        :style="{ '--wire-color': WIRE_CSS[wire] }"
        @pointerdown="handleWireTap(i)"
      >
        <div class="wire-label">{{ WIRE_NAMES[wire] }}</div>
        <div class="wire-line" />
        <div v-if="cutState[i]" class="spark">✦</div>
      </button>
    </div>
  </div>
</template>

<style scoped>
.defuse-mission {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 24px;
  gap: 14px;
  min-height: 200px;
}

.countdown {
  font-size: 28px;
  font-weight: 700;
  font-family: monospace;
  color: var(--px-green-bright);
  text-shadow: 0 0 12px var(--px-green-glow-strong);
  letter-spacing: 2px;
  transition: color 0.2s, text-shadow 0.2s;
}

.countdown.urgent {
  color: var(--arc-danger);
  text-shadow:
    0 0 12px var(--arc-danger-glow),
    0 0 40px rgba(255, 59, 92, 0.3);
  animation: countdown-pulse 0.4s ease-in-out infinite alternate;
}

@keyframes countdown-pulse {
  from { opacity: 0.7; transform: scale(1); }
  to { opacity: 1; transform: scale(1.1); }
}

.wire-order {
  display: flex;
  gap: 6px;
  align-items: center;
  font-size: 16px;
  font-weight: 700;
  font-family: monospace;
}

.order-label {
  text-shadow: 0 0 8px currentColor;
  transition: opacity 0.2s;
  padding: 2px 6px;
  border: 1px solid transparent;
}

.order-label.active {
  border-color: currentColor;
  animation: label-blink 0.6s ease-in-out infinite alternate;
}

@keyframes label-blink {
  from { opacity: 0.6; }
  to { opacity: 1; }
}

.order-label + .order-label::before {
  content: '→';
  color: var(--arc-muted);
  margin-right: 6px;
}

.order-label.done {
  opacity: 0.25;
  text-decoration: line-through;
}

.wires {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 85%;
}

.wire {
  position: relative;
  height: 36px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.wire-label {
  font-size: 14px;
  font-weight: 700;
  font-family: monospace;
  color: var(--wire-color);
  text-shadow: 0 0 6px var(--wire-color);
  min-width: 20px;
  text-align: center;
}

.wire-line {
  flex: 1;
  height: 8px;
  background: var(--wire-color);
  box-shadow:
    0 0 14px var(--wire-color),
    0 2px 4px rgba(0, 0, 0, 0.5);
  border-radius: 0;
  transition: all 0.15s;
}

.wire.cut .wire-line {
  background: #333;
  box-shadow: none;
  clip-path: polygon(0 0, 42% 0, 44% 100%, 0 100%, 0 0, 56% 0, 58% 100%, 100% 100%, 100% 0, 56% 0);
}

.wire.cut .wire-label {
  opacity: 0.3;
}

.spark {
  position: absolute;
  top: 2px;
  left: 52%;
  font-size: 26px;
  color: var(--wire-color);
  text-shadow: 0 0 14px var(--wire-color);
  animation: spark-flash 0.3s ease-out forwards;
}

@keyframes spark-flash {
  0% { opacity: 1; transform: scale(1.6); }
  100% { opacity: 0; transform: scale(0.5); }
}

.wire:active .wire-line {
  filter: brightness(1.4);
}
</style>
