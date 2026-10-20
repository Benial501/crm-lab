import { Icon } from '../components/Icon'
import { useSectionLink } from '../hooks/useSectionLink'
import { HeroVisual } from './HeroVisual'
import './Hero.css'

/**
 * Le quattro aree, dichiarate subito sotto la prima schermata.
 * Restano ferme e brevi: servono a dire cosa facciamo in una riga
 * ciascuna, non a raccontare il servizio — quello sta in «Servizi».
 */
const areas = [
  { id: 'siti-web', icon: 'code', title: 'Sviluppo web', body: 'Siti aziendali e landing page che portano richieste.' },
  { id: 'ecommerce', icon: 'bag', title: 'E-commerce', body: 'Negozi online costruiti sul catalogo reale.' },
  { id: 'automazioni-ai', icon: 'flow', title: 'Automazioni AI', body: 'Processi ripetitivi tolti di mezzo, con controllo umano.' },
  { id: 'sistemi-digitali', icon: 'panel', title: 'Sistemi su misura', body: 'Dashboard e gestionali sui dati che hai già.' },
] as const

export function Hero() {
  const goToSection = useSectionLink()

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero__glow" aria-hidden="true" />

      <div className="board hero__inner">
        <div className="hero__top">
          <div className="hero__say">
            <h1 className="t-display hero__title" id="hero-title">
              Siti, software e automazioni su misura.
            </h1>
            <p className="t-lead hero__lede">
              Realizzo siti web, e-commerce, applicazioni e automazioni su misura. Definisco funzioni
              e costi insieme a te.
            </p>
            <div className="hero__actions">
              <a href="/#contatti" className="btn" onClick={goToSection('/#contatti')}>
                Raccontami il tuo progetto
                <Icon name="arrow" size={15} className="btn__arrow" />
              </a>
              <a href="/#progetti" className="btn btn--ghost" onClick={goToSection('/#progetti')}>
                Vedi i progetti
                <Icon name="arrow" size={15} className="btn__arrow" />
              </a>
            </div>
          </div>

          <div className="hero__media">
            <HeroVisual />
          </div>
        </div>

        <ul className="hero__areas">
          {areas.map((area) => (
            <li key={area.id}>
              <a href="/#servizi" className="area" onClick={goToSection('/#servizi')}>
                <Icon name={area.icon} size={22} className="glyph area__glyph" />
                <span className="area__title">{area.title}</span>
                <span className="area__body">{area.body}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
