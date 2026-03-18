<script setup lang="ts">
import { usePressable } from '@/composables/usePressable'
import { useSettings } from '@/composables/useSettings'
import { useAudio } from '@/composables/useAudio'
import { ref, onMounted } from 'vue'

defineProps<{
  bestScore: number
}>()

const emit = defineEmits<{
  start: []
}>()

const start = usePressable(() => emit('start'))
const mounted = ref(false)
const showOptions = ref(false)
const showRankingToast = ref(false)

const { soundEnabled, volume } = useSettings()
const { playTick } = useAudio()

function openOptions(e: Event) {
  e.stopPropagation()
  showOptions.value = true
}

function closeOptions() {
  showOptions.value = false
}

function openRanking(e: Event) {
  e.stopPropagation()
  showRankingToast.value = true
  setTimeout(() => { showRankingToast.value = false }, 1500)
}

function toggleSound(e: Event) {
  e.stopPropagation()
  soundEnabled.value = !soundEnabled.value
  if (soundEnabled.value) {
    playTick()
  }
}

function onVolumeInput(e: Event) {
  const target = e.target as HTMLInputElement
  volume.value = Number(target.value)
}

function testSound(e: Event) {
  e.stopPropagation()
  playTick()
}

onMounted(() => {
  requestAnimationFrame(() => {
    mounted.value = true
  })
})
</script>

