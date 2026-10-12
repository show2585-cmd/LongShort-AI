import { Eye, TrendingDown, TrendingUp } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/shared/lib'
import { BIAS_TONE } from '../model/biasTone'
import type { TrendBias } from '../model/computeTrend'

const config = {
  long: { icon: TrendingUp, pill: 'border-up/60 bg-up/10' },
  short: { icon: TrendingDown, pill: 'border-down/60 bg-down/10' },
  neutral: { icon: Eye, pill: 'border-muted-soft/50 bg-muted-soft/10' },
} as const

export function BiasLabel({ bias, className }: { bias: TrendBias; className?: string }) {
  const { t } = useTranslation()
  const { icon: Icon, pill } = config[bias]
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-pill border px-2.5 py-0.5 font-semibold',
        pill,
        BIAS_TONE[bias].text,
        className,
      )}
    >
      <Icon className="size-4" strokeWidth={2.5} />
      {t(`bias.${bias}`)}
    </span>
  )
}
