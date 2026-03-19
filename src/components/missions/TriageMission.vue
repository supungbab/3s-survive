<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAudio } from '@/composables/useAudio'

const { playTick } = useAudio()

const props = defineProps<{
  triageCount: number
}>()

const emit = defineEmits<{
  tap: [correct: boolean]
}>()

type Severity = 'CRITICAL' | 'SEVERE' | 'MINOR'
const SEVERITY_ORDER: Severity[] = ['CRITICAL', 'SEVERE', 'MINOR']
const SEVERITY_CSS: Record<Severity, { color: string; label: string; icon: string }> = {
  CRITICAL: { color: '#ff3b5c', label: 'CRIT', icon: '⚠' },
  SEVERE: { color: '#ff9a3c', label: 'SEV', icon: '●' },
  MINOR: { color: '#ffd644', label: 'MIN', icon: '○' },
}

interface Survivor {
  id: number
  severity: Severity
  resolved: boolean
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const survivors = ref<Survivor[]>([])
const expectedOrder = ref<Severity[]>([])
const currentStep = ref(0)

onMounted(() => {
  // Pick unique severities for each survivor
  const severities = SEVERITY_ORDER.slice(0, props.triageCount)
  // If triageCount is 4, duplicate one severity
  const assigned: Severity[] = [...severities]
  if (props.triageCount > 3) {
    assigned.push(severities[Math.floor(Math.random() * severities.length)])
  }

  // Build expected order: CRITICAL first, then SEVERE, then MINOR
  expectedOrder.value = [...assigned].sort(
    (a, b) => SEVERITY_ORDER.indexOf(a) - SEVERITY_ORDER.indexOf(b),
  )

  // Shuffle display order
  survivors.value = shuffle(assigned).map((sev, i) => ({
    id: i,
    severity: sev,
    resolved: false,
  }))
})

function handleSurvivorTap(index: number) {
  const survivor = survivors.value[index]
  if (survivor.resolved) return

  const expected = expectedOrder.value[currentStep.value]

  if (survivor.severity === expected) {
    survivor.resolved = true
    currentStep.value++
    playTick()
    if (currentStep.value >= props.triageCount) {
      emit('tap', true)
    }
  } else {
    emit('tap', false)
  }
}
</script>

<template>
  <div class="triage-mission">
    <div class="triage-grid">
      <button
        v-for="(s, i) in survivors"
        :key="s.id"
        class="survivor-card"
        :class="{ resolved: s.resolved, [s.severity.toLowerCase()]: true }"
        :style="{ '--sev-color': SEVERITY_CSS[s.severity].color }"
        @pointerdown="handleSurvivorTap(i)"
      >
        <div class="survivor-icon">☻</div>
        <div class="severity-badge">
          <span class="sev-dot" />
          {{ SEVERITY_CSS[s.severity].label }}
        </div>
        <div v-if="s.resolved" class="resolved-mark">✓</div>
      </button>
    </div>
  </div>
</template>

<style scoped>
.triage-mission {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 24px;
  gap: 12px;
  min-height: 200px;
}

.triage-grid {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
}

.survivor-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 12px 14px;
  background: var(--px-green-bg);
  border: 2px solid var(--sev-color);
  box-shadow:
    0 0 0 2px var(--px-green-frame),
    inset 1px 1px 0 var(--px-green-bevel-light),
    inset -1px -1px 0 var(--px-green-bevel-dark),
    0 0 12px color-mix(in srgb, var(--sev-color) 30%, transparent);
  cursor: pointer;
  transition: all 0.2s;
  min-width: 70px;
}

.survivor-card.resolved {
  opacity: 0.25;
  border-color: var(--arc-muted);
  box-shadow: none;
  pointer-events: none;
}

.survivor-icon {
  font-size: 28px;
  color: var(--px-green-bright);
  text-shadow: 0 0 8px var(--px-green-glow);
}

.severity-badge {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 700;
  font-family: monospace;
  color: var(--sev-color);
  text-shadow: 0 0 8px var(--sev-color);
  letter-spacing: 1px;
}

.sev-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--sev-color);
  box-shadow: 0 0 6px var(--sev-color);
}

.survivor-card.critical .sev-dot {
  animation: crit-pulse 0.5s ease-in-out infinite alternate;
}

.survivor-card.critical .severity-badge {
  animation: crit-text-pulse 0.5s ease-in-out infinite alternate;
}

@keyframes crit-pulse {
  from { opacity: 0.4; box-shadow: 0 0 4px var(--sev-color); }
  to { opacity: 1; box-shadow: 0 0 12px var(--sev-color); }
}

@keyframes crit-text-pulse {
  from { opacity: 0.6; }
  to { opacity: 1; }
}

.resolved-mark {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  color: var(--px-green-bright);
  text-shadow: 0 0 12px var(--px-green-glow-strong);
  animation: resolve-pop 0.25s ease-out;
}

@keyframes resolve-pop {
  0% { transform: scale(1.8); opacity: 0.5; }
  100% { transform: scale(1); opacity: 1; }
}

.survivor-card:active:not(.resolved) {
  filter: brightness(1.3);
  transform: scale(0.95);
}
</style>
