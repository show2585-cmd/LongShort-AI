import { Languages } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useLocale } from '@/shared/i18n'
import { cn } from '@/shared/lib'

// 한국어 ↔ English 토글. 선택한 언어는 localStorage(lang) 에 기억된다
export function LanguageSwitcher({ className }: { className?: string }) {
  const { t, i18n } = useTranslation()
  const locale = useLocale()

  return (
    <button
      onClick={() => i18n.changeLanguage(locale === 'ko' ? 'en' : 'ko')}
      aria-label={t('language.switchTo')}
      title={t('language.switchTo')}
      className={cn(
        'inline-flex h-9 cursor-pointer items-center gap-1 rounded-pill px-2 text-sm font-semibold text-body transition-colors hover:bg-surface-strong hover:text-ink',
        className,
      )}
    >
      <Languages className="size-4" />
      {t('language.short')}
    </button>
  )
}
