import type { GuideArticle } from '../types'

export const riskManagement: GuideArticle = {
  slug: 'risk-management',
  publishedAt: '2026-10-22',
  updatedAt: '2026-10-22',
  ko: {
    title: '선물 매매 리스크 관리: 포지션 크기 계산과 레버리지에 대한 오해',
    description:
      '1회 손실 한도로 포지션 크기를 계산하는 공식, 레버리지가 위험을 키우는 진짜 이유, 손익비와 승률로 기대값 구하기, 연속 손실과 낙폭 회복 표, 수수료가 수익에 미치는 영향을 정리했습니다.',
    body: [
      {
        p: '추세 판단이 아무리 좋아도 모든 매매가 맞을 수는 없습니다. 장기적으로 계좌를 지키는 것은 "얼마나 자주 맞히느냐"보다 **틀렸을 때 얼마나 잃느냐**입니다. 이 글은 LongShort AI 같은 분석 도구로 방향을 판단한 다음, 실제로 포지션을 잡기 전에 반드시 정해야 할 숫자들을 다룹니다.',
      },
      { h2: '1. 1회 손실 한도부터 정한다' },
      {
        p: '가장 널리 쓰이는 원칙은 **한 번의 매매에서 계좌의 1~2% 이상 잃지 않는다**는 것입니다. 1% 가 작아 보이지만, 연속 손실이 났을 때의 차이는 큽니다.',
      },
      {
        table: {
          head: ['1회 손실 비율', '10연패 후 잔고', '20연패 후 잔고'],
          rows: [
            ['1%', '90.4%', '81.8%'],
            ['2%', '81.7%', '66.8%'],
            ['5%', '59.9%', '35.8%'],
            ['10%', '34.9%', '12.2%'],
          ],
        },
      },
      {
        p: '승률 50% 인 전략이라도 10연패는 생각보다 자주 일어납니다. 1회 10% 를 거는 방식은 한 번의 나쁜 구간으로 계좌의 3분의 2 를 잃을 수 있습니다.',
      },
      { h2: '2. 포지션 크기 공식' },
      {
        p: '손실 한도와 손절 위치가 정해지면 포지션 크기는 자동으로 계산됩니다.',
      },
      { ul: ['**포지션 명목 가치 = (계좌 × 1회 손실 비율) ÷ 손절 거리(%)**'] },
      {
        p: '예를 들어 계좌 10,000 USDT, 1회 손실 1%(100 USDT), 진입가 대비 손절 거리 2% 라면 포지션 명목 가치는 100 ÷ 0.02 = **5,000 USDT** 입니다. 손절이 1% 거리라면 10,000 USDT, 4% 거리라면 2,500 USDT 가 됩니다. 손절이 멀수록 포지션을 작게, 가까울수록 크게 잡는 것이죠.',
      },
      { h2: '3. 레버리지에 대한 가장 흔한 오해' },
      {
        p: '위 예시에서 5,000 USDT 포지션을 잡을 때 레버리지를 1배로 하면 증거금 5,000, 10배로 하면 증거금 500 USDT 가 필요합니다. **어느 쪽이든 손절에 걸리면 잃는 금액은 똑같이 100 USDT** 입니다. 즉 포지션 크기를 먼저 정했다면 레버리지는 "증거금을 얼마나 묶어 두느냐"를 바꿀 뿐, 손실 크기를 바꾸지 않습니다.',
      },
      {
        p: '레버리지가 위험한 진짜 이유는 사람들이 레버리지를 높이면서 **포지션 크기까지 함께 키우기 때문**입니다. 증거금 1,000 USDT 로 100배를 쓰면 100,000 USDT 포지션이 되고, 1% 만 반대로 가도 1,000 USDT, 즉 증거금 전체가 사라집니다.',
      },
      {
        note: '고배율을 쓸 때 확인할 것: 청산 가격이 손절 가격보다 **반드시 더 멀리** 있어야 합니다. 손절보다 청산이 먼저 오면 손절 계획은 의미가 없습니다. 레버리지별 청산 거리는 [청산맵 가이드](/guide/liquidation-map)의 표를 참고하세요.',
      },
      { h2: '4. 손익비와 승률로 기대값 계산' },
      {
        p: '손실 1단위를 **1R** 이라고 할 때, 전략의 기대값은 다음과 같습니다.',
      },
      { ul: ['기대값(R) = 승률 × 평균 수익(R) − 패율 × 평균 손실(R)'] },
      {
        table: {
          head: ['승률', '손익비 (수익 : 손실)', '기대값', '평가'],
          rows: [
            ['40%', '2 : 1', '0.4 × 2 − 0.6 × 1 = +0.20R', '자주 틀려도 수익'],
            ['50%', '1.5 : 1', '0.5 × 1.5 − 0.5 × 1 = +0.25R', '양호'],
            ['60%', '0.5 : 1', '0.6 × 0.5 − 0.4 × 1 = −0.10R', '자주 맞혀도 손실'],
            ['70%', '0.3 : 1', '0.7 × 0.3 − 0.3 × 1 = −0.09R', '작게 먹고 크게 잃는 전형'],
          ],
        },
      },
      {
        p: '"수익은 빨리 챙기고 손실은 버티는" 습관은 승률을 높여 기분은 좋게 만들지만, 기대값을 음수로 만드는 가장 흔한 원인입니다. 진입 전에 목표가와 손절가를 정하고, 손익비가 최소 1.5 : 1 이상 나오는 자리만 고르는 습관이 도움이 됩니다.',
      },
      { h2: '5. 낙폭은 회복이 훨씬 어렵다' },
      {
        table: {
          head: ['계좌 손실', '원금 회복에 필요한 수익'],
          rows: [
            ['−10%', '+11.1%'],
            ['−20%', '+25.0%'],
            ['−30%', '+42.9%'],
            ['−50%', '+100%'],
            ['−80%', '+400%'],
          ],
        },
      },
      {
        p: '손실이 커질수록 회복에 필요한 수익률은 기하급수적으로 늘어납니다. 큰 손실을 피하는 것이 큰 수익을 내는 것보다 계좌 생존에 훨씬 중요합니다.',
      },
      { h2: '6. 수수료도 비용이다' },
      {
        p: '바이낸스 USDT-M 선물의 기본(VIP 0) 수수료는 지정가(메이커) 약 0.02%, 시장가(테이커) 약 0.05% 수준입니다(변경될 수 있음). 시장가로 진입하고 시장가로 청산하면 명목 가치의 약 **0.1%** 가 나갑니다. 10배 레버리지라면 증거금 기준 1% 입니다. 하루에 10번 왕복하면 증거금의 10% 가 수수료로 사라지는 셈이므로, 짧은 타임프레임 매매일수록 수수료와 펀딩비([미결제약정 · 펀딩비 가이드](/guide/open-interest-funding))를 손익비 계산에 포함해야 합니다.',
      },
      { h2: '진입 전 체크리스트' },
      {
        ol: [
          '상위 타임프레임 방향과 같은 쪽인가? ([멀티 타임프레임 가이드](/guide/multi-timeframe-analysis))',
          '손절 가격은 어디인가? 그 가격이 깨지면 진입 근거가 사라지는가?',
          '1회 손실 한도(예: 1%)로 계산한 포지션 크기는 얼마인가?',
          '청산 가격이 손절 가격보다 충분히 먼가?',
          '목표가까지의 손익비가 1.5 : 1 이상인가? 수수료를 빼도 그런가?',
        ],
      },
      {
        p: 'LongShort AI 가 보여주는 확률과 지표는 이 체크리스트의 첫 번째 질문에 답하는 도구일 뿐입니다. 나머지 네 가지는 매매하는 사람이 직접 정해야 하며, 모든 투자 판단과 책임은 본인에게 있습니다.',
      },
    ],
  },
  en: {
    title: 'Risk Management for Futures Trading: Position Sizing and the Leverage Misconception',
    description:
      'The formula for sizing a position from a per-trade loss limit, why leverage really increases risk, computing expectancy from win rate and reward/risk, losing-streak and drawdown tables, and the impact of fees.',
    body: [
      {
        p: 'No matter how good your trend read is, not every trade will work. What preserves an account over time is not how often you are right but **how much you lose when you are wrong**. This guide covers the numbers you should settle after forming a view with a tool like LongShort AI and before opening a position.',
      },
      { h2: '1. Set a per-trade loss limit first' },
      {
        p: 'The most common rule is **never lose more than 1–2% of the account on a single trade**. 1% sounds small, but the difference shows up in losing streaks.',
      },
      {
        table: {
          head: ['Risk per trade', 'Balance after 10 losses', 'After 20 losses'],
          rows: [
            ['1%', '90.4%', '81.8%'],
            ['2%', '81.7%', '66.8%'],
            ['5%', '59.9%', '35.8%'],
            ['10%', '34.9%', '12.2%'],
          ],
        },
      },
      {
        p: 'Even a 50% win-rate strategy hits 10-loss streaks more often than people expect. Risking 10% per trade can cost two-thirds of the account in one bad stretch.',
      },
      { h2: '2. The position size formula' },
      { p: 'Once the loss limit and stop are set, position size follows automatically:' },
      { ul: ['**Position notional = (account × risk per trade) ÷ stop distance (%)**'] },
      {
        p: 'With a 10,000 USDT account, 1% risk (100 USDT) and a stop 2% from entry, the notional is 100 ÷ 0.02 = **5,000 USDT**. A 1% stop gives 10,000 USDT; a 4% stop gives 2,500 USDT. Wider stop, smaller position; tighter stop, larger position.',
      },
      { h2: '3. The most common leverage misconception' },
      {
        p: 'For that 5,000 USDT position, 1× leverage needs 5,000 USDT of margin and 10× needs 500. **Either way, hitting the stop loses the same 100 USDT.** Once size is fixed, leverage only changes how much margin is tied up — not the size of the loss.',
      },
      {
        p: 'Leverage is dangerous because people **increase position size along with it**. 1,000 USDT of margin at 100× is a 100,000 USDT position, and a 1% adverse move wipes out the entire 1,000 USDT.',
      },
      {
        note: 'With high leverage, check that the liquidation price is **always further away** than your stop. If liquidation comes first, your stop plan is meaningless. See the table in the [liquidation map guide](/guide/liquidation-map) for distances by leverage.',
      },
      { h2: '4. Expectancy from win rate and reward/risk' },
      { p: 'Call one unit of loss **1R**. Expectancy is:' },
      { ul: ['Expectancy (R) = win rate × average win (R) − loss rate × average loss (R)'] },
      {
        table: {
          head: ['Win rate', 'Reward : risk', 'Expectancy', 'Verdict'],
          rows: [
            ['40%', '2 : 1', '0.4 × 2 − 0.6 × 1 = +0.20R', 'Profitable despite frequent losses'],
            ['50%', '1.5 : 1', '0.5 × 1.5 − 0.5 × 1 = +0.25R', 'Healthy'],
            ['60%', '0.5 : 1', '0.6 × 0.5 − 0.4 × 1 = −0.10R', 'Losing despite being right often'],
            ['70%', '0.3 : 1', '0.7 × 0.3 − 0.3 × 1 = −0.09R', 'Classic "small wins, big losses"'],
          ],
        },
      },
      {
        p: 'Taking profits quickly while letting losses run raises the win rate and feels good, but it is the most common reason expectancy turns negative. Set target and stop before entering, and only take setups with at least 1.5 : 1 reward/risk.',
      },
      { h2: '5. Drawdowns are much harder to recover' },
      {
        table: {
          head: ['Account loss', 'Gain needed to recover'],
          rows: [
            ['−10%', '+11.1%'],
            ['−20%', '+25.0%'],
            ['−30%', '+42.9%'],
            ['−50%', '+100%'],
            ['−80%', '+400%'],
          ],
        },
      },
      {
        p: 'The bigger the loss, the steeper the climb back. Avoiding large losses matters more for survival than landing large wins.',
      },
      { h2: '6. Fees are a cost too' },
      {
        p: 'Binance USDT-M futures base (VIP 0) fees are roughly 0.02% maker and 0.05% taker (subject to change). Entering and exiting at market costs about **0.1%** of notional — 1% of margin at 10×. Ten round trips a day would burn 10% of margin in fees, so the shorter your timeframe, the more fees and funding ([open interest · funding guide](/guide/open-interest-funding)) belong in your reward/risk math.',
      },
      { h2: 'Pre-trade checklist' },
      {
        ol: [
          'Is it in the direction of the higher timeframe? ([multi-timeframe guide](/guide/multi-timeframe-analysis))',
          'Where is the stop, and does breaking it invalidate the reason for the trade?',
          'What size does the loss limit (e.g. 1%) give?',
          'Is the liquidation price comfortably beyond the stop?',
          'Is reward/risk to target at least 1.5 : 1, even after fees?',
        ],
      },
      {
        p: 'The probabilities and indicators in LongShort AI only help answer the first question. The other four are up to the trader, and all investment decisions and their consequences rest with you.',
      },
    ],
  },
}
