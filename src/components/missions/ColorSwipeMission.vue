<script setup lang="ts">
import type { MissionColor, SwipeDirection } from '@/types/game'

defineProps<{
  targetColor: MissionColor
  colorSwipeRule: { color: MissionColor; direction: SwipeDirection }[]
}>()

const COLOR_MAP: Record<MissionColor, string> = {
  red: 'var(--color-red)',
  blue: 'var(--color-blue)',
  yellow: 'var(--color-yellow)',
  green: 'var(--color-green)',
  purple: 'var(--color-purple)',
}

const COLOR_NAMES: Record<MissionColor, string> = {
  red: '빨강',
  blue: '파랑',
  yellow: '노랑',
  green: '초록',
  purple: '보라',
}

const ARROWS: Record<SwipeDirection, string> = {
  UP: '↑',
  DOWN: '↓',
  LEFT: '←',
  RIGHT: '→',
}
</script>

<template>
  <div class="color-swipe-mission">
    <!-- 규칙 표시 -->
    <div class="rule-display">
      <div v-for="r in colorSwipeRule" :key="r.color" class="rule-item">
        <span class="rule-color" :style="{ color: COLOR_MAP[r.color] }">{{ COLOR_NAMES[r.color] }}</span>
        <span class="rule-eq">=</span>
        <span class="rule-dir">{{ ARROWS[r.direction] }}</span>
      </div>
    </div>

    <!-- 타겟 색상 -->
    <div class="target-display">
      <div
        class="target-block"
        :style="{
          backgroundColor: COLOR_MAP[targetColor],
          boxShadow: `0 0 24px ${COLOR_MAP[targetColor]}66`,
        }"
      />
    </div>
  </div>
</template>

<style scoped>
.color-swipe-mission {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  gap: 20px;
}

.rule-display {
  display: flex;
  gap: 24px;
}

.rule-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border: 1px solid var(--px-green-border);
  background: var(--px-green-bg);
  border-radius: 0;
}

.rule-color {
  font-size: 18px;
  font-weight: 700;
}

.rule-eq {
  font-size: 16px;
  color: var(--arc-muted);
}

.rule-dir {
  font-size: 24px;
  color: var(--arc-text);
  font-weight: 900;
}

.target-display {
  display: flex;
  justify-content: center;
}

.target-block {
  width: 80px;
  height: 80px;
  border-radius: 0;
  border: 3px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 0 0 2px #111311;
}
</style>
