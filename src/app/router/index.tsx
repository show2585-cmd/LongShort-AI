import { createBrowserRouter, Outlet, RouterProvider, ScrollRestoration } from 'react-router-dom'
import { NoticePopup } from '@/features/notice-popup'
import { AboutPage } from '@/pages/about'
import { HomePage } from '@/pages/home'
import { NotFoundPage } from '@/pages/not-found'
import { PrivacyPage } from '@/pages/privacy'
import { TermsPage } from '@/pages/terms'
import { Footer } from '@/widgets/footer'
import { Header } from '@/widgets/header'

function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <NoticePopup />
      <ScrollRestoration />
    </div>
  )
}

// 경로를 추가하면 vite-plugin-seo.ts 의 SITEMAP_PATHS 도 함께 갱신
const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/about', element: <AboutPage /> },
      { path: '/privacy', element: <PrivacyPage /> },
      { path: '/terms', element: <TermsPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
