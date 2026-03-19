<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { MissionType } from '@/types/mission'

const router = useRouter()

interface MissionInfo {
  type: MissionType
  name: string
  input: string
  difficulty: 'EASY' | 'NORMAL' | 'HARD'
  category: string
}

const missions: MissionInfo[] = [
  // 기본 입력
  { type: 'COLOR_TAP', name: '색 탭', input: '탭', difficulty: 'EASY', category: '기본' },
  { type: 'SWIPE', name: '스와이프', input: '스와이프', difficulty: 'EASY', category: '기본' },
  { type: 'MULTI_TAP', name: 'N번 탭', input: '탭', difficulty: 'EASY', category: '기본' },
  { type: 'TAP_ZONE', name: '영역 탭', input: '탭', difficulty: 'EASY', category: '기본' },
  { type: 'SIZE_TAP', name: '크기 탭', input: '탭', difficulty: 'EASY', category: '기본' },
  { type: 'SWIPE_MATCH', name: '화살표 스와이프', input: '스와이프', difficulty: 'EASY', category: '기본' },
  { type: 'DOUBLE_SWIPE', name: '2번 스와이프', input: '스와이프', difficulty: 'EASY', category: '기본' },
  { type: 'QUICK_TAP', name: '빨리 탭', input: '탭', difficulty: 'EASY', category: '기본' },
  { type: 'CATCH', name: '잡아!', input: '탭', difficulty: 'EASY', category: '기본' },
  { type: 'DRAG_TO', name: '드래그', input: '드래그', difficulty: 'EASY', category: '기본' },
  // 인지
  { type: 'REVERSE_SWIPE', name: '반대 스와이프', input: '스와이프', difficulty: 'NORMAL', category: '인지' },
  { type: 'LONG_PRESS', name: '길게 누르기', input: '꾹', difficulty: 'NORMAL', category: '인지' },
  { type: 'ODD_ONE_OUT', name: '다른 거 찾기', input: '탭', difficulty: 'NORMAL', category: '인지' },
  { type: 'PATTERN_TAP', name: '순서 탭', input: '탭', difficulty: 'NORMAL', category: '인지' },
  { type: 'COUNT_TAP', name: '세기 탭', input: '탭', difficulty: 'NORMAL', category: '인지' },
  { type: 'COLOR_SWIPE', name: '색→방향', input: '스와이프', difficulty: 'NORMAL', category: '인지' },
  // 멀티터치
  { type: 'PINCH', name: '핀치', input: '핀치', difficulty: 'NORMAL', category: '멀티터치' },
  { type: 'ROTATE', name: '회전', input: '회전', difficulty: 'NORMAL', category: '멀티터치' },
  { type: 'HOLD_AND_TAP', name: '꾹+탭', input: '복합', difficulty: 'NORMAL', category: '멀티터치' },
  { type: 'DUAL_TAP', name: '둘 다 탭', input: '듀얼탭', difficulty: 'HARD', category: '멀티터치' },
  { type: 'DUAL_SWIPE', name: '양손 스와이프', input: '듀얼스와이프', difficulty: 'HARD', category: '멀티터치' },
  // 고난도
  { type: 'COLOR_TAP_NEGATIVE', name: '빼고 탭', input: '탭', difficulty: 'HARD', category: '고난도' },
  { type: 'DO_NOTHING', name: '누르지 마', input: '없음', difficulty: 'HARD', category: '고난도' },
  { type: 'SEQUENCE', name: '순서 콤보', input: '복합', difficulty: 'HARD', category: '고난도' },
  { type: 'MATH_TAP', name: '수학', input: '탭', difficulty: 'HARD', category: '고난도' },
  { type: 'MIRROR_SWIPE', name: '거울 스와이프', input: '스와이프', difficulty: 'HARD', category: '고난도' },
  { type: 'SIMON', name: '사이먼', input: '탭', difficulty: 'HARD', category: '고난도' },
  { type: 'FAKE_OUT', name: '페이크', input: '스와이프', difficulty: 'HARD', category: '고난도' },
  { type: 'RHYTHM', name: '리듬', input: '탭', difficulty: 'HARD', category: '고난도' },
  // 아포칼립스 신규
  { type: 'STATIC_CLEAR', name: '잡음 제거', input: '문지르기', difficulty: 'EASY', category: '서바이벌' },
  { type: 'SCAN', name: '스캔', input: '멀티탭', difficulty: 'EASY', category: '서바이벌' },
  { type: 'TUNE', name: '주파수', input: '드래그', difficulty: 'NORMAL', category: '서바이벌' },
  { type: 'POWER_UP', name: '충전', input: '교대스와이프', difficulty: 'NORMAL', category: '서바이벌' },
  { type: 'SHELTER', name: '대피', input: '탭', difficulty: 'NORMAL', category: '서바이벌' },
  { type: 'WIRE_CUT', name: '해체', input: '순서탭', difficulty: 'HARD', category: '서바이벌' },
  { type: 'BROADCAST', name: '신호', input: '릴리즈', difficulty: 'HARD', category: '서바이벌' },
  { type: 'MORSE', name: '모스', input: '길이판정', difficulty: 'HARD', category: '서바이벌' },
  // 아포칼립스 2차
  { type: 'HEARTBEAT', name: '심박 소생', input: '탭', difficulty: 'EASY', category: '서바이벌2' },
  { type: 'VENT', name: '환기', input: '스와이프', difficulty: 'EASY', category: '서바이벌2' },
  { type: 'FLICKER_TAP', name: '신호 포착', input: '탭', difficulty: 'EASY', category: '서바이벌2' },
  { type: 'DECRYPT', name: '해독', input: '탭', difficulty: 'NORMAL', category: '서바이벌2' },
  { type: 'GEIGER', name: '가이거', input: '탭', difficulty: 'NORMAL', category: '서바이벌2' },
  { type: 'LOCKPICK', name: '자물쇠', input: '탭', difficulty: 'NORMAL', category: '서바이벌2' },
  { type: 'DECONTAM', name: '오염 제거', input: '순서탭', difficulty: 'NORMAL', category: '서바이벌2' },
  { type: 'BLOOD_TYPE', name: '수혈', input: '탭', difficulty: 'NORMAL', category: '서바이벌2' },
  { type: 'POWER_GRID', name: '전력 복구', input: '순서탭', difficulty: 'NORMAL', category: '서바이벌2' },
  { type: 'DEFUSE', name: '폭탄 해제', input: '순서탭', difficulty: 'HARD', category: '서바이벌2' },
  { type: 'TRIAGE', name: '응급 분류', input: '순서탭', difficulty: 'HARD', category: '서바이벌2' },
  { type: 'PARADROP', name: '낙하산', input: '스와이프', difficulty: 'HARD', category: '서바이벌2' },
  { type: 'QUARANTINE', name: '격리', input: '멀티탭', difficulty: 'HARD', category: '서바이벌2' },
  { type: 'DEAD_DROP', name: '보급품', input: '탭', difficulty: 'HARD', category: '서바이벌2' },
  { type: 'FREQUENCY_JAM', name: '주파수 교란', input: '홀드', difficulty: 'HARD', category: '서바이벌2' },
  // 아포칼립스 3차
  { type: 'SOS_FLASH', name: 'SOS 신호', input: '탭', difficulty: 'EASY', category: '서바이벌3' },
  { type: 'AIRLOCK', name: '에어락', input: '순서탭', difficulty: 'EASY', category: '서바이벌3' },
  { type: 'RADAR_PING', name: '레이더', input: '탭', difficulty: 'EASY', category: '서바이벌3' },
  { type: 'SIPHON', name: '연료 사이펀', input: '홀드+릴리즈', difficulty: 'NORMAL', category: '서바이벌3' },
  { type: 'FIREWALL', name: '방화벽', input: '스와이프', difficulty: 'NORMAL', category: '서바이벌3' },
  { type: 'COMPASS', name: '나침반', input: '스와이프', difficulty: 'NORMAL', category: '서바이벌3' },
  { type: 'CRANK', name: '발전기', input: '회전', difficulty: 'NORMAL', category: '서바이벌3' },
  { type: 'RATION', name: '배급', input: '탭', difficulty: 'NORMAL', category: '서바이벌3' },
  { type: 'DETOX', name: '해독', input: '탭', difficulty: 'NORMAL', category: '서바이벌3' },
  { type: 'BLACKOUT', name: '암전', input: '탭', difficulty: 'HARD', category: '서바이벌3' },
  { type: 'OVERRIDE', name: '코드 입력', input: '키패드', difficulty: 'HARD', category: '서바이벌3' },
  { type: 'PRESSURE', name: '압력 유지', input: '양쪽탭', difficulty: 'HARD', category: '서바이벌3' },
  { type: 'SPLICE', name: '케이블 연결', input: '탭매칭', difficulty: 'HARD', category: '서바이벌3' },
  { type: 'DISTRESS', name: '구조 신호', input: '리듬탭', difficulty: 'HARD', category: '서바이벌3' },
  { type: 'ELEVATOR', name: '엘리베이터', input: '방향탭', difficulty: 'HARD', category: '서바이벌3' },
]

