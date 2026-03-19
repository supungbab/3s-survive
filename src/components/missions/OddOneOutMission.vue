<script setup lang="ts">
import type { OddVariant } from '@/types/mission'
import { useAudio } from '@/composables/useAudio'

const { playTick } = useAudio()

const props = defineProps<{
  oddVariant: OddVariant
  itemCount: number
  oddIndex: number
}>()

const emit = defineEmits<{
  tap: [correct: boolean]
}>()

// 아이템별 스타일 생성
function getItemStyle(index: number): Record<string, string> {
  const isOdd = index === props.oddIndex

  switch (props.oddVariant) {
    case 'color': {
      // 일반: 그린 계열, 홀수: 시안 계열
      const bg = isOdd ? 'rgba(0, 229, 255, 0.15)' : 'var(--px-green-bg)'
      const border = isOdd ? '#00e5ff' : 'var(--px-green-border)'
      const shadow = isOdd
        ? '0 0 0 2px #0a1214, 0 0 12px rgba(0, 229, 255, 0.3), inset 1px 1px 0 rgba(0, 229, 255, 0.2), inset -1px -1px 0 rgba(0, 50, 60, 0.3)'
        : '0 0 0 2px var(--px-green-frame), inset 1px 1px 0 var(--px-green-bevel-light), inset -1px -1px 0 var(--px-green-bevel-dark)'
      return { background: bg, borderColor: border, boxShadow: shadow }
    }
    case 'size': {
      // 일반: 52px, 홀수: 36px
      const size = isOdd ? '36px' : '52px'
      return { width: size, height: size }
    }
    case 'shape': {
      // 일반: 사각, 홀수: 원형
      return { borderRadius: isOdd ? '50%' : '0' }
    }
    default:
      return {}
  }
}

function handleTap(index: number) {
  playTick()
  emit('tap', index === props.oddIndex)
}
</script>

<template>
  <div class="odd-one-out-mission">
    <div class="odd-grid">
      <button
        v-for="i in itemCount"
        :key="i"
        class="odd-item"
        :style="getItemStyle(i - 1)"
        @pointerdown="handleTap(i - 1)"
      />
    </div>
  </div>
</template>

<style scoped>
.odd-one-out-mission {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
}

.odd-grid {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  max-width: 280px;
}

.odd-item {
  width: 52px;
  height: 52px;
  background: var(--px-green-bg);
  border: 3px solid var(--px-green-border);
  border-radius: 0;
  cursor: pointer;
  transition: transform 0.1s;
  box-shadow:
    0 0 0 2px var(--px-green-frame),
    inset 1px 1px 0 var(--px-green-bevel-light),
    inset -1px -1px 0 var(--px-green-bevel-dark);
}

.odd-item:active {
  transform: scale(0.85);
}
</style>
