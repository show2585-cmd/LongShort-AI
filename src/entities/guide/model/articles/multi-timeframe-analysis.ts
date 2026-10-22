import type { GuideArticle } from '../types'

export const multiTimeframeAnalysis: GuideArticle = {
  slug: 'multi-timeframe-analysis',
  publishedAt: '2026-10-22',
  updatedAt: '2026-10-22',
  ko: {
    title: '멀티 타임프레임 분석: 5분봉은 숏, 4시간봉은 롱일 때 어떻게 판단할까',
    description:
      '타임프레임마다 추세가 다르게 나오는 이유, 상위 → 하위 순서로 보는 탑다운 분석, 엇갈리는 신호를 해석하는 5가지 시나리오와 LongShort AI 종합 판단의 가중치 계산 예시를 정리했습니다.',
    body: [
      {
        p: '같은 비트코인 차트라도 5분봉을 보면 하락 중이고, 4시간봉을 보면 상승 중인 경우가 흔합니다. 둘 중 하나가 틀린 것이 아니라 **보는 시간 단위가 다르기 때문**입니다. 멀티 타임프레임 분석(MTF)은 여러 시간 단위를 함께 보고, 각 시간 단위가 내 매매에서 어떤 역할을 하는지 나눠서 판단하는 방법입니다.',
      },
      { h2: '왜 타임프레임마다 추세가 다를까' },
      {
        p: '1시간봉 하나는 5분봉 12개, 4시간봉 하나는 1시간봉 4개로 이루어집니다. 큰 상승 추세 안에서도 중간중간 되돌림(조정)이 나오고, 그 되돌림은 작은 타임프레임에서 보면 그 자체로 "하락 추세"로 보입니다. 즉 **하위 타임프레임의 추세는 상위 타임프레임 추세 안의 파동 하나**인 경우가 많습니다.',
      },
      { h2: '역할 나누기: 방향 · 구조 · 타이밍' },
      {
        table: {
          head: ['역할', '스캘핑 (수 분~수십 분)', '데이 트레이딩 (수 시간)', '스윙 (수 일)'],
          rows: [
            ['큰 방향', '1시간봉', '4시간봉', '1일봉'],
            ['구조 · 지지/저항', '15분봉', '1시간봉', '4시간봉'],
            ['진입 타이밍', '5분봉', '15분봉', '1시간봉'],
          ],
        },
      },
      {
        p: '보통 매매 타임프레임보다 **3~6배 큰 봉**으로 방향을 정하고, 매매 타임프레임에서 구조를 확인한 뒤, 더 작은 봉에서 진입 시점을 고릅니다. 이렇게 하면 큰 흐름을 거스르는 진입을 줄이고, 진입 가격은 더 정밀하게 잡을 수 있습니다.',
      },
      { h2: '탑다운 순서로 보기' },
      {
        ol: [
          '**상위 봉에서 방향 확인**: 상위 타임프레임이 롱 우세라면 기본 시나리오는 "눌림에서 매수", 숏 우세라면 "반등에서 매도"입니다. 상위가 관망이면 포지션 크기를 줄이거나 쉬어 가는 것도 선택지입니다.',
          '**중간 봉에서 위치 확인**: 지금 가격이 추세의 초입인지, 이미 많이 올라 저항 근처인지 봅니다. 직전 고점·저점, EMA, 청산 밀집 구간 등이 참고가 됩니다.',
          '**하위 봉에서 신호 대기**: 상위 방향과 같은 쪽으로 하위 봉 추세가 다시 돌아서는 순간(예: 5분봉이 숏 → 롱으로 전환)을 진입 시점으로 삼습니다.',
        ],
      },
      { h2: '엇갈리는 신호 해석: 5가지 시나리오' },
      {
        table: {
          head: ['1일 · 4시간', '1시간', '5분 · 15분', '해석'],
          rows: [
            ['롱', '롱', '롱', '전 구간 정렬. 추세 추종이 유리하지만 이미 많이 오른 뒤라면 추격 진입의 손익비가 나쁠 수 있음'],
            ['롱', '롱', '숏', '상승 추세 속 단기 조정. 하위 봉이 다시 롱으로 돌아서는 지점이 눌림 매수 후보'],
            ['롱', '숏', '숏', '조정이 깊어지는 중. 상위 추세가 꺾이는지 확인될 때까지 신규 롱은 보수적으로'],
            ['숏', '롱', '롱', '하락 추세 속 반등. 반등 매수보다는 반등이 약해지는 지점에서의 숏 시나리오를 함께 고려'],
            ['관망', '혼조', '혼조', '박스권 가능성. 추세 매매보다 범위 상·하단 대응, 혹은 거래를 쉬는 것이 낫다'],
          ],
        },
      },
      { h2: 'LongShort AI 의 "종합 추세 판단" 계산' },
      {
        p: '[분석 화면](/) 상단의 종합 판단은 다섯 타임프레임의 롱 확률을 가중 평균해 만듭니다. 가중치는 5분 10%, 15분 15%, 1시간 · 4시간 · 1일 각 25% 로 **상위 타임프레임에 더 큰 비중**을 둡니다. 단기 봉은 노이즈가 많아 신호가 자주 바뀌기 때문입니다.',
      },
      { p: '예를 들어 각 타임프레임의 롱 확률이 아래와 같다면,' },
      {
        table: {
          head: ['타임프레임', '롱 확률', '가중치', '기여분'],
          rows: [
            ['5분', '35%', '10%', '3.50'],
            ['15분', '45%', '15%', '6.75'],
            ['1시간', '62%', '25%', '15.50'],
            ['4시간', '70%', '25%', '17.50'],
            ['1일', '68%', '25%', '17.00'],
            ['합계', '', '100%', '60.25 → 60%'],
          ],
        },
      },
      {
        p: '종합 롱 확률은 약 60% 로 **롱 우세**가 됩니다. 단기 봉 두 개가 숏 쪽이지만, 상위 세 타임프레임이 롱이므로 전체적으로는 "상승 추세 속 단기 조정"에 가까운 그림입니다. 화면에는 "5개 타임프레임 중 3개가 같은 방향"처럼 일치 개수도 함께 표시되어, 확률이 같더라도 신호가 얼마나 고르게 모였는지 알 수 있습니다.',
      },
      {
        note: '롱 확률 60% 이상은 롱 우세, 40% 이하는 숏 우세, 그 사이는 관망 추천입니다. 개별 타임프레임의 확률이 어떻게 나오는지는 [서비스 소개 · 분석 방법](/about)에서 지표별 비중과 함께 설명합니다.',
      },
      { h2: '자주 하는 실수' },
      {
        ul: [
          '**타임프레임 쇼핑**: 원하는 결론이 나오는 봉만 골라 보는 것. 미리 "방향은 4시간봉, 진입은 15분봉"처럼 규칙을 정해 두세요.',
          '**너무 많은 봉 보기**: 다섯 개를 모두 같은 비중으로 보면 결론이 나지 않습니다. 내 매매 스타일에 맞는 세 개 정도에 집중하는 것이 좋습니다.',
          '**상위 추세의 "끝물" 무시**: 상위 봉이 롱이어도 ADX 가 꺾이거나 가격이 주요 저항에 닿았다면 추세 말기일 수 있습니다. [ADX 가이드](/guide/adx-supertrend)를 참고하세요.',
          '**하위 봉 신호로 상위 봉 손절 기준 쓰기**: 1일봉 방향으로 들어갔다면 손절도 그 구조(예: 4시간봉 직전 저점)에 맞춰야 작은 흔들림에 털리지 않습니다.',
        ],
      },
      { h2: '정리' },
      {
        ul: [
          '하위 타임프레임 추세는 상위 추세 안의 파동인 경우가 많다.',
          '방향(상위) · 구조(중간) · 타이밍(하위)으로 역할을 나누고, 매매 봉의 3~6배 큰 봉으로 방향을 정한다.',
          '신호가 엇갈리면 상위 봉을 우선하고, 전부 혼조라면 쉬는 것도 전략이다.',
        ],
      },
    ],
  },
  en: {
    title: 'Multi-Timeframe Analysis: What to Do When the 5m Says Short and the 4H Says Long',
    description:
      'Why trends differ by timeframe, the top-down approach, five scenarios for conflicting signals, and a worked example of how LongShort AI weights timeframes in its overall trend.',
    body: [
      {
        p: 'On the same Bitcoin chart, the 5-minute candles can be falling while the 4-hour candles are rising. Neither is wrong — **they measure different time spans**. Multi-timeframe (MTF) analysis means looking at several timeframes together and giving each one a specific job in your trading.',
      },
      { h2: 'Why trends differ across timeframes' },
      {
        p: 'One 1H candle is twelve 5m candles; one 4H candle is four 1H candles. A big uptrend contains pullbacks, and on a lower timeframe each pullback looks like a downtrend on its own. **A lower-timeframe trend is often just one wave inside the higher-timeframe trend.**',
      },
      { h2: 'Splitting the roles: direction · structure · timing' },
      {
        table: {
          head: ['Role', 'Scalping (minutes)', 'Day trading (hours)', 'Swing (days)'],
          rows: [
            ['Direction', '1H', '4H', '1D'],
            ['Structure · S/R', '15m', '1H', '4H'],
            ['Entry timing', '5m', '15m', '1H'],
          ],
        },
      },
      {
        p: 'A common rule is to set direction on a timeframe **3–6× larger** than the one you trade, confirm structure on your trading timeframe, and time entries on a smaller one. This reduces trades against the bigger flow while sharpening entry prices.',
      },
      { h2: 'Top-down, step by step' },
      {
        ol: [
          '**Direction on the higher timeframe**: if it leans long, the default plan is "buy pullbacks"; if short, "sell rallies". If it is neutral, reduce size or sit out.',
          '**Location on the middle timeframe**: is price early in the move or already near resistance? Prior highs/lows, EMAs and liquidation clusters help.',
          '**Signal on the lower timeframe**: enter when the lower timeframe turns back in the higher timeframe\'s direction (e.g. 5m flips from short to long).',
        ],
      },
      { h2: 'Conflicting signals: five scenarios' },
      {
        table: {
          head: ['1D · 4H', '1H', '5m · 15m', 'Interpretation'],
          rows: [
            ['Long', 'Long', 'Long', 'Fully aligned. Trend-following favored, but chasing after a big run can have poor risk/reward'],
            ['Long', 'Long', 'Short', 'Short-term pullback in an uptrend. Lower timeframe turning long again is a buy-the-dip candidate'],
            ['Long', 'Short', 'Short', 'Pullback deepening. Be conservative with new longs until the higher trend proves intact'],
            ['Short', 'Long', 'Long', 'Bounce in a downtrend. Consider shorting where the bounce fades rather than buying it'],
            ['Neutral', 'Mixed', 'Mixed', 'Likely a range. Trade range edges or stay out instead of trend-following'],
          ],
        },
      },
      { h2: 'How LongShort AI computes the overall trend' },
      {
        p: 'The overall trend at the top of the [analysis page](/) is a weighted average of the five timeframes\' long probabilities: 5m 10%, 15m 15%, and 25% each for 1H, 4H and 1D — **more weight on higher timeframes**, because short candles are noisy and flip often.',
      },
      { p: 'For example:' },
      {
        table: {
          head: ['Timeframe', 'Long prob.', 'Weight', 'Contribution'],
          rows: [
            ['5m', '35%', '10%', '3.50'],
            ['15m', '45%', '15%', '6.75'],
            ['1H', '62%', '25%', '15.50'],
            ['4H', '70%', '25%', '17.50'],
            ['1D', '68%', '25%', '17.00'],
            ['Total', '', '100%', '60.25 → 60%'],
          ],
        },
      },
      {
        p: 'The overall long probability is about 60%, so the verdict is **long-leaning**. Two short timeframes lean short, but the three higher ones lean long — a picture of a short-term pullback inside an uptrend. The page also shows how many timeframes agree (e.g. "3 of 5 point the same way"), so you can see how evenly the signal is spread.',
      },
      {
        note: '60% or more is long-leaning, 40% or less is short-leaning, and in between is "wait and see". How each timeframe\'s probability is computed is explained in [About · Methodology](/about).',
      },
      { h2: 'Common mistakes' },
      {
        ul: [
          '**Timeframe shopping**: picking whichever chart supports what you want. Fix your rules in advance, e.g. "direction on 4H, entries on 15m".',
          '**Watching too many**: weighing all five equally leads nowhere. Focus on about three that fit your style.',
          '**Ignoring late-stage trends**: a long higher timeframe with a rolling-over ADX or price at major resistance may be near exhaustion. See the [ADX guide](/guide/adx-supertrend).',
          '**Mismatched stops**: if you trade the 1D direction, place your stop by that structure (e.g. the last 4H swing low), not by 5m noise.',
        ],
      },
      { h2: 'Summary' },
      {
        ul: [
          'Lower-timeframe trends are often waves inside the higher trend.',
          'Split roles into direction (higher), structure (middle) and timing (lower); set direction 3–6× above your trading timeframe.',
          'When signals conflict, favor the higher timeframe; when everything is mixed, sitting out is a strategy.',
        ],
      },
    ],
  },
}
