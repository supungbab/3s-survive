<script setup lang="ts">
import type { SwipeDirection } from '@/types/game'

defineProps<{
  direction: SwipeDirection
  reverse?: boolean
}>()

const ARROWS: Record<SwipeDirection, string> = {
  UP: '↑',
  DOWN: '↓',
  LEFT: '←',
  RIGHT: '→',
}
</script>

<template>
  <div class="swipe-mission">
    <div class="arrow-display" :class="{ reverse }">
      {{ ARROWS[direction] }}
    </div>
    <div v-if="reverse" class="reverse-label">반대로!</div>
  </div>
</template>

<style scoped>
.swipe-mission {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.arrow-display {
  font-size: 96px;
  line-height: 1;
  color: var(--arc-green);
  text-shadow:
    0 0 20px var(--arc-green-glow),
    0 0 60px rgba(140, 200, 144, 0.15);
}

.arrow-display.reverse {
  color: var(--arc-danger);
  text-shadow:
    0 0 20px var(--arc-danger-glow),
    0 0 60px rgba(255, 59, 92, 0.15);
}

.reverse-label {
  font-size: 20px;
  color: var(--arc-danger);
  font-weight: 700;
  margin-top: 8px;
  text-shadow: 0 0 12px var(--arc-danger-glow);
}
</style>
