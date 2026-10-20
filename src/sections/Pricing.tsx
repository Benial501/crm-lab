import { Icon } from '../components/Icon'
import { Rail } from '../components/Rail'
import { Reveal } from '../components/Reveal'
import { currency, pricingNote, priceGroups } from '../data/pricing'
import './Pricing.css'

type PricingProps = {
  /** Porta la richiesta al modulo contatti con il pacchetto già selezionato. */
  onSelect: (id: string) => void
}

/** Un elenco della scheda: compreso, escluso, o da cosa dipende la cifra. */
function PlanList({
  title,
  items,
  tone,
}: {
  title: string
  items: string[]
  tone: 'in' | 'out'
}) {
  if (items.length === 0) return null
  return (
    <div className={`plan__set plan__set--${tone}`}>
      <h5 className="plan__set-title">{title}</h5>
      <ul className="plan__includes">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

export function Pricing({ onSelect }: PricingProps) {
  return (
    <section className="band on-light pricing" id="prezzi" aria-labelledby="prezzi-title">
      <div className="board">
        <div className="band-head">
          <h2 className="band-head__title" id="prezzi-title">
            Da dove si parte
          </h2>
          <p className="band-head__body">
            Ogni voce dice che cosa comprende e che cosa no. Dove il perimetro cambia troppo da
            un’attività all’altra indico «su preventivo» invece di inventare una cifra.
          </p>
        </div>

        {/* La nota sta qui, prima dei prezzi: è la condizione per leggerli. */}
        <p className="pricing__note pricing__note--lead">{pricingNote}</p>

        {priceGroups.map((group) => (
          <section className="family" key={group.id} aria-labelledby={`listino-${group.id}`}>
            <div className="family__head">
              <h3 className="family__title" id={`listino-${group.id}`}>
                {group.title}
              </h3>
              <p className="family__body">{group.body}</p>
            </div>

            <Rail as="ul" className="family__grid" label={group.title}>
              {group.items.map((item, i) => (
                <Reveal as="li" key={item.id} delay={i * 60} className="plan">
                  <h4 className="plan__title">{item.title}</h4>
                  <p className="plan__price">
                    <span
                      className={`plan__price-value${item.kind === 'from' ? '' : ' plan__price-value--quote'}`}
                    >
                      {item.kind === 'from' && item.amount !== undefined
                        ? currency.format(item.amount)
                        : 'Su preventivo'}
                    </span>
                    <span className="plan__price-label">
                      {item.kind === 'from'
                        ? 'prezzo di partenza per la realizzazione, una tantum'
                        : 'la cifra arriva dopo l’analisi, non prima'}
                    </span>
                  </p>
                  <p className="plan__desc">{item.description}</p>

                  <div className="plan__sets">
                    <PlanList title="Include" items={item.includes} tone="in" />
                    {item.dependsOn && (
                      <PlanList title="Il prezzo dipende da" items={item.dependsOn} tone="in" />
                    )}
                    <PlanList title="Non include" items={item.excludes} tone="out" />
                  </div>

                  <button type="button" className="btn btn--ghost plan__action" onClick={() => onSelect(item.id)}>
                    Chiedi un preventivo
                    <Icon name="arrow" size={16} className="btn__arrow" />
                  </button>
                </Reveal>
              ))}
            </Rail>
          </section>
        ))}
      </div>
    </section>
  )
}
