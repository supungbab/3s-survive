import { MISSION_REGISTRY, type MissionParams, type MissionType } from '@/types/mission'
import type { Difficulty } from '@/types/game'

interface DifficultyBracket {
  maxScore: number
  missionTypes: MissionType[]
  maxDifficulty: Difficulty
}

const DIFFICULTY_ORDER: Record<Difficulty, number> = { EASY: 0, NORMAL: 1, HARD: 2 }

const BRACKETS: DifficultyBracket[] = [
  { maxScore: 5, missionTypes: ['STATIC_CLEAR', 'SCAN', 'HEARTBEAT', 'VENT', 'FLICKER_TAP', 'SOS_FLASH', 'AIRLOCK', 'RADAR_PING', 'PURIFY', 'FORAGE', 'DEGAUSS', 'REBOOT', 'PIXEL_FIX', 'TOURNIQUET', 'AIRDROP', 'DEAD_PIXEL'], maxDifficulty: 'EASY' },
  { maxScore: 15, missionTypes: ['TUNE', 'POWER_UP', 'SHELTER', 'STATIC_CLEAR', 'SCAN', 'HEARTBEAT', 'VENT', 'FLICKER_TAP', 'DECRYPT', 'GEIGER', 'LOCKPICK', 'DECONTAM', 'BLOOD_TYPE', 'POWER_GRID', 'SOS_FLASH', 'AIRLOCK', 'RADAR_PING', 'SIPHON', 'FIREWALL', 'COMPASS', 'CRANK', 'RATION', 'DETOX', 'PURIFY', 'FORAGE', 'DEGAUSS', 'REBOOT', 'SIGNAL_INTERCEPT', 'BARTER', 'IGNITE', 'MUTANT_DETECT', 'CALIBRATE', 'FUSE_REPLACE', 'COUNTDOWN_ZERO', 'INFECTED_SCAN', 'BLACKBOX', 'DEFRAG', 'WELD', 'CRANK_START', 'PIXEL_FIX', 'PACKET_SNIFF', 'BOOT_SEQUENCE', 'ANTENNA_ALIGN', 'TRANSFUSE', 'PULSE_CHECK', 'SPLINT', 'RELOAD', 'SCOPE', 'FLARE_LAUNCH', 'INTERLACE', 'VSYNC', 'BEACON', 'GENERATOR', 'PERIMETER', 'SOLAR_PANEL', 'PH_TEST', 'CENTRIFUGE', 'ISOTOPE', 'AUTOPILOT', 'DOCKING', 'CAPACITOR', 'FIRMWARE', 'TUBE_REPLACE', 'KERNEL_PANIC', 'BLUE_SCREEN', 'SEGFAULT', 'TAPE_SPLICE', 'SIGNAL_BOOST', 'VOLTAGE_MATCH', 'TOURNIQUET', 'HAZMAT_SEAL', 'CRYO_THAW', 'OXYGEN_MIX', 'AIRDROP', 'TUNNEL_DIG', 'THERMAL_SCAN', 'DISTILL', 'PLASMA_CUT', 'FUEL_MIX', 'DEAD_PIXEL', 'CIRCUIT_BRIDGE', 'STACK_OVERFLOW', 'BAIT_SET', 'SONAR_PING'], maxDifficulty: 'NORMAL' },
  { maxScore: 30, missionTypes: ['TUNE', 'POWER_UP', 'SHELTER', 'STATIC_CLEAR', 'SCAN', 'HEARTBEAT', 'VENT', 'FLICKER_TAP', 'DECRYPT', 'GEIGER', 'LOCKPICK', 'DECONTAM', 'BLOOD_TYPE', 'POWER_GRID', 'SOS_FLASH', 'AIRLOCK', 'RADAR_PING', 'SIPHON', 'FIREWALL', 'COMPASS', 'CRANK', 'RATION', 'DETOX', 'PURIFY', 'FORAGE', 'DEGAUSS', 'REBOOT', 'SIGNAL_INTERCEPT', 'BARTER', 'IGNITE', 'MUTANT_DETECT', 'CALIBRATE', 'FUSE_REPLACE', 'COUNTDOWN_ZERO', 'INFECTED_SCAN', 'BLACKBOX', 'DEFRAG', 'WELD', 'CRANK_START', 'PIXEL_FIX', 'PACKET_SNIFF', 'BOOT_SEQUENCE', 'ANTENNA_ALIGN', 'TRANSFUSE', 'PULSE_CHECK', 'SPLINT', 'RELOAD', 'SCOPE', 'FLARE_LAUNCH', 'INTERLACE', 'VSYNC', 'BEACON', 'GENERATOR', 'PERIMETER', 'SOLAR_PANEL', 'PH_TEST', 'CENTRIFUGE', 'ISOTOPE', 'AUTOPILOT', 'DOCKING', 'CAPACITOR', 'FIRMWARE', 'TUBE_REPLACE', 'KERNEL_PANIC', 'BLUE_SCREEN', 'SEGFAULT', 'TAPE_SPLICE', 'SIGNAL_BOOST', 'VOLTAGE_MATCH', 'TOURNIQUET', 'HAZMAT_SEAL', 'CRYO_THAW', 'OXYGEN_MIX', 'AIRDROP', 'TUNNEL_DIG', 'THERMAL_SCAN', 'DISTILL', 'PLASMA_CUT', 'FUEL_MIX', 'DEAD_PIXEL', 'CIRCUIT_BRIDGE', 'STACK_OVERFLOW', 'BAIT_SET', 'SONAR_PING'], maxDifficulty: 'NORMAL' },
  { maxScore: Infinity, missionTypes: ['TUNE', 'POWER_UP', 'WIRE_CUT', 'STATIC_CLEAR', 'BROADCAST', 'SCAN', 'SHELTER', 'MORSE', 'HEARTBEAT', 'VENT', 'FLICKER_TAP', 'DECRYPT', 'GEIGER', 'LOCKPICK', 'DECONTAM', 'BLOOD_TYPE', 'POWER_GRID', 'TRIAGE', 'PARADROP', 'QUARANTINE', 'DEAD_DROP', 'FREQUENCY_JAM', 'SOS_FLASH', 'AIRLOCK', 'RADAR_PING', 'SIPHON', 'FIREWALL', 'COMPASS', 'CRANK', 'RATION', 'DETOX', 'BLACKOUT', 'OVERRIDE', 'PRESSURE', 'SPLICE', 'DISTRESS', 'ELEVATOR', 'SCRAMBLE', 'SIGNAL_INTERCEPT', 'PURIFY', 'BARTER', 'FORAGE', 'DEGAUSS', 'REBOOT', 'IGNITE', 'BIOS_ERROR', 'MUTANT_DETECT', 'CALIBRATE', 'FUSE_REPLACE', 'TRUST_KNOCK', 'COUNTDOWN_ZERO', 'INFECTED_SCAN', 'CURFEW', 'BLACKBOX', 'DEFRAG', 'FALLOUT_DODGE', 'TRIPWIRE', 'WELD', 'CRANK_START', 'RATION_SPLIT', 'NOISE_JAM', 'PACKET_SNIFF', 'BOOT_SEQUENCE', 'PIXEL_FIX', 'ANTENNA_ALIGN', 'TRANSFUSE', 'PULSE_CHECK', 'SPLINT', 'ANTIDOTE', 'RELOAD', 'SCOPE', 'GRENADE_PIN', 'BARRICADE', 'FLARE_LAUNCH', 'WATER_LEVEL', 'BRIDGE_CROSS', 'DUST_STORM', 'INTERLACE', 'VSYNC', 'COLOR_BLEED', 'BURN_IN', 'SEMAPHORE', 'CIPHER_WHEEL', 'BEACON', 'GENERATOR', 'HATCH_SEAL', 'PERIMETER', 'SOLAR_PANEL', 'PH_TEST', 'CENTRIFUGE', 'ISOTOPE', 'AUTOPILOT', 'DOCKING', 'MINEFIELD', 'CAPACITOR', 'SOLDER', 'FIRMWARE', 'TUBE_REPLACE', 'RATION_VOTE', 'SACRIFICE', 'MIMIC', 'KERNEL_PANIC', 'BLUE_SCREEN', 'SEGFAULT', 'TAPE_SPLICE', 'CORE_DUMP', 'SIGNAL_BOOST', 'VOLTAGE_MATCH', 'TOURNIQUET', 'DEFIBRILLATE', 'HAZMAT_SEAL', 'CRYO_THAW', 'OXYGEN_MIX', 'AIRDROP', 'TUNNEL_DIG', 'DEAD_MAN_SWITCH', 'TRAP_ARM', 'THERMAL_SCAN', 'EMP_SHIELD', 'VACCINE_MIX', 'GENE_SPLICE', 'DISTILL', 'PLASMA_CUT', 'FUEL_MIX', 'CLAYMORE_AIM', 'BREACH_CHARGE', 'AMPUTATE', 'DEAD_PIXEL', 'CIRCUIT_BRIDGE', 'MEMORY_LEAK', 'STACK_OVERFLOW', 'BAIT_SET', 'SONAR_PING', 'FREQUENCY_LOCK'], maxDifficulty: 'HARD' },
]

