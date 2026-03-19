<script setup lang="ts">
import { ref, onMounted } from 'vue'
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
  red: '빨강',
  blue: '파랑',
  yellow: '노랑',
  green: '초록',
}
const WIRE_CSS: Record<WireColor, string> = {
  red: '#ff3b5c',
  blue: '#4a9eff',
  yellow: '#ffd644',
  green: '#8cc890',
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
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

onMounted(() => {
  const chosen = shuffle(WIRE_COLORS).slice(0, props.wireCount)
  wires.value = chosen
  cutOrder.value = shuffle([...chosen])
  cutState.value = new Array(props.wireCount).fill(false)
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
      emit('tap', true)
    }
  } else {
    emit('tap', false)
  }
}
</script>

<template>
  <div class="wire-cut-mission">
    <div class="wire-order">
      <span
        v-for="(c, i) in cutOrder"
        :key="i"
        class="order-label"
        :class="{ done: i < currentStep }"
        :style="{ color: WIRE_CSS[c] }"
      >
        {{ WIRE_NAMES[c] }}
      </span>
    </div>

    <div class="wires">
      <button
        v-for="(wire, i) in wires"
        :key="i"
        class="wire"
        :class="{ cut: cutState[i] }"
        :style="{ '--wire-color': WIRE_CSS[wire] }"
        @pointerdown="handleWireTap(i)"
      >
        <div class="wire-line" />
        <div v-if="cutState[i]" class="spark">✦</div>
      </button>
    </div>
  </div>
</template>

<style scoped>
.wire-cut-mission {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 24px;
  gap: 20px;
  min-height: 180px;
}

.wire-order {
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 18px;
  font-weight: 700;
}

.order-label {
  text-shadow: 0 0 8px currentColor;
  transition: opacity 0.2s;
}

.order-label + .order-label::before {
  content: '→';
  color: var(--arc-muted);
  margin-right: 8px;
}

.order-label.done {
  opacity: 0.3;
  text-decoration: line-through;
}

.wires {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 80%;
}

.wire {
  position: relative;
  height: 32px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
}

.wire-line {
  width: 100%;
  height: 6px;
  margin-top: 13px;
  background: var(--wire-color);
  box-shadow: 0 0 12px var(--wire-color), 0 2px 4px rgba(0,0,0,0.5);
  border-radius: 0;
  transition: all 0.15s;
}

.wire.cut .wire-line {
  background: #333;
  box-shadow: none;
  clip-path: polygon(0 0, 42% 0, 44% 100%, 0 100%, 0 0, 56% 0, 58% 100%, 100% 100%, 100% 0, 56% 0);
}

.spark {
  position: absolute;
  top: 0;
  left: 48%;
  font-size: 24px;
  color: var(--wire-color);
  text-shadow: 0 0 12px var(--wire-color);
  animation: spark-flash 0.3s ease-out forwards;
}

@keyframes spark-flash {
  0% { opacity: 1; transform: scale(1.5); }
  100% { opacity: 0; transform: scale(0.5); }
}

.wire:active .wire-line {
  filter: brightness(1.3);
}
</style>
