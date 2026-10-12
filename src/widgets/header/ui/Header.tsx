import { useTranslation } from 'react-i18next'
import { Link, NavLink } from 'react-router-dom'
import { SupportButton } from '@/features/support-developer'
import { LanguageSwitcher } from '@/features/switch-language'
import { APP_NAME, USE_MOCK } from '@/shared/config'
import { Badge, Logo } from '@/shared/ui'

const navClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? 'text-ink' : 'text-body hover:text-ink'

export function Header() {
  const { t } = useTranslation()
  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-canvas/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 lg:px-6">
        <Link to="/" aria-label={t('nav.home', { name: APP_NAME })}>
          <Logo />
        </Link>
        <div className="flex items-center gap-3 sm:gap-4">
          {USE_MOCK && <Badge tone="default">Demo data</Badge>}
          <nav className="flex items-center gap-4 text-sm font-medium">
            <NavLink to="/" end className={navClass}>
              {t('nav.analysis')}
            </NavLink>
            <NavLink to="/about" className={navClass}>
              {t('nav.about')}
            </NavLink>
          </nav>
          <div className="flex items-center gap-1">
            <LanguageSwitcher />
            <SupportButton />
          </div>
        </div>
      </div>
    </header>
  )
}
