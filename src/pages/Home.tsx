import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Hero } from '../sections/Hero'
import { Services } from '../sections/Services'
import { AutomationSection } from '../sections/AutomationSection'
import { Pricing } from '../sections/Pricing'
import { BeforeStart } from '../sections/BeforeStart'
import { Faq } from '../sections/Faq'
import { Process } from '../sections/Process'
import { Projects } from '../sections/Projects'
import { Studio } from '../sections/Studio'
import { Testimonials } from '../sections/Testimonials'
import { Contact } from '../sections/Contact'
import { useMeta } from '../hooks/useMeta'

export function Home() {
  const location = useLocation()
  // Il token fa riapplicare la scelta anche quando si riclicca la stessa voce
  // dopo aver cambiato il campo a mano.
  const [preset, setPreset] = useState<{ id: string; token: number } | null>(null)

  useMeta({
    title: 'CRM LAB — Sviluppo di siti web, e-commerce e sistemi digitali',
    description:
      'Studio di sviluppo digitale indipendente: siti web, e-commerce, automazioni AI e gestionali su misura. Tre concept dimostrativi navigabili.',
    canonical: 'https://crmlab.it/',
  })

  // Ancora richiesta da un'altra pagina: la applichiamo dopo il primo render.
  useEffect(() => {
    const target = (location.state as { scrollTo?: string } | null)?.scrollTo
    if (!target) return
    const el = document.getElementById(target)
    if (!el) return
    requestAnimationFrame(() => el.scrollIntoView({ behavior: 'auto', block: 'start' }))
    window.history.replaceState(null, '', `/#${target}`)
  }, [location.state])

  /** Porta al modulo contatti con l'argomento già scelto, da servizi o listino. */
  const askAbout = (id: string) => {
    setPreset({ id, token: Date.now() })
    const contact = document.getElementById('contatti')
    contact?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start',
    })
  }

  return (
    <>
      <Hero />
      <Projects />
      <Services onAsk={askAbout} />
      <AutomationSection />
      <Process />
      <Pricing onSelect={askAbout} />
      <BeforeStart />
      <Faq />
      <Studio />
      <Testimonials />
      <Contact preset={preset} />
    </>
  )
}