export function useMissionPool() {
  let lastMissionType: MissionType | null = null
  let forcedType: MissionType | null = null

  function setForcedType(type: MissionType | null) {
    forcedType = type
  }

  function getAvailableTypes(score: number): MissionType[] {
    const bracket = BRACKETS.find((b) => score <= b.maxScore) ?? BRACKETS[BRACKETS.length - 1]
    return bracket.missionTypes
  }

  function pickMission(score: number): MissionParams {
    // 강제 미션 모드: 레지스트리에서 해당 타입의 첫 정의 사용
    if (forcedType) {
      const matching = MISSION_REGISTRY.filter((d) => d.type === forcedType)
      const definition = matching[Math.floor(Math.random() * matching.length)]
      return definition.generate()
    }

    const types = getAvailableTypes(score)
    // Filter out last mission type to avoid repetition
    const filtered = types.length > 1
      ? types.filter((t) => t !== lastMissionType)
      : types

    const bracket = BRACKETS.find((b) => score <= b.maxScore) ?? BRACKETS[BRACKETS.length - 1]
    const chosenType = filtered[Math.floor(Math.random() * filtered.length)]
    const matching = MISSION_REGISTRY.filter(
      (d) => d.type === chosenType && DIFFICULTY_ORDER[d.difficulty] <= DIFFICULTY_ORDER[bracket.maxDifficulty],
    )
    const definition = matching.length > 1
      ? matching[Math.floor(Math.random() * matching.length)]
      : matching[0]
    const mission = definition.generate()

    lastMissionType = chosenType
    return mission
  }

  function reset() {
    lastMissionType = null
  }

  return { pickMission, getAvailableTypes, reset, setForcedType }
}
