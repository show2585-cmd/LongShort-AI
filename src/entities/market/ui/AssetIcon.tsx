import { cn } from '@/shared/lib'

export function AssetIcon({ base, className }: { base: string; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-surface-strong text-[11px] font-semibold text-ink',
        className,
      )}
    >
      {base.slice(0, 3)}
    </span>
  )
}
