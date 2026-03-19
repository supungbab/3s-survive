<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useAudio } from '@/composables/useAudio'

const { playTick } = useAudio()

const props = defineProps<{
  beatCount: number
  beatInterval: number
}>()

const emit = defineEmits<{
  tap: [correct: boolean]
}>()

const currentBeat = ref(0)
const beatStates = ref<('waiting' | 'active' | 'hit' | 'miss')[]>([])
const containerEl = ref<HTMLElement | null>(null)
let startTime = 0
const TOLERANCE = 250 // ±250ms
const FIRST_BEAT_DELAY = 500 // 첫 비트까지 대기
let resolved = false
let beatTimers: ReturnType<typeof setTimeout>[] = []

onMounted(() => {
  // 상태 초기화
  beatStates.value = Array(props.beatCount).fill('waiting')
  startTime = performance.now()

  // 비트 시각 효과 스케줄
  for (let i = 0; i < props.beatCount; i++) {
    const t = setTimeout(() => {
      if (resolved) return
      beatStates.value[i] = 'active'
      // 허용 시간 후 miss 처리
      const missTimer = setTimeout(() => {
        if (resolved) return
        if (beatStates.value[i] === 'active') {
          beatStates.value[i] = 'miss'
          resolved = true
          emit('tap', false)
        }
      }, TOLERANCE * 2)
      beatTimers.push(missTimer)
    }, FIRST_BEAT_DELAY + i * props.beatInterval)
    beatTimers.push(t)
  }

  // 터치 이벤트 바인딩
  if (containerEl.value) {
    const el = containerEl.value
    el.addEventListener('touchstart', onTouch, { passive: false })
    el.addEventListener('mousedown', onMouse)
  }
})

onUnmounted(() => {
  beatTimers.forEach(t => clearTimeout(t))
  if (containerEl.value) {
    containerEl.value.removeEventListener('touchstart', onTouch)
    containerEl.value.removeEventListener('mousedown', onMouse)
  }
})

function processHit() {
  if (resolved) return
  const now = performance.now()
  const expectedTime = startTime + FIRST_BEAT_DELAY + currentBeat.value * props.beatInterval
  const diff = Math.abs(now - expectedTime)

  if (diff <= TOLERANCE) {
    playTick()
    beatStates.value[currentBeat.value] = 'hit'
    currentBeat.value++
    if (currentBeat.value >= props.beatCount) {
      resolved = true
      emit('tap', true)
    }
  } else if (now > expectedTime + TOLERANCE) {
    // 너무 늦음
    resolved = true
    emit('tap', false)
  }
  // 너무 이르면 무시 (다음 비트 기다림)
}

function onTouch(e: TouchEvent) {
  e.stopPropagation()
  if (e.cancelable) e.preventDefault()
  processHit()
}

function onMouse(e: MouseEvent) {
  e.stopPropagation()
  processHit()
}
</script>

<template>
  <div ref="containerEl" class="rhythm-mission">
    <div class="beat-display">
      <div
        v-for="(state, i) in beatStates"
        :key="i"
        class="beat-dot"
        :class="state"
      >
        <div class="beat-ring" />
      </div>
    </div>
    <div class="rhythm-hint">박자에 맞춰 탭!</div>
  </div>
</template>

<style scoped>
.rhythm-mission {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  gap: 20px;
  touch-action: none;
  min-height: 180px;
}

.beat-display {
  display: flex;
  gap: 32px;
  align-items: center;
}

.beat-dot {
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.beat-ring {
  width: 40px;
  height: 40px;
  border: 3px solid var(--px-green-border);
  border-radius: 0;
  background: var(--px-green-bg);
  box-shadow:
    0 0 0 2px var(--px-green-frame),
    inset 1px 1px 0 var(--px-green-bevel-light),
    inset -1px -1px 0 var(--px-green-bevel-dark);
  transition: all 0.15s;
}

.beat-dot.active .beat-ring {
  border-color: var(--px-green-bright);
  background: rgba(140, 200, 144, 0.15);
  box-shadow:
    0 0 0 2px var(--px-green-frame),
    0 0 20px var(--px-green-glow-strong);
  animation: beat-pulse 0.3s ease-in-out infinite alternate;
}

.beat-dot.hit .beat-ring {
  border-color: var(--px-green-bright);
  background: rgba(140, 200, 144, 0.3);
  box-shadow:
    0 0 0 2px var(--px-green-frame),
    0 0 16px var(--px-green-glow);
}

.beat-dot.miss .beat-ring {
  border-color: var(--arc-danger);
  background: rgba(255, 59, 92, 0.15);
  box-shadow:
    0 0 0 2px #111311,
    0 0 12px var(--arc-danger-glow);
}

.rhythm-hint {
  font-size: 16px;
  color: var(--arc-muted);
}

@keyframes beat-pulse {
  from {
    transform: scale(1);
    box-shadow: 0 0 0 2px var(--px-green-frame), 0 0 12px var(--px-green-glow);
  }
  to {
    transform: scale(1.15);
    box-shadow: 0 0 0 2px var(--px-green-frame), 0 0 28px var(--px-green-glow-strong);
  }
}
</style>
