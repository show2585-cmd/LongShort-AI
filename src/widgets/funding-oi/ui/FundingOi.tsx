import { useEffect, useState } from 'react'
import { Info } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useFundingHistory, useOpenInterestHist, usePremiumIndex } from '@/entities/market'
import { cn, formatCompactUsd, formatPercent } from '@/shared/lib'
import { Card, CardHeader, Skeleton, Sparkline } from '@/shared/ui'
import { annualize, fundingIntervalHours, fundingState, oiChange, type FundingState, type OiFlow } from '../model/interpret'

const FUNDING_TONE: Record<FundingState, string> = {
  longHot: 'text-up',
  neutral: 'text-body',
  shortLean: 'text-down',
  shortHot: 'text-down',
}

const FLOW_TONE: Record<OiFlow, string> = {
  newLong: 'text-up',
  shortCover: 'text-up',
  newShort: 'text-down',
  longExit: 'text-down',
}

export function FundingOi({ symbol }: { symbol: string }) {
  const { t } = useTranslation()
  return (
    <Card>
      <CardHeader title={t('fundingOi.title')} description={t('fundingOi.description')} />
      <div className="space-y-6">
        <FundingSection symbol={symbol} />
        <OiSection symbol={symbol} />
      </div>
      <p className="mt-5 flex gap-1.5 rounded-md bg-surface-soft p-3 text-xs leading-relaxed text-body">
        <Info className="mt-0.5 size-3.5 shrink-0" />
        {t('fundingOi.note')}
      </p>
    </Card>
  )
}

function FundingSection({ symbol }: { symbol: string }) {
  const { t } = useTranslation()
  const premium = usePremiumIndex(symbol)
  const history = useFundingHistory(symbol)

  if (premium.isError) return <p className="text-xs text-muted">{t('common.loadError')}</p>
  if (!premium.data) return <Skeleton className="h-20 w-full" />

  const { fundingRate, nextFundingTime } = premium.data
  const hours = fundingIntervalHours(history.data ?? [])
  const state = fundingState(fundingRate, hours)

  return (
    <div>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold">{t('fundingOi.funding.title')}</p>
          <p className="text-xs text-muted">{t('fundingOi.funding.hint', { hours })}</p>
        </div>
        <span className={cn('font-mono text-sm font-medium', FUNDING_TONE[state])}>
          {formatPercent(fundingRate * 100, 4, true)}
        </span>
      </div>
      <div className="mt-3 flex items-center gap-4">
        <div className="flex-1 space-y-1 text-xs text-body">
          <p className={cn('font-semibold', FUNDING_TONE[state])}>{t(`fundingOi.funding.state.${state}`)}</p>
          <p>
            {t('fundingOi.funding.annual')}{' '}
            <span className="font-mono">{formatPercent(annualize(fundingRate, hours) * 100, 1, true)}</span>
          </p>
          <p>
            {t('fundingOi.funding.next')} <Countdown to={nextFundingTime} />
          </p>
        </div>
        {history.data && (
          <Sparkline values={history.data.map((d) => d.fundingRate * 100)} baseline={0} width={88} height={32} />
        )}
      </div>
    </div>
  )
}

function OiSection({ symbol }: { symbol: string }) {
  const { t } = useTranslation()
  // 청산맵과 같은 쿼리(1h · 500개)를 공유해 추가 요청 없이 계산
  const { data, isError } = useOpenInterestHist(symbol, '1h', 500)
  const change = data ? oiChange(data, 24) : null

  return (
    <div>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold">{t('fundingOi.oi.title')}</p>
          <p className="text-xs text-muted">{t('fundingOi.oi.hint')}</p>
        </div>
        {change && <span className="font-mono text-sm font-medium">{formatCompactUsd(change.valueNow)}</span>}
      </div>
      {isError ? (
        <p className="mt-3 text-xs text-muted">{t('common.loadError')}</p>
      ) : !data ? (
        <Skeleton className="mt-3 h-16 w-full" />
      ) : !change ? (
        <p className="mt-3 text-xs text-muted">{t('fundingOi.oi.notEnough')}</p>
      ) : (
        <>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <Stat label={t('fundingOi.oi.oiChange')} value={change.oiPct} />
            <Stat label={t('fundingOi.oi.priceChange')} value={change.pricePct} />
          </div>
          <div className="mt-3 flex items-center gap-4">
            <p className="flex-1 text-xs leading-relaxed text-body">
              <span className={cn('font-semibold', FLOW_TONE[change.flow])}>{t(`fundingOi.oi.flow.${change.flow}.title`)}</span>
              {' · '}
              {t(`fundingOi.oi.flow.${change.flow}.hint`)}
            </p>
            <Sparkline values={data.slice(-48).map((d) => d.openInterest)} width={88} height={32} />
          </div>
        </>
      )}
    </div>
  )
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg bg-surface-soft p-3">
      <p className="text-xs text-muted">{label}</p>
      <p className={cn('mt-1 font-mono text-sm font-medium', value >= 0 ? 'text-up' : 'text-down')}>
        {formatPercent(value, 2, true)}
      </p>
    </div>
  )
}

function Countdown({ to }: { to: number }) {
  const [now, setNow] = useState(Date.now)
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])
  const s = Math.max(0, Math.floor((to - now) / 1000))
  const pad = (n: number) => String(n).padStart(2, '0')
  return (
    <span className="font-mono">
      {pad(Math.floor(s / 3600))}:{pad(Math.floor((s % 3600) / 60))}:{pad(s % 60)}
    </span>
  )
}