<template>
  <div class="arcade-screen" :class="{ 'is-ready': mounted }">
    <!-- CRT effects layer -->
    <div class="crt-vignette" />
    <div class="crt-flicker" />
    <div class="crt-noise" />
    <div class="scanlines" />

    <!-- Stars -->
    <div class="stars">
      <span v-for="i in 30" :key="i" class="star" :style="{
        left: `${(i * 37 + i * i * 3) % 100}%`,
        top: `${(i * 23 + i * 7) % 55}%`,
        animationDelay: `${(i * 0.7) % 4}s`,
        animationDuration: `${1.5 + (i % 3) * 0.8}s`
      }" />
    </div>

    <!-- 뒤: 원경 건물 (z-index 1) -->
    <div class="layer-buildings">
      <div class="skyline__layer skyline__layer--back">
        <div class="building" style="--w: 60px; --h: 160px; --x: -2%" />
        <div class="building" style="--w: 48px; --h: 220px; --x: 8%" />
        <div class="building" style="--w: 75px; --h: 130px; --x: 17%" />
        <div class="building" style="--w: 40px; --h: 260px; --x: 27%" />
        <div class="building" style="--w: 85px; --h: 150px; --x: 35%" />
        <div class="building" style="--w: 55px; --h: 200px; --x: 46%" />
        <div class="building" style="--w: 44px; --h: 280px; --x: 55%" />
        <div class="building" style="--w: 70px; --h: 140px; --x: 63%" />
        <div class="building" style="--w: 50px; --h: 230px; --x: 72%" />
        <div class="building" style="--w: 80px; --h: 120px; --x: 80%" />
        <div class="building" style="--w: 45px; --h: 190px; --x: 89%" />
        <div class="building" style="--w: 65px; --h: 160px; --x: 96%" />
      </div>
      <div class="skyline__layer skyline__layer--front">
        <div class="building" style="--w: 72px; --h: 120px; --x: -3%" />
        <div class="building" style="--w: 55px; --h: 180px; --x: 6%" />
        <div class="building" style="--w: 90px; --h: 95px; --x: 14%" />
        <div class="building" style="--w: 44px; --h: 210px; --x: 23%" />
        <div class="building" style="--w: 65px; --h: 130px; --x: 32%" />
        <div class="building" style="--w: 78px; --h: 165px; --x: 41%" />
        <div class="building" style="--w: 48px; --h: 200px; --x: 51%" />
        <div class="building" style="--w: 60px; --h: 105px; --x: 59%" />
        <div class="building" style="--w: 85px; --h: 155px; --x: 67%" />
        <div class="building" style="--w: 40px; --h: 225px; --x: 76%" />
        <div class="building" style="--w: 70px; --h: 130px; --x: 84%" />
        <div class="building" style="--w: 55px; --h: 175px; --x: 92%" />
      </div>
    </div>

    <!-- 앞: 땅 (z-index 3, 건물 하단 가림) -->
    <div class="layer-ground" />

    <!-- Floating embers rising from horizon -->
    <div class="embers">
      <span v-for="i in 12" :key="i" class="ember" :style="{
        left: `${(i * 31 + i * 5) % 90 + 5}%`,
        animationDelay: `${(i * 1.3) % 6}s`,
        animationDuration: `${3 + (i % 4) * 1.5}s`,
      }" />
    </div>

    <!-- Main content -->
    <div class="arcade-content">
      <!-- Title block -->
      <div class="title-block">
        <div class="title-big">
          <span class="title-num">3</span><span class="title-unit">초</span>
        </div>
        <div class="title-sub">생존</div>
        <div class="title-tagline">미션을 3초 안에 클리어하라!</div>
      </div>

      <!-- Button group -->
      <div class="btn-group">
      <button class="arcade-btn arcade-btn--primary" @click="start.onClick">
        <span class="arcade-btn__icon">▶</span>
        <span class="arcade-btn__text">
          <span class="arcade-btn__label">게임 시작</span>
          <span class="arcade-btn__sub">START GAME</span>
        </span>
      </button>

      <div class="sub-buttons">
        <button class="arcade-btn arcade-btn--sub" @click="openRanking">
          <span class="arcade-btn__icon-sm">🏆</span>
          <span class="arcade-btn__text-sm">
            <span class="arcade-btn__label-sm">랭킹</span>
            <span class="arcade-btn__sub-sm">RANKING</span>
          </span>
        </button>
        <button class="arcade-btn arcade-btn--sub" @click="openOptions">
          <span class="arcade-btn__icon-sm">⚙</span>
          <span class="arcade-btn__text-sm">
            <span class="arcade-btn__label-sm">옵션</span>
            <span class="arcade-btn__sub-sm">OPTIONS</span>
          </span>
        </button>
      </div>
      </div>

      <!-- Best score -->
      <div v-if="bestScore > 0" class="score-badge">
        <span class="score-badge__label">최고 점수</span>
        <span class="score-badge__value">{{ bestScore }}<span class="score-badge__unit">점</span></span>
      </div>

      <div v-else class="first-play">첫 도전을 시작하세요!</div>
    </div>

    <!-- Ranking toast -->
    <Transition name="toast">
      <div v-if="showRankingToast" class="toast">
        준비 중입니다
      </div>
    </Transition>

    <!-- Options modal -->
    <Transition name="modal">
      <div v-if="showOptions" class="modal-overlay" @click.self="closeOptions">
        <div class="modal-card">
          <div class="modal-header">
            <span class="modal-title">옵션</span>
            <button class="modal-close" @click="closeOptions">✕</button>
          </div>

          <div class="modal-body">
            <!-- Sound toggle -->
            <div class="option-row">
              <span class="option-label">효과음</span>
              <button
                class="toggle-btn"
                :class="{ active: soundEnabled }"
                @click="toggleSound"
              >
                <span class="toggle-track">
                  <span class="toggle-thumb" />
                </span>
                <span class="toggle-text">{{ soundEnabled ? 'ON' : 'OFF' }}</span>
              </button>
            </div>

            <!-- Volume slider -->
            <div class="option-row" :class="{ disabled: !soundEnabled }">
              <span class="option-label">볼륨</span>
              <div class="volume-control">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  :value="volume"
                  :disabled="!soundEnabled"
                  class="volume-slider"
                  @input="onVolumeInput"
                />
                <span class="volume-value">{{ Math.round(volume * 100) }}%</span>
              </div>
            </div>

            <!-- Test sound -->
            <button
              class="test-sound-btn"
              :disabled="!soundEnabled"
              @click="testSound"
            >
              🔊 소리 테스트
            </button>
          </div>
        </div>
      </div>
    </Transition>


    <!-- Version -->
    <div class="version">ver 1.0</div>
  </div>
</template>

