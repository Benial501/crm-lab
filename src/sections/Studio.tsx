import { Reveal } from '../components/Reveal'
import { principles } from '../data/principles'
import './Studio.css'

/**
 * Chi siamo.
 * Nessuna fotografia: lo studio non ne ha di proprie e non ne mettiamo
 * di repertorio per far finta. Al loro posto una campitura piena e i
 * quattro principi, che dicono più di una foto di scrivania.
 */
export function Studio() {
  return (
    <section className="band studio" id="studio" aria-labelledby="studio-title">
      <div className="board studio__grid">
        <div className="studio__say">
          <h2 className="studio__title" id="studio-title">
            Uno studio piccolo, per scelta
          </h2>
          <p className="t-lead studio__text">
            CRM LAB è uno studio di sviluppo digitale indipendente. Seguo pochi progetti alla volta
            per capire come funziona l’attività prima di progettare e sviluppare.
          </p>
          <p className="studio__text">
            Parli direttamente con me dall’analisi alla consegna. Se i tempi non consentono di seguire
            un nuovo progetto, te lo dico prima di iniziare.
          </p>
        </div>

        <dl className="studio__facts">
          {principles.map((principle, i) => (
            <Reveal key={principle.title} delay={i * 70} className="studio__fact">
              <dt>{principle.title}</dt>
              <dd>{principle.body}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}
