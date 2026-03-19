<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import type { SwipeDirection } from '@/types/game'

const props = defineProps<{
  direction: SwipeDirection
}>()

const DIR_ANGLE: Record<SwipeDirection, number> = {
  UP: 0,      // N = 0°
  RIGHT: 90,  // E = 90°
  DOWN: 180,  // S = 180°
  LEFT: 270,  // W = 270°
}

const DIR_LABEL: Record<SwipeDirection, string> = {
  UP: 'N',
  RIGHT: 'E',
  DOWN: 'S',
  LEFT: 'W',
}

const needleAngle = ref(Math.random() * 360)
const settled = ref(false)
let raf = 0
let startTime = 0
const WOBBLE_DURATION = 1000 // ms before settling
const SETTLE_DURATION = 400 // ms to ease into final position

const targetAngle = computed(() => DIR_ANGLE[props.direction])

function animate(now: number) {
  const elapsed = now - startTime

  if (elapsed < WOBBLE_DURATION) {
    // Wild wobble phase: random-ish fast rotation
    const wobbleSpeed = 8 - (elapsed / WOBBLE_DURATION) * 5 // slows down over time
    const noise = Math.sin(elapsed * 0.013) * 40 + Math.cos(elapsed * 0.029) * 30
    needleAngle.value = (targetAngle.value + noise * (1 - elapsed / WOBBLE_DURATION) + elapsed * wobbleSpeed * 0.36) % 360
    raf = requestAnimationFrame(animate)
  } else if (elapsed < WOBBLE_DURATION + SETTLE_DURATION) {
    // Settling phase: ease towards target
    const t = (elapsed - WOBBLE_DURATION) / SETTLE_DURATION
    const eased = 1 - Math.pow(1 - t, 3) // ease-out cubic
    const currentBase = needleAngle.value
    // Shortest rotation to target
    let diff = targetAngle.value - currentBase
    if (diff > 180) diff -= 360
    if (diff < -180) diff += 360
    needleAngle.value = currentBase + diff * eased
    raf = requestAnimationFrame(animate)
  } else {
    // Fully settled
    needleAngle.value = targetAngle.value
    settled.value = true
  }
}

onMounted(() => {
  startTime = performance.now()
  raf = requestAnimationFrame(animate)
})

onUnmounted(() => {
  cancelAnimationFrame(raf)
})
</script>

<template>
  <div class="compass-mission">
    <div class="compass-ring">
      <!-- Cardinal labels -->
      <span class="cardinal n" :class="{ active: settled && direction === 'UP' }">N</span>
      <span class="cardinal e" :class="{ active: settled && direction === 'RIGHT' }">E</span>
      <span class="cardinal s" :class="{ active: settled && direction === 'DOWN' }">S</span>
      <span class="cardinal w" :class="{ active: settled && direction === 'LEFT' }">W</span>

      <!-- Tick marks -->
      <div class="tick-marks">
        <div v-for="i in 12" :key="i" class="tick" :style="{ transform: `rotate(${i * 30}deg)` }" />
      </div>

      <!-- Needle -->
      <svg class="needle-svg" viewBox="0 0 100 100">
        <line
          x1="50" y1="50" x2="50" y2="14"
          :transform="`rotate(${needleAngle}, 50, 50)`"
          stroke="var(--px-green-bright)"
          stroke-width="3"
          stroke-linecap="round"
        />
        <line
          x1="50" y1="50" x2="50" y2="72"
          :transform="`rotate(${needleAngle}, 50, 50)`"
          stroke="var(--px-green-dim)"
          stroke-width="2"
          stroke-linecap="round"
        />
        <circle cx="50" cy="50" r="4" fill="var(--px-green-bright)" />
      </svg>
    </div>

    <div class="compass-label" :class="{ visible: settled }">
      {{ DIR_LABEL[direction] }}
    </div>
  </div>
</template>

<style scoped>
.compass-mission {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px 24px;
  gap: 12px;
  min-height: 200px;
}

.compass-ring {
  position: relative;
  width: 140px;
  height: 140px;
  border: 2px solid var(--px-green-border);
  border-radius: 50%;
  background: #0c140c;
  box-shadow:
    0 0 0 3px var(--px-green-frame),
    0 0 20px rgba(140, 200, 144, 0.08);
}

.cardinal {
  position: absolute;
  font-family: monospace;
  font-size: 14px;
  font-weight: 700;
  color: var(--px-green-dim);
  text-shadow: 0 0 4px var(--px-green-glow);
  transition: all 0.3s;
}

.cardinal.active {
  color: var(--px-green-bright);
  text-shadow: 0 0 12px var(--px-green-glow-strong);
  font-size: 16px;
}

.cardinal.n { top: 6px; left: 50%; transform: translateX(-50%); }
.cardinal.s { bottom: 6px; left: 50%; transform: translateX(-50%); }
.cardinal.e { right: 8px; top: 50%; transform: translateY(-50%); }
.cardinal.w { left: 8px; top: 50%; transform: translateY(-50%); }

.tick-marks {
  position: absolute;
  inset: 0;
}

.tick {
  position: absolute;
  left: 50%;
  top: 4px;
  width: 1px;
  height: 8px;
  background: var(--px-green-dim);
  transform-origin: 50% 66px;
}

.tick:nth-child(3n) {
  height: 12px;
  width: 2px;
  background: var(--px-green-border);
}

.needle-svg {
  position: absolute;
  inset: 10px;
  width: calc(100% - 20px);
  height: calc(100% - 20px);
  filter: drop-shadow(0 0 6px var(--px-green-glow));
}

.compass-label {
  font-family: monospace;
  font-size: 20px;
  font-weight: 700;
  color: var(--px-green-dim);
  opacity: 0;
  transition: opacity 0.3s;
}

.compass-label.visible {
  opacity: 1;
  color: var(--px-green-bright);
  text-shadow: 0 0 12px var(--px-green-glow-strong);
}
</style>
