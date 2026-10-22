import { useTranslation } from 'react-i18next'
import { Link, Navigate, useParams } from 'react-router-dom'
import { blocksText, findGuide, GuideBody, GUIDES, readMinutes, type GuideArticle } from '@/entities/guide'
import { AD_SLOTS, APP_NAME } from '@/shared/config'
import { formatLongDate, useLocale } from '@/shared/i18n'
import { usePageMeta } from '@/shared/lib'
import { AdSlot, DocPage } from '@/shared/ui'

export function GuideArticlePage() {
  const { slug } = useParams()
  const guide = findGuide(slug)
  if (!guide) return <Navigate to="/guide" replace />
  return <Article guide={guide} />
}

function Article({ guide }: { guide: GuideArticle }) {
  const { t } = useTranslation()
  const locale = useLocale()
  const c = guide[locale]
  usePageMeta({ title: `${c.title} | ${APP_NAME}`, description: c.description, path: `/guide/${guide.slug}` })

  const others = GUIDES.filter((g) => g.slug !== guide.slug)

  return (
    <DocPage eyebrow="Guide" title={c.title}>
      <p className="text-sm text-muted">
        {t('guide.updated', { date: formatLongDate(guide.updatedAt, locale) })} ·{' '}
        {t('guide.readTime', { min: readMinutes(blocksText(c.body).length, locale) })}
      </p>
      <GuideBody blocks={c.body} />
      <p className="border-t border-hairline pt-6 text-[13px] text-muted">{t('guide.disclaimer')}</p>
      <p>
        <Link to="/">{t('guide.openTool')} →</Link>
      </p>
      <AdSlot slot={AD_SLOTS.content} className="pt-4" />

      <h2>{t('guide.more')}</h2>
      <ul>
        {others.map((g) => (
          <li key={g.slug}>
            <Link to={`/guide/${g.slug}`}>{g[locale].title}</Link>
          </li>
        ))}
      </ul>
    </DocPage>
  )
}
