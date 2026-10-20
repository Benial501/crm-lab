import { useEffect, useRef, type ElementType, type ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  /** Ritardo in ms, per scandire l'ingresso di un gruppo di elementi. */
  delay?: number
  as?: ElementType
  className?: string
}

/**
 * Ingresso sobrio allo scroll: una sola transizione, una volta sola.
 * Con prefers-reduced-motion il contenuto è già visibile (vedi base.css).
 */
export function Reveal({ children, delay = 0, as: Tag = 'div', className }: RevealProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.dataset.reveal = 'in'
      return
    }

    const show = () => {
      el.dataset.reveal = 'in'
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            ;(entry.target as HTMLElement).dataset.reveal = 'in'
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0 },
    )

    observer.observe(el)

    // Rete di sicurezza: se per qualunque motivo l'osservatore non scatta
    // — scorrimento rapidissimo, cattura a pagina intera, scheda in secondo
    // piano — il contenuto compare lo stesso. Invisibile non è un'opzione.
    const failsafe = window.setTimeout(show, 2500)

    return () => {
      observer.disconnect()
      window.clearTimeout(failsafe)
    }
  }, [])

  return (
    <Tag
      ref={ref}
      data-reveal=""
      className={className}
      style={delay ? ({ '--reveal-delay': `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  )
}
