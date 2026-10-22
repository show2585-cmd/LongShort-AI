import type { GuideArticle } from '../types'

export const emaTrend: GuideArticle = {
  slug: 'ema-trend',
  publishedAt: '2026-10-22',
  updatedAt: '2026-10-22',
  ko: {
    title: 'EMA 20 · 50 · 200 정배열과 기울기로 추세 읽기',
    description:
      '지수이동평균(EMA)의 계산 원리, 20/50/200 정배열·역배열의 의미, 골든크로스의 한계, 그리고 기울기를 ATR 로 나눠 보는 이유를 예시와 함께 설명합니다.',
    body: [
      {
        p: '이동평균선은 가장 오래되고 널리 쓰이는 추세 지표입니다. 그중 **지수이동평균(EMA, Exponential Moving Average)** 은 최근 가격에 더 큰 비중을 두어 단순이동평균(SMA)보다 빠르게 반응합니다. LongShort AI 는 추세 확률을 계산할 때 EMA 배열(20%)과 EMA50 기울기(10%)를 합쳐 전체의 30% 를 이동평균에서 가져옵니다.',
      },
      { h2: 'EMA 는 어떻게 계산되나' },
      {
        p: 'EMA 는 "어제의 EMA" 에 "오늘 가격과의 차이"를 일정 비율만큼 더하는 방식으로 갱신됩니다.',
      },
      { ul: ['오늘 EMA = 어제 EMA + α × (오늘 종가 − 어제 EMA)', 'α(평활 계수) = 2 ÷ (기간 + 1)'] },
      {
        table: {
          head: ['기간', 'α', '의미'],
          rows: [
            ['EMA 20', '약 0.095', '오늘 가격이 약 9.5% 반영. 단기 흐름'],
            ['EMA 50', '약 0.039', '중기 흐름. 추세의 "척추" 역할'],
            ['EMA 200', '약 0.010', '장기 흐름. 강세장/약세장 구분선으로 자주 쓰임'],
          ],
        },
      },
      {
        p: '같은 20 기간이라도 SMA 는 20개 가격을 똑같이 평균내고, EMA 는 최근 가격일수록 비중이 큽니다. 그래서 EMA 가 추세 전환에 더 빨리 반응하지만, 그만큼 가짜 신호도 조금 더 많습니다.',
      },
      { h2: '정배열과 역배열' },
      {
        p: '**정배열**은 가격 > EMA20 > EMA50 > EMA200 순서로 놓인 상태입니다. 단기 평균이 장기 평균보다 위에 있다는 것은 최근 가격이 과거 평균보다 계속 높게 형성되고 있다는 뜻이므로, 전형적인 상승 추세의 모습입니다. **역배열**은 그 반대(가격 < EMA20 < EMA50 < EMA200)로 하락 추세의 모습입니다.',
      },
      {
        p: 'LongShort AI 는 세 개의 비교(가격 vs EMA20, EMA20 vs EMA50, EMA50 vs EMA200)를 각각 +1(위) 또는 −1(아래)로 점수화해 평균냅니다.',
      },
      {
        table: {
          head: ['상태', '점수', '예'],
          rows: [
            ['완전 정배열', '+1', '가격 > 20 > 50 > 200'],
            ['대체로 상승', '+0.33', '가격이 EMA20 아래로 잠깐 내려왔지만 20 > 50 > 200 유지 (눌림)'],
            ['대체로 하락', '−0.33', '가격 > EMA20 이지만 20 < 50 < 200 (하락 추세 속 반등)'],
            ['완전 역배열', '−1', '가격 < 20 < 50 < 200'],
          ],
        },
      },
      {
        p: '[분석 화면](/)의 판단 근거 카드에서 "종가 > EMA20 · EMA20 > EMA50 · EMA50 < EMA200" 처럼 각 비교 결과를 그대로 확인할 수 있습니다.',
      },
      { h2: '골든크로스 · 데드크로스의 함정' },
      {
        p: '단기선이 장기선을 위로 뚫는 골든크로스, 아래로 뚫는 데드크로스는 유명한 신호지만, 이동평균 자체가 과거 가격의 평균이기 때문에 **크로스는 항상 추세가 이미 꽤 진행된 뒤에** 나옵니다. 특히 횡보장에서는 짧은 간격으로 크로스가 반복되어 손실이 쌓이기 쉽습니다. 크로스 "사건"보다는 현재 배열 "상태"와 기울기를 함께 보는 편이 안정적입니다.',
      },
      { h2: '기울기를 ATR 로 나누는 이유' },
      {
        p: '배열은 방향만 알려줄 뿐 추세가 얼마나 힘 있게 진행되는지는 알려주지 않습니다. 그래서 EMA50 의 최근 10봉 기울기를 따로 봅니다. 문제는 기울기의 크기가 코인 가격대에 따라 완전히 다르다는 점입니다. 비트코인에서 10봉 동안 500달러 상승은 작은 움직임이지만 도지코인에서는 상상할 수 없는 크기입니다.',
      },
      {
        p: '이를 맞추기 위해 기울기를 **ATR(Average True Range, 평균 변동폭)** 으로 나눕니다. "10봉 동안 EMA50 이 평소 한 봉 변동폭의 몇 배만큼 움직였는가"로 바꾸는 것이죠. LongShort AI 는 이 값에 tanh 함수를 적용해 −1 ~ +1 범위로 눌러 담습니다. 10봉 동안 약 1 ATR 만큼 올랐다면 점수는 약 +0.76, 0.5 ATR 이면 약 +0.46 이 됩니다.',
      },
      { h2: '이동평균의 한계' },
      {
        ul: [
          '**후행성**: 과거 가격의 평균이므로 급반전 초기에는 늦게 반응합니다. 그래서 MACD · RSI 같은 모멘텀 지표와 함께 씁니다 ([MACD · RSI 가이드](/guide/macd-rsi)).',
          '**횡보장 취약**: 가격이 이동평균 주변을 오르내리면 배열이 수시로 바뀝니다. ADX 로 추세 유무를 먼저 확인하세요 ([ADX · 슈퍼트렌드 가이드](/guide/adx-supertrend)).',
          '**데이터 길이**: EMA200 은 초기값의 영향을 줄이려면 충분히 긴 데이터가 필요합니다. LongShort AI 는 타임프레임마다 최근 500봉을 사용합니다.',
        ],
      },
      { h2: '실전 체크리스트' },
      {
        ol: [
          '정배열인가, 역배열인가, 뒤엉켜 있는가?',
          'EMA50 은 기울어져 있는가, 평평한가?',
          '가격이 EMA20 에서 너무 멀리 떨어져 있지 않은가? (멀수록 되돌림 가능성)',
          '상위 타임프레임의 배열도 같은 방향인가?',
        ],
      },
    ],
  },
  en: {
    title: 'Reading Trend with EMA 20 · 50 · 200 Alignment and Slope',
    description:
      'How the exponential moving average is calculated, what bullish and bearish EMA alignment means, why golden crosses lag, and why slope should be normalized by ATR.',
    body: [
      {
        p: 'Moving averages are among the oldest and most widely used trend tools. The **exponential moving average (EMA)** weights recent prices more heavily, so it reacts faster than a simple moving average (SMA). In LongShort AI\'s trend probability, EMA alignment (20%) and EMA50 slope (10%) together make up 30% of the score.',
      },
      { h2: 'How an EMA is calculated' },
      { p: 'An EMA updates by adding a fixed fraction of the gap between today\'s price and yesterday\'s EMA:' },
      { ul: ["Today's EMA = yesterday's EMA + α × (today's close − yesterday's EMA)", 'α (smoothing factor) = 2 ÷ (period + 1)'] },
      {
        table: {
          head: ['Period', 'α', 'Meaning'],
          rows: [
            ['EMA 20', '≈ 0.095', 'About 9.5% of today\'s price is absorbed. Short-term flow'],
            ['EMA 50', '≈ 0.039', 'Medium-term flow — the "spine" of a trend'],
            ['EMA 200', '≈ 0.010', 'Long-term flow, often used as the bull/bear dividing line'],
          ],
        },
      },
      {
        p: 'A 20-period SMA averages 20 prices equally; a 20-period EMA weights recent ones more. EMAs react faster to turns, at the cost of slightly more false signals.',
      },
      { h2: 'Bullish and bearish alignment' },
      {
        p: '**Bullish alignment** is price > EMA20 > EMA50 > EMA200: recent prices keep forming above older averages — a textbook uptrend. **Bearish alignment** is the reverse (price < EMA20 < EMA50 < EMA200).',
      },
      {
        p: 'LongShort AI scores each of three comparisons (price vs EMA20, EMA20 vs EMA50, EMA50 vs EMA200) as +1 (above) or −1 (below) and averages them:',
      },
      {
        table: {
          head: ['State', 'Score', 'Example'],
          rows: [
            ['Fully bullish', '+1', 'price > 20 > 50 > 200'],
            ['Mostly bullish', '+0.33', 'price briefly under EMA20 but 20 > 50 > 200 holds (a pullback)'],
            ['Mostly bearish', '−0.33', 'price > EMA20 but 20 < 50 < 200 (a bounce in a downtrend)'],
            ['Fully bearish', '−1', 'price < 20 < 50 < 200'],
          ],
        },
      },
      {
        p: 'The signal breakdown on the [analysis page](/) shows each comparison directly, e.g. "Close > EMA20 · EMA20 > EMA50 · EMA50 < EMA200".',
      },
      { h2: 'The trouble with golden and death crosses' },
      {
        p: 'A golden cross (short MA crossing above long MA) and death cross (crossing below) are famous signals, but because moving averages average past prices, **crosses always arrive after the trend is well underway**. In ranges they repeat at short intervals and losses pile up. The current alignment *state* plus slope is more robust than the crossing *event*.',
      },
      { h2: 'Why divide slope by ATR' },
      {
        p: 'Alignment gives direction but not strength, so the slope of EMA50 over the last 10 bars is checked separately. The problem is that raw slope depends on price level: a $500 rise over 10 bars is small for Bitcoin but enormous for Dogecoin.',
      },
      {
        p: 'To make it comparable, the slope is divided by **ATR (Average True Range)** — "how many typical bar ranges did EMA50 move over 10 bars". LongShort AI then squashes it into −1 to +1 with tanh. A rise of about 1 ATR over 10 bars scores about +0.76; 0.5 ATR scores about +0.46.',
      },
      { h2: 'Limitations' },
      {
        ul: [
          '**Lag**: as an average of the past, it reacts late to sharp reversals — pair it with momentum tools like MACD and RSI ([MACD · RSI guide](/guide/macd-rsi)).',
          '**Weak in ranges**: when price chops around the averages, alignment flips constantly. Check whether a trend exists first with ADX ([ADX · Supertrend guide](/guide/adx-supertrend)).',
          '**Data length**: EMA200 needs a long history to shed its initial value. LongShort AI uses the latest 500 bars per timeframe.',
        ],
      },
      { h2: 'Practical checklist' },
      {
        ol: [
          'Bullish, bearish or tangled alignment?',
          'Is EMA50 sloping or flat?',
          'Is price stretched far from EMA20? (The further, the likelier a pullback.)',
          'Does the higher timeframe show the same alignment?',
        ],
      },
    ],
  },
}
