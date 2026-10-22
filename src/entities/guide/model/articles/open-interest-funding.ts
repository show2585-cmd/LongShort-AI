import type { GuideArticle } from '../types'

export const openInterestFunding: GuideArticle = {
  slug: 'open-interest-funding',
  publishedAt: '2026-10-22',
  updatedAt: '2026-10-22',
  ko: {
    title: '미결제약정(OI)과 펀딩비: 가격 뒤에서 포지션이 어떻게 움직이는지 읽기',
    description:
      '미결제약정의 정의와 거래량과의 차이, 가격 × OI 4가지 조합 해석표, 무기한 선물 펀딩비의 원리와 실제 부담 비용 계산, 과열 신호로 활용하는 방법을 정리했습니다.',
    body: [
      {
        p: '가격 차트만 보면 "얼마나 올랐나"는 알 수 있지만 "누가, 어떤 이유로 올렸나"는 알 수 없습니다. 선물 시장에는 이를 보완하는 두 가지 핵심 데이터가 있습니다. 현재 열려 있는 포지션의 총량인 **미결제약정(Open Interest, OI)**, 그리고 롱과 숏 사이에 주기적으로 오가는 **펀딩비(Funding Rate)** 입니다.',
      },
      { h2: '미결제약정이란' },
      {
        p: '미결제약정은 **아직 청산·종료되지 않고 열려 있는 계약의 총량**입니다. 롱 1계약에는 반드시 숏 1계약이 짝지어 있으므로 OI 는 한쪽만 셉니다. 바이낸스는 이를 코인 수량과 USDT 가치(openInterestValue) 두 가지로 제공합니다.',
      },
      {
        table: {
          head: ['상황', 'OI 변화'],
          rows: [
            ['신규 매수자와 신규 매도자가 만남', '+1 (새 포지션 생성)'],
            ['기존 롱이 팔고, 신규 숏이 받음', '변화 없음 (포지션 이전)'],
            ['기존 롱이 팔고, 기존 숏이 사서 정리', '−1 (포지션 소멸)'],
          ],
        },
      },
      {
        p: '거래량은 "얼마나 많이 거래됐나", OI 는 "그 결과 얼마나 많은 포지션이 남아 있나"입니다. 거래량이 폭발해도 OI 가 그대로라면 포지션이 손바뀜만 한 것이고, OI 가 크게 늘었다면 새로운 자금이 레버리지를 실어 들어왔다는 뜻입니다.',
      },
      { h2: '가격 × OI 네 가지 조합' },
      {
        table: {
          head: ['가격', 'OI', '일반적인 해석', '주의점'],
          rows: [
            ['상승', '증가', '신규 롱 유입이 상승을 주도. 추세에 새 자금이 붙는 중', '레버리지 롱이 쌓이므로 급락 시 롱 청산 연쇄 위험도 함께 커짐'],
            ['상승', '감소', '숏 포지션 손절(숏 커버링)로 인한 상승', '새 매수세가 아니므로 커버링이 끝나면 힘이 빠질 수 있음'],
            ['하락', '증가', '신규 숏 유입이 하락을 주도', '숏이 과도하게 쌓이면 반등 시 숏 스퀴즈 가능'],
            ['하락', '감소', '롱 포지션 정리 · 롱 청산으로 인한 하락', '레버리지가 해소되는 과정. 정리가 끝나면 바닥을 다지는 경우 많음'],
          ],
        },
      },
      {
        p: '테이커 매수/매도 비율을 함께 보면 해석이 더 정확해집니다. 가격 상승 + OI 증가 + 테이커 매수 우위라면 시장가로 롱을 잡는 사람이 많다는 뜻이고, 가격 상승 + OI 감소 + 테이커 매수 우위라면 숏들이 시장가로 사서 탈출하는 중일 가능성이 큽니다. 테이커 비율은 [롱숏 비율 가이드](/guide/long-short-ratio)에서 다룹니다.',
      },
      {
        p: 'LongShort AI 의 [청산맵](/guide/liquidation-map)은 바로 이 OI 증가분을 "새로 생긴 포지션"으로 보고 청산 가격을 추정합니다.',
      },
      { h2: '펀딩비: 무기한 선물이 현물 가격에 붙어 있는 이유' },
      {
        p: '일반 선물은 만기일에 현물 가격으로 정산되지만, **무기한(perpetual) 선물은 만기가 없습니다**. 그래서 선물 가격이 현물에서 멀어지지 않도록, 일정 주기마다 롱과 숏이 서로 돈을 주고받게 만드는데 이것이 펀딩비입니다.',
      },
      {
        ul: [
          '**펀딩비 양수(+)**: 선물이 현물보다 비쌈 → 롱이 숏에게 지급. 롱이 과열된 상태',
          '**펀딩비 음수(−)**: 선물이 현물보다 쌈 → 숏이 롱에게 지급. 숏이 과열된 상태',
        ],
      },
      {
        p: '바이낸스 USDT-M 선물은 대부분 8시간마다(UTC 00:00 · 08:00 · 16:00) 펀딩을 정산하며, 일부 종목은 4시간 등 더 짧은 주기를 씁니다. 시장이 평온할 때 기본값은 8시간당 **0.01%** 입니다.',
      },
      { h2: '펀딩비는 실제로 얼마나 부담될까' },
      {
        p: '펀딩 지급액 = **포지션 명목 가치 × 펀딩비** 입니다. 증거금이 아니라 레버리지를 포함한 전체 포지션 크기에 붙는다는 점이 중요합니다.',
      },
      {
        table: {
          head: ['포지션 (명목)', '펀딩비 (8시간)', '1회 지급', '하루(3회)', '증거금 1,000 USDT 대비 하루'],
          rows: [
            ['10,000 USDT (10배)', '0.01%', '1 USDT', '3 USDT', '0.3%'],
            ['10,000 USDT (10배)', '0.05%', '5 USDT', '15 USDT', '1.5%'],
            ['10,000 USDT (10배)', '0.10%', '10 USDT', '30 USDT', '3.0%'],
          ],
        },
      },
      {
        p: '펀딩비가 0.1% 까지 오른 과열 구간에서 10배 롱을 며칠 들고 있으면, 가격이 움직이지 않아도 증거금이 하루 3% 씩 줄어듭니다. 고배율로 오래 버티는 전략이 생각보다 비싼 이유입니다.',
      },
      { h2: '과열 신호로 활용하기' },
      {
        ol: [
          '**펀딩비 급등 + OI 급증 + 가격 정체**: 롱이 비싼 비용을 내며 쌓이는데 가격이 못 오르는 상태. 롱 청산 캐스케이드 위험이 높은 전형적인 패턴입니다.',
          '**펀딩비 음수 지속 + 가격 하락 둔화**: 숏이 비용을 내면서 버티는 중. 반등 시 숏 스퀴즈가 날카로울 수 있습니다.',
          '**펀딩비 정상화 + OI 감소**: 레버리지가 빠지며 시장이 "깨끗해진" 상태. 다음 추세가 나오기 전 바닥 다지기 구간인 경우가 많습니다.',
        ],
      },
      {
        note: '펀딩비와 OI 는 "레버리지가 얼마나 쌓였나"를 보여줄 뿐, 언제 터질지는 알려주지 않습니다. 추세 방향 판단과 손절 계획 없이 과열 신호만으로 역추세 진입하는 것은 위험합니다.',
      },
      { h2: '정리' },
      {
        ul: [
          'OI 는 열려 있는 포지션 총량. 거래량과 달리 "새 자금 유입"과 "포지션 정리"를 구분해 준다.',
          '가격 × OI 조합으로 상승·하락이 신규 진입 때문인지, 청산·정리 때문인지 판단한다.',
          '펀딩비는 포지션 명목 가치에 부과되며, 과열 구간에서는 보유 비용이 무시할 수 없을 만큼 커진다.',
        ],
      },
    ],
  },
  en: {
    title: 'Open Interest and Funding Rates: Reading How Positions Move Behind Price',
    description:
      'What open interest is and how it differs from volume, a price × OI interpretation matrix, how perpetual funding works and what it actually costs, and how to use both as overheating signals.',
    body: [
      {
        p: 'A price chart tells you how far price moved, not who moved it or why. Futures markets have two key data series that fill the gap: **open interest (OI)** — the total of open positions — and the **funding rate** paid periodically between longs and shorts.',
      },
      { h2: 'What open interest is' },
      {
        p: 'Open interest is **the total number of contracts that remain open**. Every long contract is paired with a short, so OI counts one side. Binance reports it both in coin quantity and in USDT value (openInterestValue).',
      },
      {
        table: {
          head: ['Situation', 'OI change'],
          rows: [
            ['A new buyer meets a new seller', '+1 (a position is created)'],
            ['An existing long sells to a new short', 'No change (position transferred)'],
            ['An existing long sells to an existing short who is closing', '−1 (a position is destroyed)'],
          ],
        },
      },
      {
        p: 'Volume is "how much traded"; OI is "how many positions remain as a result". Huge volume with flat OI means positions just changed hands; a big jump in OI means new leveraged money came in.',
      },
      { h2: 'The price × OI matrix' },
      {
        table: {
          head: ['Price', 'OI', 'Typical reading', 'Watch out for'],
          rows: [
            ['Up', 'Up', 'New longs driving the rally; fresh money joining the trend', 'Leveraged longs pile up, so the risk of a long-liquidation cascade grows too'],
            ['Up', 'Down', 'Shorts covering', 'Not new buying — the move can fade once covering ends'],
            ['Down', 'Up', 'New shorts driving the drop', 'If shorts get crowded, a bounce can become a short squeeze'],
            ['Down', 'Down', 'Longs closing or being liquidated', 'Leverage is being flushed; bases often form once it ends'],
          ],
        },
      },
      {
        p: 'Adding the taker buy/sell ratio sharpens the read. Price up + OI up + taker buying means people are opening longs at market; price up + OI down + taker buying more likely means shorts are buying to exit. The taker ratio is covered in the [long/short ratio guide](/guide/long-short-ratio).',
      },
      {
        p: 'LongShort AI\'s [liquidation map](/guide/liquidation-map) treats exactly these OI increases as "new positions" when estimating liquidation prices.',
      },
      { h2: 'Funding: why perpetuals stay pinned to spot' },
      {
        p: 'Dated futures settle to spot at expiry, but **perpetual futures never expire**. To keep their price from drifting away from spot, longs and shorts exchange payments at regular intervals — the funding rate.',
      },
      {
        ul: [
          '**Positive funding (+)**: futures trade above spot → longs pay shorts. Longs are crowded',
          '**Negative funding (−)**: futures trade below spot → shorts pay longs. Shorts are crowded',
        ],
      },
      {
        p: 'Most Binance USDT-M contracts settle funding every 8 hours (00:00 · 08:00 · 16:00 UTC); some use shorter intervals such as 4 hours. In calm markets the baseline is **0.01%** per 8 hours.',
      },
      { h2: 'What funding actually costs' },
      {
        p: 'Funding paid = **position notional × funding rate**. It applies to the full leveraged position size, not your margin.',
      },
      {
        table: {
          head: ['Position (notional)', 'Funding (8h)', 'Per payment', 'Per day (×3)', 'Per day vs 1,000 USDT margin'],
          rows: [
            ['10,000 USDT (10×)', '0.01%', '1 USDT', '3 USDT', '0.3%'],
            ['10,000 USDT (10×)', '0.05%', '5 USDT', '15 USDT', '1.5%'],
            ['10,000 USDT (10×)', '0.10%', '10 USDT', '30 USDT', '3.0%'],
          ],
        },
      },
      {
        p: 'Holding a 10× long for days while funding sits at 0.1% drains 3% of margin per day even if price does not move. That is why holding high leverage for long periods is more expensive than it looks.',
      },
      { h2: 'Using them as overheating signals' },
      {
        ol: [
          '**Funding spikes + OI surges + price stalls**: longs pay up to pile in, yet price cannot rise — a classic setup for a long-liquidation cascade.',
          '**Persistently negative funding + slowing decline**: shorts are paying to hold on; a bounce can turn into a sharp squeeze.',
          '**Funding normalizes + OI falls**: leverage has been flushed and the market is "clean" — often a basing phase before the next trend.',
        ],
      },
      {
        note: 'Funding and OI show how much leverage has built up, not when it will unwind. Counter-trend trades on overheating signals alone, without a trend view and a stop plan, are risky.',
      },
      { h2: 'Summary' },
      {
        ul: [
          'OI is the total of open positions; unlike volume it separates new money from position closing.',
          'The price × OI matrix tells you whether a move comes from new entries or from liquidations and closing.',
          'Funding is charged on notional; in overheated markets the carrying cost becomes significant.',
        ],
      },
    ],
  },
}
