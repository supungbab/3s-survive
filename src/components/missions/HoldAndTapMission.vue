<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useAudio } from '@/composables/useAudio'

const { playTick } = useAudio()

const emit = defineEmits<{
  tap: [correct: boolean]
}>()

const holding = ref(false)
const tapped = ref(false)
const containerEl = ref<HTMLElement | null>(null)
let holdTouchId: number | null = null
let resolved = false

function onTouchStart(e: TouchEvent) {
  e.stopPropagation()
  if (e.cancelable) e.preventDefault()
  if (resolved) return

  for (let i = 0; i < e.changedTouches.length; i++) {
    const t = e.changedTouches[i]
    const rect = containerEl.value!.getBoundingClientRect()
    const relX = (t.clientX - rect.left) / rect.width

    if (relX < 0.5 && !holding.value) {
      // 왼쪽 영역: 꾹 시작
      holding.value = true
      holdTouchId = t.identifier
    } else if (relX >= 0.5 && holding.value) {
      // 오른쪽 영역: 탭 (홀드 중일 때만 유효)
      tapped.value = true
      resolved = true
      playTick()
      emit('tap', true)
    }
  }
}

function onTouchEnd(e: TouchEvent) {
  e.stopPropagation()
  if (e.cancelable) e.preventDefault()
  if (resolved) return

  for (let i = 0; i < e.changedTouches.length; i++) {
    const t = e.changedTouches[i]
    if (t.identifier === holdTouchId) {
      // 홀드 해제
      holding.value = false
      holdTouchId = null
    }
  }
}

function onTouchMove(e: TouchEvent) {
  e.stopPropagation()
  if (e.cancelable) e.preventDefault()
}

onMounted(() => {
  if (!containerEl.value) return
  const el = containerEl.value
  el.addEventListener('touchstart', onTouchStart, { passive: false })
  el.addEventListener('touchend', onTouchEnd, { passive: false })
  el.addEventListener('touchmove', onTouchMove, { passive: false })
})

onUnmounted(() => {
  if (!containerEl.value) return
  const el = containerEl.value
  el.removeEventListener('touchstart', onTouchStart)
  el.removeEventListener('touchend', onTouchEnd)
  el.removeEventListener('touchmove', onTouchMove)
})
</script>

<template>
  <div ref="containerEl" class="hold-and-tap-mission">
    <div class="zone hold-zone" :class="{ active: holding }">
      <div class="zone-icon">{{ holding ? '✓' : '◎' }}</div>
      <div class="zone-label">꾹</div>
    </div>
    <div class="zone-divider" />
    <div class="zone tap-zone" :class="{ ready: holding, done: tapped }">
      <div class="zone-icon">{{ tapped ? '✓' : '◎' }}</div>
      <div class="zone-label">탭</div>
    </div>
  </div>
</template>

<style scoped>
.hold-and-tap-mission {
  display: flex;
  align-items: stretch;
  padding: 16px;
  gap: 0;
  width: 100%;
  height: 180px;
  touch-action: none;
}

.zone {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: var(--px-green-bg);
  border: 2px solid var(--px-green-border);
  border-radius: 0;
  transition: all 0.15s;
  box-shadow:
    0 0 0 2px var(--px-green-frame),
    inset 1px 1px 0 var(--px-green-bevel-light),
    inset -1px -1px 0 var(--px-green-bevel-dark);
}

.hold-zone.active {
  background: var(--px-green-bg-hover);
  border-color: var(--arc-cyan);
  box-shadow:
    0 0 0 2px var(--px-green-frame),
    0 0 16px rgba(0, 229, 255, 0.3),
    inset 1px 1px 0 var(--px-green-bevel-light),
    inset -1px -1px 0 var(--px-green-bevel-dark);
}

.hold-zone.active .zone-icon,
.hold-zone.active .zone-label {
  color: var(--arc-cyan);
}

.tap-zone.ready {
  border-color: var(--px-green-bright);
  animation: tap-pulse 0.5s ease-in-out infinite alternate;
}

.tap-zone.done {
  background: var(--px-green-bg-hover);
  border-color: var(--px-green-bright);
  animation: none;
}

.zone-divider {
  width: 1px;
  background: var(--px-green-dim);
  opacity: 0.5;
  align-self: stretch;
  margin: 8px 0;
  border-left: 1px dashed var(--px-green-dim);
}

.zone-icon {
  font-size: 36px;
  color: var(--px-green);
  text-shadow: 0 0 12px var(--px-green-glow);
}

.zone-label {
  font-size: 20px;
  font-weight: 700;
  color: var(--px-green);
}

@keyframes tap-pulse {
  from { box-shadow: 0 0 0 2px var(--px-green-frame), 0 0 8px var(--px-green-glow); }
  to { box-shadow: 0 0 0 2px var(--px-green-frame), 0 0 24px var(--px-green-glow-strong); }
}
</style>
