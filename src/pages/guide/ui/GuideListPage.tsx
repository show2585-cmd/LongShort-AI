import { ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { blocksText, GUIDES, readMinutes } from '@/entities/guide'
import { APP_NAME } from '@/shared/config'
import { useLocale } from '@/shared/i18n'
import { usePageMeta } from '@/shared/lib'

export function GuideListPage() {
  const { t } = useTranslation()
  const locale = useLocale()
  usePageMeta({
    title: t('meta.guideListTitle', { site: APP_NAME }),
    description: t('meta.guideListDescription'),
    path: '/guide',
  })

  return (
    <section className="mx-auto max-w-[760px] px-4 py-16 lg:py-24">
      <p className="text-sm font-semibold text-primary">Guide</p>
      <h1 className="mt-2 text-[36px] leading-tight font-normal tracking-tight sm:text-[44px]">{t('pages.guideTitle')}</h1>
      <p className="mt-4 text-[15px] leading-relaxed text-body">{t('guide.intro', { name: APP_NAME })}</p>

      <ul className="mt-10 divide-y divide-hairline border-y border-hairline">
        {GUIDES.map((g) => {
          const c = g[locale]
          return (
            <li key={g.slug}>
              <Link to={`/guide/${g.slug}`} className="group flex items-start gap-4 py-6">
                <div className="min-w-0 flex-1">
                  <h2 className="text-lg leading-snug font-semibold text-ink group-hover:text-primary">{c.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-body">{c.description}</p>
                  <p className="mt-2 text-xs text-muted">
                    {t('guide.readTime', { min: readMinutes(blocksText(c.body).length, locale) })}
                  </p>
                </div>
                <ChevronRight className="mt-1 size-5 shrink-0 text-muted group-hover:text-primary" />
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
