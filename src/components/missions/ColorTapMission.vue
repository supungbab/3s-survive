<script setup lang="ts">
import type { MissionColor } from '@/types/game'
import { useAudio } from '@/composables/useAudio'

const { playTick } = useAudio()

const props = defineProps<{
  targetColor: MissionColor
  colors: MissionColor[]
  negative?: boolean
}>()

const emit = defineEmits<{
  tap: [correct: boolean]
}>()

const COLOR_MAP: Record<MissionColor, string> = {
  red: 'var(--color-red)',
  blue: 'var(--color-blue)',
  yellow: 'var(--color-yellow)',
  green: 'var(--color-green)',
  purple: 'var(--color-purple)',
}

const GLOW_MAP: Record<MissionColor, string> = {
  red: 'rgba(255, 59, 92, 0.4)',
  blue: 'rgba(68, 138, 255, 0.4)',
  yellow: 'rgba(255, 214, 0, 0.4)',
  green: 'rgba(0, 230, 118, 0.4)',
  purple: 'rgba(213, 0, 249, 0.4)',
}

function handleTap(color: MissionColor) {
  playTick()
  const correct = props.negative
    ? color !== props.targetColor
    : color === props.targetColor
  emit('tap', correct)
}
</script>

<template>
  <div class="color-tap-mission">
    <div class="color-circles">
      <button
        v-for="(color, i) in colors"
        :key="i"
        class="color-circle"
        :style="{
          backgroundColor: COLOR_MAP[color],
          boxShadow: `0 0 16px ${GLOW_MAP[color]}, inset 0 0 12px rgba(0,0,0,0.3)`,
          borderColor: COLOR_MAP[color],
        }"
        @pointerdown="handleTap(color)"
      />
    </div>
  </div>
</template>

<style scoped>
.color-tap-mission {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
}

.color-circles {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  justify-content: center;
}

.color-circle {
  width: 80px;
  height: 80px;
  border-radius: 0;
  border: 3px solid;
  cursor: pointer;
  transition: transform 0.1s;
  box-shadow:
    0 0 0 2px #111311,
    inset 0 0 12px rgba(0, 0, 0, 0.3);
}

.color-circle:active {
  transform: scale(0.88);
}
</style>
