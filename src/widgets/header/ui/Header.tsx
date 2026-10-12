import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { SupportButton } from '@/features/support-developer'
import { LanguageOptions, LanguageSwitcher } from '@/features/switch-language'
import { APP_NAME, USE_MOCK } from '@/shared/config'
import { cn } from '@/shared/lib'
import { Badge, Logo } from '@/shared/ui'

const NAV = [
  { to: '/', label: 'nav.analysis', end: true },
  { to: '/about', label: 'nav.about', end: false },
] as const

const navClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? 'text-ink' : 'text-body hover:text-ink'

export function Header() {
  const { t } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()

  // 페이지가 바뀌면 모바일 메뉴를 닫는다
  const [prevPath, setPrevPath] = useState(pathname)
  if (prevPath !== pathname) {
    setPrevPath(pathname)
    setMenuOpen(false)
  }

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menuOpen])

  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-canvas/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 lg:px-6">
        <Link to="/" aria-label={t('nav.home', { name: APP_NAME })}>
          <Logo />
        </Link>
        <div className="flex items-center gap-3 sm:gap-4">
          {USE_MOCK && <Badge tone="default">Demo data</Badge>}
          <nav className="hidden items-center gap-4 text-sm font-medium sm:flex">
            {NAV.map((n) => (
              <NavLink key={n.to} to={n.to} end={n.end} className={navClass}>
                {t(n.label)}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-1">
            <LanguageSwitcher className="hidden sm:inline-flex" />
            <SupportButton />
            {/* 모바일: 분석 · 서비스 소개 · 언어 설정은 햄버거 메뉴 안에서 */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="inline-flex size-9 cursor-pointer items-center justify-center rounded-full text-ink hover:bg-surface-strong sm:hidden"
            >
              {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <>
          <div className="fixed inset-x-0 top-16 bottom-0 bg-ink/40 sm:hidden" onClick={() => setMenuOpen(false)} />
          <div
            id="mobile-menu"
            className="absolute inset-x-0 top-full border-b border-hairline bg-canvas px-4 pt-2 pb-5 shadow-soft sm:hidden"
          >
            <nav className="flex flex-col">
              {NAV.map((n) => (
                <NavLink
                  key={n.to}
                  to={n.to}
                  end={n.end}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'border-b border-hairline-soft py-3.5 text-base font-semibold',
                      isActive ? 'text-primary' : 'text-ink',
                    )
                  }
                >
                  {t(n.label)}
                </NavLink>
              ))}
            </nav>
            <p className="mt-5 mb-2 text-xs font-semibold text-muted">{t('language.label')}</p>
            <LanguageOptions />
          </div>
        </>
      )}
    </header>
  )
}
