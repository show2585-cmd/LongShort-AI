import { AlertCircle } from 'lucide-react'
import type { Timeframe } from '@/entities/market'
import { BiasLabel, ProbabilityBar } from '@/entities/trend'
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
            <p className="mt-1 text-[40px] leading-none font-normal tracking-tight sm:text-[52px]">
              <span className={consensus.bias === 'short' ? 'text-down' : consensus.bias === 'long' ? 'text-up' : ''}>
                {consensus.bias === 'long' ? '롱' : consensus.bias === 'short' ? '숏' : '관망 추천'}
              </span>{' '}
              {consensus.bias === 'neutral' ? (
                <span className="ml-1 text-base text-on-dark-soft">
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

  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'cursor-pointer rounded-xl bg-surface-dark-elevated p-5 text-left transition-colors last:col-span-2 md:last:col-span-1',
        active ? 'ring-2 ring-primary' : 'ring-1 ring-transparent hover:ring-white/15',
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-on-dark">{timeframe.label}</span>
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
