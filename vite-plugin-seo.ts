import type { HtmlTagDescriptor, Plugin } from 'vite'
import { SITE } from './src/shared/config/site.ts'

interface SeoOptions {
  siteUrl: string // 끝 슬래시 없이 (https://example.com)
  googleVerification?: string
  naverVerification?: string
}

const escapeHtml = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

// index.html 의 __SEO_*__ 토큰 치환 + 검색엔진 소유확인 메타 주입 + 빌드 시 robots.txt / sitemap.xml 생성
export function seo({ siteUrl, googleVerification, naverVerification }: SeoOptions): Plugin {
  const tokens: Record<string, string> = {
    __SEO_URL__: siteUrl,
    __SEO_TITLE__: escapeHtml(SITE.title),
    __SEO_DESCRIPTION__: escapeHtml(SITE.description),
    __SEO_KEYWORDS__: escapeHtml(SITE.keywords.join(', ')),
    __SEO_NAME__: escapeHtml(SITE.name),
    __SEO_LOCALE__: SITE.locale,
    __SEO_THEME__: SITE.themeColor,
    __SEO_OG_IMAGE__: siteUrl + SITE.ogImage,
    __SEO_JSON_LD__: JSON.stringify([
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE.name,
        url: siteUrl + '/',
        inLanguage: 'ko-KR',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: SITE.name,
        url: siteUrl + '/',
        description: SITE.description,
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        inLanguage: 'ko-KR',
        image: siteUrl + SITE.ogImage,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
      },
    ]).replace(/</g, '\\u003c'),
  }

  return {
    name: 'longshort-seo',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        const out = Object.entries(tokens).reduce((h, [k, v]) => h.split(k).join(v), html)
        const tags: HtmlTagDescriptor[] = []
        if (googleVerification)
          tags.push({ tag: 'meta', attrs: { name: 'google-site-verification', content: googleVerification } })
        if (naverVerification)
          tags.push({ tag: 'meta', attrs: { name: 'naver-site-verification', content: naverVerification } })
        return { html: out, tags }
      },
    },
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: ['User-agent: *', 'Allow: /', 'Disallow: /api/', 'Disallow: /binance/', '', `Sitemap: ${siteUrl}/sitemap.xml`, ''].join('\n'),
      })
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
          `  <url><loc>${siteUrl}/</loc><lastmod>${new Date().toISOString().slice(0, 10)}</lastmod><changefreq>daily</changefreq><priority>1.0</priority></url>`,
          '</urlset>',
          '',
        ].join('\n'),
      })
    },
  }
}
