import { useSettings } from './useSettings'
import { ensureAudioReady, getAudioContext } from './audioContext'

let playing = false
let timer: number | null = null
let step = 0

let masterGain: GainNode | null = null

function getMaster(): GainNode {
  const ctx = getAudioContext()
  if (!masterGain) {
    masterGain = ctx.createGain()
    masterGain.connect(ctx.destination)
  }
  return masterGain
}

// ─── Musical Constants ───
// BPM 130 — 긴장감 있지만 귀 안 아픈 템포
const BPM = 130
const STEP_SEC = 60 / BPM / 4 // ~0.115s per 16th note

// Key: A minor / C major — 자연스럽고 귀에 편한 키
const A1 = 55.00, E2 = 82.41, A2 = 110.00, C3 = 130.81
const D3 = 146.83, E3 = 164.81, G3 = 196.00, A3 = 220.00
const C4 = 261.63, D4 = 293.66, E4 = 329.63, G4 = 392.00
const A4 = 440.00
const _ = 0 // rest

// ─── Patterns (256 steps = ~29.5s loop) ───
// 8 sections × 32 steps, 부드럽게 순환

// Sub bass: 부드러운 사인파 저음 — 공간감 (sine, long decay)
const SUB = [
  // 1. 깔림
  A1, _, _, _,  _, _, _, _,  _, _, _, _,  _, _, _, _,
  A1, _, _, _,  _, _, _, _,  _, _, _, _,  _, _, _, _,
  // 2
  A1, _, _, _,  _, _, _, _,  _, _, _, _,  _, _, _, _,
  E2, _, _, _,  _, _, _, _,  _, _, _, _,  _, _, _, _,
  // 3
  A1, _, _, _,  _, _, _, _,  _, _, _, _,  _, _, _, _,
  A1, _, _, _,  _, _, _, _,  C3, _, _, _,  _, _, _, _,
  // 4
  A1, _, _, _,  _, _, _, _,  _, _, _, _,  _, _, _, _,
  E2, _, _, _,  _, _, _, _,  _, _, _, _,  _, _, _, _,
  // 5
  A1, _, _, _,  _, _, _, _,  _, _, _, _,  _, _, _, _,
  A1, _, _, _,  _, _, _, _,  _, _, _, _,  _, _, _, _,
  // 6
  A1, _, _, _,  _, _, _, _,  E2, _, _, _,  _, _, _, _,
  A1, _, _, _,  _, _, _, _,  _, _, _, _,  _, _, _, _,
  // 7
  C3, _, _, _,  _, _, _, _,  _, _, _, _,  _, _, _, _,
  A1, _, _, _,  _, _, _, _,  E2, _, _, _,  _, _, _, _,
  // 8. 루프 준비
  A1, _, _, _,  _, _, _, _,  _, _, _, _,  _, _, _, _,
  _, _, _, _,   _, _, _, _,  A1, _, _, _,  _, _, _, _,
]

