<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  countItems: number
  currentTaps: number
}>()

// 아이템 위치를 countItems 기반으로 고정 생성 (랜덤 느낌이지만 재현 가능)
const itemPositions = computed(() => {
  const positions: { x: number; y: number }[] = []
  // 균등 분산 + 약간의 오프셋
  const cols = Math.ceil(Math.sqrt(props.countItems))
  for (let i = 0; i < props.countItems; i++) {
    const col = i % cols
    const row = Math.floor(i / cols)
    positions.push({
      x: 20 + col * 30 + ((i * 7) % 15),
      y: 15 + row * 40 + ((i * 11) % 20),
    })
  }
  return positions
})

const progressPercent = computed(() =>
  Math.min(100, (props.currentTaps / props.countItems) * 100),
)
</script>

<template>
  <div class="count-tap-mission">
    <div class="count-field">
      <span
        v-for="(pos, i) in itemPositions"
        :key="i"
        class="count-item"
        :style="{ left: `${pos.x}%`, top: `${pos.y}%` }"
      >
        ★
      </span>
    </div>
    <div class="count-progress">
      <div class="tap-counter">
        <span class="current">{{ currentTaps }}</span>
        <span class="separator"> / </span>
        <span class="target">?</span>
      </div>
      <div class="count-progress-bar">
        <div class="count-progress-fill" :style="{ width: `${progressPercent}%` }" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.count-tap-mission {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  gap: 16px;
}

.count-field {
  position: relative;
  width: 100%;
  height: 120px;
}

.count-item {
  position: absolute;
  font-size: 28px;
  color: var(--arc-amber);
  text-shadow: 0 0 12px rgba(255, 184, 0, 0.4);
  transform: translate(-50%, -50%);
  animation: star-idle 1.5s ease-in-out infinite alternate;
}

.count-item:nth-child(odd) {
  animation-delay: 0.3s;
}

.count-progress {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.tap-counter {
  font-size: 36px;
  font-weight: 900;
}

.current {
  color: var(--px-green-bright);
  text-shadow: 0 0 12px var(--px-green-glow);
}

.separator {
  color: var(--arc-muted);
}

.target {
  color: var(--arc-muted);
  font-size: 28px;
}

.count-progress-bar {
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

.count-progress-fill {
  height: 100%;
  background: var(--px-green-bright);
  border-radius: 0;
  transition: width 0.05s linear;
  box-shadow: 0 0 8px var(--px-green-glow);
}

@keyframes star-idle {
  from { opacity: 0.7; }
  to { opacity: 1; }
}
</style>
