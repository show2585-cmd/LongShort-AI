import { AlertCircle, LineChart } from 'lucide-react'
import type { Timeframe } from '@/entities/market'
import { BIAS_TONE, BiasLabel, ProbabilityBar } from '@/entities/trend'
import { cn } from '@/shared/lib'
import { Skeleton } from '@/shared/ui'
import { useTrends, type TimeframeTrend } from '../model/useTrends'

interface TrendOverviewProps {
  symbol: string
  selected: Timeframe['id']
  onSelect: (tf: Timeframe['id']) => void
}

export function TrendOverview({ symbol, selected, onSelect }: TrendOverviewProps) {
  const { trends, consensus } = useTrends(symbol)

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-on-dark-soft">종합 추세 판단</p>
          {consensus ? (
            <p
              className={cn(
                'mt-3 inline-flex flex-wrap items-baseline gap-x-2 rounded-xl border-2 bg-linear-to-br to-transparent px-5 py-3 text-[40px] leading-none font-normal tracking-tight sm:text-[52px]',
                BIAS_TONE[consensus.bias].border,
                BIAS_TONE[consensus.bias].tint,
              )}
            >
              <span className={consensus.bias === 'neutral' ? 'text-on-dark' : BIAS_TONE[consensus.bias].text}>
                {consensus.bias === 'long' ? '롱' : consensus.bias === 'short' ? '숏' : '관망 추천'}
              </span>
              {consensus.bias === 'neutral' ? (
                <span className="text-base text-on-dark-soft">
                  방향성 약함 · {consensus.probLong >= 50 ? '롱' : '숏'}{' '}
                  <span className="font-mono">{Math.max(consensus.probLong, 100 - consensus.probLong)}%</span>
                </span>
              ) : (
                <span className="font-mono text-[32px] sm:text-[40px]">
                  {Math.max(consensus.probLong, 100 - consensus.probLong)}%
                </span>
              )}
            </p>
          ) : (
            <Skeleton className="mt-2 h-12 w-56 bg-surface-dark-elevated" />
          )}
        </div>
        {consensus && (
          <p className="text-sm text-on-dark-soft">
            5개 타임프레임 중 <span className="font-mono text-on-dark">{consensus.agree}</span>개가 같은 방향 · 상위
            타임프레임 가중
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
        {trends.map((t) => (
          <TrendCard
            key={t.timeframe.id}
            trend={t}
            active={t.timeframe.id === selected}
            onClick={() => onSelect(t.timeframe.id)}
          />
        ))}
      </div>
    </div>
  )
}

function TrendCard({ trend, active, onClick }: { trend: TimeframeTrend; active: boolean; onClick: () => void }) {
  const { timeframe, result, isLoading, isError } = trend
  const tone = result ? BIAS_TONE[result.bias] : null

  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'cursor-pointer rounded-xl border-2 bg-surface-dark-elevated bg-linear-to-b to-transparent p-5 text-left transition-[box-shadow,border-color,translate] duration-200 last:col-span-2 md:last:col-span-1',
        tone ? [tone.border, tone.tint] : 'border-white/10',
        active
          ? '-translate-y-1 shadow-[0_12px_32px_rgba(0,82,255,0.35)] ring-2 ring-primary ring-offset-2 ring-offset-surface-dark'
          : 'hover:ring-1 hover:ring-white/20 hover:ring-offset-2 hover:ring-offset-surface-dark',
      )}
    >
      <div className="flex items-center justify-between">
        {active ? (
          <span className="inline-flex items-center gap-1 rounded-pill bg-primary px-2.5 py-0.5 text-sm font-semibold text-white">
            <LineChart className="size-3.5" strokeWidth={2.5} />
            {timeframe.label}
          </span>
        ) : (
          <span className="py-0.5 text-sm font-semibold text-on-dark">{timeframe.label}</span>
        )}
        {result?.ranging && (
          <span className="rounded-pill bg-white/10 px-2 py-0.5 text-[11px] text-on-dark-soft">횡보</span>
        )}
      </div>

      {isError ? (
        <p className="mt-6 flex items-center gap-1.5 text-sm text-on-dark-soft">
          <AlertCircle className="size-4" /> 데이터를 불러오지 못했습니다
        </p>
      ) : isLoading || !result ? (
        <div className="mt-4 space-y-3">
          <Skeleton className="h-8 w-20 bg-white/10" />
          <Skeleton className="h-2 w-full bg-white/10" />
        </div>
      ) : (
        <>
          <BiasLabel bias={result.bias} className="mt-3 text-sm" />
          <p className="mt-1 flex items-baseline gap-1.5 text-on-dark">
            <span className="font-mono text-[28px] leading-tight font-medium">
              {Math.max(result.probLong, result.probShort)}%
            </span>
            <span className="text-xs text-on-dark-soft">{result.probLong >= result.probShort ? '롱' : '숏'} 확률</span>
          </p>
          <ProbabilityBar long={result.probLong} tone="dark" className="mt-3" />
          <p className="mt-3 font-mono text-[11px] text-on-dark-soft">ADX {result.adx.toFixed(1)}</p>
        </>
      )}
    </button>
  )
}
