import type { GuideArticle } from '../types'

export const liquidationMap: GuideArticle = {
  slug: 'liquidation-map',
  publishedAt: '2026-10-22',
  updatedAt: '2026-10-22',
  ko: {
    title: '청산맵(청산 히트맵) 읽는 법: 청산가 계산부터 "자석 효과"의 한계까지',
    description:
      '레버리지별 청산 가격 계산식, 청산맵이 미결제약정으로 추정되는 원리, 가격이 청산 밀집 구간으로 끌려간다는 말의 근거와 한계를 실제 숫자로 설명합니다.',
    body: [
      {
        p: '청산맵(liquidation map, 청산 히트맵)은 "어느 가격대에 강제 청산될 포지션이 많이 쌓여 있는가"를 색이나 막대로 보여주는 차트입니다. 단기 트레이더들이 "위쪽 숏 청산 구간을 먹으러 간다" 같은 표현을 쓸 때 근거로 삼는 자료이기도 합니다. 그런데 거래소는 개별 포지션의 청산 가격을 공개하지 않습니다. 그렇다면 청산맵은 어떻게 만들어지고, 어디까지 믿을 수 있을까요?',
      },
      { h2: '1. 청산 가격은 어떻게 정해지나' },
      {
        p: '격리 마진 기준으로 단순화하면, 레버리지 L 배로 진입한 포지션은 대략 **진입가의 1/L 만큼** 불리하게 움직였을 때 증거금이 바닥나 청산됩니다. 실제로는 거래소가 요구하는 최소 유지 증거금(유지 증거금률, MMR)이 있어서 그보다 조금 일찍 청산됩니다.',
      },
      {
        ul: [
          '롱 청산가 ≈ 진입가 × (1 − 1/L + MMR)',
          '숏 청산가 ≈ 진입가 × (1 + 1/L − MMR)',
        ],
      },
      { p: '진입가 100,000 USDT, 유지 증거금률 0.5% 로 가정하면 다음과 같습니다.' },
      {
        table: {
          head: ['레버리지', '롱 청산가', '숏 청산가', '진입가 대비 거리'],
          rows: [
            ['10배', '90,500', '109,500', '±9.5%'],
            ['25배', '96,500', '103,500', '±3.5%'],
            ['50배', '98,500', '101,500', '±1.5%'],
            ['100배', '99,500', '100,500', '±0.5%'],
          ],
        },
      },
      {
        p: '100배 포지션은 0.5% 만 반대로 움직여도 청산됩니다. 비트코인이 하루에 1~3% 움직이는 것은 흔한 일이므로, 고배율 포지션은 방향이 맞더라도 중간의 작은 흔들림에 정리되기 쉽습니다.',
      },
      {
        note: '실제 바이낸스 청산가는 포지션 규모에 따른 단계별 유지 증거금률, 교차 마진 여부, 미실현 손익, 수수료 등에 따라 달라집니다. 위 표는 원리를 이해하기 위한 근사치입니다.',
      },
      { h2: '2. 청산맵은 "추정"이다' },
      {
        p: '거래소는 누가 얼마에 몇 배로 들어왔는지 공개하지 않습니다. 공개되는 것은 **미결제약정(OI) 총량의 변화**, 가격, 거래량 정도입니다. 그래서 Coinglass 등을 포함한 모든 청산맵은 공개 데이터에 몇 가지 가정을 더해 만든 **추정 모델**입니다. LongShort AI 의 청산맵은 다음 순서로 계산합니다.',
      },
      {
        ol: [
          '1시간마다 OI 가 늘어난 만큼을 그 시간대에 새로 진입한 포지션으로 봅니다.',
          '해당 봉의 평균가((고가 + 저가 + 종가) ÷ 3)를 진입가로 가정합니다.',
          '그 봉의 테이커 매수 비중으로 신규 물량을 롱과 숏으로 나눕니다 (한쪽이 70% 를 넘지 않도록 제한).',
          '레버리지 분포를 10배 30% · 25배 30% · 50배 25% · 100배 15% 로 가정해 각각의 청산가를 계산합니다.',
          '이후 가격이 그 청산가를 지나가면 이미 청산된 것으로 보고 지웁니다. OI 가 줄어든 시간대에는 남은 포지션을 비례해서 줄입니다.',
          '현재가 ±10% 범위를 36개 구간으로 나눠, 구간별로 남아 있는 롱·숏 청산 예상 규모를 합산합니다.',
        ],
      },
      {
        p: '[분석 화면](/)의 "청산 맵 (추정)" 카드에서 현재가 위에 보이는 막대는 숏 포지션 청산 구간(가격이 오르면 청산), 아래는 롱 포지션 청산 구간(가격이 내리면 청산)입니다.',
      },
      { h2: '3. 왜 가격이 청산 구간으로 "끌려간다"고 할까' },
      {
        p: '숏 포지션이 청산되면 거래소는 그 포지션을 **시장가로 사서** 정리합니다. 롱 청산은 반대로 시장가 매도입니다. 즉 청산이 밀집된 가격대에 도달하면 한 방향의 시장가 주문이 한꺼번에 쏟아지고, 그 주문이 가격을 더 밀어 다음 청산가까지 건드리는 **연쇄 청산(캐스케이드)** 이 생길 수 있습니다.',
      },
      {
        p: '또한 큰 자금을 가진 참여자 입장에서는 청산 물량이 몰린 가격대가 곧 **유동성이 풍부한 자리**입니다. 큰 포지션을 한 번에 사고팔려면 반대편 주문이 많이 필요한데, 청산 구간에서는 강제 주문이 그 역할을 해 줍니다. 이 두 가지 이유로 "가격은 청산 밀집 구간을 향해 움직이는 경향이 있다"는 이야기가 나옵니다.',
      },
      { h2: '4. 청산맵을 볼 때 주의할 점' },
      {
        ul: [
          '**모든 청산맵은 가정이 다르다**: 레버리지 분포, 진입가 추정 방식이 서비스마다 달라 같은 시점에도 모양이 다르게 나옵니다. 막대의 정확한 높이보다는 "위와 아래 중 어디가 더 두꺼운가" 정도로 읽는 것이 적절합니다.',
          '**손절 주문과 교차 마진은 반영이 어렵다**: 실제로는 많은 트레이더가 청산 전에 손절하고, 교차 마진 계정은 잔고 전체가 버팀목이 되어 청산가가 훨씬 멀 수 있습니다.',
          '**자석 효과는 확률이지 법칙이 아니다**: 청산 구간을 건드리지 않고 반대 방향으로 추세가 이어지는 경우도 많습니다.',
          '**거래소 하나 기준**: LongShort AI 는 바이낸스 USDT-M 선물 데이터만 사용합니다.',
        ],
      },
      { h2: '5. 실전 활용 예시' },
      {
        p: '예를 들어 1시간봉과 4시간봉 추세 확률이 모두 롱 우세이고, 현재가 2~3% 위에 숏 청산이 두껍게 쌓여 있다면 상승 시나리오의 1차 목표 구간으로 참고할 수 있습니다. 반대로 내 롱 포지션의 손절 가격이 아래쪽 롱 청산 밀집 구간 바로 위에 있다면, 그 구간이 쓸려 내려갈 때 함께 정리될 위험이 크므로 손절 위치나 포지션 크기를 다시 점검해 볼 만합니다.',
      },
      {
        p: '청산 구간은 목표가와 손절가를 정할 때 **주변 유동성 지도**로 활용하고, 방향 판단 자체는 [멀티 타임프레임 추세](/guide/multi-timeframe-analysis)와 [롱숏 비율](/guide/long-short-ratio)을 함께 보며 내리는 것을 권합니다.',
      },
      { h2: '정리' },
      {
        ul: [
          '청산가는 대략 진입가 × (1 ∓ 1/레버리지 ± 유지 증거금률). 레버리지가 높을수록 진입가에 가깝다.',
          '청산맵은 OI 증감과 레버리지 분포 가정으로 만든 추정치이며, 서비스마다 결과가 다르다.',
          '청산은 시장가 주문을 발생시켜 연쇄 움직임을 만들 수 있고, 그래서 청산 밀집 구간이 "목표"로 언급된다.',
          '정확한 가격보다는 위·아래 어느 쪽 물량이 두꺼운지를 리스크 관리에 활용하자.',
        ],
      },
    ],
  },
  en: {
    title: 'How to Read a Liquidation Map: From Liquidation Prices to the Limits of the "Magnet Effect"',
    description:
      'The liquidation price formula by leverage, how liquidation maps are estimated from open interest, and why price is said to be pulled toward liquidation clusters — with real numbers and caveats.',
    body: [
      {
        p: 'A liquidation map (or liquidation heatmap) shows where forced liquidations are likely to be stacked. Short-term traders use it when they say things like "price is going up to take out the short liquidations". But exchanges do not publish individual liquidation prices. So how are these maps built, and how far can you trust them?',
      },
      { h2: '1. How a liquidation price is set' },
      {
        p: 'Simplified for isolated margin, a position opened at L× leverage is liquidated after moving roughly **1/L against the entry price**. In practice the exchange requires a minimum maintenance margin (the maintenance margin rate, MMR), so liquidation comes slightly earlier.',
      },
      {
        ul: [
          'Long liquidation ≈ entry × (1 − 1/L + MMR)',
          'Short liquidation ≈ entry × (1 + 1/L − MMR)',
        ],
      },
      { p: 'With an entry of 100,000 USDT and a 0.5% MMR:' },
      {
        table: {
          head: ['Leverage', 'Long liq.', 'Short liq.', 'Distance from entry'],
          rows: [
            ['10×', '90,500', '109,500', '±9.5%'],
            ['25×', '96,500', '103,500', '±3.5%'],
            ['50×', '98,500', '101,500', '±1.5%'],
            ['100×', '99,500', '100,500', '±0.5%'],
          ],
        },
      },
      {
        p: 'A 100× position is liquidated by a 0.5% move. Bitcoin routinely moves 1–3% a day, so high-leverage positions often get wiped out by noise even when the direction was right.',
      },
      {
        note: 'Actual Binance liquidation prices depend on tiered maintenance margin rates by position size, cross vs isolated margin, unrealized PnL and fees. The table is an approximation to show the principle.',
      },
      { h2: '2. A liquidation map is an estimate' },
      {
        p: 'Exchanges do not reveal who entered where at what leverage. What is public is the **change in total open interest (OI)**, price and volume. Every liquidation map — Coinglass included — is an **estimation model** built on public data plus assumptions. LongShort AI computes its map like this:',
      },
      {
        ol: [
          'Each hour, any increase in OI is treated as newly opened positions.',
          'The bar\'s typical price ((high + low + close) ÷ 3) is assumed as the entry.',
          'New size is split into longs and shorts by that bar\'s taker-buy share (capped so neither side exceeds 70%).',
          'A leverage mix of 10× 30% · 25× 30% · 50× 25% · 100× 15% is assumed and a liquidation price computed for each.',
          'When price later trades through a liquidation price, that position is treated as liquidated and removed. When OI falls, remaining positions are scaled down proportionally.',
          'The ±10% range around the current price is split into 36 bins and the remaining long and short liquidation size is summed per bin.',
        ],
      },
      {
        p: 'In the "Liquidation map (estimated)" card on the [analysis page](/), bars above the current price are short liquidations (triggered if price rises) and bars below are long liquidations (triggered if price falls).',
      },
      { h2: '3. Why price is said to be "pulled" toward liquidations' },
      {
        p: 'When a short is liquidated, the exchange closes it with a **market buy**; a long liquidation is a market sell. When price reaches a dense cluster, one-sided market orders hit the book at once and can push price into the next set of liquidation prices — a **liquidation cascade**.',
      },
      {
        p: 'For large players, a liquidation cluster is also a **pocket of liquidity**. Filling a big order requires lots of opposing orders, and forced orders provide exactly that. These two reasons are why people say price tends to gravitate toward liquidation clusters.',
      },
      { h2: '4. Caveats' },
      {
        ul: [
          '**Every map uses different assumptions**: leverage mix and entry estimation vary by service, so maps differ at the same moment. Read "which side is thicker" rather than exact bar heights.',
          '**Stops and cross margin are hard to model**: many traders stop out before liquidation, and cross-margin accounts can have far-away liquidation prices.',
          '**The magnet effect is a tendency, not a law**: trends often continue the other way without touching a cluster.',
          '**One exchange**: LongShort AI uses Binance USDT-M futures data only.',
        ],
      },
      { h2: '5. A practical example' },
      {
        p: 'Say the 1H and 4H trend probabilities both lean long and there is a thick short-liquidation band 2–3% above price. That band can serve as a first target for the bullish scenario. Conversely, if your long\'s stop sits just above a dense long-liquidation band, a sweep of that band could take you out with it — worth revisiting your stop or size.',
      },
      {
        p: 'Use liquidation bands as a **liquidity map** for placing targets and stops, and form your directional view with [multi-timeframe trend](/guide/multi-timeframe-analysis) and the [long/short ratio](/guide/long-short-ratio).',
      },
      { h2: 'Summary' },
      {
        ul: [
          'Liquidation price ≈ entry × (1 ∓ 1/leverage ± MMR). Higher leverage means closer to entry.',
          'Liquidation maps are estimates from OI changes plus a leverage assumption; results differ by service.',
          'Liquidations create market orders that can cascade, which is why clusters are talked about as targets.',
          'Use which side is thicker for risk management rather than trusting exact prices.',
        ],
      },
    ],
  },
}
