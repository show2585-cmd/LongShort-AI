import { useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { GUIDES } from '@/entities/guide'
import {
  DEFAULT_SYMBOL,
  TIMEFRAMES,
  useSymbolName,
  useTicker24h,
  type MarketSymbol,
  type Timeframe,
} from '@/entities/market'
import { SymbolSelector } from '@/features/select-symbol'
import { AD_SLOTS, APP_NAME } from '@/shared/config'
import { useLocale } from '@/shared/i18n'
import { cn, formatPercent, formatPrice, usePageMeta } from '@/shared/lib'
import { AdSlot, Skeleton } from '@/shared/ui'
import { FundingOi } from '@/widgets/funding-oi'
import { LiquidationMap } from '@/widgets/liquidation-map'
import { LongShortRatio } from '@/widgets/long-short-ratio'
import { TradingViewChart } from '@/widgets/tradingview-chart'
import { TrendBreakdown, TrendOverview } from '@/widgets/trend-overview'

export function HomePage() {
  const { t } = useTranslation()
  const [symbol, setSymbol] = useState<MarketSymbol>(DEFAULT_SYMBOL)
  const [tfId, setTfId] = useState<Timeframe['id']>('1h')
  const timeframe = TIMEFRAMES.find((t) => t.id === tfId)!
  const name = useSymbolName(symbol)

  // 선택한 코인에 맞춰 탭 제목 갱신 (공유·북마크·검색 결과 표시용)
  usePageMeta({
    title: t('meta.homeTitle', { name, base: symbol.base, site: APP_NAME }),
    description: t('meta.homeDescription'),
    path: '/',
  })

  return (
    <>
      {/* 다크 히어로: 종목 선택 + 타임프레임별 추세 */}
      <section className="bg-surface-dark text-on-dark">
        <div className="mx-auto max-w-[1200px] px-4 py-10 lg:px-6 lg:py-14">
          <SymbolSelector value={symbol} onChange={setSymbol} />
          <PriceHeadline symbol={symbol} />
          <TrendOverview symbol={symbol.id} selected={tfId} onSelect={setTfId} />
        </div>
      </section>

      {/* 차트 + 포지션 데이터 */}
      <section className="bg-surface-soft">
        <div className="mx-auto grid max-w-[1200px] gap-6 px-4 py-12 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-6 lg:py-16">
          <div className="min-w-0 space-y-6">
            <TradingViewChart symbol={symbol.tradingView} interval={timeframe.tradingView} />
            <TrendBreakdown symbol={symbol.id} timeframe={timeframe} />
            <AdSlot slot={AD_SLOTS.content} />
          </div>
          <aside className="space-y-6">
            <LongShortRatio symbol={symbol.id} timeframe={timeframe} />
            <FundingOi symbol={symbol.id} />
            <LiquidationMap symbol={symbol.id} />
            <AdSlot slot={AD_SLOTS.sidebar} />
          </aside>
        </div>
      </section>

      <GuideHighlights />
    </>
  )
}

// 도구 화면만으로는 설명이 부족하므로, 숫자 읽는 법을 다룬 가이드로 연결
function GuideHighlights() {
  const { t } = useTranslation()
  const locale = useLocale()
  return (
    <section className="mx-auto max-w-[1200px] px-4 py-12 lg:px-6 lg:py-16">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">{t('guide.homeTitle')}</h2>
          <p className="mt-1 text-sm text-body">{t('guide.homeIntro')}</p>
        </div>
        <Link to="/guide" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
          {t('guide.all')}
          <ChevronRight className="size-4" />
        </Link>
      </div>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {GUIDES.slice(0, 4).map((g) => (
          <li key={g.slug}>
            <Link to={`/guide/${g.slug}`} className="block h-full rounded-xl border border-hairline p-5 hover:border-primary">
              <h3 className="leading-snug font-semibold text-ink">{g[locale].title}</h3>
              <p className="mt-2 line-clamp-3 text-[13px] leading-relaxed text-body">{g[locale].description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

function PriceHeadline({ symbol }: { symbol: MarketSymbol }) {
  const { t } = useTranslation()
  const name = useSymbolName(symbol)
  const { data } = useTicker24h(symbol.id)
  const up = (data?.priceChangePercent ?? 0) >= 0

  // 가격은 맥락 정보 → 종합 판단보다 작게 (화면의 결론은 아래 종합 판단)
  return (
    <div className="mt-6 mb-6">
      <h1 className="text-sm font-normal text-on-dark-soft">
        {t('home.headline', { name, base: symbol.base })}
      </h1>
      {data ? (
        <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="font-mono text-[32px] leading-none font-medium tracking-tight sm:text-[40px]">
            {formatPrice(data.lastPrice)}
          </span>
          <span className={cn('font-mono text-base font-medium', up ? 'text-up' : 'text-down-on-dark')}>
            {formatPercent(data.priceChangePercent, 2, true)}
          </span>
          <span className="text-xs text-on-dark-soft">{t('home.change24h')}</span>
        </div>
      ) : (
        <Skeleton className="mt-3 h-10 w-56 bg-surface-dark-elevated" />
      )}
      {/* 코스피 지수 계약이 없어 레버리지 ETF 로 대신하므로, 지수와 다르다는 점을 그 자리에서 알린다 */}
      {symbol.id === 'KORUUSDT' && <p className="mt-3 max-w-md text-xs leading-relaxed text-on-dark-soft">{t('home.koruNote')}</p>}
    </div>
  )
}
