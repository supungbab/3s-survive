<script setup lang="ts">
import { usePressable } from '@/composables/usePressable'

defineProps<{
  score: number
  bestScore: number
}>()

const emit = defineEmits<{
  restart: []
  home: []
}>()

const restart = usePressable(() => emit('restart'))
const home = usePressable(() => emit('home'))
</script>

<template>
  <div class="result-overlay" :class="{ show: true }">
    <div class="result-card fade-in">
      <!-- Scanline texture on card -->
      <div class="card-scanlines" />

      <!-- Header -->
      <div class="result-header">
        <svg class="pixel-skull" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="0" width="8" height="2" fill="currentColor"/><rect x="6" y="2" width="12" height="2" fill="currentColor"/><rect x="4" y="4" width="7" height="4" fill="currentColor"/><rect x="13" y="4" width="7" height="4" fill="currentColor"/><rect x="4" y="8" width="4" height="2" fill="currentColor"/><rect x="16" y="8" width="4" height="2" fill="currentColor"/><rect x="4" y="10" width="7" height="2" fill="currentColor"/><rect x="13" y="10" width="7" height="2" fill="currentColor"/><rect x="4" y="12" width="7" height="6" fill="currentColor"/><rect x="13" y="12" width="7" height="6" fill="currentColor"/><rect x="4" y="18" width="16" height="2" fill="currentColor"/><rect x="2" y="20" width="20" height="4" fill="currentColor"/></svg>
        <div class="result-label">GAME OVER</div>
      </div>

      <!-- Pixel divider -->
      <div class="pixel-divider" />

      <!-- Score section -->
      <div class="result-score-section">
        <div class="result-score">{{ score }}</div>
        <div class="result-best">
          BEST <span class="best-value">{{ bestScore }}</span>
        </div>
        <div v-if="score >= bestScore && score > 0" class="new-record">
          ★ NEW RECORD ★
        </div>
      </div>

      <!-- Pixel divider -->
      <div class="pixel-divider" />

      <!-- Actions -->
      <div class="result-actions">
        <button class="arc-btn arc-btn--primary" @click="restart.onClick">
          <span class="btn-icon">▶</span> 다시 하기
        </button>
        <button class="arc-btn arc-btn--ghost" @click="home.onClick">
          <span class="btn-icon">◀</span> 홈으로
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.result-overlay {
  position: fixed;
  inset: 0;
  background: rgba(4, 2, 6, 0.94);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  padding: 24px;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s;
}

.result-overlay.show {
  pointer-events: all;
  opacity: 1;
}

/* ─── Card ─── */
.result-card {
  background: #0a0a0c;
  border: 3px solid #3a3a38;
  border-radius: 0;
  padding: 0;
  text-align: center;
  width: 100%;
  max-width: 300px;
  position: relative;
  overflow: hidden;
  box-shadow:
    0 0 0 3px #060608,
    inset 1px 1px 0 #4a4a48,
    inset -1px -1px 0 #1a1a1c,
    0 0 80px rgba(0, 0, 0, 0.7);
}

.card-scanlines {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    to bottom,
    transparent 0px,
    transparent 2px,
    rgba(0, 0, 0, 0.15) 2px,
    rgba(0, 0, 0, 0.15) 4px
  );
  pointer-events: none;
  z-index: 1;
}

/* ─── Header ─── */
.result-header {
  padding: 24px 24px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

.pixel-skull {
  display: block;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  color: var(--arc-danger);
}

.result-label {
  font-size: 18px;
  font-weight: 900;
  color: var(--arc-danger);
  letter-spacing: 6px;
  text-shadow: 0 0 16px rgba(255, 59, 92, 0.4);
  position: relative;
  z-index: 2;
}

/* ─── Pixel Divider ─── */
.pixel-divider {
  height: 2px;
  margin: 0 16px;
  background:
    repeating-linear-gradient(
      to right,
      #3a3a38 0px,
      #3a3a38 4px,
      transparent 4px,
      transparent 8px
    );
  opacity: 0.6;
}

/* ─── Score Section ─── */
.result-score-section {
  padding: 20px 24px;
  position: relative;
  z-index: 2;
}

.result-score {
  font-size: 80px;
  font-weight: 900;
  color: var(--px-green-bright);
  line-height: 1;
  margin-bottom: 8px;
  text-shadow:
    0 0 24px rgba(140, 200, 144, 0.3),
    0 0 60px rgba(140, 200, 144, 0.12);
}

.result-best {
  font-size: 13px;
  color: #606060;
  letter-spacing: 2px;
}

.best-value {
  color: #8a8a80;
  font-weight: 700;
}

.new-record {
  font-size: 16px;
  font-weight: 900;
  color: var(--px-green);
  letter-spacing: 3px;
  text-shadow:
    0 0 12px rgba(140, 200, 144, 0.3),
    0 0 30px rgba(140, 200, 144, 0.15);
  margin-top: 12px;
  animation: pulse 0.6s ease-in-out infinite;
}

/* ─── Actions ─── */
.result-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px 20px 20px;
  position: relative;
  z-index: 2;
}

.arc-btn {
  padding: 12px 20px;
  font-size: 16px;
  font-weight: 700;
  font-family: 'Galmuri11', monospace;
  cursor: pointer;
  border-radius: 0;
  transition: background 0.15s, box-shadow 0.15s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.arc-btn:active {
  transform: scale(0.97);
}

.btn-icon {
  font-size: 12px;
}

.arc-btn--primary {
  background: var(--px-green-bg);
  color: var(--px-green);
  border: 2px solid #4a5648;
  box-shadow:
    inset 1px 1px 0 #5a6858,
    inset -1px -1px 0 #2a322a;
}

.arc-btn--primary:hover {
  background: var(--px-green-bg-hover);
  border-color: var(--px-green-border-hover);
  color: var(--px-green-bright);
  box-shadow:
    0 0 12px rgba(140, 200, 144, 0.08),
    inset 1px 1px 0 #6a7a66,
    inset -1px -1px 0 #3a4a3a;
}

.arc-btn--ghost {
  background: #0c0c0e;
  color: var(--px-neutral-dim);
  border: 2px solid #333330;
  box-shadow:
    inset 1px 1px 0 #2a2a28,
    inset -1px -1px 0 #141416;
}

.arc-btn--ghost:hover {
  color: var(--px-neutral);
  border-color: #4a4a46;
  background: #141416;
}
</style>
