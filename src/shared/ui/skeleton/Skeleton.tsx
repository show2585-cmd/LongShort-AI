import { cn } from '@/shared/lib'

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn('animate-pulse rounded-sm bg-surface-strong', className)} />
}
