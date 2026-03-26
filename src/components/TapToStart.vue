<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from '@/composables/useI18n'
import { ensureAudioReady } from '@/composables/audioContext'

const emit = defineEmits<{ done: [] }>()
const { t } = useI18n()
const tapped = ref(false)

async function handleTap() {
  if (tapped.value) return
  tapped.value = true
  await ensureAudioReady()
  emit('done')
}
</script>

<template>
  <div
    class="tap-screen"
    @click="handleTap"
    @touchend.prevent="handleTap"
  >
    <div class="crt-vignette" />
    <div class="crt-flicker" />
    <div class="scanlines" />

    <div class="tap-content">
      <div class="tap-cursor">█</div>
      <div class="tap-hint pulse">{{ t('화면을 터치하여 시작') }}</div>
    </div>
  </div>
</template>

<style scoped>
.tap-screen {
  position: fixed;
  inset: 0;
  background: var(--arc-bg, #0a0610);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 100;
  cursor: pointer;
  transition: opacity 0.5s ease;
}
.tap-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 20;
}
.tap-cursor {
  color: var(--px-green, #8cc890);
  font-family: 'Mulmaru', monospace;
  font-size: 24px;
  animation: blink 0.8s step-end infinite;
}

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

/* CRT effects */
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

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
@keyframes flicker {
  0% { opacity: 0.03; }
  50% { opacity: 0.06; }
  100% { opacity: 0.03; }
}
@keyframes hint-pulse {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
}
</style>
