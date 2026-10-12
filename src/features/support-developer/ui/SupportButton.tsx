import { useState } from 'react'
import { Coffee } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/shared/lib'
import { SupportModal } from './SupportModal'

interface SupportButtonProps {
  // pill: 헤더용 테두리 버튼(모바일은 아이콘만) · link: 푸터용 텍스트 링크
  variant?: 'pill' | 'link'
  className?: string
}

export function SupportButton({ variant = 'pill', className }: SupportButtonProps) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label={t('support.ariaLabel')}
        className={cn(
          'inline-flex cursor-pointer items-center gap-1.5',
          variant === 'pill'
            ? 'size-9 justify-center rounded-pill border border-primary text-sm font-semibold text-primary transition-colors hover:bg-primary/5 sm:h-9 sm:w-auto sm:px-4'
            : 'text-sm text-body hover:text-ink hover:underline',
          className,
        )}
      >
        <Coffee className={variant === 'pill' ? 'size-4' : 'size-3.5'} />
        <span className={variant === 'pill' ? 'hidden sm:inline' : undefined}>{t('support.button')}</span>
      </button>
      <SupportModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}
