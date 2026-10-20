import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Icon } from './Icon'
import { Logo } from './Logo'
import { Channels } from './Channels'
import { navigation } from '../data/site'
import { useSectionLink } from '../hooks/useSectionLink'
import './Header.css'

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeId, setActiveId] = useState<string>('')
  const panelRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const { pathname } = useLocation()
  const goToSection = useSectionLink()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Evidenzia la voce di menu della sezione in vista.
  useEffect(() => {
    if (pathname !== '/') {
      setActiveId('')
      return
    }
    const ids = navigation.map((item) => item.href.split('#')[1])
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))

    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActiveId(visible.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.2, 0.6] },
    )

    sections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [pathname])

  // Allargando la finestra il pulsante del menu sparisce: se il pannello
  // restasse aperto coprirebbe la pagina senza più un modo per chiuderlo.
  useEffect(() => {
    if (!open) return
    const wide = window.matchMedia('(min-width: 1080px)')
    const close = () => {
      if (wide.matches) setOpen(false)
    }
    close()
    wide.addEventListener('change', close)
    return () => wide.removeEventListener('change', close)
  }, [open])

  // Chiude il menu mobile con Esc e blocca lo scroll mentre è aperto.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  const handleNav = (href: string) => (event: React.MouseEvent) => {
    setOpen(false)
    goToSection(href)(event)
  }

  return (
    <>
      <header className={`header${scrolled || open ? ' header--solid' : ''}`}>
      <div className="header__inner board">
        <Link to="/" className="header__logo" onClick={handleNav('/#top')} aria-label="CRM LAB, vai alla home">
          <Logo />
        </Link>

        <nav className="header__nav" aria-label="Navigazione principale">
          <ul>
            <li>
              <a
                href="/#top"
                onClick={handleNav('/#top')}
                aria-current={pathname === '/' && !activeId ? 'page' : undefined}
              >
                Home
              </a>
            </li>
            {navigation.map((item) => {
              const id = item.href.split('#')[1]
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={handleNav(item.href)}
                    aria-current={activeId === id ? 'true' : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <a href="/#contatti" className="btn header__cta" onClick={handleNav('/#contatti')}>
          Contattami
        </a>

        <button
          ref={toggleRef}
          type="button"
          className="header__toggle"
          aria-expanded={open}
          aria-controls="menu-mobile"
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? 'close' : 'menu'} size={22} />
          <span className="visually-hidden">{open ? 'Chiudi il menu' : 'Apri il menu'}</span>
        </button>
        </div>
      </header>

      <div
        id="menu-mobile"
        ref={panelRef}
        className={`menu${open ? ' menu--open' : ''}`}
        hidden={!open}
      >
        <nav className="menu__inner board" aria-label="Navigazione mobile">
          <ul className="menu__list">
            <li>
              <a href="/#top" onClick={handleNav('/#top')}>
                Home
              </a>
            </li>
            {navigation.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={handleNav(item.href)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="menu__foot">
            <a href="/#contatti" className="btn menu__cta" onClick={handleNav('/#contatti')}>
              Raccontami il tuo progetto
              <Icon name="arrow" size={16} className="btn__arrow" />
            </a>
            <Channels className="menu__channels" configuredOnly />
          </div>
        </nav>
      </div>
    </>
  )
}
