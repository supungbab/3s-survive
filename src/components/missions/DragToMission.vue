<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useAudio } from '@/composables/useAudio'

const { playTick } = useAudio()

const emit = defineEmits<{
  tap: [correct: boolean]
}>()

// 시작/도착 위치 (% 기반)
const startPos = ref({ x: 20, y: 50 })
const endPos = ref({ x: 80, y: 50 })
const dragPos = ref<{ x: number; y: number } | null>(null)
const isDragging = ref(false)
const containerEl = ref<HTMLElement | null>(null)

onMounted(() => {
  // 랜덤 위치 생성
  startPos.value = { x: 15 + Math.random() * 25, y: 25 + Math.random() * 50 }
  endPos.value = { x: 60 + Math.random() * 25, y: 25 + Math.random() * 50 }
})

function getRelativePos(e: TouchEvent | MouseEvent): { x: number; y: number } | null {
  if (!containerEl.value) return null
  const rect = containerEl.value.getBoundingClientRect()
  const clientX = 'touches' in e ? e.touches[0]?.clientX ?? 0 : e.clientX
  const clientY = 'touches' in e ? e.touches[0]?.clientY ?? 0 : e.clientY
  return {
    x: ((clientX - rect.left) / rect.width) * 100,
    y: ((clientY - rect.top) / rect.height) * 100,
  }
}

function isNearStart(pos: { x: number; y: number }): boolean {
  const dx = pos.x - startPos.value.x
  const dy = pos.y - startPos.value.y
  return Math.sqrt(dx * dx + dy * dy) < 15
}

function isNearEnd(pos: { x: number; y: number }): boolean {
  const dx = pos.x - endPos.value.x
  const dy = pos.y - endPos.value.y
  return Math.sqrt(dx * dx + dy * dy) < 15
}

function onStart(e: TouchEvent | MouseEvent) {
  e.stopPropagation()
  if (e.cancelable) e.preventDefault()
  const pos = getRelativePos(e)
  if (!pos) return
  if (isNearStart(pos)) {
    isDragging.value = true
    dragPos.value = pos
  }
}

function onMove(e: TouchEvent | MouseEvent) {
  e.stopPropagation()
  if (e.cancelable) e.preventDefault()
  if (!isDragging.value) return
  const pos = getRelativePos(e)
  if (pos) dragPos.value = pos
}

function onEnd(e: TouchEvent | MouseEvent) {
  e.stopPropagation()
  if (e.cancelable) e.preventDefault()
  if (!isDragging.value) return
  isDragging.value = false

  if (dragPos.value && isNearEnd(dragPos.value)) {
    playTick()
    emit('tap', true)
  } else {
    dragPos.value = null
  }
}

onMounted(() => {
  if (!containerEl.value) return
  const el = containerEl.value
  el.addEventListener('touchstart', onStart, { passive: false })
  el.addEventListener('touchmove', onMove, { passive: false })
  el.addEventListener('touchend', onEnd, { passive: false })
  el.addEventListener('mousedown', onStart)
  el.addEventListener('mousemove', onMove)
  el.addEventListener('mouseup', onEnd)
})

onUnmounted(() => {
  if (!containerEl.value) return
  const el = containerEl.value
  el.removeEventListener('touchstart', onStart)
  el.removeEventListener('touchmove', onMove)
  el.removeEventListener('touchend', onEnd)
  el.removeEventListener('mousedown', onStart)
  el.removeEventListener('mousemove', onMove)
  el.removeEventListener('mouseup', onEnd)
})
</script>

<template>
  <div ref="containerEl" class="drag-to-mission">
    <!-- 드래그 궤적 -->
    <svg v-if="isDragging && dragPos" class="drag-trail" viewBox="0 0 100 100" preserveAspectRatio="none">
      <line
        :x1="startPos.x" :y1="startPos.y"
        :x2="dragPos.x" :y2="dragPos.y"
        stroke="var(--px-green-bright)" stroke-width="0.8"
        stroke-dasharray="2,2" opacity="0.6"
      />
    </svg>

    <!-- 시작점 -->
    <div
      class="drag-point start"
      :class="{ active: isDragging }"
      :style="{ left: `${startPos.x}%`, top: `${startPos.y}%` }"
    >
      ●
    </div>

    <!-- 도착점 -->
    <div
      class="drag-point end"
      :class="{ near: isDragging && dragPos && isNearEnd(dragPos) }"
      :style="{ left: `${endPos.x}%`, top: `${endPos.y}%` }"
    >
      ○
    </div>

    <!-- 드래그 커서 -->
    <div
      v-if="isDragging && dragPos"
      class="drag-cursor"
      :style="{ left: `${dragPos.x}%`, top: `${dragPos.y}%` }"
    />
  </div>
</template>

<style scoped>
.drag-to-mission {
  position: relative;
  width: 100%;
  height: 200px;
  touch-action: none;
}

.drag-trail {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.drag-point {
  position: absolute;
  transform: translate(-50%, -50%);
  font-size: 36px;
  transition: all 0.15s;
}

.drag-point.start {
  color: var(--px-green-bright);
  text-shadow: 0 0 16px var(--px-green-glow);
}

.drag-point.start.active {
  color: var(--px-green-bright);
  text-shadow: 0 0 24px var(--px-green-glow-strong);
  transform: translate(-50%, -50%) scale(1.2);
}

.drag-point.end {
  color: var(--arc-muted);
  text-shadow: none;
  border: 2px dashed var(--px-green-dim);
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  border-radius: 0;
}

.drag-point.end.near {
  color: var(--px-green-bright);
  border-color: var(--px-green-bright);
  box-shadow: 0 0 16px var(--px-green-glow);
}

.drag-cursor {
  position: absolute;
  width: 16px;
  height: 16px;
  background: var(--px-green-bright);
  transform: translate(-50%, -50%);
  border-radius: 0;
  box-shadow: 0 0 12px var(--px-green-glow-strong);
  pointer-events: none;
}
</style>
