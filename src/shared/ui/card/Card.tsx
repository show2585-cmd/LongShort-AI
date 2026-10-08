import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/shared/lib'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  tone?: 'light' | 'dark'
}

export function Card({ tone = 'light', className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl p-6',
        tone === 'light' ? 'border border-hairline bg-canvas text-ink' : 'bg-surface-dark-elevated text-on-dark',
        className,
      )}
      {...props}
    />
  )
}

interface CardHeaderProps {
  title: ReactNode
  description?: ReactNode
  action?: ReactNode
}

export function CardHeader({ title, description, action }: CardHeaderProps) {
  return (
    <div className="mb-5 flex items-start justify-between gap-3">
      <div>
        <h3 className="text-lg leading-snug font-semibold">{title}</h3>
        {description && <p className="mt-1 text-[13px] text-muted">{description}</p>}
      </div>
      {action}
    </div>
  )
}
