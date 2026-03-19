import type { Difficulty, MissionColor, SequenceStep, SwipeDirection } from './game'

const DIRECTION_ICONS: Record<SwipeDirection, string> = {
  UP: '위',
  DOWN: '아래',
  LEFT: '왼쪽',
  RIGHT: '오른쪽',
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
}

export interface MissionDefinition {
  type: MissionType
  difficulty: Difficulty
  generate: () => MissionParams
}

const COLOR_NAMES: Record<MissionColor, string> = {
  red: '빨간색',
  blue: '파란색',
  yellow: '노란색',
  green: '초록색',
  purple: '보라색',
}

const ALL_COLORS: MissionColor[] = ['red', 'blue', 'yellow', 'green', 'purple']

const DIRECTION_NAMES: Record<SwipeDirection, string> = {
  UP: '위로!',
  DOWN: '아래로!',
  LEFT: '왼쪽으로!',
  RIGHT: '오른쪽으로!',
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
        text: `${COLOR_NAMES[target]} 탭!`,
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
        text: `반대로! ${DIRECTION_NAMES[dir]}`,
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
        text: `${count}번 탭!`,
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
        text: '길게 눌러!',
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
        text: '둘 다 탭!',
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
        text: '2번 탭!',
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
        text: '누르지 마!',
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
        text: `${COLOR_NAMES[target]} 빼고 탭!`,
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
        .map((s) => (s.action === 'TAP' ? '탭' : DIRECTION_ICONS[s.direction]))
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
        text: zone === 'LEFT' ? '왼쪽!' : '오른쪽!',
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
        text: target === 'BIG' ? '큰 거 탭!' : '작은 거 탭!',
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
        text: `${DIRECTION_ICONS[dir]}로 2번!`,
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
        text: '다른 거 탭!',
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
        text: `거울! ${DIRECTION_NAMES[dir]}`,
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
        text: '지금!',
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
        text: '잡아!',
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
        text: '몇 개? 탭으로!',
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
        text: '순서대로!',
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
        text: '기억해!',
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
        text: '끌어!',
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
        text: dir === 'IN' ? '오므려!' : '벌려!',
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
        text: dir === 'CW' ? '시계방향!' : '반시계!',
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
        text: '꾹 + 탭!',
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
        text: `${ARROW[pair[0]]}${ARROW[pair[1]]} 동시!`,
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
        text: '박자 맞춰!',
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
        text: '주파수 맞춰!',
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
        text: '충전!',
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
        text: '해체!',
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
        text: '잡음 제거!',
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
        text: '신호 보내!',
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
        text: '스캔!',
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
        text: '대피!',
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
        text: '모스 부호!',
        morsePattern: pat,
      }
    },
  },
]
