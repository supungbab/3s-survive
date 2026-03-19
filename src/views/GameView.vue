<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import type { MissionType } from '@/types/mission'
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
import TapZoneMission from '@/components/missions/TapZoneMission.vue'
import SizeTapMission from '@/components/missions/SizeTapMission.vue'
import DoubleSwipeMission from '@/components/missions/DoubleSwipeMission.vue'
import OddOneOutMission from '@/components/missions/OddOneOutMission.vue'
import MathTapMission from '@/components/missions/MathTapMission.vue'
import QuickTapMission from '@/components/missions/QuickTapMission.vue'
import CatchMission from '@/components/missions/CatchMission.vue'
import CountTapMission from '@/components/missions/CountTapMission.vue'
import PatternTapMission from '@/components/missions/PatternTapMission.vue'
import SimonMission from '@/components/missions/SimonMission.vue'
import FakeOutMission from '@/components/missions/FakeOutMission.vue'
import DragToMission from '@/components/missions/DragToMission.vue'
import PinchMission from '@/components/missions/PinchMission.vue'
import RotateMission from '@/components/missions/RotateMission.vue'
import ColorSwipeMission from '@/components/missions/ColorSwipeMission.vue'
import HoldAndTapMission from '@/components/missions/HoldAndTapMission.vue'
import DualSwipeMission from '@/components/missions/DualSwipeMission.vue'
import RhythmMission from '@/components/missions/RhythmMission.vue'
import TuneMission from '@/components/missions/TuneMission.vue'
import PowerUpMission from '@/components/missions/PowerUpMission.vue'
import WireCutMission from '@/components/missions/WireCutMission.vue'
import StaticClearMission from '@/components/missions/StaticClearMission.vue'
import BroadcastMission from '@/components/missions/BroadcastMission.vue'
import ScanMission from '@/components/missions/ScanMission.vue'
import ShelterMission from '@/components/missions/ShelterMission.vue'
import MorseMission from '@/components/missions/MorseMission.vue'
import HeartbeatMission from '@/components/missions/HeartbeatMission.vue'
import VentMission from '@/components/missions/VentMission.vue'
import FlickerTapMission from '@/components/missions/FlickerTapMission.vue'
import DecryptMission from '@/components/missions/DecryptMission.vue'
import GeigerMission from '@/components/missions/GeigerMission.vue'
import LockpickMission from '@/components/missions/LockpickMission.vue'
import DecontamMission from '@/components/missions/DecontamMission.vue'
import BloodTypeMission from '@/components/missions/BloodTypeMission.vue'
import PowerGridMission from '@/components/missions/PowerGridMission.vue'
import DefuseMission from '@/components/missions/DefuseMission.vue'
import TriageMission from '@/components/missions/TriageMission.vue'
import ParadropMission from '@/components/missions/ParadropMission.vue'
import QuarantineMission from '@/components/missions/QuarantineMission.vue'
import DeadDropMission from '@/components/missions/DeadDropMission.vue'
import FrequencyJamMission from '@/components/missions/FrequencyJamMission.vue'
import SosFlashMission from '@/components/missions/SosFlashMission.vue'
import AirlockMission from '@/components/missions/AirlockMission.vue'
import RadarPingMission from '@/components/missions/RadarPingMission.vue'
import SiphonMission from '@/components/missions/SiphonMission.vue'
import FirewallMission from '@/components/missions/FirewallMission.vue'
import CompassMission from '@/components/missions/CompassMission.vue'
import CrankMission from '@/components/missions/CrankMission.vue'
import RationMission from '@/components/missions/RationMission.vue'
import DetoxMission from '@/components/missions/DetoxMission.vue'
import BlackoutMission from '@/components/missions/BlackoutMission.vue'
import OverrideMission from '@/components/missions/OverrideMission.vue'
import PressureMission from '@/components/missions/PressureMission.vue'
import SpliceMission from '@/components/missions/SpliceMission.vue'
import DistressMission from '@/components/missions/DistressMission.vue'
import ElevatorMission from '@/components/missions/ElevatorMission.vue'

const router = useRouter()
const route = useRoute()
const { transition, afterTransition } = useSceneTransition()
const missionArea = ref<HTMLElement | null>(null)

