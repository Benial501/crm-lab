import { useEffect, useId, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { Channels } from '../components/Channels'
import { configuredChannels, legal, site } from '../data/site'
import { pricing } from '../data/pricing'
import { services } from '../data/services'
import './Contact.css'

type Status = 'idle' | 'sending' | 'sent' | 'error' | 'unconfigured'
type Fields = { name: string; email: string; topic: string; message: string }
type Errors = Partial<Record<keyof Fields, string>>

const empty: Fields = { name: '', email: '', topic: '', message: '' }

const validate = (values: Fields): Errors => {
  const errors: Errors = {}
  if (values.name.trim().length < 2) errors.name = 'Scrivi il tuo nome.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
    errors.email = 'Controlla l’indirizzo email: manca qualcosa.'
  if (values.message.trim().length < 20)
    errors.message = 'Raccontami qualcosa in più: almeno 20 caratteri.'
  return errors
}

type ContactProps = {
  /** Pacchetto scelto dal listino: precompila il campo "Di cosa hai bisogno". */
  preset?: { id: string; token: number } | null
}

export function Contact({ preset }: ContactProps) {
  const [values, setValues] = useState<Fields>(empty)
  const [errors, setErrors] = useState<Errors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({})
  const [status, setStatus] = useState<Status>('idle')
  const formRef = useRef<HTMLFormElement>(null)
  const uid = useId()
  const hasChannels = configuredChannels().length > 0 || Boolean(site.phone)
  /**
   * Il modulo invia solo quando ci sono entrambe le condizioni: un servizio
   * di invio collegato e l'informativa privacy pubblicata. Senza l'una o
   * senza l'altra non si raccolgono dati e non si finge di averli raccolti.
   */
  const isConfigured = Boolean(site.contactEndpoint) && Boolean(legal.privacy)

  useEffect(() => {
    if (preset) setValues((v) => ({ ...v, topic: preset.id }))
  }, [preset])

  const field = (key: keyof Fields) => `${uid}-${key}`
  const errorId = (key: keyof Fields) => `${uid}-${key}-error`

  const update = (key: keyof Fields, value: string) => {
    const next = { ...values, [key]: value }
    setValues(next)
    if (touched[key]) setErrors(validate(next))
    if (status === 'error' || status === 'unconfigured') setStatus('idle')
  }

  const blur = (key: keyof Fields) => () => {
    setTouched((t) => ({ ...t, [key]: true }))
    setErrors(validate(values))
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // Campo trappola: se è pieno la richiesta arriva da un bot.
    if ((new FormData(event.currentTarget).get('website') as string)?.length) return

    const found = validate(values)
    setErrors(found)
    setTouched({ name: true, email: true, message: true })

    if (Object.keys(found).length > 0) {
      // Il focus va sul primo campo in errore seguendo l'ordine del modulo,
      // non lo stato del DOM che React non ha ancora aggiornato.
      const order: (keyof Fields)[] = ['name', 'email', 'message']
      const firstKey = order.find((key) => found[key])
      if (firstKey) {
        formRef.current?.querySelector<HTMLElement>(`[name="${firstKey}"]`)?.focus()
      }
      return
    }

    if (!isConfigured) {
      // Nessun servizio di invio collegato: non fingiamo che il messaggio sia partito.
      setStatus('unconfigured')
      return
    }

    setStatus('sending')
    try {
      const response = await fetch(site.contactEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...values, source: 'crmlab.it', sentAt: new Date().toISOString() }),
      })
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      setStatus('sent')
      setValues(empty)
      setTouched({})
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="band contact" id="contatti" aria-labelledby="contatti-title">
      <div className="board contact__grid">
        <div className="contact__intro">
          <h2 className="contact__title" id="contatti-title">
            Raccontami cosa ti serve
          </h2>
          <p className="t-lead contact__lede">
            Raccontami cosa vuoi realizzare. Ti rispondo per chiarire le esigenze e, se il progetto
            è adatto, preparare una proposta con attività, tempi e costi.
          </p>

          <ul className="contact__points">
            <li>
              <span className="contact__point-title">Prima valutazione gratuita</span>
              <span className="contact__point-body">Valutiamo insieme se il progetto fa al caso mio.</span>
            </li>
            <li>
              <span className="contact__point-title">Risposta diretta</span>
              <span className="contact__point-body">Ti rispondo direttamente.</span>
            </li>
            <li>
              <span className="contact__point-title">Nessun vincolo</span>
              <span className="contact__point-body">La proposta è scritta e la valuti con calma.</span>
            </li>
          </ul>

          {hasChannels && (
            <div className="contact__direct">
              <p className="contact__direct-title">Oppure scrivimi dove preferisci</p>
              <Channels variant="list" configuredOnly />
              {site.phone && (
                <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="link contact__phone">
                  {site.phone}
                </a>
              )}
            </div>
          )}
        </div>

        <form className="form" onSubmit={onSubmit} noValidate ref={formRef}>
          {!isConfigured && (
            <p className="form__notice">
              <strong>Il modulo non è ancora attivo.</strong> Le richieste non vengono inviate. Per
              evitare di lasciare i tuoi dati qui, attendo che il servizio di invio e l’informativa
              siano pronti.
            </p>
          )}

          <fieldset className="form__fields" disabled={!isConfigured}>
          <div className="form__row">
            <label htmlFor={field('name')}>Nome e cognome</label>
            <input
              id={field('name')}
              name="name"
              type="text"
              autoComplete="name"
              value={values.name}
              onChange={(e) => update('name', e.target.value)}
              onBlur={blur('name')}
              aria-invalid={Boolean(errors.name && touched.name)}
              aria-describedby={errors.name && touched.name ? errorId('name') : undefined}
              required
            />
            {errors.name && touched.name && (
              <p className="form__error" id={errorId('name')}>
                {errors.name}
              </p>
            )}
          </div>

          <div className="form__row">
            <label htmlFor={field('email')}>Email</label>
            <input
              id={field('email')}
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              value={values.email}
              onChange={(e) => update('email', e.target.value)}
              onBlur={blur('email')}
              aria-invalid={Boolean(errors.email && touched.email)}
              aria-describedby={errors.email && touched.email ? errorId('email') : undefined}
              required
            />
            {errors.email && touched.email && (
              <p className="form__error" id={errorId('email')}>
                {errors.email}
              </p>
            )}
          </div>

          <div className="form__row">
            <label htmlFor={field('topic')}>
              Di cosa hai bisogno <span className="form__optional">(facoltativo)</span>
            </label>
            <select
              id={field('topic')}
              name="topic"
              value={values.topic}
              onChange={(e) => update('topic', e.target.value)}
            >
              <option value="">Non lo so ancora, da chiarire insieme</option>
              <optgroup label="Area di lavoro">
                {services.map((service) => (
                  <option key={service.id} value={`area:${service.id}`}>
                    {service.title}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Voci del listino">
                {pricing.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.title}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>

          <div className="form__row">
            <label htmlFor={field('message')}>Il tuo progetto</label>
            <textarea
              id={field('message')}
              name="message"
              rows={5}
              value={values.message}
              onChange={(e) => update('message', e.target.value)}
              onBlur={blur('message')}
              placeholder="Che cosa vorresti ottenere e cosa usi oggi per farlo?"
              aria-invalid={Boolean(errors.message && touched.message)}
              aria-describedby={errors.message && touched.message ? errorId('message') : undefined}
              required
            />
            {errors.message && touched.message && (
              <p className="form__error" id={errorId('message')}>
                {errors.message}
              </p>
            )}
          </div>
          </fieldset>

          {/* Uso dei dati: una dichiarazione, non una casella da spuntare.
              Un consenso generico obbligatorio non sostituisce l'informativa:
              il collegamento compare solo quando la pagina è completa. */}
          <p className="form__use">
            I dati che scrivi qui servono solo a risponderti su questa richiesta: niente
            newsletter, niente cessione a terzi.{' '}
            {legal.privacy ? (
              <Link to={legal.privacy} className="link">
                Informativa privacy
              </Link>
            ) : (
              <span className="form__use-note">
                L’informativa privacy è in preparazione: finché non è pubblicata, questo modulo non
                è attivo.
              </span>
            )}
          </p>

          {/* Campo trappola per i bot: nascosto alle persone e ai lettori di schermo. */}
          <div className="form__honeypot" aria-hidden="true">
            <label htmlFor={`${uid}-website`}>Non compilare questo campo</label>
            <input id={`${uid}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <button
            type="submit"
            className="btn form__submit"
            disabled={!isConfigured || status === 'sending'}
          >
            {status === 'sending'
              ? 'Invio in corso…'
              : isConfigured
                ? 'Invia la richiesta'
                : 'Invio non attivo'}
            <Icon name="arrow" size={15} className="btn__arrow" />
          </button>

          <div className="form__status" role="status" aria-live="polite">
            {status === 'sent' && (
              <p className="form__feedback form__feedback--ok">
                Richiesta inviata. Ti rispondo appena possibile.
              </p>
            )}
            {status === 'error' && (
              <p className="form__feedback form__feedback--ko">
                Invio non riuscito. Riprova tra poco: se il problema continua, il servizio di invio non
                sta rispondendo.
              </p>
            )}
            {status === 'unconfigured' && (
              <p className="form__feedback form__feedback--ko">
                Il messaggio <strong>non è stato inviato</strong>: il modulo non è ancora attivo.
                Quello che hai scritto è rimasto solo su questo dispositivo.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}
