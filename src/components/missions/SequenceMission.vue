<script setup lang="ts">
import type { SequenceStep } from '@/types/game'

defineProps<{
  steps: SequenceStep[]
  currentStep: number
}>()

const STEP_ICONS: Record<string, string> = {
  TAP: '👆',
  UP: '⬆️',
  DOWN: '⬇️',
  LEFT: '⬅️',
  RIGHT: '➡️',
}

function getIcon(step: SequenceStep): string {
  if (step.action === 'TAP') return STEP_ICONS.TAP
  return STEP_ICONS[step.direction]
}
</script>

<template>
  <div class="sequence-mission">
    <div class="steps">
      <div
        v-for="(step, i) in steps"
        :key="i"
        class="step"
        :class="{ done: i < currentStep, active: i === currentStep }"
      >
        <span class="step-icon">{{ getIcon(step) }}</span>
      </div>
    </div>
    <div class="sequence-hint">순서대로!</div>
  </div>
</template>

<style scoped>
.sequence-mission {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  gap: 16px;
}

.steps {
  display: flex;
  gap: 16px;
  align-items: center;
}

.step {
  width: 64px;
  height: 64px;
  border-radius: 0;
  background: #121214;
  border: 2px solid #4a4a46;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  transition: all 0.2s;
  box-shadow:
    0 0 0 2px #0a0a0c,
    inset 1px 1px 0 #3a3a38,
    inset -1px -1px 0 #1a1a1c;
}

.step.done {
  border-color: #4a5648;
  background: #0c140c;
  opacity: 0.5;
  box-shadow:
    0 0 0 2px #111311,
    0 0 8px rgba(140, 200, 144, 0.1),
    inset 1px 1px 0 #3a4a38;
}

.step.active {
  border-color: var(--arc-amber);
  animation: pulse 0.8s ease-in-out infinite;
  box-shadow:
    0 0 0 2px #111311,
    0 0 16px var(--arc-amber-glow);
}

.step-icon {
  line-height: 1;
}

.sequence-hint {
  font-size: 16px;
  color: var(--arc-muted);
}
</style>
