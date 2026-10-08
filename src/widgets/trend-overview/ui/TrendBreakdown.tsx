import { useKlines, type Timeframe } from '@/entities/market'
import { BiasLabel, computeTrend, type TrendFactor } from '@/entities/trend'
import { Card, CardHeader, Skeleton } from '@/shared/ui'
import { useMemo } from 'react'

interface TrendBreakdownProps {
  symbol: string
  timeframe: Timeframe
}

export function TrendBreakdown({ symbol, timeframe }: TrendBreakdownProps) {
  const { data } = useKlines(symbol, timeframe.id)
  const result = useMemo(() => (data ? computeTrend(data) : null), [data])

  return (
    <Card>
      <CardHeader
        title={`${timeframe.label}봉 판단 근거`}
        description="8개 지표를 −1(숏) ~ +1(롱)로 점수화한 뒤 가중합하여 확률로 변환합니다."
        action={result && <BiasLabel bias={result.bias} className="text-sm" />}
      />
      {!result ? (
        <div className="space-y-4">
          {Array.from({ length: 8 }, (_, i) => (
            <Skeleton key={i} className="h-8 w-full" />
          ))}
        </div>
      ) : (
        <ul className="divide-y divide-hairline-soft">
          {result.factors.map((f) => (
            <FactorRow key={f.key} factor={f} />
          ))}
          <li className="flex items-center justify-between pt-4 text-sm">
            <span className="text-body">가중 점수</span>
            <span className={`font-mono font-medium ${result.score >= 0 ? 'text-up' : 'text-down'}`}>
              {result.score >= 0 ? '+' : ''}
              {result.score.toFixed(3)}
            </span>
          </li>
        </ul>
      )}
    </Card>
  )
}

function FactorRow({ factor }: { factor: TrendFactor }) {
  const pct = Math.abs(factor.value) * 50
  const positive = factor.value >= 0
  return (
    <li className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1.5 py-3 sm:grid-cols-[180px_1fr_56px]">
      <div>
        <p className="text-sm font-semibold">{factor.name}</p>
        <p className="text-xs text-muted">가중치 {Math.round(factor.weight * 100)}%</p>
      </div>
      <span
        className={`text-right font-mono text-sm font-medium sm:order-last ${positive ? 'text-up' : 'text-down'}`}
      >
        {positive ? '+' : ''}
        {factor.value.toFixed(2)}
      </span>
      <div className="col-span-2 sm:col-span-1">
        <div className="relative h-1.5 rounded-pill bg-surface-strong">
          <div className="absolute top-[-3px] left-1/2 h-3 w-px bg-muted-soft" />
          <div
            className={`absolute h-full rounded-pill ${positive ? 'bg-up' : 'bg-down'}`}
            style={positive ? { left: '50%', width: `${pct}%` } : { right: '50%', width: `${pct}%` }}
          />
        </div>
        <p className="mt-1.5 text-xs text-body">{factor.detail}</p>
      </div>
    </li>
  )
}
