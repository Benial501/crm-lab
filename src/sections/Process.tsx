import { Rail } from '../components/Rail'
import { Reveal } from '../components/Reveal'
import { processSteps, type ProcessStep } from '../data/process'
import './Process.css'

/**
 * Frammenti d'interfaccia veri, uno per fase.
 * Non sono decorazioni: sono la forma degli strumenti che usiamo
 * davvero in quella fase — le note dell'analisi, lo schema delle
 * schermate, la tabella degli stati, le verifiche, la pubblicazione.
 */
function Artefact({ kind }: { kind: ProcessStep['artefact'] }) {
  if (kind === 'notes') {
    return (
      <div className="art" data-ui>
        <p className="art__bar">Esempio di note di analisi</p>
        <ul className="art__notes">
          <li>
            <span className="art__q">Chi riceve le richieste?</span>
            <span className="art__a">Due persone, stessa casella condivisa</span>
          </li>
          <li>
            <span className="art__q">Quante al giorno?</span>
            <span className="art__a">12–18, metà chiede lo stesso preventivo</span>
          </li>
          <li>
            <span className="art__q">Dove si perde tempo?</span>
            <span className="art__a">Ricopiare misure dall’email al foglio</span>
          </li>
          <li>
            <span className="art__q">Cosa esiste già?</span>
            <span className="art__a">Gestionale per la fatturazione, 1 foglio condiviso</span>
          </li>
        </ul>
      </div>
    )
  }

  if (kind === 'wireframe') {
    return (
      <div className="art art--wire" data-ui aria-hidden="true">
        <div className="art__wire-bar">
          <span className="wf wf--logo" />
          <span className="wf wf--nav" />
          <span className="wf wf--nav" />
          <span className="wf wf--btn" />
        </div>
        <div className="art__wire-body">
          <div className="art__wire-col">
            <span className="wf wf--h1" />
            <span className="wf wf--h1 wf--short" />
            <span className="wf wf--line" />
            <span className="wf wf--line" />
            <span className="wf wf--line wf--short" />
            <span className="wf wf--btn wf--big" />
          </div>
          <div className="art__wire-media" />
        </div>
        <div className="art__wire-row">
          <span className="wf wf--block" />
          <span className="wf wf--block" />
          <span className="wf wf--block" />
        </div>
      </div>
    )
  }

  if (kind === 'components') {
    return (
      <div className="art" data-ui>
        <p className="art__bar">Componente «Bottone» — stati</p>
        <table className="art__table">
          <thead>
            <tr>
              <th scope="col">Stato</th>
              <th scope="col">Resa</th>
              <th scope="col">Quando</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Riposo</th>
              <td>
                <span className="cmp cmp--rest">Invia</span>
              </td>
              <td>in pagina</td>
            </tr>
            <tr>
              <th scope="row">Puntato</th>
              <td>
                <span className="cmp cmp--hover">Invia</span>
              </td>
              <td>col puntatore</td>
            </tr>
            <tr>
              <th scope="row">Da tastiera</th>
              <td>
                <span className="cmp cmp--focus">Invia</span>
              </td>
              <td>da tastiera</td>
            </tr>
            <tr>
              <th scope="row">Non attivo</th>
              <td>
                <span className="cmp cmp--off">Invia</span>
              </td>
              <td>azione non disponibile</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

  if (kind === 'checks') {
    return (
      <div className="art" data-ui>
        <p className="art__bar">Esempio di checklist di verifica</p>
        <ul className="art__checks">
          <li>Navigazione completa da tastiera, con il punto attivo sempre visibile</li>
          <li>Contrasto del testo verificato su ogni fondo</li>
          <li>Canale di contatto provato dall’invio alla ricezione</li>
          <li>Peso delle immagini e tempo di caricamento misurati</li>
          <li>Tenuta del layout sui formati concordati, telefono compreso</li>
        </ul>
        <p className="art__note">
          È la lista delle voci che controlliamo. Gli esiti si riferiscono al singolo progetto e si
          consegnano con le misure fatte su quel progetto.
        </p>
      </div>
    )
  }

  return (
    <div className="art" data-ui>
      <p className="art__bar">Pubblicazione</p>
      <dl className="art__deploy">
        <div>
          <dt>Ambiente</dt>
          <dd>produzione</dd>
        </div>
        <div>
          <dt>Versione</dt>
          <dd>1.0.0</dd>
        </div>
        <div>
          <dt>Dominio</dt>
          <dd>intestato al cliente</dd>
        </div>
        <div>
          <dt>Accessi</dt>
          <dd>trasferiti</dd>
        </div>
      </dl>
      <ul className="art__handover">
        <li>Documentazione di quello che è stato consegnato</li>
        <li>Accesso al codice e ai servizi, a nome tuo</li>
        <li>Canale diretto per modifiche ed evoluzioni</li>
      </ul>
    </div>
  )
}

export function Process() {
  return (
    <section className="band process" id="metodo" aria-labelledby="metodo-title">
      <div className="board">
        <div className="band-head">
          <h2 className="band-head__title" id="metodo-title">
            Come si sviluppa un progetto
          </h2>
          <p className="band-head__body">
            Cinque fasi, sempre nello stesso ordine. Per ciascuna trovi un esempio dello strumento di
            lavoro: note di analisi, schema delle schermate, tabella degli stati, verifiche e
            consegna. Concordo tempi e durata nella proposta, prima di iniziare.
          </p>
        </div>

        <Rail as="ol" className="process__list" label="Le cinque fasi">
          {processSteps.map((step, i) => (
            <Reveal as="li" key={step.n} delay={i * 60} className="phase">
              <div className="phase__say">
                <p className="phase__n">{step.n}</p>
                <h3 className="phase__title">{step.title}</h3>
                <p className="phase__body">{step.body}</p>
                <p className="phase__output">
                  <span>Cosa resta a te</span>
                  {step.output}
                </p>
              </div>
              <div className="phase__art">
                <Artefact kind={step.artefact} />
              </div>
            </Reveal>
          ))}
        </Rail>
      </div>
    </section>
  )
}
