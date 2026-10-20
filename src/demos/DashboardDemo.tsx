import { useState } from 'react'
import { DemoChrome } from './DemoChrome'
import { useMeta } from '../hooks/useMeta'
import './dashboard.css'

/* Dati di esempio. Sono coerenti fra loro: i totali in alto sono
   la somma delle righe, così la schermata regge una lettura vera. */
const months = [
  { m: 'Apr', v: 41 },
  { m: 'Mag', v: 52 },
  { m: 'Giu', v: 48 },
  { m: 'Lug', v: 61 },
  { m: 'Ago', v: 29 },
  { m: 'Set', v: 66 },
  { m: 'Ott', v: 74 },
]

type Row = {
  client: string
  job: string
  owner: string
  due: string
  state: 'In corso' | 'In attesa cliente' | 'Da fatturare' | 'Chiuso'
  value: number
}

const rows: Row[] = [
  { client: 'Vetreria Sanna', job: 'Rifacimento sito + catalogo', owner: 'C. Pozzi', due: '24 ott', state: 'In corso', value: 7400 },
  { client: 'Studio Reva', job: 'Area riservata clienti', owner: 'M. Elia', due: '29 ott', state: 'In attesa cliente', value: 5200 },
  { client: 'Ferramenta Dei', job: 'Automazione preventivi', owner: 'C. Pozzi', due: '31 ott', state: 'In corso', value: 3100 },
  { client: 'Caseificio Rota', job: 'E-commerce B2B', owner: 'G. Nanni', due: '06 nov', state: 'Da fatturare', value: 11800 },
  { client: 'Officine Bardi', job: 'Manutenzione annuale', owner: 'M. Elia', due: '12 nov', state: 'In corso', value: 2400 },
  { client: 'Serra & Co.', job: 'Migrazione gestionale', owner: 'G. Nanni', due: '18 nov', state: 'Chiuso', value: 9600 },
]

const views = ['Panoramica', 'Lavori', 'Scadenze'] as const

const deadlines = [
  { what: 'Consegna bozze — Vetreria Sanna', when: 'Domani, 10:00', who: 'C. Pozzi' },
  { what: 'Fattura 214 — Caseificio Rota', when: 'Venerdì', who: 'Amministrazione' },
  { what: 'Rinnovo dominio studioreva.it', when: '3 novembre', who: 'Automatico' },
  { what: 'Verifica accessi — Officine Bardi', when: '12 novembre', who: 'M. Elia' },
]

const nf = new Intl.NumberFormat('it-IT')

