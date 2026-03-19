<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useAudio } from '@/composables/useAudio'

const { playTick } = useAudio()

const props = defineProps<{
  simonSequence: number[]
  simonButtons: number
  currentStep: number
}>()

const emit = defineEmits<{
  tap: [correct: boolean]
  ready: []
}>()

const playingBack = ref(true)
const highlightedBtn = ref(-1)
const timers: ReturnType<typeof setTimeout>[] = []

const BUTTON_COLORS = ['var(--color-red)', 'var(--color-blue)', 'var(--color-yellow)', 'var(--color-green)']
const BUTTON_GLOWS = ['rgba(255,59,92,0.4)', 'rgba(68,138,255,0.4)', 'rgba(255,214,0,0.4)', 'rgba(0,230,118,0.4)']

onMounted(() => {
  // 시퀀스 재생: 200ms 하이라이트 + 150ms 갭
  const HIGHLIGHT_MS = 250
  const GAP_MS = 150
  const STEP_MS = HIGHLIGHT_MS + GAP_MS

  props.simonSequence.forEach((btnIdx, i) => {
    // 하이라이트 시작
    const showTimer = setTimeout(() => {
      highlightedBtn.value = btnIdx
    }, i * STEP_MS)
    timers.push(showTimer)

    // 하이라이트 끝
    const hideTimer = setTimeout(() => {
      highlightedBtn.value = -1
    }, i * STEP_MS + HIGHLIGHT_MS)
    timers.push(hideTimer)
  })

  // 재생 완료 → 입력 가능
  const readyTimer = setTimeout(() => {
    playingBack.value = false
    emit('ready')
  }, props.simonSequence.length * STEP_MS)
  timers.push(readyTimer)
})

onUnmounted(() => {
  timers.forEach(t => clearTimeout(t))
})

function handleBtnTap(index: number) {
  if (playingBack.value) return
  playTick()
  emit('tap', index === props.simonSequence[props.currentStep])
}
</script>

<template>
  <div class="simon-mission">
    <div class="simon-status">
      {{ playingBack ? '보는 중...' : '따라해!' }}
    </div>
    <div class="simon-grid">
      <button
        v-for="i in simonButtons"
        :key="i"
        class="simon-btn"
        :class="{
          highlighted: highlightedBtn === i - 1,
          interactive: !playingBack,
          done: !playingBack && (i - 1) < currentStep,
        }"
        :style="{
          '--btn-color': BUTTON_COLORS[i - 1],
          '--btn-glow': BUTTON_GLOWS[i - 1],
        }"
        @pointerdown="handleBtnTap(i - 1)"
      />
    </div>
  </div>
</template>

<style scoped>
.simon-mission {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  gap: 16px;
}

.simon-status {
  font-size: 18px;
  font-weight: 700;
  color: var(--arc-muted);
}

.simon-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.simon-btn {
  width: 80px;
  height: 80px;
  background: var(--px-green-bg);
  border: 3px solid var(--btn-color);
  border-radius: 0;
  cursor: pointer;
  transition: all 0.1s;
  opacity: 0.4;
  box-shadow:
    0 0 0 2px #111311,
    inset 1px 1px 0 rgba(255, 255, 255, 0.05),
    inset -1px -1px 0 rgba(0, 0, 0, 0.2);
}

.simon-btn.highlighted {
  opacity: 1;
  background: color-mix(in srgb, var(--btn-color) 25%, transparent);
  box-shadow:
    0 0 0 2px #111311,
    0 0 24px var(--btn-glow),
    inset 0 0 16px var(--btn-glow);
}

.simon-btn.interactive {
  opacity: 0.7;
}

.simon-btn.interactive:active {
  opacity: 1;
  transform: scale(0.9);
  background: color-mix(in srgb, var(--btn-color) 25%, transparent);
  box-shadow:
    0 0 0 2px #111311,
    0 0 16px var(--btn-glow);
}

.simon-btn.done {
  opacity: 0.3;
}
</style>
