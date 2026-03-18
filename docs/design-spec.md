# 3초 생존 - Design Specification

## Aesthetic Direction: "Post-Apocalyptic Pixel Arcade"

폐허가 된 도시, 고장난 CRT 모니터 속 픽셀아트 아케이드 캐비넷.
스캔라인과 노이즈 너머로 뮤트 그린 UI가 희미하게 빛나는, 어둡고 절제된 생존 분위기.

---

## 1. Design Tokens

### Pixel Green (Primary UI)

메인 UI에 사용되는 뮤트 그린 팔레트. 네온이 아닌 CRT 인광체 느낌.

| Token | Value | Usage |
|---|---|---|
| `--px-green` | `#8cc890` | 기본 텍스트, 아이콘 |
| `--px-green-bright` | `#a0dca4` | 강조 텍스트, 호버 상태 |
| `--px-green-dim` | `#5a7a5c` | 서브 텍스트, 비활성 |
| `--px-green-glow` | `rgba(140,200,144,0.4)` | 글로우 이펙트 |
| `--px-green-glow-strong` | `rgba(140,200,144,0.8)` | 강한 글로우 (플리커) |

### Pixel Green Surfaces (Primary 버튼/카드)

| Token | Value | Usage |
|---|---|---|
| `--px-green-bg` | `#0c140c` | 버튼/카드 배경 |
| `--px-green-bg-hover` | `#101c10` | 호버 배경 |
| `--px-green-border` | `#4a5648` | 보더 |
| `--px-green-border-hover` | `#5a6a56` | 호버 보더 |
| `--px-green-bevel-light` | `#5a6858` | 베벨 하이라이트 (inset top-left) |
| `--px-green-bevel-dark` | `#2a322a` | 베벨 섀도 (inset bottom-right) |
| `--px-green-frame` | `#111311` | 외곽 프레임 |

### Pixel Neutral (Secondary 버튼)

| Token | Value | Usage |
|---|---|---|
| `--px-neutral` | `#9a9690` | 기본 텍스트 |
| `--px-neutral-bright` | `#c0bab0` | 호버 텍스트 |
| `--px-neutral-dim` | `#606058` | 서브 텍스트 |
| `--px-neutral-bg` | `#121214` | 배경 |
| `--px-neutral-bg-hover` | `#181818` | 호버 배경 |
| `--px-neutral-border` | `#4a4a46` | 보더 |
| `--px-neutral-border-hover` | `#5a5a56` | 호버 보더 |
| `--px-neutral-bevel-light` | `#3a3a38` | 베벨 하이라이트 |
| `--px-neutral-bevel-dark` | `#1a1a1c` | 베벨 섀도 |
| `--px-neutral-frame` | `#0a0a0c` | 외곽 프레임 |

### Pixel Icon Colors

| Token | Value | Usage |
|---|---|---|
| `--px-crown` | `#b8a060` | 왕관 아이콘 밝은 부분 |
| `--px-crown-dark` | `#9a8450` | 왕관 아이콘 어두운 부분 |

### System Colors

| Token | Value | Usage |
|---|---|---|
| `--arc-bg` | `#0a0610` | 전체 배경 (딥 퍼플-블랙) |
| `--arc-surface` | `#111827` | 카드, 오버레이 배경 |
| `--arc-surface-light` | `#1e293b` | 보더, 구분선 |
| `--arc-text` | `#e2e8f0` | 기본 텍스트 (흰색 계열) |
| `--arc-muted` | `#64748b` | 보조 텍스트, "꺼진" 상태 |
| `--arc-danger` | `#ff3b5c` | 실패, GAME OVER |
| `--arc-danger-glow` | `rgba(255,59,92,0.4)` | 위험 글로우 |
| `--arc-cyan` | `#00e5ff` | 보조 액센트 (롱프레스 등) |

### Game Mission Colors

| Token | Value |
|---|---|
| `--color-red` | `#ff3b5c` |
| `--color-blue` | `#448aff` |
| `--color-yellow` | `#ffd600` |
| `--color-green` | `#00e676` |
| `--color-purple` | `#d500f9` |

---

## 2. Typography

- **Font**: `Galmuri11` (로컬 woff2 픽셀 폰트)
- **Fallback**: `monospace`
- 픽셀 폰트 특성상 `font-smoothing` 비활성화로 선명도 유지

### Scale

| Element | Size | Weight |
|---|---|---|
| 메인 타이틀 숫자 | 96px | 900 |
| 메인 타이틀 텍스트 | 36px | 700 |
| 게임 점수 | 48px | 900 |
| 미션 텍스트 | 32px | 900 |
| 페이즈 뱃지 | 24-32px | 700 |
| 버튼 라벨 (primary) | 20px | 700 |
| 버튼 라벨 (sub) | 14px | 700 |
| 버튼 서브텍스트 | 8-10px | 400 |
| 힌트/보조 텍스트 | 13-16px | 400 |

