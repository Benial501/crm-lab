import { useEffect } from 'react'
import { Outlet, Route, Routes, useLocation } from 'react-router-dom'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'
import { ProjectDetail } from './pages/ProjectDetail'
import { Privacy } from './pages/Privacy'
import { NotFound } from './pages/NotFound'

/** Al cambio pagina si riparte dall'alto, salvo quando si punta a una sezione. */
function ScrollToTop() {
  const { pathname, state } = useLocation()

  useEffect(() => {
    if ((state as { scrollTo?: string } | null)?.scrollTo) return
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname, state])

  return null
}

/** Il sito vero e proprio: intestazione, contenuto, piè di pagina. */
function SiteLayout() {
  return (
    <>
      <a className="skip-link" href="#main">
        Vai al contenuto
      </a>
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/progetti/:slug" element={<ProjectDetail />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}