<style scoped>
/* ─── Screen ─── */
.arcade-screen {
  position: relative;
  height: 100dvh;
  background: #0a0610;
  background-image:
    radial-gradient(ellipse at 50% 100%, rgba(255, 80, 20, 0.18) 0%, transparent 50%),
    radial-gradient(ellipse at 30% 90%, rgba(255, 40, 10, 0.14) 0%, transparent 45%),
    radial-gradient(ellipse at 70% 85%, rgba(255, 100, 30, 0.12) 0%, transparent 40%),
    radial-gradient(ellipse at 50% 60%, rgba(180, 40, 20, 0.08) 0%, transparent 50%),
    radial-gradient(ellipse at 30% 20%, rgba(80, 20, 60, 0.15) 0%, transparent 50%),
    radial-gradient(ellipse at 70% 15%, rgba(60, 10, 50, 0.12) 0%, transparent 40%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  font-family: 'Galmuri11', monospace;
  -webkit-user-select: none;
  user-select: none;
}

/* ─── CRT Vignette ─── */
.crt-vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse at 50% 50%,
    transparent 45%,
    rgba(0, 0, 0, 0.5) 70%,
    rgba(0, 0, 0, 0.85) 100%
  );
  pointer-events: none;
  z-index: 11;
}

/* ─── CRT Flicker ─── */
.crt-flicker {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 12;
  animation: crt-flicker 0.12s infinite;
  opacity: 0;
}

@keyframes crt-flicker {
  0% { opacity: 0; }
  4% { opacity: 0.035; background: rgba(255, 255, 255, 0.03); }
  8% { opacity: 0; }
  50% { opacity: 0; }
  52% { opacity: 0.02; background: rgba(255, 200, 180, 0.02); }
  54% { opacity: 0; }
  90% { opacity: 0; }
  92% { opacity: 0.025; background: rgba(200, 255, 200, 0.02); }
  94% { opacity: 0; }
}

/* ─── CRT Static Noise ─── */
.crt-noise {
  position: absolute;
  inset: -50%;
  width: 200%;
  height: 200%;
  background-image:
    url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 9;
  animation: noise-drift 0.5s steps(3) infinite;
  opacity: 0.7;
}

@keyframes noise-drift {
  0% { transform: translate(0, 0); }
  33% { transform: translate(-2%, -3%); }
  66% { transform: translate(1%, 2%); }
  100% { transform: translate(-1%, -1%); }
}

/* ─── Scanlines ─── */
.scanlines {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    to bottom,
    transparent 0px,
    transparent 2px,
    rgba(0, 0, 0, 0.22) 2px,
    rgba(0, 0, 0, 0.22) 4px
  );
  pointer-events: none;
  z-index: 13;
}

/* ─── Stars (dimmer, survival sky) ─── */
.stars {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.star {
  position: absolute;
  width: 2px;
  height: 2px;
  background: var(--arc-text);
  border-radius: 50%;
  opacity: 0;
  animation: twinkle ease-in-out infinite;
}

@keyframes twinkle {
  0%, 100% { opacity: 0.02; }
  50% { opacity: 0.25; }
}

/* ─── Layer: Buildings (뒤, 원경) ─── */
.layer-buildings {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  z-index: 1;
  pointer-events: none;
}

.skyline__layer {
  position: absolute;
  bottom: 50vh;
  left: 0;
  right: 0;
  height: 100%;
}

.building {
  position: absolute;
  bottom: 0;
  left: var(--x);
  width: var(--w);
  height: var(--h);
  border-radius: 2px 2px 0 0;
}

.skyline__layer--back .building {
  background: #1a0c0e;
  opacity: 0.8;
  box-shadow: 0 -8px 20px rgba(255, 60, 20, 0.08);
}

.skyline__layer--front .building {
  background: #0a0508;
  box-shadow: 0 -6px 16px rgba(255, 50, 15, 0.06);
}

/* Window lights — some reddish (fire reflections) */
.skyline__layer--front .building::before {
  content: '';
  position: absolute;
  inset: 6px 4px 8px;
  background-image:
    radial-gradient(circle, rgba(255, 140, 40, 0.6) 1px, transparent 1px),
    radial-gradient(circle, rgba(255, 60, 20, 0.55) 1px, transparent 1px);
  background-size: 8px 10px, 12px 14px;
  background-position: 0 0, 4px 5px;
  opacity: 0.45;
}

/* Subtle red top-glow on some buildings */
.skyline__layer--front .building::after {
  content: '';
  position: absolute;
  top: -4px;
  left: 20%;
  right: 20%;
  height: 12px;
  background: radial-gradient(ellipse, rgba(255, 60, 20, 0.5) 0%, transparent 70%);
  opacity: 0;
  animation: building-glow 5s ease-in-out infinite;
}

.skyline__layer--front .building:nth-child(2n)::after {
  opacity: 1;
  animation-delay: -2s;
}

.skyline__layer--front .building:nth-child(3n)::after {
  opacity: 1;
  animation-delay: -4s;
}

@keyframes building-glow {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.7; }
}

