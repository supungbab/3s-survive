<script setup lang="ts">
import { useAudio } from '@/composables/useAudio'

const { playTick } = useAudio()

const props = defineProps<{
  bloodTarget: string
  bloodChoices: string[]
}>()

const emit = defineEmits<{
  tap: [correct: boolean]
}>()

function handleChoice(choice: string) {
  if (choice === props.bloodTarget) {
    playTick()
    emit('tap', true)
  } else {
    emit('tap', false)
  }
}
</script>

<template>
  <div class="blood-type-mission">
    <div class="blood-bag">
      <div class="bag-icon">🩸</div>
      <div class="bag-label">{{ bloodTarget }}</div>
      <div class="bag-sub">NEEDED</div>
    </div>

    <div class="blood-choices">
      <button
        v-for="(choice, i) in bloodChoices"
        :key="i"
        class="blood-btn"
        @pointerdown="handleChoice(choice)"
      >
        <span class="btn-type">{{ choice }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.blood-type-mission {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px 24px;
  gap: 20px;
  min-height: 200px;
}

.blood-bag {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 12px 24px;
  border: 2px solid var(--arc-danger, #ff3b5c);
  background: rgba(255, 59, 92, 0.06);
  box-shadow:
    0 0 0 2px var(--px-green-frame),
    0 0 16px rgba(255, 59, 92, 0.15),
    inset 0 0 20px rgba(255, 59, 92, 0.05);
}

.bag-icon {
  font-size: 28px;
  line-height: 1;
}

.bag-label {
  font-size: 32px;
  font-weight: 700;
  font-family: monospace;
  color: #ff3b5c;
  text-shadow: 0 0 12px rgba(255, 59, 92, 0.5);
  line-height: 1;
}

.bag-sub {
  font-size: 12px;
  font-family: monospace;
  color: var(--arc-muted);
  letter-spacing: 3px;
}

.blood-choices {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
}

.blood-btn {
  width: 80px;
  height: 64px;
  border: 2px solid var(--px-green-border);
  background: #0c140c;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.1s;
  box-shadow:
    0 0 0 2px var(--px-green-frame),
    inset 1px 1px 0 var(--px-green-bevel-light),
    inset -1px -1px 0 var(--px-green-bevel-dark);
}

.blood-btn:active {
  transform: scale(0.88);
  border-color: var(--px-green-bright);
  box-shadow:
    0 0 0 2px var(--px-green-frame),
    0 0 16px var(--px-green-glow-strong);
}

.btn-type {
  font-size: 22px;
  font-weight: 700;
  font-family: monospace;
  color: var(--px-green-bright);
  text-shadow: 0 0 8px var(--px-green-glow);
}
</style>