const categories = [...new Set(missions.map(m => m.category))]

function getMissionsByCategory(cat: string) {
  return missions.filter(m => m.category === cat)
}

const DIFF_COLOR: Record<string, string> = {
  EASY: '#8cc890',
  NORMAL: '#ffd644',
  HARD: '#ff3b5c',
}

function play(type: MissionType) {
  router.push(`/game?mission=${type}`)
}

function handleBack() {
  router.push('/')
}
</script>

<template>
  <div class="test-list">
    <div class="scanlines" />

    <div class="header">
      <button class="back-btn" @click="handleBack">←</button>
      <h1>MISSION TEST</h1>
      <div class="count">{{ missions.length }}개</div>
    </div>

    <div class="scroll-area">
      <div v-for="cat in categories" :key="cat" class="category">
        <div class="cat-label">{{ cat }}</div>
        <div class="mission-grid">
          <button
            v-for="m in getMissionsByCategory(cat)"
            :key="m.type"
            class="mission-card"
            @click="play(m.type)"
          >
            <div class="card-top">
              <span class="card-name">{{ m.name }}</span>
              <span class="card-diff" :style="{ color: DIFF_COLOR[m.difficulty] }">
                {{ m.difficulty }}
              </span>
            </div>
            <div class="card-bottom">
              <span class="card-input">{{ m.input }}</span>
              <span class="card-type">{{ m.type }}</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.test-list {
  height: 100dvh;
  display: flex;
  flex-direction: column;
  background: #0a0610;
  position: relative;
  overflow: hidden;
  color: var(--arc-text);
}

