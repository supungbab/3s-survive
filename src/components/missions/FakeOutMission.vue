<script setup lang="ts">
import type { SwipeDirection } from '@/types/game'

defineProps<{
  realDirection: SwipeDirection
  fakeText: string
}>()

const DIRECTION_NAMES: Record<SwipeDirection, string> = {
  UP: '위로!',
  DOWN: '아래로!',
  LEFT: '왼쪽으로!',
  RIGHT: '오른쪽으로!',
}

const ARROWS: Record<SwipeDirection, string> = {
  UP: '↑',
  DOWN: '↓',
  LEFT: '←',
  RIGHT: '→',
}
</script>

<template>
  <div class="fake-out-mission">
    <!-- 가짜 지시 (더 크고 눈에 띄지만 취소선) -->
    <div class="instruction fake">
      <span class="strike-text">{{ fakeText }}</span>
      <span class="fake-badge">✕ 가짜</span>
    </div>

    <!-- 진짜 지시 (작지만 초록 테두리) -->
    <div class="instruction real">
      <span class="arrow">{{ ARROWS[realDirection] }}</span>
      <span class="real-text">{{ DIRECTION_NAMES[realDirection] }}</span>
      <span class="real-badge">✓ 진짜</span>
    </div>
  </div>
</template>

<style scoped>
.fake-out-mission {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  gap: 16px;
}

.instruction {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  border-radius: 0;
}

.instruction.fake {
  background: rgba(255, 59, 92, 0.06);
  border: 2px solid rgba(255, 59, 92, 0.4);
  box-shadow: 0 0 0 2px rgba(10, 6, 16, 0.8);
}

.strike-text {
  font-size: 32px;
  font-weight: 900;
  color: var(--arc-danger);
  text-decoration: line-through;
  text-decoration-thickness: 3px;
  opacity: 0.7;
}

.fake-badge {
  font-size: 12px;
  font-weight: 700;
  color: var(--arc-danger);
  border: 1px solid var(--arc-danger);
  padding: 2px 6px;
  opacity: 0.6;
}

.instruction.real {
  background: rgba(140, 200, 144, 0.06);
  border: 2px solid var(--px-green);
  box-shadow:
    0 0 0 2px var(--px-green-frame),
    0 0 12px var(--px-green-glow);
}

.arrow {
  font-size: 40px;
  color: var(--px-green-bright);
  text-shadow: 0 0 12px var(--px-green-glow);
}

.real-text {
  font-size: 24px;
  font-weight: 700;
  color: var(--px-green-bright);
}

.real-badge {
  font-size: 12px;
  font-weight: 700;
  color: var(--px-green);
  border: 1px solid var(--px-green);
  padding: 2px 6px;
}
</style>
