<script setup lang="ts">
import { computed } from 'vue'
import { useAudio } from '@/composables/useAudio'

const { playTick } = useAudio()

const props = defineProps<{
  patternLength: number
  currentStep: number
}>()

const emit = defineEmits<{
  tap: [correct: boolean]
}>()

// 고정 위치 배열 (겹치지 않도록 미리 정의)
const DOT_POSITIONS = [
  { x: 25, y: 25 },
  { x: 70, y: 20 },
  { x: 50, y: 65 },
  { x: 20, y: 70 },
  { x: 75, y: 70 },
]

const dots = computed(() =>
  DOT_POSITIONS.slice(0, props.patternLength),
)

function handleDotTap(index: number) {
  playTick()
  emit('tap', index === props.currentStep)
}
</script>

<template>
  <div class="pattern-tap-mission">
    <div class="pattern-field">
      <button
        v-for="(dot, i) in dots"
        :key="i"
        class="pattern-dot"
        :class="{
          done: i < currentStep,
          active: i === currentStep,
        }"
        :style="{ left: `${dot.x}%`, top: `${dot.y}%` }"
        @pointerdown="handleDotTap(i)"
      >
        {{ i + 1 }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.pattern-tap-mission {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
}

.pattern-field {
  position: relative;
  width: 100%;
  height: 180px;
}

.pattern-dot {
  position: absolute;
  width: 56px;
  height: 56px;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 900;
  color: var(--px-green);
  background: var(--px-green-bg);
  border: 3px solid var(--px-green-border);
  border-radius: 0;
  cursor: pointer;
  transition: all 0.15s;
  box-shadow:
    0 0 0 2px var(--px-green-frame),
    inset 1px 1px 0 var(--px-green-bevel-light),
    inset -1px -1px 0 var(--px-green-bevel-dark);
}

.pattern-dot.active {
  color: var(--px-green-bright);
  border-color: var(--px-green-bright);
  box-shadow:
    0 0 0 2px var(--px-green-frame),
    0 0 16px var(--px-green-glow),
    inset 1px 1px 0 var(--px-green-bevel-light),
    inset -1px -1px 0 var(--px-green-bevel-dark);
  animation: dot-breathe 0.6s ease-in-out infinite alternate;
}

.pattern-dot.done {
  color: var(--arc-muted);
  border-color: var(--arc-muted);
  opacity: 0.4;
}

.pattern-dot:active {
  transform: translate(-50%, -50%) scale(0.85);
}

@keyframes dot-breathe {
  from { box-shadow: 0 0 0 2px var(--px-green-frame), 0 0 12px var(--px-green-glow), inset 1px 1px 0 var(--px-green-bevel-light), inset -1px -1px 0 var(--px-green-bevel-dark); }
  to { box-shadow: 0 0 0 2px var(--px-green-frame), 0 0 24px var(--px-green-glow-strong), inset 1px 1px 0 var(--px-green-bevel-light), inset -1px -1px 0 var(--px-green-bevel-dark); }
}
</style>
