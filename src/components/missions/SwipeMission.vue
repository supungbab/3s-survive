<script setup lang="ts">
import type { SwipeDirection } from '@/types/game'

defineProps<{
  direction: SwipeDirection
  reverse?: boolean
  mirror?: boolean
  iconOnly?: boolean
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
    <div
      class="arrow-display"
      :class="{ reverse, mirror, 'icon-only': iconOnly }"
    >
      {{ ARROWS[direction] }}
    </div>
    <div v-if="reverse" class="reverse-label">반대로!</div>
    <div v-if="mirror" class="mirror-label">거울!</div>
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
  color: var(--px-green-bright);
  text-shadow:
    0 0 20px var(--px-green-glow),
    0 0 60px rgba(140, 200, 144, 0.15);
}

.arrow-display.icon-only {
  font-size: 128px;
  animation: swipe-pulse 0.8s ease-in-out infinite alternate;
  text-shadow:
    0 0 30px var(--px-green-glow-strong),
    0 0 80px rgba(140, 200, 144, 0.25);
}

.arrow-display.reverse {
  color: var(--arc-danger);
  text-shadow:
    0 0 20px var(--arc-danger-glow),
    0 0 60px rgba(255, 59, 92, 0.15);
}

.arrow-display.mirror {
  color: var(--arc-cyan);
  text-shadow:
    0 0 20px rgba(0, 229, 255, 0.4),
    0 0 60px rgba(0, 229, 255, 0.15);
  transform: scaleX(-1);
}

.reverse-label {
  font-size: 20px;
  color: var(--arc-danger);
  font-weight: 700;
  margin-top: 8px;
  text-shadow: 0 0 12px var(--arc-danger-glow);
}

.mirror-label {
  font-size: 20px;
  color: var(--arc-cyan);
  font-weight: 700;
  margin-top: 8px;
  text-shadow: 0 0 12px rgba(0, 229, 255, 0.4);
  border: 1px dashed rgba(0, 229, 255, 0.3);
  padding: 4px 16px;
}

@keyframes swipe-pulse {
  from {
    opacity: 0.7;
    text-shadow:
      0 0 20px var(--px-green-glow),
      0 0 60px rgba(140, 200, 144, 0.1);
  }
  to {
    opacity: 1;
    text-shadow:
      0 0 40px var(--px-green-glow-strong),
      0 0 100px rgba(140, 200, 144, 0.3);
  }
}
</style>
