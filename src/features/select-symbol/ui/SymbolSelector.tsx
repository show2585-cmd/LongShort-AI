import { SYMBOLS, type MarketSymbol } from '@/entities/market'
import { cn } from '@/shared/lib'

interface SymbolSelectorProps {
  value: MarketSymbol
  onChange: (symbol: MarketSymbol) => void
}

export function SymbolSelector({ value, onChange }: SymbolSelectorProps) {
  return (
    <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
      {SYMBOLS.map((s) => {
        const active = s.id === value.id
        return (
          <button
            key={s.id}
            onClick={() => onChange(s)}
            aria-pressed={active}
            className={cn(
              'h-9 shrink-0 cursor-pointer rounded-pill px-4 text-sm font-semibold transition-colors',
              active ? 'bg-canvas text-ink' : 'bg-surface-dark-elevated text-on-dark-soft hover:text-on-dark',
            )}
          >
            {s.base}
          </button>
        )
      })}
    </div>
  )
}
