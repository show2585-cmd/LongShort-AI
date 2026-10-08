import { Eye, TrendingDown, TrendingUp } from 'lucide-react'
import { cn } from '@/shared/lib'
import { BIAS_TONE } from '../model/biasTone'
import type { TrendBias } from '../model/computeTrend'

const config = {
  long: { text: '롱 우세', icon: TrendingUp, pill: 'border-up/60 bg-up/10' },
  short: { text: '숏 우세', icon: TrendingDown, pill: 'border-down/60 bg-down/10' },
  neutral: { text: '관망 추천', icon: Eye, pill: 'border-muted-soft/50 bg-muted-soft/10' },
} as const

export function BiasLabel({ bias, className }: { bias: TrendBias; className?: string }) {
  const { text, icon: Icon, pill } = config[bias]
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
      {text}
    </span>
  )
}
