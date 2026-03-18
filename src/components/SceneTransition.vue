<script setup lang="ts">
import { useSceneTransition } from '@/composables/useSceneTransition'

const { phase } = useSceneTransition()
</script>

<template>
  <Teleport to="body">
    <div
      v-if="phase !== 'idle'"
      class="scene-transition"
      :class="phase"
    >
      <div class="crt-line" />
    </div>
  </Teleport>
</template>

<style scoped>
.scene-transition {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: all;
  background: #000;
}

/* === CRT Power-Off === */
.scene-transition.out {
  animation: crt-off-bg 400ms ease-in forwards;
}

.scene-transition.out .crt-line {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #fff;
  animation: crt-off-line 400ms ease-in forwards;
}

@keyframes crt-off-bg {
  0% {
    background: rgba(0, 0, 0, 0);
  }
  30% {
    background: rgba(0, 0, 0, 0.8);
  }
  100% {
    background: #000;
  }
}

@keyframes crt-off-line {
  0% {
    transform: scaleY(1) scaleX(1);
    opacity: 0;
  }
  30% {
    transform: scaleY(1) scaleX(1);
    opacity: 0;
  }
  50% {
    transform: scaleY(0.005) scaleX(0.9);
    opacity: 1;
    box-shadow:
      0 0 20px rgba(180, 220, 255, 0.8),
      0 0 60px rgba(180, 220, 255, 0.4);
  }
  80% {
    transform: scaleY(0.003) scaleX(0.6);
    opacity: 0.8;
    box-shadow:
      0 0 15px rgba(180, 220, 255, 0.6),
      0 0 40px rgba(180, 220, 255, 0.3);
  }
  100% {
    transform: scaleY(0) scaleX(0);
    opacity: 0;
  }
}

/* === CRT Power-On === */
.scene-transition.in {
  animation: crt-on-bg 350ms ease-out forwards;
}

.scene-transition.in .crt-line {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #fff;
  animation: crt-on-line 350ms ease-out forwards;
}

@keyframes crt-on-bg {
  0% {
    background: #000;
  }
  60% {
    background: rgba(0, 0, 0, 0.6);
  }
  100% {
    background: rgba(0, 0, 0, 0);
  }
}

@keyframes crt-on-line {
  0% {
    transform: scaleY(0) scaleX(0);
    opacity: 0;
  }
  20% {
    transform: scaleY(0.003) scaleX(0.5);
    opacity: 1;
    box-shadow:
      0 0 20px rgba(180, 220, 255, 0.8),
      0 0 60px rgba(180, 220, 255, 0.4);
  }
  50% {
    transform: scaleY(0.005) scaleX(0.9);
    opacity: 0.8;
    box-shadow:
      0 0 15px rgba(180, 220, 255, 0.5),
      0 0 40px rgba(180, 220, 255, 0.2);
  }
  100% {
    transform: scaleY(1) scaleX(1);
    opacity: 0;
  }
}
</style>