/* ─── Layer: Ground (앞, 근경) ─── */
.layer-ground {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50vh;
  z-index: 3;
  pointer-events: none;
  background:
    /* 거친 흙 노이즈 텍스처 */
    url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.07'/%3E%3C/svg%3E"),
    /* 흙 색조 그라데이션 — 화재 반사 */
    linear-gradient(
      to bottom,
      #1e120e 0%,
      #18100a 8%,
      #140c08 20%,
      #0e0a07 45%,
      #0a0806 100%
    );
}

/* Horizon fire glow at top of ground */
.layer-ground::before {
  content: '';
  position: absolute;
  top: -40px;
  left: 0;
  right: 0;
  height: 100px;
  background:
    radial-gradient(ellipse at 25% 80%, rgba(255, 80, 20, 0.3) 0%, transparent 50%),
    radial-gradient(ellipse at 55% 80%, rgba(255, 50, 10, 0.25) 0%, transparent 45%),
    radial-gradient(ellipse at 80% 80%, rgba(255, 100, 30, 0.22) 0%, transparent 40%),
    radial-gradient(ellipse at 40% 90%, rgba(255, 40, 5, 0.15) 0%, transparent 55%);
  animation: fire-glow 4s ease-in-out infinite alternate;
}

/* 지표면 경계선 — 흙+화염 경계 */
.layer-ground::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 20px;
  background:
    linear-gradient(
      to bottom,
      rgba(80, 35, 15, 0.6) 0%,
      rgba(50, 22, 10, 0.35) 40%,
      transparent 100%
    ),
    linear-gradient(
      to right,
      transparent 0%,
      rgba(255, 80, 30, 0.12) 20%,
      rgba(255, 60, 20, 0.18) 50%,
      rgba(255, 80, 30, 0.12) 80%,
      transparent 100%
    );
}

@keyframes fire-glow {
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.7; }
}

/* ─── Embers ─── */
.embers {
  position: absolute;
  inset: 0;
  z-index: 4;
  pointer-events: none;
}

.ember {
  position: absolute;
  bottom: 50vh;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: #ff6b2b;
  box-shadow: 0 0 6px rgba(255, 107, 43, 0.6);
  opacity: 0;
  animation: ember-rise ease-out infinite;
}

@keyframes ember-rise {
  0% {
    opacity: 0;
    transform: translateY(0) translateX(0) scale(1);
  }
  10% {
    opacity: 0.8;
  }
  60% {
    opacity: 0.4;
  }
  100% {
    opacity: 0;
    transform: translateY(-200px) translateX(20px) scale(0.3);
  }
}

/* ─── Content ─── */
.arcade-content {
  position: relative;
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 0 24px;
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.is-ready .arcade-content {
  opacity: 1;
  transform: translateY(0);
}

/* ─── Title ─── */
.title-block {
  text-align: center;
  margin-bottom: 4px;
}

.title-big {
  line-height: 1;
  margin-bottom: 4px;
}

.title-num {
  font-size: 96px;
  font-weight: 900;
  color: var(--arc-green);
  text-shadow:
    0 0 20px var(--arc-green-glow),
    0 0 60px var(--arc-green-glow),
    0 0 120px rgba(57, 255, 20, 0.15);
  letter-spacing: -4px;
  display: inline-block;
  animation: num-breathe 3s ease-in-out infinite;
}

@keyframes num-breathe {
  0%, 100% {
    text-shadow:
      0 0 20px var(--arc-green-glow),
      0 0 60px var(--arc-green-glow),
      0 0 120px rgba(57, 255, 20, 0.15);
  }
  50% {
    text-shadow:
      0 0 30px var(--arc-green-glow),
      0 0 80px var(--arc-green-glow),
      0 0 160px rgba(57, 255, 20, 0.25);
  }
}

.title-unit {
  font-size: 48px;
  font-weight: 900;
  color: var(--arc-text);
  margin-left: 2px;
}

.title-sub {
  font-size: 36px;
  font-weight: 700;
  color: var(--arc-text);
  letter-spacing: 8px;
  margin-top: 4px;
}

.title-tagline {
  font-size: 13px;
  color: var(--arc-muted);
  margin-top: 12px;
  letter-spacing: 1px;
}

/* ─── Arcade Buttons ─── */
/* ─── Button Group ─── */
.btn-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 260px;
}

