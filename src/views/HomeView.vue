<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useScoreStorage } from '@/composables/useScoreStorage'
import { useSceneTransition } from '@/composables/useSceneTransition'
import TapToStart from '@/components/TapToStart.vue'
import IntroScene from '@/components/IntroScene.vue'
import MainScreen from '@/components/MainScreen.vue'

const router = useRouter()
const { bestScore } = useScoreStorage()
const { transition } = useSceneTransition()

const screen = ref<'tap' | 'intro' | 'main'>('tap')

function handleTapDone() {
  if (!localStorage.getItem('3s_intro_seen')) {
    transition(() => { screen.value = 'intro' })
  } else {
    transition(() => { screen.value = 'main' })
  }
}

function handleIntroDone() {
  transition(() => { screen.value = 'main' })
}

function handleReplayIntro() {
  transition(() => { screen.value = 'intro' })
}

function handleStart() {
  transition(() => router.push('/game'))
}
</script>

<template>
  <TapToStart v-if="screen === 'tap'" @done="handleTapDone" />
  <IntroScene v-else-if="screen === 'intro'" @done="handleIntroDone" />
  <MainScreen v-else :best-score="bestScore" @start="handleStart" @replay-intro="handleReplayIntro" />
</template>
