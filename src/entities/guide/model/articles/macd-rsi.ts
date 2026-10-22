import type { GuideArticle } from '../types'

export const macdRsi: GuideArticle = {
  slug: 'macd-rsi',
  publishedAt: '2026-10-22',
  updatedAt: '2026-10-22',
  ko: {
    title: 'MACD 히스토그램과 RSI 로 모멘텀 읽기: 과매수 70 보다 중요한 것',
    description:
      'MACD · 시그널 · 히스토그램의 계산 구조, 히스토그램 "증가/감소"가 의미하는 것, RSI 를 70/30 대신 50 기준으로 보는 이유와 다이버전스 활용법을 정리했습니다.',
    body: [
      {
        p: '이동평균이 "어느 방향으로 가고 있나"를 본다면, 모멘텀 지표는 "그 움직임이 빨라지고 있나, 느려지고 있나"를 봅니다. 추세가 꺾이기 전에는 대개 속도가 먼저 줄어들기 때문에, 모멘텀은 이동평균보다 한발 앞서 변화를 알려주는 경우가 많습니다. 대표적인 모멘텀 지표가 **MACD** 와 **RSI** 입니다.',
      },
      { h2: 'MACD 의 세 가지 구성' },
      {
        table: {
          head: ['구성', '계산', '의미'],
          rows: [
            ['MACD 선', 'EMA12 − EMA26', '단기 평균과 중기 평균의 간격. 양수면 단기가 위'],
            ['시그널 선', 'MACD 선의 EMA9', 'MACD 선을 한 번 더 부드럽게 만든 기준선'],
            ['히스토그램', 'MACD 선 − 시그널 선', 'MACD 선이 기준선보다 얼마나 앞서 있는가 = 모멘텀의 가속도'],
          ],
        },
      },
      {
        p: 'MACD 선이 0 위에 있다는 것은 EMA12 가 EMA26 위에 있다는 뜻으로, 이동평균 배열과 비슷한 정보입니다. 반면 **히스토그램은 "변화의 변화"**, 즉 모멘텀이 강해지는지 약해지는지를 보여줍니다. 그래서 LongShort AI 는 MACD 선이 아니라 히스토그램을 사용합니다.',
      },
      { h2: '히스토그램 네 가지 상태' },
      {
        table: {
          head: ['상태', '해석'],
          rows: [
            ['양수 + 증가', '상승 모멘텀이 가속 중. 가장 강한 롱 상태'],
            ['양수 + 감소', '아직 상승 쪽이지만 힘이 빠지는 중. 추세 둔화 경고'],
            ['음수 + 증가', '하락 쪽이지만 하락 속도가 줄어드는 중. 바닥 형성 가능성'],
            ['음수 + 감소', '하락 모멘텀이 가속 중. 가장 강한 숏 상태'],
          ],
        },
      },
      {
        p: 'LongShort AI 는 히스토그램의 크기(ATR 대비)를 70%, 직전 봉 대비 증감 방향을 30% 비중으로 섞어 점수를 냅니다. 그래서 "양수지만 감소 중"이면 점수가 양수이긴 하되 상당히 깎입니다. [분석 화면](/)의 판단 근거에 "히스토그램 양수, 감소 중" 같은 문구로 현재 상태가 표시됩니다.',
      },
      { h2: 'RSI: 상승폭과 하락폭의 비율' },
      {
        p: 'RSI(Relative Strength Index)는 최근 14봉 동안의 평균 상승폭과 평균 하락폭을 비교합니다.',
      },
      { ul: ['RS = 평균 상승폭 ÷ 평균 하락폭 (와일더 평활)', 'RSI = 100 − 100 ÷ (1 + RS)'] },
      {
        p: '오른 폭과 내린 폭이 같으면 RS = 1, RSI = 50 입니다. 상승폭이 하락폭의 2배면 RSI ≈ 66.7, 3배면 75 입니다.',
      },
      { h2: '70/30 보다 50 을 기준으로 보는 이유' },
      {
        p: '교과서에서는 RSI 70 이상을 과매수(팔 때), 30 이하를 과매도(살 때)로 설명합니다. 하지만 강한 추세에서는 RSI 가 70 이상에 오래 머무르며 가격이 계속 오르는 일이 흔합니다. 과매수 신호만 보고 숏을 잡으면 추세를 거스르게 됩니다.',
      },
      {
        p: '그래서 추세 판단에서는 **50 을 중심선**으로 보는 방법이 더 유용합니다. RSI 가 50 위에 있다는 것은 최근 상승폭이 하락폭보다 크다는 뜻이고, 상승 추세에서는 RSI 가 대략 40~80 사이에서, 하락 추세에서는 20~60 사이에서 움직이는 경향이 있습니다. LongShort AI 는 (RSI − 50) ÷ 20 으로 점수를 매겨 RSI 60 이면 +0.5, 70 이상이면 +1, 40 이면 −0.5 가 됩니다.',
      },
      { h2: '다이버전스: 가격과 모멘텀이 엇갈릴 때' },
      {
        p: '가격은 직전 고점보다 더 높은 고점을 만들었는데 RSI 나 MACD 히스토그램은 직전보다 낮은 고점을 만들었다면 **하락 다이버전스(약세 다이버전스)** 라고 부릅니다. 가격은 올랐지만 오르는 힘은 약해졌다는 뜻입니다. 반대로 가격은 더 낮은 저점, 지표는 더 높은 저점이면 **상승 다이버전스** 입니다.',
      },
      {
        note: '다이버전스는 "추세가 약해지고 있다"는 경고이지 즉시 반전한다는 뜻이 아닙니다. 강한 추세에서는 다이버전스가 여러 번 연속으로 나온 뒤에야 꺾이기도 합니다. 시장 구조(고점·저점) 변화로 확인한 뒤 대응하는 것이 안전합니다.',
      },
      { h2: '두 지표를 함께 쓰는 법' },
      {
        ul: [
          '**MACD 히스토그램 양수 + RSI 50 이상**: 방향과 속도가 일치. 추세 추종에 유리.',
          '**MACD 히스토그램 감소 + RSI 가 50 부근으로 하락**: 상승 모멘텀 소진. 신규 롱은 보수적으로.',
          '**가격은 신고점, RSI 는 70 아래에서 고점 하락**: 다이버전스 경고. 익절 또는 손절 상향 고려.',
          '**타임프레임 차이 활용**: 상위 봉 RSI 가 50 위인데 하위 봉 RSI 가 30 근처라면 상승 추세 속 과매도 = 눌림 매수 후보 ([멀티 타임프레임 가이드](/guide/multi-timeframe-analysis)).',
        ],
      },
      { h2: '정리' },
      {
        ul: [
          'MACD 히스토그램 = MACD 선 − 시그널 선. 모멘텀의 가속·감속을 본다.',
          'RSI 는 상승폭/하락폭 비율. 추세 판단에서는 70/30 보다 50 중심선이 유용하다.',
          '다이버전스는 경고 신호이며, 구조 변화로 확인한 뒤 대응한다.',
        ],
      },
    ],
  },
  en: {
    title: 'Reading Momentum with the MACD Histogram and RSI: More Than "Overbought at 70"',
    description:
      'How MACD, signal line and histogram are built, what a rising or falling histogram means, why RSI is better read around 50 than 70/30, and how to use divergence.',
    body: [
      {
        p: 'Moving averages tell you which way price is going; momentum indicators tell you whether that move is speeding up or slowing down. Trends usually lose speed before they turn, so momentum often flags change before moving averages do. The two classic momentum tools are **MACD** and **RSI**.',
      },
      { h2: 'The three parts of MACD' },
      {
        table: {
          head: ['Part', 'Formula', 'Meaning'],
          rows: [
            ['MACD line', 'EMA12 − EMA26', 'Gap between short and medium averages. Positive means short is above'],
            ['Signal line', 'EMA9 of the MACD line', 'A smoothed baseline for the MACD line'],
            ['Histogram', 'MACD line − signal line', 'How far MACD leads its baseline = acceleration of momentum'],
          ],
        },
      },
      {
        p: 'A MACD line above zero means EMA12 is above EMA26 — similar information to EMA alignment. The **histogram is a "change of change"**: whether momentum is strengthening or fading. That is why LongShort AI uses the histogram, not the MACD line.',
      },
      { h2: 'Four histogram states' },
      {
        table: {
          head: ['State', 'Interpretation'],
          rows: [
            ['Positive + rising', 'Upside momentum accelerating — the strongest long state'],
            ['Positive + falling', 'Still up, but losing steam — a slowdown warning'],
            ['Negative + rising', 'Still down, but the decline is slowing — a possible base'],
            ['Negative + falling', 'Downside momentum accelerating — the strongest short state'],
          ],
        },
      },
      {
        p: 'LongShort AI blends the histogram\'s size (relative to ATR) at 70% with its direction versus the previous bar at 30%. So "positive but falling" still scores positive, but noticeably less. The signal breakdown on the [analysis page](/) shows the current state, e.g. "Histogram positive, falling".',
      },
      { h2: 'RSI: the ratio of gains to losses' },
      { p: 'RSI (Relative Strength Index) compares the average gain and average loss over the last 14 bars:' },
      { ul: ['RS = average gain ÷ average loss (Wilder smoothing)', 'RSI = 100 − 100 ÷ (1 + RS)'] },
      { p: 'Equal gains and losses give RS = 1 and RSI = 50. Gains twice the losses give RSI ≈ 66.7; three times give 75.' },
      { h2: 'Why read RSI around 50 rather than 70/30' },
      {
        p: 'Textbooks call RSI above 70 overbought (sell) and below 30 oversold (buy). But in strong trends RSI often stays above 70 while price keeps climbing — shorting on "overbought" alone means fighting the trend.',
      },
      {
        p: 'For trend reading, using **50 as the centerline** is more useful. Above 50 means recent gains outweigh losses; in uptrends RSI tends to range roughly 40–80, in downtrends roughly 20–60. LongShort AI scores (RSI − 50) ÷ 20, so RSI 60 is +0.5, 70 or more is +1, and 40 is −0.5.',
      },
      { h2: 'Divergence: when price and momentum disagree' },
      {
        p: 'If price makes a higher high but RSI or the MACD histogram makes a lower high, that is **bearish divergence**: price rose, but with less force. Price making a lower low while the indicator makes a higher low is **bullish divergence**.',
      },
      {
        note: 'Divergence warns that a trend is weakening; it does not mean an immediate reversal. Strong trends can print several divergences before turning. Wait for confirmation from market structure (highs and lows).',
      },
      { h2: 'Using both together' },
      {
        ul: [
          '**Histogram positive + RSI above 50**: direction and speed agree — favorable for trend-following.',
          '**Histogram falling + RSI dropping toward 50**: upside momentum fading — be conservative with new longs.',
          '**Price at a new high, RSI peaking lower below 70**: divergence warning — consider taking profit or raising stops.',
          '**Across timeframes**: higher-timeframe RSI above 50 with lower-timeframe RSI near 30 is oversold within an uptrend — a dip-buy candidate ([multi-timeframe guide](/guide/multi-timeframe-analysis)).',
        ],
      },
      { h2: 'Summary' },
      {
        ul: [
          'MACD histogram = MACD line − signal line; it measures momentum acceleration.',
          'RSI is a gain/loss ratio; for trend reading the 50 centerline beats 70/30.',
          'Divergence is a warning — confirm with a structure change before acting.',
        ],
      },
    ],
  },
}
