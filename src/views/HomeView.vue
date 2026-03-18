<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useScoreStorage } from '@/composables/useScoreStorage'
import { useSceneTransition } from '@/composables/useSceneTransition'
import MainScreen from '@/components/MainScreen.vue'

const router = useRouter()
const { bestScore } = useScoreStorage()
const { transition } = useSceneTransition()

function handleStart() {
  transition(() => router.push('/game'))
}
</script>

<template>
  <MainScreen :best-score="bestScore" @start="handleStart" />
</template>
