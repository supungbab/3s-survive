<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAudio } from '@/composables/useAudio'

const { playTick } = useAudio()

const props = defineProps<{
  decontamCount: number
}>()

const emit = defineEmits<{
  tap: [correct: boolean]
}>()

interface Spot {
  id: number
  x: number
  y: number
  cleared: boolean
}

const spots = ref<Spot[]>([])
const currentStep = ref(0)

function generateSpots(count: number): Spot[] {
  const result: Spot[] = []
  const PADDING = 8
  const MAX_ATTEMPTS = 80

  for (let i = 0; i < count; i++) {
    let attempts = 0
    let x: number, y: number
    let overlapping: boolean

    do {
      x = PADDING + Math.random() * (100 - 2 * PADDING - 20)
      y = PADDING + Math.random() * (100 - 2 * PADDING - 20)
      overlapping = result.some((s) => {
        const dx = Math.abs(s.x - x)
        const dy = Math.abs(s.y - y)
        return dx < 22 && dy < 22
      })
      attempts++
    } while (overlapping && attempts < MAX_ATTEMPTS)

    result.push({ id: i + 1, x, y, cleared: false })
  }
  return result
}

onMounted(() => {
  spots.value = generateSpots(props.decontamCount)
})

function handleSpotTap(spot: Spot) {
  if (spot.cleared) return
  const expected = currentStep.value + 1

  if (spot.id === expected) {
    spot.cleared = true
    currentStep.value++
    playTick()

    if (currentStep.value >= props.decontamCount) {
      emit('tap', true)
    }
  } else {
    emit('tap', false)
  }
}
</script>

<template>
  <div class="decontam-mission">
    <div class="contam-field">
      <button
        v-for="spot in spots"
        :key="spot.id"
        class="contam-spot"
        :class="{ cleared: spot.cleared, next: spot.id === currentStep + 1 }"
        :style="{ left: `${spot.x}%`, top: `${spot.y}%` }"
        @pointerdown="handleSpotTap(spot)"
      >
        <span class="spot-blob">☣</span>
        <span class="spot-number">{{ spot.id }}</span>
      </button>
    </div>
    <div class="decontam-hint">
      DECONTAM {{ currentStep }}/{{ decontamCount }}
    </div>
  </div>
</template>

<style scoped>
.decontam-mission {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px 24px;
  gap: 12px;
  min-height: 220px;
}

.contam-field {
  position: relative;
  width: 100%;
  height: 180px;
  border: 2px solid var(--px-green-border);
  background: #060e06;
  box-shadow:
    0 0 0 2px var(--px-green-frame),
    inset 0 0 30px rgba(140, 200, 144, 0.04);
  overflow: hidden;
}

.contam-spot {
  position: absolute;
  width: 56px;
  height: 56px;
  border: 2px solid #9acd32;
  background: rgba(154, 205, 50, 0.08);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0;
  padding: 0;
  transition: all 0.2s;
  box-shadow:
    0 0 12px rgba(154, 205, 50, 0.25),
    inset 0 0 10px rgba(154, 205, 50, 0.1);
}

.contam-spot.next {
  border-color: #cfff30;
  box-shadow:
    0 0 16px rgba(207, 255, 48, 0.4),
    inset 0 0 14px rgba(207, 255, 48, 0.15);
  animation: contam-pulse 0.8s ease-in-out infinite;
}

.contam-spot.cleared {
  opacity: 0;
  transform: scale(0.3);
  pointer-events: none;
}

.contam-spot:active {
  transform: scale(0.88);
}

.spot-blob {
  font-size: 20px;
  line-height: 1;
  filter: drop-shadow(0 0 6px rgba(154, 205, 50, 0.5));
}

.spot-number {
  font-size: 14px;
  font-weight: 700;
  font-family: monospace;
  color: #cfff30;
  text-shadow: 0 0 6px rgba(207, 255, 48, 0.5);
  line-height: 1;
}

.decontam-hint {
  font-size: 14px;
  font-family: monospace;
  color: var(--px-green-bright);
  text-shadow: 0 0 8px var(--px-green-glow);
  letter-spacing: 2px;
}

@keyframes contam-pulse {
  0%, 100% { box-shadow: 0 0 12px rgba(207, 255, 48, 0.3), inset 0 0 10px rgba(207, 255, 48, 0.1); }
  50% { box-shadow: 0 0 24px rgba(207, 255, 48, 0.6), inset 0 0 18px rgba(207, 255, 48, 0.2); }
}
</style>
