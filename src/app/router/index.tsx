import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import { NoticePopup } from '@/features/notice-popup'
import { HomePage } from '@/pages/home'
import { NotFoundPage } from '@/pages/not-found'
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
    </div>
  )
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
