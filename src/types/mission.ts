import type { Difficulty, MissionColor, SequenceStep, SwipeDirection } from './game'

const DIRECTION_ICONS: Record<SwipeDirection, string> = {
  UP: '↑',
  DOWN: '↓',
  LEFT: '←',
  RIGHT: '→',
}

export type MissionType =
  | 'COLOR_TAP'
  | 'SWIPE'
  | 'REVERSE_SWIPE'
  | 'MULTI_TAP'
  | 'LONG_PRESS'
  | 'DUAL_TAP'
  | 'DO_NOTHING'
  | 'COLOR_TAP_NEGATIVE'
  | 'SEQUENCE'
  | 'TAP_ZONE'
  | 'SIZE_TAP'
  | 'SWIPE_MATCH'
  | 'DOUBLE_SWIPE'
  | 'ODD_ONE_OUT'
  | 'MATH_TAP'
  | 'MIRROR_SWIPE'
  | 'QUICK_TAP'
  | 'CATCH'
  | 'COUNT_TAP'
  | 'PATTERN_TAP'
  | 'SIMON'
  | 'FAKE_OUT'
  | 'DRAG_TO'
  | 'PINCH'
  | 'ROTATE'
  | 'COLOR_SWIPE'
  | 'HOLD_AND_TAP'
  | 'DUAL_SWIPE'
  | 'RHYTHM'
  | 'TUNE'
  | 'POWER_UP'
  | 'WIRE_CUT'
  | 'STATIC_CLEAR'
  | 'BROADCAST'
  | 'SCAN'
  | 'SHELTER'
  | 'MORSE'
  | 'HEARTBEAT'
  | 'VENT'
  | 'FLICKER_TAP'
  | 'DECRYPT'
  | 'GEIGER'
  | 'LOCKPICK'
  | 'DECONTAM'
  | 'BLOOD_TYPE'
  | 'POWER_GRID'
  | 'DEFUSE'
  | 'TRIAGE'
  | 'PARADROP'
  | 'QUARANTINE'
  | 'DEAD_DROP'
  | 'FREQUENCY_JAM'
  | 'SOS_FLASH'
  | 'AIRLOCK'
  | 'RADAR_PING'
  | 'SIPHON'
  | 'FIREWALL'
  | 'COMPASS'
  | 'CRANK'
  | 'RATION'
  | 'DETOX'
  | 'BLACKOUT'
  | 'OVERRIDE'
  | 'PRESSURE'
  | 'SPLICE'
  | 'DISTRESS'
  | 'ELEVATOR'

export type TapZone = 'LEFT' | 'RIGHT'
export type SizeTarget = 'BIG' | 'SMALL'
export type OddVariant = 'color' | 'size' | 'shape'
export type PinchDirection = 'IN' | 'OUT'
export type RotateDirection = 'CW' | 'CCW'

export interface MissionParams {
  type: MissionType
  text: string
  difficulty: Difficulty
  targetColor?: MissionColor
  colors?: MissionColor[]
  swipeDirection?: SwipeDirection
  tapCount?: number
  negative?: boolean
  sequence?: SequenceStep[]
  // TAP_ZONE
  targetZone?: TapZone
  // SIZE_TAP
  targetSize?: SizeTarget
  sizes?: number[]
  // DOUBLE_SWIPE
  swipeCount?: number
  // ODD_ONE_OUT
  oddVariant?: OddVariant
  itemCount?: number
  oddIndex?: number
  // MATH_TAP
  mathExpression?: string
  mathAnswer?: number
  mathChoices?: number[]
  // COUNT_TAP
  countItems?: number
  // PATTERN_TAP
  patternLength?: number
  // SIMON
  simonSequence?: number[]
  simonButtons?: number
  // FAKE_OUT
  fakeText?: string
  // PINCH
  pinchDirection?: PinchDirection
  // ROTATE
  rotateDirection?: RotateDirection
  // COLOR_SWIPE
  colorSwipeRule?: { color: MissionColor; direction: SwipeDirection }[]
  // DUAL_SWIPE
  dualSwipeDirections?: [SwipeDirection, SwipeDirection]
  // RHYTHM
  beatCount?: number
  beatInterval?: number
  // WIRE_CUT
  wireCount?: number
  // MORSE
  morsePattern?: ('DOT' | 'DASH')[]
  // POWER_UP
  requiredSwipes?: number
  // DECRYPT
  decryptScrambled?: string
  decryptAnswer?: string
  decryptChoices?: string[]
  // LOCKPICK
  lockpickSteps?: number
  // DECONTAM
  decontamCount?: number
  // BLOOD_TYPE
  bloodTarget?: string
  bloodChoices?: string[]
  // POWER_GRID
  gridSwitchCount?: number
  // TRIAGE
  triageCount?: number
  // DEAD_DROP
  deadDropCoord?: [number, number]
  deadDropGridSize?: number
  // FIREWALL
  firewallCount?: number
  // RATION
  rationPeople?: number
  rationPerPerson?: number
  rationChoices?: number[]
  // DETOX
  detoxColor?: MissionColor
  detoxChoices?: MissionColor[]
  // OVERRIDE
  overrideCode?: number[]
  // SPLICE
  spliceColors?: MissionColor[]
  // DISTRESS
  distressPattern?: number[]
  // ELEVATOR
  elevatorCurrent?: number
  elevatorTarget?: number
  // CRANK
  crankRotations?: number
}

