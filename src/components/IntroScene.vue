<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from '@/composables/useI18n'
import { getAudioContext } from '@/composables/audioContext'
import { useSettings } from '@/composables/useSettings'

const emit = defineEmits<{ done: [] }>()
const { t } = useI18n()
const { soundEnabled, volume } = useSettings()

const lines = ref<{ text: string; class?: string }[]>([])
const showMessage = ref(false)
const messageLines = ref<string[]>([])
const showCursor = ref(true)
const phase = ref<'boot' | 'message' | 'fade'>('boot')

/** CRT 비프 — 낮은 단음 "띠" */
function beep() {
  if (!soundEnabled.value) return
  try {
    const ctx = getAudioContext()
    if (ctx.state === 'suspended') return
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'square'
    osc.frequency.value = 440
    gain.gain.value = 0.09 * volume.value
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + 0.06)
    osc.onended = () => { osc.disconnect(); gain.disconnect() }
  } catch { /* ignore */ }
}

function sleep(ms: number) {
  return new Promise<void>(r => setTimeout(r, ms))
}

async function typeBootLine(label: string, dots: number, result: string, cls?: string) {
  lines.value.push({ text: '> ' + label, class: 'dim' })
  const idx = lines.value.length - 1
  beep(); await sleep(500)

  for (let i = 0; i < dots; i++) {
    lines.value[idx] = { ...lines.value[idx], text: lines.value[idx].text + '.' }
    beep(); await sleep(80)
  }

  beep(); await sleep(500)

  lines.value[idx] = { text: lines.value[idx].text + result, class: cls }
  beep(); await sleep(150)
}

async function runBootSequence() {
  await sleep(600)

  // 부팅 라인 — 결과 나올 때마다 "띠"
  await typeBootLine(t('시스템 부팅'), 20, 'OK', 'dim')
  await sleep(500)
  await typeBootLine(t('신호 상태'), 20, t('유실'), 'danger')
  await sleep(500)
  await typeBootLine(t('거점 #17'), 20, t('접속'), 'dim')
  await sleep(500)
  await typeBootLine(t('오퍼레이터 단말'), 20, t('활성'), 'green')
  await sleep(500)
  await typeBootLine(t('수신 메시지'), 20, t('1건'), 'highlight')
  await sleep(500)

  // transition to message phase
  phase.value = 'message'
  showMessage.value = true

  const msg = [
    t('이전 오퍼레이터의 기록이 남아 있습니다.'),
    '',
    t('"3초. 그게 전부야.'),
    t(' 화면에 뜨면 바로 해. 생각하지 마.'),
    t(' 네가 늦으면 누군가 죽어.'),
    t(' ...나처럼 되지 마."'),
    '',
    t('— 기록 종료 —'),
  ]

  for (const line of msg) {
    messageLines.value.push(line)
    beep(); await sleep(line === '' ? 200 : 350)
  }

  await sleep(800)
  showCursor.value = false
}

function finish() {
  if (phase.value === 'fade') return
  phase.value = 'fade'
  localStorage.setItem('3s_intro_seen', '1')
  emit('done')
}

onMounted(async () => {
  await runBootSequence()
})

function msgLineClass(line: string) {
  const isQuote = line.startsWith('"') || line.startsWith('\u201C') || line.startsWith(' ')
  return {
    'msg-quote': isQuote,
    'msg-end': line.startsWith('—'),
    'msg-empty': line === '',
  }
}

function handleTap() {
  if (phase.value === 'boot') return
  if (phase.value === 'fade') return
  finish()
}
</script>

