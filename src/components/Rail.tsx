import {
  Children,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from 'react'
import './Rail.css'

/* Sotto questa misura un elenco lungo smette di essere una colonna
   infinita e diventa una fila da scorrere con il pollice. Sopra, la
   pagina resta esattamente com'era. */
const RAIL_QUERY = '(max-width: 859px)'

/** Vero solo quando siamo nella larghezza in cui l'elenco diventa una fila. */
export function useIsRail() {
  const [on, setOn] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(RAIL_QUERY).matches,
  )

  useEffect(() => {
    const mq = window.matchMedia(RAIL_QUERY)
    const sync = () => setOn(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  return on
}

type RailProps = {
  children: ReactNode
  /** Tag dell'elenco: deve restare quello semantico di prima (ul, ol, div). */
  as?: ElementType
  /** Le classi che l'elenco aveva già: il desktop non cambia di una riga. */
  className?: string
  /** Come si chiama questa fila, per chi naviga con lo schermo letto. */
  label: string
  /** Fila anche da tablet e desktop, non solo su telefono. */
  desktop?: boolean
}

/**
 * Fila scorrevole, solo su schermo stretto.
 *
 * Su telefono l'elenco diventa una striscia orizzontale con l'aggancio
 * allo scorrimento, un contatore e i puntini per saltare da una scheda
 * all'altra; la scheda successiva sbuca dal bordo, così si capisce
 * subito che si scorre. Da tablet in su il componente non fa niente:
 * restituisce lo stesso elenco di prima, con le stesse classi.
 */
export function Rail({ children, as: Tag = 'div', className = '', label, desktop = false }: RailProps) {
  const isNarrow = useIsRail()
  const isRail = desktop || isNarrow
  const ref = useRef<HTMLElement | null>(null)
  const [index, setIndex] = useState(0)
  const [atEnd, setAtEnd] = useState(false)
  const count = Children.count(children)

  // Quale scheda è in mezzo allo schermo: è quella che il contatore e il
  // puntino pieno devono indicare.
  useEffect(() => {
    const el = ref.current
    if (!el || !isRail) return

    let frame = 0
    const sync = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const kids = Array.from(el.children) as HTMLElement[]
        if (!kids.length) return
        // Da desktop si vedono più schede insieme: conta quella a sinistra.
        const wide = desktop && !isNarrow
        const anchor = wide
          ? el.scrollLeft + kids[0].offsetLeft
          : el.scrollLeft + el.clientWidth / 2
        let best = 0
        let bestDistance = Infinity
        kids.forEach((kid, i) => {
          const point = wide ? kid.offsetLeft : kid.offsetLeft + kid.offsetWidth / 2
          const distance = Math.abs(point - anchor)
          if (distance < bestDistance) {
            bestDistance = distance
            best = i
          }
        })
        setIndex(best)
        setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2)
      })
    }

    sync()
    el.addEventListener('scroll', sync, { passive: true })
    window.addEventListener('resize', sync)
    return () => {
      el.removeEventListener('scroll', sync)
      window.removeEventListener('resize', sync)
      cancelAnimationFrame(frame)
    }
  }, [isRail, isNarrow, desktop, count])

  const jumpTo = useCallback((i: number) => {
    const el = ref.current
    const kid = el?.children[i] as HTMLElement | undefined
    if (!el || !kid) return
    el.scrollTo({
      left: kid.offsetLeft - (el.children[0] as HTMLElement).offsetLeft,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    })
  }, [])

  const list = (
    <Tag
      ref={ref as React.Ref<HTMLElement>}
      className={isRail ? `${className} rail${desktop ? ' rail--desktop' : ''}` : className}
      tabIndex={isRail ? 0 : undefined}
      role={isRail ? 'group' : undefined}
      aria-label={isRail ? `${label} — scorri di lato per vederle tutte` : undefined}
    >
      {children}
    </Tag>
  )

  if (!isRail || count < 2) return list

  return (
    <div className="rail-wrap">
      {list}
      <div className="rail-nav">
        <p className="rail-nav__count" aria-hidden="true">
          <b>{index + 1}</b> / {count}
        </p>
        {desktop && (
          <div className="rail-arrows">
            <button
              type="button"
              className="rail-arrow rail-arrow--prev"
              onClick={() => jumpTo(Math.max(0, index - 1))}
              disabled={index === 0}
            >
              <span className="visually-hidden">{`${label}: scheda precedente`}</span>
            </button>
            <button
              type="button"
              className="rail-arrow"
              onClick={() => jumpTo(Math.min(count - 1, index + 1))}
              disabled={atEnd}
            >
              <span className="visually-hidden">{`${label}: scheda successiva`}</span>
            </button>
          </div>
        )}
        <ul className="rail-dots">
          {Array.from({ length: count }, (_, i) => (
            <li key={i}>
              <button
                type="button"
                className={`rail-dot${i === index ? ' rail-dot--on' : ''}`}
                aria-current={i === index ? 'true' : undefined}
                onClick={() => jumpTo(i)}
              >
                <span className="visually-hidden">{`Vai a ${label}, scheda ${i + 1} di ${count}`}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
