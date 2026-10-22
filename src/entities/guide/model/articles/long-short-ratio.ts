import type { GuideArticle } from '../types'

export const longShortRatio: GuideArticle = {
  slug: 'long-short-ratio',
  publishedAt: '2026-10-22',
  updatedAt: '2026-10-22',
  ko: {
    title: '롱숏 비율 보는 법: 숫자 하나로 시장 심리를 읽을 때 꼭 알아야 할 것',
    description:
      '바이낸스 롱숏 비율(전체 계정 · 상위 트레이더 · 테이커)이 각각 무엇을 세는지, 비율 2.0 이 실제로 몇 % 인지, 왜 "롱이 많으면 떨어진다"는 말이 나오는지 예시로 설명합니다.',
    body: [
      {
        p: '코인 선물 커뮤니티에서 가장 자주 공유되는 숫자 중 하나가 **롱숏 비율**입니다. "지금 롱 비율 70% 라서 위험하다" 같은 말을 흔히 보지만, 정작 이 숫자가 무엇을 세는지 정확히 알고 쓰는 경우는 많지 않습니다. 이 글에서는 바이낸스가 공개하는 세 가지 롱숏 비율의 정의와 계산법, 그리고 실제로 해석할 때 빠지기 쉬운 함정을 정리합니다.',
      },
      { h2: '먼저 알아야 할 사실: 선물 시장의 롱과 숏 "계약 수"는 항상 같다' },
      {
        p: '선물 계약은 누군가 사면(롱) 반드시 누군가 팔아야(숏) 성립합니다. 따라서 거래소 전체의 롱 포지션 총량과 숏 포지션 총량은 언제나 **정확히 같습니다**. 그럼에도 롱숏 비율이 1 이 아닌 이유는, 이 비율이 계약 수가 아니라 **"몇 개의 계정이 롱 쪽에 있는가"** 혹은 **"특정 집단의 포지션이 어느 쪽에 쏠렸는가"** 를 세기 때문입니다.',
      },
      {
        p: '예를 들어 개인 계정 1,000개가 각각 1 BTC 씩 롱을 잡고, 고래 계정 1개가 1,000 BTC 숏을 잡았다면 계약 수는 1,000 대 1,000 으로 같지만 계정 수 기준 롱숏 비율은 1,000 : 1 이 됩니다. 롱숏 비율을 볼 때는 항상 "누구를 세었는가"를 먼저 확인해야 합니다.',
      },
      { h2: '바이낸스가 공개하는 세 가지 비율' },
      {
        table: {
          head: ['비율', '무엇을 세나', '읽는 법'],
          rows: [
            [
              '전체 계정 롱숏 비율',
              '순포지션이 롱인 계정 수 ÷ 순포지션이 숏인 계정 수',
              '개인 투자자를 포함한 "다수"의 심리. 숫자가 클수록 롱 계정이 많음',
            ],
            [
              '상위 트레이더 포지션 비율',
              '증거금 잔고 상위 20% 계정의 롱 포지션 규모 ÷ 숏 포지션 규모',
              '자금이 큰 계정들이 실제로 어느 쪽에 돈을 실었는지',
            ],
            [
              '테이커 매수/매도 비율',
              '시장가 매수 체결량 ÷ 시장가 매도 체결량 (해당 기간)',
              '지금 이 순간 더 급하게 사는 쪽과 파는 쪽 중 누가 강한지',
            ],
          ],
        },
      },
      {
        p: '[LongShort AI 분석 화면](/)의 "롱/숏 비율" 카드는 이 세 값을 선택한 타임프레임 단위로 보여줍니다. 바이낸스는 이 데이터를 최근 30일치까지만 제공하므로 장기 통계보다는 최근 흐름을 확인하는 용도에 적합합니다.',
      },
      { h2: '비율 → 퍼센트 변환' },
      {
        p: '비율 r 이 주어졌을 때 롱 비중은 **r ÷ (1 + r)** 입니다. 숫자 감각을 잡기 위해 몇 가지를 계산해 두면 편합니다.',
      },
      {
        table: {
          head: ['롱숏 비율', '롱 비중', '숏 비중'],
          rows: [
            ['0.5', '33.3%', '66.7%'],
            ['1.0', '50.0%', '50.0%'],
            ['1.5', '60.0%', '40.0%'],
            ['2.0', '66.7%', '33.3%'],
            ['3.0', '75.0%', '25.0%'],
          ],
        },
      },
      {
        p: '비율이 1.5 에서 2.0 으로 오르는 것은 롱 비중이 60% 에서 66.7% 로 6.7%p 늘어난 것이고, 2.0 에서 3.0 으로 오르는 것은 8.3%p 늘어난 것입니다. 비율 숫자 자체의 변화폭만 보고 "롱이 폭증했다"고 판단하면 과장되기 쉽습니다.',
      },
      { h2: '"개인 롱 비율이 높으면 떨어진다"는 말의 근거' },
      {
        p: '계약 총량은 같으므로, 계정 수 기준으로 롱이 압도적으로 많다는 것은 **소수의 큰 계정이 그 반대편(숏)을 대량으로 받아주고 있다**는 뜻이 됩니다. 또 개인 계정은 일반적으로 레버리지가 높고 손절 라인이 가까워, 가격이 조금만 반대로 움직여도 강제 청산이나 손절 매도가 연쇄적으로 나오기 쉽습니다. 이 때문에 전체 계정 롱 비율이 극단적으로 높을 때는 하락 쪽 변동성이 커질 수 있다는 **역발상(contrarian)** 해석이 자주 쓰입니다.',
      },
      {
        note: '단, 역발상은 "언제" 반전되는지 알려주지 않습니다. 강한 상승장에서는 롱 비율이 높은 상태로 수주간 오르기도 합니다. 롱숏 비율은 진입 신호가 아니라 **이미 잡은 판단의 위험도를 점검하는 보조 지표**로 쓰는 편이 안전합니다.',
      },
      { h2: '세 비율을 조합해서 보는 법' },
      {
        ul: [
          '**전체 계정은 롱 우세, 상위 트레이더는 숏 우세**: 다수와 큰손의 방향이 엇갈리는 상태. 가격이 큰손 방향으로 움직이면 다수 쪽 청산이 연쇄될 수 있어 변동성 경계 구간으로 봅니다.',
          '**전체 계정과 상위 트레이더가 모두 같은 방향**: 쏠림이 강한 상태. 추세가 유지되는 동안은 순풍이지만, 되돌림이 오면 반대 방향으로 빠르게 움직일 수 있습니다.',
          '**테이커 매수 비율이 1 을 크게 웃돌며 가격도 상승**: 시장가 매수가 가격을 끌어올리는 건강한 상승. 반대로 테이커 매수가 강한데 가격이 오르지 않으면 위쪽에 큰 매도 물량(지정가 벽)이 있다는 신호일 수 있습니다.',
          '**테이커 매도 우위인데 가격이 버팀**: 아래쪽에서 지정가 매수가 물량을 흡수하는 중일 수 있습니다.',
        ],
      },
      { h2: '가격 · 미결제약정과 함께 보기' },
      {
        p: '롱숏 비율은 "어느 쪽 계정이 많은가"만 알려줄 뿐, 포지션이 새로 생기는 중인지 정리되는 중인지는 알려주지 않습니다. 이 부분은 미결제약정(OI) 변화로 보완합니다. 가격 상승 + OI 증가 + 테이커 매수 우위라면 신규 롱 진입이 상승을 이끄는 것이고, 가격 상승 + OI 감소라면 숏 포지션이 손절(숏 커버링)하면서 오르는 것일 가능성이 큽니다. 자세한 조합은 [미결제약정과 펀딩비 가이드](/guide/open-interest-funding)에서 다룹니다.',
      },
      { h2: '자주 하는 실수' },
      {
        ol: [
          '**한 시점의 숫자만 보기**: 비율 1.8 이 높은지 낮은지는 그 코인의 평소 수준에 따라 다릅니다. 같은 코인의 최근 며칠 흐름과 비교하세요.',
          '**코인 간 비교**: 알트코인은 개인 비중이 높아 BTC 보다 계정 롱 비율이 구조적으로 높게 나오는 경우가 많습니다.',
          '**거래소 하나를 시장 전체로 착각**: 여기서 보여주는 값은 바이낸스 USDT-M 선물 기준입니다. 다른 거래소, 코인 마진 선물, 현물 시장은 포함되지 않습니다.',
          '**롱숏 비율만으로 진입**: 추세 방향, 손절 위치, 포지션 크기 없이 비율만 보고 진입하면 역발상이 틀렸을 때 대응할 근거가 없습니다.',
        ],
      },
      { h2: '정리' },
      {
        ul: [
          '선물 시장의 롱·숏 계약 총량은 항상 같고, 롱숏 비율은 "계정 수" 또는 "특정 집단"의 쏠림을 보여준다.',
          '비율 r 의 롱 비중은 r ÷ (1 + r). 비율 2.0 은 롱 66.7%.',
          '전체 계정(다수), 상위 트레이더(큰손), 테이커(현재의 공격성)를 함께 보고, 가격·OI 와 교차 확인한다.',
          '극단적인 쏠림은 반전의 "가능성"이지 타이밍 신호가 아니다.',
        ],
      },
    ],
  },
  en: {
    title: 'How to Read the Long/Short Ratio: What One Number Can and Cannot Tell You',
    description:
      'What each Binance long/short ratio (all accounts, top traders, taker) actually counts, what a ratio of 2.0 means in percent, and why "too many longs" is often read as bearish.',
    body: [
      {
        p: 'The **long/short ratio** is one of the most widely shared numbers in crypto futures communities. People say things like "longs are at 70%, that is dangerous", but few know exactly what the number counts. This guide covers the definitions of the three ratios Binance publishes, how they are calculated, and the traps people fall into when reading them.',
      },
      { h2: 'The key fact: total long and short contracts are always equal' },
      {
        p: 'A futures contract only exists when someone buys (long) and someone sells (short). So across the whole exchange, total long open interest and total short open interest are **always exactly equal**. The ratio is not 1 because it does not count contracts — it counts **how many accounts are net long** or **which way a particular group is positioned**.',
      },
      {
        p: 'If 1,000 retail accounts each go long 1 BTC and a single whale goes short 1,000 BTC, contracts are 1,000 vs 1,000 but the account-based ratio is 1,000 : 1. Always check who is being counted first.',
      },
      { h2: 'The three ratios Binance publishes' },
      {
        table: {
          head: ['Ratio', 'What it counts', 'How to read it'],
          rows: [
            [
              'All accounts',
              'Accounts with a net long position ÷ accounts with a net short position',
              'Sentiment of the crowd, including retail. Higher means more long accounts',
            ],
            [
              'Top trader positions',
              'Long position size ÷ short position size of the top 20% of accounts by margin balance',
              'Where large accounts actually put their money',
            ],
            [
              'Taker buy/sell',
              'Market-buy volume ÷ market-sell volume over the period',
              'Who is more aggressive right now: urgent buyers or urgent sellers',
            ],
          ],
        },
      },
      {
        p: 'The "Long/Short Ratio" card on the [LongShort AI analysis page](/) shows all three at the selected timeframe. Binance only provides the last 30 days of this data, so it is best for checking recent flow rather than long-term statistics.',
      },
      { h2: 'Converting a ratio into a percentage' },
      { p: 'Given a ratio r, the long share is **r ÷ (1 + r)**. A few reference points:' },
      {
        table: {
          head: ['Ratio', 'Long share', 'Short share'],
          rows: [
            ['0.5', '33.3%', '66.7%'],
            ['1.0', '50.0%', '50.0%'],
            ['1.5', '60.0%', '40.0%'],
            ['2.0', '66.7%', '33.3%'],
            ['3.0', '75.0%', '25.0%'],
          ],
        },
      },
      {
        p: 'Going from 1.5 to 2.0 moves the long share from 60% to 66.7% — just 6.7 percentage points. Reading the raw ratio change as "longs exploded" easily overstates it.',
      },
      { h2: 'Why "too many retail longs" is read as bearish' },
      {
        p: 'Since contracts net out, an overwhelming majority of long accounts means **a small number of large accounts are taking the other side in size**. Retail accounts also tend to use higher leverage and tighter stops, so a small move against them can trigger a chain of liquidations and stop-loss sells. That is why an extreme long-account ratio is often read in a **contrarian** way: downside volatility may be building.',
      },
      {
        note: 'Contrarian signals do not tell you *when* a reversal happens. In strong bull markets the ratio can stay long-heavy for weeks while price keeps rising. Treat the ratio as a **risk check on a view you already have**, not as an entry signal.',
      },
      { h2: 'Reading the three ratios together' },
      {
        ul: [
          '**Accounts long-heavy, top traders short-heavy**: the crowd and the big money disagree. If price moves the big money\'s way, crowd liquidations can cascade — a volatility warning zone.',
          '**Accounts and top traders on the same side**: strong crowding. A tailwind while the trend holds, but pullbacks can be sharp.',
          '**Taker buy ratio well above 1 with rising price**: market buying is lifting price — a healthy advance. Strong taker buying without price progress can mean large passive sell orders above.',
          '**Taker selling dominates but price holds**: passive bids below may be absorbing supply.',
        ],
      },
      { h2: 'Combine with price and open interest' },
      {
        p: 'The ratio tells you which side has more accounts, not whether positions are being opened or closed. Open interest (OI) fills that gap. Rising price + rising OI + taker buying means new longs are driving the move; rising price + falling OI more likely means shorts are covering. See the [open interest and funding guide](/guide/open-interest-funding) for the full matrix.',
      },
      { h2: 'Common mistakes' },
      {
        ol: [
          '**Looking at a single snapshot**: whether 1.8 is high depends on that coin\'s normal range. Compare with its recent history.',
          '**Comparing across coins**: altcoins have more retail participation, so their account ratios are often structurally higher than BTC\'s.',
          '**Treating one exchange as the whole market**: these values are Binance USDT-M futures only — not other exchanges, coin-margined futures or spot.',
          '**Entering on the ratio alone**: without a trend view, a stop and a position size, you have no plan when the contrarian read is wrong.',
        ],
      },
      { h2: 'Summary' },
      {
        ul: [
          'Total long and short contracts are always equal; the ratio shows crowding by account count or by a specific group.',
          'Long share = r ÷ (1 + r). A ratio of 2.0 is 66.7% long.',
          'Read all accounts (crowd), top traders (big money) and taker (current aggression) together, and cross-check with price and OI.',
          'Extreme crowding is a reversal *possibility*, not a timing signal.',
        ],
      },
    ],
  },
}
