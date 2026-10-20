import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

/**
 * Gestisce i link verso le sezioni della home ("/#servizi").
 * Se siamo già in home scorre senza ricaricare, altrimenti naviga
 * e porta l'ancora nello stato, dove la home la applica dopo il render.
 */
export function useSectionLink() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return useCallback(
    (href: string) => (event: React.MouseEvent) => {
      const [, hash] = href.split('#')
      if (!hash) return

      event.preventDefault()

      const scrollTo = () => {
        if (hash === 'top') {
          window.scrollTo({ top: 0, behavior: prefersReduced() ? 'auto' : 'smooth' })
          return
        }
        const target = document.getElementById(hash)
        if (!target) return
        target.scrollIntoView({ behavior: prefersReduced() ? 'auto' : 'smooth', block: 'start' })
        // Porta il focus sulla sezione per chi naviga da tastiera.
        target.setAttribute('tabindex', '-1')
        target.focus({ preventScroll: true })
      }

      if (pathname === '/') {
        scrollTo()
        window.history.replaceState(null, '', hash === 'top' ? '/' : `/#${hash}`)
      } else {
        navigate('/', { state: { scrollTo: hash } })
      }
    },
    [navigate, pathname],
  )
}

const prefersReduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
