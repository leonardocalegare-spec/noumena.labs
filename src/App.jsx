import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'

const HomePage = lazy(() => import('./pages/HomePage.jsx'))
const CadernosPage = lazy(() => import('./pages/CadernosPage.jsx'))
const CadernoPage = lazy(() => import('./pages/CadernoPage.jsx'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx'))

const basePath = import.meta.env.BASE_URL.replace(/\/$/, '') || '/'

export default function App() {
  return (
    <BrowserRouter basename={basePath}>
      <Suspense fallback={<div className="route-loading" role="status">Carregando experiência…</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cadernos" element={<CadernosPage />} />
          <Route path="/cadernos/:slug" element={<CadernoPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
