import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { MARKET_GROUPS, SYMBOLS, useSymbolName, type MarketSymbol } from '@/entities/market'
import { cn } from '@/shared/lib'

interface SymbolSelectorProps {
  value: MarketSymbol
  onChange: (symbol: MarketSymbol) => void
}

// 한국 주식 · 코인 두 묶음. 모바일은 한 줄 가로 스크롤, 넓은 화면은 줄바꿈
export function SymbolSelector({ value, onChange }: SymbolSelectorProps) {
  const { t } = useTranslation()
  return (
    <div className="-mx-4 flex items-center gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
      {MARKET_GROUPS.map((group, i) => (
        <Fragment key={group}>
          {i > 0 && <span aria-hidden className="mx-1 h-5 w-px shrink-0 bg-surface-dark-elevated" />}
          <div role="group" aria-label={t(`market.${group}`)} className="flex shrink-0 items-center gap-2">
            <span className="mr-1 shrink-0 text-xs text-on-dark-soft">{t(`market.${group}`)}</span>
            {SYMBOLS.filter((s) => s.group === group).map((s) => (
              <SymbolButton key={s.id} symbol={s} active={s.id === value.id} onClick={() => onChange(s)} />
            ))}
          </div>
        </Fragment>
      ))}
    </div>
  )
}

function SymbolButton({ symbol, active, onClick }: { symbol: MarketSymbol; active: boolean; onClick: () => void }) {
  const name = useSymbolName(symbol)
  // 코인은 티커가 더 익숙하고, 주식은 종목명으로 찾는다
  const label = symbol.group === 'crypto' ? symbol.base : name
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      title={symbol.group === 'crypto' ? name : `${name} (${symbol.id})`}
      className={cn(
        'h-9 shrink-0 cursor-pointer rounded-pill px-4 text-sm font-semibold whitespace-nowrap transition-colors',
        active ? 'bg-canvas text-ink' : 'bg-surface-dark-elevated text-on-dark-soft hover:text-on-dark',
      )}
    >
      {label}
    </button>
  )
}
