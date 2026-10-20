import { useEffect, useRef, useState } from 'react'
import { Reveal } from '../components/Reveal'
import './AutomationSection.css'

const integrations = [
  { id: 'gmail', label: 'Gmail', mark: 'M', className: 'gmail' },
  { id: 'sheets', label: 'Google Sheets', mark: '▤', className: 'sheets' },
  { id: 'crm', label: 'CRM aziendale', mark: 'C', className: 'crm' },
  { id: 'whatsapp', label: 'WhatsApp', mark: '◌', className: 'whatsapp' },
]

const comparisons = [
  { id: 'tempo', label: 'Tempo di elaborazione', manual: 'Manuale', automated: 'Automatizzato' },
  { id: 'passaggi', label: 'Passaggi manuali', manual: 'Manuale', automated: 'Automatizzato' },
  { id: 'attivita', label: 'Attività completate', manual: 'Manuale', automated: 'Automatizzato' },
] as const

function AutomationFlow() {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), { threshold: 0.15 })
    observer.observe(node)
    const syncVisibility = () => setActive(document.visibilityState === 'visible' && node.getBoundingClientRect().top < window.innerHeight && node.getBoundingClientRect().bottom > 0)
    document.addEventListener('visibilitychange', syncVisibility)
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', syncVisibility)
    }
  }, [])

  return (
    <div ref={ref} className="automation-flow" data-active={active} aria-label="Flusso illustrativo: una nuova richiesta viene analizzata e aggiorna il CRM, prepara una risposta e registra un'attività.">
      <div className="flow-stage flow-stage--request">
        <span className="flow-stage__icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 6.5h16v11H4zM4.5 7l7.5 6 7.5-6" /></svg></span>
        <span className="flow-stage__label">Nuova richiesta</span>
        <span className="flow-stage__detail">Email in arrivo</span>
      </div>
      <svg className="flow-link flow-link--in" viewBox="0 0 180 44" aria-hidden="true">
        <path className="flow-link__track" d="M2 22h176" /><path className="flow-link__pulse" d="M2 22h176" />
      </svg>
      <div className="flow-core">
        <span className="flow-core__orbit" aria-hidden="true" />
        <span className="flow-core__mark" aria-hidden="true"><svg viewBox="0 0 28 28"><path d="M14 2.5 17 11l8.5 3-8.5 3-3 8.5L11 17l-8.5-3 8.5-3z" /></svg></span>
        <span className="flow-core__name">CRM LAB</span>
        <span className="flow-core__kind">AI AUTOMATION</span>
        <span className="flow-core__status" aria-live="polite"><i /> <span className="flow-status__analysis">Analisi della richiesta</span><span className="flow-status__complete">Processo completato</span></span>
      </div>
      <svg className="flow-link flow-link--out" viewBox="0 0 180 44" aria-hidden="true">
        <path className="flow-link__track" d="M2 22h176" /><path className="flow-link__pulse" d="M2 22h176" />
      </svg>
      <div className="flow-results" aria-label="Azioni completate">
        <div className="flow-result" style={{ '--result-delay': '0s' } as React.CSSProperties}><span className="flow-result__check" aria-hidden="true">✓</span><span><b>CRM aggiornato</b><small>Contatto e richiesta</small></span></div>
        <div className="flow-result" style={{ '--result-delay': '0.35s' } as React.CSSProperties}><span className="flow-result__check" aria-hidden="true">✓</span><span><b>Risposta preparata</b><small>Pronta per la revisione</small></span></div>
        <div className="flow-result" style={{ '--result-delay': '0.7s' } as React.CSSProperties}><span className="flow-result__check" aria-hidden="true">✓</span><span><b>Attività registrata</b><small>Prossimo passo definito</small></span></div>
      </div>
      <span className="flow-mobile-arrow" aria-hidden="true">↓</span>
    </div>
  )
}

