import { Eye, TrendingDown, TrendingUp } from 'lucide-react'
import { cn } from '@/shared/lib'
import type { TrendBias } from '../model/computeTrend'

const config = {
  long: { text: '롱 우세', icon: TrendingUp, className: 'text-up' },
  short: { text: '숏 우세', icon: TrendingDown, className: 'text-down' },
  neutral: { text: '관망 추천', icon: Eye, className: 'text-muted-soft' },
} as const

export function BiasLabel({ bias, className }: { bias: TrendBias; className?: string }) {
  const { text, icon: Icon, className: color } = config[bias]
  return (
    <span className={cn('inline-flex items-center gap-1.5 font-semibold', color, className)}>
      <Icon className="size-4" strokeWidth={2.5} />
      {text}
    </span>
  )
}
