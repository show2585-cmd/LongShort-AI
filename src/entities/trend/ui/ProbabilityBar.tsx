import { useTranslation } from 'react-i18next'
import { cn } from '@/shared/lib'

interface ProbabilityBarProps {
  long: number // 0~100
  className?: string
  labels?: [string, string]
  tone?: 'light' | 'dark'
}

export function ProbabilityBar({ long, className, labels, tone = 'light' }: ProbabilityBarProps) {
  const { t } = useTranslation()
  const [longLabel, shortLabel] = labels ?? [t('common.long'), t('common.short')]
  const short = 100 - long
  return (
    <div className={className}>
      <div className="flex h-2 gap-0.5 overflow-hidden rounded-pill">
        <div className="bg-up transition-[width] duration-500" style={{ width: `${long}%` }} />
        <div className="bg-down transition-[width] duration-500" style={{ width: `${short}%` }} />
      </div>
      <div
        className={cn(
          'mt-2 flex justify-between font-mono text-xs',
          tone === 'dark' ? 'text-on-dark-soft' : 'text-muted',
        )}
      >
        <span>
          {longLabel} <span className="text-up">{long.toFixed(1).replace(/\.0$/, '')}%</span>
        </span>
        <span>
          <span className="text-down">{short.toFixed(1).replace(/\.0$/, '')}%</span> {shortLabel}
        </span>
      </div>
    </div>
  )
}