---

## 3. Button System

### Pixel-Art Border 구조

모든 버튼은 `border-radius: 0`의 직각 픽셀아트 스타일.
다중 레이어 `box-shadow`로 CRT 게임 UI 베벨 효과 구현:

```
┌─ outer frame (0 0 0 3px --px-green-frame)
│ ┌─ border (3px solid --px-green-border)
│ │ ┌─ bevel highlight (inset 1px 1px --px-green-bevel-light)
│ │ │ ┌─ bevel shadow (inset -1px -1px --px-green-bevel-dark)
│ │ │ │ ┌─ background (--px-green-bg)
│ │ │ │ │
```

### Primary 버튼 (그린)
- 배경: `--px-green-bg` / 텍스트: `--px-green`
- 보더: `--px-green-border` (3px)
- 좌측 아이콘 구분선 + CSS pixel-art 아이콘 (러닝맨)
- `btn-pulse` 애니메이션

### Sub 버튼 (뉴트럴)
- 배경: `--px-neutral-bg` / 텍스트: `--px-neutral`
- 보더: `--px-neutral-border` (2px)
- CSS pixel-art 아이콘 (왕관, 기어)

### Result 버튼
- "다시 하기": primary 스타일 (2px 보더)
- "홈으로": neutral 스타일, 더 어두운 톤 (`#0c0c0e` bg, `#333330` border)

---

## 4. Visual Effects

### Scanlines
CRT 스캔라인. 메인/게임 화면 모두 적용. `z-index: 13` (메인), `10` (게임).
```css
background: repeating-linear-gradient(
  to bottom,
  transparent 0px, transparent 2px,
  rgba(0,0,0,0.22) 2px, rgba(0,0,0,0.22) 4px
);
```

### CRT Effects (MainScreen only)
- **Vignette**: 가장자리 어둡게 (`radial-gradient`, 45%→85%)
- **Flicker**: 0.12s 주기 미세한 화면 깜빡임
- **Noise**: SVG fractalNoise 텍스처, `opacity: 0.7`

### Background Atmosphere (MainScreen)
화재 반사 톤의 배경. 하단에서 붉은 글로우, 상단은 어두운 퍼플.
```css
background: #0a0610;
background-image:
  radial-gradient(ellipse at 50% 100%, rgba(255,80,20,0.18) ...),
  radial-gradient(ellipse at 30% 20%, rgba(80,20,60,0.15) ...);
```

### Background Atmosphere (GameView)
메인보다 절제된 톤. 하단 화재 반사 + 상단 미세 그린.
```css
background: #0a0610;
background-image:
  radial-gradient(ellipse at 50% 100%, rgba(255,80,20,0.08) ...),
  radial-gradient(ellipse at 50% 0%, rgba(57,255,20,0.03) ...);
```

### City Skyline (MainScreen only)
CSS-only 2레이어 폐허 도시 실루엣:
- Back layer: `--arc-building-back` (`#1a0c0e`), 화재 반사 box-shadow
- Front layer: `--arc-building-front` (`#0a0508`), 창문 불빛 + 상단 글로우

### Ground Layer (MainScreen only)
흙 텍스처 + 화재 반사. 건물 하단을 가리는 전경.
SVG fractalNoise 노이즈 + 화재 톤 그라데이션.

### Embers (MainScreen only)
12개의 불씨 파티클. 수평선에서 위로 떠오르는 애니메이션.

### Stars (MainScreen only)
30개의 `span`. 매우 희미한 반짝임 (`opacity: 0.02~0.25`).

### Flicker Light (Tagline)
"미션을 3초 안에 클리어하라!" 텍스트의 고장난 형광등 효과.
기본 켜진 상태(`--px-green` + glow), 10초 주기로 간헐적으로 `--arc-muted`로 꺼짐.

---

## 5. Animation Catalog