function IntegrationDiagram() {
  const ref = useRef<HTMLDivElement>(null)
  const [selected, setSelected] = useState('gmail')
  const [paused, setPaused] = useState(false)
  const [visible, setVisible] = useState(true)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.1 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const syncVisibility = () => setVisible(document.visibilityState === 'visible')
    document.addEventListener('visibilitychange', syncVisibility)
    return () => document.removeEventListener('visibilitychange', syncVisibility)
  }, [])

  useEffect(() => {
    if (paused || !visible || !inView || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = window.setInterval(() => setSelected((current) => integrations[(integrations.findIndex((item) => item.id === current) + 1) % integrations.length].id), 3000)
    return () => window.clearInterval(timer)
  }, [paused, visible, inView])

  return (
    <div ref={ref} className="integration-map" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false) }}>
      <svg className="integration-map__lines" viewBox="0 0 520 260" aria-hidden="true">
        <path className={selected === 'gmail' ? 'is-selected' : ''} d="M105 45 208 104" />
        <path className={selected === 'sheets' ? 'is-selected' : ''} d="M415 45 312 104" />
        <path className={selected === 'crm' ? 'is-selected' : ''} d="M105 215 208 156" />
        <path className={selected === 'whatsapp' ? 'is-selected' : ''} d="M415 215 312 156" />
      </svg>
      {integrations.map((item, index) => (
        <button key={item.id} type="button" className={`integration-node integration-node--${index} ${item.className} ${selected === item.id ? 'is-selected' : ''}`} aria-pressed={selected === item.id} onClick={() => { setSelected(item.id); setPaused(true); window.setTimeout(() => setPaused(false), 4500) }} onFocus={() => setSelected(item.id)}>
          <span className="integration-node__mark" aria-hidden="true">{item.mark}</span><span>{item.label}</span>
        </button>
      ))}
      <div className="integration-center"><span className="integration-center__mark" aria-hidden="true">✳</span><b>CRM LAB</b><small>{integrations.find((item) => item.id === selected)?.label} · esempio</small></div>
    </div>
  )
}

function EfficiencyChart() {
  const [metric, setMetric] = useState<(typeof comparisons)[number]['id']>('tempo')
  const active = comparisons.find((item) => item.id === metric) ?? comparisons[0]
  const values: Record<typeof metric, { manual: number; automated: number; unit: string }> = {
    tempo: { manual: 78, automated: 36, unit: 'tempo relativo' },
    passaggi: { manual: 78, automated: 28, unit: 'passaggi relativi' },
    attivita: { manual: 40, automated: 78, unit: 'attività relative' },
  }
  const value = values[metric]

  return (
    <div className="efficiency-chart">
      <div className="efficiency-chart__controls" role="group" aria-label="Scegli cosa confrontare">
        {comparisons.map((item) => <button key={item.id} type="button" className={metric === item.id ? 'is-active' : ''} aria-pressed={metric === item.id} onClick={() => setMetric(item.id)}>{item.label}</button>)}
      </div>
      <div className="efficiency-chart__plot" role="img" aria-label={`${active.label}. ${active.manual}: ${value.manual} su 100; ${active.automated}: ${value.automated} su 100. Esempio illustrativo, non sono risultati misurati.`}>
        <div className="chart-row"><span>{active.manual}</span><div className="chart-track"><i className="chart-bar chart-bar--manual" style={{ width: `${value.manual}%` }} /></div><b>{value.manual}</b></div>
        <div className="chart-row"><span>{active.automated}</span><div className="chart-track"><i className="chart-bar chart-bar--auto" style={{ width: `${value.automated}%` }} /></div><b>{value.automated}</b></div>
        <div className="chart-axis"><span>0</span><span>Valore relativo · 100</span><span>100</span></div>
      </div>
      <p className="efficiency-chart__note"><span />Esempio illustrativo · {value.unit}</p>
    </div>
  )
}

export function AutomationSection() {
  return (
    <section className="band automation" id="automazioni" aria-labelledby="automation-title">
      <div className="board">
        <Reveal className="band-head automation__head">
          <p className="automation__eyebrow">Automazioni intelligenti</p>
          <h2 className="band-head__title" id="automation-title">Meno lavoro manuale. Più tempo per ciò che conta.</h2>
          <p className="band-head__body">Progetto automazioni che collegano gli strumenti che usi, gestiscono le attività ripetitive e semplificano il lavoro quotidiano.</p>
        </Reveal>
        <div className="automation-grid">
          <Reveal className="automation-card automation-card--flow">
            <div className="automation-card__visual automation-card__visual--flow"><AutomationFlow /></div>
            <div className="automation-card__copy"><p className="automation-card__index">01 / Il flusso</p><h3>Dal lavoro ripetitivo a un processo automatico.</h3><p>Le informazioni arrivano dai tuoi strumenti, vengono elaborate secondo regole definite e si trasformano in azioni concrete. Meno passaggi manuali, meno attività da gestire.</p></div>
          </Reveal>
          <Reveal delay={90} className="automation-card automation-card--integrations">
            <div className="automation-card__visual"><IntegrationDiagram /></div>
            <div className="automation-card__copy"><p className="automation-card__index">02 / Le connessioni</p><h3>I tuoi strumenti, finalmente collegati.</h3><p>Collego applicazioni e servizi per eliminare passaggi manuali e far comunicare i tuoi sistemi. Gli esempi non indicano integrazioni già attive.</p></div>
          </Reveal>
          <Reveal delay={160} className="automation-card automation-card--results">
            <div className="automation-card__visual"><EfficiencyChart /></div>
            <div className="automation-card__copy"><p className="automation-card__index">03 / Il beneficio</p><h3>Più efficienza, meno attività ripetitive.</h3><p>Riduci il tempo dedicato alle operazioni manuali e concentra le risorse sulle attività a maggior valore.</p></div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
