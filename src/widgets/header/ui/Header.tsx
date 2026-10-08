import { Link, NavLink } from 'react-router-dom'
import { APP_NAME, USE_MOCK } from '@/shared/config'
import { Badge, Logo } from '@/shared/ui'

const navClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? 'text-ink' : 'text-body hover:text-ink'

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-canvas/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 lg:px-6">
        <Link to="/" aria-label={`${APP_NAME} 홈`}>
          <Logo />
        </Link>
        <div className="flex items-center gap-4">
          {USE_MOCK && <Badge tone="default">Demo data</Badge>}
          <nav className="flex items-center gap-4 text-sm font-medium">
            <NavLink to="/" end className={navClass}>
              분석
            </NavLink>
            <NavLink to="/about" className={navClass}>
              서비스 소개
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  )
}
