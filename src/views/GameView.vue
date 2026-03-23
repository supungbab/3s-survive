<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import type { MissionType } from '@/types/mission'
import { useGameState } from '@/composables/useGameState'
import { useI18n } from '@/composables/useI18n'
import { useInputDetector } from '@/composables/useInputDetector'
import { useSceneTransition } from '@/composables/useSceneTransition'
import TimerBar from '@/components/TimerBar.vue'
import ScoreDisplay from '@/components/ScoreDisplay.vue'
import MissionText from '@/components/MissionText.vue'
import FeedbackLayer from '@/components/FeedbackLayer.vue'
import ResultOverlay from '@/components/ResultOverlay.vue'
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
import ScrambleMission from '@/components/missions/ScrambleMission.vue'
import SignalInterceptMission from '@/components/missions/SignalInterceptMission.vue'
import PurifyMission from '@/components/missions/PurifyMission.vue'
import BarterMission from '@/components/missions/BarterMission.vue'
import ForageMission from '@/components/missions/ForageMission.vue'
import DegaussMission from '@/components/missions/DegaussMission.vue'
import RebootMission from '@/components/missions/RebootMission.vue'
import IgniteMission from '@/components/missions/IgniteMission.vue'
import BiosErrorMission from '@/components/missions/BiosErrorMission.vue'
import MutantDetectMission from '@/components/missions/MutantDetectMission.vue'
import CalibrateMission from '@/components/missions/CalibrateMission.vue'
import FuseReplaceMission from '@/components/missions/FuseReplaceMission.vue'
import TrustKnockMission from '@/components/missions/TrustKnockMission.vue'
import CountdownZeroMission from '@/components/missions/CountdownZeroMission.vue'
import InfectedScanMission from '@/components/missions/InfectedScanMission.vue'
import CurfewMission from '@/components/missions/CurfewMission.vue'
import BlackboxMission from '@/components/missions/BlackboxMission.vue'
import DefragMission from '@/components/missions/DefragMission.vue'
import FalloutDodgeMission from '@/components/missions/FalloutDodgeMission.vue'
import TripwireMission from '@/components/missions/TripwireMission.vue'
import WeldMission from '@/components/missions/WeldMission.vue'
import CrankStartMission from '@/components/missions/CrankStartMission.vue'
import RationSplitMission from '@/components/missions/RationSplitMission.vue'
import NoiseJamMission from '@/components/missions/NoiseJamMission.vue'
import PacketSniffMission from '@/components/missions/PacketSniffMission.vue'
import BootSequenceMission from '@/components/missions/BootSequenceMission.vue'
import PixelFixMission from '@/components/missions/PixelFixMission.vue'
import AntennaAlignMission from '@/components/missions/AntennaAlignMission.vue'
import TransfuseMission from '@/components/missions/TransfuseMission.vue'
import PulseCheckMission from '@/components/missions/PulseCheckMission.vue'
import SplintMission from '@/components/missions/SplintMission.vue'
import AntidoteMission from '@/components/missions/AntidoteMission.vue'
import ReloadMission from '@/components/missions/ReloadMission.vue'
import ScopeMission from '@/components/missions/ScopeMission.vue'
import GrenadePinMission from '@/components/missions/GrenadePinMission.vue'
import BarricadeMission from '@/components/missions/BarricadeMission.vue'
import FlareLaunchMission from '@/components/missions/FlareLaunchMission.vue'
import WaterLevelMission from '@/components/missions/WaterLevelMission.vue'
import BridgeCrossMission from '@/components/missions/BridgeCrossMission.vue'
import DustStormMission from '@/components/missions/DustStormMission.vue'
import InterlaceMission from '@/components/missions/InterlaceMission.vue'
import VsyncMission from '@/components/missions/VsyncMission.vue'
import ColorBleedMission from '@/components/missions/ColorBleedMission.vue'
import BurnInMission from '@/components/missions/BurnInMission.vue'
import SemaphoreMission from '@/components/missions/SemaphoreMission.vue'
import CipherWheelMission from '@/components/missions/CipherWheelMission.vue'
import BeaconMission from '@/components/missions/BeaconMission.vue'
import GeneratorMission from '@/components/missions/GeneratorMission.vue'
import HatchSealMission from '@/components/missions/HatchSealMission.vue'
import PerimeterMission from '@/components/missions/PerimeterMission.vue'
import SolarPanelMission from '@/components/missions/SolarPanelMission.vue'
import PhTestMission from '@/components/missions/PhTestMission.vue'
import CentrifugeMission from '@/components/missions/CentrifugeMission.vue'
import IsotopeMission from '@/components/missions/IsotopeMission.vue'
import AutopilotMission from '@/components/missions/AutopilotMission.vue'
import DockingMission from '@/components/missions/DockingMission.vue'
import MinefieldMission from '@/components/missions/MinefieldMission.vue'
import CapacitorMission from '@/components/missions/CapacitorMission.vue'
import SolderMission from '@/components/missions/SolderMission.vue'
import FirmwareMission from '@/components/missions/FirmwareMission.vue'
import TubeReplaceMission from '@/components/missions/TubeReplaceMission.vue'
import RationVoteMission from '@/components/missions/RationVoteMission.vue'
import SacrificeMission from '@/components/missions/SacrificeMission.vue'
import MimicMission from '@/components/missions/MimicMission.vue'
import KernelPanicMission from '@/components/missions/KernelPanicMission.vue'
import BlueScreenMission from '@/components/missions/BlueScreenMission.vue'
import SegfaultMission from '@/components/missions/SegfaultMission.vue'
import TapeSpliceMission from '@/components/missions/TapeSpliceMission.vue'
import CoreDumpMission from '@/components/missions/CoreDumpMission.vue'
import SignalBoostMission from '@/components/missions/SignalBoostMission.vue'
import VoltageMatchMission from '@/components/missions/VoltageMatchMission.vue'
import TourniquetMission from '@/components/missions/TourniquetMission.vue'
import DefibrillateMission from '@/components/missions/DefibrillateMission.vue'
import HazmatSealMission from '@/components/missions/HazmatSealMission.vue'
import CryoThawMission from '@/components/missions/CryoThawMission.vue'
import OxygenMixMission from '@/components/missions/OxygenMixMission.vue'
import AirdropMission from '@/components/missions/AirdropMission.vue'
import TunnelDigMission from '@/components/missions/TunnelDigMission.vue'
import DeadManSwitchMission from '@/components/missions/DeadManSwitchMission.vue'
import TrapArmMission from '@/components/missions/TrapArmMission.vue'
import ThermalScanMission from '@/components/missions/ThermalScanMission.vue'
import EmpShieldMission from '@/components/missions/EmpShieldMission.vue'
import VaccineMixMission from '@/components/missions/VaccineMixMission.vue'
import GeneSpliceMission from '@/components/missions/GeneSpliceMission.vue'
import DistillMission from '@/components/missions/DistillMission.vue'
import PlasmaCutMission from '@/components/missions/PlasmaCutMission.vue'
import FuelMixMission from '@/components/missions/FuelMixMission.vue'
import ClaymoreAimMission from '@/components/missions/ClaymoreAimMission.vue'
import BreachChargeMission from '@/components/missions/BreachChargeMission.vue'
import AmputateMission from '@/components/missions/AmputateMission.vue'
import DeadPixelMission from '@/components/missions/DeadPixelMission.vue'
import CircuitBridgeMission from '@/components/missions/CircuitBridgeMission.vue'
import MemoryLeakMission from '@/components/missions/MemoryLeakMission.vue'
import StackOverflowMission from '@/components/missions/StackOverflowMission.vue'
import BaitSetMission from '@/components/missions/BaitSetMission.vue'
import SonarPingMission from '@/components/missions/SonarPingMission.vue'
import FrequencyLockMission from '@/components/missions/FrequencyLockMission.vue'

