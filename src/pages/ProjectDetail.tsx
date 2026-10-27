import { Link, Navigate, useParams } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { Picture } from '../components/Picture'
import { Reveal } from '../components/Reveal'
import { VideoFigure } from '../components/VideoFigure'
import { getProject, projects } from '../data/projects'
import { useMeta } from '../hooks/useMeta'
import { useSectionLink } from '../hooks/useSectionLink'
import './ProjectDetail.css'

export function ProjectDetail() {
  const { slug } = useParams()
  const project = getProject(slug)
  const goToSection = useSectionLink()

  useMeta({
    title: project
      ? `${project.brand} — ${project.title} | CRM LAB`
      : 'Progetto non trovato — CRM LAB',
    description: project?.blurb ?? 'Il progetto cercato non esiste.',
    canonical: project ? `https://crmlab.it/progetti/${project.slug}` : undefined,
  })

  if (!project) return <Navigate to="/404" replace />

  const others = projects.filter((p) => p.slug !== project.slug)
  const wide = project.shots.filter((s) => s.ratio !== '9/19')
  const phone = project.shots.find((s) => s.ratio === '9/19')
  // Senza demo né indirizzo pubblico il progetto si vede nel video: il
  // passo successivo, allora, è chiederne uno uguale.
  const status = !project.action
    ? 'Mostrato nel video di presentazione'
    : project.action.external
      ? 'Online al suo indirizzo'
      : 'Navigabile su questo sito'

  return (
    <article className="case band">
      <div className="board">
        <nav className="case__crumbs t-small" aria-label="Percorso">
          <Link to="/">Home</Link>
          <span aria-hidden="true">/</span>
          <a href="/#progetti" onClick={goToSection('/#progetti')}>
            Progetti
          </a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{project.title}</span>
        </nav>

        <div className="case__head">
          <div className="case__say">
            <h1 className="case__title">{project.title}</h1>
            {project.kind === 'concept' && (
              <p className="case__label">Concept dimostrativo</p>
            )}
            <p className="t-lead case__intro">{project.blurb}</p>
            <p className="case__actions">
              {!project.action ? (
                <a href="/#contatti" className="btn" onClick={goToSection('/#contatti')}>
                  Richiedi un sito simile
                  <Icon name="arrow" size={16} className="btn__arrow" />
                </a>
              ) : project.action.external ? (
                <a
                  href={project.action.href}
                  className="btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project.action.label}
                  <Icon name="arrow" size={16} className="btn__arrow" />
                </a>
              ) : (
                <Link to={project.action.href} className="btn">
                  {project.action.label}
                  <Icon name="arrow" size={16} className="btn__arrow" />
                </Link>
              )}
            </p>
          </div>

          {project.video ? (
            <VideoFigure
              video={project.video}
              sizes="(min-width: 1100px) 55vw, 100vw"
              priority
              caption="Video di presentazione del progetto: parte al clic, con audio e controlli."
              className="case__figure case__figure--video"
            />
          ) : (
            <figure className="case__figure">
              <Picture
                base={wide[0].base}
                widths={wide[0].widths}
                alt={wide[0].alt}
                sizes="(min-width: 1100px) 55vw, 100vw"
                loading="eager"
                fetchPriority="high"
                className="case__img"
              />
              <figcaption className="t-small">
                Schermata reale della demo: è la stessa pagina che si apre dal pulsante qui accanto.
              </figcaption>
            </figure>
          )}

          <dl className="case__meta">
            <div>
              <dt>Prodotto</dt>
              <dd>{project.brand}</dd>
            </div>
            <div>
              <dt>Tipo di progetto</dt>
              <dd>{project.category}</dd>
            </div>
            <div>
              <dt>Natura del lavoro</dt>
              <dd>
                {project.kind === 'concept'
                  ? 'Concept dimostrativo, non commissionato'
                  : 'Prodotto realizzato dallo studio'}
              </dd>
            </div>
            <div>
              <dt>Stato</dt>
              <dd>{status}</dd>
            </div>
          </dl>
        </div>

        <div className="case__body">
          <Reveal className="case__block">
            <h2 className="case__h2">A chi si rivolge</h2>
            <p>{project.audience}</p>
          </Reveal>

          <Reveal className="case__block" delay={60}>
            <h2 className="case__h2">L’esigenza</h2>
            <p>{project.need}</p>
          </Reveal>

          <Reveal className="case__block" delay={120}>
            <h2 className="case__h2">La soluzione mostrata</h2>
            <p>{project.solution}</p>
          </Reveal>
        </div>

        <div className={phone ? 'case__screens' : 'case__screens case__screens--even'}>
          {(project.video ? wide : wide.slice(1)).map((shot) => (
            <Reveal key={shot.base} as="figure" className="case__screen">
              <Picture
                base={shot.base}
                widths={shot.widths}
                alt={shot.alt}
                sizes="(min-width: 900px) 48vw, 100vw"
                className="case__img"
              />
              <figcaption className="t-small">{shot.alt}</figcaption>
            </Reveal>
          ))}
          {phone && (
            <Reveal as="figure" className="case__screen case__screen--phone" delay={80}>
              <Picture
                base={phone.base}
                widths={phone.widths}
                alt={phone.alt}
                sizes="(min-width: 900px) 24vw, 60vw"
                className="case__img"
              />
              <figcaption className="t-small">{phone.alt}</figcaption>
            </Reveal>
          )}
        </div>

        <div className="case__columns">
          <Reveal as="section">
            <h2 className="case__h2">
              {project.kind === 'prodotto'
                ? 'Funzionalità'
                : project.action
                  ? 'Cosa puoi provare nella demo'
                  : 'Cosa fa il sito'}
            </h2>
            <ul className="case__list">
              {project.canTry.map((item) => (
                <li key={item}>
                  <Icon name="check" size={14} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal as="section" delay={80}>
            <h2 className="case__h2">
              {project.kind === 'concept'
                ? 'Cosa serve per utilizzarlo nella tua attività'
                : 'Architettura e scelte tecniche'}
            </h2>
            <ul className="case__list case__list--open">
              {project.toUse.map((item) => (
                <li key={item}>
                  <Icon name="arrow" size={14} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="case__cta">
          <p className="t-lead case__cta-text">Hai un progetto simile da realizzare?</p>
          <a href="/#contatti" className="btn" onClick={goToSection('/#contatti')}>
            Raccontami il tuo progetto
            <Icon name="arrow" size={16} className="btn__arrow" />
          </a>
        </div>

        <section className="case__next" aria-labelledby="altri-progetti">
          <h2 className="case__h2" id="altri-progetti">
            Altri progetti
          </h2>
          <ul>
            {others.map((other) => (
              <li key={other.slug}>
                <Link to={`/progetti/${other.slug}`}>
                  <Picture
                    base={other.shots[0].base}
                    widths={other.shots[0].widths}
                    alt={other.shots[0].alt}
                    sizes="(min-width: 760px) 44vw, 92vw"
                    // Un fotogramma da video è più largo della miniatura: si
                    // taglia a destra, così logo e titolo del sito restano interi.
                    position={other.shots[0].ratio === '48/25' ? 'left top' : undefined}
                    className="case__next-img"
                  />
                  <span className="case__next-text">
                    <span className="case__next-title">{other.title}</span>
                    <span className="case__next-kind t-small">{other.category}</span>
                  </span>
                  <Icon name="arrow" size={18} />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  )
}
