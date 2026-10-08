# LongShort AI

TradingView 차트와 함께 타임프레임별(5분·15분·1시간·4시간·1일) 롱/숏 추세 확률, 실제 롱숏 비율, 추정 청산 맵을 보여주는 웹페이지.

React 19 + Vite + Tailwind CSS v4 + TypeScript + TanStack Query, [Feature-Sliced Design](https://feature-sliced.design) 구조. 디자인은 `DESIGN-coinbase.md` 토큰을 따르고 아이콘은 lucide-react 를 사용합니다.

## 시작하기

```bash
npm install
cp .env.example .env.local   # 거래소 접속이 막힌 네트워크면 VITE_USE_MOCK=true
npm run dev
```

## 데이터 출처

| 영역 | 출처 | 비고 |
| --- | --- | --- |
| 차트 | TradingView Advanced Chart 위젯 (무료 임베드) | 위젯 내부 데이터는 읽을 수 없으므로 추세 계산은 별도 캔들 사용. 로고 제거 불가 |
| 추세 계산용 캔들 | Binance `/fapi/v1/klines` | 타임프레임별 500봉 |
| 롱/숏 비율 | Binance `/futures/data/globalLongShortAccountRatio`, `topLongShortPositionRatio`, `takerlongshortRatio` | 무료·키 불필요, 최근 30일만 제공 |
| 청산 맵 | Binance `/futures/data/openInterestHist` + 1시간봉으로 **자체 추정** | 아래 참고 |

프론트엔드는 항상 `/binance/*` 경로로 요청하고, 환경별로 아래가 `https://fapi.binance.com` 으로 중계합니다.

- **개발:** `vite.config.ts` 의 dev proxy
- **운영(Vercel):** `vercel.json` rewrite → `api/binance.ts` 함수
  - 서울 리전(`icn1`)에서 실행 → 미국 IP 차단(451) 회피
  - 허용된 공개 엔드포인트 6개만 중계 (오픈 프록시 방지)
  - CDN 캐시 `s-maxage=10` → 사용자 수가 늘어도 Binance 호출 수 제한

## 배포 (Vercel)

1. https://vercel.com 에 GitHub 계정으로 로그인
2. Add New → Project → `LongShort-AI` 저장소 선택
3. 설정 변경 없이 Deploy (`vercel.json` 이 프레임워크·리전·rewrite 를 지정)

이후 `main` 브랜치에 푸시할 때마다 자동 배포됩니다. 환경 변수는 따로 넣지 않습니다 (`VITE_USE_MOCK` 미설정 = 실데이터).

## SEO

메타데이터 원본은 `src/shared/config/site.ts` 한 곳입니다. `vite-plugin-seo.ts` 가 빌드 시 아래를 처리합니다.

- `index.html` 의 title · description · canonical · Open Graph · Twitter 카드 · JSON-LD(WebSite, WebApplication) 채우기
- `robots.txt`, `sitemap.xml` 생성
- 사이트 주소: `VITE_SITE_URL` → 없으면 Vercel 의 `VERCEL_PROJECT_PRODUCTION_URL` 자동 사용
- `VITE_GOOGLE_SITE_VERIFICATION`, `VITE_NAVER_SITE_VERIFICATION` 이 있으면 소유확인 메타 추가

그 외

- `#root` 안에 정적 소개 콘텐츠를 두어 JS 를 실행하지 않는 크롤러(네이버 Yeti 등)도 내용을 읽도록 함. React 마운트 시 대체됨
- 선택한 코인에 따라 문서 제목 변경 (예: `Ethereum(ETH) 롱숏 추세 확률 · …`)
- OG 이미지 `public/og-image.png` (1200×630), 아이콘·manifest

### 배포 후 할 일
1. [Google Search Console](https://search.google.com/search-console) · [네이버 서치어드바이저](https://searchadvisor.naver.com) 에 사이트 등록
2. 발급받은 소유확인 값을 Vercel 환경 변수(`VITE_GOOGLE_SITE_VERIFICATION`, `VITE_NAVER_SITE_VERIFICATION`)에 넣고 재배포
3. 두 곳 모두 `https://<도메인>/sitemap.xml` 제출

## 추세 확률 산출 방식

`src/entities/trend/model/computeTrend.ts`

각 지표를 −1(숏) ~ +1(롱)로 점수화 → 가중합 → 로지스틱 함수로 확률 변환 (`P(롱) = 1 / (1 + e^(−3·score))`).

| 지표 | 가중치 | 보는 것 |
| --- | --- | --- |
| EMA 20/50/200 배열 | 20% | 추세 방향의 골격 |
| EMA50 기울기 (ATR 정규화) | 10% | 추세 진행 속도 |
| MACD 히스토그램 | 15% | 모멘텀 방향과 가속/감속 |
| RSI(14) | 10% | 50 기준 모멘텀 |
| DMI(+DI/−DI) × ADX | 15% | 방향 × 추세 강도 |
| 슈퍼트렌드(10, 3) | 15% | 변동성 기반 추세 전환 |
| 시장 구조 (HH/HL) | 10% | 스윙 고점·저점 상승/하락 |
| OBV 기울기 | 5% | 거래량 동반 여부 |

- ADX < 20 이면 `횡보` 배지를 표시합니다 (추세 신호 신뢰도 낮음).
- 종합 판단은 타임프레임별 확률을 5분 10%, 15분 15%, 1시간·4시간·1일 각 25% 로 가중 평균합니다.
- ⚠️ 이 값은 **백테스트로 보정되지 않은 신호 강도**입니다. "실제 적중 확률"로 표기하려면 과거 데이터로 점수 구간별 적중률을 측정해 보정(calibration)해야 합니다.

## 청산 맵 추정 방식

`src/widgets/liquidation-map/model/estimate.ts`

거래소는 개별 포지션 청산가를 공개하지 않으므로 Coinglass·Hyblock 등도 모두 추정 모델입니다. 이 프로젝트는 무료 데이터로 다음과 같이 근사합니다.

1. 1시간마다 OI 가 늘어난 만큼 신규 포지션으로 간주, 진입가 = 해당 봉 (H+L+C)/3
2. 테이커 매수 비중으로 롱/숏 분배
3. 레버리지 분포 가정 (10x 30% · 25x 30% · 50x 25% · 100x 15%) 으로 청산가 계산
4. 이후 가격이 청산가에 닿으면 제거, OI 가 줄면 비례 축소
5. 현재가 ±5/10/20% 구간을 36개 가격대로 집계

더 정확한 히트맵이 필요하면 Coinglass API(유료 플랜)의 liquidation heatmap 엔드포인트로 교체할 수 있습니다.

## 폴더 구조

```
src/
├── app/        providers(QueryClient), router, 전역 스타일(디자인 토큰)
├── pages/      home, not-found
├── widgets/    header, footer, tradingview-chart, trend-overview, long-short-ratio, liquidation-map
├── features/   select-symbol, notice-popup(레퍼럴·멤버십 미운영 안내, 오늘 하루 보지 않기)
├── entities/   market(심볼·타임프레임·쿼리), trend(추세 계산·표시)
└── shared/     api(binance, mock), lib(지표, 포맷), ui(Button, Card, Modal, Segmented …), config
```

### 데이터 패칭 규칙

모든 서버 데이터는 **TanStack Query(react-query)** 로 가져옵니다. 컴포넌트에서 `fetch` 를 직접 호출하거나 `useEffect` 로 데이터를 불러오지 않습니다.

- `shared/api` — 순수 요청 함수 (`fetchKlines` 등). React 의존성 없음
- `entities/*/api/queries.ts` — `useQuery` 훅과 `xxxQueryOptions` (queryKey · queryFn · refetchInterval 정의)
- 여러 쿼리를 한 번에 써야 하면 `useQueries` + `xxxQueryOptions` 조합 (예: `widgets/trend-overview/model/useTrends.ts`)
- 응답 가공은 `select` 또는 `useMemo` 로 처리

### Import 규칙 (ESLint로 강제)

- 상위 레이어만 하위 레이어를 import: `app → pages → widgets → features → entities → shared`
- 다른 슬라이스는 Public API로만 import: `@/entities/market` ✅ / `@/entities/market/api/queries` ❌
