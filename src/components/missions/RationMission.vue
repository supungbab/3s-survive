<script setup lang="ts">
import { useAudio } from '@/composables/useAudio'

const { playTick } = useAudio()

const props = defineProps<{
  rationPeople: number
  rationPerPerson: number
  rationChoices: number[]
}>()

const emit = defineEmits<{
  tap: [correct: boolean]
}>()

const correctAnswer = props.rationPeople * props.rationPerPerson

function handleTap(choice: number) {
  if (choice === correctAnswer) {
    playTick()
    emit('tap', true)
  } else {
    emit('tap', false)
  }
}
</script>

<template>
  <div class="ration-mission">
    <div class="survivors">
      <span v-for="i in rationPeople" :key="i" class="survivor-icon">&#9787;</span>
    </div>

    <div class="ration-info">
      &times;{{ rationPerPerson }} EA
    </div>

    <div class="ration-choices">
      <button
        v-for="(choice, i) in rationChoices"
        :key="i"
        class="ration-choice"
        @pointerdown="handleTap(choice)"
      >
        {{ choice }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.ration-mission {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px 24px;
  gap: 16px;
  min-height: 180px;
}

.survivors {
  display: flex;
  gap: 8px;
  justify-content: center;
  flex-wrap: wrap;
}

.survivor-icon {
  font-size: 36px;
  color: var(--px-green-bright);
  text-shadow: 0 0 10px var(--px-green-glow);
  line-height: 1;
}

.ration-info {
  font-size: 22px;
  font-weight: 700;
  font-family: monospace;
  color: var(--px-green-dim);
  text-shadow: 0 0 8px var(--px-green-glow);
  letter-spacing: 2px;
}

.ration-choices {
  display: flex;
  gap: 16px;
  justify-content: center;
}

.ration-choice {
  width: 80px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: 900;
  font-family: monospace;
  color: var(--px-green-bright);
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

.ration-choice:active {
  transform: scale(0.88);
  background: var(--px-green-bg-hover);
  box-shadow:
    0 0 0 2px var(--px-green-frame),
    0 0 16px var(--px-green-glow),
    inset 1px 1px 0 var(--px-green-bevel-light),
    inset -1px -1px 0 var(--px-green-bevel-dark);
}
</style>
