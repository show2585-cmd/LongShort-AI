import { useTranslation } from 'react-i18next'
import { useLongShortRatio, type Timeframe } from '@/entities/market'
import { ProbabilityBar } from '@/entities/trend'
import type { RatioKind } from '@/shared/api'
import { Card, CardHeader, Skeleton, Sparkline } from '@/shared/ui'

const KINDS: readonly RatioKind[] = ['globalAccount', 'topPosition', 'taker']

interface LongShortRatioProps {
  symbol: string
  timeframe: Timeframe
}

export function LongShortRatio({ symbol, timeframe }: LongShortRatioProps) {
  const { t } = useTranslation()
  return (
    <Card>
      <CardHeader
        title={t('ratio.title')}
        description={t('ratio.description', { tf: t(`timeframe.${timeframe.id}`) })}
      />
      <div className="space-y-6">
        {KINDS.map((kind) => (
          <RatioRow key={kind} kind={kind} symbol={symbol} period={timeframe.id} />
        ))}
      </div>
    </Card>
  )
}

interface RatioRowProps {
  kind: RatioKind
  symbol: string
  period: Timeframe['id']
}

function RatioRow({ kind, symbol, period }: RatioRowProps) {
  const { t } = useTranslation()
  const { data, isError } = useLongShortRatio(kind, symbol, period, 48)
  const latest = data?.[data.length - 1]
  const labels: [string, string] =
    kind === 'taker' ? [t('common.buy'), t('common.sell')] : [t('common.long'), t('common.short')]

  return (
    <div>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold">{t(`ratio.${kind}.title`)}</p>
          <p className="text-xs text-muted">{t(`ratio.${kind}.hint`)}</p>
        </div>
        {latest && <span className="font-mono text-sm font-medium">{latest.ratio.toFixed(2)}</span>}
      </div>
      {isError ? (
        <p className="mt-3 text-xs text-muted">{t('common.loadError')}</p>
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
