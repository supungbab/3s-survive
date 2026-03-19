<script setup lang="ts">
import { computed } from 'vue'
import type { SwipeDirection } from '@/types/game'

const props = defineProps<{
  direction: SwipeDirection
  swipeCount: number
  currentSwipes: number
}>()

const ARROWS: Record<SwipeDirection, string> = {
  UP: '↑',
  DOWN: '↓',
  LEFT: '←',
  RIGHT: '→',
}

const progressPercent = computed(() =>
  Math.min(100, (props.currentSwipes / props.swipeCount) * 100),
)
</script>

<template>
  <div class="double-swipe-mission">
    <div class="arrow-display">
      {{ ARROWS[direction] }}
    </div>
    <div class="swipe-counter">
      <span class="current">{{ currentSwipes }}</span>
      <span class="separator">/</span>
      <span class="target">{{ swipeCount }}</span>
    </div>
    <div class="swipe-progress-bar">
      <div class="swipe-progress-fill" :style="{ width: `${progressPercent}%` }" />
    </div>
  </div>
</template>

<style scoped>
.double-swipe-mission {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  gap: 12px;
}

.arrow-display {
  font-size: 96px;
  line-height: 1;
  color: var(--px-green-bright);
  text-shadow:
    0 0 20px var(--px-green-glow),
    0 0 60px rgba(140, 200, 144, 0.15);
}

.swipe-counter {
  font-size: 36px;
  font-weight: 900;
}

.current {
  color: var(--px-green-bright);
  text-shadow: 0 0 12px var(--px-green-glow);
}

.separator {
  color: var(--arc-muted);
  margin: 0 4px;
}

.target {
  color: var(--arc-muted);
}

.swipe-progress-bar {
  width: 160px;
  height: 8px;
  background: #0c140c;
  border-radius: 0;
  overflow: hidden;
  border: 2px solid #3a4a38;
  box-shadow:
    0 0 0 2px #111311,
    inset 1px 1px 0 #2a322a;
}

.swipe-progress-fill {
  height: 100%;
  background: var(--px-green-bright);
  border-radius: 0;
  transition: width 0.1s linear;
  box-shadow: 0 0 8px var(--px-green-glow);
}
</style>
