import { AlertCircle } from 'lucide-react'
import { Trans, useTranslation } from 'react-i18next'
import { TIMEFRAMES, type Timeframe } from '@/entities/market'
import { BIAS_TONE, BiasLabel, ProbabilityBar } from '@/entities/trend'
import { cn } from '@/shared/lib'
import { Skeleton } from '@/shared/ui'
import { useTrends, type TimeframeTrend } from '../model/useTrends'

interface TrendOverviewProps {
  symbol: string
  selected: Timeframe['id']
  onSelect: (tf: Timeframe['id']) => void
}

// 왼쪽: 종합 판단(화면의 결론), 오른쪽: 타임프레임별 행 목록(짧은 봉 → 긴 봉 순서로 비교)
export function TrendOverview({ symbol, selected, onSelect }: TrendOverviewProps) {
  const { trends, consensus } = useTrends(symbol)

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      <Consensus consensus={consensus} />
      <TimeframeTable trends={trends} selected={selected} onSelect={onSelect} />
    </div>
  )
}

type ConsensusData = ReturnType<typeof useTrends>['consensus']

function Consensus({ consensus }: { consensus: ConsensusData }) {
  const { t } = useTranslation()

  if (!consensus) {
    return (
      <div className="rounded-xl border border-white/10 bg-surface-dark-elevated p-6">
        <Skeleton className="h-4 w-24 bg-white/10" />
        <Skeleton className="mt-4 h-14 w-48 bg-white/10" />
        <Skeleton className="mt-6 h-2 w-full bg-white/10" />
      </div>
    )
  }

  const { bias, probLong } = consensus
  const tone = BIAS_TONE[bias]
  const prob = Math.max(probLong, 100 - probLong)
  const neutral = bias === 'neutral'

  return (
    <section
      aria-label={t('trend.consensus')}
      className={cn('flex flex-col rounded-xl border-2 bg-linear-to-br to-transparent p-6', tone.border, tone.tint)}
    >
      <h2 className="text-sm text-on-dark-soft">{t('trend.consensus')}</h2>
      <p className="mt-3 flex flex-wrap items-baseline gap-x-3 leading-none">
        <span className={cn('text-[44px] font-normal tracking-tight sm:text-[56px]', neutral ? 'text-on-dark' : tone.text)}>
          {neutral ? t('bias.neutral') : t(`common.${bias}`)}
        </span>
        <span className="font-mono text-[36px] font-medium text-on-dark sm:text-[44px]">{prob}%</span>
      </p>
      {neutral && (
        <p className="mt-2 text-sm text-on-dark-soft">
          {t('trend.weakDirection')}: {probLong >= 50 ? t('common.long') : t('common.short')} {prob}%
        </p>
      )}
      <ProbabilityBar long={probLong} tone="dark" className="mt-6" />
      <p className="mt-auto pt-6 text-sm text-on-dark-soft">
        <Trans
          i18nKey="trend.agree"
          values={{ count: consensus.agree, total: TIMEFRAMES.length }}
          components={[<span className="font-mono text-on-dark" />]}
        />
      </p>
    </section>
  )
}

interface TimeframeTableProps {
  trends: TimeframeTrend[]
  selected: Timeframe['id']
  onSelect: (tf: Timeframe['id']) => void
}

function TimeframeTable({ trends, selected, onSelect }: TimeframeTableProps) {
  const { t } = useTranslation()
  return (
    <section aria-label={t('trend.tableTitle')} className="rounded-xl border border-white/10 bg-surface-dark-elevated p-2 sm:p-3">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-3 pt-2 pb-3">
        <h2 className="text-sm font-semibold text-on-dark">{t('trend.tableTitle')}</h2>
        <p className="text-xs text-on-dark-soft">{t('trend.tableHint')}</p>
      </div>
      <ul className="space-y-1">
        {trends.map((trend) => (
          <li key={trend.timeframe.id}>
            <TimeframeRow
              trend={trend}
              active={trend.timeframe.id === selected}
              onClick={() => onSelect(trend.timeframe.id)}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}

function TimeframeRow({ trend, active, onClick }: { trend: TimeframeTrend; active: boolean; onClick: () => void }) {
  const { t } = useTranslation()
  const { timeframe, result, isLoading, isError } = trend

  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'grid w-full cursor-pointer grid-cols-[56px_1fr_auto] items-center gap-x-3 gap-y-2 rounded-lg px-3 py-3 text-left transition-colors sm:grid-cols-[64px_128px_64px_1fr_88px]',
        active ? 'bg-canvas text-ink' : 'text-on-dark hover:bg-white/[0.06]',
      )}
    >
      <span className="text-sm font-semibold">{t(`timeframe.${timeframe.id}`)}</span>

      {isError ? (
        <span className={cn('col-span-2 flex items-center gap-1.5 text-sm sm:col-span-3', active ? 'text-body' : 'text-on-dark-soft')}>
          <AlertCircle className="size-4" /> {t('common.loadError')}
        </span>
      ) : isLoading || !result ? (
        <Skeleton className={cn('col-span-2 h-6 sm:col-span-4', active ? 'bg-surface-strong' : 'bg-white/10')} />
      ) : (
        <>
          <span className="flex min-w-0 items-center gap-1.5">
            <BiasLabel bias={result.bias} tone={active ? 'light' : 'dark'} className="text-xs whitespace-nowrap" />
            {/* 모바일은 ADX 열이 없으므로 횡보 표시를 라벨 옆에 */}
            {result.ranging && (
              <span className={cn('text-xs sm:hidden', active ? 'text-body' : 'text-on-dark-soft')}>{t('trend.ranging')}</span>
            )}
          </span>
          <span className="text-right font-mono text-lg font-medium sm:text-left">
            {Math.max(result.probLong, result.probShort)}%
          </span>
          <ProbabilityTrack long={result.probLong} active={active} />
          <span className={cn('hidden text-right text-xs leading-tight sm:block', active ? 'text-body' : 'text-on-dark-soft')}>
            <span className="font-mono">ADX {result.adx.toFixed(1)}</span>
            {result.ranging && <span className="block">{t('trend.ranging')}</span>}
          </span>
        </>
      )}
    </button>
  )
}

// 행 안에서는 라벨 없이 막대만 (숫자는 왼쪽 % 와 라벨이 이미 보여줌)
function ProbabilityTrack({ long, active }: { long: number; active: boolean }) {
  return (
    <span className="col-span-3 flex h-2 gap-0.5 overflow-hidden rounded-pill sm:col-span-1" aria-hidden>
      <span className="bg-up" style={{ width: `${long}%` }} />
      <span className={active ? 'bg-down' : 'bg-down-on-dark'} style={{ width: `${100 - long}%` }} />
    </span>
  )
}
