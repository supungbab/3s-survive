<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useAudio } from '@/composables/useAudio'

const { playTick } = useAudio()

const emit = defineEmits<{
  tap: [correct: boolean]
}>()

const visible = ref(false)
const gone = ref(false)
let hideTimer: ReturnType<typeof setTimeout> | null = null

onMounted(() => {
  // 타겟 즉시 표시, 1초 후 사라짐
  visible.value = true
  hideTimer = setTimeout(() => {
    visible.value = false
    gone.value = true
  }, 1000)
})

onUnmounted(() => {
  if (hideTimer) clearTimeout(hideTimer)
})

function handleTap() {
  if (gone.value) return
  playTick()
  emit('tap', true)
}
</script>

<template>
  <div class="quick-tap-mission">
    <button
      v-if="visible"
      class="quick-target"
      @pointerdown="handleTap"
    >
      ●
    </button>
    <div v-else-if="gone" class="gone-hint">
      . . .
    </div>
  </div>
</template>

<style scoped>
.quick-tap-mission {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
  min-height: 120px;
}

.quick-target {
  width: 100px;
  height: 100px;
  background: var(--px-green-bg);
  border: 3px solid var(--px-green-bright);
  border-radius: 0;
  color: var(--px-green-bright);
  font-size: 48px;
  cursor: pointer;
  animation: quick-appear 0.15s ease-out;
  box-shadow:
    0 0 0 2px var(--px-green-frame),
    0 0 24px var(--px-green-glow-strong),
    inset 1px 1px 0 var(--px-green-bevel-light),
    inset -1px -1px 0 var(--px-green-bevel-dark);
}

.quick-target:active {
  transform: scale(0.88);
}

.gone-hint {
  font-size: 24px;
  color: var(--arc-muted);
  letter-spacing: 8px;
}

@keyframes quick-appear {
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
