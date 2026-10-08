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

개발 서버는 `/binance` → `https://fapi.binance.com` 프록시를 사용합니다. **운영 배포 시에도 같은 경로의 리버스 프록시(nginx, Vercel rewrites 등)가 필요**합니다. 미국 IP 는 Binance 가 차단하므로 프록시 서버 리전에 주의하세요.

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

### Import 규칙 (ESLint로 강제)

- 상위 레이어만 하위 레이어를 import: `app → pages → widgets → features → entities → shared`
- 다른 슬라이스는 Public API로만 import: `@/entities/market` ✅ / `@/entities/market/api/queries` ❌
