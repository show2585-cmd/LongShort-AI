import type { GuideArticle } from '../types'

export const marketStructureObv: GuideArticle = {
  slug: 'market-structure-obv',
  publishedAt: '2026-10-22',
  updatedAt: '2026-10-22',
  ko: {
    title: '시장 구조(HH · HL · LH · LL)와 OBV: 지표 없이 추세를 확인하는 법',
    description:
      '스윙 고점·저점을 찾는 기준, 고점과 저점이 높아지는 상승 구조와 구조 붕괴(BOS)의 의미, 거래량 누적 지표 OBV 로 가격 움직임의 "진짜 여부"를 확인하는 방법을 설명합니다.',
    body: [
      {
        p: '이동평균, MACD, RSI 는 모두 가격을 가공한 2차 데이터입니다. 반면 **시장 구조**는 차트에 찍힌 고점과 저점 그 자체를 봅니다. 추세의 정의를 가장 원초적으로 표현하면 "상승 추세 = 고점과 저점이 계속 높아지는 것"이기 때문에, 시장 구조는 다른 지표가 흔들릴 때 기준점 역할을 합니다.',
      },
      { h2: '스윙 고점과 스윙 저점' },
      {
        p: '스윙 고점은 주변 봉들보다 높은 고가를 기록한 봉, 스윙 저점은 주변 봉들보다 낮은 저가를 기록한 봉입니다. LongShort AI 는 **좌우 3봉씩, 총 7봉 중 가장 높은(낮은) 봉**을 스윙 고점(저점)으로 인정하고, 최근 120봉 안에서 이를 찾습니다. 좌우 봉 수를 늘리면 더 큰 파동만, 줄이면 작은 파동까지 잡힙니다.',
      },
      { h2: '네 가지 구조 용어' },
      {
        table: {
          head: ['용어', '뜻', '의미'],
          rows: [
            ['HH (Higher High)', '직전 고점보다 높은 고점', '매수세가 이전 저항을 넘어섬'],
            ['HL (Higher Low)', '직전 저점보다 높은 저점', '눌림에서 더 일찍 매수가 들어옴'],
            ['LH (Lower High)', '직전 고점보다 낮은 고점', '반등이 이전 고점까지 못 감'],
            ['LL (Lower Low)', '직전 저점보다 낮은 저점', '매도세가 이전 지지를 깸'],
          ],
        },
      },
      {
        p: '**HH + HL** 이 반복되면 상승 구조, **LH + LL** 이 반복되면 하락 구조입니다. HH 와 LL 이 섞이거나 HL 과 LH 가 섞이면 수렴(삼각형) 또는 확장 구간으로, 방향성이 약합니다. LongShort AI 는 가장 최근 두 고점과 두 저점을 비교해 HH·HL 이면 +1, LH·LL 이면 −1, 엇갈리면 0 에 가까운 점수를 줍니다.',
      },
      { h2: '구조 붕괴(BOS)와 추세 전환' },
      {
        p: '상승 구조에서 가격이 **직전 HL(마지막 높은 저점)을 아래로 깨면**, 상승 구조가 무너졌다고 봅니다. 이를 구조 붕괴(Break of Structure, BOS) 또는 성격 변화(Change of Character)라고 부릅니다. 이후 반등이 직전 고점을 넘지 못하고 LH 를 만들면 하락 구조로의 전환이 확인됩니다.',
      },
      {
        ol: [
          '상승 구조: 100 → 110(HH) → 104(HL) → 115(HH) → 108(HL)',
          '가격이 108 아래로 하락 → 마지막 HL 붕괴 (경고)',
          '반등했지만 112 에서 멈춤 → 115 보다 낮은 LH (전환 확인)',
          '다시 하락해 103 기록 → LL. 하락 구조 진입',
        ],
      },
      {
        p: '많은 트레이더가 롱 포지션의 손절을 **마지막 HL 바로 아래**에 두는 이유가 여기에 있습니다. 그 가격이 깨지면 "상승 구조"라는 진입 근거 자체가 사라지기 때문입니다.',
      },
      { h2: 'OBV: 거래량이 가격을 따라오고 있나' },
      {
        p: 'OBV(On-Balance Volume)는 매우 단순한 누적 지표입니다. 종가가 전 봉보다 오르면 그 봉의 거래량을 더하고, 내리면 뺍니다. 값의 절대 크기는 의미가 없고, **기울기**가 중요합니다.',
      },
      {
        ul: [
          '가격 상승 + OBV 상승: 상승에 거래량이 동반됨. 매수세가 실제로 받쳐 주는 상승',
          '가격 상승 + OBV 횡보·하락: 거래량 없는 상승. 얇은 호가를 타고 오른 것일 수 있어 지속성 의심',
          '가격 횡보 + OBV 상승: 가격은 그대로인데 상승 봉의 거래량이 더 큼. 매집 가능성',
          '가격 하락 + OBV 상승: 하락 다이버전스의 반대. 매도 압력 약화 가능성',
        ],
      },
      {
        p: 'LongShort AI 는 최근 20봉 OBV 의 기울기를 같은 기간 평균 거래량으로 나눠 점수를 냅니다. 거래량 정보는 보조 확인용이므로 비중은 5% 로 가장 낮습니다.',
      },
      { h2: '구조와 거래량을 함께 쓰는 법' },
      {
        ul: [
          '**HH 돌파 + OBV 신고점**: 돌파에 거래량이 실림. 돌파 신뢰도 높음.',
          '**HH 돌파 + OBV 는 이전 고점 아래**: 거래량 없는 돌파. 다시 박스 안으로 돌아오는 "가짜 돌파" 주의.',
          '**HL 지지 + 하락 봉 거래량 감소**: 매도세가 약해지며 지지되는 건강한 눌림.',
          '**청산 구간과 겹칠 때**: 구조상 중요한 고점·저점 근처에 [청산 밀집 구간](/guide/liquidation-map)이 있다면 그 가격대에서 변동성이 커질 가능성이 높습니다.',
        ],
      },
      {
        note: '선물 시장의 거래량은 청산, 차익거래, 봇 매매가 섞여 있어 현물보다 노이즈가 큽니다. OBV 는 단독 신호보다 구조 · 추세 판단을 확인하는 용도로 쓰는 것이 적절합니다.',
      },
    ],
  },
  en: {
    title: 'Market Structure (HH · HL · LH · LL) and OBV: Confirming Trend Without Indicators',
    description:
      'How swing highs and lows are identified, what higher-high/higher-low structure and a break of structure mean, and how the cumulative OBV volume indicator confirms whether a move is real.',
    body: [
      {
        p: 'Moving averages, MACD and RSI are all derived from price. **Market structure** looks at the highs and lows on the chart directly. At its most basic, "an uptrend is a series of rising highs and rising lows", so structure is the reference point when other indicators wobble.',
      },
      { h2: 'Swing highs and swing lows' },
      {
        p: 'A swing high is a bar with a higher high than its neighbors; a swing low has a lower low. LongShort AI counts a bar as a swing high (low) if it is **the highest (lowest) of 7 bars — 3 on each side**, searching the last 120 bars. More bars on each side captures only larger waves; fewer captures smaller ones.',
      },
      { h2: 'The four structure terms' },
      {
        table: {
          head: ['Term', 'Definition', 'Meaning'],
          rows: [
            ['HH (Higher High)', 'A high above the previous high', 'Buyers pushed through prior resistance'],
            ['HL (Higher Low)', 'A low above the previous low', 'Buyers stepped in earlier on the dip'],
            ['LH (Lower High)', 'A high below the previous high', 'The bounce fell short of the prior high'],
            ['LL (Lower Low)', 'A low below the previous low', 'Sellers broke prior support'],
          ],
        },
      },
      {
        p: 'Repeated **HH + HL** is an uptrend; repeated **LH + LL** is a downtrend. Mixed combinations indicate a contracting (triangle) or expanding range with weak direction. LongShort AI compares the last two highs and lows: HH·HL scores +1, LH·LL −1, mixed near 0.',
      },
      { h2: 'Break of structure and trend change' },
      {
        p: 'In an uptrend, when price **breaks below the last HL**, the bullish structure is considered broken — a break of structure (BOS) or change of character. If the next bounce fails below the prior high and forms an LH, the shift to a downtrend is confirmed.',
      },
      {
        ol: [
          'Uptrend: 100 → 110 (HH) → 104 (HL) → 115 (HH) → 108 (HL)',
          'Price drops below 108 → last HL broken (warning)',
          'Bounce stalls at 112 → an LH below 115 (confirmation)',
          'Falls again to 103 → LL. Downtrend structure',
        ],
      },
      {
        p: 'This is why many traders put long stops **just below the last HL**: if it breaks, the reason for the trade — the uptrend structure — is gone.',
      },
      { h2: 'OBV: is volume following price?' },
      {
        p: 'OBV (On-Balance Volume) is a simple running total: add the bar\'s volume when the close is higher than the previous close, subtract it when lower. The absolute value is meaningless — the **slope** is what matters.',
      },
      {
        ul: [
          'Price up + OBV up: the advance is backed by volume',
          'Price up + OBV flat or down: a low-volume rise, possibly on a thin book — questionable durability',
          'Price flat + OBV up: up-bars carry more volume — possible accumulation',
          'Price down + OBV up: selling pressure may be easing',
        ],
      },
      {
        p: 'LongShort AI scores the 20-bar OBV slope divided by the average volume over the same period. Volume is a confirming input, so its weight is the lowest at 5%.',
      },
      { h2: 'Combining structure and volume' },
      {
        ul: [
          '**HH breakout + OBV at a new high**: volume behind the breakout — more reliable.',
          '**HH breakout + OBV below its prior high**: a breakout without volume — watch for a fake-out back into the range.',
          '**HL holds + shrinking volume on down bars**: a healthy pullback as selling dries up.',
          '**Overlap with liquidations**: if a [liquidation cluster](/guide/liquidation-map) sits near a key structural high or low, expect more volatility there.',
        ],
      },
      {
        note: 'Futures volume mixes liquidations, arbitrage and bots, so it is noisier than spot. Use OBV to confirm structure and trend, not as a standalone signal.',
      },
    ],
  },
}
