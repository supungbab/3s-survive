<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useAudio } from '@/composables/useAudio'

const { playTick } = useAudio()

const props = defineProps<{
  requiredSwipes: number
}>()

const emit = defineEmits<{
  tap: [correct: boolean]
}>()

const containerEl = ref<HTMLElement | null>(null)
const charge = ref(0) // 0~1
const expectedDir = ref<'LEFT' | 'RIGHT'>('RIGHT')
const brightness = ref(0.2)
let swipeCount = 0
let resolved = false
let startX = 0
let startY = 0
const SWIPE_THRESHOLD = 30

function onStart(e: TouchEvent | MouseEvent) {
  e.stopPropagation()
  if (e.cancelable) e.preventDefault()
  const clientX = 'touches' in e ? (e.touches[0]?.clientX ?? 0) : e.clientX
  const clientY = 'touches' in e ? (e.touches[0]?.clientY ?? 0) : e.clientY
  startX = clientX
  startY = clientY
}

function onEnd(e: TouchEvent | MouseEvent) {
  e.stopPropagation()
  if (e.cancelable) e.preventDefault()
  if (resolved) return

  const clientX = 'changedTouches' in e ? (e.changedTouches[0]?.clientX ?? 0) : e.clientX
  const clientY = 'changedTouches' in e ? (e.changedTouches[0]?.clientY ?? 0) : e.clientY
  const dx = clientX - startX
  const dy = clientY - startY

  if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dy) > Math.abs(dx)) return

  const dir = dx > 0 ? 'RIGHT' : 'LEFT'
  if (dir === expectedDir.value) {
    swipeCount++
    charge.value = swipeCount / props.requiredSwipes
    brightness.value = 0.2 + charge.value * 0.8
    expectedDir.value = dir === 'LEFT' ? 'RIGHT' : 'LEFT'
    playTick()

    if (swipeCount >= props.requiredSwipes) {
      resolved = true
      emit('tap', true)
    }
  }
  // wrong direction: just ignore, don't fail
}

onMounted(() => {
  if (!containerEl.value) return
  const el = containerEl.value
  el.addEventListener('touchstart', onStart, { passive: false })
  el.addEventListener('touchend', onEnd, { passive: false })
  el.addEventListener('mousedown', onStart)
  el.addEventListener('mouseup', onEnd)
})

onUnmounted(() => {
  if (!containerEl.value) return
  const el = containerEl.value
  el.removeEventListener('touchstart', onStart)
  el.removeEventListener('touchend', onEnd)
  el.removeEventListener('mousedown', onStart)
  el.removeEventListener('mouseup', onEnd)
})
</script>

<template>
  <div ref="containerEl" class="power-up-mission">
    <div class="crt-screen" :style="{ opacity: brightness }">
      <div class="crt-text">POWER</div>
    </div>

    <div class="battery">
      <div class="battery-fill" :style="{ height: `${charge * 100}%` }" />
      <div class="battery-segments">
        <div v-for="i in props.requiredSwipes" :key="i" class="battery-seg" />
      </div>
    </div>

    <div class="swipe-hint">
      {{ expectedDir === 'RIGHT' ? '→' : '←' }}
    </div>
  </div>
</template>

<style scoped>
.power-up-mission {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px 24px;
  gap: 16px;
  touch-action: none;
  min-height: 200px;
}

.crt-screen {
  width: 120px;
  height: 60px;
  border: 2px solid var(--px-green-border);
  background: #060e06;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow:
    0 0 0 2px var(--px-green-frame),
    inset 0 0 20px rgba(140, 200, 144, 0.05);
  transition: opacity 0.15s;
}

.crt-text {
  font-size: 20px;
  font-weight: 700;
  color: var(--px-green-bright);
  text-shadow: 0 0 12px var(--px-green-glow);
  font-family: monospace;
}

.battery {
  position: relative;
  width: 48px;
  height: 80px;
  border: 3px solid var(--px-green-border);
  background: #0c140c;
  box-shadow: 0 0 0 2px var(--px-green-frame);
  overflow: hidden;
}

.battery::before {
  content: '';
  position: absolute;
  top: -8px;
  left: 25%;
  width: 50%;
  height: 6px;
  background: var(--px-green-border);
}

.battery-fill {
  position: absolute;
  bottom: 0;
  width: 100%;
  background: var(--px-green-bright);
  box-shadow: 0 0 12px var(--px-green-glow-strong);
  transition: height 0.15s ease-out;
}

.battery-segments {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
}

.battery-seg {
  flex: 1;
  border-bottom: 1px solid #0c140c;
}

.swipe-hint {
  font-size: 36px;
  color: var(--px-green-bright);
  text-shadow: 0 0 16px var(--px-green-glow);
  animation: hint-bounce 0.4s ease-in-out infinite alternate;
}

@keyframes hint-bounce {
  from { transform: translateX(-4px); }
  to { transform: translateX(4px); }
}
</style>
