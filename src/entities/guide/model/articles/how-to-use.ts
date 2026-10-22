import type { GuideArticle } from '../types'

export const howToUse: GuideArticle = {
  slug: 'how-to-use',
  publishedAt: '2026-10-22',
  updatedAt: '2026-10-22',
  ko: {
    title: 'LongShort AI 사용 가이드: 화면 구성과 5분 점검 루틴',
    description:
      '종목 선택부터 종합 추세 판단, 타임프레임 카드, 판단 근거, 롱숏 비율, 청산맵까지 LongShort AI 화면의 각 영역이 무엇을 뜻하는지와 매매 전 5분 안에 확인하는 순서를 예시로 설명합니다.',
    body: [
      {
        p: 'LongShort AI 는 코인 선물 시장의 추세와 포지션 데이터를 한 화면에 모아 보여주는 무료 도구입니다. 정보가 많은 만큼 어디서부터 봐야 할지 막막할 수 있어, 이 글에서는 화면 각 영역의 의미와 실제로 매매 전에 점검하는 순서를 정리했습니다.',
      },
      { h2: '화면 구성 한눈에 보기' },
      {
        table: {
          head: ['영역', '보여주는 것', '갱신 주기'],
          rows: [
            ['종목 선택 · 현재가', 'BTC · ETH · SOL · XRP · BNB · DOGE 의 USDT 무기한 선물 가격과 24시간 등락률', '수십 초'],
            ['종합 추세 판단', '5개 타임프레임을 가중 평균한 롱 확률과 판단(롱 우세 · 숏 우세 · 관망 추천)', '타임프레임별'],
            ['타임프레임 카드', '5분 · 15분 · 1시간 · 4시간 · 1일봉 각각의 롱/숏 확률, 횡보 여부', '30초 ~ 5분'],
            ['TradingView 차트', '선택한 타임프레임의 실시간 차트', '실시간'],
            ['판단 근거', '8개 지표의 점수(−1 ~ +1)와 가중치, 현재 상태 설명', '선택 타임프레임'],
            ['롱/숏 비율', '전체 계정 · 상위 트레이더 · 테이커 매수/매도 비율', '선택 타임프레임'],
            ['청산 맵 (추정)', '현재가 ±10% 범위의 롱 · 숏 청산 예상 구간', '1시간봉 기준'],
          ],
        },
      },
      { h2: '5분 점검 루틴' },
      { h3: '1단계. 종합 판단으로 큰 그림 잡기 (30초)' },
      {
        p: '먼저 상단의 종합 추세 판단을 봅니다. 롱 확률 숫자뿐 아니라 **"5개 타임프레임 중 몇 개가 같은 방향인가"** 를 함께 확인하세요. 같은 60% 라도 5개 중 5개가 롱인 경우와 3개만 롱인 경우는 신호의 질이 다릅니다. 종합 판단이 "관망 추천"이라면 그 자체로 의미 있는 정보입니다. 방향이 불분명한 시장에서는 포지션을 줄이거나 쉬는 것도 좋은 선택입니다.',
      },
      { h3: '2단계. 내 매매 타임프레임 카드 누르기 (30초)' },
      {
        p: '데이 트레이딩이라면 1시간봉, 스윙이라면 4시간봉처럼 주로 매매하는 타임프레임 카드를 누릅니다. 아래의 차트, 판단 근거, 롱숏 비율이 모두 그 타임프레임 기준으로 바뀝니다. 카드에 **"횡보"** 표시가 있다면 ADX 가 20 미만으로 추세가 약하다는 뜻입니다 ([ADX 가이드](/guide/adx-supertrend)).',
      },
      { h3: '3단계. 판단 근거에서 "왜"를 확인 (1분)' },
      {
        p: '확률은 결과일 뿐이고, 판단 근거 카드가 그 이유를 보여줍니다. 8개 지표가 고르게 같은 방향인지, 아니면 한두 개 지표가 점수를 끌어올리고 나머지는 반대인지 확인합니다. 예를 들어 EMA 배열과 슈퍼트렌드는 롱인데 MACD 히스토그램이 "양수, 감소 중"이고 RSI 가 50 근처로 내려왔다면, 추세는 살아 있지만 모멘텀이 식는 중이라는 해석이 가능합니다.',
      },
      { h3: '4단계. 롱숏 비율로 쏠림 점검 (1분)' },
      {
        p: '추세 방향과 롱숏 비율을 비교합니다. 추세는 롱인데 전체 계정 롱 비율까지 극단적으로 높다면 이미 많은 사람이 같은 방향에 서 있다는 뜻이라 되돌림이 날카로울 수 있습니다. 상위 트레이더 비율이 반대 방향이라면 더욱 주의합니다. 읽는 법은 [롱숏 비율 가이드](/guide/long-short-ratio)에 자세히 정리했습니다.',
      },
      { h3: '5단계. 청산맵으로 목표·손절 자리 점검 (1분)' },
      {
        p: '현재가 위쪽 숏 청산 밀집 구간은 상승 시 1차 목표 후보, 아래쪽 롱 청산 밀집 구간은 하락 시 가격이 빨려 내려갈 수 있는 자리입니다. 내 손절 가격이 두꺼운 청산 구간 바로 위나 아래에 붙어 있지 않은지 확인하세요 ([청산맵 가이드](/guide/liquidation-map)).',
      },
      { h3: '6단계. 포지션 크기 계산 (1분)' },
      {
        p: '마지막으로 손절 거리와 1회 손실 한도로 포지션 크기를 계산합니다. 이 단계는 화면에 없지만 가장 중요합니다 ([리스크 관리 가이드](/guide/risk-management)).',
      },
      { h2: '예시: 이더리움 1시간봉 데이 트레이딩' },
      {
        ol: [
          '종합 판단: 롱 확률 64%, 5개 중 4개 롱 → 큰 방향은 위',
          '1시간봉 카드: 롱 68%, 횡보 표시 없음 → 추세 유효',
          '판단 근거: EMA 정배열, 슈퍼트렌드 상승, ADX 27 · 단 RSI 71 로 단기 과열',
          '롱숏 비율: 전체 계정 롱 비중 높음, 상위 트레이더는 중립 → 쏠림 주의',
          '청산맵: 현재가 3% 위 숏 청산 밀집, 2% 아래 롱 청산 밀집',
          '결론: 추격 매수보다 눌림(15분봉이 다시 롱으로 돌아서는 지점)을 기다리고, 손절은 2% 아래 롱 청산 구간보다 아래에 두되 그만큼 포지션을 줄인다',
        ],
      },
      {
        note: '위 예시는 화면을 읽는 방법을 보여주기 위한 가상의 사례이며 매매 권유가 아닙니다. LongShort AI 의 확률은 기술적 지표를 수치화한 참고 자료이고 미래 가격을 보장하지 않습니다.',
      },
      { h2: '자주 묻는 질문' },
      { h3: '확률 70% 면 70% 확률로 오른다는 뜻인가요?' },
      {
        p: '아닙니다. 8개 지표의 점수를 가중합한 뒤 0~100 범위로 변환한 값으로, "현재 지표들이 롱 쪽으로 얼마나 기울어 있는가"를 나타냅니다. 통계적으로 검증된 상승 확률이 아니라 지표 상태의 요약으로 이해해 주세요. 계산 방식은 [서비스 소개 · 분석 방법](/about)에 공개되어 있습니다.',
      },
      { h3: '왜 바이낸스 데이터만 쓰나요?' },
      {
        p: '바이낸스 USDT-M 선물은 거래량과 미결제약정이 가장 큰 시장 중 하나이고, 롱숏 비율 · 미결제약정 이력을 키 없이 무료로 공개합니다. 다만 다른 거래소의 포지션은 반영되지 않는다는 한계가 있습니다.',
      },
      { h3: '회원가입이나 유료 기능이 있나요?' },
      {
        p: '없습니다. 모든 기능을 회원가입 없이 무료로 제공하며, 거래소 레퍼럴 코드 · 유료 멤버십 · 리딩방을 운영하지 않습니다. 운영 비용은 광고로 충당합니다.',
      },
    ],
  },
  en: {
    title: 'LongShort AI User Guide: The Layout and a 5-Minute Check Routine',
    description:
      'What each part of the LongShort AI page means — from symbol selection, overall trend and timeframe cards to the signal breakdown, long/short ratio and liquidation map — and the order to check them in before a trade.',
    body: [
      {
        p: 'LongShort AI is a free tool that brings crypto futures trend and positioning data together on one page. Because there is a lot on screen, it can be hard to know where to start. This guide explains each area and the order to check them before trading.',
      },
      { h2: 'The layout at a glance' },
      {
        table: {
          head: ['Area', 'What it shows', 'Refresh'],
          rows: [
            ['Symbol · price', 'USDT perpetual price and 24h change for BTC · ETH · SOL · XRP · BNB · DOGE', 'Tens of seconds'],
            ['Overall trend', 'Weighted long probability across five timeframes and a verdict (long · short · wait)', 'Per timeframe'],
            ['Timeframe cards', 'Long/short probability for 5m · 15m · 1H · 4H · 1D, plus a ranging tag', '30s – 5 min'],
            ['TradingView chart', 'Live chart at the selected timeframe', 'Live'],
            ['Signal breakdown', 'Scores (−1 to +1), weights and state of the eight indicators', 'Selected timeframe'],
            ['Long/short ratio', 'All accounts · top traders · taker buy/sell', 'Selected timeframe'],
            ['Liquidation map (est.)', 'Estimated long and short liquidation bands within ±10% of price', '1H-based'],
          ],
        },
      },
      { h2: 'The 5-minute routine' },
      { h3: 'Step 1. Get the big picture from the overall trend (30 s)' },
      {
        p: 'Start with the overall trend at the top. Look not only at the probability but at **how many of the five timeframes agree**. Sixty percent with 5 of 5 agreeing is a different signal from 60% with 3 of 5. "Wait and see" is meaningful too: in a directionless market, reducing size or sitting out is a good option.',
      },
      { h3: 'Step 2. Tap your trading timeframe (30 s)' },
      {
        p: 'Tap the card you trade — 1H for day trading, 4H for swings. The chart, breakdown and ratios below all switch to it. A **"Ranging"** tag means ADX is below 20 and the trend is weak ([ADX guide](/guide/adx-supertrend)).',
      },
      { h3: 'Step 3. Check the "why" in the breakdown (1 min)' },
      {
        p: 'The probability is just the result; the breakdown shows the reasons. Are all eight indicators leaning the same way, or are one or two carrying the score while the rest disagree? If EMA alignment and Supertrend are long but the MACD histogram is "positive, falling" and RSI has slipped toward 50, the trend is alive but momentum is cooling.',
      },
      { h3: 'Step 4. Check crowding with the long/short ratio (1 min)' },
      {
        p: 'Compare the trend with the ratios. If the trend is long and the all-accounts long share is also extreme, many people are already on the same side and pullbacks can be sharp — more so if top traders lean the other way. See the [long/short ratio guide](/guide/long-short-ratio).',
      },
      { h3: 'Step 5. Check targets and stops on the liquidation map (1 min)' },
      {
        p: 'Short-liquidation clusters above price are first-target candidates on the way up; long-liquidation clusters below are where price can get sucked down. Make sure your stop is not sitting right next to a thick band ([liquidation map guide](/guide/liquidation-map)).',
      },
      { h3: 'Step 6. Size the position (1 min)' },
      {
        p: 'Finally, size the position from your stop distance and per-trade loss limit. It is not on the page, but it matters most ([risk management guide](/guide/risk-management)).',
      },
      { h2: 'Example: Ethereum, 1H day trade' },
      {
        ol: [
          'Overall: 64% long, 4 of 5 long → the big direction is up',
          '1H card: 68% long, no ranging tag → trend is valid',
          'Breakdown: bullish EMA alignment, Supertrend up, ADX 27 — but RSI 71, short-term stretched',
          'Ratios: all-accounts long share high, top traders neutral → crowding caution',
          'Liquidation map: short cluster 3% above, long cluster 2% below',
          'Conclusion: wait for a pullback (15m turning long again) rather than chasing; place the stop below the long cluster 2% under price and cut size accordingly',
        ],
      },
      {
        note: 'This is a hypothetical example showing how to read the page, not a trade recommendation. LongShort AI probabilities summarize technical indicators and do not guarantee future prices.',
      },
      { h2: 'FAQ' },
      { h3: 'Does 70% mean price rises with 70% probability?' },
      {
        p: 'No. It is the weighted sum of eight indicator scores mapped to 0–100, describing how far current indicators lean long. Treat it as a summary of indicator state, not a statistically validated probability of rising. The method is published in [About · Methodology](/about).',
      },
      { h3: 'Why only Binance data?' },
      {
        p: 'Binance USDT-M futures is among the largest markets by volume and open interest, and it publishes long/short ratios and OI history for free without an API key. The limitation is that positions on other exchanges are not included.',
      },
      { h3: 'Is there sign-up or a paid tier?' },
      {
        p: 'No. Everything is free without sign-up, and there are no referral codes, paid memberships or signal groups. Running costs are covered by ads.',
      },
    ],
  },
}
