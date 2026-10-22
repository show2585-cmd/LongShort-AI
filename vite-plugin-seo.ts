import type { HtmlTagDescriptor, Plugin } from 'vite'
import { GUIDES } from './src/entities/guide/model/articles/index.ts'
import { blocksToHtml } from './src/entities/guide/model/renderHtml.ts'
import { SITE } from './src/shared/config/site.ts'
import { ko } from './src/shared/i18n/locales/ko.ts'

interface SeoOptions {
  siteUrl: string // 끝 슬래시 없이 (https://example.com)
  googleVerification?: string
  naverVerification?: string
  adsenseClient?: string // ca-pub-XXXXXXXXXXXXXXXX
}

// 경로별 정적 HTML. JS 를 실행하지 않는 크롤러도 모든 URL 에서 홈과 다른 고유 본문을 읽도록 한다
interface StaticPage {
  path: string
  title: string
  description: string
  body: string // #root 안에 들어갈 HTML
  type?: 'website' | 'article'
  jsonLd?: object
  lastmod?: string
  changefreq: string
  priority: string
}

const escapeHtml = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
const fill = (s: string) => s.split('{{site}}').join(SITE.name)

const GUIDE_LINKS = `<ul>${GUIDES.map((g) => `<li><a href="/guide/${g.slug}">${escapeHtml(g.ko.title)}</a></li>`).join('')}</ul>`
const STATIC_NAV = `<nav><a href="/">분석</a> · <a href="/guide">가이드</a> · <a href="/about">서비스 소개</a> · <a href="/terms">이용약관</a> · <a href="/privacy">개인정보처리방침</a></nav>`
const staticMain = (inner: string) =>
  `<main style="max-width: 760px; margin: 0 auto; padding: 48px 16px; font-family: system-ui, sans-serif; line-height: 1.7; color: #0a0b0d">${inner}${STATIC_NAV}</main>`

function buildPages(siteUrl: string): StaticPage[] {
  const docPage = (path: string, h1: string, title: string, description: string): StaticPage => ({
    path,
    title: fill(title),
    description: fill(description),
    body: staticMain(`<h1>${escapeHtml(h1)}</h1><p>${escapeHtml(fill(description))}</p>`),
    changefreq: path === '/about' ? 'monthly' : 'yearly',
    priority: path === '/about' ? '0.7' : '0.3',
  })

  return [
    {
      path: '/guide',
      title: fill(ko.meta.guideListTitle),
      description: ko.meta.guideListDescription,
      body: staticMain(
        `<h1>${ko.pages.guideTitle}</h1><p>${escapeHtml(ko.guide.intro.split('{{name}}').join(SITE.name))}</p><ul>${GUIDES.map(
          (g) => `<li><a href="/guide/${g.slug}"><strong>${escapeHtml(g.ko.title)}</strong></a><br />${escapeHtml(g.ko.description)}</li>`,
        ).join('')}</ul>`,
      ),
      lastmod: GUIDES.map((g) => g.updatedAt).sort().at(-1),
      changefreq: 'weekly',
      priority: '0.8',
    },
    ...GUIDES.map(
      (g): StaticPage => ({
        path: `/guide/${g.slug}`,
        title: `${g.ko.title} | ${SITE.name}`,
        description: g.ko.description,
        type: 'article',
        body: staticMain(
          `<article><h1>${escapeHtml(g.ko.title)}</h1><p><small>업데이트 ${g.updatedAt}</small></p>${blocksToHtml(g.ko.body)}<p><small>${escapeHtml(ko.guide.disclaimer)}</small></p></article><h2>${ko.guide.more}</h2>${GUIDE_LINKS}`,
        ),
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: g.ko.title,
          description: g.ko.description,
          datePublished: g.publishedAt,
          dateModified: g.updatedAt,
          inLanguage: 'ko-KR',
          url: `${siteUrl}/guide/${g.slug}`,
          image: siteUrl + SITE.ogImage,
          author: { '@type': 'Organization', name: SITE.name, url: siteUrl + '/' },
          publisher: { '@type': 'Organization', name: SITE.name, url: siteUrl + '/' },
        },
        lastmod: g.updatedAt,
        changefreq: 'monthly',
        priority: '0.8',
      }),
    ),
    docPage('/about', ko.pages.aboutTitle.split('{{name}}').join(SITE.name), ko.meta.aboutTitle, ko.meta.aboutDescription),
    docPage('/terms', ko.pages.termsTitle, ko.meta.termsTitle, ko.meta.termsDescription),
    docPage('/privacy', ko.pages.privacyTitle, ko.meta.privacyTitle, ko.meta.privacyDescription),
  ]
}

// 빌드된 index.html 을 경로별 메타 · 본문으로 바꾼다
function renderPage(html: string, page: StaticPage, siteUrl: string) {
  const url = siteUrl + page.path
  const title = escapeHtml(page.title)
  const desc = escapeHtml(page.description)
  const attr = (pattern: string, value: string) => (h: string) =>
    h.replace(new RegExp(`(${pattern}[^>]*?(?:content|href)=")[^"]*(")`), `$1${value}$2`)
  const steps = [
    (h: string) => h.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`),
    attr('<meta name="description"', desc),
    attr('<link rel="canonical"', url),
    attr('<meta property="og:type"', page.type ?? 'website'),
    attr('<meta property="og:url"', url),
    attr('<meta property="og:title"', title),
    attr('<meta property="og:description"', desc),
    attr('<meta name="twitter:title"', title),
    attr('<meta name="twitter:description"', desc),
    (h: string) => h.replace(/<!--static:start-->[\s\S]*?<!--static:end-->/, page.body),
    (h: string) =>
      page.jsonLd
        ? h.replace(
            '</head>',
            `  <script type="application/ld+json">${JSON.stringify(page.jsonLd).replace(/</g, '\\u003c')}</script>\n  </head>`,
          )
        : h,
  ]
  return steps.reduce((h, step) => step(h), html)
}

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
    __SEO_GUIDE_LINKS__: GUIDE_LINKS,
  }
  const pages = buildPages(siteUrl)
  const today = new Date().toISOString().slice(0, 10)
  const sitemapEntries = [{ path: '/', changefreq: 'daily', priority: '1.0', lastmod: today }, ...pages]

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
    generateBundle: {
      // index.html 이 번들에 들어온 뒤 실행되도록 post
      order: 'post',
      handler(_, bundle) {
        const index = bundle['index.html']
        if (index?.type === 'asset') {
          const html = String(index.source)
          // /guide/foo → guide/foo.html (Vercel 은 cleanUrls, vite preview 는 .html 폴백으로 서빙)
          for (const page of pages) {
            this.emitFile({
              type: 'asset',
              fileName: `${page.path.slice(1)}.html`,
              source: renderPage(html, page, siteUrl),
            })
          }
        }
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
            ...sitemapEntries.map(
              (p) =>
                `  <url><loc>${siteUrl}${p.path}</loc><lastmod>${p.lastmod ?? today}</lastmod><changefreq>${p.changefreq}</changefreq><priority>${p.priority}</priority></url>`,
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
    },
  }
}
