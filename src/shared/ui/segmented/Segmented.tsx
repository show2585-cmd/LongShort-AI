import { cn } from '@/shared/lib'

interface SegmentedProps<T extends string> {
  value: T
  options: readonly { value: T; label: string }[]
  onChange: (value: T) => void
  tone?: 'light' | 'dark'
  className?: string
}

export function Segmented<T extends string>({ value, options, onChange, tone = 'light', className }: SegmentedProps<T>) {
  const dark = tone === 'dark'
  return (
    <div
      role="tablist"
      className={cn(
        'inline-flex gap-1 rounded-pill p-1',
        dark ? 'bg-surface-dark-elevated' : 'bg-surface-strong',
        className,
      )}
    >
      {options.map((o) => {
        const active = o.value === value
        return (
          <button
            key={o.value}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(o.value)}
            className={cn(
              'h-8 cursor-pointer rounded-pill px-3 text-[13px] font-medium whitespace-nowrap transition-colors',
              active
                ? dark
                  ? 'bg-canvas text-ink'
                  : 'bg-canvas text-ink shadow-soft'
                : dark
                  ? 'text-on-dark-soft'
                  : 'text-body',
            )}
          >
            {o.label}
          </button>
        )
      })}
    </div>
  )
}
