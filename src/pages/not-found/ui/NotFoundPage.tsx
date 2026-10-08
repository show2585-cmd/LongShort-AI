import { useNavigate } from 'react-router-dom'
import { Button } from '@/shared/ui'

export function NotFoundPage() {
  const navigate = useNavigate()
  return (
    <section className="mx-auto flex max-w-[1200px] flex-col items-center gap-4 px-4 py-24 text-center">
      <h1 className="text-[52px] leading-none font-normal tracking-tight">404</h1>
      <p className="text-body">페이지를 찾을 수 없습니다.</p>
      <Button onClick={() => navigate('/')}>홈으로</Button>
    </section>
  )
}
