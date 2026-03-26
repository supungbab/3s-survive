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
  // 아포칼립스
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
  // 4차 — 신호/생존/CRT
  { type: 'SCRAMBLE', name: '글자 조합', input: '순서탭', difficulty: 'HARD', category: '신호' },
  { type: 'SIGNAL_INTERCEPT', name: '신호 가로채기', input: '탭', difficulty: 'NORMAL', category: '신호' },
  { type: 'PURIFY', name: '정수', input: '타이밍탭', difficulty: 'EASY', category: '생존' },
  { type: 'BARTER', name: '물물교환', input: 'O/X', difficulty: 'NORMAL', category: '생존' },
  { type: 'FORAGE', name: '채집', input: '탭', difficulty: 'EASY', category: '생존' },
  { type: 'DEGAUSS', name: '디가우스', input: '타이밍탭', difficulty: 'EASY', category: 'CRT' },
  { type: 'REBOOT', name: '리부트', input: 'Y/N', difficulty: 'EASY', category: 'CRT' },
  { type: 'IGNITE', name: '불 피우기', input: '스와이프', difficulty: 'NORMAL', category: '생존' },
  { type: 'BIOS_ERROR', name: 'BIOS 에러', input: '순서탭', difficulty: 'HARD', category: 'CRT' },
  { type: 'MUTANT_DETECT', name: '돌연변이', input: '탭', difficulty: 'NORMAL', category: '생존' },
  { type: 'CALIBRATE', name: '조준 보정', input: '타이밍탭', difficulty: 'NORMAL', category: '전투' },
  { type: 'FUSE_REPLACE', name: '퓨즈 교체', input: '탭', difficulty: 'NORMAL', category: 'CRT' },
  { type: 'TRUST_KNOCK', name: '노크 판별', input: '탭', difficulty: 'HARD', category: '심리' },
  { type: 'COUNTDOWN_ZERO', name: '카운트다운', input: '타이밍탭', difficulty: 'NORMAL', category: '긴장' },
  { type: 'INFECTED_SCAN', name: '감염자 탐지', input: '탭', difficulty: 'NORMAL', category: '생존' },
  { type: 'CURFEW', name: '통금', input: '대기+탭', difficulty: 'HARD', category: '긴장' },
  { type: 'BLACKBOX', name: '블랙박스', input: '타이밍탭', difficulty: 'NORMAL', category: '신호' },
  { type: 'DEFRAG', name: '조각모음', input: '드래그', difficulty: 'NORMAL', category: 'CRT' },
  { type: 'FALLOUT_DODGE', name: '낙진 회피', input: '드래그', difficulty: 'HARD', category: '생존' },
  { type: 'TRIPWIRE', name: '지뢰선', input: '스와이프', difficulty: 'HARD', category: '전투' },
  { type: 'WELD', name: '용접', input: '트레이스', difficulty: 'NORMAL', category: '수리' },
  { type: 'CRANK_START', name: '수동 시동', input: '회전', difficulty: 'NORMAL', category: '수리' },
  { type: 'RATION_SPLIT', name: '균등 분배', input: '슬라이더', difficulty: 'HARD', category: '심리' },
  { type: 'NOISE_JAM', name: '노이즈 재밍', input: '탭', difficulty: 'HARD', category: '신호' },
  // 5차 — 장비/의료/CRT글리치
  { type: 'PACKET_SNIFF', name: '패킷 스니핑', input: '탭', difficulty: 'NORMAL', category: '해킹' },
  { type: 'BOOT_SEQUENCE', name: '부팅 에러', input: '타이밍탭', difficulty: 'NORMAL', category: 'CRT' },
  { type: 'PIXEL_FIX', name: '픽셀 수리', input: '탭', difficulty: 'EASY', category: 'CRT' },
  { type: 'ANTENNA_ALIGN', name: '안테나 정렬', input: '슬라이더', difficulty: 'NORMAL', category: '신호' },
  { type: 'TRANSFUSE', name: '수혈 게이지', input: '타이밍탭', difficulty: 'NORMAL', category: '의료' },
  { type: 'PULSE_CHECK', name: '맥박 판별', input: 'O/X', difficulty: 'NORMAL', category: '의료' },
  { type: 'SPLINT', name: '부목', input: '드래그', difficulty: 'NORMAL', category: '의료' },
  { type: 'ANTIDOTE', name: '해독제', input: '탭', difficulty: 'HARD', category: '의료' },
  { type: 'RELOAD', name: '재장전', input: '스와이프', difficulty: 'NORMAL', category: '전투' },
  { type: 'SCOPE', name: '조준', input: '타이밍탭', difficulty: 'NORMAL', category: '전투' },
  { type: 'GRENADE_PIN', name: '수류탄', input: '홀드+릴리즈', difficulty: 'HARD', category: '전투' },
  { type: 'BARRICADE', name: '바리케이드', input: '순서탭', difficulty: 'HARD', category: '전투' },
  { type: 'FLARE_LAUNCH', name: '조명탄', input: '스와이프', difficulty: 'NORMAL', category: '환경' },
  { type: 'WATER_LEVEL', name: '수위 차단', input: '동시탭', difficulty: 'HARD', category: '환경' },
  { type: 'BRIDGE_CROSS', name: '다리 건너기', input: '타이밍탭', difficulty: 'HARD', category: '환경' },
  { type: 'DUST_STORM', name: '모래폭풍', input: '탭', difficulty: 'HARD', category: '환경' },
  { type: 'INTERLACE', name: '인터레이스', input: '드래그', difficulty: 'NORMAL', category: 'CRT글리치' },
  { type: 'VSYNC', name: '수직동기화', input: '타이밍탭', difficulty: 'NORMAL', category: 'CRT글리치' },
  { type: 'COLOR_BLEED', name: 'RGB 복구', input: '순서탭', difficulty: 'HARD', category: 'CRT글리치' },
  { type: 'BURN_IN', name: '번인 판별', input: '탭', difficulty: 'HARD', category: 'CRT글리치' },
  // 6차 — 통신/기지/과학/항해
  { type: 'SEMAPHORE', name: '수기 신호', input: '방향탭', difficulty: 'HARD', category: '통신' },
  { type: 'CIPHER_WHEEL', name: '암호 휠', input: '탭', difficulty: 'HARD', category: '통신' },
  { type: 'BEACON', name: '비콘 세기', input: '탭', difficulty: 'NORMAL', category: '통신' },
  { type: 'GENERATOR', name: 'RPM 안정', input: '타이밍탭', difficulty: 'NORMAL', category: '기지' },
  { type: 'HATCH_SEAL', name: '해치 밀봉', input: '순서탭', difficulty: 'HARD', category: '기지' },
  { type: 'PERIMETER', name: '울타리 수리', input: '탭', difficulty: 'NORMAL', category: '기지' },
  { type: 'SOLAR_PANEL', name: '태양광', input: '슬라이더', difficulty: 'NORMAL', category: '기지' },
  { type: 'PH_TEST', name: 'pH 테스트', input: '판별', difficulty: 'NORMAL', category: '과학' },
  { type: 'CENTRIFUGE', name: '원심분리기', input: '타이밍탭', difficulty: 'NORMAL', category: '과학' },
  { type: 'ISOTOPE', name: '동위원소', input: '타이밍탭', difficulty: 'NORMAL', category: '과학' },
  { type: 'AUTOPILOT', name: '자동항법', input: '방향탭', difficulty: 'NORMAL', category: '항해' },
  { type: 'DOCKING', name: '도킹', input: '타이밍탭', difficulty: 'NORMAL', category: '항해' },
  { type: 'MINEFIELD', name: '지뢰밭', input: '기억+탭', difficulty: 'HARD', category: '전투' },
  { type: 'CAPACITOR', name: '콘덴서', input: '타이밍탭', difficulty: 'NORMAL', category: '전자' },
  { type: 'SOLDER', name: '납땜', input: '롱탭', difficulty: 'HARD', category: '전자' },
  { type: 'FIRMWARE', name: '펌웨어', input: '타이밍탭', difficulty: 'NORMAL', category: '전자' },
  { type: 'TUBE_REPLACE', name: '진공관', input: '탭', difficulty: 'NORMAL', category: '전자' },
  { type: 'RATION_VOTE', name: '보급 투표', input: 'O/X', difficulty: 'HARD', category: '심리' },
  { type: 'SACRIFICE', name: '선택', input: '탭', difficulty: 'HARD', category: '심리' },
  { type: 'MIMIC', name: '가짜 찾기', input: '탭', difficulty: 'HARD', category: '심리' },
  // CRT/레트로
  { type: 'KERNEL_PANIC', name: '커널 패닉', input: '탭', difficulty: 'NORMAL', category: 'CRT' },
  { type: 'BLUE_SCREEN', name: '블루스크린', input: '탭', difficulty: 'NORMAL', category: 'CRT' },
  { type: 'SEGFAULT', name: '세그폴트', input: '탭', difficulty: 'NORMAL', category: 'CRT' },
  { type: 'TAPE_SPLICE', name: '테이프 접합', input: '탭', difficulty: 'NORMAL', category: 'CRT' },
  { type: 'CORE_DUMP', name: '코어 덤프', input: '탭', difficulty: 'HARD', category: 'CRT' },
  { type: 'SIGNAL_BOOST', name: '신호 증폭', input: '스와이프', difficulty: 'NORMAL', category: 'CRT' },
  { type: 'VOLTAGE_MATCH', name: '전압 맞추기', input: '탭', difficulty: 'NORMAL', category: 'CRT' },
  { type: 'DEAD_PIXEL', name: '데드 픽셀', input: '탭', difficulty: 'EASY', category: 'CRT' },
  { type: 'CIRCUIT_BRIDGE', name: '회로 연결', input: '탭', difficulty: 'NORMAL', category: 'CRT' },
  { type: 'MEMORY_LEAK', name: '메모리 누수', input: '탭', difficulty: 'HARD', category: 'CRT' },
  { type: 'STACK_OVERFLOW', name: '스택 오버플로우', input: '탭', difficulty: 'NORMAL', category: 'CRT' },
  // 생존/의료
  { type: 'TOURNIQUET', name: '지혈대', input: '탭', difficulty: 'EASY', category: '의료' },
  { type: 'DEFIBRILLATE', name: '제세동', input: '탭', difficulty: 'HARD', category: '의료' },
  { type: 'HAZMAT_SEAL', name: '방호복 밀봉', input: '탭', difficulty: 'NORMAL', category: '의료' },
  { type: 'CRYO_THAW', name: '냉동 해동', input: '탭', difficulty: 'NORMAL', category: '의료' },
  { type: 'OXYGEN_MIX', name: '산소 배합', input: '탭', difficulty: 'NORMAL', category: '의료' },
  { type: 'VACCINE_MIX', name: '백신 조합', input: '탭', difficulty: 'HARD', category: '의료' },
  { type: 'GENE_SPLICE', name: 'DNA 절단', input: '스와이프', difficulty: 'HARD', category: '의료' },
  { type: 'AMPUTATE', name: '절단', input: '스와이프', difficulty: 'HARD', category: '의료' },
  { type: 'DISTILL', name: '증류', input: '탭', difficulty: 'NORMAL', category: '의료' },
  // 전투/전술
  { type: 'DEAD_MAN_SWITCH', name: '데드맨 스위치', input: '홀드', difficulty: 'HARD', category: '전투' },
  { type: 'TRAP_ARM', name: '함정 설치', input: '순차탭', difficulty: 'HARD', category: '전투' },
  { type: 'THERMAL_SCAN', name: '열화상', input: '탭', difficulty: 'NORMAL', category: '전투' },
  { type: 'EMP_SHIELD', name: 'EMP 방어', input: '탭', difficulty: 'HARD', category: '전투' },
  { type: 'CLAYMORE_AIM', name: '클레이모어', input: '탭', difficulty: 'HARD', category: '전투' },
  { type: 'BREACH_CHARGE', name: '돌파', input: '순차탭', difficulty: 'HARD', category: '전투' },
  // 자원/공학
  { type: 'AIRDROP', name: '보급 투하', input: '탭', difficulty: 'EASY', category: '자원' },
  { type: 'TUNNEL_DIG', name: '터널 파기', input: '교대스와이프', difficulty: 'NORMAL', category: '자원' },
  { type: 'PLASMA_CUT', name: '플라즈마 절단', input: '순차탭', difficulty: 'NORMAL', category: '자원' },
  { type: 'FUEL_MIX', name: '연료 이송', input: '탭', difficulty: 'NORMAL', category: '자원' },
  { type: 'BAIT_SET', name: '미끼 설치', input: '탭', difficulty: 'NORMAL', category: '전투' },
  { type: 'SONAR_PING', name: '소나', input: '탭', difficulty: 'NORMAL', category: '전투' },
  { type: 'FREQUENCY_LOCK', name: '주파수 고정', input: '탭', difficulty: 'HARD', category: 'CRT' },
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
