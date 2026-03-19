<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useAudio } from '@/composables/useAudio'

const { playTick } = useAudio()

const props = defineProps<{
  firewallCount: number
}>()

const emit = defineEmits<{
  tap: [correct: boolean]
}>()

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'

const DIRECTIONS: Direction[] = ['UP', 'DOWN', 'LEFT', 'RIGHT']
const DIR_ARROWS: Record<Direction, string> = {
  UP: '↓',    // arrow shows approach direction (coming from top → arrow points down visually)
  DOWN: '↑',
  LEFT: '→',
  RIGHT: '←',
}
const DIR_TRANSLATE: Record<Direction, string> = {
  UP: 'translateY(-80px)',
  DOWN: 'translateY(80px)',
  LEFT: 'translateX(-80px)',
  RIGHT: 'translateX(80px)',
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

const containerEl = ref<HTMLElement | null>(null)
const packets = ref<Direction[]>([])
const currentIndex = ref(0)
const blocked = ref<boolean[]>([])
const showShield = ref(false)
let resolved = false

// Swipe detection state
let touchStartX = 0
let touchStartY = 0
const MIN_SWIPE = 30

const currentPacket = computed(() =>
  currentIndex.value < packets.value.length ? packets.value[currentIndex.value] : null,
)
const progress = computed(() => `${currentIndex.value}/${props.firewallCount}`)

onMounted(() => {
  const dirs: Direction[] = []
  for (let i = 0; i < props.firewallCount; i++) {
    dirs.push(pickRandom(DIRECTIONS))
  }
  packets.value = dirs
  blocked.value = new Array(props.firewallCount).fill(false)

  if (!containerEl.value) return
  const el = containerEl.value
  el.addEventListener('touchstart', onTouchStart, { passive: false })
  el.addEventListener('touchmove', onTouchMove, { passive: false })
  el.addEventListener('touchend', onTouchEnd, { passive: false })
  el.addEventListener('mousedown', onMouseDown)
  el.addEventListener('mouseup', onMouseUp)
})

onUnmounted(() => {
  if (!containerEl.value) return
  const el = containerEl.value
  el.removeEventListener('touchstart', onTouchStart)
  el.removeEventListener('touchmove', onTouchMove)
  el.removeEventListener('touchend', onTouchEnd)
  el.removeEventListener('mousedown', onMouseDown)
  el.removeEventListener('mouseup', onMouseUp)
})

function detectDirection(dx: number, dy: number): Direction | null {
  const absDx = Math.abs(dx)
  const absDy = Math.abs(dy)
  if (absDx < MIN_SWIPE && absDy < MIN_SWIPE) return null
  if (absDx > absDy) {
    return dx > 0 ? 'RIGHT' : 'LEFT'
  } else {
    return dy > 0 ? 'DOWN' : 'UP'
  }
}

function handleSwipe(dir: Direction) {
  if (resolved || !currentPacket.value) return
  const expected = currentPacket.value

  if (dir === expected) {
    blocked.value[currentIndex.value] = true
    showShield.value = true
    playTick()
    setTimeout(() => { showShield.value = false }, 200)
    currentIndex.value++
    if (currentIndex.value >= props.firewallCount) {
      resolved = true
      emit('tap', true)
    }
  } else {
    resolved = true
    emit('tap', false)
  }
}

// Touch handlers
function onTouchStart(e: TouchEvent) {
  e.stopPropagation()
  if (e.cancelable) e.preventDefault()
  const t = e.touches[0]
  touchStartX = t.clientX
  touchStartY = t.clientY
}

function onTouchMove(e: TouchEvent) {
  e.stopPropagation()
  if (e.cancelable) e.preventDefault()
}

function onTouchEnd(e: TouchEvent) {
  e.stopPropagation()
  if (e.cancelable) e.preventDefault()
  const t = e.changedTouches[0]
  const dx = t.clientX - touchStartX
  const dy = t.clientY - touchStartY
  const dir = detectDirection(dx, dy)
  if (dir) handleSwipe(dir)
}

// Mouse handlers
let mouseStartX = 0
let mouseStartY = 0

function onMouseDown(e: MouseEvent) {
  e.stopPropagation()
  mouseStartX = e.clientX
  mouseStartY = e.clientY
}

function onMouseUp(e: MouseEvent) {
  e.stopPropagation()
  const dx = e.clientX - mouseStartX
  const dy = e.clientY - mouseStartY
  const dir = detectDirection(dx, dy)
  if (dir) handleSwipe(dir)
}
</script>

<template>
  <div ref="containerEl" class="firewall-mission">
    <div class="progress-label">{{ progress }}</div>

    <div class="arena">
      <!-- Server core -->
      <div class="server-core" :class="{ shielded: showShield }">
        <span class="server-icon">◆</span>
      </div>

      <!-- Approaching packet -->
      <div
        v-if="currentPacket"
        class="virus-packet"
        :style="{ transform: DIR_TRANSLATE[currentPacket] }"
      >
        <span class="packet-arrow">{{ DIR_ARROWS[currentPacket] }}</span>
      </div>
    </div>

    <div class="hint">SWIPE {{ currentPacket ?? '' }}</div>
  </div>
</template>

<style scoped>
.firewall-mission {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px 24px;
  gap: 12px;
  touch-action: none;
  min-height: 200px;
}

.progress-label {
  font-family: monospace;
  font-size: 16px;
  color: var(--px-green-bright);
  text-shadow: 0 0 6px var(--px-green-glow);
}

.arena {
  position: relative;
  width: 160px;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.server-core {
  width: 48px;
  height: 48px;
  border: 2px solid var(--px-green-border);
  background: var(--px-green-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 0 2px var(--px-green-frame);
  transition: all 0.2s;
}

.server-core.shielded {
  border-color: var(--px-green-bright);
  box-shadow:
    0 0 0 2px var(--px-green-frame),
    0 0 24px var(--px-green-glow-strong),
    0 0 48px rgba(140, 200, 144, 0.15);
}

.server-icon {
  font-size: 22px;
  color: var(--px-green-bright);
  text-shadow: 0 0 8px var(--px-green-glow);
}

.virus-packet {
  position: absolute;
  width: 36px;
  height: 36px;
  border: 2px solid var(--arc-danger);
  background: rgba(255, 59, 92, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: packet-pulse 0.5s ease-in-out infinite alternate;
}

.packet-arrow {
  font-size: 22px;
  color: var(--arc-danger);
  text-shadow: 0 0 10px var(--arc-danger);
  font-family: monospace;
  font-weight: 700;
}

.hint {
  font-family: monospace;
  font-size: 14px;
  color: var(--px-green-dim);
}

@keyframes packet-pulse {
  from {
    box-shadow: 0 0 6px rgba(255, 59, 92, 0.3);
  }
  to {
    box-shadow: 0 0 16px rgba(255, 59, 92, 0.6);
  }
}
</style>
