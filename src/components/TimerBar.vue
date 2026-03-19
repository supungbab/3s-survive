<script setup lang="ts">
defineProps<{
  progress: number
  active: boolean
}>()
</script>

<template>
  <div class="timer-bar-container">
    <div
      class="timer-bar-fill"
      :class="{ urgent: progress < 0.3, active }"
      :style="{ width: `${progress * 100}%` }"
    />
  </div>
</template>

<style scoped>
.timer-bar-container {
  width: 100%;
  height: 8px;
  background: #0c140c;
  border-radius: 0;
  overflow: hidden;
  border: 2px solid #3a4a38;
  box-shadow:
    0 0 0 2px #111311,
    inset 1px 1px 0 #2a322a;
}

.timer-bar-fill {
  height: 100%;
  background: var(--arc-green);
  border-radius: 0;
  transition: none;
  will-change: width;
  image-rendering: pixelated;
}

.timer-bar-fill.active {
  box-shadow:
    0 0 8px var(--arc-green-glow),
    0 0 20px rgba(140, 200, 144, 0.15);
}

.timer-bar-fill.urgent {
  background: var(--arc-danger);
  box-shadow:
    0 0 8px var(--arc-danger-glow),
    0 0 20px rgba(255, 59, 92, 0.2);
}
</style>