// Arp: 아르페지오 — 부드러운 삼각파, 리듬감 (triangle, filtered)
const ARP = [
  // 1. 도입 — 느린 아르페지오
  A3, _, _, _,  _, _, _, _,  E3, _, _, _,  _, _, _, _,
  A3, _, _, _,  _, _, _, _,  C4, _, _, _,  _, _, _, _,
  // 2. 살짝 빨라짐
  A3, _, _, _,  E3, _, _, _,  A3, _, _, _,  C4, _, _, _,
  D4, _, _, _,  C4, _, _, _,  A3, _, _, _,  G3, _, _, _,
  // 3. 8분음표 아르페지오
  A3, _, E3, _,  A3, _, C4, _,  A3, _, E3, _,  A3, _, C4, _,
  D4, _, C4, _,  A3, _, G3, _,  A3, _, E3, _,  A3, _, C4, _,
  // 4. 변주
  E4, _, D4, _,  C4, _, A3, _,  G3, _, A3, _,  C4, _, D4, _,
  E4, _, _, _,   D4, _, _, _,  C4, _, _, _,   A3, _, _, _,
  // 5. 호흡 — 공간 넓게
  A3, _, _, _,  _, _, _, _,  C4, _, _, _,  _, _, _, _,
  E4, _, _, _,  _, _, _, _,  _, _, _, _,   _, _, _, _,
  // 6. 재진입
  A3, _, C4, _,  E4, _, C4, _,  A3, _, G3, _,  A3, _, C4, _,
  D4, _, E4, _,  D4, _, C4, _,  A3, _, _, _,   G3, _, _, _,
  // 7. 높은 아르페지오
  E4, _, G4, _,  E4, _, D4, _,  C4, _, D4, _,  E4, _, G4, _,
  A4, _, G4, _,  E4, _, D4, _,  C4, _, A3, _,  _, _, _, _,
  // 8. 해소
  A3, _, _, _,  C4, _, _, _,  E4, _, _, _,  _, _, _, _,
  _, _, _, _,   A3, _, _, _,  _, _, _, _,   _, _, _, _,
]

// Pad: 부드러운 화음 패드 — 사인파, 아주 은은하게 (sine, long)
const PAD = [
  // 1
  C4, _, _, _,  _, _, _, _,  _, _, _, _,  _, _, _, _,
  _, _, _, _,   _, _, _, _,  _, _, _, _,  _, _, _, _,
  // 2
  _, _, _, _,   _, _, _, _,  _, _, _, _,  _, _, _, _,
  E4, _, _, _,  _, _, _, _,  _, _, _, _,  _, _, _, _,
  // 3
  C4, _, _, _,  _, _, _, _,  _, _, _, _,  _, _, _, _,
  _, _, _, _,   _, _, _, _,  _, _, _, _,  _, _, _, _,
  // 4
  _, _, _, _,   _, _, _, _,  D4, _, _, _,  _, _, _, _,
  _, _, _, _,   _, _, _, _,  _, _, _, _,  _, _, _, _,
  // 5
  E4, _, _, _,  _, _, _, _,  _, _, _, _,  _, _, _, _,
  _, _, _, _,   _, _, _, _,  _, _, _, _,  _, _, _, _,
  // 6
  _, _, _, _,   _, _, _, _,  _, _, _, _,  _, _, _, _,
  C4, _, _, _,  _, _, _, _,  _, _, _, _,  _, _, _, _,
  // 7
  _, _, _, _,   _, _, _, _,  E4, _, _, _,  _, _, _, _,
  _, _, _, _,   _, _, _, _,  _, _, _, _,  _, _, _, _,
  // 8
  A3, _, _, _,  _, _, _, _,  _, _, _, _,  _, _, _, _,
  _, _, _, _,   _, _, _, _,  _, _, _, _,  _, _, _, _,
]

// Pulse: 부드러운 리듬 틱 — 사인파 짧은 펄스 (거슬리지 않게)
const PULSE = [
  // 1. 없음
  0, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0,
  0, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0,
  // 2. 4분음표
  1, 0, 0, 0,  1, 0, 0, 0,  1, 0, 0, 0,  1, 0, 0, 0,
  1, 0, 0, 0,  1, 0, 0, 0,  1, 0, 0, 0,  1, 0, 0, 0,
  // 3. 8분음표
  1, 0, 1, 0,  1, 0, 1, 0,  1, 0, 1, 0,  1, 0, 1, 0,
  1, 0, 1, 0,  1, 0, 1, 0,  1, 0, 1, 0,  1, 0, 1, 0,
  // 4. 패턴
  1, 0, 1, 0,  1, 0, 0, 0,  1, 0, 1, 0,  1, 0, 0, 0,
  1, 0, 1, 0,  0, 0, 1, 0,  1, 0, 0, 0,  1, 0, 1, 0,
  // 5. 호흡
  1, 0, 0, 0,  0, 0, 0, 0,  1, 0, 0, 0,  0, 0, 0, 0,
  0, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0,
  // 6. 복귀
  1, 0, 1, 0,  1, 0, 1, 0,  1, 0, 1, 0,  1, 0, 1, 0,
  1, 0, 1, 0,  1, 0, 1, 0,  1, 0, 1, 0,  1, 0, 1, 0,
  // 7. 밀집
  1, 0, 1, 0,  1, 0, 1, 1,  1, 0, 1, 0,  1, 0, 1, 1,
  1, 0, 1, 0,  1, 0, 1, 1,  1, 0, 1, 0,  1, 0, 1, 0,
  // 8. 페이드
  1, 0, 0, 0,  1, 0, 0, 0,  1, 0, 0, 0,  0, 0, 0, 0,
  0, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0,  0, 0, 0, 0,
]