const {
  phase,
  score,
  mission,
  missionKey,
  subMissionIndex,
  subMissionCount,
  timer,
  feedback,
  storage,
  startGame,
  handleInput,
  setColorTapResult,
  setSimonReady,
  sequenceIndex,
  doubleSwipeCount,
  restart,
  clearAllTimers,
  setForcedMission,
} = useGameState()

// State guard (the-perfect pattern: handler 내부에서 상태 체크 후 early return)
const isBlocked = () =>
  phase.value === 'GAME_OVER' ||
  phase.value === 'IDLE' ||
  phase.value === 'FAIL' ||
  phase.value === 'SHOWING' ||
  phase.value === 'SUB_SHOWING'

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
  // 디버그: ?mission=TUNE 형식으로 특정 미션 강제
  const forcedMission = route.query.mission as string | undefined
  if (forcedMission) {
    setForcedMission(forcedMission as MissionType)
  }

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
        :active="phase === 'ACTING' || phase === 'SUB_SHOWING'"
      />
      <ScoreDisplay :score="score" />
    </div>

    <!-- Mission area: 터치 핸들러는 여기에만 바인딩 (the-perfect: 캔버스에만 바인딩) -->
    <div ref="missionArea" class="mission-area">
      <template v-if="mission && (phase === 'SHOWING' || phase === 'SUB_SHOWING' || phase === 'ACTING' || phase === 'SUCCESS')">
        <MissionText
          :key="missionKey"
          :text="mission.text"
          :showing="phase === 'SHOWING' || phase === 'SUB_SHOWING'"
          :quick="phase === 'SUB_SHOWING'"
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
          <TapZoneMission
            v-else-if="mission.type === 'TAP_ZONE'"
            :target-zone="mission.targetZone!"
            @tap="handleColorTap"
          />
          <SizeTapMission
            v-else-if="mission.type === 'SIZE_TAP'"
            :target-size="mission.targetSize!"
            :sizes="mission.sizes!"
            @tap="handleColorTap"
          />
          <SwipeMission
            v-else-if="mission.type === 'SWIPE_MATCH'"
            :direction="mission.swipeDirection!"
            icon-only
          />
          <DoubleSwipeMission
            v-else-if="mission.type === 'DOUBLE_SWIPE'"
            :direction="mission.swipeDirection!"
            :swipe-count="mission.swipeCount!"
            :current-swipes="doubleSwipeCount"
          />
          <OddOneOutMission
            v-else-if="mission.type === 'ODD_ONE_OUT'"
            :odd-variant="mission.oddVariant!"
            :item-count="mission.itemCount!"
            :odd-index="mission.oddIndex!"
            @tap="handleColorTap"
          />
          <MathTapMission
            v-else-if="mission.type === 'MATH_TAP'"
            :math-expression="mission.mathExpression!"
            :math-answer="mission.mathAnswer!"
            :math-choices="mission.mathChoices!"
            @tap="handleColorTap"
          />
          <SwipeMission
            v-else-if="mission.type === 'MIRROR_SWIPE'"
            :direction="mission.swipeDirection!"
            mirror
          />
          <QuickTapMission
            v-else-if="mission.type === 'QUICK_TAP'"
            @tap="handleColorTap"
          />
          <CatchMission
            v-else-if="mission.type === 'CATCH'"
            @tap="handleColorTap"
          />
          <CountTapMission
            v-else-if="mission.type === 'COUNT_TAP'"
            :count-items="mission.countItems!"
            :current-taps="tapCount"
          />
          <PatternTapMission
            v-else-if="mission.type === 'PATTERN_TAP'"
            :pattern-length="mission.patternLength!"
            :current-step="sequenceIndex"
            @tap="handleColorTap"
          />
          <SimonMission
            v-else-if="mission.type === 'SIMON'"
            :simon-sequence="mission.simonSequence!"
            :simon-buttons="mission.simonButtons!"
            :current-step="sequenceIndex"
            @tap="handleColorTap"
            @ready="setSimonReady"
          />
          <FakeOutMission
            v-else-if="mission.type === 'FAKE_OUT'"
            :real-direction="mission.swipeDirection!"
            :fake-text="mission.fakeText!"
          />
          <DragToMission
            v-else-if="mission.type === 'DRAG_TO'"
            @tap="handleColorTap"
          />
          <PinchMission
            v-else-if="mission.type === 'PINCH'"
            :pinch-direction="mission.pinchDirection!"
            @tap="handleColorTap"
          />
          <RotateMission
            v-else-if="mission.type === 'ROTATE'"
            :rotate-direction="mission.rotateDirection!"
            @tap="handleColorTap"
          />
          <ColorSwipeMission
            v-else-if="mission.type === 'COLOR_SWIPE'"
            :target-color="mission.targetColor!"
            :color-swipe-rule="mission.colorSwipeRule!"
          />
          <HoldAndTapMission
            v-else-if="mission.type === 'HOLD_AND_TAP'"
            @tap="handleColorTap"
          />
          <DualSwipeMission
            v-else-if="mission.type === 'DUAL_SWIPE'"
            :dual-swipe-directions="mission.dualSwipeDirections!"
            @tap="handleColorTap"
          />
          <RhythmMission
            v-else-if="mission.type === 'RHYTHM'"
            :beat-count="mission.beatCount!"
            :beat-interval="mission.beatInterval!"
            @tap="handleColorTap"
          />
          <TuneMission
            v-else-if="mission.type === 'TUNE'"
            @tap="handleColorTap"
          />
          <PowerUpMission
            v-else-if="mission.type === 'POWER_UP'"
            :required-swipes="mission.requiredSwipes!"
            @tap="handleColorTap"
          />
          <WireCutMission
            v-else-if="mission.type === 'WIRE_CUT'"
            :wire-count="mission.wireCount!"
            @tap="handleColorTap"
          />
          <StaticClearMission
            v-else-if="mission.type === 'STATIC_CLEAR'"
            @tap="handleColorTap"
          />
          <BroadcastMission
            v-else-if="mission.type === 'BROADCAST'"
            @tap="handleColorTap"
          />
          <ScanMission
            v-else-if="mission.type === 'SCAN'"
            @tap="handleColorTap"
          />
          <ShelterMission
            v-else-if="mission.type === 'SHELTER'"
            @tap="handleColorTap"
          />
          <MorseMission
            v-else-if="mission.type === 'MORSE'"
            :morse-pattern="mission.morsePattern!"
            @tap="handleColorTap"
          />
          <DefuseMission
            v-else-if="mission.type === 'DEFUSE'"
            :wire-count="mission.wireCount!"
            @tap="handleColorTap"
          />
          <TriageMission
            v-else-if="mission.type === 'TRIAGE'"
            :triage-count="mission.triageCount!"
            @tap="handleColorTap"
          />
          <ParadropMission
            v-else-if="mission.type === 'PARADROP'"
            :direction="mission.swipeDirection!"
          />
          <HeartbeatMission
            v-else-if="mission.type === 'HEARTBEAT'"
            @tap="handleColorTap"
          />
          <VentMission
            v-else-if="mission.type === 'VENT'"
          />
          <FlickerTapMission
            v-else-if="mission.type === 'FLICKER_TAP'"
            @tap="handleColorTap"
          />
          <DecryptMission
            v-else-if="mission.type === 'DECRYPT'"
            :decrypt-scrambled="mission.decryptScrambled!"
            :decrypt-answer="mission.decryptAnswer!"
            :decrypt-choices="mission.decryptChoices!"
            @tap="handleColorTap"
          />
          <GeigerMission
            v-else-if="mission.type === 'GEIGER'"
            @tap="handleColorTap"
          />
          <LockpickMission
            v-else-if="mission.type === 'LOCKPICK'"
            :lockpick-steps="mission.lockpickSteps!"
            @tap="handleColorTap"
          />
          <DecontamMission
            v-else-if="mission.type === 'DECONTAM'"
            :decontam-count="mission.decontamCount!"
            @tap="handleColorTap"
          />
          <BloodTypeMission
            v-else-if="mission.type === 'BLOOD_TYPE'"
            :blood-target="mission.bloodTarget!"
            :blood-choices="mission.bloodChoices!"
            @tap="handleColorTap"
          />
          <PowerGridMission
            v-else-if="mission.type === 'POWER_GRID'"
            :grid-switch-count="mission.gridSwitchCount!"
            @tap="handleColorTap"
          />
          <QuarantineMission
            v-else-if="mission.type === 'QUARANTINE'"
            @tap="handleColorTap"
          />
          <DeadDropMission
            v-else-if="mission.type === 'DEAD_DROP'"
            :dead-drop-coord="mission.deadDropCoord!"
            :dead-drop-grid-size="mission.deadDropGridSize!"
            @tap="handleColorTap"
          />
          <FrequencyJamMission
            v-else-if="mission.type === 'FREQUENCY_JAM'"
            @tap="handleColorTap"
          />
          <SosFlashMission
            v-else-if="mission.type === 'SOS_FLASH'"
            @tap="handleColorTap"
          />
          <AirlockMission
            v-else-if="mission.type === 'AIRLOCK'"
            @tap="handleColorTap"
          />
          <RadarPingMission
            v-else-if="mission.type === 'RADAR_PING'"
            @tap="handleColorTap"
          />
          <SiphonMission
            v-else-if="mission.type === 'SIPHON'"
            @tap="handleColorTap"
          />
          <FirewallMission
            v-else-if="mission.type === 'FIREWALL'"
            :firewall-count="mission.firewallCount!"
            @tap="handleColorTap"
          />
          <CompassMission
            v-else-if="mission.type === 'COMPASS'"
            :direction="mission.swipeDirection!"
          />
          <CrankMission
            v-else-if="mission.type === 'CRANK'"
            :crank-rotations="mission.crankRotations!"
            @tap="handleColorTap"
          />
          <RationMission
            v-else-if="mission.type === 'RATION'"
            :ration-people="mission.rationPeople!"
            :ration-per-person="mission.rationPerPerson!"
            :ration-choices="mission.rationChoices!"
            @tap="handleColorTap"
          />
          <DetoxMission
            v-else-if="mission.type === 'DETOX'"
            :detox-color="mission.detoxColor!"
            :detox-choices="mission.detoxChoices!"
            @tap="handleColorTap"
          />
          <BlackoutMission
            v-else-if="mission.type === 'BLACKOUT'"
            @tap="handleColorTap"
          />
          <OverrideMission
            v-else-if="mission.type === 'OVERRIDE'"
            :override-code="mission.overrideCode!"
            @tap="handleColorTap"
          />
          <PressureMission
            v-else-if="mission.type === 'PRESSURE'"
            @tap="handleColorTap"
          />
          <SpliceMission
            v-else-if="mission.type === 'SPLICE'"
            :splice-colors="mission.spliceColors!"
            @tap="handleColorTap"
          />
          <DistressMission
            v-else-if="mission.type === 'DISTRESS'"
            :distress-pattern="mission.distressPattern!"
            @tap="handleColorTap"
          />
          <ElevatorMission
            v-else-if="mission.type === 'ELEVATOR'"
            :elevator-current="mission.elevatorCurrent!"
            :elevator-target="mission.elevatorTarget!"
            @tap="handleColorTap"
          />
        </div>
      </template>

      <!-- Sub-mission progress dots -->
      <div v-if="subMissionCount > 1" class="sub-dots">
        <span
          v-for="i in subMissionCount"
          :key="i"
          class="sub-dot"
          :class="{
            done: i - 1 < subMissionIndex,
            active: i - 1 === subMissionIndex && (phase === 'ACTING' || phase === 'SUB_SHOWING'),
          }"
        />
      </div>

      <!-- Phase indicator -->
      <div class="phase-badge" :class="{ success: phase === 'SUCCESS', fail: phase === 'FAIL' }">
        <template v-if="phase === 'SHOWING'">READY...</template>
        <template v-else-if="phase === 'SUB_SHOWING'">NEXT!</template>
        <template v-else-if="phase === 'SUCCESS'">+1</template>
        <template v-else-if="phase === 'FAIL'">FAIL</template>
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

.sub-dots {
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
}

.sub-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--arc-muted);
  opacity: 0.3;
  transition: all 0.2s ease;
}

.sub-dot.done {
  background: var(--px-green);
  opacity: 1;
  box-shadow: 0 0 6px rgba(140, 200, 144, 0.4);
}

.sub-dot.active {
  background: var(--arc-text);
  opacity: 1;
  animation: dot-pulse 0.4s ease infinite alternate;
}

@keyframes dot-pulse {
  from { transform: scale(1); }
  to { transform: scale(1.3); }
}

.phase-badge.fail {
  color: var(--arc-danger);
  font-size: 32px;
  text-shadow:
    0 0 12px var(--arc-danger-glow),
    0 0 40px rgba(255, 59, 92, 0.2);
}
</style>
