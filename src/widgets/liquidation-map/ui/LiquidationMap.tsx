import { useMemo, useState } from 'react'
import { Info } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useKlines, useOpenInterestHist } from '@/entities/market'
import { cn, formatCompactUsd, formatPrice } from '@/shared/lib'
import { Card, CardHeader, Segmented, Skeleton } from '@/shared/ui'
import { estimateLiquidations, LEVERAGE_MIX, type LiquidationBin } from '../model/estimate'

const RANGES = [
  { value: '5', label: '±5%' },
  { value: '10', label: '±10%' },
  { value: '20', label: '±20%' },
] as const

const HOUR = 3_600_000

export function LiquidationMap({ symbol }: { symbol: string }) {
  const { t } = useTranslation()
  const [range, setRange] = useState<(typeof RANGES)[number]['value']>('10')
  // OI 이력은 최근 30일까지만 제공 → 1시간봉 500개(약 21일) 사용
  const klines = useKlines(symbol, '1h', 500)
  const oi = useOpenInterestHist(symbol, '1h', 500)
  const isError = klines.isError || oi.isError

  const estimate = useMemo(
    () => (klines.data && oi.data ? estimateLiquidations(klines.data, oi.data, HOUR, Number(range) / 100) : null),
    [klines.data, oi.data, range],
  )

  return (
    <Card>
      <CardHeader title={t('liquidation.title')} description={t('liquidation.description')} />
      <Segmented value={range} options={RANGES} onChange={setRange} className="mb-4" />

      {isError ? (
        <p className="text-sm text-muted">{t('common.loadError')}</p>
      ) : !estimate ? (
        <Skeleton className="h-[420px] w-full" />
      ) : (
        <>
          <div className="mb-4 grid grid-cols-2 gap-3">
            <Cluster label={t('liquidation.topShort')} bin={estimate.topShort} value={estimate.topShort?.short} tone="down" />
            <Cluster label={t('liquidation.topLong')} bin={estimate.topLong} value={estimate.topLong?.long} tone="up" />
          </div>

          <div className="space-y-px">
            {[...estimate.bins].reverse().map((b) => {
              const isCurrent = b.low <= estimate.price && estimate.price < b.high
              const value = b.long + b.short
              const pct = (value / estimate.maxValue) * 100
              return (
                <div key={b.low} className="grid h-[11px] grid-cols-[72px_1fr] items-center gap-2">
                  <span
                    className={cn(
                      'text-right font-mono text-[10px] leading-none',
                      isCurrent ? 'font-semibold text-primary' : 'text-muted',
                    )}
                  >
                    {formatPrice((b.low + b.high) / 2)}
                  </span>
                  <div className="relative h-full">
                    {isCurrent && <div className="absolute inset-x-0 top-1/2 h-px bg-primary" />}
                    <div
                      className={cn('h-full rounded-r-xs', b.short >= b.long ? 'bg-down' : 'bg-up')}
                      style={{ width: `${pct}%`, opacity: 0.25 + 0.75 * (pct / 100) }}
                      title={t('liquidation.bar', { long: formatCompactUsd(b.long), short: formatCompactUsd(b.short) })}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-body">
            <Legend className="bg-down" text={t('liquidation.legendShort')} />
            <Legend className="bg-up" text={t('liquidation.legendLong')} />
            <span className="flex items-center gap-1.5">
              <span className="h-px w-3 bg-primary" /> {t('liquidation.currentPrice')}
            </span>
          </div>
          <p className="mt-4 flex gap-1.5 rounded-md bg-surface-soft p-3 text-xs leading-relaxed text-body">
            <Info className="mt-0.5 size-3.5 shrink-0" />
            {t('liquidation.note', { mix: LEVERAGE_MIX.map((l) => `${l.leverage}x ${l.share * 100}%`).join(' · ') })}
          </p>
        </>
      )}
    </Card>
  )
}

function Cluster({
  label,
  bin,
  value,
  tone,
}: {
  label: string
  bin: LiquidationBin | null
  value?: number
  tone: 'up' | 'down'
}) {
  return (
    <div className="rounded-lg bg-surface-soft p-3">
      <p className="text-xs text-muted">{label}</p>
      <p className={cn('mt-1 font-mono text-sm font-medium', tone === 'up' ? 'text-up' : 'text-down')}>
        {bin ? formatPrice((bin.low + bin.high) / 2) : '-'}
      </p>
      <p className="font-mono text-xs text-body">{value ? formatCompactUsd(value) : '-'}</p>
    </div>
  )
}

function Legend({ className, text }: { className: string; text: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className={cn('size-2.5 rounded-xs', className)} /> {text}
    </span>
  )
}