// ─── Tone Players ───
function playNote(
  freq: number,
  dur: number,
  type: OscillatorType,
  vol: number,
  filterFreq?: number,
) {
  const ctx = getAudioContext()
  if (ctx.state === 'suspended') return

  const master = getMaster()
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()

  osc.type = type
  osc.frequency.value = freq
  gain.gain.setValueAtTime(vol, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur)

  if (filterFreq) {
    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = filterFreq
    filter.Q.value = 1
    osc.connect(filter)
    filter.connect(gain)
  } else {
    osc.connect(gain)
  }

  gain.connect(master)
  osc.onended = () => { osc.disconnect(); gain.disconnect() }
  osc.start()
  osc.stop(ctx.currentTime + dur)
}

function playSoftTick(vol: number) {
  const ctx = getAudioContext()
  if (ctx.state === 'suspended') return

  const master = getMaster()
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()

  // 부드러운 사인파 틱 — square 대신 sine, 낮은 주파수
  osc.type = 'sine'
  osc.frequency.value = 800 + Math.random() * 400
  gain.gain.setValueAtTime(vol * 0.12, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04)

  osc.connect(gain)
  gain.connect(master)
  osc.onended = () => { osc.disconnect(); gain.disconnect() }
  osc.start()
  osc.stop(ctx.currentTime + 0.04)
}

// ─── Step Sequencer ───
function tick() {
  const { bgmEnabled, bgmVolume } = useSettings()
  if (!bgmEnabled.value) return

  const master = getMaster()
  master.gain.value = bgmVolume.value * 0.35

  const i = step % SUB.length

  const sub = SUB[i]
  const arp = ARP[i]
  const pad = PAD[i]
  const pls = PULSE[i]

  // Sub bass — 깊고 부드러운 저음 (sine, 긴 디케이)
  if (sub > 0) {
    playNote(sub, STEP_SEC * 12, 'sine', 0.15)
  }

  // Arp — 삼각파 아르페지오, 로우패스로 부드럽게
  if (arp > 0) {
    playNote(arp, STEP_SEC * 2.5, 'triangle', 0.07, 2000)
  }

  // Pad — 사인파 화음, 아주 길고 은은하게
  if (pad > 0) {
    playNote(pad, STEP_SEC * 16, 'sine', 0.04)
  }

  // Soft tick — 부드러운 리듬 펄스
  if (pls > 0) {
    playSoftTick(bgmVolume.value)
  }

  step++
}

// ─── Public API ───
export function useGameBgm() {
  async function start() {
    if (playing) return
    playing = true
    step = 0

    await ensureAudioReady()
    tick()
    timer = window.setInterval(tick, STEP_SEC * 1000)
  }

  function stop() {
    if (!playing) return
    playing = false
    if (timer !== null) {
      clearInterval(timer)
      timer = null
    }
    if (masterGain) {
      masterGain.gain.setValueAtTime(0, getAudioContext().currentTime)
      masterGain.disconnect()
      masterGain = null
    }
  }

  function isPlaying() {
    return playing
  }

  return { start, stop, isPlaying }
}
