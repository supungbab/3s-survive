import { ref, shallowRef } from 'vue'
import type { GamePhase, InputAction } from '@/types/game'
import type { MissionParams } from '@/types/mission'
import { useTimer } from './useTimer'
import { useMissionPool } from './useMissionPool'
import { useMissionValidator } from './useMissionValidator'
import { useScoreStorage } from './useScoreStorage'
import { useAudio } from './useAudio'
import { useFeedback } from './useFeedback'

const SHOWING_DURATION = 500
const SUB_SHOWING_DURATION = 200
const ACTING_DURATION = 2500
const SUCCESS_DELAY = 300

export function useGameState() {
  const phase = ref<GamePhase>('IDLE')
  const score = ref(0)
  const mission = shallowRef<MissionParams | null>(null)
  const missionKey = ref(0)

  // 다중 미션 상태
  const roundMissions = shallowRef<MissionParams[]>([])
  const subMissionIndex = ref(0)
  const subMissionCount = ref(1)

  const timer = useTimer()
  const pool = useMissionPool()
  const validator = useMissionValidator()
  const storage = useScoreStorage()
  const audio = useAudio()
  const feedback = useFeedback()

  // Color tap / component-validated missions
  let colorTapCorrect = false
  let multiTapCount = 0
  const doubleSwipeCount = ref(0)
  const sequenceIndex = ref(0)
  let simonReady = false

  // Track pending timeouts to prevent ghost timers on restart
  const pendingTimers: number[] = []

  function safeTimeout(fn: () => void, ms: number) {
    const id = window.setTimeout(() => {
      const idx = pendingTimers.indexOf(id)
      if (idx !== -1) pendingTimers.splice(idx, 1)
      fn()
    }, ms)
    pendingTimers.push(id)
  }

  function clearAllTimers() {
    for (const id of pendingTimers) {
      window.clearTimeout(id)
    }
    pendingTimers.length = 0
  }

  function resetSubMissionState() {
    colorTapCorrect = false
    multiTapCount = 0
    doubleSwipeCount.value = 0
    sequenceIndex.value = 0
    simonReady = false
  }

  function startGame() {
    clearAllTimers()
    audio.ensureContext()
    score.value = 0
    pool.reset()
    phase.value = 'IDLE'
    nextRound()
  }

  function nextRound() {
    const missions = pool.pickMissions(score.value)
    roundMissions.value = missions
    subMissionIndex.value = 0
    subMissionCount.value = missions.length

    const m = missions[0]
    mission.value = m
    missionKey.value++
    resetSubMissionState()
    phase.value = 'SHOWING'

    // After showing delay, enable input
    safeTimeout(() => {
      if (phase.value === 'SHOWING') {
        phase.value = 'ACTING'
        timer.start(ACTING_DURATION, onTimeout)
      }
    }, SHOWING_DURATION)
  }

  function advanceSubMission() {
    const nextIdx = subMissionIndex.value + 1
    subMissionIndex.value = nextIdx
    const m = roundMissions.value[nextIdx]
    mission.value = m
    missionKey.value++
    resetSubMissionState()
    phase.value = 'SUB_SHOWING'

    // Short showing for sub-missions, timer keeps running
    safeTimeout(() => {
      if (phase.value === 'SUB_SHOWING') {
        phase.value = 'ACTING'
      }
    }, SUB_SHOWING_DURATION)
  }

  function onTimeout() {
    const m = mission.value
    if (m?.type === 'DO_NOTHING') {
      handleSuccess()
      return
    }
    handleFail()
  }

  function handleInput(action: InputAction) {
    if (phase.value !== 'ACTING') return

    const m = mission.value
    if (!m) return

    // DO_NOTHING: any input = fail
    if (m.type === 'DO_NOTHING') {
      handleFail()
      return
    }

    // Special handling for COLOR_TAP - the component tells us if the color was correct
    if (m.type === 'COLOR_TAP' && action.type === 'TAP') {
      if (colorTapCorrect) {
        handleSuccess()
      } else {
        handleFail()
      }
      return
    }

    // COLOR_TAP_NEGATIVE: same flow as COLOR_TAP
    if (m.type === 'COLOR_TAP_NEGATIVE' && action.type === 'TAP') {
      if (colorTapCorrect) {
        handleSuccess()
      } else {
        handleFail()
      }
      return
    }

    // Component-validated single-tap missions
    if (
      (m.type === 'TAP_ZONE' || m.type === 'SIZE_TAP' || m.type === 'ODD_ONE_OUT'
        || m.type === 'MATH_TAP' || m.type === 'QUICK_TAP' || m.type === 'WIRE_CUT')
      && action.type === 'TAP'
    ) {
      if (colorTapCorrect) {
        handleSuccess()
      } else {
        handleFail()
      }
      return
    }

    // Component-managed missions: only component emit succeeds, raw input ignored
    // These use stopPropagation internally; raw events reach here only from outside the component area
    if (
      m.type === 'CATCH' || m.type === 'DRAG_TO' || m.type === 'PINCH'
      || m.type === 'ROTATE' || m.type === 'HOLD_AND_TAP'
      || m.type === 'DUAL_SWIPE' || m.type === 'RHYTHM'
      || m.type === 'TUNE' || m.type === 'POWER_UP' || m.type === 'STATIC_CLEAR'
      || m.type === 'BROADCAST' || m.type === 'SCAN' || m.type === 'SHELTER'
      || m.type === 'MORSE'
    ) {
      if (action.type === 'TAP' && colorTapCorrect) {
        handleSuccess()
      }
      // all other raw inputs → ignore (timeout handles fail)
      return
    }

    // COUNT_TAP: exact tap count, over-tap = fail
    if (m.type === 'COUNT_TAP') {
      if (action.type === 'TAP') {
        multiTapCount++
        if (multiTapCount === (m.tapCount ?? 3)) {
          handleSuccess()
        } else if (multiTapCount > (m.tapCount ?? 3)) {
          handleFail()
        }
      }
      return
    }

    // PATTERN_TAP: step-by-step via component emit
    if (m.type === 'PATTERN_TAP' && action.type === 'TAP') {
      if (colorTapCorrect) {
        sequenceIndex.value++
        if (sequenceIndex.value >= (m.patternLength ?? 3)) {
          handleSuccess()
        }
      } else {
        handleFail()
      }
      return
    }

    // SIMON: step-by-step via component emit, guarded by playback state
    if (m.type === 'SIMON' && action.type === 'TAP') {
      if (!simonReady) return // 재생 중 → 무시
      if (colorTapCorrect) {
        sequenceIndex.value++
        if (sequenceIndex.value >= (m.simonSequence?.length ?? 2)) {
          handleSuccess()
        }
      } else {
        handleFail()
      }
      return
    }

    // DOUBLE_SWIPE: count swipes, wrong direction = fail
    if (m.type === 'DOUBLE_SWIPE') {
      if (action.type === 'SWIPE') {
        if (action.direction === m.swipeDirection) {
          doubleSwipeCount.value++
          if (doubleSwipeCount.value >= (m.swipeCount ?? 2)) {
            handleSuccess()
          }
        } else {
          handleFail()
        }
      }
      return
    }

    // MULTI_TAP: count taps internally and succeed immediately when target reached
    if (m.type === 'MULTI_TAP' && (action.type === 'TAP' || action.type === 'MULTI_TAP')) {
      if (action.type === 'TAP') {
        multiTapCount++
      }
      if (multiTapCount >= (m.tapCount ?? 5)) {
        handleSuccess()
      }
      return
    }

    // SEQUENCE: step-by-step validation
    if (m.type === 'SEQUENCE' && m.sequence) {
      const step = m.sequence[sequenceIndex.value]
      const matched =
        step.action === 'TAP'
          ? action.type === 'TAP'
          : action.type === 'SWIPE' && action.direction === step.direction
      if (matched) {
        sequenceIndex.value++
        if (sequenceIndex.value >= m.sequence.length) {
          handleSuccess()
        }
      } else {
        handleFail()
      }
      return
    }

    const isCorrect = validator.validate(m, action)
    if (isCorrect) {
      handleSuccess()
    } else {
      handleFail()
    }
  }

  function setColorTapResult(correct: boolean) {
    colorTapCorrect = correct
  }

  function setSimonReady() {
    simonReady = true
  }

  function handleSuccess() {
    // 남은 서브미션이 있으면 다음 서브미션으로
    if (subMissionIndex.value < subMissionCount.value - 1) {
      advanceSubMission()
      return
    }

    // 라운드 완료
    timer.stop()
    phase.value = 'SUCCESS'
    score.value++
    audio.playSuccess()
    feedback.successFeedback()

    safeTimeout(() => {
      if (phase.value === 'SUCCESS') {
        nextRound()
      }
    }, SUCCESS_DELAY)
  }

  function handleFail() {
    timer.stop()
    clearAllTimers()
    phase.value = 'FAIL'
    audio.playFail()
    feedback.failFeedback()

    safeTimeout(() => {
      phase.value = 'GAME_OVER'
      storage.saveScore(score.value)
    }, 600)
  }

  function restart() {
    startGame()
  }

  return {
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
  }
}
