import { Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { LOCALES, useLocale, type Locale } from '@/shared/i18n'
import { cn } from '@/shared/lib'

// 언어 이름은 번역하지 않고 각 언어 자체 표기로 보여준다
const NATIVE_NAME: Record<Locale, string> = { ko: '한국어', en: 'English' }

// 모바일 메뉴용 언어 선택 목록
export function LanguageOptions({ className }: { className?: string }) {
  const { t, i18n } = useTranslation()
  const locale = useLocale()

  return (
    <div role="radiogroup" aria-label={t('language.label')} className={cn('grid grid-cols-2 gap-2', className)}>
      {LOCALES.map((lng) => {
        const active = lng === locale
        return (
          <button
            key={lng}
            role="radio"
            aria-checked={active}
            lang={lng}
            onClick={() => i18n.changeLanguage(lng)}
            className={cn(
              'inline-flex h-11 cursor-pointer items-center justify-center gap-1.5 rounded-pill border text-sm font-semibold transition-colors',
              active ? 'border-primary bg-primary/5 text-primary' : 'border-hairline text-body hover:text-ink',
            )}
          >
            {active && <Check className="size-4" />}
            {NATIVE_NAME[lng]}
          </button>
        )
      })}
    </div>
  )
}