| Name | Duration | Easing | Usage |
|---|---|---|---|
| `twinkle` | 1.5-3.1s | ease-in-out | 별 반짝임 (매우 희미) |
| `num-breathe` | 3s | ease-in-out | 타이틀 숫자 글로우 |
| `btn-pulse` | 3s | ease-in-out | 시작 버튼 글로우 |
| `flicker-light` | 10s | steps(1) | 태그라인 형광등 깜빡임 |
| `crt-flicker` | 0.12s | infinite | CRT 화면 깜빡임 |
| `noise-drift` | 0.5s | steps(3) | 노이즈 텍스처 이동 |
| `building-glow` | 5s | ease-in-out | 빌딩 상단 화재 글로우 |
| `fire-glow` | 4s | ease-in-out | 지평선 화재 글로우 |
| `ember-rise` | 3-7.5s | ease-out | 불씨 상승 |
| `shake` | 0.3s | ease-in-out | 실패 시 화면 흔들림 |
| `score-pop` | 0.3s | ease-out | 점수 획득 팝 |
| `fade-in` | 0.3s | ease-out | 요소 등장 |
| `flash-red` | 0.4s | ease-out | 피드백 플래시 |
| `particle-fly` | 0.5s | ease-out | 파티클 버스트 |
| `pulse` | 0.6-1s | ease-in-out | 범용 펄스 |
| `mission-enter` | 0.3s | ease-out | 미션 텍스트 등장 |

---

## 6. Component Design

### MainScreen
- 전체화면 배경 + CRT 이펙트 (vignette, flicker, noise, scanlines)
- 별 + 2레이어 폐허 도시 + 흙 전경 + 불씨
- 타이틀: "3" (`--px-green-bright`) + "초" + "생존"
- 태그라인: `--px-green` + 형광등 깜빡임 효과
- 픽셀아트 버튼 그룹 (primary + sub x2)
- 최고 점수 뱃지 (`--px-green-bright`)

### GameView
- 배경: 화재 반사 톤 + 스캔라인
- 상단: 픽셀아트 타이머 바 + 점수
- 중앙: 미션 텍스트 + 미션 컨텐츠
- 하단: 페이즈 뱃지

### TimerBar
- 높이 8px, `border-radius: 0`, 픽셀 베벨 보더
- 배경: `--px-green-bg`, 보더: `--px-green-border`
- active 시 그린 글로우
- 30% 미만 시 `--arc-danger` + 레드 글로우

### ScoreDisplay
- 48px 점수 (`--px-green-bright`), 그린 글로우
- "점수:" 라벨 (`--arc-muted`)
- 점수 증가 시 pop 애니메이션

### MissionText
- 32px 볼드, 그린 글로우
- mission-enter 애니메이션

### Mission Components
모든 미션 요소는 `border-radius: 0` 픽셀아트 스타일.
- **ColorTap**: 80px 사각 버튼, 각 색상 보더 + 픽셀 프레임
- **Swipe**: 96px 화살표 아이콘
- **MultiTap**: 카운터 + 픽셀 프로그레스 바
- **LongPress**: 120px 사각 타겟, 누르면 시안 글로우
- **DualTap**: 쌍 사각 타겟, 그린 베벨 보더, 펄스
- **DoNothing**: 위험 아이콘 + "참아!"
- **Sequence**: 64px 사각 스텝 카드, 뉴트럴 베벨 보더

### ResultOverlay
- 반투명 다크 오버레이 (`rgba(4,2,6,0.94)`)
- 뉴트럴 톤 카드 (`#0a0a0c` bg, `#3a3a38` border)
- 카드 내 스캔라인 텍스처
- 헤더: 픽셀 해골 아이콘 + "GAME OVER" (`--arc-danger`)
- 점선 디바이더로 섹션 구분
- 점수: `--px-green-bright`, BEST: `--px-neutral-dim`
- NEW RECORD: `--px-green` + 펄스
- 버튼: "▶ 다시 하기" (primary), "◀ 홈으로" (neutral)

### FeedbackLayer
- 플래시 오버레이 + 파티클 시스템
- 파티클에 글로우 추가

---

## 7. Audio

### SFX (useAudio)
Web Audio API 오실레이터 기반. `--settings.volume` 연동.
- **Success**: 880Hz → 1320Hz sine (상승 2음)
- **Fail**: 200Hz → 150Hz square (하강 2음, 거칠게)
- **Tick**: 600Hz sine, 0.05s (UI 피드백)

### BGM (useBgm)
Web Audio API 스텝 시퀀서. A 마이너, 68 BPM.
메인 화면에서 재생, 게임 시작 시 정지.

| Layer | Wave | 역할 |
|---|---|---|
| Melody | square + lowpass 800Hz | 희미한 칩튠 멜로디 |
| Bass | triangle | A1/D2/E2 저음 펄스 |
| Arpeggio | sine | off-beat 유령 패드 |

마스터 볼륨: SFX의 35% 수준.

---

## 8. Layout

- 모바일 퍼스트: `max-width: 500px`, 중앙 정렬
- `100dvh` 전체 뷰포트 사용
- `touch-action: none` 제스처 충돌 방지
- `safe-area-inset` 노치 대응
