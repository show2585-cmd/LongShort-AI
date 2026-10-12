import { useTranslation } from 'react-i18next'
import { APP_NAME } from '@/shared/config'
import { formatLongDate, useLocale } from '@/shared/i18n'
import { usePageMeta } from '@/shared/lib'
import { DocPage } from '@/shared/ui'
import { PrivacyEn } from './content/PrivacyEn'
import { PrivacyKo } from './content/PrivacyKo'

const PRIVACY_EFFECTIVE_DATE = '2026-10-08'

export function PrivacyPage() {
  const { t } = useTranslation()
  const locale = useLocale()
  const effectiveDate = formatLongDate(PRIVACY_EFFECTIVE_DATE, locale)
  usePageMeta({
    title: t('meta.privacyTitle', { site: APP_NAME }),
    description: t('meta.privacyDescription', { site: APP_NAME }),
    path: '/privacy',
  })

  return (
    <DocPage eyebrow="Policy" title={t('pages.privacyTitle')} updatedAt={effectiveDate}>
      {locale === 'en' ? <PrivacyEn effectiveDate={effectiveDate} /> : <PrivacyKo effectiveDate={effectiveDate} />}
    </DocPage>
  )
}
