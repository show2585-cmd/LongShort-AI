# TODO

> 2026-10-08 기준. 우선순위: 🔴 출시 전 필수 · 🟡 품질 개선 · 🟢 추가 기능

## 🔴 출시 전 필수

### 실데이터 검증 (방화벽 없는 환경에서)
- [ ] `.env.local` 의 `VITE_USE_MOCK=true` 제거 후 Binance API 로 정상 표시되는지 확인
  - [ ] 캔들(`/fapi/v1/klines`) → 5개 타임프레임 추세 카드
  - [ ] 24시간 시세(`/fapi/v1/ticker/24hr`) → 현재가·등락률
  - [ ] 롱숏 비율 3종(`globalLongShortAccountRatio`, `topLongShortPositionRatio`, `takerlongshortRatio`)
  - [ ] 미결제약정 이력(`openInterestHist`) → 청산 맵
- [ ] `openInterestHist` 의 timestamp 가 구간 시작인지 끝인지 확인 → `estimate.ts` 의 봉 매칭 로직 검증
- [ ] TradingView 위젯 로딩 확인 (심볼 `BINANCE:BTCUSDT.P` 형식, `locale: 'kr'`, 타임프레임 전환)
- [ ] Binance API 요청 한도(weight) 점검 — 현재 사용자 1명당 30초~5분 주기로 약 10개 엔드포인트 호출

### 배포 인프라
- [x] `/binance` → `https://fapi.binance.com` 프록시 (`vercel.json` + `api/binance.ts`, 서울 리전, CDN 캐시 10초)
- [ ] Vercel 에 저장소 연결 후 첫 배포
  - [ ] 배포 후 `/binance/fapi/v1/klines?symbol=BTCUSDT&interval=1h&limit=2` 가 JSON 을 반환하는지 확인 (451 이면 리전 문제)
  - [ ] Vercel Functions 로그에서 실행 리전이 icn1 인지 확인
- [ ] 도메인 · HTTPS — `longshort-ai.com` (가비아) Vercel 연결, Valid Configuration · 인증서 확인

### SEO
- [x] 메타 태그 · OG · Twitter 카드 · JSON-LD · robots.txt · sitemap.xml · manifest · 아이콘
- [x] JS 미실행 크롤러용 정적 콘텐츠, 코인별 문서 제목, h1/h2 구조
- [ ] 배포 후 Google Search Console · 네이버 서치어드바이저 등록, 소유확인 환경 변수 설정, sitemap 제출
- [x] 사이트 주소 `https://longshort-ai.com` 을 `SITE.url` 기본값으로 지정
- [ ] 카카오톡 · 슬랙 공유 미리보기(OG 이미지) 확인
- [ ] 코인별 URL(`/btc`, `/eth` …) + 프리렌더링으로 코인별 검색 유입 확보 검토
- [ ] 미사용 `public/popup_img.png`(1.5MB) 삭제 — 현재 `popup_img.jpg`(136KB) 사용 중

### 애드센스
- [x] 개인정보처리방침 · 이용약관 · 서비스 소개 페이지
- [x] 애드센스 스크립트 · 소유확인 메타 · ads.txt 자동 생성, 광고 슬롯 컴포넌트
- [ ] 가비아 DNS 설정 (A `@` → Vercel IP, CNAME `www` → Vercel) 후 연결 확인
- [ ] 애드센스 가입 · 사이트 등록 → Vercel 에 `VITE_ADSENSE_CLIENT` 설정 후 재배포 → 심사 신청
- [ ] 개인정보처리방침 보호책임자 실명 기재 여부 결정, 법률 검토
- [ ] 가이드 글 콘텐츠 추가 (롱숏 비율 보는 법, 청산맵이란, 지표 설명 등) — 승인 확률 향상
- [ ] 승인 후 광고 단위 2개 생성 → `VITE_ADSENSE_SLOT_SIDEBAR`, `VITE_ADSENSE_SLOT_CONTENT` 설정
- [ ] 애드센스 "개인정보 보호 및 메시지"에서 EU/UK 동의 메시지 활성화

