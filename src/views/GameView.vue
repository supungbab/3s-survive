<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useGameState } from '@/composables/useGameState'
import { useInputDetector } from '@/composables/useInputDetector'
import { useSceneTransition } from '@/composables/useSceneTransition'
import TimerBar from '@/components/TimerBar.vue'
import ScoreDisplay from '@/components/ScoreDisplay.vue'
import MissionText from '@/components/MissionText.vue'
import FeedbackLayer from '@/components/FeedbackLayer.vue'
import ResultOverlay from '@/components/ResultOverlay.vue'
import ColorTapMission from '@/components/missions/ColorTapMission.vue'
import SwipeMission from '@/components/missions/SwipeMission.vue'
import MultiTapMission from '@/components/missions/MultiTapMission.vue'
import LongPressMission from '@/components/missions/LongPressMission.vue'
import DualTapMission from '@/components/missions/DualTapMission.vue'
import DoNothingMission from '@/components/missions/DoNothingMission.vue'
import SequenceMission from '@/components/missions/SequenceMission.vue'

const router = useRouter()
const { transition, afterTransition } = useSceneTransition()
const missionArea = ref<HTMLElement | null>(null)

const {
  phase,
  score,
  mission,
  missionKey,
  timer,
  feedback,
  storage,
  startGame,
  handleInput,
  setColorTapResult,
  sequenceIndex,
  restart,
  clearAllTimers,
} = useGameState()

// State guard (the-perfect pattern: handler 내부에서 상태 체크 후 early return)
const isBlocked = () =>
  phase.value === 'GAME_OVER' ||
  phase.value === 'IDLE' ||
  phase.value === 'FAIL'

const { tapCount, isPressed, bind, resetTapCount } = useInputDetector((action) => {
  handleInput(action)
}, isBlocked)

watch(missionKey, () => {
  resetTapCount()
})

function handleColorTap(correct: boolean) {
  setColorTapResult(correct)
  handleInput({ type: 'TAP', x: 0, y: 0 })
}

function handleRestart() {
  resetTapCount()
  restart()
}

function handleHome() {
  transition(() => router.push('/'))
}

onMounted(async () => {
  if (missionArea.value) {
    bind(missionArea.value)
  }
  await afterTransition()
  startGame()
})

onUnmounted(() => {
  timer.stop()
  clearAllTimers()
})
</script>

<template>
  <div
    class="game-view"
    :class="{ shake: feedback.isShaking.value }"
  >
    <!-- Scanline overlay -->
    <div class="scanlines" />

    <!-- Header -->
    <div class="game-header">
      <TimerBar
        :progress="timer.progress.value"
        :active="phase === 'ACTING'"
      />
      <ScoreDisplay :score="score" />
    </div>

    <!-- Mission area: 터치 핸들러는 여기에만 바인딩 (the-perfect: 캔버스에만 바인딩) -->
    <div ref="missionArea" class="mission-area">
      <template v-if="mission && (phase === 'SHOWING' || phase === 'ACTING' || phase === 'SUCCESS')">
        <MissionText
          :key="missionKey"
          :text="mission.text"
          :showing="phase === 'SHOWING'"
        />

        <div class="mission-content" :key="'content-' + missionKey">
          <ColorTapMission
            v-if="mission.type === 'COLOR_TAP'"
            :target-color="mission.targetColor!"
            :colors="mission.colors!"
            @tap="handleColorTap"
          />
          <ColorTapMission
            v-else-if="mission.type === 'COLOR_TAP_NEGATIVE'"
            :target-color="mission.targetColor!"
            :colors="mission.colors!"
            negative
            @tap="handleColorTap"
          />
          <SwipeMission
            v-else-if="mission.type === 'SWIPE'"
            :direction="mission.swipeDirection!"
          />
          <SwipeMission
            v-else-if="mission.type === 'REVERSE_SWIPE'"
            :direction="mission.swipeDirection!"
            reverse
          />
          <MultiTapMission
            v-else-if="mission.type === 'MULTI_TAP'"
            :tap-count="mission.tapCount!"
            :current-taps="tapCount"
          />
          <LongPressMission
            v-else-if="mission.type === 'LONG_PRESS'"
            :is-pressed="isPressed"
          />
          <DualTapMission
            v-else-if="mission.type === 'DUAL_TAP'"
          />
          <DoNothingMission
            v-else-if="mission.type === 'DO_NOTHING'"
          />
          <SequenceMission
            v-else-if="mission.type === 'SEQUENCE'"
            :steps="mission.sequence!"
            :current-step="sequenceIndex"
          />
        </div>
      </template>

      <!-- Phase indicator -->
      <div class="phase-badge" :class="{ success: phase === 'SUCCESS', fail: phase === 'FAIL' }">
        <template v-if="phase === 'SHOWING'">준비...</template>
        <template v-else-if="phase === 'SUCCESS'">+1</template>
        <template v-else-if="phase === 'FAIL'">실패!</template>
        <template v-else>&nbsp;</template>
      </div>
    </div>

    <!-- Feedback layer -->
    <FeedbackLayer
      :show-flash="feedback.showFlash.value"
      :flash-color="feedback.flashColor.value"
      :particles="feedback.particles.value"
    />

    <!-- Game over: mission-area 바깥 → 터치 이벤트 버블링 없음 -->
    <ResultOverlay
      v-if="phase === 'GAME_OVER'"
      :score="score"
      :best-score="storage.bestScore.value"
      @restart="handleRestart"
      @home="handleHome"
    />
  </div>
</template>

<style scoped>
.game-view {
  height: 100dvh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  background: #0a0610;
  background-image:
    radial-gradient(ellipse at 50% 100%, rgba(255, 80, 20, 0.08) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 0%, rgba(140, 200, 144, 0.03) 0%, transparent 40%);
}

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
  z-index: 10;
}

.game-header {
  padding: 16px 16px 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: max(16px, env(safe-area-inset-top));
  position: relative;
  z-index: 5;
}

.mission-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  touch-action: none;
  position: relative;
  z-index: 5;
}

.mission-content {
  width: 100%;
}

.phase-badge {
  font-size: 24px;
  font-weight: 700;
  color: var(--arc-muted);
  min-height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.phase-badge.success {
  color: var(--px-green);
  font-size: 32px;
  text-shadow:
    0 0 12px rgba(140, 200, 144, 0.3),
    0 0 40px rgba(140, 200, 144, 0.15);
}

.phase-badge.fail {
  color: var(--arc-danger);
  font-size: 32px;
  text-shadow:
    0 0 12px var(--arc-danger-glow),
    0 0 40px rgba(255, 59, 92, 0.2);
}
</style>