.arcade-btn {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 32px;
  border: 2px solid var(--arc-green);
  border-radius: 4px;
  background: rgba(57, 255, 20, 0.06);
  color: var(--arc-green);
  font-family: 'Galmuri11', monospace;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;
  box-shadow:
    0 0 12px rgba(57, 255, 20, 0.15),
    inset 0 0 12px rgba(57, 255, 20, 0.05);
}

.arcade-btn:hover {
  background: rgba(57, 255, 20, 0.12);
  box-shadow:
    0 0 24px rgba(57, 255, 20, 0.25),
    inset 0 0 20px rgba(57, 255, 20, 0.08);
  transform: scale(1.02);
}

.arcade-btn:active {
  transform: scale(0.97);
  background: rgba(57, 255, 20, 0.2);
}

.arcade-btn--primary {
  width: 100%;
  justify-content: center;
  animation: btn-pulse 2.5s ease-in-out infinite;
}

@keyframes btn-pulse {
  0%, 100% {
    box-shadow:
      0 0 12px rgba(57, 255, 20, 0.15),
      inset 0 0 12px rgba(57, 255, 20, 0.05);
  }
  50% {
    box-shadow:
      0 0 20px rgba(57, 255, 20, 0.3),
      inset 0 0 16px rgba(57, 255, 20, 0.08);
  }
}

.arcade-btn__icon {
  font-size: 22px;
  line-height: 1;
}

.arcade-btn__text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
}

.arcade-btn__label {
  font-size: 20px;
  font-weight: 700;
}

.arcade-btn__sub {
  font-size: 10px;
  color: var(--arc-green-dim);
  letter-spacing: 2px;
}

/* ─── Sub Buttons ─── */
.sub-buttons {
  display: flex;
  gap: 12px;
  width: 100%;
}

.arcade-btn--sub {
  flex: 1;
  justify-content: center;
  padding: 10px 20px;
  gap: 8px;
  border-color: var(--arc-surface-light);
  background: rgba(255, 255, 255, 0.02);
  color: var(--arc-muted);
  box-shadow: none;
  animation: none;
}

.arcade-btn--sub:hover {
  border-color: var(--arc-green);
  color: var(--arc-green);
  background: rgba(57, 255, 20, 0.06);
  box-shadow: 0 0 12px rgba(57, 255, 20, 0.1);
}

.arcade-btn__icon-sm {
  font-size: 20px;
  line-height: 1;
}

.arcade-btn__text-sm {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1px;
}

.arcade-btn__label-sm {
  font-size: 14px;
  font-weight: 700;
}

.arcade-btn__sub-sm {
  font-size: 8px;
  color: var(--arc-muted);
  letter-spacing: 1.5px;
  opacity: 0.6;
}

.arcade-btn--sub:hover .arcade-btn__sub-sm {
  color: var(--arc-green-dim);
  opacity: 1;
}

/* ─── Score Badge ─── */
.score-badge {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 20px;
  background: var(--arc-surface);
  border: 1px solid var(--arc-surface-light);
  border-radius: 4px;
}

.score-badge__label {
  font-size: 13px;
  color: var(--arc-muted);
}

.score-badge__value {
  font-size: 22px;
  font-weight: 700;
  color: var(--arc-amber);
  text-shadow: 0 0 16px rgba(255, 184, 0, 0.3);
}

.score-badge__unit {
  font-size: 14px;
  font-weight: 400;
  color: var(--arc-amber);
  margin-left: 2px;
  opacity: 0.7;
}

.first-play {
  font-size: 14px;
  color: var(--arc-muted);
  opacity: 0.7;
}

