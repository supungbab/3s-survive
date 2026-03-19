<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import type { SwipeDirection } from '@/types/game'

const props = defineProps<{
  direction: SwipeDirection
}>()

// The correct swipe direction is props.direction (set by parent as OPPOSITE of wind)
// So wind blows in the OPPOSITE direction of the correct swipe
const OPPOSITE: Record<SwipeDirection, SwipeDirection> = {
  UP: 'DOWN',
  DOWN: 'UP',
  LEFT: 'RIGHT',
  RIGHT: 'LEFT',
}

const WIND_ARROWS: Record<SwipeDirection, string> = {
  UP: '↑',
  DOWN: '↓',
  LEFT: '←',
  RIGHT: '→',
}

const windDirection = OPPOSITE[props.direction]
const windArrow = WIND_ARROWS[windDirection]

// Parachute descent animation
const descent = ref(0)
let raf = 0

onMounted(() => {
  const start = performance.now()
  function tick(now: number) {
    const elapsed = (now - start) / 1000
    // Gentle oscillating descent over 3 seconds
    descent.value = Math.min(1, elapsed / 3)
    if (descent.value < 1) {
      raf = requestAnimationFrame(tick)
    }
  }
  raf = requestAnimationFrame(tick)
})

onUnmounted(() => {
  cancelAnimationFrame(raf)
})

const isHorizontalWind = windDirection === 'LEFT' || windDirection === 'RIGHT'
</script>

<template>
  <div class="paradrop-mission">
    <!-- Wind indicator -->
    <div
      class="wind-strip"
      :class="{
        horizontal: isHorizontalWind,
        vertical: !isHorizontalWind,
      }"
    >
      <span
        v-for="i in 5"
        :key="i"
        class="wind-arrow"
        :style="{ animationDelay: `${i * 0.15}s` }"
      >
        {{ windArrow }}
      </span>
    </div>

    <!-- Parachute visual -->
    <div
      class="parachute-container"
      :style="{ transform: `translateY(${descent * 30}px)` }"
    >
      <div class="parachute-canopy">╦</div>
      <div class="parachute-lines">┃</div>
      <div class="parachute-payload">☻</div>
    </div>

    <!-- Wind label -->
    <div class="wind-label">
      WIND {{ windArrow }}
    </div>
  </div>
</template>

<style scoped>
.paradrop-mission {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  gap: 8px;
  min-height: 200px;
  position: relative;
  overflow: hidden;
}

.wind-strip {
  display: flex;
  gap: 12px;
  position: absolute;
}

.wind-strip.horizontal {
  flex-direction: row;
  top: 50%;
  left: 0;
  right: 0;
  justify-content: center;
  transform: translateY(-50%);
}

.wind-strip.vertical {
  flex-direction: column;
  left: 50%;
  top: 0;
  bottom: 0;
  align-items: center;
  justify-content: center;
  transform: translateX(-50%);
}

.wind-arrow {
  font-size: 32px;
  font-family: monospace;
  color: var(--arc-muted);
  opacity: 0;
  animation: wind-blow 1.2s ease-in-out infinite;
}

@keyframes wind-blow {
  0% { opacity: 0; transform: scale(0.7); }
  30% { opacity: 0.6; }
  60% { opacity: 0.3; }
  100% { opacity: 0; transform: scale(1.1); }
}

.parachute-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1;
  gap: 0;
  z-index: 2;
  animation: chute-sway 1.5s ease-in-out infinite alternate;
}

@keyframes chute-sway {
  from { transform: translateX(-4px); }
  to { transform: translateX(4px); }
}

.parachute-canopy {
  font-size: 48px;
  color: var(--px-green-bright);
  text-shadow:
    0 0 20px var(--px-green-glow),
    0 0 60px rgba(140, 200, 144, 0.15);
}

.parachute-lines {
  font-size: 20px;
  color: var(--px-green-border);
  text-shadow: 0 0 6px var(--px-green-glow);
  line-height: 0.8;
}

.parachute-payload {
  font-size: 24px;
  color: var(--px-green-bright);
  text-shadow: 0 0 10px var(--px-green-glow-strong);
}

.wind-label {
  font-size: 16px;
  font-weight: 700;
  font-family: monospace;
  color: var(--arc-muted);
  letter-spacing: 3px;
  margin-top: 12px;
  z-index: 2;
}
</style>
