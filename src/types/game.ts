export type GamePhase =
  | 'IDLE'
  | 'SHOWING'
  | 'ACTING'
  | 'SUCCESS'
  | 'FAIL'
  | 'GAME_OVER'

export type InputAction =
  | { type: 'TAP'; x: number; y: number }
  | { type: 'SWIPE'; direction: SwipeDirection }
  | { type: 'LONG_PRESS' }
  | { type: 'MULTI_TAP'; count: number }
  | { type: 'DUAL_TAP' }

export type SwipeDirection = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'

export type Difficulty = 'EASY' | 'NORMAL' | 'HARD'

export type MissionColor = 'red' | 'blue' | 'yellow' | 'green' | 'purple'

export type SequenceStep =
  | { action: 'TAP' }
  | { action: 'SWIPE'; direction: SwipeDirection }

export interface ScoreRecord {
  score: number
  date: number
}