<template>
  <div
    class="intro-screen"
    :class="{ 'fade-out': phase === 'fade' }"
    @click="handleTap"
    @touchend.prevent="handleTap"
  >
    <!-- CRT effects -->
    <div class="crt-vignette" />
    <div class="crt-flicker" />
    <div class="scanlines" />

    <div class="intro-terminal">
      <!-- Boot lines -->
      <div class="boot-lines">
        <div
          v-for="(line, i) in lines"
          :key="i"
          class="term-line"
          :class="line.class"
        >{{ line.text }}</div>
      </div>

      <!-- Operator message box -->
      <Transition name="msg">
        <div v-if="showMessage" class="msg-box">
          <div
            v-for="(line, i) in messageLines"
            :key="i"
            class="msg-line"
            :class="msgLineClass(line)"
          >{{ line }}</div>
          <span v-if="showCursor" class="blink-cursor">█</span>
        </div>
      </Transition>
    </div>

    <!-- Tap to start hint -->
    <Transition name="fade">
      <div v-if="phase === 'message' && !showCursor" class="tap-hint pulse">
        {{ t('화면을 터치하여 시작') }}
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.intro-screen {
  position: fixed;
  inset: 0;
  background: var(--arc-bg, #0a0610);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 100;
  padding: 24px;
  transition: opacity 0.5s ease;
  cursor: pointer;
  overflow: hidden;
}

.intro-screen.fade-out {
  opacity: 0;
}

/* CRT effects (reuse from MainScreen) */
.crt-vignette {
  position: fixed;
  inset: 0;
  background: radial-gradient(ellipse at center, transparent 50%, rgba(0, 0, 0, 0.8) 100%);
  pointer-events: none;
  z-index: 10;
}
.crt-flicker {
  position: fixed;
  inset: 0;
  background: transparent;
  opacity: 0.03;
  animation: flicker 0.12s infinite;
  pointer-events: none;
  z-index: 10;
}
.scanlines {
  position: fixed;
  inset: 0;
  background: repeating-linear-gradient(
    to bottom,
    transparent 0px,
    transparent 2px,
    rgba(0, 0, 0, 0.15) 2px,
    rgba(0, 0, 0, 0.15) 4px
  );
  pointer-events: none;
  z-index: 10;
}

@keyframes flicker {
  0% { opacity: 0.03; }
  50% { opacity: 0.06; }
  100% { opacity: 0.03; }
}

/* Terminal content */
.intro-terminal {
  max-width: 440px;
  width: 100%;
  font-family: 'Mulmaru', monospace;
  font-size: 14px;
  line-height: 1.7;
  position: relative;
  z-index: 20;
}

.term-line {
  color: var(--px-green-dim, #5a7a5c);
  white-space: pre;
  overflow: hidden;
}
.term-line.dim {
  color: var(--px-green-dim, #5a7a5c);
}
.term-line.green {
  color: var(--px-green, #8cc890);
  text-shadow: 0 0 8px var(--px-green-glow, rgba(140, 200, 144, 0.4));
}
.term-line.danger {
  color: var(--arc-danger, #ff3b5c);
  text-shadow: 0 0 8px var(--arc-danger-glow, rgba(255, 59, 92, 0.4));
}
.term-line.highlight {
  color: var(--arc-amber, #ffb800);
  text-shadow: 0 0 10px rgba(255, 184, 0, 0.5);
  margin-top: 4px;
}

/* Message box */
.msg-box {
  margin-top: 16px;
  padding: 16px;
  border: 1px solid var(--px-green-border, #4a5648);
  background: rgba(12, 20, 12, 0.8);
  position: relative;
}
.msg-line {
  color: var(--px-green-dim, #5a7a5c);
  font-size: 13px;
  line-height: 1.8;
  min-height: 1em;
}
.msg-line.msg-quote {
  color: var(--px-green, #8cc890);
  text-shadow: 0 0 6px var(--px-green-glow, rgba(140, 200, 144, 0.4));
}
.msg-line.msg-end {
  color: var(--px-green-dim, #5a7a5c);
  margin-top: 4px;
  font-size: 12px;
}
.msg-line.msg-empty {
  height: 8px;
}

.blink-cursor {
  color: var(--px-green, #8cc890);
  animation: blink 0.8s step-end infinite;
  font-size: 13px;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

/* Tap hint */
.tap-hint {
  position: fixed;
  bottom: max(48px, env(safe-area-inset-bottom, 24px));
  left: 50%;
  transform: translateX(-50%);
  color: var(--px-green-dim, #5a7a5c);
  font-family: 'Mulmaru', monospace;
  font-size: 13px;
  letter-spacing: 1px;
  z-index: 20;
}
.tap-hint.pulse {
  animation: hint-pulse 2s ease-in-out infinite;
}
@keyframes hint-pulse {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
}

/* Transitions */
.msg-enter-active { transition: opacity 0.3s ease; }
.msg-enter-from { opacity: 0; }
.fade-enter-active { transition: opacity 0.5s ease 0.3s; }
.fade-enter-from { opacity: 0; }
</style>
