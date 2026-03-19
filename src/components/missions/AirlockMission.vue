<script setup lang="ts">
import { ref } from 'vue'
import { useAudio } from '@/composables/useAudio'

const { playTick } = useAudio()

const emit = defineEmits<{
  tap: [correct: boolean]
}>()

// 0 = waiting for OPEN, 1 = waiting for SEAL, 2 = done
const currentStep = ref(0)
let resolved = false

function handleTap(button: 'open' | 'seal', e: Event) {
  e.stopPropagation()
  if (resolved) return

  if (currentStep.value === 0) {
    if (button === 'open') {
      currentStep.value = 1
    } else {
      resolved = true
      emit('tap', false)
    }
  } else if (currentStep.value === 1) {
    if (button === 'seal') {
      resolved = true
      currentStep.value = 2
      playTick()
      emit('tap', true)
    } else {
      resolved = true
      emit('tap', false)
    }
  }
}
</script>

<template>
  <div class="airlock-mission">
    <div class="airlock-header">AIRLOCK SEQUENCE</div>

    <div class="airlock-buttons">
      <button
        class="airlock-btn"
        :class="{
          active: currentStep === 0,
          done: currentStep > 0,
        }"
        @pointerdown="handleTap('open', $event)"
      >
        <span class="btn-icon">▲</span>
        <span class="btn-label">OPEN</span>
      </button>

      <div class="airlock-divider">
        <div class="stripe" />
        <div class="stripe" />
        <div class="stripe" />
      </div>

      <button
        class="airlock-btn"
        :class="{
          active: currentStep === 1,
          done: currentStep > 1,
        }"
        @pointerdown="handleTap('seal', $event)"
      >
        <span class="btn-icon">▼</span>
        <span class="btn-label">SEAL</span>
      </button>
    </div>

    <div class="airlock-status">
      {{ currentStep === 0 ? '1/2 OPEN HATCH' : currentStep === 1 ? '2/2 SEAL HATCH' : 'LOCKED' }}
    </div>
  </div>
</template>

<style scoped>
.airlock-mission {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px 24px;
  gap: 12px;
  touch-action: none;
  min-height: 200px;
}

.airlock-header {
  font-size: 14px;
  font-weight: 700;
  color: var(--arc-muted);
  font-family: monospace;
  letter-spacing: 2px;
}

.airlock-buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  width: 80%;
  max-width: 240px;
}

.airlock-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 18px 24px;
  border: 3px solid var(--px-green-dim);
  background: var(--px-green-bg);
  color: var(--px-green-dim);
  font-size: 20px;
  font-weight: 700;
  font-family: monospace;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow:
    0 0 0 2px var(--px-green-frame),
    inset 1px 1px 0 var(--px-green-bevel-light),
    inset -1px -1px 0 var(--px-green-bevel-dark);
}

.airlock-btn.active {
  color: var(--px-green-bright);
  border-color: var(--px-green-bright);
  box-shadow:
    0 0 0 2px var(--px-green-frame),
    0 0 20px var(--px-green-glow-strong),
    inset 1px 1px 0 var(--px-green-bevel-light),
    inset -1px -1px 0 var(--px-green-bevel-dark);
  animation: btn-pulse 0.6s ease-in-out infinite alternate;
}

.airlock-btn.done {
  color: var(--px-green-dim);
  border-color: var(--px-green-dim);
  opacity: 0.35;
  box-shadow:
    0 0 0 2px var(--px-green-frame),
    inset 1px 1px 0 var(--px-green-bevel-light),
    inset -1px -1px 0 var(--px-green-bevel-dark);
}

.airlock-btn:active:not(.done) {
  transform: scale(0.96);
}

.btn-icon {
  font-size: 16px;
}

.btn-label {
  letter-spacing: 3px;
}

.airlock-divider {
  display: flex;
  width: 100%;
  height: 10px;
  gap: 0;
}

.stripe {
  flex: 1;
  height: 100%;
  background: repeating-linear-gradient(
    -45deg,
    var(--arc-danger) 0,
    var(--arc-danger) 3px,
    transparent 3px,
    transparent 8px
  );
  opacity: 0.4;
}

.stripe:nth-child(2) {
  background: repeating-linear-gradient(
    45deg,
    var(--arc-danger) 0,
    var(--arc-danger) 3px,
    transparent 3px,
    transparent 8px
  );
}

.airlock-status {
  font-size: 14px;
  color: var(--arc-muted);
  font-family: monospace;
}

@keyframes btn-pulse {
  0% {
    box-shadow:
      0 0 0 2px var(--px-green-frame),
      0 0 12px var(--px-green-glow),
      inset 1px 1px 0 var(--px-green-bevel-light),
      inset -1px -1px 0 var(--px-green-bevel-dark);
  }
  100% {
    box-shadow:
      0 0 0 2px var(--px-green-frame),
      0 0 28px var(--px-green-glow-strong),
      inset 1px 1px 0 var(--px-green-bevel-light),
      inset -1px -1px 0 var(--px-green-bevel-dark);
  }
}
</style>
