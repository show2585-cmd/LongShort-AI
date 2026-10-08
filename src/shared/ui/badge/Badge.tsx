import type { HTMLAttributes } from 'react'
import { cn } from '@/shared/lib'

const tones = {
  default: 'bg-surface-strong text-ink',
  dark: 'bg-surface-dark-elevated text-on-dark',
  up: 'bg-surface-strong text-up',
  down: 'bg-surface-strong text-down',
} as const

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: keyof typeof tones
}

export function Badge({ tone = 'default', className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-pill px-3 py-1 text-xs font-semibold tracking-wide uppercase',
        tones[tone],
        className,
      )}
      {...props}
    />
  )
}
