import { useEffect, useState } from 'react'
import { SYMBOLS, TIMEFRAMES, useTicker24h, type MarketSymbol, type Timeframe } from '@/entities/market'
import { SymbolSelector } from '@/features/select-symbol'
import { symbolPageTitle } from '@/shared/config'
import { cn, formatPercent, formatPrice } from '@/shared/lib'
import { Skeleton } from '@/shared/ui'
import { LiquidationMap } from '@/widgets/liquidation-map'
import { LongShortRatio } from '@/widgets/long-short-ratio'
import { TradingViewChart } from '@/widgets/tradingview-chart'
import { TrendBreakdown, TrendOverview } from '@/widgets/trend-overview'

export function HomePage() {
  const [symbol, setSymbol] = useState<MarketSymbol>(SYMBOLS[0])
  const [tfId, setTfId] = useState<Timeframe['id']>('1h')
  const timeframe = TIMEFRAMES.find((t) => t.id === tfId)!

  // 선택한 코인에 맞춰 탭 제목 갱신 (공유·북마크·검색 결과 표시용)
  useEffect(() => {
    document.title = symbolPageTitle(symbol.base, symbol.name)
  }, [symbol])

  return (
    <>
      {/* 다크 히어로: 종목 선택 + 타임프레임별 추세 */}
      <section className="bg-surface-dark text-on-dark">
        <div className="mx-auto max-w-[1200px] space-y-10 px-4 py-12 lg:px-6 lg:py-16">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <SymbolSelector value={symbol} onChange={setSymbol} />
              <PriceHeadline symbol={symbol} />
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-on-dark-soft">
              타임프레임 카드를 누르면 차트와 롱/숏 비율, 판단 근거가 해당 기준으로 바뀝니다.
            </p>
          </div>
          <TrendOverview symbol={symbol.id} selected={tfId} onSelect={setTfId} />
        </div>
      </section>

      {/* 차트 + 포지션 데이터 */}
      <section className="bg-surface-soft">
        <div className="mx-auto grid max-w-[1200px] gap-6 px-4 py-12 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-6 lg:py-16">
          <div className="min-w-0 space-y-6">
            <TradingViewChart symbol={symbol.tradingView} interval={timeframe.tradingView} />
            <TrendBreakdown symbol={symbol.id} timeframe={timeframe} />
          </div>
          <aside className="space-y-6">
            <LongShortRatio symbol={symbol.id} timeframe={timeframe} />
            <LiquidationMap symbol={symbol.id} />
          </aside>
        </div>
      </section>
    </>
  )
}

function PriceHeadline({ symbol }: { symbol: MarketSymbol }) {
  const { data } = useTicker24h(symbol.id)
  const up = (data?.priceChangePercent ?? 0) >= 0

  return (
    <div className="mt-8">
      <h1 className="text-sm font-normal text-on-dark-soft">
        {symbol.name}({symbol.base}) 롱숏 추세 분석 · {symbol.base}/USDT 무기한
      </h1>
      {data ? (
        <div className="mt-2 flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="font-mono text-[44px] leading-none font-medium tracking-tight sm:text-[56px]">
            {formatPrice(data.lastPrice)}
          </span>
          <span className={cn('font-mono text-lg font-medium', up ? 'text-up' : 'text-down')}>
            {formatPercent(data.priceChangePercent, 2, true)}
          </span>
        </div>
      ) : (
        <Skeleton className="mt-3 h-12 w-64 bg-surface-dark-elevated" />
      )}
    </div>
  )
}
