<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useScoreStorage } from '@/composables/useScoreStorage'
import { useSceneTransition } from '@/composables/useSceneTransition'
import MainScreen from '@/components/MainScreen.vue'
import IntroScene from '@/components/IntroScene.vue'

const router = useRouter()
const { bestScore } = useScoreStorage()
const { transition } = useSceneTransition()

const showIntro = ref(!localStorage.getItem('3s_intro_seen'))

function handleIntroDone() {
  showIntro.value = false
}

function handleReplayIntro() {
  showIntro.value = true
}

function handleStart() {
  transition(() => router.push('/game'))
}
</script>

<template>
  <IntroScene v-if="showIntro" @done="handleIntroDone" />
  <MainScreen v-else :best-score="bestScore" @start="handleStart" @replay-intro="handleReplayIntro" />
</template>
