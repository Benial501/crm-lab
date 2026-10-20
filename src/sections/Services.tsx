import { Icon } from '../components/Icon'
import { Rail, useIsRail } from '../components/Rail'
import { Reveal } from '../components/Reveal'
import { services } from '../data/services'
import './Services.css'

/** Un glifo per area, nello stesso tratto di quelli della prima schermata. */
const glyphs = ['code', 'bag', 'flow', 'panel'] as const

type ServicesProps = {
  /** Porta la richiesta al modulo contatti con l'area già selezionata. */
  onAsk: (topic: string) => void
}

/**
 * Le quattro aree.
 * Niente schede con icona: ogni area è una riga intera, spiegata per
 * problema risolto e per funzioni che possono entrare nel progetto.
 */
export function Services({ onAsk }: ServicesProps) {
  const isRail = useIsRail()

  return (
    <section className="band services" id="servizi" aria-labelledby="servizi-title">
      <div className="board">
        <div className="band-head">
          <h2 className="band-head__title" id="servizi-title">
            Cosa sviluppo
          </h2>
          <p className="band-head__body">
            Siti, negozi online, automazioni e strumenti interni: scelgo le funzioni in base al lavoro
            da semplificare e agli strumenti che usi già.
          </p>
        </div>

        <Rail className="services__list" label="Le quattro aree">
          {services.map((service, i) => (
            <Reveal key={service.id} delay={i * 70} className="srv">
              <div className="srv__say">
                <Icon name={glyphs[i] ?? 'code'} size={22} className="glyph srv__glyph" />
                <h3 className="srv__title">{service.title}</h3>
                <p className="srv__summary">{service.summary}</p>
                <button type="button" className="link srv__ask" onClick={() => onAsk(`area:${service.id}`)}>
                  Chiedi informazioni su quest’area
                  <Icon name="arrow" size={14} />
                </button>
              </div>

              {/* Su telefono il ragionamento lungo sta dietro una riga da
                  aprire: la scheda resta leggibile in uno schermo, e chi
                  vuole il dettaglio lo trova dov'è sempre stato. */}
              {isRail ? (
                <details className="srv__problem srv__fold">
                  <summary className="srv__fold-head">
                    Il problema di partenza, e come lo affrontiamo
                    <Icon name="arrow" size={14} className="srv__fold-mark" />
                  </summary>
                  <div className="srv__fold-body">
                    <h4 className="srv__sub">Il problema di partenza</h4>
                    <p>{service.problem}</p>
                    <h4 className="srv__sub srv__sub--spaced">Come lo affrontiamo</h4>
                    <p>{service.detail}</p>
                  </div>
                </details>
              ) : (
                <div className="srv__problem">
                  <h4 className="srv__sub">Il problema di partenza</h4>
                  <p>{service.problem}</p>
                  <h4 className="srv__sub srv__sub--spaced">Come lo affrontiamo</h4>
                  <p>{service.detail}</p>
                </div>
              )}

              <div className="srv__includes">
                <h4 className="srv__sub">Cosa può includere</h4>
                <ul>
                  {service.includes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </Rail>
      </div>
    </section>
  )
}
