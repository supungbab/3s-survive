<script setup lang="ts">
import { useAudio } from '@/composables/useAudio'

const { playTick } = useAudio()

const props = defineProps<{
  mathExpression: string
  mathAnswer: number
  mathChoices: number[]
}>()

const emit = defineEmits<{
  tap: [correct: boolean]
}>()

function handleTap(choice: number) {
  playTick()
  emit('tap', choice === props.mathAnswer)
}
</script>

<template>
  <div class="math-tap-mission">
    <div class="math-expression">{{ mathExpression }} = ?</div>
    <div class="math-choices">
      <button
        v-for="(choice, i) in mathChoices"
        :key="i"
        class="math-choice"
        @pointerdown="handleTap(choice)"
      >
        {{ choice }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.math-tap-mission {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  gap: 24px;
}

.math-expression {
  font-size: 40px;
  font-weight: 900;
  color: var(--px-green-bright);
  text-shadow:
    0 0 16px var(--px-green-glow),
    0 0 48px rgba(140, 200, 144, 0.15);
}

.math-choices {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.math-choice {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: 900;
  color: var(--arc-text);
  background: var(--px-green-bg);
  border: 3px solid var(--px-green-border);
  border-radius: 0;
  cursor: pointer;
  transition: transform 0.1s;
  box-shadow:
    0 0 0 2px var(--px-green-frame),
    inset 1px 1px 0 var(--px-green-bevel-light),
    inset -1px -1px 0 var(--px-green-bevel-dark);
}

.math-choice:active {
  transform: scale(0.88);
  background: var(--px-green-bg-hover);
  box-shadow:
    0 0 0 2px var(--px-green-frame),
    0 0 16px var(--px-green-glow),
    inset 1px 1px 0 var(--px-green-bevel-light),
    inset -1px -1px 0 var(--px-green-bevel-dark);
}
</style>
