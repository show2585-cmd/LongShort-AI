import { useTranslation } from 'react-i18next'
import { APP_NAME } from '@/shared/config'
import { useLocale } from '@/shared/i18n'
import { usePageMeta } from '@/shared/lib'
import { DocPage } from '@/shared/ui'
import { AboutEn } from './content/AboutEn'
import { AboutKo } from './content/AboutKo'

// 본문은 표·링크가 많아 키 단위 번역 대신 언어별 컴포넌트로 둔다
export function AboutPage() {
  const { t } = useTranslation()
  const locale = useLocale()
  usePageMeta({
    title: t('meta.aboutTitle', { site: APP_NAME }),
    description: t('meta.aboutDescription'),
    path: '/about',
  })

  return (
    <DocPage eyebrow="About" title={t('pages.aboutTitle', { name: APP_NAME })}>
      {locale === 'en' ? <AboutEn /> : <AboutKo />}
    </DocPage>
  )
}
