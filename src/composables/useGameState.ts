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
const ACTING_DURATION = 2500
const SUCCESS_DELAY = 300

export function useGameState() {
  const phase = ref<GamePhase>('IDLE')
  const score = ref(0)
  const mission = shallowRef<MissionParams | null>(null)
  const missionKey = ref(0)

  const timer = useTimer()
  const pool = useMissionPool()
  const validator = useMissionValidator()
  const storage = useScoreStorage()
  const audio = useAudio()
  const feedback = useFeedback()

  // Color tap needs special validation from the component
  let colorTapCorrect = false
  let multiTapCount = 0
  const sequenceIndex = ref(0)

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

  function startGame() {
    clearAllTimers()
    audio.ensureContext()
    score.value = 0
    pool.reset()
    phase.value = 'IDLE'
    nextMission()
  }

  function nextMission() {
    const m = pool.pickMission(score.value)
    mission.value = m
    missionKey.value++
    colorTapCorrect = false
    multiTapCount = 0
    sequenceIndex.value = 0
    phase.value = 'SHOWING'

    // After showing delay, enable input
    safeTimeout(() => {
      if (phase.value === 'SHOWING') {
        phase.value = 'ACTING'
        timer.start(ACTING_DURATION, onTimeout)
      }
    }, SHOWING_DURATION)
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

  function handleSuccess() {
    timer.stop()
    phase.value = 'SUCCESS'
    score.value++
    audio.playSuccess()
    feedback.successFeedback()

    safeTimeout(() => {
      if (phase.value === 'SUCCESS') {
        nextMission()
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
    timer,
    feedback,
    storage,
    startGame,
    handleInput,
    setColorTapResult,
    sequenceIndex,
    restart,
    clearAllTimers,
  }
}
