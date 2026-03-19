<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useAudio } from '@/composables/useAudio'

const { playTick } = useAudio()

const emit = defineEmits<{
  tap: [correct: boolean]
}>()

interface Blip {
  x: number
  y: number
  hit: boolean
}

const blips = ref<Blip[]>([])
const sweepAngle = ref(0)
let raf = 0
let resolved = false

onMounted(() => {
  const count = 2 + Math.floor(Math.random() * 2) // 2~3
  const pts: Blip[] = []
  for (let i = 0; i < count; i++) {
    // Place blips in random positions (15%~85% range)
    pts.push({
      x: 15 + Math.random() * 70,
      y: 15 + Math.random() * 70,
      hit: false,
    })
  }
  blips.value = pts
  raf = requestAnimationFrame(animateSweep)
})

function animateSweep(now: number) {
  sweepAngle.value = (now / 15) % 360
  raf = requestAnimationFrame(animateSweep)
}

onUnmounted(() => cancelAnimationFrame(raf))

function handleBlipTap(index: number) {
  if (resolved || blips.value[index].hit) return
  blips.value[index].hit = true
  playTick()

  if (blips.value.every(b => b.hit)) {
    resolved = true
    emit('tap', true)
  }
}
</script>

<template>
  <div class="scan-mission">
    <div class="radar">
      <div class="radar-sweep" :style="{ transform: `rotate(${sweepAngle}deg)` }" />
      <div class="radar-ring ring-1" />
      <div class="radar-ring ring-2" />
      <div class="radar-cross-h" />
      <div class="radar-cross-v" />

      <button
        v-for="(blip, i) in blips"
        :key="i"
        class="blip"
        :class="{ hit: blip.hit }"
        :style="{ left: `${blip.x}%`, top: `${blip.y}%` }"
        @pointerdown="handleBlipTap(i)"
      >
        ◆
      </button>
    </div>
  </div>
</template>

<style scoped>
.scan-mission {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  min-height: 200px;
}

.radar {
  position: relative;
  width: 200px;
  height: 200px;
  border: 2px solid var(--px-green-border);
  background: #040a04;
  overflow: hidden;
  box-shadow:
    0 0 0 2px var(--px-green-frame),
    inset 0 0 40px rgba(140, 200, 144, 0.05);
}

.radar-sweep {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 50%;
  height: 2px;
  transform-origin: left center;
  background: linear-gradient(to right, var(--px-green-bright), transparent);
  box-shadow: 0 0 20px var(--px-green-glow);
}

.radar-sweep::after {
  content: '';
  position: absolute;
  top: -60px;
  left: 0;
  width: 100%;
  height: 120px;
  background: conic-gradient(from 0deg, rgba(140, 200, 144, 0.15), transparent 30deg);
  transform-origin: left center;
}

.radar-ring {
  position: absolute;
  border: 1px solid rgba(140, 200, 144, 0.15);
  border-radius: 50%;
}

.ring-1 {
  top: 25%;
  left: 25%;
  width: 50%;
  height: 50%;
}

.ring-2 {
  top: 8%;
  left: 8%;
  width: 84%;
  height: 84%;
}

.radar-cross-h, .radar-cross-v {
  position: absolute;
  background: rgba(140, 200, 144, 0.1);
}

.radar-cross-h {
  top: 50%;
  left: 0;
  width: 100%;
  height: 1px;
}

.radar-cross-v {
  top: 0;
  left: 50%;
  width: 1px;
  height: 100%;
}

.blip {
  position: absolute;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  background: transparent;
  border: 2px solid var(--px-green-bright);
  color: var(--px-green-bright);
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: blip-blink 0.6s ease-in-out infinite alternate;
  box-shadow: 0 0 8px var(--px-green-glow);
  border-radius: 0;
}

.blip.hit {
  border-color: #333;
  color: #333;
  box-shadow: none;
  animation: none;
  pointer-events: none;
}

.blip:active {
  transform: translate(-50%, -50%) scale(0.85);
}

@keyframes blip-blink {
  from { opacity: 0.6; }
  to { opacity: 1; }
}
</style>