const { t } = useI18n()
const router = useRouter()
const route = useRoute()
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
  restart,
  clearAllTimers,
  setForcedMission,
} = useGameState()

// State guard (the-perfect pattern: handler 내부에서 상태 체크 후 early return)
const isBlocked = () =>
  phase.value === 'GAME_OVER' ||
  phase.value === 'IDLE' ||
  phase.value === 'FAIL' ||
  phase.value === 'SHOWING'

const { bind, resetTapCount } = useInputDetector((action) => {
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
        :active="phase === 'ACTING'"
      />
      <ScoreDisplay :score="score" />
    </div>

    <!-- Mission area: 터치 핸들러는 여기에만 바인딩 (the-perfect: 캔버스에만 바인딩) -->
    <div ref="missionArea" class="mission-area">
      <template v-if="mission && (phase === 'SHOWING' || phase === 'ACTING' || phase === 'SUCCESS')">
        <MissionText
          :key="missionKey"
          :text="t(mission.text)"
          :showing="phase === 'SHOWING'"
        />

        <div class="mission-content" :key="'content-' + missionKey">
          <TuneMission
            v-if="mission.type === 'TUNE'"
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
          <ScrambleMission
            v-else-if="mission.type === 'SCRAMBLE'"
            :scramble-word="mission.scrambleWord!"
            :scramble-letters="mission.scrambleLetters!"
            @tap="handleColorTap"
          />
          <SignalInterceptMission
            v-else-if="mission.type === 'SIGNAL_INTERCEPT'"
            @tap="handleColorTap"
          />
          <PurifyMission
            v-else-if="mission.type === 'PURIFY'"
            @tap="handleColorTap"
          />
          <BarterMission
            v-else-if="mission.type === 'BARTER'"
            :barter-left="mission.barterLeft!"
            :barter-right="mission.barterRight!"
            :barter-fair="mission.barterFair!"
            @tap="handleColorTap"
          />
          <ForageMission
            v-else-if="mission.type === 'FORAGE'"
            @tap="handleColorTap"
          />
          <DegaussMission
            v-else-if="mission.type === 'DEGAUSS'"
            @tap="handleColorTap"
          />
          <RebootMission
            v-else-if="mission.type === 'REBOOT'"
            @tap="handleColorTap"
          />
          <IgniteMission
            v-else-if="mission.type === 'IGNITE'"
            :ignite-swipes="mission.igniteSwipes!"
            @tap="handleColorTap"
          />
          <BiosErrorMission
            v-else-if="mission.type === 'BIOS_ERROR'"
            :bios-code="mission.biosCode!"
            @tap="handleColorTap"
          />
          <MutantDetectMission
            v-else-if="mission.type === 'MUTANT_DETECT'"
            :mutant-count="mission.mutantCount!"
            :mutant-index="mission.mutantIndex!"
            @tap="handleColorTap"
          />
          <CalibrateMission
            v-else-if="mission.type === 'CALIBRATE'"
            @tap="handleColorTap"
          />
          <FuseReplaceMission
            v-else-if="mission.type === 'FUSE_REPLACE'"
            :fuse-count="mission.fuseCount!"
            :broken-index="mission.brokenIndex!"
            @tap="handleColorTap"
          />
          <TrustKnockMission
            v-else-if="mission.type === 'TRUST_KNOCK'"
            :knock-pattern="mission.knockPattern!"
            @tap="handleColorTap"
          />
          <CountdownZeroMission
            v-else-if="mission.type === 'COUNTDOWN_ZERO'"
            @tap="handleColorTap"
          />
          <InfectedScanMission
            v-else-if="mission.type === 'INFECTED_SCAN'"
            :infected-count="mission.infectedCount!"
            :infected-index="mission.infectedIndex!"
            @tap="handleColorTap"
          />
          <CurfewMission
            v-else-if="mission.type === 'CURFEW'"
            @tap="handleColorTap"
          />
          <BlackboxMission
            v-else-if="mission.type === 'BLACKBOX'"
            @tap="handleColorTap"
          />
          <DefragMission
            v-else-if="mission.type === 'DEFRAG'"
            @tap="handleColorTap"
          />
          <FalloutDodgeMission
            v-else-if="mission.type === 'FALLOUT_DODGE'"
            @tap="handleColorTap"
          />
          <TripwireMission
            v-else-if="mission.type === 'TRIPWIRE'"
            @tap="handleColorTap"
          />
          <WeldMission
            v-else-if="mission.type === 'WELD'"
            @tap="handleColorTap"
          />
          <CrankStartMission
            v-else-if="mission.type === 'CRANK_START'"
            :crank-target="mission.crankStartTarget!"
            @tap="handleColorTap"
          />
          <RationSplitMission
            v-else-if="mission.type === 'RATION_SPLIT'"
            :ration-total="mission.rationSplitTotal!"
            :ration-parts="mission.rationSplitParts!"
            @tap="handleColorTap"
          />
          <NoiseJamMission
            v-else-if="mission.type === 'NOISE_JAM'"
            @tap="handleColorTap"
          />
          <PacketSniffMission
            v-else-if="mission.type === 'PACKET_SNIFF'"
            @tap="handleColorTap"
          />
          <BootSequenceMission
            v-else-if="mission.type === 'BOOT_SEQUENCE'"
            @tap="handleColorTap"
          />
          <PixelFixMission
            v-else-if="mission.type === 'PIXEL_FIX'"
            @tap="handleColorTap"
          />
          <AntennaAlignMission
            v-else-if="mission.type === 'ANTENNA_ALIGN'"
            @tap="handleColorTap"
          />
          <TransfuseMission
            v-else-if="mission.type === 'TRANSFUSE'"
            @tap="handleColorTap"
          />
          <PulseCheckMission
            v-else-if="mission.type === 'PULSE_CHECK'"
            @tap="handleColorTap"
          />
          <SplintMission
            v-else-if="mission.type === 'SPLINT'"
            @tap="handleColorTap"
          />
          <AntidoteMission
            v-else-if="mission.type === 'ANTIDOTE'"
            @tap="handleColorTap"
          />
          <ReloadMission
            v-else-if="mission.type === 'RELOAD'"
            @tap="handleColorTap"
          />
          <ScopeMission
            v-else-if="mission.type === 'SCOPE'"
            @tap="handleColorTap"
          />
          <GrenadePinMission
            v-else-if="mission.type === 'GRENADE_PIN'"
            @tap="handleColorTap"
          />
          <BarricadeMission
            v-else-if="mission.type === 'BARRICADE'"
            :barricade-count="mission.barricadeCount!"
            @tap="handleColorTap"
          />
          <FlareLaunchMission
            v-else-if="mission.type === 'FLARE_LAUNCH'"
            @tap="handleColorTap"
          />
          <WaterLevelMission
            v-else-if="mission.type === 'WATER_LEVEL'"
            @tap="handleColorTap"
          />
          <BridgeCrossMission
            v-else-if="mission.type === 'BRIDGE_CROSS'"
            @tap="handleColorTap"
          />
          <DustStormMission
            v-else-if="mission.type === 'DUST_STORM'"
            @tap="handleColorTap"
          />
          <InterlaceMission
            v-else-if="mission.type === 'INTERLACE'"
            @tap="handleColorTap"
          />
          <VsyncMission
            v-else-if="mission.type === 'VSYNC'"
            @tap="handleColorTap"
          />
          <ColorBleedMission
            v-else-if="mission.type === 'COLOR_BLEED'"
            @tap="handleColorTap"
          />
          <BurnInMission
            v-else-if="mission.type === 'BURN_IN'"
            @tap="handleColorTap"
          />
          <SemaphoreMission
            v-else-if="mission.type === 'SEMAPHORE'"
            :semaphore-left="mission.semaphoreLeft!"
            :semaphore-right="mission.semaphoreRight!"
            @tap="handleColorTap"
          />
          <CipherWheelMission
            v-else-if="mission.type === 'CIPHER_WHEEL'"
            @tap="handleColorTap"
          />
          <BeaconMission
            v-else-if="mission.type === 'BEACON'"
            @tap="handleColorTap"
          />
          <GeneratorMission
            v-else-if="mission.type === 'GENERATOR'"
            @tap="handleColorTap"
          />
          <HatchSealMission
            v-else-if="mission.type === 'HATCH_SEAL'"
            @tap="handleColorTap"
          />
          <PerimeterMission
            v-else-if="mission.type === 'PERIMETER'"
            @tap="handleColorTap"
          />
          <SolarPanelMission
            v-else-if="mission.type === 'SOLAR_PANEL'"
            @tap="handleColorTap"
          />
          <PhTestMission
            v-else-if="mission.type === 'PH_TEST'"
            @tap="handleColorTap"
          />
          <CentrifugeMission
            v-else-if="mission.type === 'CENTRIFUGE'"
            @tap="handleColorTap"
          />
          <IsotopeMission
            v-else-if="mission.type === 'ISOTOPE'"
            @tap="handleColorTap"
          />
          <AutopilotMission
            v-else-if="mission.type === 'AUTOPILOT'"
            @tap="handleColorTap"
          />
          <DockingMission
            v-else-if="mission.type === 'DOCKING'"
            @tap="handleColorTap"
          />
          <MinefieldMission
            v-else-if="mission.type === 'MINEFIELD'"
            @tap="handleColorTap"
          />
          <CapacitorMission
            v-else-if="mission.type === 'CAPACITOR'"
            @tap="handleColorTap"
          />
          <SolderMission
            v-else-if="mission.type === 'SOLDER'"
            @tap="handleColorTap"
          />
          <FirmwareMission
            v-else-if="mission.type === 'FIRMWARE'"
            @tap="handleColorTap"
          />
          <TubeReplaceMission
            v-else-if="mission.type === 'TUBE_REPLACE'"
            @tap="handleColorTap"
          />
          <RationVoteMission
            v-else-if="mission.type === 'RATION_VOTE'"
            @tap="handleColorTap"
          />
          <SacrificeMission
            v-else-if="mission.type === 'SACRIFICE'"
            @tap="handleColorTap"
          />
          <MimicMission
            v-else-if="mission.type === 'MIMIC'"
            @tap="handleColorTap"
          />
          <KernelPanicMission
            v-else-if="mission.type === 'KERNEL_PANIC'"
            @tap="handleColorTap"
          />
          <BlueScreenMission
            v-else-if="mission.type === 'BLUE_SCREEN'"
            @tap="handleColorTap"
          />
          <SegfaultMission
            v-else-if="mission.type === 'SEGFAULT'"
            @tap="handleColorTap"
          />
          <TapeSpliceMission
            v-else-if="mission.type === 'TAPE_SPLICE'"
            @tap="handleColorTap"
          />
          <CoreDumpMission
            v-else-if="mission.type === 'CORE_DUMP'"
            @tap="handleColorTap"
          />
          <SignalBoostMission
            v-else-if="mission.type === 'SIGNAL_BOOST'"
            @tap="handleColorTap"
          />
          <VoltageMatchMission
            v-else-if="mission.type === 'VOLTAGE_MATCH'"
            @tap="handleColorTap"
          />
          <TourniquetMission
            v-else-if="mission.type === 'TOURNIQUET'"
            @tap="handleColorTap"
          />
          <DefibrillateMission
            v-else-if="mission.type === 'DEFIBRILLATE'"
            @tap="handleColorTap"
          />
          <HazmatSealMission
            v-else-if="mission.type === 'HAZMAT_SEAL'"
            @tap="handleColorTap"
          />
          <CryoThawMission
            v-else-if="mission.type === 'CRYO_THAW'"
            @tap="handleColorTap"
          />
          <OxygenMixMission
            v-else-if="mission.type === 'OXYGEN_MIX'"
            @tap="handleColorTap"
          />
          <AirdropMission
            v-else-if="mission.type === 'AIRDROP'"
            @tap="handleColorTap"
          />
          <TunnelDigMission
            v-else-if="mission.type === 'TUNNEL_DIG'"
            @tap="handleColorTap"
          />
          <DeadManSwitchMission
            v-else-if="mission.type === 'DEAD_MAN_SWITCH'"
            @tap="handleColorTap"
          />
          <TrapArmMission
            v-else-if="mission.type === 'TRAP_ARM'"
            @tap="handleColorTap"
          />
          <ThermalScanMission
            v-else-if="mission.type === 'THERMAL_SCAN'"
            @tap="handleColorTap"
          />
          <EmpShieldMission
            v-else-if="mission.type === 'EMP_SHIELD'"
            @tap="handleColorTap"
          />
          <VaccineMixMission
            v-else-if="mission.type === 'VACCINE_MIX'"
            @tap="handleColorTap"
          />
          <GeneSpliceMission
            v-else-if="mission.type === 'GENE_SPLICE'"
            @tap="handleColorTap"
          />
          <DistillMission
            v-else-if="mission.type === 'DISTILL'"
            @tap="handleColorTap"
          />
          <PlasmaCutMission
            v-else-if="mission.type === 'PLASMA_CUT'"
            @tap="handleColorTap"
          />
          <FuelMixMission
            v-else-if="mission.type === 'FUEL_MIX'"
            @tap="handleColorTap"
          />
          <ClaymoreAimMission
            v-else-if="mission.type === 'CLAYMORE_AIM'"
            @tap="handleColorTap"
          />
          <BreachChargeMission
            v-else-if="mission.type === 'BREACH_CHARGE'"
            @tap="handleColorTap"
          />
          <AmputateMission
            v-else-if="mission.type === 'AMPUTATE'"
            @tap="handleColorTap"
          />
          <DeadPixelMission
            v-else-if="mission.type === 'DEAD_PIXEL'"
            @tap="handleColorTap"
          />
          <CircuitBridgeMission
            v-else-if="mission.type === 'CIRCUIT_BRIDGE'"
            @tap="handleColorTap"
          />
          <MemoryLeakMission
            v-else-if="mission.type === 'MEMORY_LEAK'"
            @tap="handleColorTap"
          />
          <StackOverflowMission
            v-else-if="mission.type === 'STACK_OVERFLOW'"
            @tap="handleColorTap"
          />
          <BaitSetMission
            v-else-if="mission.type === 'BAIT_SET'"
            @tap="handleColorTap"
          />
          <SonarPingMission
            v-else-if="mission.type === 'SONAR_PING'"
            @tap="handleColorTap"
          />
          <FrequencyLockMission
            v-else-if="mission.type === 'FREQUENCY_LOCK'"
            @tap="handleColorTap"
          />
        </div>
      </template>

      <!-- Phase indicator -->
      <div class="phase-badge" :class="{ success: phase === 'SUCCESS', fail: phase === 'FAIL' }">
        <template v-if="phase === 'SHOWING'">{{ t('READY...') }}</template>
        <template v-else-if="phase === 'SUCCESS'">{{ t('+1') }}</template>
        <template v-else-if="phase === 'FAIL'">{{ t('FAIL') }}</template>
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