.scanlines {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    to bottom,
    transparent 0px,
    transparent 2px,
    rgba(0, 0, 0, 0.22) 2px,
    rgba(0, 0, 0, 0.22) 4px
  );
  pointer-events: none;
  z-index: 10;
}

.header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  padding-top: max(16px, env(safe-area-inset-top));
  position: relative;
  z-index: 5;
}

.back-btn {
  background: none;
  border: 2px solid var(--px-green-border);
  color: var(--px-green-bright);
  font-size: 20px;
  width: 36px;
  height: 36px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 0 2px var(--px-green-frame);
}

.back-btn:active {
  background: rgba(140, 200, 144, 0.1);
}

.header h1 {
  font-size: 20px;
  font-weight: 700;
  color: var(--px-green-bright);
  text-shadow: 0 0 12px var(--px-green-glow);
  flex: 1;
  margin: 0;
}

.count {
  font-size: 14px;
  color: var(--arc-muted);
  font-family: monospace;
}

.scroll-area {
  flex: 1;
  overflow-y: auto;
  padding: 0 16px 32px;
  position: relative;
  z-index: 5;
  -webkit-overflow-scrolling: touch;
}

.category {
  margin-bottom: 20px;
}

.cat-label {
  font-size: 13px;
  font-weight: 700;
  color: var(--arc-muted);
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 8px;
  padding-left: 4px;
}

.mission-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

.mission-card {
  background: rgba(140, 200, 144, 0.03);
  border: 1.5px solid var(--px-green-border);
  padding: 10px 12px;
  cursor: pointer;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 6px;
  box-shadow:
    0 0 0 1px var(--px-green-frame),
    inset 1px 1px 0 var(--px-green-bevel-light),
    inset -1px -1px 0 var(--px-green-bevel-dark);
  transition: all 0.1s;
}

.mission-card:active {
  background: rgba(140, 200, 144, 0.1);
  border-color: var(--px-green-bright);
  box-shadow:
    0 0 0 1px var(--px-green-frame),
    0 0 12px var(--px-green-glow);
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-name {
  font-size: 15px;
  font-weight: 700;
  color: var(--px-green-bright);
}

.card-diff {
  font-size: 10px;
  font-weight: 700;
  font-family: monospace;
  letter-spacing: 1px;
}

.card-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-input {
  font-size: 11px;
  color: var(--arc-muted);
}

.card-type {
  font-size: 9px;
  color: rgba(140, 200, 144, 0.3);
  font-family: monospace;
}
</style>