export interface MissionDefinition {
  type: MissionType
  difficulty: Difficulty
  generate: () => MissionParams
}

const COLOR_NAMES: Record<MissionColor, string> = {
  red: 'RED',
  blue: 'BLUE',
  yellow: 'YELLOW',
  green: 'GREEN',
  purple: 'PURPLE',
}

const ALL_COLORS: MissionColor[] = ['red', 'blue', 'yellow', 'green', 'purple']

const DIRECTION_NAMES: Record<SwipeDirection, string> = {
  UP: '↑ SWIPE',
  DOWN: '↓ SWIPE',
  LEFT: '← SWIPE',
  RIGHT: '→ SWIPE',
}

const OPPOSITE: Record<SwipeDirection, SwipeDirection> = {
  UP: 'DOWN',
  DOWN: 'UP',
  LEFT: 'RIGHT',
  RIGHT: 'LEFT',
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function generateColorChoices(target: MissionColor, count: number): MissionColor[] {
  const others = ALL_COLORS.filter((c) => c !== target)
  const distractors = shuffle(others).slice(0, count - 1)
  return shuffle([target, ...distractors])
}

export const MISSION_REGISTRY: MissionDefinition[] = [
  // COLOR_TAP - EASY
  {
    type: 'COLOR_TAP',
    difficulty: 'EASY',
    generate() {
      const target = pickRandom(ALL_COLORS)
      return {
        type: 'COLOR_TAP',
        difficulty: 'EASY',
        text: `${COLOR_NAMES[target]} TAP`,
        targetColor: target,
        colors: generateColorChoices(target, 3),
      }
    },
  },
  // SWIPE - EASY
  {
    type: 'SWIPE',
    difficulty: 'EASY',
    generate() {
      const dir = pickRandom<SwipeDirection>(['UP', 'DOWN', 'LEFT', 'RIGHT'])
      return {
        type: 'SWIPE',
        difficulty: 'EASY',
        text: DIRECTION_NAMES[dir],
        swipeDirection: dir,
      }
    },
  },
  // REVERSE_SWIPE - NORMAL
  {
    type: 'REVERSE_SWIPE',
    difficulty: 'NORMAL',
    generate() {
      const dir = pickRandom<SwipeDirection>(['UP', 'DOWN', 'LEFT', 'RIGHT'])
      return {
        type: 'REVERSE_SWIPE',
        difficulty: 'NORMAL',
        text: `REVERSE ${DIRECTION_NAMES[dir]}`,
        swipeDirection: OPPOSITE[dir],
      }
    },
  },
  // MULTI_TAP - NORMAL
  {
    type: 'MULTI_TAP',
    difficulty: 'NORMAL',
    generate() {
      const count = pickRandom([5, 7, 10])
      return {
        type: 'MULTI_TAP',
        difficulty: 'NORMAL',
        text: `TAP x${count}`,
        tapCount: count,
      }
    },
  },
  // LONG_PRESS - NORMAL
  {
    type: 'LONG_PRESS',
    difficulty: 'NORMAL',
    generate() {
      return {
        type: 'LONG_PRESS',
        difficulty: 'NORMAL',
        text: 'HOLD',
      }
    },
  },
  // DUAL_TAP - HARD
  {
    type: 'DUAL_TAP',
    difficulty: 'HARD',
    generate() {
      return {
        type: 'DUAL_TAP',
        difficulty: 'HARD',
        text: 'DUAL TAP',
      }
    },
  },
  // DOUBLE_TAP (MULTI_TAP tapCount=2) - EASY
  {
    type: 'MULTI_TAP',
    difficulty: 'EASY',
    generate() {
      return {
        type: 'MULTI_TAP',
        difficulty: 'EASY',
        text: 'TAP x2',
        tapCount: 2,
      }
    },
  },
  // DO_NOTHING - HARD
  {
    type: 'DO_NOTHING',
    difficulty: 'HARD',
    generate() {
      return {
        type: 'DO_NOTHING',
        difficulty: 'HARD',
        text: 'STANDBY',
      }
    },
  },
  // COLOR_TAP_NEGATIVE - HARD
  {
    type: 'COLOR_TAP_NEGATIVE',
    difficulty: 'HARD',
    generate() {
      const target = pickRandom(ALL_COLORS)
      return {
        type: 'COLOR_TAP_NEGATIVE',
        difficulty: 'HARD',
        text: `NOT ${COLOR_NAMES[target]}`,
        targetColor: target,
        colors: shuffle(ALL_COLORS),
        negative: true,
      }
    },
  },
  // SEQUENCE - HARD
  {
    type: 'SEQUENCE',
    difficulty: 'HARD',
    generate() {
      const actions: SequenceStep[] = []
      const pool: SequenceStep[] = [
        { action: 'TAP' },
        { action: 'SWIPE', direction: 'UP' },
        { action: 'SWIPE', direction: 'DOWN' },
        { action: 'SWIPE', direction: 'LEFT' },
        { action: 'SWIPE', direction: 'RIGHT' },
      ]
      const stepCount = pickRandom([2, 3])
      for (let i = 0; i < stepCount; i++) {
        actions.push(pickRandom(pool))
      }
      const text = actions
        .map((s) => (s.action === 'TAP' ? '■' : DIRECTION_ICONS[s.direction]))
        .join(' → ')
      return {
        type: 'SEQUENCE',
        difficulty: 'HARD',
        text,
        sequence: actions,
      }
    },
  },
  // TAP_ZONE - EASY
  {
    type: 'TAP_ZONE',
    difficulty: 'EASY',
    generate() {
      const zone = pickRandom<TapZone>(['LEFT', 'RIGHT'])
      return {
        type: 'TAP_ZONE',
        difficulty: 'EASY',
        text: zone === 'LEFT' ? '◀ LEFT' : 'RIGHT ▶',
        targetZone: zone,
      }
    },
  },
  // SIZE_TAP - EASY
  {
    type: 'SIZE_TAP',
    difficulty: 'EASY',
    generate() {
      const target = pickRandom<SizeTarget>(['BIG', 'SMALL'])
      const count = pickRandom([2, 3])
      // 겹치지 않는 크기 생성 (40~100px 범위, 최소 20px 차이)
      const baseSizes = shuffle([40, 56, 72, 88, 100]).slice(0, count)
      baseSizes.sort((a, b) => a - b)
      return {
        type: 'SIZE_TAP',
        difficulty: 'EASY',
        text: target === 'BIG' ? 'TAP MAX' : 'TAP MIN',
        targetSize: target,
        sizes: shuffle(baseSizes),
      }
    },
  },
  // SWIPE_MATCH - EASY
  {
    type: 'SWIPE_MATCH',
    difficulty: 'EASY',
    generate() {
      const dir = pickRandom<SwipeDirection>(['UP', 'DOWN', 'LEFT', 'RIGHT'])
      return {
        type: 'SWIPE_MATCH',
        difficulty: 'EASY',
        text: '',
        swipeDirection: dir,
      }
    },
  },
  // DOUBLE_SWIPE - EASY
  {
    type: 'DOUBLE_SWIPE',
    difficulty: 'EASY',
    generate() {
      const dir = pickRandom<SwipeDirection>(['UP', 'DOWN', 'LEFT', 'RIGHT'])
      return {
        type: 'DOUBLE_SWIPE',
        difficulty: 'EASY',
        text: `${DIRECTION_ICONS[dir]} x2`,
        swipeDirection: dir,
        swipeCount: 2,
      }
    },
  },
  // ODD_ONE_OUT - NORMAL
  {
    type: 'ODD_ONE_OUT',
    difficulty: 'NORMAL',
    generate() {
      const variant = pickRandom<OddVariant>(['color', 'size', 'shape'])
      const count = pickRandom([4, 5, 6])
      const oddIdx = Math.floor(Math.random() * count)
      return {
        type: 'ODD_ONE_OUT',
        difficulty: 'NORMAL',
        text: 'ANOMALY DETECT',
        oddVariant: variant,
        itemCount: count,
        oddIndex: oddIdx,
      }
    },
  },
  // MATH_TAP - HARD
  {
    type: 'MATH_TAP',
    difficulty: 'HARD',
    generate() {
      const ops = ['+', '-'] as const
      const op = pickRandom([...ops])
      let a: number, b: number, answer: number
      if (op === '+') {
        a = Math.floor(Math.random() * 8) + 1 // 1~8
        b = Math.floor(Math.random() * 8) + 1
        answer = a + b
      } else {
        a = Math.floor(Math.random() * 8) + 3 // 3~10
        b = Math.floor(Math.random() * (a - 1)) + 1 // 1~(a-1), 결과 항상 양수
        answer = a - b
      }
      // 오답 생성: 정답 근처 값 (겹치지 않게)
      const wrongSet = new Set<number>()
      while (wrongSet.size < 2) {
        const offset = pickRandom([-3, -2, -1, 1, 2, 3])
        const wrong = answer + offset
        if (wrong !== answer && wrong > 0) wrongSet.add(wrong)
      }
      const choices = shuffle([answer, ...wrongSet])
      return {
        type: 'MATH_TAP',
        difficulty: 'HARD',
        text: `${a} ${op} ${b} = ?`,
        mathExpression: `${a} ${op} ${b}`,
        mathAnswer: answer,
        mathChoices: choices,
      }
    },
  },
  // MIRROR_SWIPE - HARD
  {
    type: 'MIRROR_SWIPE',
    difficulty: 'HARD',
    generate() {
      // 좌우만 반전, 상하는 그대로
      const dir = pickRandom<SwipeDirection>(['UP', 'DOWN', 'LEFT', 'RIGHT'])
      const MIRROR: Record<SwipeDirection, SwipeDirection> = {
        UP: 'UP',
        DOWN: 'DOWN',
        LEFT: 'RIGHT',
        RIGHT: 'LEFT',
      }
      return {
        type: 'MIRROR_SWIPE',
        difficulty: 'HARD',
        text: `MIRROR ${DIRECTION_NAMES[dir]}`,
        swipeDirection: MIRROR[dir],
      }
    },
  },
  // QUICK_TAP - EASY
  {
    type: 'QUICK_TAP',
    difficulty: 'EASY',
    generate() {
      return {
        type: 'QUICK_TAP',
        difficulty: 'EASY',
        text: 'NOW!',
      }
    },
  },
  // CATCH - EASY
  {
    type: 'CATCH',
    difficulty: 'EASY',
    generate() {
      return {
        type: 'CATCH',
        difficulty: 'EASY',
        text: 'INTERCEPT',
      }
    },
  },
  // COUNT_TAP - NORMAL
  {
    type: 'COUNT_TAP',
    difficulty: 'NORMAL',
    generate() {
      const count = pickRandom([2, 3, 4, 5])
      return {
        type: 'COUNT_TAP',
        difficulty: 'NORMAL',
        text: 'COUNT & TAP',
        tapCount: count,
        countItems: count,
      }
    },
  },
  // PATTERN_TAP - NORMAL
  {
    type: 'PATTERN_TAP',
    difficulty: 'NORMAL',
    generate() {
      const length = pickRandom([2, 3])
      return {
        type: 'PATTERN_TAP',
        difficulty: 'NORMAL',
        text: 'SEQUENCE',
        patternLength: length,
      }
    },
  },
  // SIMON - HARD
  {
    type: 'SIMON',
    difficulty: 'HARD',
    generate() {
      const btnCount = 4
      const seqLength = pickRandom([2, 3])
      const seq: number[] = []
      for (let i = 0; i < seqLength; i++) {
        seq.push(Math.floor(Math.random() * btnCount))
      }
      return {
        type: 'SIMON',
        difficulty: 'HARD',
        text: 'MEMORIZE',
        simonSequence: seq,
        simonButtons: btnCount,
      }
    },
  },
  // FAKE_OUT - HARD
  {
    type: 'FAKE_OUT',
    difficulty: 'HARD',
    generate() {
      const dirs: SwipeDirection[] = ['UP', 'DOWN', 'LEFT', 'RIGHT']
      const realDir = pickRandom(dirs)
      const fakeDir = pickRandom(dirs.filter(d => d !== realDir))
      return {
        type: 'FAKE_OUT',
        difficulty: 'HARD',
        text: '',
        swipeDirection: realDir,
        fakeText: DIRECTION_NAMES[fakeDir],
      }
    },
  },
  // DRAG_TO - EASY
  {
    type: 'DRAG_TO',
    difficulty: 'EASY',
    generate() {
      return {
        type: 'DRAG_TO',
        difficulty: 'EASY',
        text: 'DRAG',
      }
    },
  },
  // PINCH - NORMAL
  {
    type: 'PINCH',
    difficulty: 'NORMAL',
    generate() {
      const dir = pickRandom<PinchDirection>(['IN', 'OUT'])
      return {
        type: 'PINCH',
        difficulty: 'NORMAL',
        text: dir === 'IN' ? 'PINCH IN' : 'PINCH OUT',
        pinchDirection: dir,
      }
    },
  },
  // ROTATE - NORMAL
  {
    type: 'ROTATE',
    difficulty: 'NORMAL',
    generate() {
      const dir = pickRandom<RotateDirection>(['CW', 'CCW'])
      return {
        type: 'ROTATE',
        difficulty: 'NORMAL',
        text: dir === 'CW' ? 'ROTATE ↻' : 'ROTATE ↺',
        rotateDirection: dir,
      }
    },
  },
  // COLOR_SWIPE - NORMAL
  {
    type: 'COLOR_SWIPE',
    difficulty: 'NORMAL',
    generate() {
      const colors = shuffle<MissionColor>(['red', 'blue', 'yellow', 'green']).slice(0, 2)
      const dirs = shuffle<SwipeDirection>(['UP', 'DOWN', 'LEFT', 'RIGHT']).slice(0, 2)
      const rule = colors.map((c, i) => ({ color: c, direction: dirs[i] }))
      const targetIdx = Math.random() < 0.5 ? 0 : 1
      return {
        type: 'COLOR_SWIPE',
        difficulty: 'NORMAL',
        text: '',
        swipeDirection: dirs[targetIdx],
        targetColor: colors[targetIdx],
        colorSwipeRule: rule,
      }
    },
  },
  // HOLD_AND_TAP - NORMAL
  {
    type: 'HOLD_AND_TAP',
    difficulty: 'NORMAL',
    generate() {
      return {
        type: 'HOLD_AND_TAP',
        difficulty: 'NORMAL',
        text: 'HOLD + TAP',
      }
    },
  },
  // DUAL_SWIPE - HARD
  {
    type: 'DUAL_SWIPE',
    difficulty: 'HARD',
    generate() {
      const pairs: [SwipeDirection, SwipeDirection][] = [
        ['UP', 'DOWN'], ['DOWN', 'UP'],
        ['LEFT', 'RIGHT'], ['RIGHT', 'LEFT'],
      ]
      const pair = pickRandom(pairs)
      const ARROW: Record<SwipeDirection, string> = { UP: '↑', DOWN: '↓', LEFT: '←', RIGHT: '→' }
      return {
        type: 'DUAL_SWIPE',
        difficulty: 'HARD',
        text: `${ARROW[pair[0]]}${ARROW[pair[1]]} DUAL`,
        dualSwipeDirections: pair,
      }
    },
  },
  // RHYTHM - HARD
  {
    type: 'RHYTHM',
    difficulty: 'HARD',
    generate() {
      const count = pickRandom([2, 3])
      return {
        type: 'RHYTHM',
        difficulty: 'HARD',
        text: 'SYNC PULSE',
        beatCount: count,
        beatInterval: 700,
      }
    },
  },
  // TUNE - NORMAL
  {
    type: 'TUNE',
    difficulty: 'NORMAL',
    generate() {
      return {
        type: 'TUNE',
        difficulty: 'NORMAL',
        text: 'TUNE FREQ',
      }
    },
  },
  // POWER_UP - NORMAL
  {
    type: 'POWER_UP',
    difficulty: 'NORMAL',
    generate() {
      const swipes = pickRandom([4, 5, 6])
      return {
        type: 'POWER_UP',
        difficulty: 'NORMAL',
        text: 'CHARGE',
        requiredSwipes: swipes,
      }
    },
  },
  // WIRE_CUT - HARD
  {
    type: 'WIRE_CUT',
    difficulty: 'HARD',
    generate() {
      const count = pickRandom([2, 3])
      return {
        type: 'WIRE_CUT',
        difficulty: 'HARD',
        text: 'DISARM',
        wireCount: count,
      }
    },
  },
  // STATIC_CLEAR - EASY
  {
    type: 'STATIC_CLEAR',
    difficulty: 'EASY',
    generate() {
      return {
        type: 'STATIC_CLEAR',
        difficulty: 'EASY',
        text: 'CLEAR STATIC',
      }
    },
  },
  // BROADCAST - HARD
  {
    type: 'BROADCAST',
    difficulty: 'HARD',
    generate() {
      return {
        type: 'BROADCAST',
        difficulty: 'HARD',
        text: 'BROADCAST',
      }
    },
  },
  // SCAN - EASY
  {
    type: 'SCAN',
    difficulty: 'EASY',
    generate() {
      return {
        type: 'SCAN',
        difficulty: 'EASY',
        text: 'SCAN',
      }
    },
  },
  // SHELTER - NORMAL
  {
    type: 'SHELTER',
    difficulty: 'NORMAL',
    generate() {
      return {
        type: 'SHELTER',
        difficulty: 'NORMAL',
        text: 'EVACUATE',
      }
    },
  },
  // MORSE - HARD
  {
    type: 'MORSE',
    difficulty: 'HARD',
    generate() {
      const patterns: ('DOT' | 'DASH')[][] = [
        ['DOT', 'DOT', 'DOT'],
        ['DASH', 'DASH', 'DASH'],
        ['DOT', 'DASH'],
        ['DASH', 'DOT'],
        ['DOT', 'DOT', 'DASH'],
      ]
      const pat = pickRandom(patterns)
      return {
        type: 'MORSE',
        difficulty: 'HARD',
        text: 'MORSE CODE',
        morsePattern: pat,
      }
    },
  },
  // HEARTBEAT - EASY
  {
    type: 'HEARTBEAT',
    difficulty: 'EASY',
    generate() {
      return {
        type: 'HEARTBEAT',
        difficulty: 'EASY',
        text: 'REVIVE',
      }
    },
  },
  // VENT - EASY
  {
    type: 'VENT',
    difficulty: 'EASY',
    generate() {
      return {
        type: 'VENT',
        difficulty: 'EASY',
        text: '↑ VENT',
        swipeDirection: 'UP' as SwipeDirection,
      }
    },
  },
  // FLICKER_TAP - EASY
  {
    type: 'FLICKER_TAP',
    difficulty: 'EASY',
    generate() {
      return {
        type: 'FLICKER_TAP',
        difficulty: 'EASY',
        text: 'CATCH SIGNAL',
      }
    },
  },
  // DECRYPT - NORMAL
  {
    type: 'DECRYPT',
    difficulty: 'NORMAL',
    generate() {
      const words = ['EVAC', 'HELP', 'SAFE', 'OPEN', 'EXIT', 'FUEL', 'SEND', 'MOVE']
      const word = pickRandom(words)
      const idx = Math.floor(Math.random() * word.length)
      const answer = word[idx]
      const scrambled = word.split('').map((c, i) => (i === idx ? '▒' : c)).join('')
      const wrongLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').filter(c => c !== answer)
      const choices = shuffle([answer, ...shuffle(wrongLetters).slice(0, 2)])
      return {
        type: 'DECRYPT',
        difficulty: 'NORMAL',
        text: 'DECRYPT',
        decryptScrambled: scrambled,
        decryptAnswer: answer,
        decryptChoices: choices,
      }
    },
  },
  // GEIGER - NORMAL
  {
    type: 'GEIGER',
    difficulty: 'NORMAL',
    generate() {
      return {
        type: 'GEIGER',
        difficulty: 'NORMAL',
        text: 'MARK HOTSPOT',
      }
    },
  },
  // LOCKPICK - NORMAL
  {
    type: 'LOCKPICK',
    difficulty: 'NORMAL',
    generate() {
      const steps = pickRandom([2, 3])
      return {
        type: 'LOCKPICK',
        difficulty: 'NORMAL',
        text: 'UNLOCK',
        lockpickSteps: steps,
      }
    },
  },
  // DECONTAM - NORMAL
  {
    type: 'DECONTAM',
    difficulty: 'NORMAL',
    generate() {
      const count = pickRandom([2, 3, 4])
      return {
        type: 'DECONTAM',
        difficulty: 'NORMAL',
        text: 'DECONTAM',
        decontamCount: count,
      }
    },
  },
  // BLOOD_TYPE - NORMAL
  {
    type: 'BLOOD_TYPE',
    difficulty: 'NORMAL',
    generate() {
      const types = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']
      const target = pickRandom(types)
      const others = types.filter(t => t !== target)
      const choices = shuffle([target, ...shuffle(others).slice(0, 2)])
      return {
        type: 'BLOOD_TYPE',
        difficulty: 'NORMAL',
        text: `MATCH ${target}`,
        bloodTarget: target,
        bloodChoices: choices,
      }
    },
  },
  // POWER_GRID - NORMAL
  {
    type: 'POWER_GRID',
    difficulty: 'NORMAL',
    generate() {
      const count = pickRandom([3, 4])
      return {
        type: 'POWER_GRID',
        difficulty: 'NORMAL',
        text: 'RESTORE POWER',
        gridSwitchCount: count,
      }
    },
  },
  // DEFUSE - HARD
  {
    type: 'DEFUSE',
    difficulty: 'HARD',
    generate() {
      const count = pickRandom([3, 4])
      return {
        type: 'DEFUSE',
        difficulty: 'HARD',
        text: 'DEFUSE',
        wireCount: count,
      }
    },
  },
  // TRIAGE - HARD
  {
    type: 'TRIAGE',
    difficulty: 'HARD',
    generate() {
      const count = pickRandom([3, 4])
      return {
        type: 'TRIAGE',
        difficulty: 'HARD',
        text: 'TRIAGE',
        triageCount: count,
      }
    },
  },
  // PARADROP - HARD
  {
    type: 'PARADROP',
    difficulty: 'HARD',
    generate() {
      const windDir = pickRandom<SwipeDirection>(['UP', 'DOWN', 'LEFT', 'RIGHT'])
      return {
        type: 'PARADROP',
        difficulty: 'HARD',
        text: 'PARADROP',
        swipeDirection: OPPOSITE[windDir],
      }
    },
  },
  // QUARANTINE - HARD
  {
    type: 'QUARANTINE',
    difficulty: 'HARD',
    generate() {
      return {
        type: 'QUARANTINE',
        difficulty: 'HARD',
        text: 'QUARANTINE',
      }
    },
  },
  // DEAD_DROP - HARD
  {
    type: 'DEAD_DROP',
    difficulty: 'HARD',
    generate() {
      const size = 3
      const row = Math.floor(Math.random() * size)
      const col = Math.floor(Math.random() * size)
      return {
        type: 'DEAD_DROP',
        difficulty: 'HARD',
        text: `GRID ${col + 1},${row + 1}`,
        deadDropCoord: [row, col],
        deadDropGridSize: size,
      }
    },
  },
  // FREQUENCY_JAM - HARD
  {
    type: 'FREQUENCY_JAM',
    difficulty: 'HARD',
    generate() {
      return {
        type: 'FREQUENCY_JAM',
        difficulty: 'HARD',
        text: 'JAM SIGNAL',
      }
    },
  },
  // SOS_FLASH - EASY
  {
    type: 'SOS_FLASH',
    difficulty: 'EASY',
    generate() {
      return {
        type: 'SOS_FLASH',
        difficulty: 'EASY',
        text: 'SOS',
      }
    },
  },
  // AIRLOCK - EASY
  {
    type: 'AIRLOCK',
    difficulty: 'EASY',
    generate() {
      return {
        type: 'AIRLOCK',
        difficulty: 'EASY',
        text: 'AIRLOCK',
      }
    },
  },
  // RADAR_PING - EASY
  {
    type: 'RADAR_PING',
    difficulty: 'EASY',
    generate() {
      return {
        type: 'RADAR_PING',
        difficulty: 'EASY',
        text: 'PING',
      }
    },
  },
  // SIPHON - NORMAL
  {
    type: 'SIPHON',
    difficulty: 'NORMAL',
    generate() {
      return {
        type: 'SIPHON',
        difficulty: 'NORMAL',
        text: 'SIPHON FUEL',
      }
    },
  },
  // FIREWALL - NORMAL
  {
    type: 'FIREWALL',
    difficulty: 'NORMAL',
    generate() {
      const count = pickRandom([2, 3])
      return {
        type: 'FIREWALL',
        difficulty: 'NORMAL',
        text: 'BLOCK VIRUS',
        firewallCount: count,
      }
    },
  },
  // COMPASS - NORMAL
  {
    type: 'COMPASS',
    difficulty: 'NORMAL',
    generate() {
      const dir = pickRandom<SwipeDirection>(['UP', 'DOWN', 'LEFT', 'RIGHT'])
      return {
        type: 'COMPASS',
        difficulty: 'NORMAL',
        text: 'FOLLOW COMPASS',
        swipeDirection: dir,
      }
    },
  },
  // CRANK - NORMAL
  {
    type: 'CRANK',
    difficulty: 'NORMAL',
    generate() {
      const rotations = pickRandom([2, 3])
      return {
        type: 'CRANK',
        difficulty: 'NORMAL',
        text: 'CRANK',
        crankRotations: rotations,
      }
    },
  },
  // RATION - NORMAL
  {
    type: 'RATION',
    difficulty: 'NORMAL',
    generate() {
      const people = pickRandom([2, 3, 4])
      const per = pickRandom([2, 3])
      const answer = people * per
      const wrongSet = new Set<number>()
      while (wrongSet.size < 2) {
        const offset = pickRandom([-2, -1, 1, 2, 3])
        const wrong = answer + offset
        if (wrong !== answer && wrong > 0) wrongSet.add(wrong)
      }
      return {
        type: 'RATION',
        difficulty: 'NORMAL',
        text: `${people}人 × ${per}EA`,
        rationPeople: people,
        rationPerPerson: per,
        rationChoices: shuffle([answer, ...wrongSet]),
      }
    },
  },
  // DETOX - NORMAL
  {
    type: 'DETOX',
    difficulty: 'NORMAL',
    generate() {
      const target = pickRandom(ALL_COLORS)
      const choices = shuffle(ALL_COLORS).slice(0, 3)
      if (!choices.includes(target)) choices[0] = target
      return {
        type: 'DETOX',
        difficulty: 'NORMAL',
        text: `${COLOR_NAMES[target]} DETOX`,
        detoxColor: target,
        detoxChoices: shuffle(choices),
      }
    },
  },
  // BLACKOUT - HARD
  {
    type: 'BLACKOUT',
    difficulty: 'HARD',
    generate() {
      return {
        type: 'BLACKOUT',
        difficulty: 'HARD',
        text: 'BLACKOUT',
      }
    },
  },
  // OVERRIDE - HARD
  {
    type: 'OVERRIDE',
    difficulty: 'HARD',
    generate() {
      const code: number[] = []
      for (let i = 0; i < 4; i++) {
        code.push(Math.floor(Math.random() * 10))
      }
      return {
        type: 'OVERRIDE',
        difficulty: 'HARD',
        text: 'OVERRIDE',
        overrideCode: code,
      }
    },
  },
  // PRESSURE - HARD
  {
    type: 'PRESSURE',
    difficulty: 'HARD',
    generate() {
      return {
        type: 'PRESSURE',
        difficulty: 'HARD',
        text: 'PRESSURE',
      }
    },
  },
  // SPLICE - HARD
  {
    type: 'SPLICE',
    difficulty: 'HARD',
    generate() {
      const colors = shuffle<MissionColor>(['red', 'blue', 'green']).slice(0, 3)
      return {
        type: 'SPLICE',
        difficulty: 'HARD',
        text: 'SPLICE',
        spliceColors: colors,
      }
    },
  },
  // DISTRESS - HARD
  {
    type: 'DISTRESS',
    difficulty: 'HARD',
    generate() {
      // 불규칙 간격 패턴 (ms)
      const patterns: number[][] = [
        [400, 800],
        [300, 600, 300],
        [500, 500],
        [200, 700, 400],
      ]
      return {
        type: 'DISTRESS',
        difficulty: 'HARD',
        text: 'DISTRESS',
        distressPattern: pickRandom(patterns),
      }
    },
  },
  // ELEVATOR - HARD
  {
    type: 'ELEVATOR',
    difficulty: 'HARD',
    generate() {
      const current = pickRandom([1, 2, 3, 4, 5])
      let target: number
      do {
        target = pickRandom([1, 2, 3, 4, 5])
      } while (target === current)
      return {
        type: 'ELEVATOR',
        difficulty: 'HARD',
        text: `FLOOR ${target}`,
        elevatorCurrent: current,
        elevatorTarget: target,
      }
    },
  },
]
