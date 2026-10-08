import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
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
})
