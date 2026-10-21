import { Icon } from '../components/Icon'
import { useSectionLink } from '../hooks/useSectionLink'
import { HeroVisual } from './HeroVisual'
import './Hero.css'

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
              {/* Solo su mobile: su desktop i prezzi sono già nella navigazione */}
              <a
                href="/#prezzi"
                className="btn btn--ghost hero__prices"
                onClick={goToSection('/#prezzi')}
              >
                Visualizza prezzi
                <Icon name="arrow" size={15} className="btn__arrow" />
              </a>
            </div>
          </div>

          <div className="hero__media">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  )
}
