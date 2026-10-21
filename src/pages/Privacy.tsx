import { Link } from 'react-router-dom'
import { owner, canPublishPrivacy, site } from '../data/site'
import { useMeta } from '../hooks/useMeta'
import { useSectionLink } from '../hooks/useSectionLink'
import './Privacy.css'

/**
 * Informativa privacy.
 *
 * È scritta su quello che il sito fa davvero, non su un modello: il
 * modulo contatti è l'unico punto in cui vengono raccolti dati, non ci
 * sono cookie di profilazione né statistiche, e nessun dato viene ceduto.
 *
 * Finché il titolare non è identificabile (`owner.name` e `owner.email`)
 * la pagina lo dichiara apertamente e il collegamento non viene pubblicato
 * da nessuna parte: `legal.privacy` resta vuoto in `src/data/site.ts`.
 */
export function Privacy() {
  const goToSection = useSectionLink()

  useMeta({
    title: 'Informativa privacy — CRM LAB',
    description:
      'Quali dati raccoglie questo sito, perché, per quanto tempo e come esercitare i propri diritti.',
    canonical: 'https://crmlab.it/privacy',
  })

  return (
    <article className="legal band">
      <div className="board">
        <nav className="legal__crumbs t-small" aria-label="Percorso">
          <Link to="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Informativa privacy</span>
        </nav>

        <h1 className="legal__title">Informativa privacy</h1>
        <p className="t-lead legal__lede">
          Questo sito raccoglie dati personali in un solo punto: il modulo con cui ci scrivi. Qui
          trovi cosa raccogliamo, perché, per quanto tempo e come farteli cancellare.
        </p>

        {!canPublishPrivacy && (
          <p className="legal__notice">
            <strong>Informativa non ancora completa.</strong> Mancano i dati del titolare del
            trattamento e il recapito a cui esercitare i diritti. Finché mancano, il modulo di
            contatto resta disattivato e nessun dato personale viene raccolto da questo sito.
          </p>
        )}

        <section className="legal__block">
          <h2>Titolare del trattamento</h2>
          {canPublishPrivacy ? (
            <ul className="legal__data">
              <li>{owner.name}</li>
              {owner.address && <li>{owner.address}</li>}
              {owner.vat && <li>P. IVA {owner.vat}</li>}
              <li>
                <a href={`mailto:${owner.email}`} className="link">
                  {owner.email}
                </a>
              </li>
            </ul>
          ) : (
            <p>
              I dati del titolare sono in corso di definizione e verranno pubblicati qui prima che
              il modulo di contatto venga attivato.
            </p>
          )}
        </section>

        <section className="legal__block">
          <h2>Quali dati raccogliamo</h2>
          <p>
            Dal modulo di contatto: <strong>nome</strong>, <strong>indirizzo email</strong>,
            l’eventuale <strong>argomento</strong> scelto dall’elenco e il{' '}
            <strong>testo del messaggio</strong>. Non ci sono altri campi e non raccogliamo nulla
            che tu non abbia scritto tu.
          </p>
          <p>
            Dal server che ospita il sito: i normali registri tecnici di accesso (indirizzo IP,
            data e ora, pagina richiesta, tipo di browser). Sono generati automaticamente da
            qualunque server web e servono alla sicurezza e al funzionamento del sito.
          </p>
        </section>

        <section className="legal__block">
          <h2>Perché li trattiamo</h2>
          <p>
            I dati del modulo servono <strong>solo</strong> a leggere la tua richiesta e a
            risponderti, ed eventualmente a prepararti una proposta. La base giuridica è
            l’esecuzione di misure precontrattuali richieste da te e, per il resto, il nostro
            legittimo interesse a rispondere a chi ci scrive.
          </p>
          <p>
            I registri tecnici del server sono trattati per il legittimo interesse a mantenere il
            sito funzionante e sicuro.
          </p>
          <p>
            Non facciamo profilazione, non prendiamo decisioni automatizzate e non ti iscriviamo a
            nessuna newsletter.
          </p>
        </section>

        <section className="legal__block">
          <h2>Per quanto tempo li conserviamo</h2>
          <p>
            I messaggi ricevuti restano nella casella di posta per il tempo necessario a gestire la
            richiesta e l’eventuale rapporto che ne nasce, e vengono cancellati su richiesta. I
            registri tecnici del server seguono i tempi di conservazione del fornitore di hosting.
          </p>
        </section>

        <section className="legal__block">
          <h2>Chi può vederli</h2>
          <p>
            Solo chi lavora alla risposta. Non vendiamo, non cediamo e non comunichiamo i dati a
            terzi per finalità commerciali.
          </p>
          {owner.hosting && (
            <p>
              Il sito è ospitato da <strong>{owner.hosting}</strong>, che tratta i registri tecnici
              in qualità di responsabile del trattamento. Il trasferimento di dati fuori
              dall’Unione europea avviene sulla base delle garanzie previste dal fornitore.
            </p>
          )}
          {owner.mailer && (
            <p>
              I messaggi del modulo vengono recapitati via email tramite{' '}
              <strong>{owner.mailer}</strong>, responsabile del trattamento: il sito non li salva in
              nessun database, li inoltra soltanto alla nostra casella di posta. Anche in questo
              caso il trasferimento fuori dall’Unione europea avviene sulla base delle Clausole
              contrattuali standard e del Data Privacy Framework UE-USA.
            </p>
          )}
        </section>

        <section className="legal__block">
          <h2>Cookie e statistiche</h2>
          <p>
            Questo sito <strong>non usa cookie di profilazione né strumenti di statistica</strong>:
            non c’è Google Analytics, non ci sono pixel di tracciamento e nulla viene salvato nel
            tuo browser per riconoscerti. Per questo non trovi un banner di consenso: non c’è nulla
            da consentire.
          </p>
        </section>

        <section className="legal__block">
          <h2>I tuoi diritti</h2>
          <p>
            Puoi chiedere in qualsiasi momento di accedere ai tuoi dati, correggerli, cancellarli,
            limitarne il trattamento, riceverli in un formato leggibile o opporti al trattamento.
            Puoi anche proporre reclamo al Garante per la protezione dei dati personali.
          </p>
          {canPublishPrivacy ? (
            <p>
              Per esercitarli scrivi a{' '}
              <a href={`mailto:${owner.email}`} className="link">
                {owner.email}
              </a>
              : rispondiamo entro trenta giorni.
            </p>
          ) : (
            <p>
              Il recapito a cui esercitarli sarà pubblicato qui insieme ai dati del titolare. Nel
              frattempo il sito non raccoglie dati personali.
            </p>
          )}
        </section>

        <section className="legal__block">
          <h2>Modifiche</h2>
          <p>
            Se cambia il modo in cui il sito tratta i dati, questa pagina viene aggiornata prima
            che la modifica entri in vigore.
          </p>
        </section>

        <p className="legal__back">
          <a href="/#contatti" className="link" onClick={goToSection('/#contatti')}>
            Torna ai contatti di {site.name}
          </a>
        </p>
      </div>
    </article>
  )
}
