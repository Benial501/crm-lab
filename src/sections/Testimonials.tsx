import { Reveal } from '../components/Reveal'
import { testimonials } from '../data/testimonials'
import './Testimonials.css'

/**
 * Sezione testimonianze.
 * Finché `testimonials.ts` è vuoto non viene renderizzata nulla: i principi
 * di lavoro vivono ora dentro «Chi siamo», e questa sezione compare da sola
 * appena c'è almeno una voce reale e autorizzata.
 */
export function Testimonials() {
  if (testimonials.length === 0) return null

  return (
    <section className="band principles" id="dicono" aria-labelledby="dicono-title">
      <div className="board">
        <div className="band-head">
          <h2 className="band-head__title" id="dicono-title">
            Dicono di noi
          </h2>
        </div>
        <ul className="principles__list">
          {testimonials.map((t, i) => (
            <Reveal as="li" key={t.author} delay={i * 80} className="principle">
              <blockquote className="principle__body">“{t.quote}”</blockquote>
              <p className="principle__title">{t.author}</p>
              <p className="principle__role">{t.role}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