/* ─── Toast ─── */
.toast {
  position: fixed;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 24px;
  background: var(--arc-surface);
  border: 1px solid var(--arc-surface-light);
  border-radius: 4px;
  color: var(--arc-muted);
  font-size: 14px;
  font-family: 'Galmuri11', monospace;
  z-index: 20;
}

.toast-enter-active { transition: all 0.2s ease; }
.toast-leave-active { transition: all 0.2s ease; }
.toast-enter-from { opacity: 0; transform: translateX(-50%) translateY(8px); }
.toast-leave-to { opacity: 0; transform: translateX(-50%) translateY(-8px); }

/* ─── Modal ─── */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(5, 8, 15, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  padding: 24px;
}

.modal-card {
  background: var(--arc-surface);
  border: 2px solid var(--arc-surface-light);
  border-radius: 8px;
  width: 100%;
  max-width: 320px;
  box-shadow:
    0 0 40px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid var(--arc-surface-light);
}

.modal-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--arc-text);
  letter-spacing: 2px;
}

.modal-close {
  background: none;
  border: none;
  color: var(--arc-muted);
  font-size: 18px;
  cursor: pointer;
  padding: 4px 8px;
  font-family: 'Galmuri11', monospace;
  transition: color 0.15s;
}

.modal-close:hover {
  color: var(--arc-text);
}

.modal-body {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* ─── Option Row ─── */
.option-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: opacity 0.2s;
}

.option-row.disabled {
  opacity: 0.35;
  pointer-events: none;
}

.option-label {
  font-size: 14px;
  color: var(--arc-text);
}

/* ─── Toggle ─── */
.toggle-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font-family: 'Galmuri11', monospace;
}

.toggle-track {
  width: 40px;
  height: 22px;
  border-radius: 11px;
  background: var(--arc-surface-light);
  position: relative;
  transition: background 0.2s;
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.toggle-btn.active .toggle-track {
  background: rgba(57, 255, 20, 0.2);
  border-color: var(--arc-green);
}

.toggle-thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--arc-muted);
  transition: all 0.2s;
}

.toggle-btn.active .toggle-thumb {
  left: 20px;
  background: var(--arc-green);
  box-shadow: 0 0 8px var(--arc-green-glow);
}

.toggle-text {
  font-size: 12px;
  color: var(--arc-muted);
  min-width: 24px;
}

.toggle-btn.active .toggle-text {
  color: var(--arc-green);
}

/* ─── Volume Slider ─── */
.volume-control {
  display: flex;
  align-items: center;
  gap: 10px;
}

.volume-slider {
  -webkit-appearance: none;
  appearance: none;
  width: 120px;
  height: 4px;
  background: var(--arc-surface-light);
  border-radius: 2px;
  outline: none;
}

.volume-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--arc-green);
  cursor: pointer;
  box-shadow: 0 0 8px var(--arc-green-glow);
  border: none;
}

.volume-slider::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--arc-green);
  cursor: pointer;
  box-shadow: 0 0 8px var(--arc-green-glow);
  border: none;
}

.volume-value {
  font-size: 12px;
  color: var(--arc-muted);
  min-width: 32px;
  text-align: right;
}

/* ─── Test Sound Button ─── */
.test-sound-btn {
  padding: 10px 16px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--arc-surface-light);
  border-radius: 4px;
  color: var(--arc-muted);
  font-size: 13px;
  font-family: 'Galmuri11', monospace;
  cursor: pointer;
  transition: all 0.15s;
}

.test-sound-btn:hover:not(:disabled) {
  border-color: var(--arc-green);
  color: var(--arc-green);
}

.test-sound-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

/* ─── Modal Transition ─── */
.modal-enter-active { transition: opacity 0.2s ease; }
.modal-leave-active { transition: opacity 0.15s ease; }
.modal-enter-from,
.modal-leave-to { opacity: 0; }

.modal-enter-active .modal-card {
  transition: transform 0.2s ease;
}
.modal-leave-active .modal-card {
  transition: transform 0.15s ease;
}
.modal-enter-from .modal-card {
  transform: scale(0.95);
}
.modal-leave-to .modal-card {
  transform: scale(0.95);
}


/* ─── Version ─── */
.version {
  position: absolute;
  bottom: 14px;
  right: 16px;
  font-size: 10px;
  color: var(--arc-muted);
  opacity: 0.4;
  z-index: 6;
}
</style>
