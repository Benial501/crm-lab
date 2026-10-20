import { DemoChrome } from './DemoChrome'
import { useMeta } from '../hooks/useMeta'
import './legal.css'

const areas = [
  {
    title: 'Diritto societario',
    body: 'Costituzioni, patti parasociali, operazioni straordinarie e governance per PMI e gruppi familiari.',
  },
  {
    title: 'Contrattualistica d’impresa',
    body: 'Fornitura, distribuzione, agenzia e appalti: redazione, negoziazione e gestione del contenzioso.',
  },
  {
    title: 'Lavoro e organizzazione',
    body: 'Assunzioni, riorganizzazioni, contenzioso giuslavoristico e rapporti con le organizzazioni sindacali.',
  },
  {
    title: 'Proprietà intellettuale',
    body: 'Marchi, brevetti, nomi a dominio e tutela del know-how in Italia e nell’Unione europea.',
  },
]

const people = [
  { name: 'Elena Marcucci', role: 'Socio fondatore · Societario', since: 'Foro di Bologna, dal 2004' },
  { name: 'Tommaso Ferri', role: 'Socio · Contenzioso civile', since: 'Foro di Bologna, dal 2009' },
  { name: 'Sara Donati', role: 'Of counsel · Lavoro', since: 'Foro di Modena, dal 2011' },
]

const steps = [
  { title: 'Primo incontro', body: 'Un’ora per inquadrare la questione e dire se possiamo essere utili.' },
  { title: 'Preventivo scritto', body: 'Attività, tempi e compenso messi per iscritto prima di iniziare.' },
  { title: 'Gestione della pratica', body: 'Un referente unico e aggiornamenti a ogni passaggio rilevante.' },
]

export function LegalDemo() {
  useMeta({
    title: 'Marcucci & Partners — Demo CRM LAB',
    description: 'Concept di sito per uno studio legale, realizzato da CRM LAB. Dati di esempio.',
  })

  return (
    <>
      <DemoChrome name="Marcucci &amp; Partners" kind="sito per uno studio professionale" />
      <div className="demo lg">
        <header className="lg__bar">
          <span className="lg__mark">
            Marcucci <span className="lg__amp">&amp;</span> Partners
          </span>
          <nav className="lg__nav" aria-label="Navigazione dello studio">
            <a href="#aree">Aree di attività</a>
            <a href="#studio">Lo studio</a>
            <a href="#persone">Persone</a>
            <a href="#contatti">Contatti</a>
          </nav>
          <a href="#contatti" className="lg__cta">
            Fissa un primo incontro
          </a>
        </header>

        <section className="lg__hero">
          <div className="lg__hero-text">
            <h1>
              Assistenza legale continuativa per le imprese dell’Emilia.
            </h1>
            <p className="lg__lede">
              Uno studio di otto professionisti a Bologna. Seguiamo società manifatturiere, cooperative
              e studi di progettazione nel diritto societario, nei contratti e nel lavoro.
            </p>
            <div className="lg__hero-actions">
              <a href="#contatti" className="lg__cta lg__cta--big">
                Fissa un primo incontro
              </a>
              <a href="#aree" className="lg__text-link">
                Vedi le aree di attività
              </a>
            </div>
          </div>
          <dl className="lg__facts">
            <div>
              <dt>Fondato</dt>
              <dd>2004</dd>
            </div>
            <div>
              <dt>Professionisti</dt>
              <dd>8</dd>
            </div>
            <div>
              <dt>Sedi</dt>
              <dd>Bologna, Modena</dd>
            </div>
          </dl>
        </section>

        <section className="lg__areas" id="aree">
          <h2 className="lg__h2">Aree di attività</h2>
          <ul className="lg__area-list">
            {areas.map((area) => (
              <li key={area.title}>
                <h3>{area.title}</h3>
                <p>{area.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="lg__studio" id="studio">
          <h2 className="lg__h2">Come lavoriamo</h2>
          <p className="lg__statement">
            Preferiamo l’assistenza continuativa all’intervento d’emergenza: conoscere l’azienda prima
            che il problema si presenti è quasi sempre la parte più utile del nostro lavoro.
          </p>
          <ol className="lg__steps">
            {steps.map((step) => (
              <li key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="lg__people" id="persone">
          <h2 className="lg__h2">Persone</h2>
          <ul className="lg__people-list">
            {people.map((person) => (
              <li key={person.name}>
                <span className="lg__initials" aria-hidden="true">
                  {person.name
                    .split(' ')
                    .map((part) => part[0])
                    .join('')}
                </span>
                <h3>{person.name}</h3>
                <p className="lg__role">{person.role}</p>
                <p className="lg__since">{person.since}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="lg__contact" id="contatti">
          <div>
            <h2 className="lg__h2 lg__h2--light">Parliamone</h2>
            <p className="lg__contact-text">
              Il primo incontro serve a capire se la questione rientra in quello che sappiamo fare.
              Dura un’ora e non è a pagamento.
            </p>
          </div>
          <address className="lg__address">
            <p>Via dell’Indipendenza 00, Bologna</p>
            <p>studio@esempio-marcucci.it</p>
            <p>+39 051 000 0000</p>
            <p className="lg__hours">Lunedì – venerdì, 9:00 – 18:30</p>
          </address>
        </section>

        <footer className="lg__foot">
          <p>Marcucci &amp; Partners — concept dimostrativo CRM LAB</p>
          <p>Nomi, recapiti e dati sono di esempio.</p>
        </footer>
      </div>
    </>
  )
}
