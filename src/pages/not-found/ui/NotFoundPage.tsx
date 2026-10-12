import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/shared/ui'

export function NotFoundPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  return (
    <section className="mx-auto flex max-w-[1200px] flex-col items-center gap-4 px-4 py-24 text-center">
      <h1 className="text-[52px] leading-none font-normal tracking-tight">404</h1>
      <p className="text-body">{t('notFound.message')}</p>
      <Button onClick={() => navigate('/')}>{t('notFound.goHome')}</Button>
    </section>
  )
}
