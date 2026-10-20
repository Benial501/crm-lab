import { Reveal } from '../components/Reveal'
import { assurances } from '../data/assurances'
import './BeforeStart.css'

/**
 * «Prima di iniziare».
 * Sta subito sotto al listino perché risponde alla domanda che nasce
 * leggendo un prezzo: come si lavora, cosa è scritto dove. Non ripete
 * il metodo: dice soltanto le condizioni del rapporto.
 */
export function BeforeStart() {
  return (
    <section className="band before" id="prima-di-iniziare" aria-labelledby="prima-title">
      <div className="board before__grid">
        <div className="before__head">
          <h2 className="before__title" id="prima-title">
            Prima di iniziare
          </h2>
          <p className="before__body">
            Come si imposta il lavoro, prima che cominci. Il dettaglio di ogni progetto resta nel
            preventivo: qui c’è il modo in cui si arriva a scriverlo.
          </p>
        </div>

        <dl className="before__list">
          {assurances.map((item, i) => (
            <Reveal key={item.title} delay={i * 60} className="before__item">
              <dt>{item.title}</dt>
              <dd>{item.body}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}
