import type { HtmlTagDescriptor, Plugin } from 'vite'
import { SITE } from './src/shared/config/site.ts'

interface SeoOptions {
  siteUrl: string // 끝 슬래시 없이 (https://example.com)
  googleVerification?: string
  naverVerification?: string
  adsenseClient?: string // ca-pub-XXXXXXXXXXXXXXXX
}

// src/app/router 의 공개 페이지 경로와 맞춘다
const SITEMAP_PATHS = [
  { path: '/', changefreq: 'daily', priority: '1.0' },
  { path: '/about', changefreq: 'monthly', priority: '0.7' },
  { path: '/terms', changefreq: 'yearly', priority: '0.3' },
  { path: '/privacy', changefreq: 'yearly', priority: '0.3' },
]

const escapeHtml = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

// index.html 의 __SEO_*__ 토큰 치환 + 검색엔진 소유확인·애드센스 태그 주입 + 빌드 시 robots.txt / sitemap.xml / ads.txt 생성
export function seo({ siteUrl, googleVerification, naverVerification, adsenseClient }: SeoOptions): Plugin {
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
        if (adsenseClient) {
          tags.push({ tag: 'meta', attrs: { name: 'google-adsense-account', content: adsenseClient } })
          tags.push({
            tag: 'script',
            attrs: {
              async: true,
              src: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`,
              crossorigin: 'anonymous',
            },
          })
        }
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
          ...SITEMAP_PATHS.map(
            (p) =>
              `  <url><loc>${siteUrl}${p.path}</loc><lastmod>${new Date().toISOString().slice(0, 10)}</lastmod><changefreq>${p.changefreq}</changefreq><priority>${p.priority}</priority></url>`,
          ),
          '</urlset>',
          '',
        ].join('\n'),
      })
      if (adsenseClient) {
        // ads.txt 의 게시자 ID 는 'ca-' 접두사를 뺀 pub-XXXX 형식
        this.emitFile({
          type: 'asset',
          fileName: 'ads.txt',
          source: `google.com, ${adsenseClient.replace(/^ca-/, '')}, DIRECT, f08c47fec0942fa0\n`,
        })
      }
    },
  }
}
