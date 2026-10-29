import { Eye, TrendingDown, TrendingUp } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/shared/lib'
import { BIAS_TEXT_LIGHT, BIAS_TONE } from '../model/biasTone'
import type { TrendBias } from '../model/computeTrend'

const icons = { long: TrendingUp, short: TrendingDown, neutral: Eye } as const

const pills = {
  light: {
    long: 'border-up/60 bg-up/10',
    short: 'border-down/60 bg-down/10',
    neutral: 'border-hairline bg-surface-soft',
  },
  dark: {
    long: 'border-up/60 bg-up/10',
    short: 'border-down-on-dark/60 bg-down-on-dark/10',
    neutral: 'border-muted-soft/50 bg-muted-soft/10',
  },
} as const

interface BiasLabelProps {
  bias: TrendBias
  tone?: 'light' | 'dark'
  className?: string
}

export function BiasLabel({ bias, tone = 'light', className }: BiasLabelProps) {
  const { t } = useTranslation()
  const Icon = icons[bias]
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-pill border px-2.5 py-0.5 font-semibold',
        pills[tone][bias],
        tone === 'dark' ? BIAS_TONE[bias].text : BIAS_TEXT_LIGHT[bias],
        className,
      )}
    >
      <Icon className="size-4" strokeWidth={2.5} />
      {t(`bias.${bias}`)}
    </span>
  )
}
