import { Link } from 'react-router-dom'
import { APP_NAME, USE_MOCK } from '@/shared/config'
import { Badge, Logo } from '@/shared/ui'

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-canvas/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 lg:px-6">
        <Link to="/" aria-label={`${APP_NAME} 홈`}>
          <Logo />
        </Link>
        <div className="flex items-center gap-3">
          {USE_MOCK && <Badge tone="default">Demo data</Badge>}
          <span className="hidden text-sm font-medium text-body sm:inline">Binance USDT-M 선물</span>
        </div>
      </div>
    </header>
  )
}
