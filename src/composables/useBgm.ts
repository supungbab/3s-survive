import { useSettings } from './useSettings'
import { ensureAudioReady, getAudioContext } from './audioContext'

let playing = false
let timer: number | null = null
let step = 0

// Master gain for BGM volume control
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
// Key: A minor, BPM 68 (dark, slow)
const BPM = 68
const STEP_SEC = 60 / BPM / 4 // ~0.22s per 16th note

// Frequencies
const A2 = 110, C3 = 130.81, D3 = 146.83, E3 = 164.81
const F3 = 174.61, G3 = 196, A3 = 220
const A1 = 55, D2 = 73.42, E2 = 82.41
const _ = 0 // rest

// ─── Patterns (64 steps = ~14s loop) ───

// Melody: sparse, descending minor phrases (square wave, filtered)
const MELODY = [
  A3, _, _, _,  _, _, _, _,   G3, _, _, _,   _, _, _, _,
  F3, _, _, _,  E3, _, _, _,  _, _, _, _,    _, _, _, _,
  C3, _, _, _,  _, _, A2, _,  _, _, _, _,    C3, _, _, _,
  E3, _, _, _,  _, _, _, _,   A2, _, _, _,   _, _, _, _,
]

// Bass: slow pulse on root and IV (triangle wave)
const BASS = [
  A1, _, _, _,  _, _, _, _,   A1, _, _, _,   _, _, _, _,
  A1, _, _, _,  _, _, _, _,   A1, _, _, _,   _, _, _, _,
  D2, _, _, _,  _, _, _, _,   E2, _, _, _,   _, _, _, _,
  A1, _, _, _,  _, _, _, _,   A1, _, _, _,   _, _, _, _,
]

// Arpeggio: ghostly sine pads on off-beats
const ARP = [
  _, _, E3, _,  _, _, _, _,   _, _, C3, _,   _, _, _, _,
  _, _, E3, _,  _, _, _, _,   _, _, D3, _,   _, _, _, _,
  _, _, A2, _,  _, _, _, _,   _, _, C3, _,   _, _, _, _,
  _, _, E3, _,  _, _, _, _,   _, _, _, _,    _, _, _, _,
]

// ─── Tone Player ───
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

  osc.onended = () => {
    osc.disconnect()
    gain.disconnect()
  }

  osc.start()
  osc.stop(ctx.currentTime + dur)
}

// ─── Step Sequencer ───
function tick() {
  const { soundEnabled, volume } = useSettings()
  if (!soundEnabled.value) return

  const master = getMaster()
  master.gain.value = volume.value * 0.35

  const i = step % MELODY.length

  const mel = MELODY[i]
  const bas = BASS[i]
  const arp = ARP[i]

  if (mel > 0) {
    playNote(mel, STEP_SEC * 2.5, 'square', 0.12, 800)
  }
  if (bas > 0) {
    playNote(bas, STEP_SEC * 6, 'triangle', 0.18)
  }
  if (arp > 0) {
    playNote(arp, STEP_SEC * 3, 'sine', 0.06)
  }

  step++
}

// ─── Public API ───
export function useBgm() {
  async function start() {
    if (playing) return
    playing = true
    step = 0

    // Resume AudioContext within user gesture
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
  }

  function isPlaying() {
    return playing
  }

  return { start, stop, isPlaying }
}
