<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  score: number
}>()

const isPop = ref(false)

watch(() => props.score, () => {
  if (props.score > 0) {
    isPop.value = true
    setTimeout(() => { isPop.value = false }, 300)
  }
})
</script>

<template>
  <div class="score-row">
    <span class="score-label">점수:</span>
    <span class="score-value" :class="{ 'score-pop': isPop }">{{ score }}</span>
  </div>
</template>

<style scoped>
.score-row {
  display: flex;
  align-items: baseline;
  justify-content: flex-end;
  gap: 8px;
}

.score-label {
  font-size: 14px;
  color: var(--arc-muted);
}

.score-value {
  font-size: 48px;
  font-weight: 900;
  color: var(--px-green-bright);
  text-align: right;
  line-height: 1;
  text-shadow:
    0 0 16px rgba(140, 200, 144, 0.3),
    0 0 48px rgba(140, 200, 144, 0.1);
}
</style>
