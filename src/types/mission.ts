import type { Difficulty, MissionColor, SwipeDirection } from './game'

const DIRECTION_ICONS: Record<SwipeDirection, string> = {
  UP: '↑',
  DOWN: '↓',
  LEFT: '←',
  RIGHT: '→',
}

export type MissionType =
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
  | 'SCRAMBLE'
  | 'SIGNAL_INTERCEPT'
  | 'PURIFY'
  | 'BARTER'
  | 'FORAGE'
  | 'DEGAUSS'
  | 'REBOOT'
  | 'IGNITE'
  | 'BIOS_ERROR'
  | 'MUTANT_DETECT'
  | 'CALIBRATE'
  | 'FUSE_REPLACE'
  | 'TRUST_KNOCK'
  | 'COUNTDOWN_ZERO'
  | 'INFECTED_SCAN'
  | 'CURFEW'
  | 'BLACKBOX'
  | 'DEFRAG'
  | 'FALLOUT_DODGE'
  | 'TRIPWIRE'
  | 'WELD'
  | 'CRANK_START'
  | 'RATION_SPLIT'
  | 'NOISE_JAM'
  | 'PACKET_SNIFF'
  | 'BOOT_SEQUENCE'
  | 'PIXEL_FIX'
  | 'ANTENNA_ALIGN'
  | 'TRANSFUSE'
  | 'PULSE_CHECK'
  | 'SPLINT'
  | 'ANTIDOTE'
  | 'RELOAD'
  | 'SCOPE'
  | 'GRENADE_PIN'
  | 'BARRICADE'
  | 'FLARE_LAUNCH'
  | 'WATER_LEVEL'
  | 'BRIDGE_CROSS'
  | 'DUST_STORM'
  | 'INTERLACE'
  | 'VSYNC'
  | 'COLOR_BLEED'
  | 'BURN_IN'
  | 'SEMAPHORE'
  | 'CIPHER_WHEEL'
  | 'BEACON'
  | 'GENERATOR'
  | 'HATCH_SEAL'
  | 'PERIMETER'
  | 'SOLAR_PANEL'
  | 'PH_TEST'
  | 'CENTRIFUGE'
  | 'ISOTOPE'
  | 'AUTOPILOT'
  | 'DOCKING'
  | 'MINEFIELD'
  | 'CAPACITOR'
  | 'SOLDER'
  | 'FIRMWARE'
  | 'TUBE_REPLACE'
  | 'RATION_VOTE'
  | 'SACRIFICE'
  | 'MIMIC'
  | 'KERNEL_PANIC'
  | 'BLUE_SCREEN'
  | 'SEGFAULT'
  | 'TAPE_SPLICE'
  | 'CORE_DUMP'
  | 'SIGNAL_BOOST'
  | 'VOLTAGE_MATCH'
  | 'TOURNIQUET'
  | 'DEFIBRILLATE'
  | 'HAZMAT_SEAL'
  | 'CRYO_THAW'
  | 'OXYGEN_MIX'
  | 'AIRDROP'
  | 'TUNNEL_DIG'
  | 'DEAD_MAN_SWITCH'
  | 'TRAP_ARM'
  | 'THERMAL_SCAN'
  | 'EMP_SHIELD'
  | 'VACCINE_MIX'
  | 'GENE_SPLICE'
  | 'DISTILL'
  | 'PLASMA_CUT'
  | 'FUEL_MIX'
  | 'CLAYMORE_AIM'
  | 'BREACH_CHARGE'
  | 'AMPUTATE'
  | 'DEAD_PIXEL'
  | 'CIRCUIT_BRIDGE'
  | 'MEMORY_LEAK'
  | 'STACK_OVERFLOW'
  | 'BAIT_SET'
  | 'SONAR_PING'
  | 'FREQUENCY_LOCK'


export interface MissionParams {
  type: MissionType
  text: string
  difficulty: Difficulty
  targetColor?: MissionColor
  colors?: MissionColor[]
  swipeDirection?: SwipeDirection
  tapCount?: number
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
  // SCRAMBLE
  scrambleWord?: string
  scrambleLetters?: string[]
  // BARTER
  barterLeft?: number
  barterRight?: number
  barterFair?: boolean
  // BIOS_ERROR
  biosCode?: number[]
  // MUTANT_DETECT
  mutantCount?: number
  mutantIndex?: number
  // FUSE_REPLACE
  fuseCount?: number
  brokenIndex?: number
  // TRUST_KNOCK
  knockPattern?: number[]
  // INFECTED_SCAN
  infectedCount?: number
  infectedIndex?: number
  // IGNITE
  igniteSwipes?: number
  // CRANK_START
  crankStartTarget?: number
  // RATION_SPLIT
  rationSplitTotal?: number
  rationSplitParts?: number
  // BARRICADE
  barricadeCount?: number
  // SEMAPHORE
  semaphoreLeft?: SwipeDirection
  semaphoreRight?: SwipeDirection
}

