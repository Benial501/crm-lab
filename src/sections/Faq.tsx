import { useState } from 'react'
import { Icon } from '../components/Icon'
import { Reveal } from '../components/Reveal'
import { faq } from '../data/faq'
import './Faq.css'

function FaqRow({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false)
  const answerId = `faq-answer-${index}`

  return (
    <Reveal as="li" delay={index * 40} className="faq__item">
      <div className="faq__details">
        <button
          type="button"
          className="faq__q"
          aria-controls={answerId}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span>{question}</span>
          <Icon name="arrow" size={16} className="faq__mark" />
        </button>
        <div className="faq__panel" id={answerId} role="region" aria-label={question} hidden={!open}>
          <p className="faq__a">{answer}</p>
        </div>
      </div>
    </Reveal>
  )
}

export function Faq() {
  return (
    <section className="band faq" id="domande" aria-labelledby="domande-title">
      <div className="board">
        <div className="band-head">
          <h2 className="band-head__title" id="domande-title">
            Domande frequenti
          </h2>
          <p className="band-head__body">
            Undici risposte su progetto, pagamenti, tempi, costi e consegna.
          </p>
        </div>

        <ul className="faq__list">
          {faq.map((item, i) => (
            <FaqRow key={item.q} question={item.q} answer={item.a} index={i} />
          ))}
        </ul>
      </div>
    </section>
  )
}
