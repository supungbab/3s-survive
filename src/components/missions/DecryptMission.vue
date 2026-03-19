<script setup lang="ts">
import { useAudio } from '@/composables/useAudio'

const { playTick } = useAudio()

const props = defineProps<{
  decryptScrambled: string
  decryptAnswer: string
  decryptChoices: string[]
}>()

const emit = defineEmits<{
  tap: [correct: boolean]
}>()

let resolved = false

function handleChoice(letter: string) {
  if (resolved) return
  resolved = true
  const correct = letter === props.decryptAnswer
  if (correct) playTick()
  emit('tap', correct)
}
</script>

<template>
  <div class="decrypt-mission">
    <div class="scrambled-display">
      <span
        v-for="(ch, i) in decryptScrambled.split('')"
        :key="i"
        class="scrambled-char"
        :class="{ glitch: ch === '▒' }"
      >{{ ch }}</span>
    </div>

    <div class="choice-buttons">
      <button
        v-for="(choice, i) in decryptChoices"
        :key="i"
        class="choice-btn"
        @pointerdown="handleChoice(choice)"
      >
        {{ choice }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.decrypt-mission {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px 24px;
  gap: 20px;
  min-height: 200px;
}

.scrambled-display {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: monospace;
  font-size: 36px;
  font-weight: 700;
  color: var(--px-green-bright);
  text-shadow: 0 0 12px var(--px-green-glow);
  letter-spacing: 4px;
  padding: 12px 20px;
  border: 2px solid var(--px-green-border);
  background: #060e06;
  box-shadow:
    0 0 0 2px var(--px-green-frame),
    inset 0 0 20px rgba(140, 200, 144, 0.05);
}

.scrambled-char {
  display: inline-block;
  min-width: 0.6em;
  text-align: center;
}

.scrambled-char.glitch {
  color: var(--arc-danger);
  text-shadow: 0 0 12px var(--arc-danger);
  animation: glitch-flicker 0.15s steps(2) infinite;
}

@keyframes glitch-flicker {
  0% { opacity: 1; transform: translateY(0); }
  25% { opacity: 0.6; transform: translateY(-2px); }
  50% { opacity: 1; transform: translateX(2px); }
  75% { opacity: 0.7; transform: translateY(1px); }
  100% { opacity: 1; transform: translateX(0); }
}

.choice-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
}

.choice-btn {
  width: 64px;
  height: 64px;
  font-family: monospace;
  font-size: 28px;
  font-weight: 700;
  color: var(--px-green-bright);
  background: var(--px-green-bg);
  border: 3px solid var(--px-green-border);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  text-shadow: 0 0 8px var(--px-green-glow);
  box-shadow:
    0 0 0 2px var(--px-green-frame),
    inset 1px 1px 0 var(--px-green-bevel-light),
    inset -1px -1px 0 var(--px-green-bevel-dark);
  transition: all 0.1s;
}

.choice-btn:active {
  transform: scale(0.9);
  border-color: var(--px-green-bright);
  box-shadow:
    0 0 0 2px var(--px-green-frame),
    0 0 20px var(--px-green-glow-strong);
}
</style>
