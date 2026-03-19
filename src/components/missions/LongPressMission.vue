<script setup lang="ts">
defineProps<{
  isPressed: boolean
}>()
</script>

<template>
  <div class="long-press-mission">
    <div class="press-circle" :class="{ pressing: isPressed }">
      <div class="press-inner">
        <span class="press-icon">👇</span>
      </div>
    </div>
    <div class="press-hint">1초 이상 누르세요</div>
  </div>
</template>

<style scoped>
.long-press-mission {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  gap: 16px;
}

.press-circle {
  width: 120px;
  height: 120px;
  border-radius: 0;
  background: #0c140c;
  border: 3px solid #4a5648;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
  box-shadow:
    0 0 0 2px #111311,
    inset 1px 1px 0 #5a6858,
    inset -1px -1px 0 #2a322a,
    0 0 12px rgba(140, 200, 144, 0.08);
}

.press-circle.pressing {
  transform: scale(0.9);
  border-color: var(--arc-cyan);
  box-shadow:
    0 0 0 2px #111311,
    0 0 24px rgba(0, 229, 255, 0.3),
    0 0 60px rgba(0, 229, 255, 0.1),
    inset 0 0 20px rgba(0, 229, 255, 0.08);
}

.press-inner {
  font-size: 48px;
  line-height: 1;
}

.press-icon {
  display: block;
}

.press-hint {
  font-size: 16px;
  color: var(--arc-muted);
}
</style>
