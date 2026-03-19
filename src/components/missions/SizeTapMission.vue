<script setup lang="ts">
import type { SizeTarget } from '@/types/mission'
import { useAudio } from '@/composables/useAudio'

const { playTick } = useAudio()

const props = defineProps<{
  targetSize: SizeTarget
  sizes: number[]
}>()

const emit = defineEmits<{
  tap: [correct: boolean]
}>()

function handleTap(size: number) {
  playTick()
  const sorted = [...props.sizes].sort((a, b) => a - b)
  const isTarget =
    props.targetSize === 'BIG'
      ? size === sorted[sorted.length - 1]
      : size === sorted[0]
  emit('tap', isTarget)
}
</script>

<template>
  <div class="size-tap-mission">
    <div class="size-items">
      <button
        v-for="(size, i) in sizes"
        :key="i"
        class="size-item"
        :style="{
          width: `${size}px`,
          height: `${size}px`,
        }"
        @pointerdown="handleTap(size)"
      />
    </div>
  </div>
</template>

<style scoped>
.size-tap-mission {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
}

.size-items {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.size-item {
  background: var(--px-green-bg);
  border: 3px solid var(--px-green-border);
  border-radius: 0;
  cursor: pointer;
  transition: transform 0.1s;
  box-shadow:
    0 0 0 2px var(--px-green-frame),
    inset 1px 1px 0 var(--px-green-bevel-light),
    inset -1px -1px 0 var(--px-green-bevel-dark),
    0 0 12px var(--px-green-glow);
}

.size-item:active {
  transform: scale(0.88);
  box-shadow:
    0 0 0 2px var(--px-green-frame),
    0 0 24px var(--px-green-glow),
    inset 1px 1px 0 var(--px-green-bevel-light),
    inset -1px -1px 0 var(--px-green-bevel-dark);
}
</style>