### 법적 고지
- [ ] "확률" 표기 검토 — 현재 값은 백테스트 보정 전 **신호 강도**임. 보정 전까지 "추세 강도" 등으로 표기할지 결정
- [ ] 투자 권유 아님 면책 문구 법률 검토
- [ ] TradingView 위젯 이용약관(로고·저작권 표기 유지) 확인

## 🟡 품질 개선

### 추세 모델
- [ ] 백테스트 스크립트 작성 — 점수 구간별 이후 N봉 방향 적중률 측정
- [ ] 측정 결과로 로지스틱 계수(`LOGISTIC_K`) 와 지표별 가중치 보정 → 실제 확률에 가깝게
- [ ] 타임프레임별로 가중치를 다르게 둘지 검토 (단기봉은 모멘텀, 장기봉은 구조 위주 등)
- [ ] 미완성 봉(진행 중인 마지막 캔들) 포함 여부 결정 — 현재는 포함되어 값이 출렁일 수 있음
- [ ] 지표 계산 단위 테스트 추가 (EMA, RSI, ADX, 슈퍼트렌드를 TradingView 값과 대조) — Vitest 도입

### 청산 맵
- [ ] 레버리지 분포 가정(10x 30% · 25x 30% · 50x 25% · 100x 15%) 의 근거 마련 또는 조정 UI 제공
- [ ] Binance 실시간 청산 스트림(`!forceOrder@arr` WebSocket) 으로 실제 청산 발생 지점 표시 추가 검토
- [ ] 정밀도가 필요하면 Coinglass API(유료) 의 liquidation heatmap 으로 교체 검토 — 비용 확인
- [ ] 시간축이 있는 2D 히트맵(가격 × 시간) 버전 검토

### 데이터 출처 확장
- [ ] Bybit / OKX 롱숏 비율을 합산한 거래소 통합 비율 검토

### UI / UX
- [ ] 모바일 화면 실기기 확인 (이 환경에서는 창 크기 변경이 되지 않아 미확인)
- [ ] 외부 폰트(Google Fonts, Pretendard CDN) 로딩 지연 시 렌더링 차단 문제 → 셀프 호스팅 또는 `display=swap` + preload 검토
- [ ] API 오류 시 재시도 버튼 / 마지막 갱신 시각 표시
- [ ] 선택한 코인·타임프레임을 URL 쿼리로 유지 (공유·새로고침 대응)
- [ ] 다크 모드 지원 여부 결정

### 개발 환경
- [ ] git 저장소 초기화 및 원격 저장소 연결
- [ ] Prettier 설정
- [ ] CI (빌드 · 린트 · 테스트)

## 🟢 추가 기능 (아이디어)
- [ ] 코인 목록 확장 (검색 가능한 심볼 선택기)
- [ ] 추세 전환 알림 (예: 1시간봉 숏 → 롱 전환 시 브라우저 알림 / 텔레그램)
- [ ] 펀딩비 · 미결제약정 추이 카드
- [ ] 추세 확률 히스토리 차트 (시간에 따른 확률 변화)
- [ ] 판단 근거 지표별 설명 툴팁 (초보자용)

## ✅ 완료
- [x] React + Vite + Tailwind v4 + TypeScript + FSD 템플릿, FSD import 규칙 ESLint 적용
- [x] TradingView Advanced Chart 위젯 연동
- [x] 5개 타임프레임 추세 확률 (지표 8개 가중합) + 종합 판단 + 판단 근거 상세
- [x] 롱숏 비율 3종 (전체 계정 · 상위 트레이더 · 테이커)
- [x] 추정 청산 맵 (OI 기반, ±5/10/20%)
- [x] 최초 안내 팝업 (이미지, 오늘 하루 보지 않기)
- [x] 팝업 이미지 기반 로고 SVG · 파비콘
- [x] Mock 데이터 모드 (`VITE_USE_MOCK`)
