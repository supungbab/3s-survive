<script setup lang="ts">
import { usePressable } from '@/composables/usePressable'

defineProps<{
  bestScore: number
}>()

const emit = defineEmits<{
  start: []
}>()

const start = usePressable(() => emit('start'))
</script>

<template>
  <div class="start-screen" @click="start.onClick">
<div class="start-content">
      <h1 class="title">3초 생존</h1>
      <p class="subtitle">미션을 3초 안에 클리어하라!</p>
      <div v-if="bestScore > 0" class="best-display">
        최고 기록: <span class="best-num">{{ bestScore }}</span>
      </div>
      <div class="tap-hint pulse-hint">탭하여 시작</div>
    </div>
  </div>
</template>

<style scoped>
.start-screen {
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
}

.start-content {
  text-align: center;
  padding: 24px;
}

.title {
  font-size: 48px;
  font-weight: 900;
  color: var(--text);
  margin-bottom: 12px;
  text-shadow: 0 0 40px var(--accent-glow);
}

.subtitle {
  font-size: 18px;
  color: var(--muted);
  margin-bottom: 32px;
}

.best-display {
  font-size: 16px;
  color: var(--muted);
  margin-bottom: 24px;
}

.best-num {
  color: var(--accent);
  font-weight: 700;
  font-size: 20px;
}

.tap-hint {
  font-size: 20px;
  color: var(--accent);
  font-weight: 700;
}

.pulse-hint {
  animation: pulse 1.5s ease-in-out infinite;
}
</style>
