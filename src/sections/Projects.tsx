import { Link } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { Picture } from '../components/Picture'
import { Rail } from '../components/Rail'
import { VideoFigure } from '../components/VideoFigure'
import { Reveal } from '../components/Reveal'
import { projects } from '../data/projects'
import './Projects.css'

/**
 * I progetti.
 * Una schermata vera per progetto, grande abbastanza da leggersi —
 * o, dove c'è, il video di presentazione al posto dell'immagine. Sotto,
 * quello che serve per decidere se aprirlo: tipo, nome, a chi serve.
 * Da qui partono due strade distinte: il progetto e la sua scheda.
 */
export function Projects() {
  return (
    <section className="band band--plain projects" id="progetti" aria-labelledby="progetti-title">
      <div className="board">
        <div className="band-head">
          <h2 className="band-head__title" id="progetti-title">
            Progetti
          </h2>
          <p className="band-head__body">
            I progetti visualizzati sono progetti realizzati da CRM LAB.
          </p>
        </div>

        <Rail className="projects__list" label="I progetti dello studio" desktop>
          {projects.map((project, i) => {
            const main = project.shots[0]
            const phone = project.shots.find((s) => s.ratio === '9/19')
            const isConcept = project.kind === 'concept'

            return (
              <Reveal key={project.slug} delay={i * 80} className="work">
                {project.video ? (
                  <VideoFigure
                    video={project.video}
                    sizes="(min-width: 1100px) 1040px, 94vw"
                    priority={i === 0}
                    className="work__main"
                  />
                ) : (
                  <figure className="work__main">
                    <Picture
                      base={main.base}
                      widths={main.widths}
                      alt={main.alt}
                      sizes="(min-width: 1100px) 1040px, 94vw"
                      className="work__main-img"
                    />
                  </figure>
                )}

                <div className="work__body">
                  <div className="work__say">
                    <p className="work__tags">
                      <span className="work__category">{project.category}</span>
                      <span className="work__badge">
                        {isConcept ? 'Concept dimostrativo' : 'Applicazione dello studio'}
                      </span>
                    </p>
                    <h3 className="work__title">{project.brand}</h3>
                    <p className="t-small work__kind">{project.title}</p>
                    <p className="work__blurb">{project.blurb}</p>

                    {/* L'azione principale porta sempre alla scheda: è lì che
                        il progetto è raccontato per intero. Aprirlo davvero —
                        la demo, o il sito pubblico — è il passo dopo. */}
                    <p className="work__actions">
                      <Link to={`/progetti/${project.slug}`} className="btn work__open">
                        Vedi progetto
                        <Icon name="arrow" size={16} className="btn__arrow" />
                      </Link>
                      {!project.action ? null : project.action.external ? (
                        <a
                          href={project.action.href}
                          className="link"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {project.action.label}
                          <Icon name="arrow" size={14} />
                        </a>
                      ) : (
                        <Link to={project.action.href} className="link">
                          {project.action.label}
                          <Icon name="arrow" size={14} />
                        </Link>
                      )}
                    </p>
                  </div>

                  {phone && (
                    <figure className="work__phone">
                      <Picture
                        base={phone.base}
                        widths={phone.widths}
                        alt={phone.alt}
                        sizes="200px"
                        className="work__phone-img"
                      />
                      <figcaption className="t-small">Lo stesso progetto su telefono</figcaption>
                    </figure>
                  )}
                </div>
              </Reveal>
            )
          })}
        </Rail>
      </div>
    </section>
  )
}
