<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useAudio } from '@/composables/useAudio'

const { playTick } = useAudio()

const emit = defineEmits<{
  tap: [correct: boolean]
}>()

const x = ref(50)
const y = ref(50)
let vx = 0
let vy = 0
let raf = 0
let lastTime = 0

onMounted(() => {
  x.value = 20 + Math.random() * 60
  y.value = 20 + Math.random() * 60
  // 속도: 초당 20~35% 이동
  const speed = 20 + Math.random() * 15
  const angle = Math.random() * Math.PI * 2
  vx = Math.cos(angle) * speed
  vy = Math.sin(angle) * speed
  lastTime = performance.now()
  raf = requestAnimationFrame(animate)
})

function animate(now: number) {
  const dt = (now - lastTime) / 1000
  lastTime = now

  x.value += vx * dt
  y.value += vy * dt

  // 벽 바운스 (10%~90% 범위)
  if (x.value < 10 || x.value > 90) {
    vx *= -1
    x.value = Math.max(10, Math.min(90, x.value))
  }
  if (y.value < 10 || y.value > 90) {
    vy *= -1
    y.value = Math.max(10, Math.min(90, y.value))
  }

  raf = requestAnimationFrame(animate)
}

onUnmounted(() => cancelAnimationFrame(raf))

function handleCatch() {
  playTick()
  emit('tap', true)
}
</script>

<template>
  <div class="catch-mission">
    <button
      class="catch-target"
      :style="{
        left: `${x}%`,
        top: `${y}%`,
      }"
      @pointerdown="handleCatch"
    >
      ◆
    </button>
  </div>
</template>

<style scoped>
.catch-mission {
  position: relative;
  width: 100%;
  height: 200px;
}

.catch-target {
  position: absolute;
  width: 56px;
  height: 56px;
  transform: translate(-50%, -50%);
  background: var(--px-green-bg);
  border: 3px solid var(--px-green-bright);
  border-radius: 0;
  color: var(--px-green-bright);
  font-size: 24px;
  cursor: pointer;
  box-shadow:
    0 0 0 2px var(--px-green-frame),
    0 0 16px var(--px-green-glow),
    inset 1px 1px 0 var(--px-green-bevel-light),
    inset -1px -1px 0 var(--px-green-bevel-dark);
  transition: transform 0.05s;
}

.catch-target:active {
  transform: translate(-50%, -50%) scale(0.85);
}
</style>
