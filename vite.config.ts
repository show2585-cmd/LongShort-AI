import path from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { seo } from './vite-plugin-seo.ts'
import { SITE } from './src/shared/config/site.ts'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  // 우선순위: 직접 지정(VITE_SITE_URL) > 운영 도메인(SITE.url)
  const siteUrl = (env.VITE_SITE_URL || SITE.url).replace(/\/+$/, '')

  return {
    plugins: [
      react(),
      tailwindcss(),
      seo({
        siteUrl,
        googleVerification: env.VITE_GOOGLE_SITE_VERIFICATION,
        naverVerification: env.VITE_NAVER_SITE_VERIFICATION,
        adsenseClient: env.VITE_ADSENSE_CLIENT,
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, './src'),
      },
    },
    server: {
      proxy: {
        // Binance 선물 공개 API (일부 엔드포인트 CORS 미지원 대비)
        '/binance': {
          target: 'https://fapi.binance.com',
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/binance/, ''),
        },
      },
    },
  }
})