export function DashboardDemo() {
  const [view, setView] = useState<(typeof views)[number]>('Panoramica')

  useMeta({
    title: 'Bottega — Demo CRM LAB',
    description: 'Concept di dashboard gestionale per un’attività commerciale, realizzato da CRM LAB.',
  })

  const max = Math.max(...months.map((m) => m.v))
  const open = rows.filter((r) => r.state !== 'Chiuso')
  const toInvoice = rows.filter((r) => r.state === 'Da fatturare')
  const total = rows.reduce((s, r) => s + r.value, 0)

  return (
    <>
      <DemoChrome name="Bottega" kind="dashboard gestionale per un’attività commerciale" />
      <div className="demo db" data-ui>
        <div className="db__shell">
          <aside className="db__side">
            <p className="db__brand">Bottega</p>
            <nav className="db__menu" aria-label="Sezioni del gestionale">
              {views.map((v) => (
                <button
                  key={v}
                  type="button"
                  className={`db__menu-item${view === v ? ' db__menu-item--on' : ''}`}
                  aria-current={view === v ? 'page' : undefined}
                  onClick={() => setView(v)}
                >
                  {v}
                </button>
              ))}
              <span className="db__menu-item db__menu-item--off">Clienti</span>
              <span className="db__menu-item db__menu-item--off">Fatture</span>
              <span className="db__menu-item db__menu-item--off">Impostazioni</span>
            </nav>
            <p className="db__user">
              <span className="db__avatar" aria-hidden="true">
                CP
              </span>
              Chiara Pozzi
              <span className="db__user-role">Titolare</span>
            </p>
          </aside>

          <main className="db__main">
            <header className="db__top">
              <h1 className="db__title">{view}</h1>
              <p className="db__period">Aprile – ottobre 2026</p>
            </header>

            {view === 'Panoramica' && (
              <>
                <ul className="db__kpis">
                  <li>
                    <span className="db__kpi-label">Fatturato del periodo</span>
                    <span className="db__kpi-value">{nf.format(total)} €</span>
                    <span className="db__kpi-note db__kpi-note--up">+18% sul periodo precedente</span>
                  </li>
                  <li>
                    <span className="db__kpi-label">Lavori aperti</span>
                    <span className="db__kpi-value">{open.length}</span>
                    <span className="db__kpi-note">su {rows.length} nel periodo</span>
                  </li>
                  <li>
                    <span className="db__kpi-label">Da fatturare</span>
                    <span className="db__kpi-value">
                      {nf.format(toInvoice.reduce((s, r) => s + r.value, 0))} €
                    </span>
                    <span className="db__kpi-note">{toInvoice.length} lavoro consegnato</span>
                  </li>
                  <li>
                    <span className="db__kpi-label">Scadenze a 14 giorni</span>
                    <span className="db__kpi-value">{deadlines.length}</span>
                    <span className="db__kpi-note">1 domani mattina</span>
                  </li>
                </ul>

                <section className="db__panel">
                  <div className="db__panel-head">
                    <h2>Fatturato per mese</h2>
                    <p>In migliaia di euro</p>
                  </div>
                  <div className="db__chart">
                    {months.map((m) => (
                      <div className="db__bar-wrap" key={m.m}>
                        <span className="db__bar-value">{m.v}</span>
                        <span
                          className={`db__bar${m.v === max ? ' db__bar--peak' : ''}`}
                          style={{ height: `${(m.v / max) * 100}%` }}
                        />
                        <span className="db__bar-label">{m.m}</span>
                      </div>
                    ))}
                  </div>
                  <p className="db__finding">
                    Ottobre è il mese migliore del periodo: 74.000 € su 6 lavori, trainato dalla
                    consegna dell’e-commerce del Caseificio Rota.
                  </p>
                </section>
              </>
            )}

            {view !== 'Scadenze' && (
              <section className="db__panel">
                <div className="db__panel-head">
                  <h2>Lavori in corso</h2>
                  <p>{open.length} aperti · {rows.length} totali</p>
                </div>
                <div className="db__table-wrap">
                  <table className="db__table">
                    <thead>
                      <tr>
                        <th scope="col">Cliente</th>
                        <th scope="col">Lavoro</th>
                        <th scope="col">Referente</th>
                        <th scope="col">Scadenza</th>
                        <th scope="col">Stato</th>
                        <th scope="col" className="db__num">
                          Valore
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((r) => (
                        <tr key={r.client}>
                          <th scope="row">{r.client}</th>
                          <td>{r.job}</td>
                          <td>{r.owner}</td>
                          <td>{r.due}</td>
                          <td>
                            <span className={`db__state db__state--${r.state.split(' ')[0].toLowerCase()}`}>
                              {r.state}
                            </span>
                          </td>
                          <td className="db__num">{nf.format(r.value)} €</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {view !== 'Lavori' && (
              <section className="db__panel">
                <div className="db__panel-head">
                  <h2>Prossime scadenze</h2>
                  <p>14 giorni</p>
                </div>
                <ul className="db__deadlines">
                  {deadlines.map((d) => (
                    <li key={d.what}>
                      <span className="db__deadline-what">{d.what}</span>
                      <span className="db__deadline-when">{d.when}</span>
                      <span className="db__deadline-who">{d.who}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </main>
        </div>
      </div>
    </>
  )
}
