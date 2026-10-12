import { useTranslation } from 'react-i18next'
import { APP_NAME } from '@/shared/config'
import { formatLongDate, useLocale } from '@/shared/i18n'
import { usePageMeta } from '@/shared/lib'
import { DocPage } from '@/shared/ui'
import { TermsEn } from './content/TermsEn'
import { TermsKo } from './content/TermsKo'

const EFFECTIVE_DATE = '2026-10-08'

export function TermsPage() {
  const { t } = useTranslation()
  const locale = useLocale()
  usePageMeta({
    title: t('meta.termsTitle', { site: APP_NAME }),
    description: t('meta.termsDescription', { site: APP_NAME }),
    path: '/terms',
  })

  return (
    <DocPage eyebrow="Terms" title={t('pages.termsTitle')} updatedAt={formatLongDate(EFFECTIVE_DATE, locale)}>
      {locale === 'en' ? <TermsEn /> : <TermsKo />}
    </DocPage>
  )
}