export interface MissionDefinition {
  type: MissionType
  difficulty: Difficulty
  generate: () => MissionParams
}

const COLOR_NAMES: Record<MissionColor, string> = {
  red: '빨강',
  blue: '파랑',
  yellow: '노랑',
  green: '초록',
  purple: '보라',
}

const ALL_COLORS: MissionColor[] = ['red', 'blue', 'yellow', 'green', 'purple']

const DIRECTION_NAMES: Record<SwipeDirection, string> = {
  UP: '↑ 스와이프',
  DOWN: '↓ 스와이프',
  LEFT: '← 스와이프',
  RIGHT: '→ 스와이프',
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

export const MISSION_REGISTRY: MissionDefinition[] = [
  // TUNE - NORMAL
  {
    type: 'TUNE',
    difficulty: 'NORMAL',
    generate() {
      return {
        type: 'TUNE',
        difficulty: 'NORMAL',
        text: '주파수 조정',
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
        text: '충전',
        requiredSwipes: swipes,
      }
    },
  },
  // WIRE_CUT - HARD
  {
    type: 'WIRE_CUT',
    difficulty: 'HARD',
    generate() {
      const count = pickRandom([3, 4])
      return {
        type: 'WIRE_CUT',
        difficulty: 'HARD',
        text: '해제',
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
        text: '잡음 제거',
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
        text: '방송',
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
        text: '스캔',
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
        text: '대피',
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
        ['DOT', 'DASH', 'DOT'],
        ['DASH', 'DOT', 'DASH'],
        ['DOT', 'DOT', 'DASH'],
        ['DASH', 'DOT', 'DOT'],
        ['DOT', 'DASH', 'DOT', 'DASH'],
        ['DASH', 'DOT', 'DASH', 'DOT'],
        ['DOT', 'DOT', 'DASH', 'DOT'],
      ]
      const pat = pickRandom(patterns)
      return {
        type: 'MORSE',
        difficulty: 'HARD',
        text: '모스 부호',
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
        text: '소생',
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
        text: '↑ 환기',
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
        text: '신호 포착',
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
        text: '복호화',
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
        text: '핫스팟 표시',
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
        text: '잠금 해제',
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
        text: '제독',
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
        text: `${target} 수혈`,
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
        text: '전력 복구',
        gridSwitchCount: count,
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
        text: '분류',
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
        text: '낙하',
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
        text: '격리',
      }
    },
  },
  // DEAD_DROP - HARD
  {
    type: 'DEAD_DROP',
    difficulty: 'HARD',
    generate() {
      const size = 3
      const col = Math.floor(Math.random() * size) + 1
      const row = Math.floor(Math.random() * size) + 1
      return {
        type: 'DEAD_DROP',
        difficulty: 'HARD',
        text: `좌표 ${col},${row}`,
        deadDropCoord: [col, row],
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
        text: '신호 교란',
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
        text: '에어록',
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
        text: '핑',
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
        text: '연료 흡입',
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
        text: '바이러스 차단',
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
        text: '나침반 따라가기',
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
        text: '크랭크',
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
        text: `${people}명 × ${per}개`,
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
        text: `${COLOR_NAMES[target]} 해독`,
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
        text: '정전',
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
        text: '오버라이드',
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
        text: '압력',
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
        text: '접합',
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
        text: '조난',
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
        text: `${target}층`,
        elevatorCurrent: current,
        elevatorTarget: target,
      }
    },
  },
  // SCRAMBLE - HARD
  {
    type: 'SCRAMBLE',
    difficulty: 'HARD',
    generate() {
      const words = ['EVAC', 'HELP', 'SAFE', 'OPEN', 'EXIT', 'FUEL', 'SEND', 'MOVE']
      const word = pickRandom(words)
      const letters = shuffle(word.split(''))
      return {
        type: 'SCRAMBLE',
        difficulty: 'HARD',
        text: '글자 맞추기',
        scrambleWord: word,
        scrambleLetters: letters,
      }
    },
  },
  // SIGNAL_INTERCEPT - NORMAL
  {
    type: 'SIGNAL_INTERCEPT',
    difficulty: 'NORMAL',
    generate() {
      return {
        type: 'SIGNAL_INTERCEPT',
        difficulty: 'NORMAL',
        text: '가로채기',
      }
    },
  },
  // PURIFY - EASY
  {
    type: 'PURIFY',
    difficulty: 'EASY',
    generate() {
      return {
        type: 'PURIFY',
        difficulty: 'EASY',
        text: '정수',
      }
    },
  },
  // BARTER - NORMAL
  {
    type: 'BARTER',
    difficulty: 'NORMAL',
    generate() {
      const left = pickRandom([2, 3, 4, 5])
      const fair = Math.random() < 0.5
      const right = fair ? left : left + pickRandom([-2, -1, 1, 2])
      return {
        type: 'BARTER',
        difficulty: 'NORMAL',
        text: '공정 거래?',
        barterLeft: left,
        barterRight: Math.max(1, right),
        barterFair: fair,
      }
    },
  },
  // FORAGE - EASY
  {
    type: 'FORAGE',
    difficulty: 'EASY',
    generate() {
      return {
        type: 'FORAGE',
        difficulty: 'EASY',
        text: '채집',
      }
    },
  },
  // DEGAUSS - EASY
  {
    type: 'DEGAUSS',
    difficulty: 'EASY',
    generate() {
      return {
        type: 'DEGAUSS',
        difficulty: 'EASY',
        text: '디가우스',
      }
    },
  },
  // REBOOT - EASY
  {
    type: 'REBOOT',
    difficulty: 'EASY',
    generate() {
      return {
        type: 'REBOOT',
        difficulty: 'EASY',
        text: '재부팅?',
      }
    },
  },
  // IGNITE - NORMAL
  {
    type: 'IGNITE',
    difficulty: 'NORMAL',
    generate() {
      const swipes = pickRandom([4, 5, 6])
      return {
        type: 'IGNITE',
        difficulty: 'NORMAL',
        text: '점화',
        igniteSwipes: swipes,
      }
    },
  },
  // BIOS_ERROR - HARD
  {
    type: 'BIOS_ERROR',
    difficulty: 'HARD',
    generate() {
      const length = pickRandom([2, 3])
      const code: number[] = []
      for (let i = 0; i < length; i++) {
        code.push(Math.floor(Math.random() * 4))
      }
      return {
        type: 'BIOS_ERROR',
        difficulty: 'HARD',
        text: 'BIOS 오류',
        biosCode: code,
      }
    },
  },
  // MUTANT_DETECT - NORMAL
  {
    type: 'MUTANT_DETECT',
    difficulty: 'NORMAL',
    generate() {
      const count = pickRandom([4, 5, 6])
      const idx = Math.floor(Math.random() * count)
      return {
        type: 'MUTANT_DETECT',
        difficulty: 'NORMAL',
        text: '변이체 찾기',
        mutantCount: count,
        mutantIndex: idx,
      }
    },
  },
  // CALIBRATE - NORMAL
  {
    type: 'CALIBRATE',
    difficulty: 'NORMAL',
    generate() {
      return {
        type: 'CALIBRATE',
        difficulty: 'NORMAL',
        text: '보정',
      }
    },
  },
  // FUSE_REPLACE - NORMAL
  {
    type: 'FUSE_REPLACE',
    difficulty: 'NORMAL',
    generate() {
      const count = pickRandom([3, 4, 5])
      const idx = Math.floor(Math.random() * count)
      return {
        type: 'FUSE_REPLACE',
        difficulty: 'NORMAL',
        text: '퓨즈 교체',
        fuseCount: count,
        brokenIndex: idx,
      }
    },
  },
  // TRUST_KNOCK - HARD
  {
    type: 'TRUST_KNOCK',
    difficulty: 'HARD',
    generate() {
      const patterns: number[][] = [
        [300, 300],
        [200, 500],
        [400, 200],
        [300, 300, 300],
        [200, 400, 200],
      ]
      return {
        type: 'TRUST_KNOCK',
        difficulty: 'HARD',
        text: '신뢰?',
        knockPattern: pickRandom(patterns),
      }
    },
  },
  // COUNTDOWN_ZERO - NORMAL
  {
    type: 'COUNTDOWN_ZERO',
    difficulty: 'NORMAL',
    generate() {
      return {
        type: 'COUNTDOWN_ZERO',
        difficulty: 'NORMAL',
        text: '제로에 맞춰',
      }
    },
  },
  // INFECTED_SCAN - NORMAL
  {
    type: 'INFECTED_SCAN',
    difficulty: 'NORMAL',
    generate() {
      const count = pickRandom([4, 5, 6])
      const idx = Math.floor(Math.random() * count)
      return {
        type: 'INFECTED_SCAN',
        difficulty: 'NORMAL',
        text: '감염자 찾기',
        infectedCount: count,
        infectedIndex: idx,
      }
    },
  },
  // CURFEW - HARD
  {
    type: 'CURFEW',
    difficulty: 'HARD',
    generate() {
      return {
        type: 'CURFEW',
        difficulty: 'HARD',
        text: '통금',
      }
    },
  },
  // BLACKBOX - NORMAL
  {
    type: 'BLACKBOX',
    difficulty: 'NORMAL',
    generate() {
      return {
        type: 'BLACKBOX',
        difficulty: 'NORMAL',
        text: '블랙박스',
      }
    },
  },
  // DEFRAG - NORMAL
  {
    type: 'DEFRAG',
    difficulty: 'NORMAL',
    generate() {
      return {
        type: 'DEFRAG',
        difficulty: 'NORMAL',
        text: '조각 모음',
      }
    },
  },
  // FALLOUT_DODGE - HARD
  {
    type: 'FALLOUT_DODGE',
    difficulty: 'HARD',
    generate() {
      return {
        type: 'FALLOUT_DODGE',
        difficulty: 'HARD',
        text: '엄폐',
      }
    },
  },
  // TRIPWIRE - HARD
  {
    type: 'TRIPWIRE',
    difficulty: 'HARD',
    generate() {
      return {
        type: 'TRIPWIRE',
        difficulty: 'HARD',
        text: '지뢰줄',
      }
    },
  },
  // WELD - NORMAL
  {
    type: 'WELD',
    difficulty: 'NORMAL',
    generate() {
      return {
        type: 'WELD',
        difficulty: 'NORMAL',
        text: '용접',
      }
    },
  },
  // CRANK_START - NORMAL
  {
    type: 'CRANK_START',
    difficulty: 'NORMAL',
    generate() {
      const target = pickRandom([2, 3])
      return {
        type: 'CRANK_START',
        difficulty: 'NORMAL',
        text: '크랭크 시동',
        crankStartTarget: target,
      }
    },
  },
  // RATION_SPLIT - HARD
  {
    type: 'RATION_SPLIT',
    difficulty: 'HARD',
    generate() {
      const parts = pickRandom([2, 3, 4])
      const total = parts * pickRandom([2, 3, 4, 5])
      return {
        type: 'RATION_SPLIT',
        difficulty: 'HARD',
        text: '배급 분배',
        rationSplitTotal: total,
        rationSplitParts: parts,
      }
    },
  },
  // NOISE_JAM - HARD
  {
    type: 'NOISE_JAM',
    difficulty: 'HARD',
    generate() {
      return {
        type: 'NOISE_JAM',
        difficulty: 'HARD',
        text: '신호 찾기',
      }
    },
  },
  // PACKET_SNIFF - NORMAL
  {
    type: 'PACKET_SNIFF',
    difficulty: 'NORMAL',
    generate() {
      return {
        type: 'PACKET_SNIFF',
        difficulty: 'NORMAL',
        text: '패킷 스니핑',
      }
    },
  },
  // BOOT_SEQUENCE - NORMAL
  {
    type: 'BOOT_SEQUENCE',
    difficulty: 'NORMAL',
    generate() {
      return {
        type: 'BOOT_SEQUENCE',
        difficulty: 'NORMAL',
        text: '에러 잡기',
      }
    },
  },
  // PIXEL_FIX - EASY
  {
    type: 'PIXEL_FIX',
    difficulty: 'EASY',
    generate() {
      return {
        type: 'PIXEL_FIX',
        difficulty: 'EASY',
        text: '픽셀 수리',
      }
    },
  },
  // ANTENNA_ALIGN - NORMAL
  {
    type: 'ANTENNA_ALIGN',
    difficulty: 'NORMAL',
    generate() {
      return {
        type: 'ANTENNA_ALIGN',
        difficulty: 'NORMAL',
        text: '안테나 정렬',
      }
    },
  },
  // TRANSFUSE - NORMAL
  {
    type: 'TRANSFUSE',
    difficulty: 'NORMAL',
    generate() {
      return {
        type: 'TRANSFUSE',
        difficulty: 'NORMAL',
        text: '수혈',
      }
    },
  },
  // PULSE_CHECK - NORMAL
  {
    type: 'PULSE_CHECK',
    difficulty: 'NORMAL',
    generate() {
      return {
        type: 'PULSE_CHECK',
        difficulty: 'NORMAL',
        text: '맥박 확인',
      }
    },
  },
  // SPLINT - NORMAL
  {
    type: 'SPLINT',
    difficulty: 'NORMAL',
    generate() {
      return {
        type: 'SPLINT',
        difficulty: 'NORMAL',
        text: '부목',
      }
    },
  },
  // ANTIDOTE - HARD
  {
    type: 'ANTIDOTE',
    difficulty: 'HARD',
    generate() {
      return {
        type: 'ANTIDOTE',
        difficulty: 'HARD',
        text: '해독제',
      }
    },
  },
  // RELOAD - NORMAL
  {
    type: 'RELOAD',
    difficulty: 'NORMAL',
    generate() {
      return {
        type: 'RELOAD',
        difficulty: 'NORMAL',
        text: '재장전',
      }
    },
  },
  // SCOPE - NORMAL
  {
    type: 'SCOPE',
    difficulty: 'NORMAL',
    generate() {
      return {
        type: 'SCOPE',
        difficulty: 'NORMAL',
        text: '발사',
      }
    },
  },
  // GRENADE_PIN - HARD
  {
    type: 'GRENADE_PIN',
    difficulty: 'HARD',
    generate() {
      return {
        type: 'GRENADE_PIN',
        difficulty: 'HARD',
        text: '핀 뽑기',
      }
    },
  },
  // BARRICADE - HARD
  {
    type: 'BARRICADE',
    difficulty: 'HARD',
    generate() {
      const count = pickRandom([3, 4])
      return {
        type: 'BARRICADE',
        difficulty: 'HARD',
        text: '바리케이드',
        barricadeCount: count,
      }
    },
  },
  // FLARE_LAUNCH - NORMAL
  {
    type: 'FLARE_LAUNCH',
    difficulty: 'NORMAL',
    generate() {
      return {
        type: 'FLARE_LAUNCH',
        difficulty: 'NORMAL',
        text: '조명탄 발사',
      }
    },
  },
  // WATER_LEVEL - HARD
  {
    type: 'WATER_LEVEL',
    difficulty: 'HARD',
    generate() {
      return {
        type: 'WATER_LEVEL',
        difficulty: 'HARD',
        text: '밸브 잠금',
      }
    },
  },
  // BRIDGE_CROSS - HARD
  {
    type: 'BRIDGE_CROSS',
    difficulty: 'HARD',
    generate() {
      return {
        type: 'BRIDGE_CROSS',
        difficulty: 'HARD',
        text: '다리 건너기',
      }
    },
  },
  // DUST_STORM - HARD
  {
    type: 'DUST_STORM',
    difficulty: 'HARD',
    generate() {
      return {
        type: 'DUST_STORM',
        difficulty: 'HARD',
        text: '대피소 찾기',
      }
    },
  },
  // INTERLACE - NORMAL
  {
    type: 'INTERLACE',
    difficulty: 'NORMAL',
    generate() {
      return {
        type: 'INTERLACE',
        difficulty: 'NORMAL',
        text: '인터레이스 수리',
      }
    },
  },
  // VSYNC - NORMAL
  {
    type: 'VSYNC',
    difficulty: 'NORMAL',
    generate() {
      return {
        type: 'VSYNC',
        difficulty: 'NORMAL',
        text: 'VSYNC',
      }
    },
  },
  // COLOR_BLEED - HARD
  {
    type: 'COLOR_BLEED',
    difficulty: 'HARD',
    generate() {
      return {
        type: 'COLOR_BLEED',
        difficulty: 'HARD',
        text: 'RGB 수리',
      }
    },
  },
  // BURN_IN - HARD
  {
    type: 'BURN_IN',
    difficulty: 'HARD',
    generate() {
      return {
        type: 'BURN_IN',
        difficulty: 'HARD',
        text: '진짜 찾기',
      }
    },
  },
  // SEMAPHORE - HARD
  {
    type: 'SEMAPHORE',
    difficulty: 'HARD',
    generate() {
      const dirs: SwipeDirection[] = ['UP', 'DOWN', 'LEFT', 'RIGHT']
      return {
        type: 'SEMAPHORE',
        difficulty: 'HARD',
        text: '수기 신호',
        semaphoreLeft: pickRandom(dirs),
        semaphoreRight: pickRandom(dirs),
      }
    },
  },
  // CIPHER_WHEEL - HARD
  {
    type: 'CIPHER_WHEEL',
    difficulty: 'HARD',
    generate() {
      return {
        type: 'CIPHER_WHEEL',
        difficulty: 'HARD',
        text: '암호 해독',
      }
    },
  },
  // BEACON - NORMAL
  {
    type: 'BEACON',
    difficulty: 'NORMAL',
    generate() {
      return {
        type: 'BEACON',
        difficulty: 'NORMAL',
        text: '섬광 세기',
      }
    },
  },
  // GENERATOR - NORMAL
  {
    type: 'GENERATOR',
    difficulty: 'NORMAL',
    generate() {
      return {
        type: 'GENERATOR',
        difficulty: 'NORMAL',
        text: '안정화',
      }
    },
  },
  // HATCH_SEAL - HARD
  {
    type: 'HATCH_SEAL',
    difficulty: 'HARD',
    generate() {
      return {
        type: 'HATCH_SEAL',
        difficulty: 'HARD',
        text: '해치 봉인',
      }
    },
  },
  // PERIMETER - NORMAL
  {
    type: 'PERIMETER',
    difficulty: 'NORMAL',
    generate() {
      return {
        type: 'PERIMETER',
        difficulty: 'NORMAL',
        text: '울타리 수리',
      }
    },
  },
  // SOLAR_PANEL - NORMAL
  {
    type: 'SOLAR_PANEL',
    difficulty: 'NORMAL',
    generate() {
      return {
        type: 'SOLAR_PANEL',
        difficulty: 'NORMAL',
        text: '패널 정렬',
      }
    },
  },
  // PH_TEST - NORMAL
  {
    type: 'PH_TEST',
    difficulty: 'NORMAL',
    generate() {
      return {
        type: 'PH_TEST',
        difficulty: 'NORMAL',
        text: 'PH 테스트',
      }
    },
  },
  // CENTRIFUGE - NORMAL
  {
    type: 'CENTRIFUGE',
    difficulty: 'NORMAL',
    generate() {
      return {
        type: 'CENTRIFUGE',
        difficulty: 'NORMAL',
        text: '원심분리',
      }
    },
  },
  // ISOTOPE - NORMAL
  {
    type: 'ISOTOPE',
    difficulty: 'NORMAL',
    generate() {
      return {
        type: 'ISOTOPE',
        difficulty: 'NORMAL',
        text: '반감기',
      }
    },
  },
  // AUTOPILOT - NORMAL
  {
    type: 'AUTOPILOT',
    difficulty: 'NORMAL',
    generate() {
      return {
        type: 'AUTOPILOT',
        difficulty: 'NORMAL',
        text: '항로 수정',
      }
    },
  },
  // DOCKING - NORMAL
  {
    type: 'DOCKING',
    difficulty: 'NORMAL',
    generate() {
      return {
        type: 'DOCKING',
        difficulty: 'NORMAL',
        text: '도킹',
      }
    },
  },
  // MINEFIELD - HARD
  {
    type: 'MINEFIELD',
    difficulty: 'HARD',
    generate() {
      return {
        type: 'MINEFIELD',
        difficulty: 'HARD',
        text: '안전한 발걸음',
      }
    },
  },
  // CAPACITOR - NORMAL
  {
    type: 'CAPACITOR',
    difficulty: 'NORMAL',
    generate() {
      return {
        type: 'CAPACITOR',
        difficulty: 'NORMAL',
        text: '방전',
      }
    },
  },
  // SOLDER - HARD
  {
    type: 'SOLDER',
    difficulty: 'HARD',
    generate() {
      return {
        type: 'SOLDER',
        difficulty: 'HARD',
        text: '납땜',
      }
    },
  },
  // FIRMWARE - NORMAL
  {
    type: 'FIRMWARE',
    difficulty: 'NORMAL',
    generate() {
      return {
        type: 'FIRMWARE',
        difficulty: 'NORMAL',
        text: '업로드',
      }
    },
  },
  // TUBE_REPLACE - NORMAL
  {
    type: 'TUBE_REPLACE',
    difficulty: 'NORMAL',
    generate() {
      return {
        type: 'TUBE_REPLACE',
        difficulty: 'NORMAL',
        text: '튜브 교체',
      }
    },
  },
  // RATION_VOTE - HARD
  {
    type: 'RATION_VOTE',
    difficulty: 'HARD',
    generate() {
      return {
        type: 'RATION_VOTE',
        difficulty: 'HARD',
        text: '투표',
      }
    },
  },
  // SACRIFICE - HARD
  {
    type: 'SACRIFICE',
    difficulty: 'HARD',
    generate() {
      return {
        type: 'SACRIFICE',
        difficulty: 'HARD',
        text: '선택',
      }
    },
  },
  // MIMIC - HARD
  {
    type: 'MIMIC',
    difficulty: 'HARD',
    generate() {
      return {
        type: 'MIMIC',
        difficulty: 'HARD',
        text: '미믹 찾기',
      }
    },
  },
  // KERNEL_PANIC - NORMAL
  {
    type: 'KERNEL_PANIC',
    difficulty: 'NORMAL',
    generate() {
      return { type: 'KERNEL_PANIC', difficulty: 'NORMAL', text: '커널 패닉' }
    },
  },
  // BLUE_SCREEN - NORMAL
  {
    type: 'BLUE_SCREEN',
    difficulty: 'NORMAL',
    generate() {
      return { type: 'BLUE_SCREEN', difficulty: 'NORMAL', text: 'BSOD' }
    },
  },
  // SEGFAULT - NORMAL
  {
    type: 'SEGFAULT',
    difficulty: 'NORMAL',
    generate() {
      return { type: 'SEGFAULT', difficulty: 'NORMAL', text: 'SEGFAULT' }
    },
  },
  // TAPE_SPLICE - NORMAL
  {
    type: 'TAPE_SPLICE',
    difficulty: 'NORMAL',
    generate() {
      return { type: 'TAPE_SPLICE', difficulty: 'NORMAL', text: '테이프 접합' }
    },
  },
  // CORE_DUMP - HARD
  {
    type: 'CORE_DUMP',
    difficulty: 'HARD',
    generate() {
      return { type: 'CORE_DUMP', difficulty: 'HARD', text: '에러 잡기' }
    },
  },
  // SIGNAL_BOOST - NORMAL
  {
    type: 'SIGNAL_BOOST',
    difficulty: 'NORMAL',
    generate() {
      return { type: 'SIGNAL_BOOST', difficulty: 'NORMAL', text: '신호 증폭' }
    },
  },
  // VOLTAGE_MATCH - NORMAL
  {
    type: 'VOLTAGE_MATCH',
    difficulty: 'NORMAL',
    generate() {
      return { type: 'VOLTAGE_MATCH', difficulty: 'NORMAL', text: '전압 맞추기' }
    },
  },
  // TOURNIQUET - EASY
  {
    type: 'TOURNIQUET',
    difficulty: 'EASY',
    generate() {
      return { type: 'TOURNIQUET', difficulty: 'EASY', text: '지혈대' }
    },
  },
  // DEFIBRILLATE - HARD
  {
    type: 'DEFIBRILLATE',
    difficulty: 'HARD',
    generate() {
      return { type: 'DEFIBRILLATE', difficulty: 'HARD', text: '전기 충격' }
    },
  },
  // HAZMAT_SEAL - NORMAL
  {
    type: 'HAZMAT_SEAL',
    difficulty: 'NORMAL',
    generate() {
      return { type: 'HAZMAT_SEAL', difficulty: 'NORMAL', text: '방호복 밀봉' }
    },
  },
  // CRYO_THAW - NORMAL
  {
    type: 'CRYO_THAW',
    difficulty: 'NORMAL',
    generate() {
      return { type: 'CRYO_THAW', difficulty: 'NORMAL', text: '해동' }
    },
  },
  // OXYGEN_MIX - NORMAL
  {
    type: 'OXYGEN_MIX',
    difficulty: 'NORMAL',
    generate() {
      return { type: 'OXYGEN_MIX', difficulty: 'NORMAL', text: '산소 혼합' }
    },
  },
  // AIRDROP - EASY
  {
    type: 'AIRDROP',
    difficulty: 'EASY',
    generate() {
      return { type: 'AIRDROP', difficulty: 'EASY', text: '보급품 잡기' }
    },
  },
  // TUNNEL_DIG - NORMAL
  {
    type: 'TUNNEL_DIG',
    difficulty: 'NORMAL',
    generate() {
      return { type: 'TUNNEL_DIG', difficulty: 'NORMAL', text: '굴 파기' }
    },
  },
  // DEAD_MAN_SWITCH - HARD
  {
    type: 'DEAD_MAN_SWITCH',
    difficulty: 'HARD',
    generate() {
      return { type: 'DEAD_MAN_SWITCH', difficulty: 'HARD', text: '누르고 있어!' }
    },
  },
  // TRAP_ARM - HARD
  {
    type: 'TRAP_ARM',
    difficulty: 'HARD',
    generate() {
      return { type: 'TRAP_ARM', difficulty: 'HARD', text: '함정 설치' }
    },
  },
  // THERMAL_SCAN - NORMAL
  {
    type: 'THERMAL_SCAN',
    difficulty: 'NORMAL',
    generate() {
      return { type: 'THERMAL_SCAN', difficulty: 'NORMAL', text: '생존자 찾기' }
    },
  },
  // EMP_SHIELD - HARD
  {
    type: 'EMP_SHIELD',
    difficulty: 'HARD',
    generate() {
      return { type: 'EMP_SHIELD', difficulty: 'HARD', text: '방어!' }
    },
  },
  // VACCINE_MIX - HARD
  {
    type: 'VACCINE_MIX',
    difficulty: 'HARD',
    generate() {
      return { type: 'VACCINE_MIX', difficulty: 'HARD', text: '백신 혼합' }
    },
  },
  // GENE_SPLICE - HARD
  {
    type: 'GENE_SPLICE',
    difficulty: 'HARD',
    generate() {
      return { type: 'GENE_SPLICE', difficulty: 'HARD', text: '변이 절제' }
    },
  },
  // DISTILL - NORMAL
  {
    type: 'DISTILL',
    difficulty: 'NORMAL',
    generate() {
      return { type: 'DISTILL', difficulty: 'NORMAL', text: '증류' }
    },
  },
  // PLASMA_CUT - NORMAL
  {
    type: 'PLASMA_CUT',
    difficulty: 'NORMAL',
    generate() {
      return { type: 'PLASMA_CUT', difficulty: 'NORMAL', text: '절단' }
    },
  },
  // FUEL_MIX - NORMAL
  {
    type: 'FUEL_MIX',
    difficulty: 'NORMAL',
    generate() {
      return { type: 'FUEL_MIX', difficulty: 'NORMAL', text: '연료 이송' }
    },
  },
  // CLAYMORE_AIM - HARD
  {
    type: 'CLAYMORE_AIM',
    difficulty: 'HARD',
    generate() {
      return { type: 'CLAYMORE_AIM', difficulty: 'HARD', text: '클레이모어 조준' }
    },
  },
  // BREACH_CHARGE - HARD
  {
    type: 'BREACH_CHARGE',
    difficulty: 'HARD',
    generate() {
      return { type: 'BREACH_CHARGE', difficulty: 'HARD', text: '돌파' }
    },
  },
  // AMPUTATE - HARD
  {
    type: 'AMPUTATE',
    difficulty: 'HARD',
    generate() {
      return { type: 'AMPUTATE', difficulty: 'HARD', text: '절단술' }
    },
  },
  // DEAD_PIXEL - EASY
  {
    type: 'DEAD_PIXEL',
    difficulty: 'EASY',
    generate() {
      return { type: 'DEAD_PIXEL', difficulty: 'EASY', text: '데드 픽셀 수리' }
    },
  },
  // CIRCUIT_BRIDGE - NORMAL
  {
    type: 'CIRCUIT_BRIDGE',
    difficulty: 'NORMAL',
    generate() {
      return { type: 'CIRCUIT_BRIDGE', difficulty: 'NORMAL', text: '회로 연결' }
    },
  },
  // MEMORY_LEAK - HARD
  {
    type: 'MEMORY_LEAK',
    difficulty: 'HARD',
    generate() {
      return { type: 'MEMORY_LEAK', difficulty: 'HARD', text: '메모리 누수 패치' }
    },
  },
  // STACK_OVERFLOW - NORMAL
  {
    type: 'STACK_OVERFLOW',
    difficulty: 'NORMAL',
    generate() {
      return { type: 'STACK_OVERFLOW', difficulty: 'NORMAL', text: '스택 정리' }
    },
  },
  // BAIT_SET - NORMAL
  {
    type: 'BAIT_SET',
    difficulty: 'NORMAL',
    generate() {
      return { type: 'BAIT_SET', difficulty: 'NORMAL', text: '미끼 설치' }
    },
  },
  // SONAR_PING - NORMAL
  {
    type: 'SONAR_PING',
    difficulty: 'NORMAL',
    generate() {
      return { type: 'SONAR_PING', difficulty: 'NORMAL', text: '소나' }
    },
  },
  // FREQUENCY_LOCK - HARD
  {
    type: 'FREQUENCY_LOCK',
    difficulty: 'HARD',
    generate() {
      return { type: 'FREQUENCY_LOCK', difficulty: 'HARD', text: '주파수 잠금' }
    },
  },
]
