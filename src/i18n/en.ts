const en: Record<string, string> = {
  // ====== IntroScene ======
  '수신 메시지 1건': '1 MESSAGE RECEIVED',
  '이전 오퍼레이터의 기록이 남아 있습니다.': 'A previous operator\'s log remains.',
  '"3초. 그게 전부야.': '"3 seconds. That\'s all you get.',
  ' 화면에 뜨면 바로 해. 생각하지 마.': ' When it shows up, just do it. Don\'t think.',
  ' 네가 늦으면 누군가 죽어.': ' If you\'re late, someone dies.',
  ' ...나처럼 되지 마."': ' ...Don\'t end up like me."',
  '— 기록 종료 —': '— END OF LOG —',
  '미션 대기 중...': 'AWAITING MISSION...',
  '시스템 부팅': 'SYSTEM BOOT',
  '신호 상태': 'SIGNAL STATUS',
  '유실': 'LOST',
  '거점 #17': 'OUTPOST #17',
  '접속': 'ONLINE',
  '오퍼레이터 단말': 'OPERATOR TERMINAL',
  '활성': 'ACTIVE',
  '화면을 터치하여 시작': 'TAP TO START',
  '오퍼레이터 기록': 'OPERATOR LOG',

  // ====== MainScreen ======
  '초': 'SEC',
  '생존': 'SURVIVE',
  '미션을 3초 안에 클리어하라!': 'COMPLETE MISSIONS IN 3 SECONDS',
  '게임 시작': 'START',
  '랭킹': 'RANK',
  '옵션': 'OPTIONS',
  'BEST': 'BEST',
  '첫 도전을 시작하세요!': 'BEGIN YOUR FIRST RUN',
  '준비 중입니다': 'COMING SOON',

  // ====== Options ======
  '배경음악': 'BGM',
  'BGM 볼륨': 'BGM VOL',
  '효과음': 'SFX',
  '볼륨': 'SFX VOL',
  '소리 테스트': 'SOUND TEST',
  '언어': 'LANG',

  // ====== Game ======
  '점수:': 'SCORE:',
  'READY...': 'READY...',
  'NEXT!': 'NEXT!',
  '+1': '+1',
  'FAIL': 'FAIL',

  // ====== Result ======
  'GAME OVER': 'GAME OVER',
  '★ NEW RECORD ★': '★ NEW RECORD ★',
  '다시 하기': 'RETRY',
  '홈으로': 'HOME',

  // ====== Colors ======
  '빨강': 'RED',
  '파랑': 'BLUE',
  '노랑': 'YELLOW',
  '초록': 'GREEN',
  '보라': 'PURPLE',

  // ====== Mission Texts ======
  '주파수 조정': 'TUNE FREQ',
  '충전': 'CHARGE',
  '해제': 'DISARM',
  '잡음 제거': 'CLEAR STATIC',
  '방송': 'BROADCAST',
  '스캔': 'SCAN',
  '대피': 'EVACUATE',
  '모스 부호': 'MORSE CODE',
  '소생': 'REVIVE',
  '↑ 환기': '↑ VENT',
  '신호 포착': 'CATCH SIGNAL',
  '복호화': 'DECRYPT',
  '핫스팟 표시': 'MARK HOTSPOT',
  '잠금 해제': 'UNLOCK',
  '제독': 'DECONTAM',
  '전력 복구': 'RESTORE POWER',
  '해체': 'DEFUSE',
  '분류': 'TRIAGE',
  '낙하': 'PARADROP',
  '격리': 'QUARANTINE',
  '신호 교란': 'JAM SIGNAL',
  'SOS': 'SOS',
  '에어록': 'AIRLOCK',
  '핑': 'PING',
  '연료 흡입': 'SIPHON FUEL',
  '바이러스 차단': 'BLOCK VIRUS',
  '나침반 따라가기': 'FOLLOW COMPASS',
  '크랭크': 'CRANK',
  '정전': 'BLACKOUT',
  '오버라이드': 'OVERRIDE',
  '압력': 'PRESSURE',
  '접합': 'SPLICE',
  '조난': 'DISTRESS',
  '글자 맞추기': 'UNSCRAMBLE',
  '가로채기': 'INTERCEPT',
  '정수': 'PURIFY',
  '공정 거래?': 'FAIR TRADE?',
  '채집': 'FORAGE',
  '디가우스': 'DEGAUSS',
  '재부팅?': 'REBOOT?',
  '점화': 'IGNITE',
  'BIOS 오류': 'BIOS ERROR',
  '변이체 찾기': 'FIND MUTANT',
  '보정': 'CALIBRATE',
  '퓨즈 교체': 'REPLACE FUSE',
  '신뢰?': 'TRUST?',
  '제로에 맞춰': 'HIT ZERO',
  '감염자 찾기': 'FIND INFECTED',
  '통금': 'CURFEW',
  '블랙박스': 'BLACKBOX',
  '조각 모음': 'DEFRAG',
  '엄폐': 'TAKE COVER',
  '지뢰줄': 'TRIPWIRE',
  '용접': 'WELD',
  '크랭크 시동': 'CRANK START',
  '배급 분배': 'SPLIT RATIONS',
  '신호 찾기': 'FIND SIGNAL',
  '패킷 스니핑': 'SNIFF PACKET',
  '에러 잡기': 'CATCH ERROR',
  '픽셀 수리': 'FIX PIXEL',
  '안테나 정렬': 'ALIGN ANTENNA',
  '수혈': 'TRANSFUSE',
  '맥박 확인': 'CHECK PULSE',
  '부목': 'SPLINT',
  '해독제': 'ANTIDOTE',
  '재장전': 'RELOAD',
  '발사': 'FIRE',
  '핀 뽑기': 'PULL PIN',
  '바리케이드': 'BARRICADE',
  '조명탄 발사': 'LAUNCH FLARE',
  '밸브 잠금': 'CLOSE VALVES',
  '다리 건너기': 'CROSS BRIDGE',
  '대피소 찾기': 'FIND SHELTER',
  '인터레이스 수리': 'FIX INTERLACE',
  'VSYNC': 'VSYNC',
  'RGB 수리': 'FIX RGB',
  '진짜 찾기': 'FIND REAL',
  '수기 신호': 'SEMAPHORE',
  '암호 해독': 'DECRYPT',
  '섬광 세기': 'COUNT FLASHES',
  '안정화': 'STABILIZE',
  '해치 봉인': 'SEAL HATCH',
  '울타리 수리': 'PATCH FENCE',
  '패널 정렬': 'ALIGN PANEL',
  'PH 테스트': 'PH TEST',
  '원심분리': 'CENTRIFUGE',
  '반감기': 'HALF-LIFE',
  '항로 수정': 'CORRECT COURSE',
  '도킹': 'DOCK',
  '안전한 발걸음': 'SAFE STEP',
  '방전': 'DISCHARGE',
  '납땜': 'SOLDER',
  '업로드': 'UPLOAD',
  '튜브 교체': 'REPLACE TUBE',
  '투표': 'VOTE',
  '선택': 'CHOOSE',
  '미믹 찾기': 'FIND MIMIC',
  '커널 패닉': 'KERNEL PANIC',
  'BSOD': 'BSOD',
  'SEGFAULT': 'SEGFAULT',
  '테이프 접합': 'SPLICE TAPE',
  '신호 증폭': 'BOOST SIGNAL',
  '전압 맞추기': 'MATCH VOLTAGE',
  '지혈대': 'TOURNIQUET',
  '전기 충격': 'SHOCK',
  '방호복 밀봉': 'SEAL SUIT',
  '해동': 'THAW',
  '산소 혼합': 'MIX O2',
  '보급품 잡기': 'CATCH DROP',
  '굴 파기': 'DIG',
  '누르고 있어!': 'HOLD!',
  '함정 설치': 'ARM TRAP',
  '생존자 찾기': 'FIND HUMAN',
  '방어!': 'SHIELD!',
  '백신 혼합': 'MIX VACCINE',
  '변이 절제': 'CUT MUTANT',
  '증류': 'DISTILL',
  '절단': 'CUT',
  '연료 이송': 'TRANSFER FUEL',
  '클레이모어 조준': 'AIM CLAYMORE',
  '돌파': 'BREACH',
  '절단술': 'AMPUTATE',
  '데드 픽셀 수리': 'FIX DEAD PIXEL',
  '회로 연결': 'BRIDGE CIRCUIT',
  '메모리 누수 패치': 'PATCH LEAK',
  '스택 정리': 'POP STACK',
  '미끼 설치': 'SET BAIT',
  '소나': 'SONAR',
  '주파수 잠금': 'LOCK FREQ',

  // ====== Component UI Strings ======
  // TuneMission
  '잠김': 'LOCKED',
  '빗나감': 'MISS',
  '타겟에서 떼기': 'RELEASE AT TARGET',
  '홀드하여 조정': 'HOLD TO TUNE',

  // VoltageMatchMission
  '목표': 'TARGET',
  '현재': 'CURRENT',
  '잠금': 'LOCK',
  '값이 같을 때 탭하세요': 'TAP WHEN VALUES MATCH',

  // VentMission
  '환기구': 'VENT HATCH',
  '방사능 감지': 'RADIATION DETECTED',
  '↑ 스와이프하여 환기': '↑ SWIPE TO VENT',

  // KernelPanicMission
  '복구 명령 선택:': 'SELECT RECOVERY COMMAND:',
  '시스템 재부팅': 'REBOOT SYS',
  '전체 포맷': 'FORMAT ALL',
  '코어 덤프': 'DUMP CORE',

  // BurnInMission
  '진짜 버튼을 탭하세요': 'TAP THE REAL BUTTON',

  // IgniteMission
  '↑ 위로 스와이프': 'SWIPE UP ↑',

  // PacketSniffMission
  '[ 패킷 모니터 ]': '[ PACKET MONITOR ]',
  '감염': 'INFECTED',

  // SplintMission
  '[ 뼈 정렬 ]': '[ BONE ALIGNMENT ]',
  '드래그하여 정렬': 'DRAG TO ALIGN',

  // PowerUpMission
  '전력': 'POWER',

  // FlickerTapMission
  '보일 때 탭하세요': 'TAP WHEN VISIBLE',

  // MutantDetectMission
  '대상 스캔': 'SCAN SUBJECTS',

  // EmpShieldMission
  'EMP 수신 — 방어막 가동': 'EMP INCOMING — ACTIVATE SHIELD',
  '파동이 가까울 때 탭하세요': 'TAP WHEN WAVE IS CLOSE',

  // BarricadeMission
  '순서 틀림': 'WRONG ORDER',

  // BloodTypeMission
  '필요': 'NEEDED',

  // TunnelDigMission
  '깊이: ': 'DEPTH: ',
  '오른쪽 →': 'RIGHT →',
  '← 왼쪽': '← LEFT',

  // InfectedScanMission
  '바이오 스캔': 'BIO-SCAN',

  // 확인 is shared by multiple components
  '확인': 'CONFIRM',

  // GeneSpliceMission
  '변이 구간 절제': 'SPLICE MUTANT SECTION',
  '강조된 염기를 스와이프': 'SWIPE ACROSS HIGHLIGHTED BASES',

  // InterlaceMission
  '신호 정렬': 'ALIGN THE SIGNAL',
  '오프셋: ': 'OFFSET: ',

  // CountdownZeroMission
  '제로에서 탭하세요': 'TAP AT ZERO',

  // AntidoteMission
  '[ 해독제 선택 ]': '[ ANTIDOTE SELECT ]',
  '독: ': 'POISON: ',

  // CapacitorMission
  '커패시터 충전': 'CAPACITOR CHARGE',
  '안전': 'SAFE',

  // SegfaultMission
  '손상된 블록 격리': 'ISOLATE CORRUPTED BLOCK',

  // RationSplitMission
  '배급 분배: ': 'SPLIT RATIONS: ',

  // BlackboxMission
  '신호 분석': 'SIGNAL ANALYSIS',
  '타겟 영역에서 탭하세요': 'TAP IN TARGET ZONE',

  // ElevatorMission
  '목표: ': 'TARGET: ',

  // SolarPanelMission
  '■ 정렬': 'ALIGN ■',

  // Various shared
  '타겟에 맞춰 탭하세요': 'TAP ON TARGET',
  '스와이프하여 용접': 'SWIPE TO WELD',
  '위험 구간을 피하세요': 'AVOID DANGER ZONE',
  '순서대로 탭하세요': 'TAP IN ORDER',
  '패턴을 따라 탭하세요': 'TAP THE PATTERN',
  '움직여서 피하세요': 'MOVE TO DODGE',
  '정확한 타이밍에 탭하세요': 'TAP AT RIGHT TIMING',
  '빈 곳을 채우세요': 'FILL THE GAP',
  '올바른 것을 고르세요': 'PICK THE RIGHT ONE',
  '끝까지 홀드하세요': 'HOLD UNTIL END',
  '밝은 곳을 탭하세요': 'TAP THE BRIGHT ONE',
  '같은 것을 연결하세요': 'CONNECT MATCHING ONES',
  '가려진 것을 기억하세요': 'REMEMBER THE HIDDEN ONE',
  '찾아서 탭하세요': 'FIND AND TAP',
  '맞는 위치에 놓으세요': 'PLACE IN CORRECT POSITION',
  '흔들어서 섞으세요': 'SHAKE TO MIX',
  '당겨서 분리하세요': 'PULL TO SEPARATE',
  '돌려서 열어': 'ROTATE TO OPEN',
  '맞는 것을 선택하세요': 'SELECT THE RIGHT ONE',
  '위로 스와이프': 'SWIPE UP',
  '아래로 스와이프': 'SWIPE DOWN',
  '왼쪽으로 스와이프': 'SWIPE LEFT',
  '오른쪽으로 스와이프': 'SWIPE RIGHT',

  // Direction-related
  '↑ 스와이프': '↑ SWIPE',
  '↓ 스와이프': '↓ SWIPE',
  '← 스와이프': '← SWIPE',
  '→ 스와이프': '→ SWIPE',

  // RebootMission
  'Y': 'Y',
  'N': 'N',
  '재부팅 하시겠습니까?': 'REBOOT SYSTEM?',
  '시스템 장애': 'SYSTEM FAILURE',
  '재부팅? [Y/N]': 'REBOOT? [Y/N]',

  // CurfewMission
  '숨어!': 'HIDE!',
  '이동!': 'MOVE!',
  '순찰 중': 'PATROL',
  '대기...': 'WAIT...',
  '출발!': 'GO!',

  // BlackoutMission
  '빛을 찾아 탭하세요': 'FIND THE LIGHT',

  // OverrideMission
  '코드 입력': 'ENTER CODE',

  // PressureMission
  '압력 조절': 'ADJUST PRESSURE',
  '구간 안에서 유지': 'KEEP IN ZONE',

  // SpliceMission
  '순서대로 연결': 'CONNECT IN ORDER',

  // DistressMission
  '패턴에 맞춰 탭': 'TAP TO PATTERN',

  // SignalInterceptMission
  '신호 가로채기': 'INTERCEPT SIGNAL',

  // PurifyMission
  '정화': 'PURIFY',
  '녹색 영역에서 탭하세요': 'TAP IN GREEN ZONE',

  // BarterMission
  '공정한가?': 'FAIR?',

  // ForageMission
  '채집: 안전한 것을 탭하세요': 'FORAGE: TAP SAFE',

  // DefragMission
  '디스크 조각 모음': 'DEFRAGMENT',
  '블록을 빈 칸으로 드래그': 'DRAG BLOCK TO EMPTY SLOT',

  // ScrambleMission
  '단어 완성': 'COMPLETE WORD',

  // ForageMission
  '먹을 수 있는 것을 탭': 'TAP EDIBLE ONE',
  '독': 'TOXIC',

  // RationMission
  '필요량': 'NEEDED',

  // DetoxMission
  '독소 색상': 'TOXIN COLOR',

  // CompassMission
  'S': 'S',
  'E': 'E',
  'W': 'W',

  // DegaussMission
  '탈자': 'DEGAUSS',
  '불이 켜졌을 때 탭하세요': 'TAP WHEN LIT',

  // BiosErrorMission
  'BIOS 복구': 'BIOS RECOVERY',

  // CalibrateMission
  '범위 안에서 탭': 'TAP IN RANGE',

  // TrustKnockMission
  '노크 패턴을 따라하세요': 'FOLLOW KNOCK PATTERN',
  '듣는 중...': 'LISTEN...',
  '어떤 패턴?': 'WHICH PATTERN?',

  // FuseReplaceMission
  '끊어진 퓨즈를 탭': 'TAP BROKEN FUSE',

  // FalloutDodgeMission
  '안전 구역으로 이동': 'MOVE TO SAFE ZONE',

  // TripwireMission
  '줄을 피하세요': 'AVOID THE WIRE',
  '틈 사이로 스와이프': 'SWIPE THROUGH GAPS',

  // WeldMission
  '이음새를 따라 스와이프': 'SWIPE ALONG SEAM',
  '균열 용접': 'WELD CRACK',
  '균열을 따라 그리세요': 'TRACE THE CRACK',

  // CrankStartMission
  '돌려서 시동': 'ROTATE TO START',

  // NoiseJamMission
  '깨끗한 신호를 찾아 탭': 'TAP CLEAN SIGNAL',

  // BootSequenceMission
  '에러를 잡으세요': 'CATCH THE ERROR',

  // TransfuseMission
  '연결하여 수혈': 'CONNECT TO TRANSFUSE',

  // PulseCheckMission
  '맥박 감지 시 탭': 'TAP WHEN PULSE DETECTED',

  // ReloadMission
  '탄창을 채우세요': 'LOAD THE MAGAZINE',

  // ScopeMission
  '타겟을 조준하세요': 'AIM AT TARGET',

  // GrenadePinMission
  '핀을 당기세요': 'PULL THE PIN',

  // FlareLaunchMission
  '위로 스와이프하여 발사': 'SWIPE UP TO LAUNCH',

  // WaterLevelMission
  '밸브를 닫으세요': 'CLOSE THE VALVES',

  // BridgeCrossMission
  '안전할 때 건너세요': 'CROSS WHEN SAFE',

  // DustStormMission
  '건물로 이동': 'MOVE TO BUILDING',

  // VsyncMission
  '라인을 맞추세요': 'ALIGN THE LINES',

  // ColorBleedMission
  '색상을 분리하세요': 'SEPARATE THE COLORS',

  // SemaphoreMission
  '신호를 맞추세요': 'MATCH THE SIGNAL',

  // CipherWheelMission
  '글자를 맞추세요': 'MATCH THE LETTER',

  // BeaconMission
  '섬광 횟수를 세세요': 'COUNT THE FLASHES',

  // GeneratorMission
  '출력을 안정화': 'STABILIZE OUTPUT',

  // HatchSealMission
  '볼트를 조이세요': 'TIGHTEN BOLTS',

  // PerimeterMission
  '구멍을 막으세요': 'PATCH THE HOLES',

  // PhTestMission
  '중성 범위에 맞추세요': 'SET TO NEUTRAL RANGE',

  // CentrifugeMission
  'RPM': 'RPM',
  '목표 RPM에 맞추세요': 'MATCH TARGET RPM',

  // IsotopeMission
  '안정 동위원소를 선택': 'SELECT STABLE ISOTOPE',

  // AutopilotMission
  '항로를 수정하세요': 'CORRECT THE COURSE',

  // DockingMission
  '정렬하여 도킹': 'ALIGN TO DOCK',

  // MinefieldMission
  '안전한 칸을 탭': 'TAP SAFE CELL',

  // CapacitorMission shared
  '방전하세요': 'DISCHARGE NOW',

  // SolderMission
  '접점을 연결하세요': 'CONNECT THE JOINTS',

  // FirmwareMission
  '업로드 중': 'UPLOADING',
  '완료': 'DONE',

  // TubeReplaceMission
  '손상된 튜브를 교체': 'REPLACE DAMAGED TUBE',

  // RationVoteMission
  '다수결로 결정': 'DECIDE BY VOTE',
  '찬성': 'YES',
  '반대': 'NO',

  // SacrificeMission
  '하나를 선택하세요': 'CHOOSE ONE',

  // MimicMission
  '진짜를 찾으세요': 'FIND THE REAL ONE',

  // BlueScreenMission (keep English - BSOD simulation)

  // TapeSpliceMission
  '테이프를 이어 붙이세요': 'SPLICE THE TAPE',

  // CoreDumpMission
  '에러 블록을 잡으세요': 'CATCH ERROR BLOCK',

  // SignalBoostMission
  '신호를 증폭하세요': 'BOOST THE SIGNAL',

  // TourniquetMission
  '감아서 조이세요': 'WRAP AND TIGHTEN',

  // DefibrillateMission
  '타이밍에 맞춰 충격': 'SHOCK AT RIGHT TIMING',

  // HazmatSealMission
  '틈을 봉인하세요': 'SEAL THE GAPS',

  // CryoThawMission
  '온도를 올리세요': 'RAISE TEMPERATURE',

  // OxygenMixMission
  '비율을 맞추세요': 'MATCH THE RATIO',

  // AirdropMission
  '낙하물을 잡으세요': 'CATCH THE DROP',

  // DeadManSwitchMission
  '놓지 마세요!': "DON'T LET GO!",

  // TrapArmMission
  '순서대로 설치': 'ARM IN ORDER',

  // ThermalScanMission
  '열 신호를 찾으세요': 'FIND HEAT SIGNAL',

  // VaccineMixMission
  '올바른 조합을 선택': 'SELECT RIGHT COMBO',

  // GeneSpliceMission
  '변이 구간을 스와이프': 'SWIPE MUTANT SECTION',

  // DistillMission
  '적정 온도에서 수집': 'COLLECT AT RIGHT TEMP',

  // PlasmaCutMission
  '선을 따라 절단': 'CUT ALONG THE LINE',

  // FuelMixMission
  '연료를 이송하세요': 'TRANSFER THE FUEL',

  // ClaymoreAimMission
  '방향을 맞추세요': 'SET DIRECTION',

  // BreachChargeMission
  '폭약을 설치하세요': 'PLACE THE CHARGE',

  // AmputateMission
  '절단 위치를 선택': 'SELECT CUT POSITION',

  // DeadPixelMission
  '죽은 픽셀을 탭': 'TAP DEAD PIXEL',

  // CircuitBridgeMission
  '회로를 연결하세요': 'BRIDGE THE CIRCUIT',

  // MemoryLeakMission
  '누수를 막으세요': 'PLUG THE LEAK',

  // StackOverflowMission
  '스택을 비우세요': 'CLEAR THE STACK',

  // BaitSetMission
  '미끼를 놓으세요': 'PLACE THE BAIT',

  // SonarPingMission
  '반응을 감지하세요': 'DETECT THE RESPONSE',

  // FrequencyLockMission
  '주파수를 고정하세요': 'LOCK THE FREQUENCY',

  // ====== Component UI Strings (batch 2) ======

  // SacrificeMission
  '손실을 선택하세요': 'CHOOSE YOUR LOSS',
  '또는': 'OR',
  '낮은 비용을 선택하세요': 'PICK LOWER COST',

  // KernelPanicMission
  '복구 명령을 선택하세요:': 'SELECT RECOVERY COMMAND:',

  // BlueScreenMission
  '에러 코드를 맞추세요:': 'MATCH ERROR CODE:',

  // SegfaultMission
  '손상된 블록을 찾으세요': 'ISOLATE CORRUPTED BLOCK',

  // TapeSpliceMission
  '정렬되면 탭하세요': 'TAP WHEN ALIGNED',

  // CoreDumpMission
  '코어 덤프 — 에러를 탭하세요': 'CORE DUMP — TAP ON ERR',

  // TourniquetMission
  '지혈대 적용': 'APPLY TOURNIQUET',
  '빠르게 탭하세요': 'TAP RAPIDLY',

  // DefibrillateMission
  '제세동': 'DEFIBRILLATE',
  '맥박 피크에 탭하세요': 'TAP ON PULSE PEAK',

  // HazmatSealMission
  '밀봉됨': 'SEALED',

  // CryoThawMission
  '냉동 해동 — 안전 구역에서 탭하세요': 'CRYO THAW — TAP IN SAFE ZONE',

  // OxygenMixMission
  '탭하여 혼합 잠금': 'TAP TO LOCK MIX',

  // AirdropMission
  '착륙 지점 위에서 탭하세요': 'TAP WHEN OVER LZ',

  // TunnelDigMission
  '깊이': 'DEPTH',
  '스와이프': 'SWIPE',
  '오른쪽': 'RIGHT',
  '왼쪽': 'LEFT',

  // DeadManSwitchMission
  '유지 중...': 'HOLDING...',
  '누르기': 'HOLD',
  '놓지 마세요': 'DO NOT RELEASE',

  // TrapArmMission
  '트랩 설치: 1 → 2 → 3 탭': 'ARM TRAP: TAP 1 → 2 → 3',

  // ThermalScanMission
  '열 감지 — 사람을 찾으세요': 'THERMAL SCAN — FIND HUMAN',

  // EmpShieldMission
  'EMP 접근 — 방어막 활성화': 'EMP INCOMING — ACTIVATE SHIELD',

  // VaccineMixMission
  '혼합': 'MIX',
  '선택됨': 'SELECTED',

  // GeneSpliceMission
  '변이 구간을 잘라내세요': 'SPLICE MUTANT SECTION',
  '강조된 염기를 스와이프하세요': 'SWIPE ACROSS HIGHLIGHTED BASES',

  // DistillMission
  '구역 안에서 탭하세요': 'TAP IN ZONE',

  // PlasmaCutMission
  '표시에서 탭하세요': 'TAP AT MARKS',

  // FuelMixMission
  '밸브': 'VALVE',
  '밸브를 탭하여 채우세요': 'TAP VALVE TO FILL',

  // ClaymoreAimMission
  '적': 'ENEMY',
  '조준되면 탭하세요': 'TAP WHEN AIMED',

  // BreachChargeMission
  '폭약 설치': 'PLACE CHARGE',
  '장전': 'ARM',
  '폭파': 'DETONATE',
  '█ 돌파 █': '█ BREACH █',

  // AmputateMission
  '스와이프하여 절단하세요': 'SWIPE TO AMPUTATE',

  // DeadPixelMission
  '죽은 픽셀을 탭하세요': 'TAP DEAD PIXELS',

  // CircuitBridgeMission
  '회로 정상': 'CIRCUIT OK',
  '회로 끊김': 'OPEN CIRCUIT',
  '끊어진 곳을 탭하여 연결하세요': 'TAP BREAKS TO BRIDGE',

  // MemoryLeakMission
  '수정됨': 'FIXED',
  '누수': 'LEAK',
  '누수를 탭하여 패치하세요': 'TAP LEAKS TO PATCH',

  // StackOverflowMission
  'POP을 탭하여 스택을 비우세요': 'TAP POP TO CLEAR STACK',

  // BaitSetMission
  '흔적 끝에 미끼를 놓으세요': 'PLACE BAIT ON TRAIL END',

  // ParadropMission
  '바람 반대로 스와이프': 'SWIPE AGAINST WIND',
  '바람': 'WIND',

  // QuarantineMission
  '감염자를 격리하세요': 'ISOLATE INFECTED',

  // DeadDropMission
  '좌표를 찾으세요': 'FIND COORDINATES',

  // FrequencyJamMission
  '주파수를 맞추세요': 'MATCH FREQUENCY',

  // SosFlashMission
  '· · · — — — · · ·': '· · · — — — · · ·',
  'SOS 패턴을 따라하세요': 'FOLLOW SOS PATTERN',

  // AirlockMission
  '밀폐하세요': 'SEAL IT',

  // RadarPingMission
  '반응이 올 때 탭': 'TAP WHEN PING RETURNS',

  // SiphonMission
  '흡입하세요': 'SIPHON NOW',

  // FirewallMission
  '바이러스를 차단': 'BLOCK THE VIRUS',

  // CrankMission
  '돌려!': 'SPIN!',

  // ====== Additional Component UI Strings ======
  '[ 불량 화소 스캔 ]': '[ DEAD PIXEL SCAN ]',
  '[ 생체 신호 ]': '[ VITAL SIGNS ]',
  '[ 시스템 POST ]': '[ SYSTEM POST ]',
  '1/2 해치 열기': '1/2 OPEN HATCH',
  '100%에서 탭하세요': 'TAP AT 100%',
  '2/2 해치 밀봉': '2/2 SEAL HATCH',
  '각 포인트를 누르세요': 'PRESS EACH POINT',
  '개씩': 'EA',
  '건넘': 'CROSSED',
  '걸림': 'JAMMED',
  '고장난 진공관 교체': 'REPLACE BROKEN TUBE',
  '과열': 'OVERCOOKED',
  '관찰': 'OBSERVE',
  '관측 중...': 'OBSERVING...',
  '구간 안에서 탭하세요': 'TAP IN THE ZONE',
  '구역 안에서 탭': 'TAP IN ZONE',
  '길게 눌러 방해': 'HOLD TO JAM',
  '길게 눌러 채우기': 'HOLD TO FILL',
  '길게 눌러 핀 뽑기': 'HOLD TO PULL PIN',
  '납땜 포인트': 'SOLDER POINTS',
  '너무 이름': 'TOO EARLY',
  '널빤지가 안정될 때 탭하세요': 'TAP WHEN PLANK IS STABLE',
  '녹색 구간에서 탭하세요': 'TAP IN GREEN ZONE',
  '다리': 'BRIDGE',
  '대피소': 'SHELTER',
  '동기화': 'SYNC',
  '동기화되면 놓으세요': 'RELEASE WHEN SYNCED',
  '들어보세요...': 'LISTEN...',
  '맥박 없음': 'NO PULSE',
  '명': 'PEOPLE',
  '목표가 중앙에 올 때 탭하세요': 'TAP WHEN TARGET IS CENTERED',
  '무신호': 'NO SIGNAL',
  '밀봉': 'SEAL',
  '반복': 'REPEAT',
  '방사선 감쇠': 'RADIATION DECAY',
  '보급품 공유?': 'SHARE SUPPLIES?',
  '불량 화소를 탭하세요': 'TAP THE HOT PIXEL',
  '비정상': 'ABNORMAL',
  '산성': 'ACIDIC',
  '생존자': 'SURVIVORS',
  '생체신호': 'VITALS',
  '선에서 놓으세요': 'RELEASE AT LINE',
  '수류탄': 'GRENADE',
  '수신 신호': 'INCOMING SIGNAL',
  '수위': 'WATER',
  '스위프': 'SWEEP',
  '스윕이 블립에 닿으면 탭': 'TAP WHEN SWEEP HITS BLIP',
  '스캔 중...': 'SCANNING...',
  '시계 방향': 'CLOCKWISE',
  '시계 방향으로 회전': 'ROTATE CLOCKWISE',
  '시료 분류': 'CLASSIFY SAMPLE',
  '시프트': 'SHIFT',
  '시험지': 'TEST STRIP',
  '식량 분배': 'SPLIT RATIONS',
  '신호 없음': 'NO SIGNAL',
  '신호 정상': 'SIGNAL OK',
  '신호를 찾으세요': 'FIND THE SIGNAL',
  '아니오': 'NO',
  '안전한 칸을 탭하세요': 'TAP SAFE CELL',
  '안전할 때 탭하세요': 'TAP WHEN SAFE',
  '안정': 'STABLE',
  '알칼리': 'ALKALINE',
  '암호': 'CIPHER',
  '압력 유지': 'MAINTAIN PRESSURE',
  '약실': 'CHAMBER',
  '양쪽 밸브를 동시에 탭하세요': 'TAP BOTH VALVES AT ONCE',
  '에어락 시퀀스': 'AIRLOCK SEQUENCE',
  '열기': 'OPEN',
  '예': 'YES',
  '오류 발생 시 탭하세요': 'TAP WHEN ERROR APPEARS',
  '오른손': 'RIGHT',
  '오버플로우': 'OVERFLOW',
  '오염제거': 'DECONTAM',
  '오프셋': 'OFFSET',
  '왼손': 'LEFT',
  '왼쪽 / 오른쪽 탭': 'TAP LEFT / RIGHT',
  '우': 'R',
  '우주선 도킹': 'DOCKING',
  '위로 스와이프하여 장전': 'SWIPE UP TO RELOAD',
  '장전 완료': 'LOADED',
  '전력망 제어': 'GRID CONTROL',
  '점멸 횟수를 세세요': 'COUNT THE FLASHES',
  '정렬 완료': 'ALIGNED',
  '정상': 'NORMAL',
  '정지': 'STOP',
  '조명탄 발사 완료': 'FLARE SENT',
  '조명탄': 'FLARE',
  '조준경': 'SCOPE',
  '좌': 'L',
  '중성': 'NEUTRAL',
  '중앙에 올 때 탭하세요': 'TAP WHEN CENTERED',
  '지금 탭!': 'TAP NOW!',
  '지금 탭하세요': 'TAP NOW',
  '지뢰 위치 기억': 'MEMORIZE MINES',
  '진짜 신호를 탭하세요': 'TAP THE REAL SIGNAL',
  '짧게=· 길게=—': 'SHORT=· LONG=—',
  '찢어짐': 'TEAR',
  '채널 정렬': 'ALIGN CHANNELS',
  '추락': 'FELL',
  '침입구 수리': 'PATCH BREACH',
  '케이블 접합': 'SPLICE CABLES',
  '코드 암기': 'MEMORIZE CODE',
  '탄창': 'MAG',
  '탭하여 도킹': 'TAP TO DOCK',
  '탭하여 송신': 'TAP TO TRANSMIT',
  '펌웨어 업로드': 'FIRMWARE UPLOAD',
  '피크에서 떼기': 'RELEASE AT PEAK',
  '핀 제거 완료': 'PIN PULLED',
  '해독': 'DETOX',
  '해치 밀봉': 'SEAL HATCH',
  '홀드하여 송신': 'HOLD TO TX',
  '회복': 'RECOVERED',
  '회전': 'ROTATIONS',
  '흔들림': 'SHAKING',
}

export default en
