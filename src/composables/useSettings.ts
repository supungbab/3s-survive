import { ref, watch } from 'vue'

const STORAGE_KEY = 'three_seconds_settings'

interface Settings {
  soundEnabled: boolean
  volume: number
  bgmEnabled: boolean
  bgmVolume: number
}

const defaults: Settings = { soundEnabled: true, volume: 0.7, bgmEnabled: true, bgmVolume: 0.5 }

function load(): Settings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...defaults }
    return { ...defaults, ...JSON.parse(raw) }
  } catch {
    return { ...defaults }
  }
}

function save(s: Settings) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s))
  } catch {
    // ignore
  }
}

const stored = load()
const soundEnabled = ref(stored.soundEnabled)
const volume = ref(stored.volume)
const bgmEnabled = ref(stored.bgmEnabled)
const bgmVolume = ref(stored.bgmVolume)

watch([soundEnabled, volume, bgmEnabled, bgmVolume], () => {
  save({
    soundEnabled: soundEnabled.value,
    volume: volume.value,
    bgmEnabled: bgmEnabled.value,
    bgmVolume: bgmVolume.value,
  })
})

export function useSettings() {
  return { soundEnabled, volume, bgmEnabled, bgmVolume }
}
