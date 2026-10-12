import { Mail } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { SupportButton } from '@/features/support-developer'
import { APP_NAME, CONTACT_EMAIL } from '@/shared/config'
import { Logo } from '@/shared/ui'

const LINKS = [
  { to: '/about', label: 'nav.about' },
  { to: '/terms', label: 'nav.terms' },
  { to: '/privacy', label: 'nav.privacy', strong: true },
] as const

export function Footer() {
  const { t } = useTranslation()
  return (
    <footer className="border-t border-hairline bg-canvas">
      <div className="mx-auto max-w-[1200px] px-4 py-12 lg:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <Logo />
          <nav aria-label={t('nav.policy')} className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={'strong' in l ? 'font-semibold text-ink hover:underline' : 'text-body hover:text-ink hover:underline'}
              >
                {t(l.label)}
              </Link>
            ))}
            <SupportButton variant="link" />
          </nav>
        </div>

        <div className="mt-8 space-y-3 border-t border-hairline-soft pt-6 text-[13px] leading-relaxed text-muted">
          <p>{t('footer.disclaimer', { name: APP_NAME })}</p>
          <p>{t('footer.sources')}</p>
          <p className="flex items-center gap-1.5">
            <Mail className="size-3.5" />
            {t('footer.contact')}{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-body underline-offset-2 hover:text-ink hover:underline">
              {CONTACT_EMAIL}
            </a>
          </p>
          <p>© 2026 {APP_NAME}</p>
        </div>
      </div>
    </footer>
  )
}
