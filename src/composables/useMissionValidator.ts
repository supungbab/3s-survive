import type { InputAction } from '@/types/game'
import type { MissionParams } from '@/types/mission'

export function useMissionValidator() {
  function validate(mission: MissionParams, action: InputAction): boolean {
    switch (mission.type) {
      case 'COLOR_TAP':
        // TAP is accepted; actual color validation happens in ColorTapMission component
        return action.type === 'TAP'

      case 'SWIPE':
      case 'REVERSE_SWIPE':
        return (
          action.type === 'SWIPE' && action.direction === mission.swipeDirection
        )

      case 'MULTI_TAP':
        if (action.type === 'TAP') return false // individual taps don't pass
        if (action.type === 'MULTI_TAP') {
          return action.count >= (mission.tapCount ?? 5)
        }
        return false

      case 'LONG_PRESS':
        return action.type === 'LONG_PRESS'

      case 'DUAL_TAP':
        return action.type === 'DUAL_TAP'

      case 'DO_NOTHING':
        return false // any input = fail

      case 'COLOR_TAP_NEGATIVE':
        return action.type === 'TAP'

      case 'SEQUENCE':
        return false // handled directly in useGameState

      case 'TAP_ZONE':
        return action.type === 'TAP' // validation in component via emit

      case 'SIZE_TAP':
        return action.type === 'TAP' // validation in component via emit

      case 'SWIPE_MATCH':
        return (
          action.type === 'SWIPE' && action.direction === mission.swipeDirection
        )

      case 'DOUBLE_SWIPE':
        return false // handled directly in useGameState (swipe counting)

      case 'ODD_ONE_OUT':
        return action.type === 'TAP' // validation in component via emit

      case 'MATH_TAP':
        return action.type === 'TAP' // validation in component via emit

      case 'MIRROR_SWIPE':
        return (
          action.type === 'SWIPE' && action.direction === mission.swipeDirection
        )

      case 'QUICK_TAP':
        return action.type === 'TAP' // validation in component via emit

      case 'CATCH':
        return false // handled in component (only target tap succeeds), ignore raw taps

      case 'COUNT_TAP':
        return false // handled directly in useGameState (exact tap counting)

      case 'PATTERN_TAP':
        return false // handled directly in useGameState (step tracking)

      case 'SIMON':
        return false // handled directly in useGameState (step tracking + playback guard)

      case 'FAKE_OUT':
        return (
          action.type === 'SWIPE' && action.direction === mission.swipeDirection
        )

      case 'DRAG_TO':
        return false // handled entirely in component (stopPropagation)

      case 'PINCH':
        return false // handled entirely in component (multi-touch, stopPropagation)

      case 'ROTATE':
        return false // handled entirely in component (multi-touch, stopPropagation)

      case 'COLOR_SWIPE':
        return (
          action.type === 'SWIPE' && action.direction === mission.swipeDirection
        )

      case 'HOLD_AND_TAP':
        return false // handled entirely in component (multi-touch, stopPropagation)

      case 'DUAL_SWIPE':
        return false // handled entirely in component (multi-touch, stopPropagation)

      case 'RHYTHM':
        return false // handled entirely in component (timing, stopPropagation)

      case 'TUNE':
        return false // handled entirely in component (continuous drag, stopPropagation)

      case 'POWER_UP':
        return false // handled entirely in component (alternating swipes, stopPropagation)

      case 'WIRE_CUT':
        return action.type === 'TAP' // validation in component via emit

      case 'STATIC_CLEAR':
        return false // handled entirely in component (touch distance, stopPropagation)

      case 'BROADCAST':
        return false // handled entirely in component (release timing, stopPropagation)

      case 'SCAN':
        return false // handled in component (blip taps via pointerdown)

      case 'SHELTER':
        return false // handled entirely in component (spatial tap, stopPropagation)

      case 'MORSE':
        return false // handled entirely in component (tap duration, stopPropagation)

      default:
        return false
    }
  }

  return { validate }
}
