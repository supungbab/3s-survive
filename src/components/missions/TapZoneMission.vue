<script setup lang="ts">
import type { TapZone } from '@/types/mission'
import { useAudio } from '@/composables/useAudio'

const { playTick } = useAudio()

const props = defineProps<{
  targetZone: TapZone
}>()

const emit = defineEmits<{
  tap: [correct: boolean]
}>()

function handleTap(zone: TapZone) {
  playTick()
  emit('tap', zone === props.targetZone)
}
</script>

<template>
  <div class="tap-zone-mission">
    <button class="zone zone-left" @pointerdown="handleTap('LEFT')">
      <span class="zone-arrow">◀</span>
      <span class="zone-label">왼쪽</span>
    </button>
    <div class="zone-divider" />
    <button class="zone zone-right" @pointerdown="handleTap('RIGHT')">
      <span class="zone-label">오른쪽</span>
      <span class="zone-arrow">▶</span>
    </button>
  </div>
</template>

<style scoped>
.tap-zone-mission {
  display: flex;
  align-items: stretch;
  justify-content: center;
  padding: 16px;
  gap: 0;
  width: 100%;
  height: 180px;
}

.zone {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: var(--px-green-bg);
  border: 2px solid var(--px-green-border);
  border-radius: 0;
  cursor: pointer;
  transition: all 0.1s;
  box-shadow:
    0 0 0 2px var(--px-green-frame),
    inset 1px 1px 0 var(--px-green-bevel-light),
    inset -1px -1px 0 var(--px-green-bevel-dark);
}

.zone:active {
  transform: scale(0.95);
  background: var(--px-green-bg-hover);
  box-shadow:
    0 0 0 2px var(--px-green-frame),
    0 0 20px var(--px-green-glow),
    inset 1px 1px 0 var(--px-green-bevel-light),
    inset -1px -1px 0 var(--px-green-bevel-dark);
}

.zone-divider {
  width: 1px;
  background: var(--px-green-dim);
  opacity: 0.5;
  align-self: stretch;
  margin: 8px 0;
  border-left: 1px dashed var(--px-green-dim);
}

.zone-arrow {
  font-size: 32px;
  color: var(--px-green-bright);
  text-shadow: 0 0 12px var(--px-green-glow);
}

.zone-label {
  font-size: 24px;
  font-weight: 700;
  color: var(--px-green);
}
</style>
