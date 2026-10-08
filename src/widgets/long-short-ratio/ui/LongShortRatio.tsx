import { useLongShortRatio, type Timeframe } from '@/entities/market'
import { ProbabilityBar } from '@/entities/trend'
import type { RatioKind } from '@/shared/api'
import { Card, CardHeader, Skeleton, Sparkline } from '@/shared/ui'

const ROWS: { kind: RatioKind; title: string; hint: string; labels: [string, string] }[] = [
  { kind: 'globalAccount', title: '전체 계정', hint: '롱/숏 포지션 보유 계정 수 비율', labels: ['롱', '숏'] },
  { kind: 'topPosition', title: '상위 트레이더 포지션', hint: '증거금 상위 20% 계정의 포지션 규모 비율', labels: ['롱', '숏'] },
  { kind: 'taker', title: '테이커 매수/매도', hint: '시장가 매수 vs 매도 체결량', labels: ['매수', '매도'] },
]

interface LongShortRatioProps {
  symbol: string
  timeframe: Timeframe
}

export function LongShortRatio({ symbol, timeframe }: LongShortRatioProps) {
  return (
    <Card>
      <CardHeader title="롱/숏 비율" description={`Binance USDT-M 선물 · ${timeframe.label} 기준`} />
      <div className="space-y-6">
        {ROWS.map((row) => (
          <RatioRow key={row.kind} {...row} symbol={symbol} period={timeframe.id} />
        ))}
      </div>
    </Card>
  )
}

interface RatioRowProps {
  kind: RatioKind
  title: string
  hint: string
  labels: [string, string]
  symbol: string
  period: Timeframe['id']
}

function RatioRow({ kind, title, hint, labels, symbol, period }: RatioRowProps) {
  const { data, isError } = useLongShortRatio(kind, symbol, period, 48)
  const latest = data?.[data.length - 1]

  return (
    <div>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold">{title}</p>
          <p className="text-xs text-muted">{hint}</p>
        </div>
        {latest && <span className="font-mono text-sm font-medium">{latest.ratio.toFixed(2)}</span>}
      </div>
      {isError ? (
        <p className="mt-3 text-xs text-muted">데이터를 불러오지 못했습니다</p>
      ) : !latest ? (
        <Skeleton className="mt-3 h-10 w-full" />
      ) : (
        <div className="mt-3 flex items-center gap-4">
          <ProbabilityBar long={latest.long * 100} labels={labels} className="flex-1" />
          <Sparkline values={data!.map((d) => d.long * 100)} baseline={50} width={88} height={32} />
        </div>
      )}
    </div>
  )
}
