import { useEffect } from 'react'

interface PageMeta {
  title: string
  description?: string
  path?: string // canonical 경로 (예: /privacy). 생략 시 현재 경로
}

function setMeta(selector: string, attr: 'content' | 'href', value: string) {
  document.querySelector(selector)?.setAttribute(attr, value)
}

// SPA 라우트 이동 시 title · description · canonical · og 태그를 해당 페이지 값으로 갱신
export function usePageMeta({ title, description, path }: PageMeta) {
  useEffect(() => {
    const url = window.location.origin + (path ?? window.location.pathname)
    document.title = title
    setMeta('link[rel="canonical"]', 'href', url)
    setMeta('meta[property="og:url"]', 'content', url)
    setMeta('meta[property="og:title"]', 'content', title)
    setMeta('meta[name="twitter:title"]', 'content', title)
    if (description) {
      setMeta('meta[name="description"]', 'content', description)
      setMeta('meta[property="og:description"]', 'content', description)
      setMeta('meta[name="twitter:description"]', 'content', description)
    }
  }, [title, description, path])
}
