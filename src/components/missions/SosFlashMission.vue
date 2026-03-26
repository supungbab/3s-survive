<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useAudio } from '@/composables/useAudio'
import { useI18n } from '@/composables/useI18n'

const { playTick } = useAudio()
const { t } = useI18n()

const emit = defineEmits<{
  tap: [correct: boolean]
}>()

const containerEl = ref<HTMLElement | null>(null)
const flashOn = ref(false)
const phase = ref<'pattern' | 'prompt' | 'expired'>('pattern')
let resolved = false
const timers: ReturnType<typeof setTimeout>[] = []

// SOS pattern: 3 short, 3 long, 3 short (compressed to fit in game timer)
// short flash: 80ms on, 80ms off
// long flash: 180ms on, 80ms off
function buildSosTimeline(): { onAt: number; offAt: number }[] {
  const events: { onAt: number; offAt: number }[] = []
  let t = 100 // initial delay

  // 3 short
  for (let i = 0; i < 3; i++) {
    events.push({ onAt: t, offAt: t + 80 })
    t += 80 + 80
  }
  t += 60 // gap between groups
  // 3 long
  for (let i = 0; i < 3; i++) {
    events.push({ onAt: t, offAt: t + 180 })
    t += 180 + 80
  }
  t += 60
  // 3 short
  for (let i = 0; i < 3; i++) {
    events.push({ onAt: t, offAt: t + 80 })
    t += 80 + 80
  }
  return events
}

function onTap(e: TouchEvent | MouseEvent) {
  e.stopPropagation()
  if (e.cancelable) e.preventDefault()
  if (resolved) return

  if (phase.value === 'pattern') {
    // Ignore early taps during pattern playback
    return
  }

  if (phase.value === 'prompt') {
    resolved = true
    playTick()
    emit('tap', true)
  }
}

onMounted(() => {
  const timeline = buildSosTimeline()

  // Schedule flash on/off
  for (const ev of timeline) {
    timers.push(setTimeout(() => { flashOn.value = true }, ev.onAt))
    timers.push(setTimeout(() => { flashOn.value = false }, ev.offAt))
  }

  // Calculate total pattern duration
  const lastEvent = timeline[timeline.length - 1]
  const patternEnd = lastEvent.offAt + 150

  // Show prompt after pattern ends
  timers.push(setTimeout(() => {
    if (resolved) return
    phase.value = 'prompt'
  }, patternEnd))

  // Expire window after 800ms
  timers.push(setTimeout(() => {
    if (resolved) return
    phase.value = 'expired'
    // Parent timer handles timeout — no emit needed
  }, patternEnd + 800))

  if (!containerEl.value) return
  const el = containerEl.value
  el.addEventListener('touchstart', onTap, { passive: false })
  el.addEventListener('mousedown', onTap)
})

onUnmounted(() => {
  for (const t of timers) clearTimeout(t)
  if (!containerEl.value) return
  const el = containerEl.value
  el.removeEventListener('touchstart', onTap)
  el.removeEventListener('mousedown', onTap)
})
</script>

<template>
  <div ref="containerEl" class="sos-flash-mission">
    <div class="flash-overlay" :class="{ on: flashOn }" />

    <div class="sos-content">
      <div v-if="phase === 'pattern'" class="sos-label">
        ··· — — — ···
      </div>
      <div v-else-if="phase === 'prompt'" class="sos-prompt">
        {{ t('지금 탭하세요') }}
      </div>
      <div v-else class="sos-lost">
        ···
      </div>
    </div>
  </div>
</template>

<style scoped>
.sos-flash-mission {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px 24px;
  gap: 16px;
  touch-action: none;
  min-height: 200px;
  overflow: hidden;
}

.flash-overlay {
  position: absolute;
  inset: 0;
  background: var(--px-green-bright);
  opacity: 0;
  transition: opacity 0.04s linear;
  pointer-events: none;
  z-index: 1;
}

.flash-overlay.on {
  opacity: 0.6;
  box-shadow: inset 0 0 60px var(--px-green-glow-strong);
}

.sos-content {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sos-label {
  font-size: 28px;
  font-weight: 700;
  color: var(--px-green-dim);
  font-family: monospace;
  letter-spacing: 4px;
  text-shadow: 0 0 8px var(--px-green-glow);
}

.sos-prompt {
  font-size: 32px;
  font-weight: 700;
  color: var(--px-green-bright);
  font-family: monospace;
  text-shadow: 0 0 20px var(--px-green-glow-strong);
  animation: prompt-pulse 0.25s ease-in-out infinite alternate;
}

.sos-lost {
  font-size: 24px;
  color: var(--arc-muted);
  font-family: monospace;
}

@keyframes prompt-pulse {
  0% { opacity: 0.7; transform: scale(1); }
  100% { opacity: 1; transform: scale(1.08); }
}
</style>
