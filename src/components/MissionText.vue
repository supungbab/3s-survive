<script setup lang="ts">
defineProps<{
  text: string
  showing: boolean
}>()
</script>

<template>
  <div class="mission-text" :class="{ 'mission-enter': showing }">
    {{ text }}
  </div>
</template>

<style scoped>
.mission-text {
  font-size: 32px;
  font-weight: 900;
  text-align: center;
  color: var(--arc-text);
  padding: 16px;
  text-shadow:
    0 0 20px var(--px-green-glow),
    0 0 60px rgba(140, 200, 144, 0.12);
}

</style>
