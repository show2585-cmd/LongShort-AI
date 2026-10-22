import type { GuideArticle } from '../types'

export const adxSupertrend: GuideArticle = {
  slug: 'adx-supertrend',
  publishedAt: '2026-10-22',
  updatedAt: '2026-10-22',
  ko: {
    title: 'DMI · ADX 와 슈퍼트렌드: 추세의 "방향"과 "강도"를 따로 보는 법',
    description:
      '+DI · −DI 가 방향을, ADX 가 강도를 나타내는 원리와 ADX 20 · 25 기준의 의미, ATR 기반 슈퍼트렌드의 계산 방식과 횡보장에서 신호를 거르는 방법을 설명합니다.',
    body: [
      {
        p: '추세 매매에서 가장 비싼 실수는 **추세가 없는 구간에서 추세 매매를 하는 것**입니다. 박스권에서는 이동평균 크로스, 돌파 신호가 반복해서 실패합니다. DMI/ADX 는 "지금 추세가 있는가"를, 슈퍼트렌드는 "추세가 바뀌었는가"를 판단하는 데 쓰입니다. LongShort AI 는 두 지표에 각각 15% 비중을 둡니다.',
      },
      { h2: 'DMI: +DI 와 −DI' },
      {
        p: 'DMI(Directional Movement Index)는 오늘 고가가 어제 고가보다 얼마나 더 올라갔는지(+DM), 오늘 저가가 어제 저가보다 얼마나 더 내려갔는지(−DM)를 비교합니다. 둘 중 큰 쪽만 인정하고, 이를 14봉 동안 평활한 뒤 ATR 로 나눈 것이 **+DI** 와 **−DI** 입니다.',
      },
      {
        ul: [
          '+DI > −DI: 위로 뻗는 힘이 더 큼 → 상승 방향',
          '−DI > +DI: 아래로 뻗는 힘이 더 큼 → 하락 방향',
        ],
      },
      { h2: 'ADX: 방향이 아닌 "강도"' },
      {
        p: 'ADX(Average Directional Index)는 +DI 와 −DI 의 차이가 얼마나 큰지를 다시 평활한 값입니다. 중요한 점은 **ADX 는 방향을 알려주지 않는다**는 것입니다. 강한 하락 추세에서도 ADX 는 높게 나옵니다.',
      },
      {
        table: {
          head: ['ADX', '일반적인 해석'],
          rows: [
            ['20 미만', '추세가 약하거나 없음. 박스권 · 횡보 가능성'],
            ['20 ~ 25', '추세가 형성되기 시작하는 구간'],
            ['25 ~ 40', '뚜렷한 추세'],
            ['40 이상', '매우 강한 추세. 다만 과열로 끝물인 경우도 있음'],
          ],
        },
      },
      {
        p: 'ADX 의 **수준**보다 **방향**도 중요합니다. ADX 가 높더라도 꺾여 내려오기 시작했다면 추세의 힘이 빠지고 있다는 뜻이고, 낮은 수준에서 올라오기 시작했다면 새 추세가 시작될 수 있다는 뜻입니다.',
      },
      { h2: 'LongShort AI 가 DMI 를 점수화하는 방법' },
      {
        p: '방향은 (+DI − −DI) ÷ (+DI + −DI) 로, 강도는 ADX ÷ 25 (최대 1) 로 계산해 둘을 곱합니다. 즉 **ADX 가 25 미만이면 방향 점수가 그만큼 깎입니다**. 예를 들어 +DI 30, −DI 15, ADX 30 이면 방향 0.33 × 강도 1 × 2 = +0.67 이고, 같은 DI 에 ADX 가 12 라면 +0.32 로 절반 이하가 됩니다.',
      },
      {
        p: '또 ADX 가 20 미만이면 [분석 화면](/)의 타임프레임 카드에 **"횡보"** 표시가 붙습니다. 이때는 롱/숏 확률이 한쪽으로 기울어 있어도 추세 자체가 약하다는 뜻이므로, 추세 추종 진입은 신중하게 판단하는 것이 좋습니다.',
      },
      { h2: '슈퍼트렌드: 변동성으로 그린 추세선' },
      {
        p: '슈퍼트렌드는 ATR(평균 변동폭)을 이용해 가격 위아래에 밴드를 그리고, 종가가 밴드를 뚫으면 추세 방향을 바꾸는 지표입니다. LongShort AI 는 가장 흔히 쓰이는 **(10, 3)** 설정, 즉 ATR 10봉 × 3배를 사용합니다.',
      },
      {
        ol: [
          '중간값 = (고가 + 저가) ÷ 2',
          '위 밴드 = 중간값 + 3 × ATR(10), 아래 밴드 = 중간값 − 3 × ATR(10)',
          '상승 추세 중에는 아래 밴드만 따라가며 올라가고(내려가지 않음), 종가가 아래 밴드를 깨면 하락 추세로 전환',
          '하락 추세 중에는 위 밴드만 따라 내려가고, 종가가 위 밴드를 넘으면 상승 추세로 전환',
        ],
      },
      {
        p: '밴드가 한 방향으로만 움직이는 "래칫(ratchet)" 구조 덕분에 슈퍼트렌드는 추세가 이어지는 동안 안정적으로 같은 신호를 유지하고, 추적 손절선(trailing stop)으로도 많이 쓰입니다. 점수는 상승이면 +1, 하락이면 −1 로 단순합니다.',
      },
      { h2: '슈퍼트렌드의 약점과 보완' },
      {
        ul: [
          '**박스권에서 잦은 전환**: 가격이 좁은 범위를 오가면 방향이 자주 바뀝니다. ADX 가 20 미만일 때 나온 슈퍼트렌드 전환은 신뢰도를 낮춰 보세요.',
          '**급등락 직후 늦은 반응**: ATR 이 커진 상태라 밴드가 멀어져 전환이 늦게 나옵니다.',
          '**배수 선택**: 배수를 2 로 낮추면 빠르지만 잦은 가짜 신호, 4 로 높이면 느리지만 안정적입니다.',
        ],
      },
      { h2: '두 지표 조합 예시' },
      {
        table: {
          head: ['상황', '해석'],
          rows: [
            ['슈퍼트렌드 상승 + ADX 25 이상 상승 중 + +DI > −DI', '강한 상승 추세 진행. 추세 추종 유리'],
            ['슈퍼트렌드 상승 + ADX 18 에서 횡보', '방향은 위지만 힘이 약함. 돌파 실패 가능성'],
            ['슈퍼트렌드 하락 전환 + ADX 40 에서 꺾임', '과열된 상승 추세의 종료 신호일 수 있음'],
            ['+DI 와 −DI 가 엉킴 + ADX 15', '전형적인 박스권. 범위 매매 또는 관망'],
          ],
        },
      },
      {
        p: '추세의 방향은 [EMA 배열](/guide/ema-trend)과 슈퍼트렌드로, 추세의 존재 여부와 힘은 ADX 로 확인하는 식으로 역할을 나누면 신호가 겹쳐 생기는 혼란을 줄일 수 있습니다.',
      },
    ],
  },
  en: {
    title: 'DMI · ADX and Supertrend: Separating Trend Direction from Trend Strength',
    description:
      'How +DI and −DI show direction while ADX shows strength, what the 20 and 25 ADX levels mean, how the ATR-based Supertrend is computed, and how to filter it in ranges.',
    body: [
      {
        p: 'The most expensive mistake in trend trading is **trend trading when there is no trend**. In ranges, crosses and breakouts fail again and again. DMI/ADX answers "is there a trend?", and Supertrend answers "has the trend flipped?". LongShort AI gives each 15% weight.',
      },
      { h2: 'DMI: +DI and −DI' },
      {
        p: 'DMI (Directional Movement Index) compares how far today\'s high extends above yesterday\'s high (+DM) with how far today\'s low extends below yesterday\'s low (−DM). Only the larger counts. Smoothed over 14 bars and divided by ATR, these become **+DI** and **−DI**.',
      },
      {
        ul: [
          '+DI > −DI: stronger upward reach → upward direction',
          '−DI > +DI: stronger downward reach → downward direction',
        ],
      },
      { h2: 'ADX: strength, not direction' },
      {
        p: 'ADX (Average Directional Index) is a smoothed measure of how far apart +DI and −DI are. The key point: **ADX has no direction**. It is high in strong downtrends too.',
      },
      {
        table: {
          head: ['ADX', 'Typical reading'],
          rows: [
            ['Below 20', 'Weak or no trend — likely a range'],
            ['20 – 25', 'A trend may be forming'],
            ['25 – 40', 'A clear trend'],
            ['Above 40', 'Very strong trend, sometimes overheated and late-stage'],
          ],
        },
      },
      {
        p: 'ADX\'s **direction** matters as much as its level. A high ADX that starts falling means the trend is losing force; a low ADX that starts rising may signal a new trend.',
      },
      { h2: 'How LongShort AI scores DMI' },
      {
        p: 'Direction is (+DI − −DI) ÷ (+DI + −DI) and strength is ADX ÷ 25 (capped at 1); the two are multiplied. So **below ADX 25 the direction score is scaled down**. With +DI 30, −DI 15 and ADX 30 the score is 0.33 × 1 × 2 = +0.67; with the same DIs and ADX 12 it drops to +0.32.',
      },
      {
        p: 'When ADX is below 20, the timeframe card on the [analysis page](/) also shows a **"Ranging"** tag. Even if probabilities lean one way, the trend itself is weak — be careful with trend-following entries.',
      },
      { h2: 'Supertrend: a trend line drawn from volatility' },
      {
        p: 'Supertrend draws bands above and below price using ATR and flips direction when the close breaks a band. LongShort AI uses the most common **(10, 3)** setting: ATR over 10 bars × 3.',
      },
      {
        ol: [
          'Mid = (high + low) ÷ 2',
          'Upper band = mid + 3 × ATR(10); lower band = mid − 3 × ATR(10)',
          'In an uptrend only the lower band is followed, and it only moves up; a close below it flips to downtrend',
          'In a downtrend only the upper band is followed, moving down; a close above it flips to uptrend',
        ],
      },
      {
        p: 'Because the band only ratchets one way, Supertrend holds a steady signal through a trend and is widely used as a trailing stop. Its score is simple: +1 in an uptrend, −1 in a downtrend.',
      },
      { h2: 'Weaknesses and fixes' },
      {
        ul: [
          '**Whipsaws in ranges**: in a tight range it flips often. Discount flips that happen while ADX is below 20.',
          '**Late after big moves**: ATR is inflated, the band sits far away, and the flip comes late.',
          '**Choosing the multiplier**: 2 is faster with more false signals; 4 is slower but steadier.',
        ],
      },
      { h2: 'Combining the two' },
      {
        table: {
          head: ['Situation', 'Interpretation'],
          rows: [
            ['Supertrend up + ADX above 25 and rising + +DI > −DI', 'A strong uptrend in progress — trend-following favored'],
            ['Supertrend up + ADX flat around 18', 'Pointing up but weak — breakouts may fail'],
            ['Supertrend flips down + ADX rolling over from 40', 'Possibly the end of an overheated uptrend'],
            ['+DI and −DI tangled + ADX 15', 'A classic range — trade the range or wait'],
          ],
        },
      },
      {
        p: 'Assign roles: direction from [EMA alignment](/guide/ema-trend) and Supertrend, presence and strength of the trend from ADX. That reduces the confusion of overlapping signals.',
      },
    ],
  },
}
